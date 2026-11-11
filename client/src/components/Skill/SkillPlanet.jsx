import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './SkillPlanet.css';

// Vite: eager-load every logo in images/Stack as a URL keyed by filename.
const logoFiles = import.meta.glob('./images/Stack/*.svg', { eager: true, as: 'url' });
const logoUrl = (name) => logoFiles[`./images/Stack/${name}.svg`];

let ringSeq = 0;

/*
 * Skills orbit the planet. Switching category:
 *   out-going ring  → spins fast, then each logo is "digested" into its category word,
 *                     spread along the letters (getOrigin(groupId) returns that word's element)
 *   in-coming ring  → logos pour out of the new word, fly to their orbit slots, then the ring
 *                     spins once to settle.
 * Each ring is its own short-lived layer; out-going rings remove themselves when done, so
 * rapid switching can never leave the planet out of sync with the active category.
 */
const SkillPlanet = ({ groupId, items, label, getOrigin, size = 450, radius = 175, dot = 56 }) => {
  const planetRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [rings, setRings] = useState(() => [{ key: ringSeq++, groupId, items, phase: 'idle', points: null }]);
  const compact = size < 350;

  // Points spread along a category word, in the planet's (slowly spinning) coordinate frame.
  const wordPoints = (id, n) => {
    const planet = planetRef.current;
    const el = getOrigin?.(id);
    if (!planet || !el) return Array.from({ length: n }, () => ({ x: 0, y: 0 }));
    const p = planet.getBoundingClientRect();
    const w = el.getBoundingClientRect();
    const cx = p.left + p.width / 2;
    const cy = p.top + p.height / 2;
    const rot = (parseFloat(getComputedStyle(planet).rotate) || 0) * (Math.PI / 180);
    const cos = Math.cos(-rot);
    const sin = Math.sin(-rot);
    return Array.from({ length: n }, (_, i) => {
      const dx = w.left + (w.width * (i + 0.5)) / n - cx;
      const dy = w.top + w.height / 2 - cy;
      return { x: dx * cos - dy * sin, y: dx * sin + dy * cos };
    });
  };

  const prevGroup = useRef(groupId);
  useLayoutEffect(() => {
    if (prevGroup.current === groupId) return;
    prevGroup.current = groupId;
    setHovered(null);
    setRings((rs) => [
      ...rs.map((r) => (r.phase === 'out' ? r : { ...r, phase: 'out', points: wordPoints(r.groupId, r.items.length) })),
      { key: ringSeq++, groupId, items, phase: 'in', points: wordPoints(groupId, items.length) },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  // Stable identity, so a re-render can't restart a leaving ring's cleanup timer.
  const removeRing = useCallback((key) => setRings((rs) => rs.filter((r) => r.key !== key)), []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      className="skill-planet-wrapper h-full"
    >
      <div className="skill-planet-container">
        <div ref={planetRef} className="skill-planet" style={{ width: size, height: size, '--dot': `${dot}px` }}>
          {rings.map((ring) => (
            <Ring
              key={ring.key}
              ring={ring}
              radius={radius}
              dot={dot}
              compact={compact}
              hovered={hovered}
              setHovered={setHovered}
              onDone={removeRing}
            />
          ))}
        </div>
        <div className="skill-planet-center font-inter">
          <div className={`tracking-[0.3em] text-cyan-300/80 ${compact ? 'text-[0.55rem]' : 'text-[0.65rem]'}`}>{label}</div>
          <div className={`font-extrabold mt-1 ${compact ? 'text-sm min-h-[1.25rem]' : 'text-lg min-h-[1.75rem]'}`}>
            {hovered ?? `${items.length} tools`}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Ring = ({ ring, radius, dot, compact, hovered, setHovered, onDone }) => {
  const { key, items, phase, points } = ring;
  const n = items.length;
  const slot = (i) => {
    const a = ((i * 360) / n) * (Math.PI / 180);
    return { x: radius * Math.sin(a), y: -radius * Math.cos(a) };
  };

  // Container motion: fast spin before digesting / settling spin after arriving.
  const container =
    phase === 'out'
      ? { animate: { rotate: [0, 360, 360] }, transition: { duration: 0.95, times: [0, 0.45, 1], ease: 'easeInOut' } }
      : phase === 'in'
        ? { animate: { rotate: [0, 0, 360] }, transition: { duration: 1.3, times: [0, 0.55, 1], ease: 'easeInOut' } }
        : { animate: { rotate: 0 } };

  // Out-going rings always clean themselves up, even if the animation gets interrupted.
  useEffect(() => {
    if (phase !== 'out') return undefined;
    const t = setTimeout(() => onDone(key), 1100);
    return () => clearTimeout(t);
  }, [phase, key, onDone]);

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center ${phase === 'out' ? 'pointer-events-none' : ''}`}
      initial={false}
      {...container}
    >
      {items.map((item, i) => {
        const s = slot(i);
        const p = points?.[i] ?? { x: 0, y: 0 };
        let anim;
        if (phase === 'out') {
          anim = {
            initial: false,
            animate: { x: [s.x, s.x, p.x], y: [s.y, s.y, p.y], scale: [1, 1, 0.25], opacity: [1, 1, 0] },
            transition: { duration: 0.95, times: [0, 0.45 + i * 0.015, 1], ease: 'easeIn' },
          };
        } else if (phase === 'in') {
          anim = {
            initial: { x: p.x, y: p.y, scale: 0.25, opacity: 0 },
            animate: { x: s.x, y: s.y, scale: 1, opacity: 1 },
            transition: { duration: 0.6, delay: i * 0.045, ease: 'easeOut' },
          };
        } else {
          anim = { initial: false, animate: { x: s.x, y: s.y, scale: 1, opacity: 1 } };
        }
        const url = item.logo ? logoUrl(item.logo) : null;
        return (
          <motion.span key={item.name} className="skill-orbit" {...anim}>
            <span
              className={`skill-dot ${hovered === item.name && phase !== 'out' ? 'skill-dot-active' : ''}`}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered((h) => (h === item.name ? null : item.name))}
              title={item.name}
            >
              {url ? (
                <img src={url} alt={item.name} style={{ width: dot * 0.54, height: dot * 0.54 }} />
              ) : (
                <span className={`font-inter font-extrabold tracking-wide ${compact ? 'text-[9px]' : 'text-[11px]'}`}>{item.short}</span>
              )}
            </span>
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default SkillPlanet;

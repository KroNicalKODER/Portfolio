import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './SkillPlanet.css';

// Vite: eager-load every logo in images/Stack as a URL keyed by filename.
const logoFiles = import.meta.glob('./images/Stack/*.svg', { eager: true, as: 'url' });
const logoUrl = (name) => logoFiles[`./images/Stack/${name}.svg`];

let ringSeq = 0;

const TAU = Math.PI * 2;
// Orbit angle a: 0 = top, increasing clockwise on screen.
const onOrbit = (r, a) => ({ x: r * Math.sin(a), y: -r * Math.cos(a) });

const OUT_TIME = 0.7; // seconds a leaving ring lives
const WAVE = 0.22; // seconds for the flip wave to travel once round the circle
const FLIP_OUT_AT = 0.16; // shockwave reaches the orbit
const FLIP_IN_AT = 0.38; // new logos start flipping in

/*
 * Skills orbit the planet. Switching category ("Flip + Pulse"):
 *   a cyan shockwave ripples out of the planet; as it reaches the orbit each logo pops and
 *   flips edge-on in a quick clockwise wave, and the new set flips in behind it with a bounce.
 * The leaving set is a short-lived layer that removes itself, so rapid switching can never
 * leave the planet out of sync with the active category.
 */
const SkillPlanet = ({ groupId, items, label, size = 450, radius = 175, dot = 56 }) => {
  const [hovered, setHovered] = useState(null);
  const [rings, setRings] = useState(() => [{ key: ringSeq++, items, phase: 'idle' }]);
  const [prevGroup, setPrevGroup] = useState(groupId);
  const compact = size < 350;

  useLayoutEffect(() => {
    if (prevGroup === groupId) return;
    setPrevGroup(groupId);
    setHovered(null);
    setRings((rs) => [...rs.map((r) => (r.phase === 'out' ? r : { ...r, phase: 'out' })), { key: ringSeq++, items, phase: 'in' }]);
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
        <div className="skill-planet" style={{ width: size, height: size, '--dot': `${dot}px` }}>
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
  const { key, items, phase } = ring;
  const n = items.length;

  // Leaving rings always clean themselves up, even if an animation gets interrupted.
  useEffect(() => {
    if (phase !== 'out') return undefined;
    const t = setTimeout(() => onDone(key), OUT_TIME * 1000 + 150);
    return () => clearTimeout(t);
  }, [phase, key, onDone]);

  const motionFor = (i) => {
    const s = onOrbit(radius, (i * TAU) / n);
    const order = i / n; // 0 at top, clockwise → 1
    if (phase === 'out') {
      return {
        initial: false,
        animate: { x: s.x, y: s.y, rotateY: 90, scale: [1, 1.18, 0.9], opacity: [1, 1, 0] },
        transition: { duration: 0.26, delay: FLIP_OUT_AT + order * WAVE, ease: 'easeIn' },
      };
    }
    if (phase === 'in') {
      const delay = FLIP_IN_AT + order * WAVE;
      return {
        initial: { x: s.x, y: s.y, rotateY: -90, scale: 0.9, opacity: 0 },
        animate: { x: s.x, y: s.y, rotateY: 0, scale: [0.9, 1.22, 1], opacity: 1 },
        transition: {
          duration: 0.4,
          delay,
          ease: 'easeOut',
          scale: { duration: 0.4, delay, times: [0, 0.55, 1] },
          opacity: { duration: 0.01, delay },
        },
      };
    }
    return { initial: false, animate: { x: s.x, y: s.y, rotateY: 0, scale: 1, opacity: 1 } };
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${phase === 'out' ? 'pointer-events-none' : ''}`}>
      {phase === 'in' && (
        <motion.span
          className="absolute rounded-full border-2 border-cyan-300 pointer-events-none"
          style={{ width: radius * 2, height: radius * 2, boxShadow: '0 0 30px rgba(0,255,224,0.6), inset 0 0 30px rgba(0,255,224,0.4)' }}
          initial={{ scale: 0.35, opacity: 0.9 }}
          animate={{ scale: 1.45, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
      {items.map((item, i) => {
        const url = item.logo ? logoUrl(item.logo) : null;
        return (
          <motion.span key={item.name} className="skill-orbit" style={{ transformPerspective: 500 }} {...motionFor(i)}>
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
    </div>
  );
};

export default SkillPlanet;

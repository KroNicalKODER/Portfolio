import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './SkillPlanet.css';

// Vite: eager-load every logo in images/Stack as a URL keyed by filename.
const logoFiles = import.meta.glob('./images/Stack/*.svg', { eager: true, as: 'url' });
const logoUrl = (name) => logoFiles[`./images/Stack/${name}.svg`];

let ringSeq = 0;

const TAU = Math.PI * 2;
const SPEED = 20; // radians per second along the orbit
const ARRIVE_AFTER = 0.45; // seconds: new logos start coming out as the old train leaves
const LINE_TIME = 0.4; // seconds to travel between the orbit and the word
const mod = (a) => ((a % TAU) + TAU) % TAU;

/*
 * Skills orbit the planet. Switching category:
 *   leaving ring  → spins fast; each logo peels off at the "gate" (the orbit point facing its
 *                   category word) and travels in single file into that word.
 *   arriving ring → logos stream out of the new word in single file, join the orbit at the gate
 *                   and glide round to their slots until the circle is complete.
 * Each ring is a short-lived layer; leaving rings remove themselves when done, so rapid switching
 * can never leave the planet out of sync with the active category.
 */
const SkillPlanet = ({ groupId, items, label, getOrigin, fx = 'train', size = 450, radius = 175, dot = 56 }) => {
  const planetRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [rings, setRings] = useState(() => [{ key: ringSeq++, groupId, items, phase: 'idle', word: null }]);
  const compact = size < 350;

  // Centre of a category word, in the planet's (slowly spinning) coordinate frame.
  const wordCenter = (id) => {
    const planet = planetRef.current;
    const el = getOrigin?.(id);
    if (!planet || !el) return { x: -radius * 2, y: 0 };
    const p = planet.getBoundingClientRect();
    const w = el.getBoundingClientRect();
    const dx = w.left + w.width / 2 - (p.left + p.width / 2);
    const dy = w.top + w.height / 2 - (p.top + p.height / 2);
    const rot = -(parseFloat(getComputedStyle(planet).rotate) || 0) * (Math.PI / 180);
    return { x: dx * Math.cos(rot) - dy * Math.sin(rot), y: dx * Math.sin(rot) + dy * Math.cos(rot) };
  };

  const prevGroup = useRef(groupId);
  useLayoutEffect(() => {
    if (prevGroup.current === groupId) return;
    prevGroup.current = groupId;
    setHovered(null);
    setRings((rs) => [
      ...rs.map((r) => (r.phase === 'out' ? r : { ...r, phase: 'out', word: wordCenter(r.groupId) })),
      { key: ringSeq++, groupId, items, phase: 'in', word: wordCenter(groupId) },
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
              fx={fx}
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

// Orbit angle a: 0 = top, increasing clockwise on screen.
const onOrbit = (r, a) => ({ x: r * Math.sin(a), y: -r * Math.cos(a) });

// Keyframe offsets must lie in [0, 1]; float rounding can nudge them just past 1.
const clampTimes = (f) => {
  f.times = f.times.map((t) => Math.min(1, Math.max(0, t)));
  f.times[0] = 0;
  f.times[f.times.length - 1] = 1;
  return f;
};

// Build x/y/scale/opacity keyframes for one logo plus its timing.
function leavingPath(r, a0, gate, word) {
  const sweep = mod(gate - a0) + TAU; // one full extra spin before peeling off
  const tOrbit = sweep / SPEED;
  const total = tOrbit + LINE_TIME;
  const K = Math.max(8, Math.ceil(sweep / (Math.PI / 10)));
  const g = onOrbit(r, gate);
  const f = { x: [], y: [], scale: [], opacity: [], times: [] };
  for (let k = 0; k <= K; k++) {
    const p = onOrbit(r, a0 + (sweep * k) / K);
    f.x.push(p.x); f.y.push(p.y); f.scale.push(1); f.opacity.push(1); f.times.push((tOrbit * k) / K / total);
  }
  const M = 6;
  for (let m = 1; m <= M; m++) {
    const u = m / M;
    f.x.push(g.x + (word.x - g.x) * u); f.y.push(g.y + (word.y - g.y) * u);
    f.scale.push(1 - 0.75 * u); f.opacity.push(1 - u * u); f.times.push((tOrbit + LINE_TIME * u) / total);
  }
  return { frames: clampTimes(f), duration: total };
}

function arrivingPath(r, a1, gate, word) {
  const sweep = mod(a1 - gate); // glide round from the gate to its own slot
  const tOrbit = sweep / SPEED;
  const total = LINE_TIME + tOrbit;
  const g = onOrbit(r, gate);
  const f = { x: [], y: [], scale: [], opacity: [], times: [] };
  const M = 6;
  for (let m = 0; m <= M; m++) {
    const u = m / M;
    f.x.push(word.x + (g.x - word.x) * u); f.y.push(word.y + (g.y - word.y) * u);
    f.scale.push(0.25 + 0.75 * u); f.opacity.push(Math.min(1, u * 2)); f.times.push((LINE_TIME * u) / total);
  }
  const K = Math.max(1, Math.ceil(sweep / (Math.PI / 10)));
  for (let k = 1; k <= K; k++) {
    const p = onOrbit(r, gate + (sweep * k) / K);
    f.x.push(p.x); f.y.push(p.y); f.scale.push(1); f.opacity.push(1); f.times.push((LINE_TIME + (tOrbit * k) / K) / total);
  }
  return { frames: clampTimes(f), duration: total, sweep };
}

// Spiral between the orbit slot (angle a, radius r) and the planet core.
function spiral(r, a, inward) {
  const turns = Math.PI * 1.5;
  const K = 18;
  const f = { x: [], y: [], scale: [], opacity: [], times: [] };
  for (let k = 0; k <= K; k++) {
    const u = k / K;
    const t = inward ? u : 1 - u; // t: 0 at slot, 1 at core
    const p = onOrbit(r * (1 - t), inward ? a + turns * t : a - turns * t);
    f.x.push(p.x); f.y.push(p.y);
    f.scale.push(1 - 0.8 * t); f.opacity.push(t > 0.85 ? (1 - t) / 0.15 : 1); f.times.push(u);
  }
  return clampTimes(f);
}

const Ring = ({ ring, fx, radius, dot, compact, hovered, setHovered, onDone }) => {
  const { key, items, phase, word } = ring;
  const n = items.length;
  const slotAngle = (i) => (i * TAU) / n;
  const gate = word ? mod(Math.atan2(word.x, -word.y)) : 0;

  // Per-logo motion for the "train" style. Arrivals are delayed so they enter single file.
  let paths = null;
  let longest = 1.1;
  if (fx === 'train' && phase === 'out') {
    paths = items.map((_, i) => leavingPath(radius, slotAngle(i), gate, word));
    longest = Math.max(...paths.map((p) => p.duration));
  } else if (fx === 'train' && phase === 'in') {
    paths = items.map((_, i) => arrivingPath(radius, slotAngle(i), gate, word));
    const maxSweep = Math.max(...paths.map((p) => p.sweep));
    paths = paths.map((p) => ({ ...p, delay: ARRIVE_AFTER + (maxSweep - p.sweep) / SPEED }));
  }

  // Leaving rings always clean themselves up, even if an animation gets interrupted.
  useEffect(() => {
    if (phase !== 'out') return undefined;
    const t = setTimeout(() => onDone(key), longest * 1000 + 150);
    return () => clearTimeout(t);
  }, [phase, key, onDone, longest]);

  // Whole-ring motion for the "warp" and "flip" styles.
  let ringAnim = { initial: false, animate: { rotate: 0, scale: 1, opacity: 1, rotateX: 0 } };
  if (fx === 'warp') {
    ringAnim =
      phase === 'out'
        ? { initial: false, animate: { rotate: 540, scale: 1.9, opacity: 0 }, transition: { duration: 0.7, ease: [0.55, 0, 0.9, 0.4] } }
        : phase === 'in'
          ? {
              initial: { rotate: -540, scale: 1.9, opacity: 0 },
              animate: { rotate: 0, scale: 1, opacity: 1 },
              transition: { duration: 0.95, delay: 0.25, ease: [0.1, 0.6, 0.3, 1] },
            }
          : ringAnim;
  } else if (fx === 'flip') {
    ringAnim =
      phase === 'out'
        ? { initial: false, animate: { rotateX: 90, rotate: 120, opacity: [1, 1, 0] }, transition: { duration: 0.45, ease: 'easeIn' } }
        : phase === 'in'
          ? {
              initial: { rotateX: -90, rotate: -120, opacity: 0 },
              animate: { rotateX: 0, rotate: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 0.42, ease: 'easeOut', opacity: { duration: 0.05, delay: 0.42 } },
            }
          : ringAnim;
  }

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center ${phase === 'out' ? 'pointer-events-none' : ''}`}
      style={fx === 'flip' ? { transformPerspective: 700 } : undefined}
      {...ringAnim}
    >
      {items.map((item, i) => {
        const s = onOrbit(radius, slotAngle(i));
        let anim = { initial: false, animate: { x: s.x, y: s.y, scale: 1, opacity: 1 } };
        if (fx === 'train' && phase === 'out') {
          const { frames: f, duration } = paths[i];
          anim = { initial: false, animate: { x: f.x, y: f.y, scale: f.scale, opacity: f.opacity }, transition: { duration, times: f.times, ease: 'linear' } };
        } else if (fx === 'train' && phase === 'in') {
          const { frames: f, duration, delay } = paths[i];
          anim = {
            initial: { x: f.x[0], y: f.y[0], scale: 0.25, opacity: 0 },
            animate: { x: f.x, y: f.y, scale: f.scale, opacity: f.opacity },
            transition: { duration, delay, times: f.times, ease: 'linear' },
          };
        } else if (fx === 'core' && phase === 'out') {
          const f = spiral(radius, slotAngle(i), true);
          anim = { initial: false, animate: { x: f.x, y: f.y, scale: f.scale, opacity: f.opacity }, transition: { duration: 0.75, delay: i * 0.03, times: f.times, ease: 'easeIn' } };
        } else if (fx === 'core' && phase === 'in') {
          const f = spiral(radius, slotAngle(i), false);
          anim = {
            initial: { x: 0, y: 0, scale: 0.2, opacity: 0 },
            animate: { x: f.x, y: f.y, scale: f.scale, opacity: f.opacity.map((o, k) => (k === 0 ? 0 : 1)) },
            transition: { duration: 0.85, delay: 0.4 + i * 0.05, times: f.times, ease: 'easeOut' },
          };
        } else if (phase !== 'idle') {
          // warp / flip: logos sit in their slots, the whole ring moves
          anim = { initial: { x: s.x, y: s.y }, animate: { x: s.x, y: s.y } };
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

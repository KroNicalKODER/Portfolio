import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import './SkillPlanet.css';

// Vite: eager-load every logo in images/Stack as a URL keyed by filename.
const logoFiles = import.meta.glob('./images/Stack/*.svg', { eager: true, as: 'url' });
const logoUrl = (name) => logoFiles[`./images/Stack/${name}.svg`];

let ringSeq = 0;

const TAU = Math.PI * 2;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
// Orbit angle a: 0 = top, increasing clockwise on screen.
const onOrbit = (r, a) => ({ x: r * Math.sin(a), y: -r * Math.cos(a) });

// How long a leaving ring lives, per style (seconds).
const OUT_TIME = { eclipse: 0.75, flip: 0.9, pulse: 0.75, conveyor: 1.0 };

/*
 * Skills orbit the planet. On a category switch the current ring becomes a short-lived
 * "leaving" layer and a new "arriving" ring is added; leaving rings remove themselves,
 * so rapid switching can never leave the planet out of sync with the active category.
 * `fx` picks the switch style (see skillFx.js).
 */
const SkillPlanet = ({ groupId, items, label, fx = 'eclipse', size = 450, radius = 175, dot = 56 }) => {
  const planetRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [rings, setRings] = useState(() => [{ key: ringSeq++, groupId, items, phase: 'idle' }]);
  const compact = size < 350;

  const prevGroup = useRef(groupId);
  useLayoutEffect(() => {
    if (prevGroup.current === groupId) return;
    prevGroup.current = groupId;
    setHovered(null);
    setRings((rs) => [
      ...rs.map((r) => (r.phase === 'out' ? r : { ...r, phase: 'out' })),
      { key: ringSeq++, groupId, items, phase: 'in' },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  // Stable identity, so a re-render can't restart a leaving ring's cleanup timer.
  const removeRing = useCallback((key) => setRings((rs) => rs.filter((r) => r.key !== key)), []);

  const RingComp = fx === 'eclipse' ? EclipseRing : Ring;

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      className="skill-planet-wrapper h-full"
    >
      <div className="skill-planet-container">
        <div ref={planetRef} className="skill-planet" style={{ width: size, height: size, '--dot': `${dot}px` }}>
          {/* Eclipse: a copy of the planet layered between the back and front halves of the orbit */}
          {fx === 'eclipse' && <div className="skill-planet-cover" />}
          {rings.map((ring) => (
            <RingComp
              key={ring.key}
              ring={ring}
              fx={fx}
              planetRef={planetRef}
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

// One logo bubble (shared by every style).
const Dot = ({ item, dot, compact, hovered, setHovered, leaving }) => {
  const url = item.logo ? logoUrl(item.logo) : null;
  return (
    <span
      className={`skill-dot ${hovered === item.name && !leaving ? 'skill-dot-active' : ''}`}
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
  );
};

// Leaving rings always clean themselves up, even if an animation gets interrupted.
const useCleanup = (phase, key, onDone, seconds) => {
  useEffect(() => {
    if (phase !== 'out') return undefined;
    const t = setTimeout(() => onDone(key), seconds * 1000 + 150);
    return () => clearTimeout(t);
  }, [phase, key, onDone, seconds]);
};

/* ---------- Flipboard / Pulse / Conveyor ---------- */

const CONVEYOR_SPEED = 9; // rad/s

const Ring = ({ ring, fx, radius, dot, compact, hovered, setHovered, onDone }) => {
  const { key, items, phase } = ring;
  const n = items.length;
  const slotAngle = (i) => (i * TAU) / n;
  useCleanup(phase, key, onDone, OUT_TIME[fx] ?? 1);

  const maxSlot = Math.max(...items.map((_, i) => slotAngle(i)));

  const motionFor = (i) => {
    const a = slotAngle(i);
    const s = onOrbit(radius, a);
    const rest = { initial: false, animate: { x: s.x, y: s.y, scale: 1, opacity: 1, rotateY: 0 } };
    if (phase === 'idle') return rest;
    const order = a / TAU; // 0 at top, clockwise → 1

    if (fx === 'flip') {
      // Each logo flips edge-on in a wave around the circle; the new set flips in behind it.
      return phase === 'out'
        ? { initial: false, animate: { x: s.x, y: s.y, rotateY: 90, opacity: [1, 1, 0] }, transition: { duration: 0.28, delay: order * 0.5, ease: 'easeIn' } }
        : {
            initial: { x: s.x, y: s.y, rotateY: -90, opacity: 0 },
            animate: { x: s.x, y: s.y, rotateY: 0, opacity: 1 },
            transition: { duration: 0.32, delay: 0.26 + order * 0.5, ease: 'easeOut', opacity: { duration: 0.01, delay: 0.26 + order * 0.5 } },
          };
    }

    if (fx === 'pulse') {
      // The shockwave reaches the orbit ~0.25s in: old logos pop, new ones pop in right behind it.
      return phase === 'out'
        ? { initial: false, animate: { x: s.x, y: s.y, scale: [1, 1.25, 0], opacity: [1, 1, 0] }, transition: { duration: 0.35, delay: 0.18, times: [0, 0.4, 1] } }
        : {
            initial: { x: s.x, y: s.y, scale: 0, opacity: 0 },
            animate: { x: s.x, y: s.y, scale: [0, 1.25, 1], opacity: 1 },
            transition: { duration: 0.45, delay: 0.38 + order * 0.12, times: [0, 0.6, 1] },
          };
    }

    // conveyor: the circle never breaks; logos leave / enter through a gate at the top.
    if (phase === 'out') {
      const sweep = a === 0 ? 0.001 : TAU - a;
      const K = Math.max(2, Math.ceil(sweep / (Math.PI / 12)));
      const xs = [];
      const ys = [];
      const sc = [];
      const times = [];
      for (let k = 0; k <= K; k++) {
        const u = k / K;
        const p = onOrbit(radius, a + sweep * u);
        xs.push(p.x); ys.push(p.y); sc.push(u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25); times.push(u);
      }
      return { initial: false, animate: { x: xs, y: ys, scale: sc, opacity: sc }, transition: { duration: Math.max(0.12, sweep / CONVEYOR_SPEED), times, ease: 'linear' } };
    }
    const sweep = a;
    const K = Math.max(2, Math.ceil(sweep / (Math.PI / 12)));
    const xs = [];
    const ys = [];
    const sc = [];
    const times = [];
    for (let k = 0; k <= K; k++) {
      const u = k / K;
      const p = onOrbit(radius, sweep * u);
      xs.push(p.x); ys.push(p.y); sc.push(Math.min(1, u * 4 + (sweep < 0.01 ? 1 : 0))); times.push(u);
    }
    const delay = 0.3 + (maxSlot - a) / CONVEYOR_SPEED; // farthest-going logo leaves the gate first
    return {
      initial: { x: 0, y: -radius, scale: 0, opacity: 0 },
      animate: { x: xs, y: ys, scale: sc, opacity: sc.map(() => 1) },
      transition: { duration: Math.max(0.15, sweep / CONVEYOR_SPEED), delay, times, ease: 'easeOut', opacity: { duration: 0.05, delay } },
    };
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${phase === 'out' ? 'pointer-events-none' : ''}`}>
      {fx === 'pulse' && phase === 'in' && (
        <motion.span
          className="absolute rounded-full border-2 border-cyan-300 pointer-events-none"
          style={{ width: radius * 2, height: radius * 2, boxShadow: '0 0 30px rgba(0,255,224,0.6), inset 0 0 30px rgba(0,255,224,0.4)' }}
          initial={{ scale: 0.35, opacity: 0.9 }}
          animate={{ scale: 1.45, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
      {items.map((item, i) => (
        <motion.span
          key={item.name}
          className="skill-orbit"
          style={fx === 'flip' ? { transformPerspective: 500 } : undefined}
          {...motionFor(i)}
        >
          <Dot item={item} dot={dot} compact={compact} hovered={hovered} setHovered={setHovered} leaving={phase === 'out'} />
        </motion.span>
      ))}
    </div>
  );
};

/* ---------- Eclipse: tilted 3D orbit passing in front of / behind the planet ---------- */

const BASE_SPIN = 0.3; // rad/s while idle
const TILT = 0.34; // vertical squash of the orbit ellipse
const WIDE = 1.35; // the eclipse orbit is wider than the flat one so logos clear the planet's face

const EclipseRing = ({ ring, planetRef, radius, dot, compact, hovered, setHovered, onDone }) => {
  const { key, items, phase } = ring;
  const n = items.length;
  const els = useRef([]);
  const theta = useRef(Math.random() * TAU);
  const phaseAt = useRef(performance.now());
  const last = useRef(null);
  const paused = useRef(false);

  useEffect(() => {
    phaseAt.current = performance.now();
  }, [phase]);
  useCleanup(phase, key, onDone, OUT_TIME.eclipse);

  useAnimationFrame((now) => {
    const dt = last.current == null ? 0 : Math.min(0.05, (now - last.current) / 1000);
    last.current = now;
    const since = (now - phaseAt.current) / 1000;

    let spin = BASE_SPIN;
    const R = radius * WIDE;
    let r = R;
    let fade = 1;
    if (phase === 'out') {
      const e = clamp01(since / OUT_TIME.eclipse);
      spin = BASE_SPIN + 9 * e;
      r = R * (1 - 0.6 * e * e);
      fade = 1 - e;
    } else if (phase === 'in') {
      const e = clamp01((since - 0.3) / 1.1);
      const ease = 1 - (1 - e) ** 3;
      spin = BASE_SPIN + 9 * (1 - ease);
      r = R * (0.4 + 0.6 * ease);
      fade = e <= 0 ? 0 : Math.min(1, e * 2.5);
    }
    if (!(paused.current && phase !== 'out')) theta.current += spin * dt;

    // Undo the planet's slow CSS spin so the orbit's tilt stays level.
    const planet = planetRef.current;
    const prot = planet ? (parseFloat(getComputedStyle(planet).rotate) || 0) * (Math.PI / 180) : 0;
    const c = Math.cos(-prot);
    const s = Math.sin(-prot);

    for (let i = 0; i < n; i++) {
      const el = els.current[i];
      if (!el) continue;
      const a = theta.current + (i * TAU) / n;
      const depth = Math.sin(a); // +1 front (bottom of ellipse), -1 back
      const x0 = r * Math.cos(a);
      const y0 = r * TILT * depth;
      const x = x0 * c - y0 * s;
      const y = x0 * s + y0 * c;
      const sc = 0.72 + 0.28 * (depth + 1) / 2;
      el.style.transform = `translate(${x}px, ${y}px) scale(${sc})`;
      el.style.zIndex = depth >= 0 ? 3 : 1;
      el.style.opacity = String(fade * (depth >= 0 ? 1 : 0.55));
    }
  });

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${phase === 'out' ? 'pointer-events-none' : ''}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {items.map((item, i) => (
        <span key={item.name} ref={(el) => (els.current[i] = el)} className="skill-orbit" style={{ opacity: 0 }}>
          <Dot item={item} dot={dot} compact={compact} hovered={hovered} setHovered={setHovered} leaving={phase === 'out'} />
        </span>
      ))}
    </div>
  );
};

export default SkillPlanet;

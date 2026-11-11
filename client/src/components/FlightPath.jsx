import React, { useCallback, useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import rocketMan from '../assets/astraunut on rocket.png';
import bigPlanet from '../assets/planet-3.png';
import smallPlanet from './Skill/images/planet-2.png';
import { experience } from '../Data/profile';
import LogSheet from './LogSheet.jsx';
import './FlightPath.css';

// Quadratic Bézier orbit, in a 1000 × 300 viewBox. The SVG is stretched to its box
// (preserveAspectRatio="none"), so viewBox units map 1:1 to percentages of the container.
const P0 = { x: 40, y: 250 };
const P1 = { x: 500, y: -60 };
const P2 = { x: 960, y: 250 };
const VB_W = 1000;
const VB_H = 300;
const PATH_D = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

const point = (t) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
});
const tangentDeg = (t) => {
  const dx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
  const dy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

// Oldest job on the left, newest on the right, evenly spaced along the orbit.
const stops = [...experience].reverse();
const makeTFor = (compact) => {
  const start = compact ? 0.24 : 0.17;
  const end = compact ? 0.76 : 0.83;
  return (i) => (stops.length === 1 ? 0.5 : start + ((end - start) * i) / (stops.length - 1));
};

// The rocket art points up-right at roughly -30°.
const ROCKET_HEADING = -30;

const FlightPath = ({ compact = false }) => {
  const tFor = makeTFor(compact);
  const [selected, setSelected] = useState(stops.length - 1); // start at the current job
  const [goingLeft, setGoingLeft] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closeLog = useCallback(() => setExpanded(false), []);
  const t = useMotionValue(tFor(selected));

  const left = useTransform(t, (v) => `${(point(v).x / VB_W) * 100}%`);
  const top = useTransform(t, (v) => `${(point(v).y / VB_H) * 100}%`);
  const rotate = useTransform(t, (v) => {
    const travel = goingLeft ? tangentDeg(v) + 180 : tangentDeg(v);
    // When flipped horizontally the art's heading mirrors to 180 - ROCKET_HEADING.
    return goingLeft ? travel - (180 - ROCKET_HEADING) : travel - ROCKET_HEADING;
  });

  const select = (i) => {
    if (i === selected) return;
    setGoingLeft(i < selected);
    setSelected(i);
    setExpanded(false);
  };

  useEffect(() => {
    const controls = animate(t, tFor(selected), { duration: 1.4, ease: [0.45, 0, 0.2, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, t]);

  useEffect(() => {
    if (compact) return undefined;
    const onKey = (e) => {
      if (document.body.dataset.overlay === 'open') return;
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'arrowleft') select(Math.max(0, selected - 1));
      if (k === 'd' || k === 'arrowright') select(Math.min(stops.length - 1, selected + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const job = stops[selected];
  const planetSize = (j) => (compact ? (j.current ? 92 : 62) : j.current ? 140 : 96);

  return (
    <div className="w-full">
      {/* ---- orbit ---- */}
      <div className={`relative w-full ${compact ? 'aspect-[1000/520]' : 'aspect-[1000/300]'}`}>
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="rgba(0,255,224,0.25)"
            strokeWidth="6"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'blur(4px)' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="#00FFE0"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className="flight-dash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </svg>

        {stops.map((j, i) => {
          const p = point(tFor(i));
          const size = planetSize(j);
          const active = i === selected;
          return (
            <motion.button
              key={j.slug}
              type="button"
              onClick={() => select(i)}
              onMouseEnter={() => !compact && select(i)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: active ? 1.08 : 0.92, opacity: active ? 1 : 0.7 }}
              transition={{ type: 'spring', duration: 1, delay: 0.4 + i * 0.25 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%` }}
              aria-label={`${j.name}, ${j.period}`}
            >
              <span className={`relative block rounded-full ${active ? 'planet-active' : ''}`} style={{ width: size, height: size }}>
                <img
                  src={j.current ? bigPlanet : smallPlanet}
                  className="planet-spin w-full h-full object-contain rounded-full"
                  alt=""
                />
                {j.current && <span className="planet-ping" />}
              </span>
              <span className={`mt-2 font-inter font-extrabold whitespace-nowrap ${compact ? 'text-[0.7rem]' : 'text-sm'} ${active ? 'text-white' : 'text-gray-400'}`}>
                {j.name}
              </span>
              <span className={`font-inter font-bold whitespace-nowrap ${compact ? 'text-[0.55rem]' : 'text-[0.7rem]'} ${j.current ? 'text-green-400' : 'text-cyan-300/70'}`}>
                {j.current ? '● ' : ''}
                {j.period}
              </span>
            </motion.button>
          );
        })}

        {/* rocket rides the orbit */}
        <motion.div
          className="absolute pointer-events-none z-10"
          style={{ left, top, rotate, x: '-50%', y: '-50%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <img
            src={rocketMan}
            alt=""
            className={`${compact ? 'w-14' : 'w-24'} drop-shadow-[0_0_18px_rgba(0,255,224,0.45)]`}
            style={{ transform: goingLeft ? 'scaleX(-1)' : undefined }}
          />
        </motion.div>
      </div>

      {/* ---- mission log: headline stats, full log on demand ---- */}
      <div className={`relative ${compact ? 'mt-12' : 'mt-[clamp(2.5rem,9vh,5rem)] mx-auto max-w-[56rem]'}`}>
          <motion.div
            key={job.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`text-center ${compact ? 'px-3 py-4' : 'px-8 py-2'}`}
          >
            <div className={`font-mono tracking-[0.25em] ${compact ? 'text-[0.55rem]' : 'text-[0.65rem]'}`}>
              <span className="text-cyan-300">{job.role}</span>
              <span className="text-gray-500"> ▸ </span>
              <span className={job.current ? 'text-green-400' : 'text-yellow-300'}>{job.current ? 'ACTIVE' : 'COMPLETE'}</span>
            </div>
            <div className={`mt-0.5 font-inter font-bold text-gray-400 ${compact ? 'text-[0.62rem]' : 'text-xs'}`}>
              {job.company} · {job.period}
            </div>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-cyan-300/[0.06] font-mono tracking-[0.2em] text-cyan-200 hover:bg-cyan-300/15 hover:border-cyan-300 transition-colors ${
                compact ? 'px-3 py-1 text-[0.55rem]' : 'px-4 py-1.5 text-[0.62rem]'
              }`}
            >
              FULL LOG ▸
            </button>

              <div className={`mt-4 grid divide-x divide-white/10 ${job.highlights.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {job.highlights.map((h, j) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + j * 0.1 }}
                    className={compact ? 'px-1.5' : 'px-4'}
                  >
                    <div
                      className={`font-inter font-extrabold bg-gradient-to-br from-white to-cyan-300 bg-clip-text text-transparent ${
                        compact ? 'text-sm leading-tight' : 'text-[1.7rem] leading-tight'
                      }`}
                    >
                      {h.value}
                    </div>
                    <div className={`mt-1 font-inter font-bold uppercase tracking-wide text-white ${compact ? 'text-[0.55rem]' : 'text-[0.7rem]'}`}>
                      {h.label}
                    </div>
                    <div className={`font-inter text-gray-400 ${compact ? 'text-[0.52rem]' : 'text-[0.68rem]'}`}>{h.sub}</div>
                  </motion.div>
                ))}
              </div>

          </motion.div>
      </div>

      <LogSheet job={job} open={expanded} onClose={closeLog} compact={compact} />
    </div>
  );
};

export default FlightPath;

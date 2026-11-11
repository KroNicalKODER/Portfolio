import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Minimal coverflow: only artwork slides (the neighbours are smaller, faded and slightly
// tilted), and the details of the centred project appear once, underneath.
// Move with drag/swipe, arrow keys or A/D, clicking a neighbour, the arrows or the dots.
const Coverflow = ({ items, compact = false, keyboard = true, initial = 0 }) => {
  const [active, setActive] = useState(initial);
  const last = items.length - 1;
  const go = (i) => setActive(Math.max(0, Math.min(last, i)));

  useEffect(() => {
    if (!keyboard) return undefined;
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'arrowleft') setActive((i) => Math.max(0, i - 1));
      if (k === 'd' || k === 'arrowright') setActive((i) => Math.min(last, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboard, last]);

  // Artwork is 600×340; keep that ratio.
  const W = compact ? 250 : 380;
  const H = Math.round((W * 340) / 600);
  const MAX_SIDE = 1;
  const scaleAt = [1, 0.7, 0.5];
  const opacityAt = [1, 0.5, 0.22];

  // Centre x of a slide `abs` steps away: half the active width + gap + previous widths.
  const xAt = (abs) => {
    let x = 0;
    let prevHalf = W / 2;
    for (let k = 1; k <= abs; k++) {
      const half = (W * scaleAt[Math.min(k, 2)]) / 2;
      x += prevHalf + (compact ? 14 : 24) + half;
      prevHalf = half;
    }
    return x;
  };

  const p = items[active];

  return (
    <div className="flex flex-col items-center w-full select-none">
      <motion.div
        className="relative w-full flex justify-center"
        style={{ height: H, perspective: 1200, touchAction: 'pan-y' }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -40) go(active + 1);
          else if (info.offset.x > 40) go(active - 1);
        }}
      >
        {items.map((item, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const hidden = abs > MAX_SIDE;
          const isActive = offset === 0;
          return (
            <motion.button
              key={item.slug}
              type="button"
              tabIndex={hidden ? -1 : 0}
              aria-label={item.title}
              onClick={() => go(i)}
              initial={false}
              animate={{
                x: Math.sign(offset) * xAt(Math.min(abs, MAX_SIDE + 1)),
                scale: scaleAt[Math.min(abs, 2)],
                rotateY: -Math.sign(offset) * 18,
                opacity: hidden ? 0 : opacityAt[Math.min(abs, 2)],
              }}
              transition={{ type: 'spring', stiffness: 140, damping: 22 }}
              className={`absolute top-0 rounded-xl overflow-hidden border transition-[border-color,box-shadow] duration-500 ${
                isActive ? 'border-cyan-300/60 shadow-[0_0_40px_rgba(0,255,224,0.22)]' : 'border-white/10'
              }`}
              style={{ width: W, height: H, zIndex: 50 - abs, pointerEvents: hidden ? 'none' : 'auto' }}
            >
              <img src={`/static/ProjectImages/${item.slug}.svg`} className="w-full h-full object-cover" alt="" draggable={false} />
              {item.status && isActive && (
                <span className="absolute top-2 right-2 rounded-full border border-yellow-300/50 bg-black/70 px-2 py-[2px] font-inter text-[0.55rem] font-bold text-yellow-200">
                  {item.status}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* details of the centred project */}
      <div className={`w-full text-center font-inter ${compact ? 'mt-4 px-6 min-h-[7.5rem]' : 'mt-6 max-w-[30rem] min-h-[8.5rem]'}`}>
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className={`font-extrabold ${compact ? 'text-base' : 'text-2xl'}`}>{p.title}</h3>
            <p className={`mt-1 text-gray-300 leading-snug ${compact ? 'text-[0.72rem]' : 'text-sm'}`}>{p.message}</p>
            <div className={`mt-2 font-mono text-cyan-300/80 ${compact ? 'text-[0.55rem]' : 'text-[0.65rem]'}`}>{p.extras}</div>
            <div className="mt-3 text-xs font-semibold">
              {p.link ? (
                <a href={p.link} target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 underline-offset-4 hover:underline">
                  View on GitHub ↗
                </a>
              ) : (
                <span className="text-gray-500">Private build</span>
              )}
            </div>
          </motion.div>
      </div>

      {/* controls */}
      <div className="mt-2 flex items-center gap-5 font-inter">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous project"
          className="text-3xl leading-none text-white/70 hover:text-cyan-300 disabled:opacity-20 transition-colors"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={item.title}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-1.5 bg-cyan-300' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === last}
          aria-label="Next project"
          className="text-3xl leading-none text-white/70 hover:text-cyan-300 disabled:opacity-20 transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Coverflow;

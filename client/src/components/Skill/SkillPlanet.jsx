import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SkillPlanet.css';

// Vite: eager-load every logo in images/Stack as a URL keyed by filename.
const logoFiles = import.meta.glob('./images/Stack/*.svg', { eager: true, as: 'url' });
const logoUrl = (name) => logoFiles[`./images/Stack/${name}.svg`];

// Skills orbit the planet; the planet spins, the logos counter-spin so they stay upright.
const SkillPlanet = ({ items, label, size = 450, radius = 175, dot = 56 }) => {
  const [hovered, setHovered] = useState(null);
  const step = 360 / items.length;
  const compact = size < 350;

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      exit={{ x: 100, opacity: 0 }}
      className="skill-planet-wrapper h-full"
    >
      <div className="skill-planet-container">
        <div className="skill-planet" style={{ width: size, height: size, '--dot': `${dot}px` }}>
          {items.map((item, i) => {
            const angle = i * step;
            const url = item.logo ? logoUrl(item.logo) : null;
            return (
              <span
                key={item.name}
                className="skill-orbit"
                style={{ transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)` }}
              >
                <span
                  className={`skill-dot ${hovered === item.name ? 'skill-dot-active' : ''}`}
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
              </span>
            );
          })}
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

export default SkillPlanet;

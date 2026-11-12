import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SCREENS } from '../Data/profile';
import Starfield from '../components/Starfield.jsx';
import {
  OverviewScene,
  ProfileScene,
  ExperienceScene,
  SkillsScene,
  ProjectsScene,
  AcademicsScene,
  AchievementsScene,
} from './Mobile/Scenes.jsx';

const SCENES = [OverviewScene, ProfileScene, ExperienceScene, SkillsScene, ProjectsScene, AcademicsScene, AchievementsScene];
const ids = SCREENS.map((s) => s.toLowerCase());

// Mobile: the same journey as desktop, as a vertical snap-scroll with a dot rail at the bottom.
const Mobile = () => {
  const scroller = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(ids.indexOf(e.target.id));
        });
      },
      { root, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = root.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isLast = active === ids.length - 1;

  // Programmatic jumps (Next button, dots, name) pause snapping while the page scrolls.
  // Safari otherwise tends to cancel or redirect a smooth scroll inside a mandatory-snap container.
  const restoreSnap = useRef(null);
  const jump = (i) => {
    const m = scroller.current;
    const el = m?.querySelector(`#${ids[i]}`);
    if (!el) return;
    setActive(i);
    m.style.scrollSnapType = 'none';
    m.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    clearTimeout(restoreSnap.current);
    const done = () => {
      clearTimeout(restoreSnap.current);
      m.removeEventListener('scrollend', done);
      m.style.scrollSnapType = '';
    };
    m.addEventListener('scrollend', done, { once: true });
    restoreSnap.current = setTimeout(done, 1200); // browsers without scrollend
  };
  useEffect(() => () => clearTimeout(restoreSnap.current), []);

  return (
    <div className="relative h-[100svh] supports-[height:100dvh]:h-[100dvh] bg-black text-white font-inter">
      <Starfield />
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 h-14 bg-gradient-to-b from-black/80 to-transparent">
        <button type="button" onClick={() => jump(0)} className="font-extrabold text-sm">
          <span className="text-red-500">M</span>radul | <span className="text-red-500">K</span>ronikal <span className="text-red-500">K</span>odar
        </button>
        <Link to={'/email'} className="border-[1.6px] border-white rounded-lg px-3 py-[3px] text-xs font-bold">
          Let&apos;s Talk
        </Link>
      </header>

      <main ref={scroller} className="relative z-10 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth overscroll-contain">
        {SCENES.map((S, i) => (
          <S key={ids[i]} />
        ))}
      </main>

      {/* Next screen (or back to top on the last one) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[3.75rem] z-40 flex justify-center">
        {/* One permanent button; only its label changes (no exit animations that could leave a stale copy). */}
        <button
          type="button"
          onClick={() => jump(isLast ? 0 : active + 1)}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 text-[0.65rem] font-bold tracking-wide text-cyan-200 active:scale-95 transition-transform"
          aria-label={isLast ? 'Back to top' : `Next: ${SCREENS[active + 1]}`}
        >
          <motion.span
            key={isLast ? 'top' : active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5"
          >
            {isLast ? (
              <>
                Back to top <span className="text-sm leading-none">↑</span>
              </>
            ) : (
              <>
                Next · <span className="text-white">{SCREENS[active + 1]}</span>
                <motion.span
                  className="text-sm leading-none"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
              </>
            )}
          </motion.span>
        </button>
      </div>

      <nav className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3 h-14 bg-gradient-to-t from-black/90 to-transparent">
        {SCREENS.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => jump(i)}
            className={`flex items-center gap-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'bg-purple-400/20 border border-purple-400 px-3 py-1' : 'p-1'
            }`}
          >
            <span className={`block rounded-full transition-all ${i === active ? 'w-2 h-2 bg-purple-400 shadow-[0_0_10px_#c084fc]' : 'w-1.5 h-1.5 bg-white/40'}`} />
            {i === active && <span className="text-[0.6rem] font-bold text-purple-200">{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Mobile;

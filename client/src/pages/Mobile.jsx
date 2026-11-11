import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

  const jump = (i) => scroller.current.querySelector(`#${ids[i]}`)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative h-[100svh] bg-black text-white font-inter">
      <Starfield />
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 h-14 bg-gradient-to-b from-black/80 to-transparent">
        <button type="button" onClick={() => jump(0)} className="font-extrabold text-sm">
          <span className="text-red-500">M</span>radul | <span className="text-red-500">K</span>ronikal <span className="text-red-500">K</span>odar
        </button>
        <Link to={'/email'} className="border-[1.6px] border-white rounded-lg px-3 py-[3px] text-xs font-bold">
          Let&apos;s Talk
        </Link>
      </header>

      <main ref={scroller} className="relative z-10 h-full overflow-y-auto overflow-x-hidden snap-y snap-proximity no-scrollbar scroll-smooth">
        {SCENES.map((S, i) => (
          <S key={ids[i]} />
        ))}
      </main>

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

import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import ScrollComponent from './components/ScrollComponent.jsx';
import { SCREENS } from './Data/profile';
import Overview from './pages/Overview.jsx';
import Profile from './pages/Profile.jsx';
import Experience from './pages/Experience.jsx';
import Skill from './pages/Skill.jsx';
import Project from './pages/Project.jsx';
import Academics from './pages/Academics.jsx';
import Achievements from './pages/Achievements.jsx';
import Mobile from './pages/Mobile.jsx';
import Email from './pages/Email.jsx';
import Starfield from './components/Starfield.jsx';


const SCREEN_COMPONENTS = [Overview, Profile, Experience, Skill, Project, Academics, Achievements];
const LAST = SCREENS.length;
const NAV_COOLDOWN_MS = 1100;

const LaptopScreen = () => {
  const [screen, setScreen] = useState(1);
  const lockedUntil = useRef(0);
  const wheelDelta = useRef(0);

  const go = (next) => {
    const clamped = Math.min(LAST, Math.max(1, next));
    if (clamped === screen || Date.now() < lockedUntil.current) return;
    lockedUntil.current = Date.now() + NAV_COOLDOWN_MS;
    setScreen(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Screen navigation pauses while an overlay (e.g. the Full log sheet) is open.
    const overlayOpen = () => document.body.dataset.overlay === 'open';
    const onKey = (e) => {
      if (overlayOpen()) return;
      if (e.key === 'ArrowUp' || e.key === 'w') go(screen - 1);
      else if (e.key === 'ArrowDown' || e.key === 's') go(screen + 1);
    };
    // Trackpads emit many small wheel events; accumulate and fire once past a threshold.
    const onWheel = (e) => {
      if (overlayOpen() || Date.now() < lockedUntil.current) return;
      wheelDelta.current += e.deltaY;
      if (Math.abs(wheelDelta.current) > 60) {
        go(screen + (wheelDelta.current > 0 ? 1 : -1));
        wheelDelta.current = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const Current = SCREEN_COMPONENTS[screen - 1];

  return (
    <div className="relative bg-black max-h-screen max-w-[100%] text-white overflow-hidden">
      <Starfield />
      <div className="absolute z-40 flex w-full justify-center items-center mt-12 pointer-events-none">
        <Link to={'/email'} className="pointer-events-auto border-2 z-10 border-white rounded-md px-5 font-inter font-bold cursor-pointer py-1">
          Let&apos;s Talk
        </Link>
      </div>
      <ScrollComponent currScreenCount={screen} onSelect={go} />
      <div className="relative z-10">
        <Current />
      </div>
    </div>
  );
};

const Layout = () => (window.innerWidth > 768 ? <LaptopScreen /> : <Mobile />);

// reducedMotion="user": Framer Motion animations follow the OS "reduce motion" setting.
const App = () => (
  <MotionConfig reducedMotion="user">
  <Router>
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/email" element={<Email />} />
      {/* Old per-page mobile links now land on the single scrolling mobile view. */}
      <Route path="/mobile/*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
  </MotionConfig>
);

export default App;

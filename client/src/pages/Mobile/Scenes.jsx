import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import bluePlanet from '../../assets/blue.png';
import planetMan from '../../assets/planet+astraunut.png';
import rocketMan from '../../assets/astraunut on rocket.png';
import purplePlanet from '../../assets/planet-3.png';
import redPlanet from '../../assets/planet-2.png';
import educated from '../../assets/Educated-Astaunot.png';
import winner from '../../assets/winner-astraunaut.png';
import gitHub from '../../assets/Logos/github.png';
import LinkedIn from '../../assets/Logos/linkedin.png';
import Leetcode from '../../assets/Logos/leetcode.png';
import CodeChef from '../../assets/Logos/codechef.png';

import Standing from '../../components/Standing.jsx';
import UFO from '../../components/UFO.jsx';
import TimelineItem from '../../components/TimelineItem.jsx';
import FlightPath from '../../components/FlightPath.jsx';
import Coverflow from '../../components/Coverflow.jsx';
import SkillPlanet from '../../components/Skill/SkillPlanet.jsx';
import RandomText from '../../components/Animations/RandomText.jsx';
import { links, profileBio, skillGroups, projects, academics, achievements } from '../../Data/profile';

/* ---------- shared bits ---------- */

const inView = { once: true, amount: 0.3 };

// Split-colour heading, e.g. <Heading parts={['P', 'ROF', 'I', 'LE']} />
export const Heading = ({ parts: [a, b, c, d] }) => (
  <motion.h2
    initial={{ x: -120, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={inView}
    transition={{ duration: 1.2, type: 'spring' }}
    className="font-inter font-extrabold leading-none drop-shadow-md"
  >
    <span className="text-red-500 text-6xl">{a}</span>
    <span className="text-white text-4xl">{b}</span>
    <span className="text-cyan-300 text-6xl">{c}</span>
    <span className="text-white text-4xl">{d}</span>
  </motion.h2>
);

const Scene = ({ id, children, className = '' }) => (
  <section id={id} className={`relative snap-start min-h-[100svh] overflow-hidden px-5 pt-20 pb-24 ${className}`}>
    {children}
  </section>
);

const Rise = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={inView}
    transition={{ duration: 0.8, delay, type: 'spring' }}
    className={className}
  >
    {children}
  </motion.div>
);

const socials = [
  [links.github, gitHub, 'GitHub'],
  [links.linkedin, LinkedIn, 'LinkedIn'],
  [links.leetcode, Leetcode, 'LeetCode'],
  [links.codechef, CodeChef, 'CodeChef'],
];

export const Socials = ({ small = false }) => (
  <div className="flex flex-wrap gap-2">
    {socials.map(([href, icon, label]) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`font-inter font-semibold border-2 border-white/80 rounded-lg flex items-center ${small ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'}`}
      >
        <img width={small ? 16 : 20} height={small ? 16 : 20} className="mr-1.5" src={icon} alt="" />
        {label}
      </a>
    ))}
  </div>
);

/* ---------- scenes ---------- */

export const OverviewScene = () => (
  <Scene id="overview" className="flex flex-col justify-end">
    <motion.img
      initial={{ x: -300, y: -300, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 2, type: 'spring' }}
      src={bluePlanet}
      className="absolute -top-[14rem] -left-[16rem] w-[32rem] max-w-none"
      alt=""
    />
    <motion.img
      initial={{ x: -400, y: 120 }}
      animate={{ x: 0, y: 0 }}
      transition={{ duration: 1.8, delay: 0.6, type: 'spring' }}
      src={rocketMan}
      className="absolute top-24 right-5 w-24"
      alt=""
    />
    <motion.img
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.5, type: 'spring' }}
      src={planetMan}
      className="absolute -bottom-4 -right-28 w-[40rem] max-w-none pointer-events-none"
      alt=""
    />

    <div className="relative z-10 mb-[30vh]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-5">
        <RandomText inMobile />
      </motion.div>
      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1.2 }}
        className="font-inter font-extrabold text-[2.1rem] leading-[1.05] drop-shadow-lg"
      >
        <span className="text-[#00FFE0]">TAKE</span> A JOURNEY
        <br />
        THROUGH MY
        <br />
        DIGITAL <span className="text-[#00FFE0]">COSMOS</span>
      </motion.h1>
      <motion.p
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1.6, delay: 0.3 }}
        className="mt-4 inline-block border-2 border-white px-3 py-1.5 font-inter font-bold text-[0.65rem] tracking-wider"
      >
        BACKEND · PLATFORM · AI AGENTS
      </motion.p>
    </div>
  </Scene>
);

export const ProfileScene = () => (
  <Scene id="profile">
    <img src={redPlanet} className="absolute -top-40 -right-44 w-[26rem] max-w-none opacity-80" alt="" />
    <div className="relative z-10">
      <Heading parts={['P', 'ROF', 'I', 'LE']} />
      <Rise className="h-[42vh] -mt-2">
        <Canvas className="h-full">
          <ambientLight intensity={1.25} />
          <spotLight intensity={13.5} position={[-2, -1, 2]} />
          <pointLight intensity={20} position={[2, -1, 1]} color="blue" />
          <pointLight intensity={15} position={[1, 1, 1]} color="green" />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Suspense>
            <Standing />
          </Suspense>
          <UFO />
        </Canvas>
      </Rise>
      <Rise delay={0.15} className="font-inter font-semibold text-[0.8rem] leading-relaxed space-y-3">
        {profileBio.map((p, i) => (
          <p key={i} className={i === profileBio.length - 1 ? 'text-cyan-300' : ''}>
            {p}
          </p>
        ))}
      </Rise>
      <Rise delay={0.3} className="mt-5">
        <Socials small />
      </Rise>
    </div>
  </Scene>
);

export const ExperienceScene = () => (
  <Scene id="experience" className="flex flex-col justify-center">
    <Heading parts={['E', 'XPER', 'I', 'ENCE']} />
    <Rise className="mt-1 font-inter text-[0.65rem] text-cyan-300 tracking-wider">TAP A PLANET TO FLY</Rise>
    <Rise className="mt-4">
      <FlightPath compact />
    </Rise>
  </Scene>
);

export const SkillsScene = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((g) => g.id === activeId);
  return (
    <Scene id="skills" className="flex flex-col">
      <Heading parts={['S', 'KIL', 'L', 'S']} />
      <Rise className="mt-5 flex flex-wrap gap-2">
        {skillGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveId(g.id)}
            className={`font-inter font-extrabold text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeId === g.id ? 'border-[rgb(249,192,255)] text-[rgb(249,192,255)] bg-white/5' : 'border-white/30 text-white/80'
            }`}
          >
            {g.label}
          </button>
        ))}
      </Rise>
      <div className="flex-1 flex items-center justify-center min-h-[22rem]">
        <SkillPlanet key={active.id} items={active.items} label={active.label} size={264} radius={150} dot={48} />
      </div>
      <Rise className="text-center font-inter text-[0.65rem] text-gray-400">Tap a logo to name it</Rise>
    </Scene>
  );
};

export const ProjectsScene = () => (
  <Scene id="projects" className="flex flex-col justify-center">
    <Heading parts={['P', 'ROJ', 'E', 'CTS']} />
    <Rise className="mt-1 font-inter text-[0.65rem] text-cyan-300 tracking-wider">SWIPE ← → {projects.length} PROJECTS</Rise>
    <Rise className="mt-6 -mx-5">
      <Coverflow items={projects} compact keyboard={false} />
    </Rise>
  </Scene>
);

export const AcademicsScene = () => (
  <Scene id="academics" className="flex flex-col">
    <motion.img
      initial={{ x: -300, y: -300 }}
      whileInView={{ x: 0, y: 0 }}
      viewport={inView}
      transition={{ duration: 1.5, type: 'spring' }}
      src={purplePlanet}
      className="absolute -top-56 -left-56 w-[30rem] max-w-none opacity-90"
      alt=""
    />
    <div className="relative z-10">
      <Heading parts={['A', 'CADE', 'M', 'ICS']} />
      <div className="-ml-5">
        {academics.map((item, i) => (
          <TimelineItem key={item.title} compact index={i} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
    <motion.img
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={inView}
      transition={{ duration: 1.5, type: 'spring' }}
      src={educated}
      className="self-end mt-auto w-52 -mr-2"
      alt=""
    />
  </Scene>
);

export const AchievementsScene = () => (
  <Scene id="achievements" className="flex flex-col !pb-32">
    <div className="relative z-10">
      <Heading parts={['A', 'CHIEV', 'E', 'MENTS']} />
      <div className="-ml-5">
        {achievements.map((item, i) => (
          <TimelineItem key={item.title} compact index={i} title={item.title} subtitle={item.subtitle} href={item.href} />
        ))}
      </div>
    </div>
    <motion.img
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={inView}
      transition={{ duration: 1.5, type: 'spring' }}
      src={winner}
      className="self-center mt-6 w-56"
      alt=""
    />
    <Rise className="mt-auto pt-8 border-t border-white/10">
      <div className="flex items-center justify-between font-inter">
        <span className="font-bold text-sm">Let&apos;s build something.</span>
        <Link to={'/email'} className="border-2 border-white rounded-md px-4 py-1 text-xs font-bold">
          Let&apos;s Talk
        </Link>
      </div>
      <div className="mt-4">
        <Socials small />
      </div>
      <p className="mt-5 text-[0.6rem] text-gray-500 font-inter">© {new Date().getFullYear()} Mradul Varshney · {links.email}</p>
    </Rise>
  </Scene>
);

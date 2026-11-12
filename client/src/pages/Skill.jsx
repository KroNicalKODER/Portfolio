import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import SkillPlanet from '../components/Skill/SkillPlanet.jsx';
import { skillGroups } from '../Data/profile';

import './Skill.css';

const Skill = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((g) => g.id === activeId);

  // Hover intent: sweeping across the words shouldn't fire an animation per word.
  const hoverTimer = useRef(null);
  const hoverTo = (id) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveId(id), 120);
  };
  const cancelHover = () => clearTimeout(hoverTimer.current);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  return (
    <motion.div className="h-screen">
      <motion.div className="flex w-full h-screen">
        <motion.div className="flex flex-[1] flex-col justify-center">
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, type: 'spring', ease: 'linear' }}
            className="ml-20 -mt-20"
          >
            <motion.span className="text-red-500 text-8xl font-inter font-extrabold">S</motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">KIL</motion.span>
            <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">L</motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">S</motion.span>
          </motion.div>

          <motion.div className="ml-36 mt-12">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.3, type: 'spring' }}
                className={`skill-tab font-inter ${i > 0 ? 'mt-10' : ''} ${activeId === group.id ? 'skill-tab-active' : ''}`}
                data-text={group.label}
                onClick={() => {
                  cancelHover();
                  setActiveId(group.id);
                }}
                onHoverStart={() => hoverTo(group.id)}
                onHoverEnd={cancelHover}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {group.label}
              </motion.div>
            ))}
          </motion.div>

          <div className="flex w-full justify-center items-center mt-12">
            <Link to={'/email'} className="border-2 z-10 border-white rounded-md px-5 font-inter font-bold cursor-pointer py-1">
              Hire Me
            </Link>
          </div>
        </motion.div>

        <motion.div className="flex flex-[1] flex-col justify-center items-center">
          <motion.div
            className="w-[40rem] h-[40rem] rounded-[50%]"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: [500, 0], y: [0, 0], opacity: 1 }}
            transition={{ duration: 2, type: 'spring', ease: 'linear' }}
          >
            <SkillPlanet groupId={active.id} items={active.items} label={active.label} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Skill;

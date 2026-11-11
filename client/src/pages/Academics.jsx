import React from 'react';
import { motion } from 'framer-motion';

import PurplePlanet from '../assets/planet-3.png';
import astronaut from '../assets/Educated-Astaunot.png';
import TimelineItem from '../components/TimelineItem.jsx';
import { academics } from '../Data/profile';

const Academics = () => {
  return (
    <div className="h-screen overflow-hidden">
      <motion.img
        initial={{ x: -1800, y: -1800 }}
        animate={{ x: -600, y: -600, transition: { duration: 1.5, type: 'spring' } }}
        src={PurplePlanet}
        className="object-cover -translate-x-[40rem] -translate-y-[40rem] absolute"
        alt=""
      />

      <div className="h-full w-full flex">
        <div className="flex flex-[1] justify-center flex-col">
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, type: 'spring', ease: 'linear' }}
            className="z-10 ml-20 -mt-16"
          >
            <motion.span className="text-red-500 text-8xl font-inter font-extrabold">A</motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">CADE</motion.span>
            <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">M</motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">ICS</motion.span>
          </motion.div>
          {academics.map((item, i) => (
            <TimelineItem key={item.title} index={i} title={item.title} subtitle={item.subtitle} />
          ))}
        </div>
        <div className="flex flex-[1] justify-center items-center">
          <motion.img
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1.5, type: 'spring' } }}
            src={astronaut}
            className="h-[70%]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Academics;

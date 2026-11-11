import React from 'react';
import { motion } from 'framer-motion';

import Winner from '../assets/winner-astraunaut.png';
import TimelineItem from '../components/TimelineItem.jsx';
import { achievements } from '../Data/profile';

const Achievements = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full w-full flex">
        <div className="flex flex-[1] justify-center flex-col">
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, type: 'spring', ease: 'linear' }}
            className="z-10 ml-20 -mt-16"
          >
            <motion.span className="text-red-500 text-8xl font-inter font-extrabold">A</motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">CHIEV</motion.span>
            <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">E</motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">MENTS</motion.span>
          </motion.div>
          {achievements.map((item, i) => (
            <TimelineItem key={item.title} index={i} title={item.title} subtitle={item.subtitle} href={item.href} />
          ))}
        </div>
        <div className="flex flex-[1] justify-center items-center">
          <motion.img
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1.5, type: 'spring' } }}
            src={Winner}
            className="h-[70%]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Achievements;

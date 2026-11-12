import React from 'react';
import { motion } from 'framer-motion';

import FlightPath from '../components/FlightPath.jsx';

const Experience = () => (
  <div className="h-screen overflow-hidden relative">
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ duration: 2, type: 'spring', ease: 'linear' }}
      className="z-10 ml-20 mt-16 relative"
    >
      <motion.span className="text-red-500 text-8xl font-inter font-extrabold">E</motion.span>
      <motion.span className="text-white text-5xl font-inter font-extrabold">XPER</motion.span>
      <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">I</motion.span>
      <motion.span className="text-white text-5xl font-inter font-extrabold">ENCE</motion.span>
    </motion.div>

    <div className="mx-auto w-[68vw] -mt-20">
      <FlightPath />
      <div className="mt-4 text-center font-inter text-[0.65rem] font-bold text-green-400">
        Hover a planet · A/← · D/→ to fly
      </div>
    </div>
  </div>
);

export default Experience;

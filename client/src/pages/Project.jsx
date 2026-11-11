import React from 'react';
import { motion } from 'framer-motion';

import Coverflow from '../components/Coverflow.jsx';
import earthImg from '../assets/earth.png';
import { projects } from '../Data/profile';

const Project = () => (
  <motion.div className="h-screen overflow-hidden relative">
    <motion.div
      className="absolute flex items-center justify-center h-screen m-0 overflow-hidden"
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: -350, opacity: 0.7, transition: { duration: 2, type: 'spring' } }}
    >
      <motion.img
        className="w-full h-full rounded-[50%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        src={earthImg}
        alt=""
      />
    </motion.div>

    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ duration: 2, type: 'spring', ease: 'linear' }}
      className="relative z-10 ml-20 mt-16"
    >
      <motion.span className="text-red-500 text-8xl font-inter font-extrabold">P</motion.span>
      <motion.span className="text-white text-5xl font-inter font-extrabold">ROJ</motion.span>
      <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">E</motion.span>
      <motion.span className="text-white text-5xl font-inter font-extrabold">CTS</motion.span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.5, type: 'spring' } }}
      className="relative z-10 mt-6"
    >
      <Coverflow items={projects} initial={1} />
    </motion.div>
  </motion.div>
);

export default Project;

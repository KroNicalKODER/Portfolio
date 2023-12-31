import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import FullStack from '../components/Skill/FullStack';
import SoftSkills from '../components/Skill/SoftSkills';
import Designing from '../components/Skill/Designing';
import Programming from '../components/Skill/Programming';

import { Link } from 'react-router-dom'

import redPlanet from '../assets/planet-2.png';

import './Skill.css';

const Skill = () => {
  const [showFullStackDevelopment, setShowFullStackDevelopment] = useState(true);
  const [showGraphicDesign, setShowGraphicDesign] = useState(false);
  const [showProgrammingLanguages, setShowProgrammingLanguages] = useState(false);
  const [showSoftSkills, setShowSoftSkills] = useState(false);

  return (
    <motion.div className='h-screen'>
      <motion.div className='flex w-full h-screen'>
        <motion.div className='flex flex-[1] flex-col justify-center'>
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, type: 'spring', ease: 'linear' }}
            className='ml-20 -mt-20'
          >
            <motion.span className='text-red-500 text-8xl font-inter font-extrabold'>S</motion.span>
            <motion.span className='text-white text-5xl font-inter font-extrabold'>KIL</motion.span>
            <motion.span className='text-cyan-300 text-8xl font-inter font-extrabold'>L</motion.span>
            <motion.span className='text-white text-5xl font-inter font-extrabold'>S</motion.span>
          </motion.div>
          <motion.div className='ml-36 mt-12'>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', ease: 'easeInOut' }}
              className='AnimationHover font-inter'
              onClick={() => {
                setShowFullStackDevelopment(true);
                setShowGraphicDesign(false);
                setShowProgrammingLanguages(false);
                setShowSoftSkills(false);
              }}
              onHoverStart={() => {
                setShowFullStackDevelopment(true);
                setShowGraphicDesign(false);
                setShowProgrammingLanguages(false);
                setShowSoftSkills(false);
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className='AnimationHover'>DEVELOPMENT</div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, type: 'spring', ease: 'easeInOut' }}
              className='AnimationHover-Graphic font-inter mt-10'
              onClick={() => {
                setShowFullStackDevelopment(false);
                setShowGraphicDesign(true);
                setShowProgrammingLanguages(false);
                setShowSoftSkills(false);
              }}
              onHoverStart={() => {
                setShowFullStackDevelopment(false);
                setShowGraphicDesign(true);
                setShowProgrammingLanguages(false);
                setShowSoftSkills(false);
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className='AnimationHover-Graphic'>GRAPHIC DESIGNING</div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: 'spring', ease: 'easeInOut' }}
              className='AnimationHover-Programming font-inter mt-10'
              onClick={() => {
                setShowFullStackDevelopment(false);
                setShowGraphicDesign(false);
                setShowProgrammingLanguages(true);
                setShowSoftSkills(false);
              }}
              onHoverStart={() => {
                setShowFullStackDevelopment(false);
                setShowGraphicDesign(false);
                setShowProgrammingLanguages(true);
                setShowSoftSkills(false);
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className='AnimationHover-Programming whitespace-nowrap'>PROGRAMMING LANGUAGES</div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1, type: 'spring', ease: 'easeInOut' }}
              className='AnimationHover-Soft font-inter mt-10'
              onClick={() => {
                setShowFullStackDevelopment(false);
                setShowGraphicDesign(false);
                setShowProgrammingLanguages(false);
                setShowSoftSkills(true);
              }}
              onHoverStart={() => {
                setShowFullStackDevelopment(false);
                setShowGraphicDesign(false);
                setShowProgrammingLanguages(false);
                setShowSoftSkills(true);
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className='AnimationHover-Soft'>ALSO KNOWS</div>
            </motion.div>
          </motion.div>
            <div className="flex w-full justify-center items-center mt-12">
                <Link to={'/email'} className="border-2 z-10 border-white rounded-md px-5 font-inter font-bold cursor-pointer py-1">
                  Hire Me
                </Link>
              </div>
        </motion.div>

        <motion.div className='flex flex-[1] flex-col justify-center items-center'>
          <motion.div
            className='w-[40rem] h-[40rem] rounded-[50%]'
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: [500, 0], y: [0, 0], opacity: 1 }}
            transition={{ duration: 2, type: 'spring', ease: 'linear' }}
          >
            {/* <motion.img
              src={redPlanet}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              exit={{ x: 0, y: 0 }}
              transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            /> */}
            <AnimatePresence mode='wait'>
              {showFullStackDevelopment && <FullStack key={1} />}
              {showGraphicDesign && <Designing key={2} />}
              {showProgrammingLanguages && <Programming key={3} />}
              {showSoftSkills && <SoftSkills key={4} />}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Skill;

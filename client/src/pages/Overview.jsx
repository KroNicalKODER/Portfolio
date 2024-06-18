import React from 'react'
import { motion } from 'framer-motion'
import bluePlanet from '../assets/blue.png'
import planetMan from '../assets/planet+astraunut.png'
import rocketMan from '../assets/astraunut on rocket.png'
import Bubble from '../components/Animations/Bubble'
// import RandomText from '../components/Animations/RandomText.jsx'
import { Link } from 'react-router-dom'

const Overview = () => {
  return (
    <motion.div
      className='relative h-screen overflow-hidden flex flex-col'>
      <motion.div
        key="overview-1"
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: [-500, 0], y: [-500, 0], opacity: 1 }}
        transition={{ duration: 2, type: 'spring', ease: 'linear' }}
        className='-translate-x-[30rem] -translate-y-[30rem]'
        >
        <motion.div
        key="overview-2"
          initial={{ rotate: 0, x: -550, y: -550 }}
          animate={{ rotate: 360, x: -550, y: -550 }}
          exit={{x:0,y:0}}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className='absolute -translate-x-[30rem] rounded-full -translate-y-[30rem]'
          >
          <img src={bluePlanet} alt='Blue Planet' />
        </motion.div>
      </motion.div>

      <motion.div
      key="overview-3"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className='absolute'
        >
        <img src={planetMan} alt='Blue Planet' />
      </motion.div>
      <motion.div
      key="overview-4"
        initial={{ x: 0 }}
        animate={{ x: [-2000, 2000], y: [100, -400] }}
        exit={{x:0,y:0}}
        transition={{ duration: 1.6, ease: 'linear' }}
        className='absolute rounded-full translate-x-0 z-10 top-28 right-96'
      >
        <img src={rocketMan} alt='' />
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [-1000, -10, 10, 0], y: [2, -2, 2] }}
        transition={{ duration: 4, delay: 2, ease: 'linear' }}
        className='absolute w-[10rem] rounded-full translate-x-0 top-36 z-10 right-[22rem]'
      >
        <img src={rocketMan} alt='' />
      </motion.div>
      <div className='flex'>
        <div className='w-[70rem] -translate-x-[30rem] rounded-full -translate-y-[30rem]'>

        </div>
        <div className='flex flex-col w-[20%]'>
        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: -50, opacity: 1 }}
          exit={{ x: -1000, opacity: 0 }}
          transition={{ duration: 2, type: "spring" }}
          className='mt-6 -translate-x-10 font-inter font-bold whitespace-nowrap w-[120%]'>
          <span className='text-red-500 text-lg'>M</span>
          <span className=''>radul | </span>
          <span className='text-red-500 text-lg'>K</span>
          <span className=''>ronikal </span>
          <span className='text-red-500 text-lg'>K</span>
          <span className=''>odar</span>
        </motion.div>
        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: -50, opacity: 1 }}
          exit={{ x: -1000, opacity: 0 }}
          transition={{ duration: 2, type: "spring" }}
        className='-translate-x-12 w-[130%]'>
        {/* <RandomText/> */}
        </motion.div>
        
        <Link to={'/email'}>
        <motion.button 
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: -50, opacity: 1 }}
        exit={{ x: -1000, opacity: 0 }}
        transition={{ duration: 2, type: "spring" }}
        className='font-bold border-2 border-white text-sm w-fit px-4 flex justify-center items-center text-center rounded-lg cursor-pointer -translate-x-12 mt-2'>
          Let's Talk
        </motion.button>
          </Link>
      </div>
            </div>
      <div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className='text-[3rem] mt-24 -translate-x-0 ml-10 drop-shadow-lg'>
          <div className='font-inter font-extrabold'>
            <span className='text-[#00FFE0]'>TAKE</span>
            <span> A JOURNEY THROUGH MY</span>
          </div>
          <div className='font-inter font-extrabold'>
            <span>DIGITAL</span>
            <span className='text-[#00FFE0]'> COSMOS</span>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', duration: 2 }}
        className='font-inter z-10 drop-shadow-lg ml-10 font-bold translate-x-0 border-2 py-2 px-3 flex w-fit border-white'>
        <span className='tracking-wider'>EXPLORE THE VASTNESS OF CODE AND DESIGN IN MY COSMIC REALM</span>
      </motion.div>
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{duration: 4, type:'spring'}}
      >
        <Bubble/>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
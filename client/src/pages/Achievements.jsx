import React from 'react'
import {motion} from 'framer-motion'

import Astronaut from '../assets/achievements.png'
import Winner from '../assets/winner-astraunaut.png'



const Achievements = () => {
  return (
    <div className="h-screen overflow-hidden">
      
      
      <div className="h-full w-full flex">
        <div className="flex flex-[1] justify-center flex-col">
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, type: "spring", ease: "linear" }}
            className="z-10 ml-20 -mt-16"
          >
            <motion.span className="text-red-500 text-8xl font-inter font-extrabold">
              A
            </motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">
              CHIEV
            </motion.span>
            <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">
              E
            </motion.span>
            <motion.span className="text-white text-5xl font-inter font-extrabold">
              MENTS
            </motion.span>
          </motion.div>
          <motion.div className="relative ml-32 mt-14">
            <motion.svg
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring'}}}

              className="w-[80%] absolute"
              width="817"
              height="65"
              viewBox="0 0 817 65"
              fill="none"
              xmlns="http://www.w3.org/2000/motion.svg"
            >
              <circle
                cx="13.5"
                cy="13.5"
                r="12.5"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="21.7246"
                y1="23.3108"
                x2="60.7246"
                y2="64.3108"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="60"
                y1="64"
                x2="817"
                y2="64"
                stroke="#ECECEC"
                stroke-width="3"
              />
            </motion.svg>
            <motion.div 
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 0.6}}}
              className="font-inter font-extrabold text-sm ml-[7%]">
              HEAD OF DIGITAL DESIGN
            </motion.div>
            <motion.div 
              initial={{x:400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 0.6}}}
              className="font-inter font-bold text-xs ml-[7%]">
              Parola - Literary Hub Of JIIT NOIDA
            </motion.div>
          </motion.div>
          <motion.div className="relative ml-32 mt-10">
            <motion.svg
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 0.2}}}
              className="absolute w-[80%]"
              width="817"
              height="65"
              viewBox="0 0 817 65"
              fill="none"
              xmlns="http://www.w3.org/2000/motion.svg"
            >
              <circle
                cx="13.5"
                cy="13.5"
                r="12.5"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="21.7246"
                y1="23.3108"
                x2="60.7246"
                y2="64.3108"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="60"
                y1="64"
                x2="817"
                y2="64"
                stroke="#ECECEC"
                stroke-width="3"
              />
            </motion.svg>
            <motion.div 
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 1.0}}}
              className="font-inter font-extrabold text-sm ml-[7%]">
              3-star Profile + Top 11%
            </motion.div>
            <motion.div 
              initial={{x:400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 1.0}}}
              className="font-inter font-bold text-xs ml-[7%]">
              CodeChef and LeetCode
            </motion.div>
          </motion.div>
          <motion.div className=" relative ml-32 mt-10">
            <motion.svg
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 0.4}}}
              className="absolute w-[80%]"
              width="817"
              height="65"
              viewBox="0 0 817 65"
              fill="none"
              xmlns="http://www.w3.org/2000/motion.svg"
            >
              <circle
                cx="13.5"
                cy="13.5"
                r="12.5"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="21.7246"
                y1="23.3108"
                x2="60.7246"
                y2="64.3108"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="60"
                y1="64"
                x2="817"
                y2="64"
                stroke="#ECECEC"
                stroke-width="3"
              />
            </motion.svg>
            <motion.div 
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 1.4}}}
              className="font-inter font-extrabold text-sm ml-[7%]">
              HEAD OF DIGITAL DESIGN
            </motion.div>
            <motion.div 
              initial={{x:400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 1.4}}}
              className="font-inter font-bold text-xs ml-[7%]">
              JOUST-Literary Fest Of DELHI-NCR
            </motion.div>
          </motion.div>
          <motion.div className=" relative ml-32 mt-10">
            <motion.svg
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 0.6}}}
              className="absolute w-[80%]"
              width="817"
              height="65"
              viewBox="0 0 817 65"
              fill="none"
              xmlns="http://www.w3.org/2000/motion.svg"
            >
              <circle
                cx="13.5"
                cy="13.5"
                r="12.5"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="21.7246"
                y1="23.3108"
                x2="60.7246"
                y2="64.3108"
                stroke="#ECECEC"
                stroke-width="3"
              />
              <line
                x1="60"
                y1="64"
                x2="817"
                y2="64"
                stroke="#ECECEC"
                stroke-width="3"
              />
            </motion.svg>
            <motion.div 
              initial={{x:-400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 1.8}}}
              className="font-inter font-extrabold text-sm ml-[7.5%]">
              600+ Problems Solved
            </motion.div>
            <motion.div 
              initial={{x:400, opacity: 0}}
              animate={{x:0, opacity: 1, transition: {duration: 1, ease: 'linear' , type: 'spring', delay: 1.8}}}
              className="font-inter font-bold text-xs ml-[7%]">
              LeetCode, GFG, and other coding platforms
            </motion.div>
          </motion.div>
        </div>
        <div className="flex flex-[1] justify-center items-center">
          <motion.img 
          initial={{x:1000, opacity: 0}}
          animate={{x:0, opacity: 1, transition: {duration: 1.5, ease: 'linear' , type: 'spring'}}}
          src={Winner} className="h-[70%]" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Achievements
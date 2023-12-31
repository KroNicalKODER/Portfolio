import React from 'react'
import {motion} from 'framer-motion'

import Wrapper from '../components/Wrapper'

import earthImg from '../assets/earth.png'
import { Link } from 'react-router-dom'


const Project = () => {
  return (
    <motion.div className='h-screen overflow-hidden'>
      <motion.div
        className='absolute flex items-center justify-center h-screen m-0 overflow-hidden'
        initial={{x: 0,opacity:1}}
        animate={{x: -350, opacity:0.7, transition: {duration: 2, ease:'linear', type: 'spring'}}}
      >
        <motion.img 
          className='w-full h-full rounded-[50%]'
          initial={{rotate:0}}
          animate={{rotate: 360 , transition:{duration: 200, loop: Infinity}}}
          src={earthImg} alt="" />
      </motion.div>
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ duration: 2, type: "spring", ease: "linear" }}
        className="z-10 ml-20 mt-16"
      >
        <motion.span className="text-red-500 text-8xl font-inter font-extrabold">
          P
        </motion.span>
        <motion.span className="text-white text-5xl font-inter font-extrabold">
          ROJ
        </motion.span>
        <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold">
          E
        </motion.span>
        <motion.span className="text-white text-5xl font-inter font-extrabold">
          CTS
        </motion.span>
      </motion.div>
      <div className='flex justify-center flex-col items-center mt-20'>
        
        <motion.svg
          initial={{y:200, opacity:0}}
          animate={{y:0, opacity:1, transition:{duration:1, delay: 0.5, type:'spring', ease:'ease-in'}}} 
          width="835" height="85" viewBox="0 0 1202 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 105.5H231L361 1.5H843M1202 106H971L841 2H359" stroke="#00FFD1" stroke-width="3"/>
        </motion.svg>
        <motion.svg
          initial={{width:0}}
          animate={{width:"100%", transition:{duration:2, delay:0.9}}}
          className='-translate-y-12' width="350" height="20" viewBox="0 0 494 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="11" y1="13.5" x2="483" y2="13.5" stroke="#FF0000" stroke-width="5"/>
          <g filter="url(#filter0_f_0_1)">
          <line x1="11" y1="13.5" x2="483" y2="13.5" stroke="#FF0000" stroke-width="5"/>
          </g>
          <g filter="url(#filter1_f_0_1)">
          <line x1="11" y1="13.5" x2="483" y2="13.5" stroke="#FF0000" stroke-width="5"/>
          </g>
          <defs>
          <filter id="filter0_f_0_1" x="0.8" y="0.8" width="492.4" height="25.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="5.1" result="effect1_foregroundBlur_0_1"/>
          </filter>
          <filter id="filter1_f_0_1" x="0.8" y="0.8" width="492.4" height="25.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="5.1" result="effect1_foregroundBlur_0_1"/>
          </filter>
          </defs>
        </motion.svg>
        <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1, transition:{duration:5, delay:1.5, type: 'spring'}}}
          className='-translate-y-12'>
          <Wrapper/>
        </motion.div>

        <motion.svg 
          initial={{width:0}}
          animate={{width:"100%", transition:{duration:2, delay:0.9}}}
          className='-translate-y-12' width="350" height="20" viewBox="0 0 494 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="11" y1="13.5" x2="483" y2="13.5" stroke="#FF0000" stroke-width="5"/>
          <g filter="url(#filter0_f_0_1)">
          <line x1="11" y1="13.5" x2="483" y2="13.5" stroke="#FF0000" stroke-width="5"/>
          </g>
          <g filter="url(#filter1_f_0_1)">
          <line x1="11" y1="13.5" x2="483" y2="13.5" stroke="#FF0000" stroke-width="5"/>
          </g>
          <defs>
          <filter id="filter0_f_0_1" x="0.8" y="0.8" width="492.4" height="25.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="5.1" result="effect1_foregroundBlur_0_1"/>
          </filter>
          <filter id="filter1_f_0_1" x="0.8" y="0.8" width="492.4" height="25.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="5.1" result="effect1_foregroundBlur_0_1"/>
          </filter>
          </defs>
        </motion.svg>

        <motion.svg
          initial={{y:-200, opacity:0}}
          animate={{y:-97, opacity:1, transition:{duration:1, delay: 0.5, type:'spring', ease:'ease-in'}}} 
          className='-translate-y-24' width="835" height="85" viewBox="0 0 1202 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2.5H231L361 106.5H843M1202 2H971L841 106H359" stroke="#00FFD1" stroke-width="3"/>
        </motion.svg>


      </div>
    </motion.div>
  )
}

export default Project
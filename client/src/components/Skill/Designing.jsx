import React from 'react'
import {motion} from 'framer-motion'

import canva from './images/Designing/canva.webp'
import figma from './images/Designing/figma.png'
import gimp from './images/Designing/gimp.png'
import illustrator from './images/Designing/illustrator.png'
import kdenlive from './images/Designing/kdenlive.png'
import photoshop from './images/Designing/photoshop.png'
import xd from './images/Designing/xd.png'

import './Designing.css'


const Designing = () => {
  return (
    <motion.div 
      initial={{opacity:0, x:200}}
      animate={{opacity:1,x:0, transition:{duration:1}}}
      exit={{x:100, opacity: 0}}
      class="wrapper-designing h-full">
    <div class="container-designing">
      <div class="bubble-wrapper-designing" id="bubble-wrapper-1">
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={canva} className='w-[50px] h-[50px] opacity-70 rounded-[50%]' alt="" /> </span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={figma} className=' rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={gimp} className='rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={illustrator} className='w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={kdenlive} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={photoshop} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={xd} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
      </div>
    </div>
  </motion.div>
  )
}

export default Designing
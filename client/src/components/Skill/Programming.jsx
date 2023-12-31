import React from 'react'
import {motion} from 'framer-motion'

import Cl from './images/Programming/c.png'
import Cpp from './images/Programming/c++.png'
import js from './images/Programming/js.png'
import python from './images/Programming/python.png'
import Solidity from './images/Programming/Solidity.png'

import './SoftSkills.css'

const Programming = () => {
  return (
    <motion.div 
      initial={{opacity:0, x: 200}}
      animate={{opacity:1,x:0, transition:{duration:1}}}
      exit={{x:100, opacity: 0}}
      class="wrapper-skills h-full">
    <div class="container-skills">
      <div class="bubble-wrapper-skills" id="bubble-wrapper-1">
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={Cl} className='w-[50px] h-[50px] opacity-70 rounded-[50%]' alt="" /> </span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={Cpp} className=' rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={js} className='rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={python} className='w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={Solidity} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
      </div>
    </div>
  </motion.div>
  )
}

export default Programming
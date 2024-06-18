import React from 'react';
import {motion} from 'framer-motion'

import express from './images/FullStack/express-js.png'
import mysql from './images/FullStack/mysql.png'
import node from './images/FullStack/nodejs.png'
import native from './images/FullStack/reactnative.png'
import mongo from './images/FullStack/mongodb.png'
import php from './images/FullStack/php.png'
import react from './images/FullStack/react.png'

import './Designing.css'

const BubbleAnimation = () => {
  return (
    <motion.div
      initial={{opacity:0, x: 200}}
      animate={{opacity:1,x:0, transition:{duration:1}}}
      exit={{x:100, opacity: 0}}
      class="wrapper-designing h-full">
    <div class="container-designing">
      <div class="bubble-wrapper-designing" id="bubble-wrapper-1">
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={express} className='w-[50px] h-[50px] opacity-70 rounded-[50%]' alt="" /> </span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={mysql} className=' rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={node} className='rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={native} className='w-[50px] h-[50px] opacity-70 rounded-[50%]' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={mongo} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={php} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
        <span class="dot2-designing w-[100px] h-[100px]"> <img src={react} className='w-[50px] h-[50px] rounded-[50%]' alt="" /></span>
      </div>
    </div>
  </motion.div>
  );
};

export default BubbleAnimation;

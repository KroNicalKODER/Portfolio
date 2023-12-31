import React from 'react';
import { motion } from 'framer-motion';

import aiml from "./images/SoftSkills/ai-ml.png"
import blockchain from "./images/SoftSkills/blockchain.png"
import communication from "./images/SoftSkills/communication.png"
import languages from "./images/SoftSkills/languages.png"
import leadership from "./images/SoftSkills/leadership.png"

import './SoftSkills.css'

const BubbleAnimation = () => {
  return (
    <motion.div
        initial={{opacity:0, x:200}}
        animate={{opacity:1, x:0 ,transition:{duration:1}}}
        exit={{x:100, opacity: 0}}
        class="wrapper-skills h-full">
    <div class="container-skills">
      <div class="bubble-wrapper-skills" id="bubble-wrapper-1-skills">
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={blockchain} className='w-[50px] h-[50px] opacity-70' alt="" /> </span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={aiml} className=' rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={leadership} className='rounded-[50%] w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={communication} className='w-[50px] h-[50px] opacity-70' alt="" /></span>
        <span class="dot2-skills w-[100px] h-[100px]"> <img src={languages} className='w-[50px] h-[50px] opacity-70' alt="" /></span>
      </div>
    </div>
  </motion.div>
  );
};

export default BubbleAnimation;

import React from 'react'
import { Link } from 'react-router-dom'
import Developer from '../../assets/Mobile/skill-developer.png'
import Designer from '../../assets/Mobile/skill-designer.png'
import Programming from '../../assets/Mobile/skill-programming.png'
import Soft from '../../assets/Mobile/skill-soft.png'

import {motion} from 'framer-motion'

import gitHub from '../../assets/Logos/github.png'
import LinkedIn from '../../assets/Logos/linkedin.png'
import Leetcode from '../../assets/Logos/leetcode.png'
import CodeChef from '../../assets/Logos/codechef.png'

const Skills = () => {
  return (
    <div className='min-h-screen max-h-fit bg-black text-white font-inter'>
        <div className="flex font-semibold py-2 justify-center">
          <span>Mradul | KronikalKodar</span>
          <Link to={'/'} className="flex items-center text-xs ml-6 border-[1.6px] border-white px-3 rounded-lg">
            Back
          </Link>
        </div>
        <div className='flex flex-col justify-center overflow-x-hidden'>
          <motion.img
          initial={{x:-450}}
          animate={{x:0, transition:{duration:0.7, type:'spring'}}}
          src={Developer} className='w-[90%]' alt="" />
          <motion.img
          initial={{x:450}}
          animate={{x:0, transition:{duration:0.7, type:'spring'}}}
          src={Designer} className='w-[90%]' alt="" />
          <motion.img
          initial={{x:-450}}
          animate={{x:0, transition:{duration:0.7, type:'spring'}}}
          src={Programming} className='w-[90%]' alt="" />
          <motion.img
          initial={{x:450}}
          animate={{x:0, transition:{duration:0.7, type:'spring'}}}
          src={Soft} className='w-[90%]' alt="" />
        </div>
        <div className="flex flex-col font-semibold py-12 justify-center">
          <div className='flex w-full justify-center'>
          <span>Click to Send an E-mail</span>
          <Link to={'/email'} className="flex items-center text-xs ml-6 border-[1.6px] border-white px-3 rounded-lg">
            Let's Talk
          </Link>
          </div>
          <div className='flex justify-center mt-4'>
          <a href="https://github.com/KroNicalKODER" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="18" height="18" className="mr-1" src={gitHub} alt="github"/>
            <span className='text-xs'>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/mradul-varshney-b43698260/" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="18" height="18" className="mr-1" src={LinkedIn} alt="github"/>
            <span className='text-xs'>LinkedIn</span>
          </a>
          <a href="https://leetcode.com/KronikalKodar/" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="18" height="18" className="mr-1" src={Leetcode} alt="github"/>
          <span className='text-xs'>LeetCode</span>
          </a>
          <a href="https://www.codechef.com/users/kronikalkodar" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="18" height="18" className="mr-1" src={CodeChef} alt="github"/>
          <span className='text-xs'>CodeChef</span>          </a>
          </div>
        </div>

    </div>
  )
}

export default Skills
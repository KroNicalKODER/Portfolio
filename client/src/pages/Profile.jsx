import React, { Suspense } from "react";
import Standing from "../components/Standing.jsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import planet from "../assets/planet-2.png";
import UFO from "../components/UFO.jsx";
import {Link} from 'react-router-dom'

import gitHub from '../assets/Logos/github.png'
import LinkedIn from '../assets/Logos/linkedin.png'
import Leetcode from '../assets/Logos/leetcode.png'
import CodeChef from '../assets/Logos/codechef.png'

const Profile = () => {
  return (
    <div className="flex h-screen">
      <img
        src={planet}
        className="absolute -mt-[40rem] -ml-[37rem]"
        alt=""
      />
      <div className="flex flex-[1] flex-col">
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: "spring", ease: "linear" }}
          className="z-10 ml-20 mt-16 "
        >
          <motion.span className="text-red-500 text-8xl font-inter font-extrabold drop-shadow-md">
            P
          </motion.span>
          <motion.span className="text-white text-5xl font-inter font-extrabold drop-shadow-md">
            ROF
          </motion.span>
          <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold drop-shadow-md">
            I
          </motion.span>
          <motion.span className="text-white text-5xl font-inter font-extrabold drop-shadow-md">
            LE
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: "spring", ease: "linear" }}
          className="z-10 ml-20 mt-16 font-inter font-semibold"
        >
          In the digital realm, I explore Graphic Design, Full Stack
          Development, Data Structures, Algorithms, and Blockchain with passion.
          I create captivating visuals, interactive experiences, and optimize
          code with precision. Eagerly delving into decentralized systems, I aim
          to push boundaries and make a lasting impact in the limitless space of
          creativity and technology.In this infinite space where creativity has
          no bounds and innovation has no limits, I aspire to leave a lasting
          mark.
        </motion.div>
        <div className="flex w-full ml-16 z-50 justify-center items-center mt-12">
          <Link to={'/email'} className="border-2 z-10 border-white rounded-md px-5 font-inter font-bold cursor-pointer py-1">
            Let's Talk
          </Link>
          <a href="https://github.com/KroNicalKODER" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="25" height="25" className="mr-1" src={gitHub} alt="github"/>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/mradul-varshney-b43698260/" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="25" height="25" className="mr-1" src={LinkedIn} alt="github"/>
            LinkedIn
          </a>
          <a href="https://leetcode.com/KronikalKodar/" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="25" height="25" className="mr-1" src={Leetcode} alt="github"/>
            LeetCode
          </a>
          <a href="https://www.codechef.com/users/kronikalkodar" target="_blank" className="font-inter font-semibold text-sm border-2 ml-2 px-2 rounded-lg py-1 flex items-center">
          <img width="25" height="25" className="mr-1" src={CodeChef} alt="github"/>
            CodeChef
          </a>
        </div>
      </div>
      <div className="flex flex-[1] flex-col">
        <div className="flex w-full justify-center translate-y-12 shadow-lg text-cyan-300 font-inter font-semibold">
          Drag to Move around
        </div>
        <motion.div
          className="h-screen"
          animate={{y: [-10,10,-10]}}
          transition={{ ease: "linear", duration: 100, repeat: Infinity }}
        >
          
        <Canvas shadows className={"h-screen"}>
          <ambientLight intensity={1.25}/>
          <spotLight intensity={13.5} position={[-2,-1,2]} />
          <pointLight intensity={20} position={[2,-1,1]} color="blue" />
          <pointLight intensity={5} position={[1,2,2]} color="red" />
          <pointLight intensity={5} position={[1,2,2]} color="green" />
          <pointLight intensity={15} position={[1,1,1]} color="green" />
          <OrbitControls enableZoom={false} enablePan={false}/>
          <Suspense>
            <Standing />
          </Suspense>
          <UFO/>
        </Canvas>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;

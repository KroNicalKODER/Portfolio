import React, { Suspense } from 'react';
import Standing from '../components/Standing.jsx';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import planet from '../assets/planet-2.png';
import UFO from '../components/UFO.jsx';

import SocialIcons from '../components/SocialIcons.jsx';
import { profileBio } from '../Data/profile';

const Profile = () => {
  return (
    <div className="flex h-screen">
      <img src={planet} className="absolute -mt-[40rem] -ml-[37rem]" alt="" />
      <div className="relative z-10 flex flex-[1] flex-col justify-center pl-20 pr-10 pb-10">
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: 'spring', ease: 'linear' }}
        >
          <motion.span className="text-red-500 text-8xl font-inter font-extrabold drop-shadow-md">P</motion.span>
          <motion.span className="text-white text-5xl font-inter font-extrabold drop-shadow-md">ROF</motion.span>
          <motion.span className="text-cyan-300 text-8xl font-inter font-extrabold drop-shadow-md">I</motion.span>
          <motion.span className="text-white text-5xl font-inter font-extrabold drop-shadow-md">LE</motion.span>
        </motion.div>

        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: 'spring', ease: 'linear' }}
          className="mt-8 max-w-[36rem] font-inter font-semibold space-y-4 text-[0.95rem] leading-relaxed"
        >
          {profileBio.map((p, i) => (
            <p key={i} className={i === profileBio.length - 1 ? 'text-cyan-300' : 'text-gray-100'}>
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-9 flex items-center gap-5"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.3em] text-gray-400">FIND ME ON</span>
          <span className="h-px w-10 bg-white/20" />
          <SocialIcons />
        </motion.div>
      </div>
      <div className="flex flex-[1] flex-col">
        <div className="flex w-full justify-center translate-y-12 shadow-lg text-cyan-300 font-inter font-semibold">
          Drag to move around
        </div>
        <motion.div className="h-screen" animate={{ y: [-10, 10, -10] }} transition={{ ease: 'linear', duration: 100, repeat: Infinity }}>
          <Canvas shadows className={'h-screen'}>
            <ambientLight intensity={1.25} />
            <spotLight intensity={13.5} position={[-2, -1, 2]} />
            <pointLight intensity={20} position={[2, -1, 1]} color="blue" />
            <pointLight intensity={5} position={[1, 2, 2]} color="red" />
            <pointLight intensity={5} position={[1, 2, 2]} color="green" />
            <pointLight intensity={15} position={[1, 1, 1]} color="green" />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Suspense>
              <Standing />
            </Suspense>
            <UFO />
          </Canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

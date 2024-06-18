import React, { useRef, useEffect, useState } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import StandingModel from '../assets/Models/Standing/model.glb';
const Standing = (props) => {
  const { scene: model, animations } = useGLTF(StandingModel);


  const stRef = useRef();
  animations[0].name = "StandingAnimation"

  const animationsName = ["StandingAnimation"]
  
  const { actions, mixer } = useAnimations([animations[0]],model,{clampWhenFinished:true})
  
  
  useEffect(() => {
      actions[animationsName[0]].reset().play();
      return
    }, [])

  return (
    <mesh ref={stRef} position={[0,-2.5,0]} scale={[2.63,2.63,2.63]} rotation={[0.2,0.2,0.01]}>
      <primitive object={model} />
    </mesh>
  );
};

export default Standing;

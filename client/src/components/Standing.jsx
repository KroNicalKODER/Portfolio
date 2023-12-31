import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import StandingModel from '../assets/Models/Standing/model.glb';
import ThinkingModel from '../assets/Models/Thinking/thinking.glb'
import LookingAround from '../assets/Models/Looking Around/Looking Around.glb'
import BackFlip from '../assets/Models/Backflip/model.glb'

const Standing = (props) => {
  const { scene: model, animations } = useGLTF(StandingModel);
  const {animations: thinking} = useGLTF(ThinkingModel)
  const {animations: looking} = useGLTF(LookingAround)
  const {animations: backflip} = useGLTF(BackFlip)

  const [currAnimation, setCurrAnimation] = useState(0)

  const stRef = useRef();
  animations[0].name = "StandingAnimation"
  thinking[0].name="ThinkingAnimation"
  looking[0].name="LookingAnimation"
  backflip[0].name="BackflipAnimation"

  const animationsName = ["StandingAnimation","StandingAnimation","BackflipAnimation","ThinkingAnimation"]
  
  const { actions, mixer } = useAnimations([animations[0],thinking[0],looking[0],backflip[0]],model,{clampWhenFinished:true})
  
  
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

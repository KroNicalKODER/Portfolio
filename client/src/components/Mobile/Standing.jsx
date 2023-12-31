import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import StandingModel from '../../assets/Models/Standing/model.glb';

const Standing = () => {
  const { scene: standing, animations } = useGLTF(StandingModel);
  const stRef = useRef();
  const { actions, mixer } = useAnimations(animations, standing);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
  });

  useEffect(() => {
    actions["IdleV4.2(maya_head)"].play()
  });

  return (
    <mesh ref={stRef} position={[0,-2.6,0]} scale={[2.6,2.6,2.6]} rotation={[0.24,0.5,-0.01]}>
      <primitive object={standing} />
    </mesh>
  );
};

export default Standing;

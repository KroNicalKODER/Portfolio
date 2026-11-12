import React, { useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import StandingModel from '../assets/Models/Standing/model.glb';

// The 3D avatar, playing its idle animation on loop.
const Standing = () => {
  const { scene: model, animations } = useGLTF(StandingModel);
  const stRef = useRef();
  animations[0].name = 'StandingAnimation';

  const { actions } = useAnimations([animations[0]], model, { clampWhenFinished: true });

  useEffect(() => {
    actions.StandingAnimation?.reset().play();
  }, [actions]);

  return (
    <mesh ref={stRef} position={[0, -2.5, 0]} scale={[2.63, 2.63, 2.63]} rotation={[0.2, 0.2, 0.01]}>
      <primitive object={model} />
    </mesh>
  );
};

export default Standing;

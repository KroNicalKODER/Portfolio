import React, { useRef } from 'react'
import UFOModel from '../assets/Models/UFO/ufo.glb'
import { useGLTF } from '@react-three/drei'

const UFO = () => {
    const {scene : model} = useGLTF(UFOModel)
    const ufoRef = useRef()
  return (
    <mesh ref={ufoRef} position={[0,-2.7,0]} scale={[0.019,0.01,0.014]} rotation={[0,0,0]}>
      <primitive object={model} />
    </mesh>
  )
}

export default UFO
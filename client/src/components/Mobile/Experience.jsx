import React, {Suspense} from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Standing from './Standing'
import { OrbitControls } from '@react-three/drei'
import Loader from '../Loader'

const Experience = () => {
  return (
    <Canvas shadows className={'translate-y-[10%]'}>
        <ambientLight intensity={2}/>
        <pointLight color="green" position={[2,1,1]} intensity={5} />
        <pointLight color="red" position={[2,1,1]} intensity={4} />
        <pointLight color="blue" position={[2,1,1]} intensity={3} />
        <spotLight intensity={5} position={[2,0,0]} />
        <spotLight intensity={5} position={[0,2,3]} />
        <spotLight intensity={2} position={[-2,2,3]} />
        <OrbitControls enableZoom={false} enableRotate={false} rotation={[]}/>
        <Suspense fallback={<Loader/>}>
          <Standing/>
        </Suspense>
    </Canvas>
    )
}

export default Experience
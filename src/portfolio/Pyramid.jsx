import { useState , useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'


import PyramidCentre from './components/PyramidCentre'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Other from './components/Other'


const Container = () => {
  return <mesh >
    <Intro p={[100,0,0]} />
    <Projects p={[-50, 0,-86.60254]} />
    <Other p={[-50, 0, 86.60254]} />
  
  </mesh>
}
 

export default function Pyramid(){
  return <group >
  <PyramidCentre />
  <Container />
  </group>
}
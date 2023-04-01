
import { useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import Projects from './Projects'
import Other from './Other'
import Intro from './Intro'


export default function PyramidCentre(){
  const ref = useRef()
  
  useFrame(({clock, camera})=>{
    const elapsedtime = clock.getElapsedTime()
    ref.current.rotation.y = elapsedtime/2
  })
  
  return (
    <mesh ref={ref} >
      
  
      
    </mesh>
    )
}

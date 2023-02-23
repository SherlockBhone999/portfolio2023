
import { useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import Projects from './Projects'
import Other from './Other'
import Intro from './Intro'

import { Goldbar } from '../../assets/gold_bar_low_poly/Goldbar'


export default function PyramidCentre(){
  const ref = useRef()
  
  useFrame(({clock, camera})=>{
    const elapsedtime = clock.getElapsedTime()
    ref.current.rotation.y = elapsedtime/2
  })
  
  return (
    <mesh ref={ref} >
      <boxGeometry args={[10,0.5,5] }/>
      <meshStandardMaterial color='white' />
    
      <mesh position={[0,1,0]} scale={1.7}>
        <Goldbar />
      </mesh>
    
      <spotLight position={[0,5,0]} intensity={10} color='yellow' />
      }
    </mesh>
    )
}

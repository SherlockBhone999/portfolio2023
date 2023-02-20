
import { useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import Projects from './Projects'
import Other from './Other'
import Intro from './Intro'


const Dot = () => {
  const ref = useRef()
  
  return <mesh ref={ref} position={[40,0,0]}>
    <boxBufferGeometry args={[2,2,2]} />
    <meshStandardMaterial color='hotpink' />
  </mesh>
}


export default function PyramidCentre(){
  const ref = useRef()
  
  useFrame(({clock, camera})=>{
    const elapsedtime = clock.getElapsedTime()
    ref.current.rotation.y = elapsedtime/2
  })
  
  return (
    <mesh ref={ref} >
      <boxGeometry args={[10,10,10] }/>
      <meshStandardMaterial color='white' />
      <Dot />
    </mesh>
    )
}

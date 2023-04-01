import { useFrame, useLoader } from '@react-three/fiber'
import { useState,useEffect, useRef,useContext } from 'react'
import {Context} from '../Portfolio'
import { CircleRug} from '../../assets/low-poly_circle_rug/Circle_rug'


const DiskObj = () => {
  
  return (
    <group >
    <mesh >
      <CircleRug />
    </mesh>
    </group>
    )
}

const LiveDisk = () => {
  const ref = useRef()
  const {airplaneYaw, airplanePosition, airplaneListening } = useContext(Context)
  const [standbyYaw , setStandbyYaw ] = useState(0)
  const [r, setR] = useState(0)
  
  
  ////
  const doRotation = (rr) => {
    
    const rotate = (target) => {
      if(rr.y < target ){
        rr.y = r + 0.02
        setR(rr.y)
      }else if(rr.y > target) {
        rr.y = r - 0.02
        setR(rr.y)
      }
    }
    
    if(airplaneYaw === 'left'){
      rotate( standbyYaw + Math.PI/6 )
    }else if(airplaneYaw === 'right'){
      rotate( standbyYaw - Math.PI/6 )
    }else if(airplaneYaw === 'standby'){
      rotate( standbyYaw )
    }
  }
  
  
  const rotateToStandby = (rr) => {
    
    function beStandby(a){
    
      if(airplaneYaw === 'left'){
        setTimeout(()=>{
          setStandbyYaw(a)
        }, 4000)
      }else if(airplaneYaw === 'right'){
        setTimeout(()=>{
          setStandbyYaw(a)
        }, 4000)
      }
      
      setTimeout(()=>{
        setAirplaneYaw('standby')
      }, 5000)
      
    }
    
    if(airplanePosition==='intro'){ 
      beStandby(0)
      }
    else if(airplanePosition ==='projects'){ 
      beStandby( 2 * Math.PI/3 )
      }
    else if(airplanePosition === 'other'){ 
      beStandby(-2 * Math.PI/3)
      }
  }
  
  
  useEffect(()=>{
    const rr = ref.current.rotation
     rotateToStandby(rr)
  },[airplanePosition])
  
  useEffect(()=>{
    setStandbyYaw(-2*Math.PI/3)
  },[])
  
  
  useFrame(()=>{
    const rr = ref.current.rotation
     if(airplaneListening ) { doRotation(rr) }
  })
  
  return <mesh ref={ref} >
    <DiskObj />
  </mesh>
}

const DeadDisk = () => {
  
  return <mesh scale={1.1}>
    <DiskObj />
  </mesh>
}

const Disk = ({listening}) => {
  
  return <group >
  { !listening? <DeadDisk /> : null }
  <LiveDisk />
  </group>
}
export default Disk


//Disk for airplane Station
//when airplane is stationed, disk is live , listening to airplane rotation
// otherwise dead disk is rendered covering live disk in it, creating the illusion that only the disk that air plane station is rotating, other two aren't,
//I don't want to use live disk, dead disk
//want to render only render one disk but it is causing problems

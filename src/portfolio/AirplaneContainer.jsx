import { useState, useEffect, useRef , useContext } from "react";
import { useFrame} from "@react-three/fiber"
import * as THREE from 'three'
import {Context} from './Portfolio'
import { data } from './data'
const { pointsFromItoP, pointsFromPtoI, pointsFromItoO, pointsFromOtoI, pointsFromPtoO, pointsFromOtoP , pitchesForSlope, pitchesForAxisParallel } = data


import { PlaneRed } from '../assets/airplane_white_and_red/Plane_red'

/////////////

const move = (setP, array, setPitch , pitchesArray ) =>{
  for(let i=0; i< array.length; i++){
    setTimeout(()=>{
      setP(array[i])
      setPitch(pitchesArray[i])
    },i*20)
  }
}
        
const doyawing = (rr, r, setR, airplaneYaw, standbyYaw ) => {
    
    const yaw = (target) => {
      if(rr.y < target ){
        rr.y = r + 0.02
        setR(rr.y)
      }else if(rr.y > target) {
        rr.y = r - 0.02
        setR(rr.y)
      }
    }
    
    if(airplaneYaw === 'left'){
      yaw( standbyYaw + Math.PI/6 )
    }else if(airplaneYaw === 'right'){
      yaw( standbyYaw - Math.PI/6 )
    }else if(airplaneYaw === 'standby'){
      yaw( standbyYaw )
    }
  }
  
  
const domoving = (airplaneYaw, setStandbyYaw, setAirplaneYaw , airplaneMovement, setAirplanePosition,setP , setPitch ) => {
    
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
    
    if(airplaneMovement==='PtoI'){ 
      move(setP, pointsFromPtoI, setPitch, pitchesForSlope )
      setAirplanePosition('intro')
      beStandby(0)
      }
    else if(airplaneMovement ==='ItoP'){ 
      move(setP, pointsFromItoP , setPitch, pitchesForSlope )
      beStandby( 2 * Math.PI/3 )
      setAirplanePosition('projects')
      }
    else if(airplaneMovement === 'ItoO'){ 
      move(setP, pointsFromItoO, setPitch, pitchesForSlope )
      beStandby(-2 * Math.PI/3)
      setAirplanePosition('other')
      }
    else if(airplaneMovement ==='OtoI'){ 
      move(setP, pointsFromOtoI, setPitch, pitchesForSlope )
      setAirplanePosition('intro')
      beStandby( 0)
      }
    else if(airplaneMovement ==='OtoP'){ 
      move(setP, pointsFromOtoP , setPitch, pitchesForAxisParallel )
      beStandby( 2 * Math.PI/3 )
      setAirplanePosition('projects')
      }
    else if(airplaneMovement === 'PtoO'){ 
      move(setP, pointsFromPtoO, setPitch, pitchesForAxisParallel )
      beStandby(-2 * Math.PI/3)
      setAirplanePosition('other')
      }
  }
  

const moveCamera = (vec2, camera, airplanePosition, airplaneYaw, delayed , setDelayed, p ) => {
    
    if(airplanePosition==='intro'){
      if(airplaneYaw === 'standby'){
        vec2.set( p[0] +20 , p[1] + 10 , p[2] )
      }else if(airplaneYaw === 'left'){
        vec2.set( p[0] +20 , p[1] + 10 , p[2]-11.5 )
      }else{
        vec2.set( p[0] +20 , p[1] + 10 , p[2]+11.5 )
      }
    }else if(airplanePosition === 'projects'){
      if(airplaneYaw==='standby'){
        vec2.set( p[0] -11.5, p[1] +10, p[2] -20)
      }else if(airplaneYaw === 'left'){
        vec2.set( p[0] -11.5-5, p[1] +10, p[2] -20+11.5)
      }else{
        vec2.set( p[0] -11.5+11.5, p[1] +10, p[2] -20 )
      }
    }else if(airplanePosition === 'other' ){
      if(airplaneYaw ==='standby'){
        vec2.set( p[0] - 11.5 , p[1]+10 , p[2] + 20)
      }else if(airplaneYaw === 'left'){
        vec2.set( p[0] - 11.5+11.5 , p[1]+10 , p[2] + 20)
      }else{
        vec2.set( p[0] - 11.5-5 , p[1]+10 , p[2] + 20-11 )
      }
    }
    
    if(delayed){
      setTimeout(()=>{
        camera.position.lerp( vec2 , .015 )
        setDelayed(false)
      }, 500)
    }else { camera.position.lerp( vec2 , .02 ) }
  }
  
 
const Box = ( ) => {
  
  const ref = useRef()
  const vec = new THREE.Vector3()
  const vec2 = new THREE.Vector3()
  const [p, setP ] = useState([0,0, 0])
  const [r, setR ] = useState(0)
  const [standbyYaw, setStandbyYaw ] = useState(0)
  const [delayed , setDelayed ] = useState(false)
  const [pitch, setPitch ] = useState(0)
  const {airplaneYaw , setAirplaneYaw, airplaneMovement, 
  chosenCamera, setAirplanePosition, airplanePosition, airplaneListening } = useContext(Context)

  

////////////
  useEffect(()=>{
    setStandbyYaw(-2*Math.PI/3)
  },[])
  
  
// /////////////
  useEffect(()=>{
    domoving(airplaneYaw, setStandbyYaw, setAirplaneYaw , airplaneMovement, setAirplanePosition , setP , setPitch )
    setDelayed(true)
  },[airplaneMovement])
  
  
  useFrame(({camera})=>{
   // move plane
    vec.set(p[0], p[1] , p[2] )
    ref.current.position.lerp( vec, .04)
    
    
    //move and rotate camera
    if(chosenCamera === 'airplane'){
     moveCamera(vec2, camera, airplanePosition, airplaneYaw, delayed , setDelayed , p)
    
    camera.lookAt(ref.current.position)
    }
    
    //rotate plane
    const rr = ref.current.rotation
    if(airplaneListening) { doyawing(rr, r, setR, airplaneYaw, standbyYaw ) }
    
    //elevate Test
    ref.current.rotation.z = pitch
    
  })
  
 
  return (
  
  <mesh ref={ref} >
    <boxBufferGeometry args={[0.1,0.1,0.1]} />
    <meshLambertMaterial color="blue" />
    
    <mesh position={[0.1,0,0]}>
      <boxBufferGeometry args={[0.1,0.1,0.1]} />
      <meshLambertMaterial color="red" />
    </mesh>

   <mesh position={[0,2,0]} rotation={[0, -Math.PI/2, 0]} scale={2}>
      <PlaneRed />
   </mesh >

   
  </mesh>  
  
  )
}



export default function AirplaneContainer(){
  
  return <mesh >
  <Box />
  </mesh>
}
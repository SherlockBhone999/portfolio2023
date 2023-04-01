import { useState, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import {useContext} from 'react'
import {Context} from '../Portfolio'
import { Wall, myWallData } from './WallsForTrack'
import { Car, moveforward, movebackward, getCameraPositionsArray } from './Car'
import { Track, centreArr } from './Track'


const allDotPoints = [...centreArr, centreArr[0] ]
const cameraPoints = getCameraPositionsArray(allDotPoints)

/////////////
function RunningTrack (){
    
  const [carp, setCarp] = useState(allDotPoints[0])
  const [camerap , setCamerap ] = useState(cameraPoints[0])
  //const [currentIndex, setCurrentIndex ] = useState(0)
  const [ wallData, setWallData ] = useState(myWallData)
  const { moveCar, setMoveCar, currentIndex, setCurrentIndex } = useContext(Context)
  
  useEffect(()=>{
    
    if(currentIndex === -256 || currentIndex === 256 ){ 
          setCurrentIndex(0) 
          setCarp(allDotPoints[0])
          setCamerap(cameraPoints[0])
      }
    
  },[currentIndex])
  
  
  useEffect(()=>{
    if(currentIndex>=0){
      setCarp(allDotPoints[currentIndex])
      setCamerap(cameraPoints[currentIndex])
    }else{
      setCarp(allDotPoints[allDotPoints.length-1+currentIndex])
      setCamerap(cameraPoints[cameraPoints.length-1+currentIndex])
    }
  },[currentIndex])
  
  useEffect(()=>{
    if(moveCar === 'forward'){
      moveforward(setCurrentIndex)
      setMoveCar('')
    }else if(moveCar === 'backward'){
      movebackward(setCurrentIndex)
      setMoveCar('')
    }
  },[moveCar])
  
  
  
  return <group>
  
  <Car p={carp} camerap={camerap}/>

  <Track currentIndex={currentIndex} />
  
  {wallData.map((item)=>{
    return <Wall p={item.p} r={ item.r } s={item.s } img={item.img} imgp={item.imgp}/>
  })}
  
  <mesh position={[0,-5,0]}> 
    <Road />
  </mesh>
 
 
  </group>
}


export default RunningTrack

const TorusTrack = ({p,r,ra, color }) => {
  
  return (
    <mesh position={p} rotation={r} >
      <torusGeometry args={[ra,1.3,16,200,3.5]}/>
      <meshStandardMaterial color={color} />
    </mesh>
    )
}

const Road = () => {
  
  return <group >
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={40} color={'gray'} />
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={40} color={'gray'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={40} color={'gray'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={40} color={'gray'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={42.5} color={'lightblue'}/>
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={42.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={42.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={42.5} color={'lightblue'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={45} color={'lightblue'} />
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={45} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={45} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={45} color={'lightblue'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={47.5} color={'lightblue'} />
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={47.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={47.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={47.5} color={'lightblue'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={50} color={'white'}/>
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={50} color={'white'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={50} color={'white'}/>
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={50} color={'white'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={52.5} color={'lightblue'} />
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={52.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={52.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={52.5} color={'lightblue'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={55} color={'lightblue'}/>
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={55} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={55} color={'lightblue'}/>
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={55} color={'lightblue'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={57.5} color={'lightblue'} />
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={57.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={57.5} color={'lightblue'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={57.5} color={'lightblue'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={60} color={'gray'}/>
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={60} color={'gray'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={60} color={'gray'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={60} color={'gray'} />
      
      {/*
        for light track
      */}
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={64} color={'lightpink'}/>
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={64} color={'lightpink'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={64} color={'lightpink'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={64} color={'lightpink'} />
      
      <TorusTrack p={[0,0,0]} r={[-Math.PI/2,0,0]} ra={36} color={'lightpink'}/>
      <TorusTrack p={[0,0,0]} r={[Math.PI/2,0,0]} ra={36} color={'lightpink'} />
      <TorusTrack p={[100,0,0]} r={[-Math.PI/2,0,0]} ra={36} color={'lightpink'} />
      <TorusTrack p={[100,0,0]} r={[Math.PI/2,0,0]} ra={36} color={'lightpink'} />
  </group>
}
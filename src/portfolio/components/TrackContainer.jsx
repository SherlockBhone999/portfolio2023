import { useState, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import {useContext} from 'react'
import {Context} from '../Portfolio'
import { Wall, updateWallData, myWallData } from './WallsForTrack'
import { Car, moveforward, movebackward, getCameraPositionsArray } from './Car'
import { Track, getBigArray } from './Track'


const allDotPoints = getBigArray([0,0,0], 50)
const cameraPoints = getCameraPositionsArray(allDotPoints)

/////////////
function RunningTrack (){
    
  const [carp, setCarp] = useState(allDotPoints[0])
  const [camerap , setCamerap ] = useState(cameraPoints[0])
  const [currentIndex, setCurrentIndex ] = useState(0)
  const [ wallData, setWallData ] = useState(myWallData)
  const { moveCar, setMoveCar } = useContext(Context)
  
  useEffect(()=>{
    updateWallData( wallData, setWallData , currentIndex )
    
    if(currentIndex === -264 || currentIndex === 264 ){ 
          setCurrentIndex(0) 
          setCarp(allDotPoints[0])
          setCamerap(cameraPoints[0])
        }
    
  },[currentIndex])
  
  useEffect(()=>{
    if(moveCar === 'forward'){
      moveforward(setCarp, setCamerap, currentIndex, setCurrentIndex, allDotPoints, cameraPoints )
      setMoveCar('')
    }else if(moveCar === 'backward'){
      movebackward(setCarp, setCamerap, currentIndex, setCurrentIndex, allDotPoints, cameraPoints )
      setMoveCar('')
    }
  },[moveCar])
  
  
  
  return <group>
  
  <Car p={carp} camerap={camerap}/>

  <Track p={[0,0,0]} r={40} currentIndex={currentIndex} color={'lightblue'}/>
  <Track p={[0,0,0]} r={45} currentIndex={currentIndex} color={'lightblue'}/>
  <Track p={[0,0,0]} r={50} currentIndex={currentIndex} color={'white'}/>
  <Track p={[0,0,0]} r={55} currentIndex={currentIndex} color={'lightblue'}/>
  <Track p={[0,0,0]} r={60} currentIndex={currentIndex} color={'lightblue'}/>
  
  {wallData.map((item)=>{
    return <Wall p={item.p} r={ item.r } s={item.s } />
  })}
 
  </group>
}


export default RunningTrack



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

  <Track p={[0,0,0]} r={40} currentIndex={currentIndex} color={'black'}/>
  <Track p={[0,0,0]} r={42.5} currentIndex={currentIndex} color={'gray'}/>
  <Track p={[0,0,0]} r={45} currentIndex={currentIndex} color={'gray'}/>
<Track p={[0,0,0]} r={47.5} currentIndex={currentIndex} color={'gray'}/>

  <Track p={[0,0,0]} r={50} currentIndex={currentIndex} color={'white'}/>
  
<Track p={[0,0,0]} r={52.5} currentIndex={currentIndex} color={'gray'}/>
  <Track p={[0,0,0]} r={55} currentIndex={currentIndex} color={'gray'}/>
  <Track p={[0,0,0]} r={57.5} currentIndex={currentIndex} color={'gray'}/>
  <Track p={[0,0,0]} r={60} currentIndex={currentIndex} color={'black'}/>
  
  {wallData.map((item)=>{
    return <Wall p={item.p} r={ item.r } s={item.s } img={item.img} />
  })}
 
 <mesh position={[50,-5,0]}>
  <boxGeometry args={[280,2,170]} />
  <meshStandardMaterial color='lightpink'/>
 </mesh>
 
  </group>
}


export default RunningTrack



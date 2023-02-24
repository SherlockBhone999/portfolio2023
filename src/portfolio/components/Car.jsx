import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {Context} from '../Portfolio'


export const getCameraPositionsArray = (bigArr) => {
  const array = []
  for( let i =1 ; i <= 8; i++){
    const a = bigArr[bigArr.length - (8-i)] 
    array.push(a)
  }
  
  for ( let j=0; j<= bigArr.length - 9 ; j++){
    const b = bigArr[j]
    array.push(b)
  }
  
  return array
}




////
export const moveforward = (setCarp, setCamerap , currentIndex, setCurrentIndex, allDotPoints, cameraPoints ) => {
    
    
    for(let i= 0 ; i<= 33 ; i++){
      setTimeout(()=>{
        //>= 0
        if( currentIndex >= 0){
          setCarp(allDotPoints[currentIndex +i])
          setCamerap( cameraPoints[currentIndex +i] )
        }else{
          setCarp(allDotPoints[ allDotPoints.length - (Math.abs(currentIndex )- i) ])
          setCamerap( cameraPoints[ cameraPoints.length - (Math.abs(currentIndex) - i)])
        }
        setCurrentIndex( currentIndex + i)
        
      }, i*20) //20
    }
  }
  
export const movebackward = (setCarp, setCamerap , currentIndex, setCurrentIndex , allDotPoints, cameraPoints ) => {
    
    
    for(let i= 0 ; i<= 33 ; i++){
      setTimeout(()=>{
        // <= 0
        if( currentIndex <= 0 ){
          setCarp(allDotPoints[ allDotPoints.length -(Math.abs(currentIndex )+ i) ])
          setCamerap( cameraPoints[ cameraPoints.length -(Math.abs(currentIndex) + i)])
        }else{
        setCarp(allDotPoints[ currentIndex -i])
        setCamerap( cameraPoints[ currentIndex -i] )
        }
        setCurrentIndex( currentIndex - i )
        
      }, i*20)
    }
  }
  
  
  
export const Car = ({p, camerap}) => {
  const ref= useRef()
  const cameraRef = useRef()
  const vec = new THREE.Vector3()
  const vec2 = new THREE.Vector3()
  const { chosenCamera } = useContext(Context)
  
  
  useFrame(({camera})=>{
    vec.set(p[0], p[1], p[2] )
    ref.current.position.lerp(vec, .1)
    
    if(chosenCamera === 'car'){
      //adapt to track position
      vec2.set(camerap[0] +100, camerap[1]+10, camerap[2] )
      camera.position.lerp(vec2, .1 )
      
      const x = ref.current.position.x +100
      const y = ref.current.position.y + 10
      const z = ref.current.position.z 
      camera.lookAt(x,y,z)
      
    }
  })
  return (
  <mesh ref={ref} scale={0.1}>
    <boxGeometry args={[1,1,1]} />
    <meshLambertMaterial color='black' />
  </mesh>
  )
  }
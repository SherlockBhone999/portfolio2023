import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {Context} from '../Portfolio'


export const getCameraPositionsArray = (bigArr) => {
  const array = []
  for( let i =0 ; i <= 6; i++){
    const a = bigArr[bigArr.length - (7-i)] 
    array.push(a)
  }
  
  for ( let j=0; j<= bigArr.length - 8 ; j++){
    const b = bigArr[j]
    array.push(b)
  }
  
  return array
}





  
export const moveforward = (setCurrentIndex) => {
  for(let i=0;i<=31;i++){
    setTimeout(()=>{
      setCurrentIndex(prevv => prevv + 1)
    },i*100)
  }
}

export const movebackward = (setCurrentIndex) => {
  for(let i=0; i<=31; i++){
    setTimeout(()=>{
      setCurrentIndex(prevv => prevv -1 )
    },i*100)
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
      vec2.set(camerap[0] +100, camerap[1]+6, camerap[2] )
      camera.position.lerp(vec2, 0.1 )
      
      const x = ref.current.position.x +100
      const y = ref.current.position.y + 6
      const z = ref.current.position.z 
      camera.lookAt(x,y,z)
      
    }
  })
  return (
  <mesh ref={ref} scale={0.01}>
    <boxGeometry args={[1,1,1]} />
    <meshLambertMaterial color='black' />
  </mesh>
  )
  }
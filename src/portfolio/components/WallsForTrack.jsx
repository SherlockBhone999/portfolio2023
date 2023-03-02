import { useRef } from 'react'
import {TextureLoader} from 'three'
import { useLoader } from '@react-three/fiber'
import img1 from '../images/11.jpg'
import img2 from '../images/23.jpg'
import img3 from '../images/32.jpg'
import img4 from '../images/34.jpg'
import img5 from '../images/concrete.jpg'
import img6 from '../images/169.jpg'
import img7 from '../images/fullh.jpg'
import img8 from '../images/fullv.jpg'

import { Billboard } from '../../assets/billboard/Billboard'
export const myWallData = [
  {
    p : [-60 + 1, 0, -10 ],
    r : [0, -Math.PI/2  , 0],
    s : 1,
    img: img1
  },
  {
    p : [10 , 0, -60 +1],
    r : [0,   Math.PI  , 0],
    s : 1,
    img: img2
  },
  {
    p : [40 - 1, 0, 10],
    r : [ 0, Math.PI/2 , 0],
    s : 1,
    img: img3
  },
  {
    p : [ 110 , 0, 60 - 1 ],
    r : [0, Math.PI , 0],
    s : 1,
    img: img4
  },
  {
    p : [160 - 1, 0, -10 ],
    r : [0, -Math.PI/2  , 0],
    s : 1,
    img: img5
  },
  {
    p : [90, 0, -60+1 ],
    r : [0,0 , 0],
    s : 1,
    img: img6
  },

  {
    p: [ 60 - 1, 0, 10],
    r : [ 0, Math.PI/2 , 0],
    s : 1,
    img: img7
  },
  {
    p : [-10, 0, 60 - 1 ],
    r : [0, 0  , 0],
    s : 1,
    img: img8
  }
  ]

export const Wall = ({p, r, s, img }) => {
  const ref = useRef()
  const imgg = useLoader(TextureLoader,img)
  
  return <group ref={ref} position={p} scale={s} >
  <mesh rotation={[ r[0], r[1]+Math.PI/2 , r[2] ]} >
    <boxGeometry args={[10,10,0]} />
    <meshStandardMaterial map={imgg} />
    
  </mesh >
  <mesh rotation={r} scale={1.4} position={[0,-5,0]}> 
    <Billboard /> 
  </mesh>
  </group>
}

/*
export const updateWallData = (wallData, setWallData, currentIndex ) => {
  const arrayOfObjects = [...wallData]
  arrayOfObjects.map(obj => obj.s = 0 )
  
  const a = getCurrentWallNumber(currentIndex)
  const b = getWallScale(currentIndex, a)
  
  if(a > -1){ arrayOfObjects[a].s = b }
  setWallData( arrayOfObjects )
}

const getCurrentWallNumber = (currentIndex) => {
  
  for ( let i =0; i < 8; i++){
    if( currentIndex >= (i*33)-30 && currentIndex <= (i*33)+5 ){
      return i
    }
  }
  for ( let i=1; i< 8; i++){
    if( currentIndex >= -(i*33)-30 && currentIndex <= -(i*33)+5 ){
      return 8-i
    }
  }

}

//for wall getting bigger
const getWallScale = (currentIndex, currentWallNumber ) => {
  const d = getDistanceBetween(currentIndex, currentWallNumber)
  if( d > 0){ return 1- d/(30)  }
  else{ return 1 }
}

//for wall getting bigger
const getDistanceBetween = (currentIndex, currentWallNumber ) => {
  if(currentIndex >= 0){
    const d = ( currentWallNumber)*33 - currentIndex 
    return d
  }else{
    if(currentWallNumber === 0){
      const d = -currentIndex 
      return d
    }else{
      const d = -( 8 - currentWallNumber )*33 - currentIndex 
      return d
    }
  }
}
*/
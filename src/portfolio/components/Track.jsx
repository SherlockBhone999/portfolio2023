
import {GlowStick} from '../../assets/glowstick/Glowstick'
import { useRef, useState, useEffect } from 'react'
import { dataForLight } from './dataForLighting'

const getCoordinates1 = (radian, r) => {
    const z = r * Math.sin(radian)
    const x = r * Math.cos(radian)
    return [-x, 0, -z]
  }

const getCoordinates2 = (radian, r) => {
    const z = r * Math.sin(radian)
    const x = r * Math.cos(radian)
    return [-x+100 , 0, z]
  }
  
const getCoordinates3 = (radian, r) => {
    const z = r * Math.sin(radian)
    const x = r * Math.cos(radian)
    return [x+100, 0, -z]
  }
  
const getCoordinates4 = (radian  , r) => {
    const z = r * Math.sin(radian)
    const x = r * Math.cos(radian)
    return [x, 0, z]
  }

//inner
const getInnerCoordinatesArray = (fun,r) => {
  const u = Math.PI/16
    const array = []
    for(let i=0; i<= 17 ; i++){
      const a = fun(u * i, r)
      array.push(a)
    }
    return array
}


const getInnerArray = (r) => {
  const arr1 = getInnerCoordinatesArray(getCoordinates1,r )
  const array1 = []
  for(let i=0; i<= arr1.length-3; i++ ){
    array1[i] = arr1[i]
  }
  const arr2 = getInnerCoordinatesArray(getCoordinates2,r )
  const array2 = []
  for( let i=0; i<= arr2.length-3;i++){
    array2[i] = arr2[i]
  }
  
  const arr3 = getInnerCoordinatesArray(getCoordinates3,r )
  const array3 = []
  for (let i=0; i<= arr3.length-3; i++){
    array3[i] = arr3[i]
  }
  
  const arr4 = getInnerCoordinatesArray(getCoordinates4,r )
  const array4 = []
  for( let i=0; i<= arr4.length-3;i++){
    array4[i] = arr4[i]
  }
  

  const bigArray = array1.concat( array2, array3, array4 )
  
  return bigArray
}

const InnerTrack = () =>{
  
  return <mesh >

    {innerArr.map(point => <group>
      <OnePiece p={point} />
    </group>)}

  </mesh>
}

//////////////////////

//outer
const getOuterCoordinatesArray = (fun,r) => {
  const u = Math.PI/32
    const array = []
    for(let i=0; i<= 33 ; i++){
      const a = fun(u * i, r)
      array.push(a)
    }
    return array
}


const getOuterArray = (r) => {
  const arr1 = getOuterCoordinatesArray(getCoordinates1,r)
  const array1 = []
  for(let i=0; i<= arr1.length-9; i++ ){
    array1[i] = arr1[i]
  }
  const arr2 = getOuterCoordinatesArray(getCoordinates2,r)
  const array2 = []
  for( let i=0; i<= arr2.length-9;i++){
    array2[i] = arr2[i+7]
  }
  
  const arr3 = getOuterCoordinatesArray(getCoordinates3,r)
  const array3 = []
  for (let i=0; i<= arr3.length-9; i++){
    array3[i] = arr3[i]
  }
  
  const arr4 = getOuterCoordinatesArray(getCoordinates4,r)
  const array4 = []
  for( let i=0; i<= arr4.length-9;i++){
    array4[i] = arr4[i+7]
  }
  const bigArray = array1.concat( array2, array3, array4 )
  return bigArray
}
 


const OuterTrack = () =>{
  const trackPoints = getOuterArray(64)
  return <mesh >

    {trackPoints.map(point => <group>
      <OnePiece p={point} />
    </group>)}

  </mesh>
}
/////////////////!/!

////centre

const getCentreCoordinatesArray = (fun,r) => {
  const u = Math.PI/64
    const array = []
    for(let i=0; i<= 65 ; i++){
      const a = fun(u * i, r)
      array.push(a)
    }
    return array
}

const getCentreArray = (r) => {
  const arr1 = getCentreCoordinatesArray(getCoordinates1,r )
  const array1 = []
  for(let i=0; i<= arr1.length-3; i++ ){
    array1[i] = arr1[i]
  }
  const arr2 = getCentreCoordinatesArray(getCoordinates2,r )
  const array2 = []
  for( let i=0; i<= arr2.length-3;i++){
    array2[i] = arr2[i]
  }
  
  const arr3 = getCentreCoordinatesArray(getCoordinates3,r )
  const array3 = []
  for (let i=0; i<= arr3.length-3; i++){
    array3[i] = arr3[i]
  }
  
  const arr4 = getCentreCoordinatesArray(getCoordinates4,r )
  const array4 = []
  for( let i=0; i<= arr4.length-3;i++){
    array4[i] = arr4[i]
  }
  

  const bigArray = array1.concat( array2 , array3, array4 )
  
  return bigArray
}




//////////////////////////

export const Track = ({currentIndex}) =>{
  
  return <group position={[0,-4,0]}>

  <OuterTrack />
  <InnerTrack />
  
  <AllLight currentIndex={currentIndex}/>
  
  </group>
}

///////////


const OnePiece = ({p}) => {
  
  return <mesh>
  <mesh position={p} scale={0.005} >
    <GlowStick/>
  </mesh>
  </mesh>
}


const LightForOnePiece = ({p}) =>{
  const color = 'blue'
  const objp = p
  const d = 3
  const lp1 = [ objp[0] + 1, objp[1]+3.2, objp[2] + 1 ]
  const lp2 = [ objp[0]+0.3 , objp[1]+3.2, objp[2]- 1.2 ]
  const lp3 = [ objp[0]-1.2, objp[1]+3.2, objp[2]+0.3]
  
  return <group >
  <pointLight position={lp1} intensity={800} color={color} distance={d} />
  <pointLight position={lp2} intensity={800} color={color} distance={d} />
  <pointLight position={lp3} intensity={800} color={color} distance={d} />
  </group>
}

export const centreArr = getCentreArray(50)
const innerArr = getInnerArray(36)
const outerArr = getOuterArray(64)


const AllLight = ({currentIndex}) => {
  
  const [glowPoints, setGlowPoints ] = useState([])
  
  useEffect(()=>{
    
    if(currentIndex>=0){
        const array = []
        const a = dataForLight[currentIndex][0]
        const b = dataForLight[currentIndex][1]
        const c = dataForLight[currentIndex][2]
        const d = dataForLight[currentIndex][3]
        
        if( currentIndex > 59 && currentIndex < 79 || currentIndex > 187 && currentIndex < 207 ){
          array[0] = innerArr[a]
          array[1] = innerArr[b]
          array[2] = innerArr[c]
          array[3] = innerArr[d]
        }else{
          array[0] = outerArr[a]
          array[1] = outerArr[b]
          array[2] = innerArr[c]
          array[3] = innerArr[d]
        }
        setGlowPoints(array)
    }else{
        
        const array = []
        const a = dataForLight[dataForLight.length-1+currentIndex][0]
        const b = dataForLight[dataForLight.length-1+currentIndex][1]
        const c = dataForLight[dataForLight.length-1+currentIndex][2]
        const d = dataForLight[dataForLight.length-1+currentIndex][3]
        
        if( currentIndex < dataForLight.length-207 && currentIndex > dataForLight.length-187 || currentIndex< dataForLight.length-79 && currentIndex > dataForLight.length-59){
          array[0] = innerArr[a]
          array[1] = innerArr[b]
          array[2] = innerArr[c]
          array[3] = innerArr[d]
        }else{
          array[0] = outerArr[a]
          array[1] = outerArr[b]
          array[2] = innerArr[c]
          array[3] = innerArr[d]
        }
        setGlowPoints(array)
    }
  },[currentIndex])
  
  return <group>
  { glowPoints.map( point => <mesh> 
  <LightForOnePiece p={point}/>
  </mesh>)}
  </group>
}
import {GlowStick} from '../../assets/glowstick/Glowstick'
import { Lightbulb } from '../../assets/lightbulb/Lightbulb'

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

const getCoordinatesArray = (fun,r) => {
  const u = Math.PI/64
    const array = []
    for(let i=0; i<= 65 ; i++){
      const a = fun(u * i, r)
      array.push(a)
    }
    return array
}

const getAllCoordinates = (r) => {
  const array1 = getCoordinatesArray(getCoordinates1,r)
  const array2 = getCoordinatesArray(getCoordinates2,r)
  const array3 = getCoordinatesArray(getCoordinates3,r)
  const array4 = getCoordinatesArray(getCoordinates4,r)
  const bigArray = array1.concat( array2, array3, array4 )
  
  
  return bigArray
}


export const getBigArray = (p,r) => {
  const array = []
  const bigArrayRaw = getAllCoordinates(r)
  bigArrayRaw.map( subarray => {
    const a = [ subarray[0]+p[0] , subarray[1]+p[1] , subarray[2]+p[2] ]
    array.push(a)
  })
  return array
}


const getLessCoordinatesArray = (fun,r, count) => {
  const u = Math.PI/count
    const array = []
    for(let i=0; i<= count+1 ; i++){
      const a = fun(u * i, r)
      array.push(a)
    }
    return array
}


const getReducedBigArray = (r, count ) => {
  const arr1 = getLessCoordinatesArray(getCoordinates1,r, count)
  const array1 = []
  for(let i=0; i<= arr1.length-9; i++ ){
    array1[i] = arr1[i]
  }
  const arr2 = getLessCoordinatesArray(getCoordinates2,r, count)
  const array2 = []
  for( let i=0; i<= arr2.length-9;i++){
    array2[i] = arr2[i+7]
  }
  
  const arr3 = getLessCoordinatesArray(getCoordinates3,r, count)
  const array3 = []
  for (let i=0; i<= arr3.length-9; i++){
    array3[i] = arr3[i]
  }
  
  const arr4 = getLessCoordinatesArray(getCoordinates4,r, count)
  const array4 = []
  for( let i=0; i<= arr4.length-9;i++){
    array4[i] = arr4[i+7]
  }
  const bigArray = array1.concat( array2, array3, array4 )
  return bigArray
}

//
 
const getBigArray2 = (r, count ) => {
  const arr1 = getLessCoordinatesArray(getCoordinates1,r, count)
  const array1 = []
  for(let i=0; i<= arr1.length; i++ ){
    array1[i] = arr1[i]
  }
  const arr2 = getLessCoordinatesArray(getCoordinates2,r, count)
  const array2 = []
  for( let i=0; i<= arr2.length;i++){
    array2[i] = arr2[i]
  }
  
  const arr3 = getLessCoordinatesArray(getCoordinates3,r, count)
  const array3 = []
  for (let i=0; i<= arr3.length; i++){
    array3[i] = arr3[i]
  }
  
  const arr4 = getLessCoordinatesArray(getCoordinates4,r, count)
  const array4 = []
  for( let i=0; i<= arr4.length;i++){
    array4[i] = arr4[i]
  }
  const bigArray = array1.concat( array2, array3, array4 )
  return bigArray
}
 

const OnePiece = ({p}) => {
  
  return <mesh>
  <mesh position={p} scale={0.005} >
    <GlowStick/>
  </mesh>
  </mesh>
}

const OneTrack = ({ r, count }) =>{
  const getTrackPoints = ( )=> {
    if(r <= 40){
      return getBigArray2( r, count )
    }else{
    return getReducedBigArray(r, count)
    }
  }
  
  const trackPoints = getTrackPoints()
  return <mesh >

    {trackPoints.map(point => <group>
      <OnePiece p={point} />
    </group>)}

  </mesh>
}

const TwoPiece = ({p}) => {
  
  return <mesh>
  <mesh position={p} scale={0.1} >
    <Lightbulb />

  </mesh>
  </mesh>
}

const TwoTrack = ({color, r }) =>{
  const trackPoints = getReducedBigArray(r)
  return <mesh >

    {trackPoints.map(point => <group>
      <TwoPiece p={point} />
    </group>)}

  </mesh>
}


export const Track = () =>{
  

  
  
  return <group position={[0,-4,0]}>
  
  <OneTrack r={64} count={32}/>
  <OneTrack r={36} count={16} />
  
  </group>
}




/*
export const Track = ({p,r, currentIndex, color }) =>{
  
  const dotPoints = getFilteredDotArray(p, r, currentIndex )

  
  
  return <group position={p}>
    {dotPoints.map(point =>{
      return <Dot p={point} color={color} />
    })}
    
  </group>
}


const getFilteredDotArray = (p, r, currentIndex) => {
  const dotAllPoints = getBigArray(p,r)
  const reversedAllDotPoints = []
  
  for( let i=0; i<= dotAllPoints.length; i++){
    reversedAllDotPoints[i] = dotAllPoints[ dotAllPoints.length - i]
  }
    
  const array = []
  if(currentIndex === 0 ){
    for( let i=0; i<= 5; i++){
      array[i] = reversedAllDotPoints[i]
    }
    for(let i = 0; i<= 3; i++){
      array[i+3] = dotAllPoints[i]
    }
  }else if(currentIndex > 0){
    for( let i=0; i<= dotAllPoints.length ; i++){
      if( i >= currentIndex - 5 && i<= currentIndex + 3){
        array[i] = dotAllPoints[i]
      }
    }
  }else{
    for( let i=0; i<= reversedAllDotPoints.length ; i++){
      if( i >= Math.abs(currentIndex) - 5 && i <= Math.abs(currentIndex) + 3 ){
        array[i] = reversedAllDotPoints[i]
      }
    }
  }
  
  
  return array
}


const Dot = ({p, color}) => {
  return <mesh position={p} >
    <cylinderGeometry args={[4,4,2]} />
    <meshLambertMaterial color={color} />
  </mesh>
}
*/


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
  for(let i=0; i<= arr1.length-1; i++ ){
    array1[i] = arr1[i]
  }
  const arr2 = getInnerCoordinatesArray(getCoordinates2,r )
  const array2 = []
  for( let i=0; i<= arr2.length-1;i++){
    array2[i] = arr2[i]
  }
  
  const arr3 = getInnerCoordinatesArray(getCoordinates3,r )
  const array3 = []
  for (let i=0; i<= arr3.length-1; i++){
    array3[i] = arr3[i]
  }
  
  const arr4 = getInnerCoordinatesArray(getCoordinates4,r )
  const array4 = []
  for( let i=0; i<= arr4.length-1;i++){
    array4[i] = arr4[i]
  }
  

  const bigArray = array1.concat( array2, array3, array4 )
  
  return bigArray
}

const InnerTrack = () =>{
  const trackPoints = getInnerArray(36)
  return <mesh >

    {trackPoints.map(point => <group>
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

const LightForOnePiece = ({p}) =>{
  const color = 'blue'
  const objp = p
  const lp1 = [ objp[0] + 1, objp[1]+3.2, objp[2] + 1 ]
  const lp2 = [ objp[0]+0.3 , objp[1]+3.2, objp[2]- 1.2 ]
  const lp3 = [ objp[0]-1.2, objp[1]+3.2, objp[2]+0.3]
  
  return <group>
  <pointLight position={lp1} intensity={1000} color={color} distance={2.8} />
  <pointLight position={lp2} intensity={1000} color={color} distance={2.8} />
  <pointLight position={lp3} intensity={1000} color={color} distance={2.8} />
  </group>
}


const AllLight = ({currentIndex}) => {
  const allIndexPoints = getAllCoordinates(50)
  const outerTrackPoints = getOuterArray(64)
  const innerTrackPoints = getInnerArray(36)
  const nForInner =Math.floor( ( currentIndex/allIndexPoints.length ) * innerTrackPoints.length )
  
  const nForOuter =Math.floor( ( currentIndex/allIndexPoints.length ) * outerTrackPoints.length )
  
  const glowPoints = []
  if(currentIndex >= 0 ){
    for(let i=0; i< outerTrackPoints.length; i++){
      if(i === nForOuter || i=== nForOuter+1 ){
        glowPoints[i] = outerTrackPoints[i]
      }
    }
    for(let i=0; i< innerTrackPoints.length; i++){
      if(i === nForInner || i === nForInner+1 ){
        glowPoints.push(innerTrackPoints[i])
      }
    }
  }else{
    for(let i=0; i< outerTrackPoints.length; i++){
      if(-i === nForOuter || -i=== nForOuter-1 ){
        glowPoints[i] = outerTrackPoints[outerTrackPoints.length-i-1]
      }
    }
    for(let i=0; i< innerTrackPoints.length; i++){
      if(-i === nForInner || -i === nForInner-1 ){
        glowPoints.push(innerTrackPoints[innerTrackPoints.length-i-1])
      }
    }
  }
  return <group>
  { glowPoints.map( point => <mesh> 
  <LightForOnePiece p={point}/>
  </mesh>)}
  </group>
}
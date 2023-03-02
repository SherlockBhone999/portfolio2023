

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




export const Track = ({p,r, currentIndex, color }) =>{
  
  const dotPoints = getFilteredDotArray(p, r, currentIndex )

  
  
  return <group position={p}>
    {dotPoints.map(point =>{
      return <Dot p={point} color={color} />
    })}
    
  </group>
}

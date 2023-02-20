import { useRef } from 'react'



export const myWallData = [
  {
    p : [-60, 10, -10 ],
    r : [0, 0  , 0],
    s : 0
  },
  {
    p : [10, 10, -60 ],
    r : [0, Math.PI/2  , 0],
    s : 0
  },
  {
    p : [40, 10, 10],
    r : [ 0, 0, 0],
    s : 0
  },
  {
    p : [ 110, 10, 60 ],
    r : [0, Math.PI/2  , 0],
    s : 0
  },
  {
    p : [160, 10, -10 ],
    r : [0, 0  , 0],
    s : 0
  },
  {
    p : [90, 10, -60 ],
    r : [0, Math.PI/2 , 0],
    s : 0
  },

  {
    p: [ 60, 10, 10],
    r : [ 0, 0, 0],
    s : 0
  },
  {
    p : [-10, 10, 60 ],
    r : [0, Math.PI/2  , 0],
    s : 0
  }
  ]

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

const getWallScale = (currentIndex, currentWallNumber ) => {
  const d = getDistanceBetween(currentIndex, currentWallNumber)
  if( d > 0){ return 1- d/30  }
  else{ return 1 }
}

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

export const Wall = ({p, r, s }) => {
  const ref = useRef()

  
  return <mesh ref={ref} position={p} rotation={r} scale={s} >
    <boxGeometry args={[20,20,2]} />
    <meshLambertMaterial color='white' />
  </mesh>
}


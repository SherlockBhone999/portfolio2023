
import Disk from './Disk'
import { useState, useContext , useEffect } from 'react'
import { Context } from '../Portfolio'
import { PhotoFrame1 } from '../../assets/3d_architecture__photo_frame/Photo_frame'
import { SquareFiretable } from '../../assets/square_firetable/Square_firetable'


const DiskContainer = ({p}) => {
  const [listening, setListening ] = useState(false)
  const { airplanePosition } = useContext(Context)
  
  useEffect(()=>{
    if(airplanePosition==='other'){
      setTimeout(()=> { setListening(true) }, 1000 )
    }else{
      setTimeout(()=>{ setListening(false) }, 1000 )
    }
  })
  return <mesh position={p}>
    <Disk listening={listening} />
  </mesh>
}

export default function Other({p}){
  
  
  return <group>
  <DiskContainer p={p}/>
  
  <mesh position={[-50, 0, 86]} scale={2}>
    <PhotoFrame1 />
  </mesh>
  
  <mesh position={[-50, 5, 86]} scale={10}>
    <SquareFiretable />
  </mesh>
  
  
  
  </group>
}
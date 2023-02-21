import Gallery from './Gallery'
import Disk from './Disk'
import { useState, useContext , useEffect } from 'react'
import { Context } from '../Portfolio'
import {GalleryCircle} from '../../assets/white_round_exhibition_gallery/Gallery_circle'

const DiskContainer = ({p}) => {
  const [listening, setListening ] = useState(false)
  const { airplanePosition } = useContext(Context)
  
  useEffect(()=>{
    if(airplanePosition==='projects'){
      setTimeout(()=>{ setListening(true) }, 1000 )
    }else{
     setTimeout(()=>{ setListening(false) }, 1000 )
    }
  })
  return <group position={p}>
    <Disk listening={listening} />
    
    <mesh scale={1} position={[-25,0, -46]}>
      <spotLight position = {[-50,0,-86]} intensity={5} color='gray'/>
      <directionalLight position={[0, 20, 0]} intensity={0.5} color='blue'/>
      <GalleryCircle />
    </mesh>
    
    <mesh rotation={[0, Math.PI, 0]} position={[-20,0,-38]} scale={0.2}> 
      <Gallery /> 
    </mesh>
  </group>
}

export default function Projects({p}){
  
  
  return <group>
  <DiskContainer p={p}/>
  </group>
}
import Gallery from './Gallery'
import Disk from './Disk'
import { useState, useContext , useEffect } from 'react'
import { Context } from '../Portfolio'

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
  return <mesh position={p}>
    <Disk listening={listening} />
    
    <mesh rotation={[0, Math.PI, 0]} position={[-25, 0, -43]} >
      <Gallery />
    </mesh>
  </mesh>
}

export default function Projects({p}){
  
  
  return <group>
  <DiskContainer p={p}/>
  </group>
}
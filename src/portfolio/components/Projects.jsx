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
  return <group position={p}>
    <Disk listening={listening} />
    <mesh rotation={[0, Math.PI, 0]} position={[-20,10,-38]} scale={0.2}> 
      <Gallery /> 
    </mesh>
  </group>
}

export default function Projects({p}){
  
  
  return <group>
  <DiskContainer p={p}/>
  </group>
}
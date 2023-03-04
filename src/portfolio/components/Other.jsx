
import Disk from './Disk'
import { useState, useContext , useEffect } from 'react'
import { Context } from '../Portfolio'



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
  return <group position={p}>
    <Disk listening={listening} />
  </group>
}

export default function Other({p}){
  
  
  return <group>
  <DiskContainer p={p}/>
  
  </group>
}
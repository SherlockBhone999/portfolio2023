import { useState, useContext , useEffect } from 'react'
import Disk from './Disk'
import TrackContainer from './TrackContainer'
import { Context } from '../Portfolio'


const DiskContainer = ({p}) => {
  const [listening, setListening ] = useState(false)
  const { airplanePosition } = useContext(Context)
  
  useEffect(()=>{
    if(airplanePosition==='intro'){
      setTimeout(()=>{ setListening(true) }, 1000 )
    }else{
      setTimeout(()=>{ setListening(false) }, 1000 )
    }
  })
  return <mesh position={p}>
    <Disk listening={listening} />
    <mesh >
      <TrackContainer />
    </mesh>
  </mesh>
}

export default function Intro({p}){
  
  
  return <group>
  <DiskContainer p={p}/>
  </group>
}
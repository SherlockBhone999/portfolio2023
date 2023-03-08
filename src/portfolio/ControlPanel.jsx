import {useContext} from 'react'
import {Context} from './Portfolio'
import { data} from './data'
const { p1, p2, p3, p4 } = data


const ForCar = () => {
  const { setMoveCar, setChosenCamera } = useContext(Context)
  return (
    <div class='grid'>
      <button onClick={()=>setChosenCamera('orbit')} > Orbital View </button >
      <button onClick={()=>setMoveCar('forward')} > forward </button>
      <button onClick={()=>setMoveCar('backward')} > backward </button>
    </div>
    )
}

const ForAirplane = () => {
  const {airplanePosition, airplaneYaw, setAirplaneMovement, setAirplaneYaw, setChosenCamera } = useContext(Context)
  
  return (
    <div>
    <div class='grid'>
    { airplanePosition === 'intro' && airplaneYaw ==='right'?
    <button onClick={()=>setAirplaneMovement('ItoP') }>I to P </button>
    : null }
    { airplanePosition === 'projects'&& airplaneYaw === 'left'?
    <button onClick={()=>setAirplaneMovement('PtoI') }>P to I </button>
    : null }
    { airplanePosition === 'intro'&& airplaneYaw === 'left'?
    <button onClick={()=>setAirplaneMovement('ItoO') }>I to 0</button>
    : null }
    { airplanePosition === 'other'&& airplaneYaw ==='right'?
    <button onClick={()=>setAirplaneMovement('OtoI') }>O to I </button>
    : null }
    { airplanePosition === 'projects'&& airplaneYaw ==='right'?
    <button onClick={()=>setAirplaneMovement('PtoO') }>P to O </button>
    : null }
    { airplanePosition === 'other'&& airplaneYaw ==='left'?
    <button onClick={()=>setAirplaneMovement('OtoP') }>O to P </button>
    : null }
    <button onClick={()=>setAirplaneYaw('standby') }>Standby </button>
    <button onClick={()=>setAirplaneYaw('left') }>left </button>
    <button onClick={()=>setAirplaneYaw('right') }>right </button>
    <button onClick={()=>setChosenCamera('orbit')} > Orbital View </button >
    </div>
    </div>
    )
}


const ForOrbit = () =>{
  const { setChosenCamera , setBg } = useContext(Context)
  return <div class='grid'>
    <button onClick={()=>setChosenCamera('airplane')}> drive airplane </button >
    <button onClick={()=>setChosenCamera('car')}> drive car </button >
    <button onClick={()=>setChosenCamera('gallery')}> view gallery </button >
    <button onClick={()=>setBg('bg-white')} > change bg </button>
    
  </div>
}


const ForGallery = () => {
  const { setChosenCamera , setCurrentProject, setProjectForWall, setProjectBlockListening } = useContext(Context)
  return <div class='grid'>
    <button onClick={()=>setChosenCamera('orbit')}> orbit view </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p1)
    }}> p1 </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p2)
    }}> p2 </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p3)
    }}> p3 </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p4)
    }}> p4 </button >
    
  </div>
}

export default function ControlPanel(){
  const { chosenCamera } = useContext(Context)
  
  if(chosenCamera === 'airplane'){
    return <div class='fixed bottom-0 left-0 bg-black w-full p-4 text-white '>
    <ForAirplane />
    </div>
  }else if(chosenCamera === 'car' ){
    return <div class='fixed bottom-0 left-0 bg-black w-full p-4 text-white'>
    <ForCar />
    </div>
  }else if(chosenCamera === 'gallery'){ 
    return <div class='fixed bottom-0 left-0 bg-black w-full p-4 text-white'>
    <ForGallery />
    </div>
  }else{
    return <div class='fixed bottom-0 left-0 bg-black w-full p-4 text-white bg-opacity-10'>
    <ForOrbit />
    </div>
  }
}
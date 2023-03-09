import {useContext, useEffect, useState} from 'react'
import {Context} from './Portfolio'
import { data} from './data'
const { p1, p2, p3, p4 } = data
import img1 from './images/fullv.jpg'

const ForOrbit = () =>{
  const { setChosenCamera , setBg , setTextForNavi } = useContext(Context)
  return <div class='grid'>
    <button onClick={()=>setChosenCamera('projects')} > projects view </button>
    <button onClick={()=>setChosenCamera('other')} > other view </button>
    <button onClick={()=>setChosenCamera('intro')} > intro view </button>
    <button onClick={()=>setChosenCamera('orbit')} > orbit view </button>
    <button onClick={()=>setChosenCamera('airplane')}> drive airplane </button >
    {/*
    <button onClick={()=>setBg('bg-white')} > change bg </button>
    */}
  </div>
}


const ForCar = () => {
  const { setMoveCar, setChosenCamera, setTextForNavi } = useContext(Context)
  return (
    <div class=''>
<button onClick={()=>setChosenCamera('airplane')}> drive airplane </button >

      <button onClick={()=>setMoveCar('forward')} > forward </button>
      <button onClick={()=>setMoveCar('backward')} > backward </button>
    </div>
    )
}

const ForAirplane = () => {
  const {airplanePosition, airplaneYaw, setAirplaneMovement, setAirplaneYaw, setChosenCamera , airplaneMovement, setTextForNavi } = useContext(Context)
  
  const [hide,setHide] = useState('')
  
  useEffect(()=>{
    setHide('hidden')
  },[airplanePosition])
  
  useEffect(()=>{
    setTimeout(()=>{
      setHide('')
    }, 6000)
  },[airplaneMovement])
  
  useEffect(()=>{
    if(airplanePosition === 'intro' && airplaneYaw ==='right'){
      setTextForNavi(textData.toP)
    }else if(airplanePosition === 'projects'&& airplaneYaw === 'left'){
      setTextForNavi(textData.toI)
    }else if(airplanePosition === 'intro'&& airplaneYaw === 'left'){
      setTextForNavi(textData.toO)
    }else if(airplanePosition === 'other'&& airplaneYaw ==='right'){
      setTextForNavi(textData.toI)
    }else if(airplanePosition === 'projects'&& airplaneYaw ==='right'){
      setTextForNavi(textData.toO)
    }else if(airplanePosition === 'other'&& airplaneYaw ==='left'){
      setTextForNavi(textData.toP)
    }
  },[airplaneYaw])
  
  return (
    <div class={hide}>
    <div class='grid'>
    { airplanePosition === 'intro' && airplaneYaw ==='right'?
    <button onClick={()=>{
      setAirplaneMovement('ItoP') 
    }}>I to P </button>
    : null }
    
    { airplanePosition === 'projects'&& airplaneYaw === 'left'?
    <button onClick={()=>{
      setAirplaneMovement('PtoI') 
    }}>P to I </button>
    : null }
    
    { airplanePosition === 'intro'&& airplaneYaw === 'left'?
    <button onClick={()=>{ 
      setAirplaneMovement('ItoO')
    } }>I to 0</button>
    : null }
    
    { airplanePosition === 'other'&& airplaneYaw ==='right'?
    <button onClick={()=>{
      setAirplaneMovement('OtoI') 
    }}>O to I </button>
    : null }
    
    { airplanePosition === 'projects'&& airplaneYaw ==='right'?
    <button onClick={()=>{
      setAirplaneMovement('PtoO')
    }}>P to O </button>
    : null }
    
    { airplanePosition === 'other'&& airplaneYaw ==='left'?
    <button onClick={()=>{
      setAirplaneMovement('OtoP')
    }}>O to P </button>
    : null }
    
    { airplanePosition === 'projects' ? <button onClick={()=>setChosenCamera('gallery')}> view gallery </button > : null 
    }
    { airplanePosition === 'intro' ? <button onClick={()=>setChosenCamera('car')}> drive car </button > : null
    }
    <button onClick={()=>setAirplaneYaw('standby') }>Standby </button>
    <button onClick={()=>setAirplaneYaw('left') }>left </button>
    <button onClick={()=>setAirplaneYaw('right') }>right </button>
    <button onClick={()=>setChosenCamera('orbit')} > Orbital View </button >

    
    </div>
    </div>
    )
}




const ForGallery = () => {
  const { setChosenCamera , setCurrentProject, setProjectForWall, setProjectBlockListening, setTextForNavi } = useContext(Context)
  return <div class='grid'>
    <button onClick={()=>setChosenCamera('orbit')}> orbit view </button >
<button onClick={()=>setChosenCamera('airplane')}> drive airplane </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p1)
      setTextForNavi(textData.tp1)
    }}> p1 </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p2)
      setTextForNavi(textData.tp2)
    }}> p2 </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p3)
      setTextForNavi(textData.tp3)
    }}> p3 </button >
    <button onClick={()=>{
      setProjectBlockListening(true)
      setCurrentProject(p4)
      setTextForNavi(textData.tp4)
    }}> p4 </button >
    
  </div>
}

const NavigatorBox = () =>{
  const { chosenCamera , textForNavi } = useContext(Context)
  
  return <div class='flex fixed top-0 left-0 bg-blue-200 bg-opacity-10'>
   <div class='w-10' >
      <img src={img1} />
    </div>
    
   <div class='p-4 text-white' >
    {textForNavi}
    </div>
   
  </div>
}

const ButtonsContainer = () => {
  const { chosenCamera } = useContext(Context)
  const containerStyle ='fixed bottom-0 right-0 bg-black w-full p-4 text-white bg-opacity-10 '
  
  if(chosenCamera === 'airplane'){
    return <div class={containerStyle}>
    <ForAirplane />
    </div>
  }else if(chosenCamera === 'car' ){
    return <div class={containerStyle}>
    <ForCar />
    </div>
  }else if(chosenCamera === 'gallery'){ 
    return <div class={containerStyle}>
    <ForGallery />
    </div>
  }else{
    return <div class={containerStyle}>
      <ForOrbit />
    </div>
  }
}


export default function ControlPanel(){
  const { setTextForNavi } = useContext(Context)
  
  useEffect(()=>{
    setTextForNavi(textData.toO)
  },[])
  return <div >
  
  <NavigatorBox />
  <ButtonsContainer />
  </div>
}


const textData = {
  orbit : 'you are in orbit mode',
  toP : 'wanna see my projects?',
  toI : 'lets get to know me',
  toO : 'there is nothing here yet',
  tp1 : 'it is basically a fancy todo App',
  tp2 : 'this is for personal use, to write diary and to reflect on my life and also for my future digital clone',
  tp3 : 'just a messenger clone',
  tp4 : 'personal korean practice webpage, not worth mentioning, it is here just to fill space ',
  i : '',
  p : '',
  o : '',
}
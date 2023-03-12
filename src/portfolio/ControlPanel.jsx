import {useContext, useEffect, useState} from 'react'
import {Context} from './Portfolio'
import { data} from './data'
const { p1, p2, p3, p4 } = data
import profileImg from '../assets/images/fullv.jpg'
import arrowImg from '../assets/images/arrow.png'
import halfArrowImg from '../assets/images/halfArrow.png'
import doubleArrowImg from '../assets/images/doubleArrow.png'
import roadImg from '../assets/images/road.png'
import roadColorImg from '../assets/images/roadColor.png'
import iImg from '../assets/images/i.png'
import oImg  from '../assets/images/o.png'
import pImg  from '../assets/images/p.png'
import airplaneImg  from '../assets/images/airplane.png'
import orbitImg from '../assets/images/orbit.png'
import linkUp from '../assets/images/linkUp.png'
import moonImg from '../assets/images/moon.png'
import roomImg from '../assets/images/room.png'
import  diceImg from '../assets/images/dice.jpg'
import  facebookImg from '../assets/images/facebook.png'
import googleImg  from '../assets/images/google.png'
import githubImg from '../assets/images/github.png'
import goImg from '../assets/images/go.png'
import powerImg from '../assets/images/power.png'
import buttonImg from '../assets/images/button.png'



const ForCar = () => {
  const { setMoveCar, setChosenCamera, setTextForNavi } = useContext(Context)
  return (
      <div class=''>
        <img src={doubleArrowImg} class='w-10 mb-1' onClick={()=>setMoveCar('forward')} /> 
        <img src={doubleArrowImg} class='w-10 transform rotate-180' onClick={()=>setMoveCar('backward')} />
      </div>
    )
}


const ForGallery = () => {
  const { setChosenCamera , setCurrentProject, setProjectForWall, setProjectBlockListening, setTextForNavi , textForNavi } = useContext(Context)
  
  const handleClick = (p,tp) => {
    if(textForNavi!==tp){
      setProjectBlockListening(true)
      setCurrentProject(p)
      setTextForNavi(tp)
    }
  }
  return <div class='grid grid-flow-col'>
    
  
    <div class='grid'>
      <div class=''>
        <button onClick={()=>handleClick(p1,textData.tp1)} 
          class='m-2' > 1 </button >
        <button onClick={()=>handleClick(p2,textData.tp2)}
          class='m-2' > 2 </button >
      </div>
      <div class=''>
        <button onClick={()=>handleClick(p3,textData.tp3)}
          class='m-2' > 3 </button >
        <button onClick={()=>handleClick(p4,textData.tp4)}
          class='m-2' > 4 </button >
      </div>
    </div>
    
  </div>
}

const NavigatorBox = () =>{
  const { chosenCamera , textForNavi } = useContext(Context)
  
  return <div class='flex fixed top-0 left-0 bg-gray-400 border-2 border-blue-400'>
   <div class='w-10 border-2 border-black' >
      <img src={profileImg} />
    </div>
    
   <pre class='p-4 text-white' >
    {textForNavi}
    </pre>
  
  </div>
}

const ButtonsContainer = () => {
  const { chosenCamera } = useContext(Context)
  const containerStyle ='fixed bottom-10 right-10 p-4 text-white bg-blue-100 bg-opacity-60 rounded-lg '
  
  if(chosenCamera === 'car' ){
    return <div class={containerStyle}>
    <ForCar />
    </div>
  }else if(chosenCamera === 'gallery'){ 
    return <div class={containerStyle}>
    <ForGallery />
    </div>
  }
}


export default function ControlPanel(){
  const { setTextForNavi, chosenCamera, airplaneYaw, airplanePosition } = useContext(Context)
  const [firstRender, setFirstRender] = useState(true)
  
  useEffect(()=>{
    setTextForNavi(textData.welcome)
    setFirstRender(false)
  },[])
  
  useEffect(()=>{
  if(airplanePosition==='intro' && airplaneYaw==='standby'){
    setTextForNavi(textData.i)
  }else if(airplanePosition==='projects' && airplaneYaw==='standby'){
    setTextForNavi(textData.p)
  }else if(airplanePosition==='other'&& airplaneYaw==='standby'){
    if(!firstRender) { setTextForNavi(textData.o) }
  }
  if(chosenCamera==='car'){
    setTextForNavi(textData.c)
  }
  },[airplaneYaw,chosenCamera])
  
  
  
  return <div >
  
  <NavigatorBox />
  <MainPanel />
  <ButtonsContainer />
  </div>
}


const MainPanel = () => {
  
  const {chosenCamera, setChosenCamera, airplanePosition, setAirplaneYaw, setAirplaneMovement } = useContext(Context)
  const [hide, setHide] = useState('')
  const a = 'm-1 flex border-2 border-black rounded p-1'
  const b = 'm-1 flex border-2 border-black bg-blue-400 rounded p-1 text-white'
  const [style, setStyle] = useState([a,a,a])
  
  const goToProjects = () => {
    if(airplanePosition === 'projects') return
    else if(airplanePosition === 'intro'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneYaw('right')
      },1000)
      setTimeout(()=>{
        setAirplaneMovement('ItoP')
      },3000)
      setTimeout(()=>{
        setChosenCamera('gallery')
        setHide('')
      },11300)
    }
    else if(airplanePosition === 'other'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneYaw('left')
      },0)
      setTimeout(()=>{
        setAirplaneMovement('OtoP')
      },1000)
      setTimeout(()=>{
        setChosenCamera('gallery')
        setHide('')
      },12200)
    }

  }
  
  const goToIntro = () => {
    if(airplanePosition==='intro') return
    else if(airplanePosition==='projects'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneYaw('left')
      },1000)
      setTimeout(()=>{
        setAirplaneMovement('PtoI')
      },2000)
      setTimeout(()=>{
        setChosenCamera('car')
        setHide('')
      },11400)
    }
    else if(airplanePosition==='other'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneYaw('right')
      },0)
      setTimeout(()=>{
        setAirplaneMovement('OtoI')
      },1000)
      setTimeout(()=>{
        setChosenCamera('car')
        setHide('')
      },10500)
    }
    
  }
  
  const goToOther = () => {
    if(airplanePosition==='other') return
    else if(airplanePosition==='projects'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneYaw('right')
      },1000)
      setTimeout(()=>{
        setAirplaneMovement('PtoO')
        setHide('')
      },2000)
      
    }
    else if(airplanePosition==='intro'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneYaw('left')
      },2000)
      setTimeout(()=>{
        setAirplaneMovement('ItoO')
        setHide('')
      },4000)
      
    }
  }
  
  useEffect(()=>{
    if(airplanePosition==='intro'){ setStyle([a,b,a]) }
    else if(airplanePosition==='projects'){ setStyle([b,a,a]) }
    else if(airplanePosition === 'other'){ setStyle([a,a,b]) }
  },[airplanePosition])
  
  return <div class={hide} >
  <div class='fixed bottom-10 left-10 p-2 bg-gray-200 grid rounded-lg'>
    <button onClick={goToProjects} class={style[0]}>see my projects </button>
    <button onClick={goToIntro} class={style[1]} >see my introduction </button>
    <button onClick={goToOther} class={style[2]}> see other </button>
  </div>
  </div>
}




const textData = {
  welcome : `welcome to my portfolio, I am the navigator for the journey,
  on your right is a running track where I introduce myself 
  and on your left is a room for my projects, 
  drive airplane to get there.`,
  orbit : 'you are in orbit mode',
  toP : 'wanna see my projects?',
  toI : 'lets get to know me',
  toO : 'there is nothing there yet',
  tp1 : 'it is basically a fancy todo App',
  tp2 : 'this is for personal use, to write diary and to reflect on my life and also for my future digital clone',
  tp3 : 'just a messenger clone',
  tp4 : 'personal korean practice webpage, not worth mentioning, it is here just to fill space ',
  i : 'click road icon ',
  p : 'click the dice',
  o : '...',
  c : '...'
}


/*

const ForAirplane = () => {
  const {airplanePosition, airplaneYaw, setAirplaneMovement, setAirplaneYaw, setChosenCamera , airplaneMovement, setTextForNavi } = useContext(Context)
  
  const [hide,setHide] = useState('')
  
  useEffect(()=>{
    setHide('invisible')
  },[airplanePosition])
  
  useEffect(()=>{
    if(airplaneYaw==='standby'){
      setTimeout(()=>{
        setHide('')
      }, 1000)
    }else{
      setTimeout(()=>{
        setHide('')
      }, 6000)
    }
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
    <div class='' >
    
    
    <div class='pl-1'>
    { airplanePosition === 'intro' && airplaneYaw ==='right'? <div> go to
    <img src={roomImg} class='w-10 inline m-1' onClick={()=>{
      setAirplaneMovement('ItoP') 
    }} /> </div>
    : null }
    
    { airplanePosition === 'projects'&& airplaneYaw === 'left'? <div> go to
    <img src={roadColorImg} class='w-10 inline m-1' onClick={()=>{
      setAirplaneMovement('PtoI') 
    }} /></div>
    : null }
    
    { airplanePosition === 'intro'&& airplaneYaw === 'left'? <div> go to
    <img src={goImg} class='w-10 inline m-1' onClick={()=>{ 
      setAirplaneMovement('ItoO')
    } } /> </div>
    : null }
    
    { airplanePosition === 'other'&& airplaneYaw ==='right'? <div> go to 
    <img src={roadColorImg} class='w-10 inline m-1' onClick={()=>{
      setAirplaneMovement('OtoI') 
    }} /> </div>
    : null }
    
    { airplanePosition === 'projects'&& airplaneYaw ==='right'? <div> go to
    <img src={goImg} class='w-10 inline m-1' onClick={()=>{
      setAirplaneMovement('PtoO')
    }} /> </div>
    : null }
    
    { airplanePosition === 'other'&& airplaneYaw ==='left'? <div>go to
    <img src={roomImg} class='w-10 inline m-1' onClick={()=>{
      setAirplaneMovement('OtoP')
    }} /> </div>
    : null }
    </div>
    
    <div class='flex justify-center ' > 
      { airplanePosition === 'projects' && airplaneYaw==='standby'?  <img src={diceImg} class='w-10 border-2 border-blue-200 rounded-full ' onClick={()=>setChosenCamera('gallery')} />  : null
      }
      { airplanePosition === 'intro' && airplaneYaw==='standby'?  <img src={roadImg} class='w-10' onClick={()=>setChosenCamera('car')} />  : null
      }
    </div>
    
    <div class ='flex m-1' >
    
      <div class='transform rotate-90' ><img src={arrowImg} class='w-10 transform rotate-180' onClick={()=>setAirplaneYaw('left') } /> </div>
      
      <img src={buttonImg} class='w-10 ' onClick={()=>setAirplaneYaw('standby') } />
      
       <img src={arrowImg} class='w-10 transform rotate-90' onClick={()=>setAirplaneYaw('right') } />
       
    </div>
  
    <div class='flex justify-end' >
      <img src={orbitImg} class='w-7' onClick={()=>setChosenCamera('orbit')} />
    </div>
    
    </div>
  </div>
    )
}



const ForOrbit = () =>{
  const { setChosenCamera , setBg , setTextForNavi ,bg, chosenCamera } = useContext(Context)
  const a = 'w-7 m-2 bg-blue-200'
  const b = 'border-2 border-blue-400 w-7 m-2 bg-blue-200'
  const [style, setStyle] = useState([a, a, a ])
  
  useEffect(()=>{
    if(chosenCamera==='other'){
      setStyle([b , a , a ])
    }else if(chosenCamera === 'projects'){
      setStyle([ a , b, a ])
    }else if(chosenCamera === 'intro'){
      setStyle([ a , a, b ])
    }else{
      setStyle([ a, a, a ])
    }
    
  },[chosenCamera])
  
  return <div class='grid grid-flow-col'>
  <div class='flex justify-center items-center transform rotate-90'>
    <img src={airplaneImg} class='w-14 m-1 transform rotate-180' onClick={()=>setChosenCamera('airplane')} />
    
    
      <div class='transform rotate-90' >
        <img src={moonImg} class='w-7 rotate-180' onClick={()=>{
        if(bg !== 'bg-gray-400 transition duration-1000'){ 
          setBg('bg-gray-400 transition duration-1000') }
        else { setBg('bg-gray-800 transition duration-1000') }
        }} />
      </div>
    
  </div>
  
  <div class='' >
    <img src={oImg} class={style[0]} onClick={()=>setChosenCamera('other')} />
    
    <img src={pImg} class={style[1]} onClick={()=>setChosenCamera('projects')} />
  
    
    <img src={iImg} class={style[2]} onClick={()=>setChosenCamera('intro')} />
  </div>
  
  
  
  </div>
}


*/
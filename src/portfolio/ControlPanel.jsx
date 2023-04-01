import {useContext, useEffect, useState} from 'react'
import {Context} from './Portfolio'
import { data} from './data'
const { p1, p2, p3, p4 } = data
import profileImg from '../assets/images/fullv.jpg'
import orbitImg from '../assets/images/orbit.png'


import moonImg from '../assets/images/moon.png'

import diceImg from '../assets/images/dice.jpg'
import facebookImg from '../assets/images/facebook.png'
import googleImg  from '../assets/images/google.png'
import githubImg from '../assets/images/github.png'

import powerImg from '../assets/images/power.png'
import doubleArrowImg from '../assets/images/doubleArrow.png'



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


const SideButtonsContainer = () => {
  const { chosenCamera } = useContext(Context)
  const containerStyle ='p-4 text-white flex items-center bg-gray-200 ml-1 rounded'
  
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
  const {currentIndex} = useContext(Context)
  
  return <div >
  
  <NavigatorBox />
  {currentIndex===0 || currentIndex===256 || currentIndex===-256 ?
  <div class='fixed bottom-10 left-10 p-2 flex'>
    <MainPanel />
    <SideButtonsContainer />
  </div>
  :
  <div class='fixed bottom-10 left-10 p-2 flex'>
    <SideButtonsContainer />
  </div>
  }
  </div>
}


const MainPanel = () => {
  
  const {chosenCamera, setChosenCamera, airplanePosition, setAirplaneYaw, setAirplaneMovement , currentIndex, bg, setBg , setAirplaneListening } = useContext(Context)
  const [hide, setHide] = useState('invisible')
  const a = 'm-1 flex border-2 border-black rounded p-1'
  const b = 'm-1 flex border-2 border-black bg-blue-400 rounded p-1 text-white'
  const [style, setStyle] = useState([a,a,a])
  
  const goToProjects = () => {
    if(airplanePosition === 'projects') return
    else if(airplanePosition === 'intro'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneListening(true)
        setAirplaneYaw('right')
      },2000)
      setTimeout(()=>{
        setAirplaneMovement('ItoP')
        setAirplaneListening(false)
      },2000+1000)
      setTimeout(()=>{
        setAirplaneListening(true)
      },2000+1000+3000)
      setTimeout(()=>{
        setChosenCamera('gallery')
        setHide('')
        setAirplaneListening(false)
      },2000+1000+3000+4000-600)
    }
    else if(airplanePosition === 'other'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneListening(true)
        setAirplaneYaw('left')
      },0)
      setTimeout(()=>{
        setAirplaneMovement('OtoP')
        setAirplaneListening(false)
      },1000)
      setTimeout(()=>{
        setAirplaneListening(true)
      },1000+4000)
      setTimeout(()=>{
        setChosenCamera('gallery')
        setHide('')
        setAirplaneListening(false)
      },1000+7600)
    }

  }
    
  const goToIntro = () => {
    if(airplanePosition==='intro') return
    else if(airplanePosition==='projects'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneListening(true)
        setAirplaneYaw('left')
      },1000)
      setTimeout(()=>{
        setAirplaneMovement('PtoI')
        setAirplaneListening(false)
      },2000)
      setTimeout(()=>{
        setAirplaneListening(true)
      },1000+2000+3000)
      setTimeout(()=>{
        setChosenCamera('car')
        setHide('')
        setAirplaneListening(false)
      },1000+2000+3000+3000-400)
    }
    else if(airplanePosition==='other'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneListening(true)
        setAirplaneYaw('right')
      },0)
      setTimeout(()=>{
        setAirplaneMovement('OtoI')
        setAirplaneListening(false)
      },1000)
      setTimeout(()=>{
        setAirplaneListening(true)
      },1000+3000)
      setTimeout(()=>{
        setChosenCamera('car')
        setHide('')
        setAirplaneListening(false)
      },1000 + 3000 + 4000-200)
    }
    
  }
  
  const goToOther = () => {
    if(airplanePosition==='other') return
    else if(airplanePosition==='projects'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneListening(true)
        setAirplaneYaw('right')
      },1000)
      setTimeout(()=>{
        setAirplaneMovement('PtoO')
        setAirplaneListening(false)
      },2000)
      setTimeout(()=>{
        setAirplaneListening(true)
      },1000+2000+3000)
      setTimeout(()=>{
        setHide('')
        setAirplaneListening(false)
      },1000+2000+3000+4000-200)
      
    }
    else if(airplanePosition==='intro'){
      setChosenCamera('airplane')
      setHide('invisible')
      setTimeout(()=>{
        setAirplaneListening(true)
        setAirplaneYaw('left')
      },2000)
      setTimeout(()=>{
        setAirplaneMovement('ItoO')
        setAirplaneListening(false)
      },3000)
      setTimeout(()=>{
        setAirplaneListening(true)
      },2000+3000+2000)
      setTimeout(()=>{
        setHide('')
        setAirplaneListening(false)
      },2000+3000+2000+3000 -500)
      
    }
  }
  
  useEffect(()=>{
    if(airplanePosition==='intro'){ setStyle([a,b,a]) }
    else if(airplanePosition==='projects'){ setStyle([b,a,a]) }
    else if(airplanePosition === 'other'){ setStyle([a,a,b]) }
  },[airplanePosition])
  
  useEffect(()=>{
    if(airplanePosition === 'intro'){
      if(currentIndex === 256 || currentIndex === 0 || currentIndex === -256){
        setHide('')
      }else{
        setHide('invisible')
      }
    }
  },[currentIndex])
  
  useEffect(()=>{
    setTimeout(()=>{
      setHide('')
      setAirplaneListening(false)
    },6000)
  },[])
  
  return <div class={hide} >
  
  <div class='grid bg-gray-200 rounded'>
  
    <button onClick={goToProjects} class={style[0]}>see my projects </button>
    <button onClick={goToIntro} class={style[1]} >see my introduction </button>
    <button onClick={goToOther} class={style[2]}> see other </button>
    <div class='flex justify-between'>
      <img src={orbitImg} class='w-7 p-1 ml-1' onClick={()=>{
      if(chosenCamera !== 'orbit'){ setChosenCamera('orbit') }
      else{ setChosenCamera('airplane') }
      }} />
      <img src={moonImg} class='w-7 p-1 mr-1' onClick={()=>{
        if(bg !== 'bg-gray-400 transition duration-1000'){ 
          setBg('bg-gray-400 transition duration-1000') }
        else { setBg('bg-gray-800 transition duration-1000') }
      }} />
    </div>
  
  </div>
  
  </div>
}




const textData = {
  welcome : `welcome to my portfolio,I am the navigator`,
  welcome2 : 'control panel is on the bottom left',
  orbit : 'you are in orbit mode',
  tp1 : 'it is basically a fancy todo App',
  tp2 : 'for my personal use, to write diary and to reflect on my life and also for my future digital clone',
  tp3 : 'just a messenger clone',
  tp4 : 'personal korean practice webpage, not worth mentioning ',
  blank : '...',
  intro : 'let me introduce myself',
  board1: 'board1',
  board2: 'board2',
  board3: 'board3',
  board4: 'board4',
  board5: 'board5',
  board6: 'board6',
  board7: 'board7',
  board8: 'board8',
}

const NavigatorBox = () =>{
  const { chosenCamera, airplaneMovement , currentIndex} = useContext(Context)
  
  const [textForNavi, setTextForNavi] = useState('...')
  const [firstRender, setFirstRender] = useState(true)

  useEffect(()=>{
    if(firstRender){
      setTextForNavi(textData.welcome)
      setFirstRender(false)
    }
    setTimeout(()=>{
      setTextForNavi(textData.welcome2)
    },6000)
  },[])
  
  useEffect(()=>{
    if(chosenCamera==='airplane'){
      if(airplaneMovement==='OtoI'){
        setTextForNavi(textData.intro)
      }
    }
  },[chosenCamera,airplaneMovement])
  
  useEffect(()=>{
    if(chosenCamera==='car'){
      if(currentIndex===0 || currentIndex===256 || currentIndex===-256){
        setTextForNavi(textData.board1)
      }else if( currentIndex===32 || currentIndex===(-256+ 32) ){
        setTextForNavi(textData.board2)
      }else{
        setTextForNavi(textData.blank)
      }
    }
  },[chosenCamera,currentIndex])
  
  
  return <div class='flex fixed top-0 left-0 bg-gray-400 border-2 border-blue-400'>
  
    <div class='w-10 border-2 border-black' >
      <img src={profileImg} />
    </div>
    
   <p class='p-4 text-white' >
    {textForNavi}
    </p>
  
  
  </div>
  
}

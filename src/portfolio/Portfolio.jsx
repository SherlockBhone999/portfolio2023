import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import { useState, createContext,useContext } from 'react'
import * as THREE from 'three'
import LoadScreen from './components/LoadScreen'
import {data} from './data'
const { p1 } = data


import ControlPanel from './ControlPanel'
import AirplaneContainer from './AirplaneContainer'
import Pyramid from './Pyramid'


////////////////////////////
const elem = document.documentElement;

const toLandscapeMode = () => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  screen.orientation.lock("landscape")
}

const OrbitCamera = ({chosenCamera}) => {
  const vec = new THREE.Vector3()
  const i = [100+50,0,0]
  const p = [-50,0,-86]
  const o = [-50,0,86]
  const ii = [100+200,60,150]
  const pp = [-50-80, 30, -86-60]
  const oo = [-50-25, 30, 86+43]
  useFrame(({camera})=>{
    if(chosenCamera==='intro'){
      vec.set( ii[0], ii[1], ii[2])
      camera.lookAt(i[0], i[1], i[2])
      camera.position.lerp(vec, .02)
    }else if(chosenCamera==='projects'){
      vec.set( pp[0], pp[1], pp[2])
      camera.lookAt(p[0],p[1],p[2])
      camera.position.lerp(vec, .02)
    }else if(chosenCamera==='other'){
      vec.set( oo[0], oo[1], oo[2] )
      camera.lookAt(o[0],o[1],o[2])
      camera.position.lerp(vec, .02)
    }else if(chosenCamera==='orbit'){
      camera.lookAt(0,0,0)
    }
    
    
  })
  return <OrbitControls />
}


function App() {
  const {chosenCamera, bg } = useContext(Context)
  
  return (
  <div class='fixed w-full h-full p-5'>
    <Canvas class={bg} >		

      <ambientLight intensity={1} />
      { chosenCamera ==='orbit' || chosenCamera==='projects' || chosenCamera==='intro' || chosenCamera==='other' ? <OrbitCamera chosenCamera={chosenCamera} /> : null }
      
      <Pyramid />
      <AirplaneContainer />
      
    </Canvas>

    <ControlPanel />
    <LoadScreen toLandscapeMode={toLandscapeMode}/>
  </div>
  )
}


export const Context = createContext()

export default function Portfolio() {

  
  const [airplaneYaw, setAirplaneYaw ] = useState('standby')
  const [airplaneMovement, setAirplaneMovement ] = useState('ItoO')
  const [chosenCamera, setChosenCamera] = useState('other')
  const [airplanePosition, setAirplanePosition ] = useState('other')
  const [currentProject, setCurrentProject ] = useState(p1)
  const [moveCar , setMoveCar] = useState('')
  const [bg, setBg] = useState('bg-gray-600')
  const [projectBlockListening, setProjectBlockListening ] = useState(true)
  const [textForNavi, setTextForNavi ] = useState('')
  
  return <Context.Provider value={{
  
  chosenCamera,
  setChosenCamera,
  airplaneYaw,
  setAirplaneYaw,
  airplaneMovement,
  setAirplaneMovement,
  airplanePosition,
  setAirplanePosition,
  currentProject,
  setCurrentProject,
  moveCar,
  setMoveCar,
  bg,
  setBg,
  projectBlockListening,
  setProjectBlockListening,
  textForNavi,
  setTextForNavi,
  
  }}>
  <App />
  </Context.Provider>
}


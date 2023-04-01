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

const CameraOther = () => {
  const {chosenCamera, bg } = useContext(Context)
  const vec = new THREE.Vector3()
 
  useFrame(({camera})=>{
    vec.set( -50-25, 30, 86.6+43)
    camera.position.lerp( vec, 0.1)
    camera.lookAt( -50, 0, 86.6 )
  })
  return <OrbitControls />
}


function App() {
  const {chosenCamera, bg } = useContext(Context)
 
  
  return (
  <div class='fixed w-full h-full p-5'>
    <Canvas class={bg} >		

      <ambientLight intensity={1} />
      { chosenCamera ==='orbit'? <OrbitControls /> : null }
      { chosenCamera === 'other' ? <CameraOther /> : null }
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
  const [bg, setBg] = useState('bg-gray-800')
  const [projectBlockListening, setProjectBlockListening ] = useState(true)
  const [currentIndex, setCurrentIndex ] = useState(0)
  const [airplaneListening, setAirplaneListening ] = useState(true)
  
  
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
  currentIndex,
  setCurrentIndex,
  airplaneListening,
  setAirplaneListening,
  
  }}>
  <App />
  </Context.Provider>
}


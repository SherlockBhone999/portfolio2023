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

function App() {
  const {chosenCamera } = useContext(Context)
  
  return (
  <div class='fixed w-full h-full p-5'>
    <Canvas class='bg-black ' >		

      <ambientLight intensity={1} />
      { chosenCamera ==='orbit'? <OrbitControls /> : null }
      
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
  const [airplaneMovement, setAirplaneMovement ] = useState('PtoI')
  const [chosenCamera, setChosenCamera] = useState('orbit')
  const [airplanePosition, setAirplanePosition ] = useState('intro')
  const [currentProject, setCurrentProject ] = useState(p1)
  const [moveCar , setMoveCar] = useState('')

  
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
  setMoveCar
  
  
  }}>
  <App />
  </Context.Provider>
}


import { useState, useEffect, useRef , useContext, Suspense } from "react";
import {Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import {OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei"
import {useBox, usePlane, Physics } from "@react-three/cannon"
import * as THREE from 'three'
import { TextureLoader } from 'three'
import {Context} from '../Portfolio'
import {data } from '../data'
const { p1, p2, p3, p4 } = data

import { FrameBlock } from '../../assets/3d_square_frame/Square_frame'
import { StatueStand } from '../../assets/statue_stand/Statue_stand'
import { SquidSquare } from '../../assets/squid_game_sugar_honeycomb_square_cookie/Square'
import { PhotoFrame1 } from '../../assets/3d_architecture__photo_frame/Photo_frame'

//////////////////////////////////////////////////////////////

const PicObject = ({chosen}) => {
  
  return (
    <mesh >
      <boxGeometry args={[0,20,15]} />
      <meshStandardMaterial map={chosen} />
    </mesh>
    )
}


const Picture = ({item, img}) => {
  const ref= useRef()
  const { currentProject } = useContext(Context)
  const [ img1, img2 ] = useLoader(TextureLoader, item.imgArray )
  const [chosen, setChosen ] = useState(img1)
  
  useEffect(()=>{
  if( item.position.toString() === currentProject.position.toString()){
    setChosen( img)
  }else{
    setChosen( img1)
  }
  })
  
  
  return (<mesh ref={ref} position={item.position}
  rotation={item.rotation} scale={item.scale}>
    <PicObject chosen={chosen} />
  </mesh>)
}



const Circle =({img}) =>{
  const ref = useRef()
  const [r, setR] = useState(0)
  const { currentProject } = useContext(Context)
  
  const rotate = (rr) => {
    const target = currentProject.circleRotation[1]
    if(rr.y < target){
      rr.y = r + 0.01
      setR(rr.y)
    }else if(rr.y > target){
      rr.y = r - 0.01
      setR(rr.y)
    }
  }

  useFrame(()=>{
    const rr = ref.current.rotation
    rotate(rr)
  })
  
  return <mesh ref={ref} position={[-20,0,0]} >
    <sphereGeometry args={[1]} />
    <meshStandardMaterial color='black' />
    <Picture item={p1} img={img}/>
    <Picture item={p2} img={img}/>
    <Picture  item={p3} img={img}/>
    <Picture  item={p4} img={img}/>
    {/*
    <mesh scale={0.3} position={[15,-15,-5]}>
      <FrameBlock />
    </mesh>
    */}
    <mesh >
      <boxGeometry args={[19,25,19]} />
      <meshLambertMaterial color='gray' />
    </mesh>

    
  </mesh>
}

const Wall = ({img}) => {
  const ref = useRef()
  const vec =new THREE.Vector3()
  const {chosenCamera } = useContext(Context)
  
  useFrame(( {camera})=>{
    if(chosenCamera === 'gallery' ){
      vec.set( -50-25-13+6+5, 10, -86-43-22 +11+7)
      camera.position.lerp( vec, .02 )
      camera.lookAt( 0,0,0 )
    }
  })
  
  return (<mesh ref={ref} position={[20,0,0]}>
    <boxGeometry args={[30,30,1]} />
    <meshLambertMaterial map={img}/>
  </mesh>)
}

const Button = ({ currentImg, setCurrentImg, array}) => {
  const ref=useRef()
  
  const handleClick = () => {
    if(currentImg === array[0]){
      setCurrentImg( array[1])
    }else{
      setCurrentImg( array[0])
    }
  }
  
  return <mesh onClick={handleClick} >
    <boxGeometry args={[3,3,1]} />
    <meshLambertMaterial color='lightgreen'/>
  </mesh>
}

export default function Gallery(){
  const { currentProject } = useContext(Context)
  const [ img1, img2 ] = useLoader(TextureLoader, currentProject.imgArray )
  const [currentImg, setCurrentImg] = useState(img1)
  
  useEffect(()=>{
    setCurrentImg( img1)
  },[currentProject])
  
  const array = [img1, img2]
  return <mesh >
  <Circle img={currentImg} />
  <Wall img={currentImg} />
  <Button currentImg={currentImg} setCurrentImg={setCurrentImg} array={array} />
  {/*
  <mesh position={[0, -64, 0]} scale={60} rotation={[0,Math.PI/6, 0]}>
    <StatueStand />
    <mesh position={[0,0.6,0]} scale={1.5}>
      <SquidSquare />
    </mesh>
  </mesh>
*/}
  
  <mesh position={[0,-28, 0]}>
    <boxGeometry args={[100,2,80]} />
    <meshLambertMaterial color='white' />
  </mesh>


  </mesh >
}


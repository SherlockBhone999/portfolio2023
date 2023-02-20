import { useState, useEffect, useRef , useContext, Suspense } from "react";
import {Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import {OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei"
import {useBox, usePlane, Physics } from "@react-three/cannon"
import * as THREE from 'three'
import { TextureLoader } from 'three'
import {Context} from '../Portfolio'
import {data } from '../data'
const { p1, p2, p3, p4 } = data



//////////////////////////////////////////////////////////////


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
    <boxGeometry args={[0,15,15]} />
    <meshStandardMaterial map={chosen} />
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
  </mesh>
}

const Wall = ({img}) => {
  const ref = useRef()
  const vec =new THREE.Vector3()
  const {chosenCamera } = useContext(Context)
  
  useFrame(( {camera})=>{
    if(chosenCamera === 'gallery' ){
      vec.set( -50*2, 10, -86*2 )
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
  </mesh >
}


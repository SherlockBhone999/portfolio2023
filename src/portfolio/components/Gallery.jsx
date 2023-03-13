import { useState, useEffect, useRef , useContext, Suspense } from "react";
import {Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import {OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei"
import {useBox, usePlane, Physics } from "@react-three/cannon"
import * as THREE from 'three'
import { TextureLoader } from 'three'
import {Context} from '../Portfolio'
import {data } from '../data'
const { p1, p2, p3, p4 } = data



import { EmptyRoom } from '../../assets/empty_room/Empty_room'
import { Desk } from '../../assets/desk/Desk'
import { Tv2 } from '../../assets/tv2/Tv2'
import { HallowCube } from '../../assets/hallow_cube/HallowCube'
import { RecycleBin } from '../../assets/recycleBin/RecycleBin'

//////////////////////////////////////////////////////////////

const PicObject = ({chosen}) => {
  
  return (
    <mesh >
      <boxGeometry args={[0.2,17.5,17.5]} />
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
  const [r, setR] = useState(3/4*Math.PI)
  const { currentProject, projectBlockListening, setProjectBlockListening } = useContext(Context)
  const prevProjectRef = useRef({id:0})
  
  const rotate = (rr) => {
    const target = currentProject.circleRotation[1]
    if(rr.y < target){
      rr.y = r + 0.04
      setR(rr.y)
    }else if(rr.y > target){
      rr.y = r - 0.04
      setR(rr.y)
    }
  }
  
  const getDifference = () => {
    const d = currentProject.id - prevProjectRef.current.id 
    const dd = Math.abs(d)
    return dd
  }

  useFrame(()=>{
    const rr = ref.current.rotation
    if(projectBlockListening){ rotate(rr) }
  })
  
  useEffect(()=>{
    const difference = getDifference()
    setTimeout(()=>{setProjectBlockListening(false)}, difference*900)
  }, [currentProject])
  
  useEffect(()=>{
    prevProjectRef.current = currentProject
  },[currentProject])
  
  useEffect(()=>{
    setTimeout(()=>{setProjectBlockListening(false)}, 6000)
  },[])
  
  return <mesh ref={ref} position={[-20,0,0]} >
    <sphereGeometry args={[1]} />
    <meshStandardMaterial color='black' />
    <Picture item={p1} img={img}/>
    <Picture item={p2} img={img}/>
    <Picture  item={p3} img={img}/>
    <Picture  item={p4} img={img}/>
    
    <mesh scale={9.9} position={[0,0,0]} rotation={[Math.PI,0,0]}>
      <HallowCube />
    </mesh>
    

    
  </mesh>
}

const TV = ({img}) => {
  const ref = useRef()
  const vec =new THREE.Vector3()
  const {chosenCamera } = useContext(Context)
  
  useFrame(( {camera})=>{
    if(chosenCamera === 'gallery' ){
      
      vec.set( -77, 10, -133)
      camera.position.lerp( vec, .02 )
      camera.lookAt( 0,0,0 )
    }
  })
  
  return (<group ref={ref} position={[20,0,-10]}>
  <mesh position={[0,-4,2]}>
    <boxGeometry args={[39,20,0]} />
    <meshLambertMaterial map={img}/>
  </mesh>
  
  <mesh scale={10} position={[0,-26,0]}>
    <Desk />
  </mesh>
  
  <mesh scale={3} position={[0,-17,0]}>
    <Tv2 />
  </mesh>
  
  
  
  </group>)
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
  
  return <group onClick={handleClick} position={[47,0,-10]}>
    <mesh>
      <boxGeometry args={[3,3,1]} />
      <meshLambertMaterial color='black'/>
    </mesh>
    <mesh position={[0,-10,0]} >
      <boxGeometry args={[3,3,1]} />
      <meshStandardMaterial color='green' />
    </mesh>
    
  </group>
}

export default function Gallery(){
  const { currentProject } = useContext(Context)
  const [ img1, img2 ] = useLoader(TextureLoader, currentProject.imgArray )
  const [currentImg, setCurrentImg] = useState(img1)
  
  useEffect(()=>{
    setCurrentImg( img1)
  },[currentProject])
  
  const array = [img1, img2]
  return <group>
  
  <mesh position={[0,0,0]} rotation={[0, 0, 0]}>
  <Circle img={currentImg} />
  <TV img={currentImg} />
  <Button currentImg={currentImg} setCurrentImg={setCurrentImg} array={array} />
  </mesh >
  
  <group position={[25-13+6 -22,-30, 43+21-10 ]} rotation={[0, 0, 0]}>
    <mesh scale={35} >
      <EmptyRoom />
    </mesh>
    <mesh position={[-75,8,60]} scale={1} >
      <RecycleBin />
    </mesh>
  
    <mesh position={[0,10,0]} scale={1} >
  
    </mesh>
    
  </group>

  

  </group>
}

//ROOM r -math.pi/3
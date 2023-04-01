import {useState} from 'react'


export default function LoadScreen ({toLandscapeMode}){
  const [state,setState] = useState('')
  
  return <div class={state} >
  <div class='fixed bg-black w-full h-full top-0 left-0 text-white flex justify-center items-center'>
  
  <button onClick={()=>{
    setState('hidden')
    toLandscapeMode()
  }}> go in </button>
  
  </div>
  
  </div>
}
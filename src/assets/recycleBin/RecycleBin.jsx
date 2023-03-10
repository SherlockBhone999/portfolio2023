/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 recycleBin.gltf --transform
Author: Kastle (https://sketchfab.com/kastle)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/new-orleans-square-recycle-bin-1a483a2207a948e98d0889f49d0be92a
Title: New Orleans Square Recycle Bin
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function RecycleBin(props) {
  const { nodes, materials } = useGLTF('/recycleBin-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.material_1} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.material_2} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.material_3} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.material_4} />
      </group>
    </group>
  )
}

useGLTF.preload('/recycleBin-transformed.glb')

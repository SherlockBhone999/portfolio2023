/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 desk.gltf --transform
Author: Uriel Bromberg (https://sketchfab.com/UrielBromberg)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/desk-props-deluxe-room-table-personal-09bf5678a77044e4a4847c9a8a2a2f6d
Title: Desk: Props Deluxe (Room Table Personal)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Desk(props) {
  const { nodes, materials } = useGLTF('/desk-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.table01} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.table02} />
      </group>
    </group>
  )
}

useGLTF.preload('/desk-transformed.glb')

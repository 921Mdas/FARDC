import React from 'react'
import {useStore} from '../store/store'
import { Text } from '@react-three/drei'
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";


function Pager() {
  const { isSoldierAnimated, currentNav } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
    currentNav: state.currentNav
  }));

  return (
    <Text font={RobotoCondensedBold} position={[2.5,1.75,0.8]} scale={0.1} color='grey'>Page {currentNav}</Text>
  )
}

export default Pager
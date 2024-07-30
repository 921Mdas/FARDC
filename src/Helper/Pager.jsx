import React from 'react'
import {useStore} from '../store/store'
import { Text } from '@react-three/drei'
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";


function Pager() {
  const { isSoldierAnimated, currentNav, colors } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
    currentNav: state.currentNav,
    colors:state.colors
  }));

  return (
    <Text  position={[2.67,2,0.8]} scale={0.05} color={colors.darkred}>PAGE {currentNav}</Text>
  )
}

export default Pager
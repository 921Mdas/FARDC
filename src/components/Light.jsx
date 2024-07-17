// External imports
import React, { useRef } from 'react';
import { useHelper, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useControls, folder } from 'leva';
import { useFrame } from 'react-three-fiber';

export const Light = () => {
  const directionalHelper = useRef();
  useHelper(directionalHelper, THREE.DirectionalLightHelper, 0.5, "#BB2124");

  // Light controls with Leva
  const {
    ambientLight,
    directionalLight,
    dlPosition,
    pointLightIntensity,
    pointLightPosition,
    pointLightColor,
    pointLightDistance
  } = useControls("light", {
    projectors: folder({
      ambientLight: { value: 0.4, min: 0, max: 1, step: 0.01 },
      directionalLight: { value: 1, min: 0, max: 1, step: 0.01 },
      dlPosition: { value: [0.5, 2, 0] },
      spotLightIntensity: { value: 5, min: 0, max: 10, step: 0.1 },
      spotLightPosition: { value: [0, 2, 0] },
      fogColor: { value: 'white' },
      fogNear: { value: 0, min: 0, max: 100, step: 1 },
      fogFar: { value: 40, min: 0, max: 100, step: 1 },
      pointLightIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
      pointLightPosition: { value: [0, 1, 0.7] },
      pointLightColor: { value: 0xff0000 },
      pointLightDistance: { value: 10, min: 0, max: 200, step: 1 }
    }),
  });

  const point = useRef();
  let direction = 1; // 1 for up, -1 for down
  let speed = 0.01; // Speed of the floating motion
  let maxHeight = pointLightPosition[1] + 1; // Max height for the light
  let minHeight = pointLightPosition[1] - 1; // Min height for the light

  useFrame(() => {
    // Update the position of the point light to create a floating motion
    if (point.current.position.y >= maxHeight) {
      direction = -1; // Change direction to down
    } else if (point.current.position.y <= minHeight) {
      direction = 1; // Change direction to up
    }
    point.current.position.y += direction * speed; // Update position
  });

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={ambientLight} position={[0, 0, 0]} color={'white'} />
      
      {/* Floating Point Light */}
      <pointLight
        intensity={pointLightIntensity}
        position={pointLightPosition}
        color={pointLightColor}
        distance={pointLightDistance}
        ref={point}
      />
      
      {/* Directional Light */}
      <directionalLight
        intensity={directionalLight}
        position={dlPosition}
        rotation={[0.5, 0, 0]}
        color={'white'}
        castShadow
      />
      
      {/* Environment */}
      <Environment preset="night" />
    </>
  );
}

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Euler, MathUtils, DirectionalLightHelper, SpotLightHelper, PointLightHelper } from 'three';
import { useControls, folder } from 'leva';
import { ObjectAnimate } from '../Helper/Helper';

const Light = () => {
  const directionalLightRef = useRef();
  const pointLightRef = useRef();
  const spotLightRef = useRef();

  const directionalHelperRef = useRef();
  const pointLightHelperRef = useRef();
  const spotLightHelperRef = useRef();

  let direction = 1; // 1 for up, -1 for down
  const speed = 0.01; // Speed of the floating motion

  // Light controls with Leva
  const {
    ambientLight,
    directionalLight,
    dlPosition,
    pointLightIntensity,
    pointLightPosition,
    pointLightColor,
    pointLightDistance,
    spotLightIntensity,
    spotLightPosition,
    spotLightColor,
    spotLightDistance,
    spotLightAngle
  } = useControls("light", {
    projectors: folder({
      ambientLight: { value: 0.4, min: 0, max: 1, step: 0.01 },
      directionalLight: { value: 1, min: 0, max: 1, step: 0.01 },
      dlPosition: { value: [0.5, 1, 0] },
      pointLightIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
      pointLightPosition: { value: [0, 1, 1.7] },
      pointLightColor: { value: 0xff0000 },
      pointLightDistance: { value: 10, min: 0, max: 200, step: 1 },
      spotLightIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
      spotLightPosition: { value: [0, 5, 0] },
      spotLightColor: { value: 0x00ff00 },
      spotLightDistance: { value: 50, min: 0, max: 100, step: 1 },
      spotLightAngle: { value: Math.PI / 4, min: 0, max: Math.PI / 2, step: 0.01 }
    }),
  });

  const maxHeight = pointLightPosition[1] + 1; // Max height for the light
  const minHeight = pointLightPosition[1] - 1; // Min height for the light

  useFrame(() => {
    // Update the position of the point light to create a floating motion
    if (pointLightRef.current.position.y >= maxHeight) {
      direction = -1; // Change direction to down
    } else if (pointLightRef.current.position.y <= minHeight) {
      direction = 1; // Change direction to up
    }
    pointLightRef.current.position.y += direction * speed; // Update position
  });

  // useEffect(() => {
  //   if (directionalLightRef.current) {
  //     // Initialize the directional light helper
  //     directionalHelperRef.current = new DirectionalLightHelper(directionalLightRef.current, 0.5);
  //     directionalLightRef.current.add(directionalHelperRef.current);
  //     directionalHelperRef.current.update();
  //   }

  //   if (pointLightRef.current) {
  //     // Initialize the point light helper
  //     pointLightHelperRef.current = new PointLightHelper(pointLightRef.current, 1);
  //     pointLightRef.current.add(pointLightHelperRef.current);
  //     pointLightHelperRef.current.update();
  //   }

  //   if (spotLightRef.current) {
  //     // Initialize the spot light helper
  //     spotLightHelperRef.current = new SpotLightHelper(spotLightRef.current);
  //     spotLightRef.current.add(spotLightHelperRef.current);
  //     spotLightHelperRef.current.update();
  //   }
  // }, []);


  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={ambientLight} />

      {/* Floating Point Light */}
      <pointLight
        ref={pointLightRef}
        intensity={pointLightIntensity}
        position={pointLightPosition}
        color={pointLightColor}
        distance={pointLightDistance}
      />

      {/* Directional Light */}
      <directionalLight
        ref={directionalLightRef}
        intensity={directionalLight}
        position={dlPosition}
        castShadow
      />

     
    </>
  );
};

export default Light;

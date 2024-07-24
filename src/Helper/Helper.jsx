import React,{useEffect, useState} from 'react'
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import {useStore} from '../store/store';
import { UseThree } from 'three';






// Helper function to set castShadow property on an object
export const setCastShadow = (object) => {
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });
};


// Helper function to change primitive material
export const setPrimitiveMaterial = (model, material)=>{
   if (!model) return;

    model.scene.traverse(
      (child)=>{
          if(child.isMesh){
            child.material = material
          }
      }
    )

    return null
}

// Button
export const HelperButton = ({ fnClick, scale=0.3, text, textScale=0.8, textColor, textFont}) => {

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <mesh
      onClick={() => {
        fnClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0,0.6,0]}
      scale={scale}
    >
  
          <Text
            text={text}
            scale={textScale}
            font={textFont}
            color={textColor}
            fnClick={function () {
              throw new Error("Function not implemented.");
            }}
          />

    </mesh>
  );
};


// ObjectAnimate Helper
export const ObjectAnimate = (name,objectRef, animate) => {
  const { currentNav } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
    currentNav: state.currentNav
  }));

  const {camera} = useThree()

  if(currentNav === 2){
    gsap.to(camera.position, {duration:1})
  }
  
  useEffect(() => {
   
    // Forward animation
    if (name === 'soldierfwd' && currentNav === 1) {
      gsap.to(objectRef.current.position, { duration: 1, y: -3 });
    }

    if (name === 'pistol_originalfwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -1.5 });
      gsap.to(objectRef.current.position, { duration: 1, y: 0.9, x: -0.5 });
    }
    if (name === 'AKfwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -1.6 });
      gsap.to(objectRef.current.position, { duration: 1, x: 1.3, z: -3 });
    }
    if (name === 'Riflefwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 0 });
      gsap.to(objectRef.current.position, { duration: 1, x: -1.7, y: -0.6 });
    }
    if (name === 'pistol_clonefwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 0 });
    }
    if (name === 'skullfwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: 0.2, delay:0.2 });
    }
    if (name === 'skullfwd' && currentNav === 3) {
       gsap.to(objectRef.current.position, { duration: 1, y: -5, delay:0.2 });
    }
    if (name === 'cemeteryfwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: -0.3, delay:0.2 });
    }
    if (name === 'cemeteryfwd' && currentNav === 3) {
       gsap.to(objectRef.current.position, { duration: 1, y: -5, delay:0.2 });
    }

    if(name==='to_headline' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: 5 } )
    }
    if(name==='fardc_headline' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: -5 } )
    }
    if(name==='date_headline' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: 5 } )
    }
    if(name==='knifefwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: -3 } )
    }
    if(name==='rosefwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 5, y: 5 } )
      gsap.to(objectRef.current.rotation,  { duration: 5, y: Math.PI } )
    }
    if(name==='mineralfwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0.5, z:0 } )
    }
    if(name==='mineralfwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -3, z:0 } )
    }
    if(name==='contentonefwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: -1.6 } )
    }
    if(name==='contentonefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, x: -10 } )
    }
    if(name==='contenttwofwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: -0.1 } )
    }
    if(name==='contenttwofwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, x: 10 } )
    }
    if(name==='contentthreefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -0.2,z:3 } )
    }
    if(name==='contentthreefwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: 6 } )
    }
    if(name==='groupefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
    if(name==='contentimagefwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0 } )
    }

    // Backward animation
    if (name === 'soldierbckwd' && currentNav === 0) {
      gsap.to(objectRef.current.position, { duration: 1, y: 0 });
    }
    if (name === 'pistol_originalbckwd' && currentNav === 0) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -3 });
      gsap.to(objectRef.current.position, { duration: 1, y: -0.12, x: -0.96 });
    }
    if (name === 'AKbckwd' && currentNav === 0) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 0 });
      gsap.to(objectRef.current.position, { duration: 1, x: 0.02, z: -1.48 });
    }
    if (name === 'Riflebckwd' && currentNav === 0) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -1.58 });
      gsap.to(objectRef.current.position, { duration: 1, x: -1.42, y: -0.35 });
    }
    if (name === 'pistol_clonebckwd' && currentNav === 0) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 1.60 });
      gsap.to(objectRef.current.position, { duration: 1, x: 0.49, y: 0.75 });
    }
    if (name === 'skullbckwd' && currentNav === 1) {
      gsap.to(objectRef.current.position, { duration: 1, y: -3, });
    }
    if (name === 'cemeterybckwd' && currentNav === 1) {
      gsap.to(objectRef.current.position, { duration: 1, y: -5, });
    }
    if(name==='to_headline' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, x: 0.5 } )
    }
      if(name==='fardc_headline' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, x: -1.53 } )
    }
    if(name==='date_headline' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, x: 0.3 } )
    }
     if(name==='knifebckwd' && currentNav === 0){
      gsap.to(objectRef.current.position, { duration: 1, y: -0.5 } )
    }
     if(name==='rosebckwd' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 5, y: -0.4 } )
      gsap.to(objectRef.current.rotation,  { duration: 5, y: 0 } )
    }
    if(name==='mineralbckwd' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, y: -10, z:-60 } )
    }
    if(name==='contentonebckwd' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, x: -10 } )
    }
    if(name==='contenttwobckwd' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, x: 10 } )
    }
    if(name==='contentthreebckwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 6 } )
    }

     if(name==='groupebckwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0.5 } )
    }
     if(name==='contentimagebckwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -10 } )
    }

  }, [animate, objectRef, name, currentNav]);
};


// animateCamera Helper
export const useCameraAnimate = (objectRef, animate, pos, duration, delay) => {
  const {camera} = useThree()

  useEffect(() => {
    if (camera && animate) {
      gsap.to(camera.rotation, { duration, ...pos, delay  });
      gsap.to(camera.position, { duration, ...pos, delay  });
    }
  }, [objectRef, animate, pos, duration]);
};


// random extreme numbers

 export function getExtremeRandom(distance, extreme) {
  const random = Math.random();
  if (random < distance) {
    // Generate a number between -1.5 and -1.0
    return Math.random() * (-1.0 - (-extreme)) + (-extreme);
  } else {
    // Generate a number between 1.0 and extreme
    return Math.random() * (extreme - 1.0) + 1.0;
  }
}
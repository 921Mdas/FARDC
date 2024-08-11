import React,{useEffect, useState, useRef} from 'react'
import { Text, Text3D, Html } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import {useStore} from '../store/store';


// 
// Button
export const HelperButton3D = ({ fnClick, scale=0.3, text, textScale=0.8, textColor, textFont}) => {

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
      position={[-0.7,0.5,0]}
      scale={scale}
    >
  
          <Text3D
          letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json"
          >
            WAR IN CONGO
          
            <meshBasicMaterial color="white" />
          </Text3D>

    </mesh>
  );
};



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

// hoverState

export const useHoverEffect = (ref, textColor) => {
  const [hovered, setHovered] = useState(false);
  const { colors } = useStore((state) => state);
  const color = new THREE.Color();

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  useFrame(() => {
    ref.current.material.color.lerp(color.set(hovered ? colors.lightred : textColor), 0.1);
  });

  return [hovered, setHovered];
};
// Button
export const HelperButton = ({ fnClick, scale=0.3, text, textScale=0.8, textColor, textFont, position}) => {

  const [hovered, setHovered] = useState(false);
  const {colors} = useStore(state => state)
  const color = new THREE.Color()
  const ref = useRef()


  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame(() => {
    ref.current.material.color.lerp(color.set(hovered ? colors.lightred : textColor), 0.1)
  })

  return (
    <mesh
      onClick={() => {
        fnClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
      position={position}
    >
  
          <Text
            ref={ref}
            text={text}
            scale={textScale}
            font={textFont}
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
    if (name === 'congofwd' && currentNav === 1) {
      gsap.to(objectRef.current.position, { duration: 1.5, z: 1 });
    }
    if (name === 'contentrefFinalfwd' && currentNav === 3) {
      gsap.to(objectRef.current.position, { duration: 1.5, y:2 });
    }
 
    if (name === 'congofwd' && currentNav === 2) {
      gsap.to(objectRef.current.position, { duration: 1, z: -20 });
    }

    if (name === 'pistol_originalfwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -3 });
      gsap.to(objectRef.current.position, { duration: 1, y: 2.5, z:-10, x: -2 });
    }

    if (name === 'AKfwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 0 });
      gsap.to(objectRef.current.position, { duration: 1, x: 2.5,y:-1.8, z: -10 });
    }
  
    if (name === 'Riflefwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -1.5 });
      gsap.to(objectRef.current.position, { duration: 1, x: -2.9, y: -1.2, z:-8 });
    }
 
    if (name === 'pistol_clonefwd' && currentNav === 1) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 1, });
      gsap.to(objectRef.current.position, {duration:1, z:-10,x:2.5, y:0.9})
    }
    if (name === 'skullfwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: -0.6, delay:0.2 });
    }
    if (name === 'skull2fwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: -0.5, delay:0.2 });
    }
    if (name === 'skull3fwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: -0.5, delay:0.2 });
    }
    if (name === 'skullfwd' && currentNav === 3) {
       gsap.to(objectRef.current.position, { duration: 1, y: -5, delay:0.2 });
    }
    if (name === 'cemeteryfwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: -0.8, delay:0.2 });
    }
    if (name === 'cemeteryfwd' && currentNav === 3) {
       gsap.to(objectRef.current.position, { duration: 1, y: -5, delay:0.2 });
    }
    if (name === 'mapfwd' && currentNav === 1) {
       gsap.to(objectRef.current.position, { duration: 1, y: -0.6, delay:0.2 });
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
    if(name==='rosefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 5, y: -0.4 } )
      gsap.to(objectRef.current.rotation,  { duration: 5, y: Math.PI * -0.2 } )
    }
    if(name==='rosefwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 5, y: 10 } )
      gsap.to(objectRef.current.rotation,  { duration: 5, y: Math.PI * -0.2 } )
    }
    if(name==='mineralfwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0.5, z:0 } )
    }
    if(name==='mineralfwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -3, z:0 } )
    }
    if(name==='contentonefwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: -1.5, y:1.3 } )
    }
    if(name==='contentonefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, x: -10 } )
    }
    if(name==='contenttwofwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: 0.7, delay:0.5 } )
    }
    if(name==='contenttwofwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, x: 10 } )
    }
    if(name==='contentthreefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -0.5, } )
    }
    if(name==='contentthreefwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
    if(name==='contentref32fwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0 } )
    }
    if(name==='contentref32fwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
    if(name==='contentref33fwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0 } )
    }
    if(name==='contentref33fwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
   
    if(name==='contentfourfwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, x: -2, y:0.2, delay:0.7 } )
    }
    if(name==='contentfourfwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, x: 10 } )
    }
    if(name==='groupefwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
    if(name==='contentimagefwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0 } )
    }
    if(name==='staireffwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -0.2 } )
    }
    if(name==='staireffwd' && currentNav === 3){
      gsap.to(objectRef.current.position,  { duration: 1, y: -10 } )
    }
  

    // Backward animation
    if (name === 'soldierbckwd' && currentNav === 0) {
      gsap.to(objectRef.current.position, { duration: 1, y: 0 });
    }
    if (name === 'contentrefFinalbckwd' && currentNav === 2) {
      gsap.to(objectRef.current.position, { duration: 1.5, y: 10 });
    }

    if (name === 'congobckwd' && currentNav === 0) {
      gsap.to(objectRef.current.position, { duration: 1, z: -20 });
    }
    if(name==='stairefbckwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: -10 } )
    }

     if(name==='contentref33bckwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
     if(name==='contentref32bckwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 10 } )
    }
    if (name === 'pistol_originalbckwd' && currentNav === 0) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: -3 });
      gsap.to(objectRef.current.position, { duration: 1, y: -0.12, x: -0.96, z:-1 });
    }

    if (name === 'AKbckwd' && currentNav === 0) {
      gsap.to(objectRef.current.rotation, { duration: 1, y: 0 });
      gsap.to(objectRef.current.position, { duration: 1, x: 0.02,y:-0.3, z: -1.48 });
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
    if (name === 'skull2bckwd' && currentNav === 1) {
      gsap.to(objectRef.current.position, { duration: 1, y: -10, });
    }
    if (name === 'skull2bckwd' && currentNav === 3) {
      gsap.to(objectRef.current.position, { duration: 1, y: -10, });
    }
    if (name === 'skull3bckwd' && currentNav === 1) {
      gsap.to(objectRef.current.position, { duration: 1, y: -10, });
    }
    if (name === 'skull3bckwd' && currentNav === 3) {
      gsap.to(objectRef.current.position, { duration: 1, y: -10, });
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
      gsap.to(objectRef.current.position,  { duration: 1, y:  10} )

    }

    if(name==='contentFourbckwd' && currentNav === 0){
      gsap.to(objectRef.current.position,  { duration: 1, x: 10 } )
    }

     if(name==='groupebckwd' && currentNav === 1){
      gsap.to(objectRef.current.position,  { duration: 1, y: 0.5 } )
    }
     if(name==='contentimagebckwd' && currentNav === 2){
      gsap.to(objectRef.current.position,  { duration: 1, y: -10 } )
    }
    if (name === 'mapfwd' && currentNav === 0) {
       gsap.to(objectRef.current.position, { duration: 1, y: -10, delay:0.2 });
    }
    if (name === 'mapfwd' && currentNav === 2) {
       gsap.to(objectRef.current.position, { duration: 1, y: -10, delay:0.2 });
    }

  }, [animate, objectRef, name, currentNav]);
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


export const AnimatedCounter = ({ shouldAnimate, position, scale, countTo, subtext }) => {
  const contentRefThree = useRef(null);
  const countRef = useRef(0);
  const startTime = useRef(null);
  const {colors} = useStore(state => state);

  const finalCount = countTo;
  const duration = 3; // Duration in seconds

  useFrame(({ clock }) => {
    if (!shouldAnimate) {
      startTime.current = null;
      countRef.current = 0;
      if (contentRefThree.current) {
        contentRefThree.current.innerText = '0';
      }
      return;
    }

    if (!startTime.current) startTime.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startTime.current;

    if (elapsed < duration) {
      const newCount = (elapsed / duration) * finalCount;
      countRef.current = newCount;
      if (contentRefThree.current) {
        contentRefThree.current.innerText = Math.floor(newCount).toLocaleString();
      }
    } else {
      countRef.current = finalCount;
      if (contentRefThree.current) {
        contentRefThree.current.innerText = finalCount.toLocaleString();
      }
    }
  });

  return (
    <Html position={position} scale={scale}>
      <div style={{fontSize:'2rem', fontWeight:'bolder', color:colors.lightred, textTransform:'capitalize', }}>{subtext}</div>
      <div ref={contentRefThree} style={{fontSize:'3rem', fontWeight:'bolder', color:colors.lightred }}>0</div>
    </Html>
  );
};
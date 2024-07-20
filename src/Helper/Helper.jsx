import React,{useEffect, useState} from 'react'
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from '../store/store';




export function LoadModel({url, scale, position, rotation}) {
const { scene } = useGLTF(url);

useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'white',
          map: child.material.map,
          roughness: 1,
        });

        child.castShadow = true
        
      }
    });
  }, [scene]);

  return (
    <mesh castShadow>
        <primitive object={scene} scale={scale} position={position} rotation={rotation} />
    </mesh>
  )
}


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
export const ObjectAnimate = (name,objectRef, animate,nextPos,prevPos,nextRot,prevRot, duration, delay) => {
  const { isSoldierAnimated, currentNav } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
    currentNav: state.currentNav
  }));
  
 useEffect(() => {
    if (objectRef.current && animate) {
      if (name === 'soldierfwd' && currentNav === 1) {
        gsap.to(objectRef.current.position, { duration: 1, y: -3 });
      } 
      
      if (name === 'soldierbckwd' && currentNav === 0) {
        gsap.to(objectRef.current.position, { duration: 1, y: 0 });
      }
    }
  }, [animate, currentNav, objectRef, name]);

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
import React,{useEffect} from 'react'
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';


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


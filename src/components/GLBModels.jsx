// External imports
import React, { useEffect, useRef } from 'react';
import { useGLTF, Clone, Float, Text  } from '@react-three/drei';
import * as THREE from 'three';
import {RigidBody } from "@react-three/rapier";


// Internal imports
import {LoadModel, setCastShadow, setPrimitiveMaterial} from '../Helper/Helper';
// Glb models
import Rose from '../GLBs/rose.glb';
import white_rose from '../GLBs/whiterose.glb';
import skull_head from '../GLBs/realskull.glb';
import pistol_original from '../GLBs/pistol.glb';
import pistol_clone_one from '../GLBs/pistol2.glb';
import AK_47 from '../GLBs/ak47w.glb';
import rifle from '../GLBs/rifle.glb';
import white_knife from '../GLBs/whiteKnife.glb';
import bullet from '../GLBs/bullet.glb'
import fardcText from '../GLBs/FARDC.glb'
import congo_map from '../GLBs/ButemboMap.glb';
import Titi from '../GLBs/test2.glb';
import soldier_head_bust from "../GLBs/mamadou.glb";

// Rose 
export function Red_rose(props) {
  const { nodes, materials } = useGLTF(Rose);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.poly_0}
        rotation={[-0.33, -1.26, -3.60]}
        position={[0.13, -0.2, 0.24]}
      />
    </group>
  );
}

// whiterose
export const White_rose = (props)=>{
  const model = useGLTF(white_rose)
  setCastShadow(model.scene)
  return <primitive object={model.scene} scale={1} position={[0,-0.4,0.5]} rotation={[0,0,Math.PI * 0.5]} />
} 

// FARDC
export const FARDC = (_props)=>{
  const model = useGLTF(fardcText);
  const material = new THREE.MeshLambertMaterial({color:'white'})
  setCastShadow(model.scene)
  
    model.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
  return <primitive object={model.scene} scale={0.15} position={[2.3,1.7,0]} rotation={[Math.PI * 0.5,0,0]}  />

}

// Content text
export const Content = ()=>{
  const scale = 0.2
  const initPosX = 0;
  const initPosY = 0;
  const initPosZ = 4;
  const color = 'red'
return <group>
  <Text scale={scale} position={[initPosX, initPosY, initPosZ]} color={color}>
    {/* 1996 - 2024 */}
  </Text>
  <Text scale={scale} position={[initPosX, initPosY + 0.2, initPosZ]} color={color}>
    {/* + 6.0000.000 Dead */}
  </Text>
</group>


}

export const Congo_map = (props)=>{
  const model = useGLTF(Titi)
  return (
   <primitive scale={0.05} position={[-1.5,-0.5,3]} rotation={[0,0.5,-0.1]} object={model.scene} />
  )
}

export const Soldier_head_bust = (props)=>{
  const model = useGLTF(soldier_head_bust)
  setCastShadow(model.scene)
  return (
   <primitive scale={0.5} position={[0,1.1,0]} rotation={[0,Math.PI * -0.25,0]} object={model.scene} />
  )
}

// Clones of bullets
export const Bullets = () => {
  const model = useGLTF(bullet);
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 1 });
 

  const bullets = [];
  const spacing = 0.5; // Spacing between each rose on the x-axis

  for (let i = 0; i < 5; i++) {
    const x = i * spacing; // Increment x position by spacing
    

    bullets.push(
      <RigidBody colliders='hull' gravityScale={(Math.random() * 0.8) + 0.8} restitution={0.3} friction={0.3}>

        <Clone
          castShadow
          key={i}
          object={model.scene}
          scale={0.05}
          position={[Math.random() * -2, (Math.random() * 10) + 5, 0]} // Use calculated x and y positions, z is fixed at 0
          rotation={[0, 0, 0]} // Apply rotation on the z-axis
          material={whiteMaterial} // Assign the white material to each clone
        />

      </RigidBody>
    );
  }

  return <>{bullets}</>;
};


// Guns 
export const Guns = ({ props }) => {
  const pistol_originalet = useGLTF(pistol_original);
  const pistol_originalet2 = useGLTF(pistol_clone_one);
  const AK_4747 = useGLTF(AK_47);
  const Rifle = useGLTF(rifle);
  const knife = useGLTF(white_knife)

  useEffect(() => {
    setCastShadow(pistol_originalet.scene);
    setCastShadow(pistol_originalet2.scene);
    setCastShadow(AK_4747.scene);
    setCastShadow(Rifle.scene);
    setCastShadow(knife.scene);


  }, [pistol_originalet, pistol_originalet2, AK_4747, Rifle,knife]);

  return (
    <group castShadow>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive  position={[-0.66, -0.12, -1.2]} rotation={[-0.3, -1.63, -0.34]} object={pistol_originalet.scene} scale={0.2} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive position={[0.49, 0.75, -1.85]} rotation={[0, 1.60, 0]} object={pistol_originalet2.scene} scale={0.2} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive position={[0.02, 0.01, -1.48]} rotation={[0.00, 0.00, -0.02]} object={AK_4747.scene} scale={1} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive position={[-1.42, -0.35, -2.26]} rotation={[0, -1.58, -0.01]} object={Rifle.scene} scale={20} {...props} />
      </Float>
      <primitive object={knife.scene} scale={0.5} rotation={[0,0,0.9]} position={[0.6,0,2]} />
    </group>
  );
};

// Skull 
export const Skull = (props) => {
  const skullRef = useRef();


  return (
    <group ref={skullRef} {...props} dispose={null} receiveShadow>
              <LoadModel url={skull_head} scale={0.5} position={[0, 0, 0.48]} rotation={[-0.25, Math.PI * -0.25, 0]} />
            </group>
  );
};

// Preload GLTF models
 [
  Rose,
  white_rose,
  skull_head,
  pistol_original,
  pistol_clone_one,
  AK_47,
  rifle,
  white_knife,
  bullet,
  fardcText,
  congo_map,
  Titi,
  soldier_head_bust
].forEach((mesh) => {
  useGLTF.preload(mesh);
});

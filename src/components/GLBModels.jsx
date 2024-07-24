// External imports
import React, { useEffect, useRef } from 'react';
import { useGLTF, Clone, Float, Text  } from '@react-three/drei';
import * as THREE from 'three';
import {RigidBody } from "@react-three/rapier";
import { gsap } from 'gsap';
import { Image } from '@react-three/drei';




// Internal imports
import {LoadModel, setCastShadow, ObjectAnimate, getExtremeRandom} from '../Helper/Helper';
import LinkHelper from '../Helper/Link';
import {useStore} from '../store/store';
import ParagraphHelper from '../Helper/Paragraph';
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";
import imagemap from '../assets/Images/map.png'
import img01 from '../assets/Images/war01.jpg'
import img02 from '../assets/Images/war02.jpeg'
import img03 from '../assets/Images/war03.jpg'
import img04 from '../assets/Images/bodies.webp'
import img05 from '../assets/Images/refugees.jpg'

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
import congo_map from '../GLBs/ButemboMap.glb';
import Titi from '../GLBs/test2.glb';
import soldier_head_bust from "../GLBs/mamadou.glb";
import Skull_head from '../GLBs/realskull.glb'
import Hand from '../GLBs/hand2.glb';
import Minerals from '../GLBs/minerals.glb';
import MineralText from '../GLBs/mineraltext.glb';
import Cemetery from '../GLBs/Cemetery.glb';

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
  const roseref = useRef()
  ObjectAnimate('rosefwd',roseref);
  ObjectAnimate('rosebckwd',roseref);
  setCastShadow(model.scene)
  return <primitive object={model.scene} ref={roseref} scale={1} position={[0,-0.4,0.5]} rotation={[0,0,Math.PI * 0.5]} />
} 

// FARDC
export const FARDC = (_props)=>{
  const material = new THREE.MeshBasicMaterial({color:'white'})
  const toref = useRef()
  const fardcref = useRef()
  const dateref = useRef()
  const contentrefone = useRef()
  const contentreftwo = useRef()
  const contentrefthree = useRef()
  const contentimageref = useRef()

  const { isSoldierAnimated, currentNav } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
    currentNav:state.currentNav
  }));

  ObjectAnimate('to_headline',toref, isSoldierAnimated);
  ObjectAnimate('fardc_headline',fardcref, isSoldierAnimated);
  ObjectAnimate('date_headline',dateref, isSoldierAnimated);
  ObjectAnimate('contentonefwd',contentrefone, isSoldierAnimated);
  ObjectAnimate('contenttwofwd',contentreftwo, isSoldierAnimated);
  ObjectAnimate('contentonebckwd',contentrefone, isSoldierAnimated);
  ObjectAnimate('contenttwobckwd',contentreftwo, isSoldierAnimated);
  ObjectAnimate('contentthreefwd',contentrefthree, isSoldierAnimated);
  ObjectAnimate('contentthreebckwd',contentrefthree, isSoldierAnimated);
  ObjectAnimate('contentimagefwd',contentimageref, isSoldierAnimated);
  ObjectAnimate('contentimagebckwd',contentimageref, isSoldierAnimated);

  
  return <>
  <ParagraphHelper ref={toref} scale={0.3} text={`TO`} position={[0.45,1.8,-0.1]} color='darkred' font={RobotoCondensedBold} />
  <ParagraphHelper ref={fardcref} scale={0.3} text={`F.A.R.D.C\nHEROES`} position={[-1.53,0.3,-0.1]} color='darkred' font={RobotoCondensedBold} />
  <ParagraphHelper ref={dateref} font={RobotoCondensedBold} scale={0.07} position={[0.3,-0.22,3]} text={`FIGHTING SINCE 1993`}  color='darkred' />
  <ParagraphHelper  textAlign={'right'} ref={contentrefone} font={RobotoCondensedBold}  scale={0.07} lineHeight={1.5} position={[-10,1.4,3]} rotation={[0,0,0]} text={`The DR Congo's decades-long conflict,\ndriven by control over\nits vast mineral wealth.`}  color='darkred' />

     <group ref={contentreftwo} position={[10,0,0]} >
      <ParagraphHelper scale={0.07} font={RobotoCondensedBold} lineHeight={1.5} textAlign={'left'}  position={[0.8,0.35,3]} rotation={[0,0,0]} text={`Multinationals sponsorship to rebels\nto exploit for cheap minerals\ncaused misery and death for locals.` }  color='darkred' />
    </group>
    <group ref={contentimageref} position={[0,-10,0]}>
    <Image position={[0.5, 1.3, 0]} rotation={[0,0,0]} scale={1.5} url={imagemap} />
      <Float floatIntensity={Math.random()* 0.5} floatingRange={[0,0.2]} rotationIntensity={0.3}>
      <Image position={[-0.4, 0.5, 0.5]} rotation={[0,0,0]} scale={[0.8,0.8,0.8]} url={img01} />
      </Float>
      <Float floatIntensity={Math.random()* 0.5} floatingRange={[0,0.2]} rotationIntensity={0.3}>
        <Image position={[0.4, 0, 0.6]} rotation={[0,-0.5,0]} scale={1} url={img02} />
      </Float>
      <Float floatIntensity={Math.random()* 0.5} floatingRange={[0,0.2]} rotationIntensity={0.3}>
        <Image position={[-0.8, 1.4, 0]} rotation={[0,0.5,0]} scale={1} url={img03} />
      </Float>
      <Float floatIntensity={Math.random()* 0.5} floatingRange={[0,0.2]} rotationIntensity={0.3}>
        <Image position={[-1.2, 0.3, 0]} rotation={[0,0.5,0]} scale={0.8} url={img04} />
      </Float>
      <Float floatIntensity={Math.random()* 0.5} floatingRange={[0,0.2]} rotationIntensity={0.3}>
       <Image position={[1.5, 1, 0]} rotation={[0,0.5,0]} scale={1} url={img05} />
       </Float>
      {/* <LinkHelper
        scale={0.06}
        lineHeight={1.5}
        anchorX={-10}
        anchorY={2.5}
        position={[-0.15,0,2]}
        text={`Learn more`}
        color="darkred"
        rotation={[0,0,0]}
        material={material}
        font={RobotoCondensedBold}
        fnClick={() => window.open("https://x.com/DeoGrat82092763", "_blank")}
      /> */}
    </group>
  
   

  <ParagraphHelper ref={contentrefthree}  textAlign={'center'} font={RobotoCondensedBold}  scale={0.2} lineHeight={1.5} position={[-0.8,6,0]} rotation={[0,0,0]} text={`6 "MILLION DEAD"...`}  color='darkred' />
     
  
  </>
  

}


export const Congo_map = (props)=>{
  const model = useGLTF(Titi)
  return (
   <primitive scale={0.05} position={[-1.5,-0.5,3]} rotation={[0,0.5,-0.1]} object={model.scene} />
  )
}


export const MineralScene = (props)=>{
  const hand = useGLTF(Hand);
  const minerals = useGLTF(Minerals);
  const mineraltext = useGLTF(MineralText);
  const mineralref = useRef()
  
  ObjectAnimate('mineralfwd',mineralref);
  ObjectAnimate('mineralbckwd',mineralref);

  setCastShadow(hand.scene)
  setCastShadow(minerals.scene)
  setCastShadow(mineraltext.scene)

    mineraltext.scene.traverse(
      (child)=>{
          if(child.isMesh){
            child.material = new THREE.MeshStandardMaterial({color:'white', roughness:0})
          }
      }
    )


  return <group ref={mineralref} position={[0,-10,-60]}>
   <primitive   object={hand.scene} rotation={[0,5.35,0]} />
   <primitive   object={minerals.scene} scale={0.6} rotation={[0,5.35,0]} />
   <primitive   object={mineraltext.scene}  position={[0,0.1,0.6]} scale={0.5} rotation={[0,5.35,0]} />

  </group>

}

export const Soldier_head_bust = (props)=>{
  
  const model = useGLTF(soldier_head_bust);
  const objectRef = useRef();
  const { isSoldierAnimated } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
  }));
  

  ObjectAnimate('soldierfwd',objectRef, isSoldierAnimated);
  ObjectAnimate('soldierbckwd',objectRef, isSoldierAnimated);
 

  useEffect(() => {
    setCastShadow(model.scene);
  }, [model.scene]);


  return (<group>
  <mesh ref={objectRef}>
     <primitive scale={0.5} position={[0,1.6,0]} rotation={[0,Math.PI * -0.25,0]} object={model.scene} />
  </mesh>  
  </group>
  )
}

// Clones of bullets
export const Bullets = () => {
  const model = useGLTF(bullet);
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'red', roughness: 0, metalness: 1 });
 

  const bullets = [];
  const spacing = 0.5; // Spacing between each rose on the x-axis


  for (let i = 0; i < 6; i++) {
    const x = i * spacing; // Increment x position by spacing
    

    bullets.push(
      <RigidBody colliders='hull' gravityScale={(Math.random() * 0.8) + 0.8} restitution={0.3} friction={0.3}>

        <Clone
          castShadow
          key={i}
          object={model.scene}
          scale={0.05}
          position={[getExtremeRandom(0.5, 1.5),getExtremeRandom(0.5, 0.3), getExtremeRandom(0.5,0.5)]} // Use calculated x and y positions, z is fixed at 0
          rotation={[0, Math.PI * -0.5, 0]} // Apply rotation on the z-axis
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

const { isSoldierAnimated } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
  }));
  const objectRefOne = useRef()
  const objectRefTwo = useRef()
  const objectRefThree = useRef()
  const objectRefFour = useRef()
  const objectRefFive = useRef()
  const groupeRef = useRef()

  useEffect(() => {
    setCastShadow(pistol_originalet.scene);
    setCastShadow(pistol_originalet2.scene);
    setCastShadow(AK_4747.scene);
    setCastShadow(Rifle.scene);
    setCastShadow(knife.scene);


  }, [pistol_originalet, pistol_originalet2, AK_4747, Rifle,knife]);

  ObjectAnimate('pistol_originalfwd',objectRefOne, isSoldierAnimated);
  ObjectAnimate('AKfwd',objectRefTwo, isSoldierAnimated);
  ObjectAnimate('Riflefwd',objectRefThree, isSoldierAnimated);
  ObjectAnimate('pistol_clonefwd',objectRefFour, isSoldierAnimated);
  ObjectAnimate('pistol_originalbckwd',objectRefOne, isSoldierAnimated);
  ObjectAnimate('AKbckwd',objectRefTwo, isSoldierAnimated);
  ObjectAnimate('Riflebckwd',objectRefThree, isSoldierAnimated);
  ObjectAnimate('pistol_clonebckwd',objectRefFour, isSoldierAnimated);
  ObjectAnimate('knifefwd',objectRefFive, isSoldierAnimated);
  ObjectAnimate('knifebckwd',objectRefFive, isSoldierAnimated);
  ObjectAnimate('groupefwd',groupeRef, isSoldierAnimated);
  ObjectAnimate('groupebckwd',groupeRef, isSoldierAnimated);


  return (
    <group  castShadow position={[0,1,0,]}>
      <group ref={groupeRef} position={[0,0,0]}>

      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive ref={objectRefOne}   position={[-0.96, -0.12, -1.2]} rotation={[0, -3, 0]} object={pistol_originalet.scene} scale={0.006} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive ref={objectRefTwo}  position={[0.02, 0.01, -1.48]} rotation={[0.00, 0.00, -0.02]} object={AK_4747.scene} scale={1} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive  ref={objectRefThree}  position={[-1.42, -0.35, -2.26]} rotation={[0, -1.58, -0.01]} object={Rifle.scene} scale={20} {...props} />
      </Float>
       <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive ref={objectRefFour} position={[0.49, 0.75, -1.85]} rotation={[0, 1.60, 0]} object={pistol_originalet2.scene} scale={0.2} {...props} />
      </Float>

      </group>
      <primitive ref={objectRefFive} object={knife.scene} scale={0.5} rotation={[0,0,0.9]} position={[0.1,-0.5,2]} />
    </group>
  );
};

// Skull 
export const Skull = (props) => {
  const skullRef = useRef();
  const cemeteryRef = useRef();
  const { scene } = useGLTF(Skull_head);
  const cemetery = useGLTF(Cemetery)


  ObjectAnimate('skullfwd',skullRef);
  ObjectAnimate('skullbckwd',skullRef);
  ObjectAnimate('cemeteryfwd',cemeteryRef);
  ObjectAnimate('cemeterybckwd',cemeteryRef);


  return (
     <mesh castShadow receiveShadow >
        <primitive ref={skullRef} {...props} object={scene} scale={0.5} position={[0, -3, -0.48]} rotation={[-0.25, Math.PI * -0.25, 0]} />
        <primitive ref={cemeteryRef} object={cemetery.scene} rotation={[0,Math.PI * -0.5,0]} position={[0,-5,0]} />
    </mesh>
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
  congo_map,
  Titi,
  soldier_head_bust
].forEach((mesh) => {
  useGLTF.preload(mesh);
});

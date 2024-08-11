// External imports
import React, {useState} from 'react';
import { Canvas } from '@react-three/fiber';
import {  Center, OrbitControls, PerformanceMonitor} from '@react-three/drei';
import * as THREE from 'three';
import { Leva } from 'leva';
import { Physics, RigidBody } from "@react-three/rapier";


// Internal imports (models and objects)
import  Light  from './components/Light';
import {VideoScene, MAPCONGO ,Guns, Bullets, Stairs, Soldier_head_bust, White_rose, Skull,Congo_map, FARDC, MineralScene
 } from './components/GLBModels';
import Pager from './Helper/Pager';
import CameraIntroMovement from './components/CameraIntroMove';
import { useStore } from './store/store';
import { TexturedPlane } from './components/Objects';
import UI from './components/UI';
// fonts
import RobotoCondensedBold from "./assets/fonts/RbtcBold.ttf";




// Main Component
export const THREEJSCENE = () => {


  const [hoverStates, setHoverStates] = useState({
    exit: false,
    next: false,
    prev: false
  });


  const {setShowLoadingPage, perfSucks, deprecate} = useStore((state)=>({
    setShowLoadingPage: state.setShowLoadingPage,
    perfSucks: state.perfSucks,
    deprecate: state.deprecate
  }))
  const handleHoverChange = (key, value) => {
    setHoverStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
    }}>
      <Canvas
        performance={{ min: 0.1 }}
        camera={{
          position: [0, 2, 8],
          fov: 25,
        }}
        shadows
        dpr={[1, perfSucks ? 1.5 : 2]}
        gl={{
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
          antialias: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#cbcacb');
          gl.setClearAlpha(1);
          gl.gasoldier_head_bustaOutput = true;
        }}
      > 
      
                <fog attach="fog" args={["white", 0, 40]} />
                <CameraIntroMovement /> 
                <Light />
                <Pager />
                <PerformanceMonitor onDecline={() => deprecate(true)} />
                <UI SetShowLoadingPage={setShowLoadingPage} font={RobotoCondensedBold} 
                hoverStates={hoverStates}
                handleHoverChange={handleHoverChange}
                />
               

                <Physics gravity={[0, 0, 0.5]} >
                      <group position={[0, -1, 0]}>
                            <Center top center>
                              <RigidBody type='fixed' >
                                  <Soldier_head_bust />
                              </RigidBody>
                                  <Guns />
                            </Center>
                      </group>
                      <RigidBody colliders='cuboid' type='fixed' >
                           <TexturedPlane />
                      </RigidBody>
                      <group position={[0,0,-5]}>
                       <Bullets />
                      </group>
                    
                       <Skull />
                       <White_rose />
                       <MAPCONGO position={[-1.2,0.2,-20]} scale={0.6} />
                </Physics>

                 <FARDC/>
                 <Stairs />
                 <VideoScene />         
    
      </Canvas>
    </div>
  );
};

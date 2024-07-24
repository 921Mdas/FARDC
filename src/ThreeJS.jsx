// External imports
import React, {useState, Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Text3D, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Leva } from 'leva';
import { Physics, RigidBody } from "@react-three/rapier";


// Internal imports (models and objects)
import { Light } from './components/Light';
import { Red_rose,Guns, Bullets, Soldier_head_bust, White_rose, Skull, FARDC, MineralScene
 } from './components/GLBModels';
import Pager from './Helper/Pager';
import CameraIntroMovement from './components/CameraIntroMove';
import { useStore } from './store/store';
import ParagraphHelper from './Helper/Paragraph';
import Parallax from './components/Parallax';
import { TexturedPlane } from './components/Objects';
import UI from './components/UI';
import WelcomePage from './components/Welcome';
// fonts
import RobotoCondensedBold from "./assets/fonts/RbtcBold.ttf";
// Textures


// Main Component
export const THREEJSCENE = () => {

  const {start, playing} = useStore(state => state);
  const [showLoadingPage, SetShowLoadingPage] = useState(true);

  const [hoverStates, setHoverStates] = useState({
    exit: false,
    next: false,
    prev: false
  });

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
        camera={{
          position: [0, 2, 8],
          fov: 25,
        }}
        shadows
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
        {showLoadingPage 
        
        ? 
         <Suspense fallback={null}>
             <WelcomePage SetShowLoadingPage={SetShowLoadingPage} />
            <Leva hidden={true} />
         </Suspense>
          
        :
          <> 
          
                <fog attach="fog" args={["white", 0, 40]} />
                <Light />
                <CameraIntroMovement /> 

                <UI SetShowLoadingPage={SetShowLoadingPage} font={RobotoCondensedBold} 
                hoverStates={hoverStates}
                handleHoverChange={handleHoverChange}
                />
                <Pager />
                <mesh position={[2, 1.79, 0]} onClick={start}>
                  <Text font={RobotoCondensedBold} position={[0, 0, 0.6]} fontSize={0.08} color={playing ? "darkgreen" : "darkred"}>
                    {playing ? 'SOUND ON' : 'SOUND OFF'}
                  </Text>
                </mesh>

                <Physics gravity={[0, 0, 0.5]} >
                      <group position={[0, -1, 0]}>
                            <Center top center>
                              <RigidBody type='fixed' >
                                  <Soldier_head_bust />
                              </RigidBody>
                                  <Guns />
                            </Center>
                      </group>
                    
                        <Skull />
                      <RigidBody colliders='cuboid' type='fixed' >
                           <TexturedPlane />
                      </RigidBody>
                      <group position={[0,0,-5]}>
                       <Bullets />
                      </group>
                       <White_rose />
                       <MineralScene />
                </Physics>



               <FARDC/>
               



                <Leva hidden />
          </>
      
         }        
      </Canvas>
    </div>
  );
};

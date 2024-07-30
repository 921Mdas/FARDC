
// External imports 
import React, { useState, useEffect } from "react";
import { Materials } from "./Materials";
import { Text, Html, useGLTF, OrbitControls } from "@react-three/drei";

// internal imports
import Contact from "./Contact";
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";
import { HelperButton,HelperButton3D } from "../Helper/Helper";
import { faInstagram, faGithub, faXTwitter,} from '@fortawesome/free-brands-svg-icons';
// import FontAwesomeIcon
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useStore } from "../store/store";
import Congo from '../GLBs/congo.glb';
import Parallax from './Parallax';



const Logo = (props)=>{
  const {colors} = useStore(state => state)
  const style = {
    color:colors.white,
    fontWeight:'bolder'
  }
return  <group {...props}>
        <Html scale={0.1} position={[-3,1.6,0]}   font={RobotoCondensedBold}>
          <div style={style}>
          RODEO
          </div>
        </Html>
        <Html scale={0.1} position={[-2.9,1.5,0]}  font={RobotoCondensedBold}>
           <div style={style}>
          MADS
           </div>
        </Html>
        <Html scale={0.08} position={[-2.8,1.4,0]}>
           <div style={style} >
             2024
           </div>
        </Html>
      </group>
}

const Content = (props)=>{
  const model = useGLTF(Congo);

  return <primitive {...props} object={model.scene} />
}

const WelcomePage = ({ SetShowLoadingPage }) => {

  const {colors} = useStore(state => state)


  return (<Canvas
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
          gl.setClearColor(colors.darkred);
          gl.setClearAlpha(1);
          gl.gasoldier_head_bustaOutput = true;
        }}
      >
              <group>
                <Parallax />
                <Logo position={[3,-3,0]} />
                <Content scale={0.5} position={[-1,-0.5,0]} />
                <Contact position={[0, -1.2, 0]} />
                <group position={[0,-0.5,0]}>
                <HelperButton fnClick={() => {
                    SetShowLoadingPage(false);
                  }}
                  position={[-0.5,0.88,0]}
                  textFont={RobotoCondensedBold}
                  text={'DISCOVER'}
                  textColor={colors.white}
                  />

                <HelperButton fnClick={() => {
                    SetShowLoadingPage(false);
                  }}
                  position={[0,0.68,0.5]}
                  textFont={RobotoCondensedBold}
                  text={'CONGO\'S'}
                  textColor={colors.darkred}
                  />
                <HelperButton fnClick={() => {
                    SetShowLoadingPage(false);
                  }}
                  position={[0.5,0.5,0]}
                  textFont={RobotoCondensedBold}
                  text={'HIDDEN'}
                  textColor={colors.white}
                  />
                <HelperButton fnClick={() => {
                    SetShowLoadingPage(false);
                  }}
                  position={[0,0.37,0.5]}
                  textFont={RobotoCondensedBold}
                  text={'WAR'}
                  textColor={colors.darkred}
                  />
                <HelperButton fnClick={() => {
                    SetShowLoadingPage(false);
                  }}
                  position={[0.2,0.12,0]}
                  textFont={RobotoCondensedBold}
                  text={'🔍'}
                  textColor={colors.darkred}
                  />
                </group>
              
              </group>
    </Canvas>
  );
};

export default WelcomePage;

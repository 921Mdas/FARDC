import React, { useState, useEffect } from "react";

// three
import { DoubleSide, MeshBasicMaterial, MeshStandardMaterial } from "three";
import TextureShape from "../Helper/TextureShape";
import { Decal, OrbitControls, Text } from "@react-three/drei";

// internal imports
import LandingContact from "./LandingContact";
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";

export const BubbleButton = ({ fnClick }) => {

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
      scale={0.3}
    >
  
          <Text
            text={"Enter"}
            scale={0.8}
            font={RobotoCondensedBold}
            color={"Black"}
            fnClick={function () {
              throw new Error("Function not implemented.");
            }}
          />

    </mesh>
  );
};


const WelcomePage = ({ SetShowLoadingPage }) => {
  return (
    <group>
        <group position={[2.8, 0, 0]}>
        <Text scale={0.1} color={'black'} anchorX={30} anchorY={-16}   font={RobotoCondensedBold}>
          {"RODEO"}
        </Text>
        <Text scale={0.1} color={'black'} anchorX={29} anchorY={-15}  font={RobotoCondensedBold}>
          {"MADS"}
        </Text>
        <Text scale={0.08} color={'black'} anchorX={34.5} anchorY={-18}>
          {"2024"}
        </Text>
      </group>
      <BubbleButton
        fnClick={() => {
          SetShowLoadingPage(false);
        }}
      />

      <LandingContact
        material={new MeshBasicMaterial({color:'black'})}
        font={RobotoCondensedBold}
      />
    </group>
  );
};

export default WelcomePage;

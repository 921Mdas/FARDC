
// External imports 
import React, { useState, useEffect } from "react";
import { Materials } from "./Materials";
import { Text } from "@react-three/drei";

// internal imports
import Contact from "./Contact";
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";
import { HelperButton } from "../Helper/Helper";


// Enter button
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

  const meshMaterial = new Materials()

  return (
    <group>
        <group position={[0, 0, 0]}>
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
      <HelperButton fnClick={() => {
          SetShowLoadingPage(false);
        }} text="6 MILLION DEAD 🔎" textFont={RobotoCondensedBold}  textColor={'darkred'} />
     
      <Contact
        material={meshMaterial.basic({color:'black'})}
        font={RobotoCondensedBold}
      />
    </group>
  );
};

export default WelcomePage;

// External imports
import React from "react";
import { MeshBasicMaterial, MeshToonMaterial } from "three";

// Internal imports
import ParagraphHelper from "../Helper/Paragraph";
import LinkHelper from "../Helper/Link";
import { Text } from "@react-three/drei";
import { Float } from "@react-three/drei";

const LandingContact = ({ material, font }) => {

  return (
    <group position={[-2.8, 0.3, 0]} scale={1.2}>


      {/* LinkedIn Link */}
      <LinkHelper
        scale={0.06}
        lineHeight={1.5}
        anchorX={-33}
        anchorY={17}
        material={material}
        text={`X /`}
        color="black"
        font={font}
        fnClick={() => window.open("https://x.com/DeoGrat82092763", "_blank")}
      />
      
      {/* GitHub Link */}
      <LinkHelper
        scale={0.06}
        lineHeight={1.5}
        anchorX={-35}
        anchorY={17}
        font={font}
        color="black"
        text={`GITHUB /`}
        material={material}
        fnClick={() => window.open("https://github.com/921Mdas", "_blank")}
      />
      
      {/* Instagram Link */}
      <LinkHelper
        scale={0.06}
        lineHeight={1.5}
        anchorX={-40}
        anchorY={17}
        font={font}
        color="black"
        material={material}
        text={`INSTAGRAM`}
        fnClick={() => window.open("https://www.instagram.com/madszee009/", "_blank")}
      />
    </group>
  );
};

export default LandingContact;

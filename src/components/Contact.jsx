// External imports
import React from "react";


// Internal imports
import LinkHelper from "../Helper/Link";

const Contact = ({ material, font }) => {

  return (
    <group position={[-3.1, 0.4, 0]} scale={1.3}>


      {/* LinkedIn Link */}
      <LinkHelper
        scale={0.06}
        lineHeight={1.5}
        anchorX={-33}
        anchorY={17}
        material={material}
        text={`X `}
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
        text={`GITHUB`}
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

export default Contact;

// External imports
import React from "react";
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";
import { Html } from "@react-three/drei";
import { HelperButton, HelperButton3D } from "../Helper/Helper";
import { faInstagram, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useStore } from "../store/store";
// import FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const Contact = (props) => {
  const {colors} = useStore(state => state)

  return (
    <group {...props}>
      <Html>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem',  }}>
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" color={colors.white} />
          </a>
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" color={colors.white} />
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} size="2x" color={colors.white} />
          </a>
        </div>
      </Html>
    </group>
  );
};

export default Contact;

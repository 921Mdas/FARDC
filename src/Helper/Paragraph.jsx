import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Vector3, Euler } from "three";

// generate paragraphs and text
const ParagraphHelper = ({
  text = "Hello",
  scale = 0.5,
  lineHeight = 1,
  anchorX = 0,
  anchorY = 0,
  position = new Vector3(0, 0, 0),
  rotation = new Euler(0, 0, 0),
  font = "",
  fnClick,
  material,
}) => {
  const textRef = useRef();



  return (
    <Text
      scale={scale}
      lineHeight={lineHeight}
      anchorX={anchorX}
      anchorY={anchorY}
      position={position}
      font={font}
      onClick={fnClick}
      ref={textRef}
      material={material}
      rotation={rotation}
    >
      {text}
    </Text>
  );
};

export default ParagraphHelper;

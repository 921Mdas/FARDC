import React, { forwardRef, useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Vector3, Euler } from "three";

// generate paragraphs and text
const ParagraphHelper =forwardRef(({
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
  color='red',
  textAlign = 'left',
}, ref) => {



  return (
    <Text
      scale={scale}
      lineHeight={lineHeight}
      anchorX={anchorX}
      anchorY={anchorY}
      position={position}
      font={font}
      onClick={fnClick}
      material={material}
      rotation={rotation}
      color={color}
      ref={ref}
       textAlign = {textAlign}
      
    >
      {text}
    </Text>
  );
});

export default ParagraphHelper;

import React, { forwardRef} from "react";
import { Text } from "@react-three/drei";
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
    <group>

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
      characters="abcdefghijklmnopqrstuvwxyz0123456789!"
      ref={ref}
       textAlign = {textAlign}
       stroke={0.1}
       strokeColor={"#ff0000"}
       strokeOpacity={1} 
       thickness={0.05}


      
    >
      {text}
    </Text>

    </group>
  );
});

export default ParagraphHelper;

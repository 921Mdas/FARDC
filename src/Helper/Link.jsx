import React, { useEffect, useState, useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";
import { Euler } from "three";

// Default properties for the LinkHelper component
const defaultProps = {
  text: "Hello",
  color: "grey",
  scale: 0.5,
  lineHeight: 1,
  anchorX: 0,
  anchorY: 0,
  position: new Vector3(0, 0, 0),
  rotation: new Euler(0,0,0),
  font: "",
  material: new THREE.MeshStandardMaterial({ color: "white" }),
};

const LinkHelper = ({
  text = defaultProps.text,
  color = defaultProps.color,
  scale = defaultProps.scale,
  lineHeight = defaultProps.lineHeight,
  anchorX = defaultProps.anchorX,
  anchorY = defaultProps.anchorY,
  position = defaultProps.position,
  rotation = defaultProps.rotation,
  font = defaultProps.font,
  fnOver,
  fnOut,
  fnClick,
  material = THREE.MeshBasicMaterial({color:'black'}),
}) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Handle cursor change on hover
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <Text
      ref={ref}
      color={color}
      scale={scale}
      lineHeight={lineHeight}
      anchorX={anchorX}
      anchorY={anchorY}
      material={material}
      position={position}
      rotation={rotation}
      font={font}
      onPointerOver={() => {
        setHovered(true);
        if (fnOver) fnOver();
      }}
      onPointerOut={() => {
        setHovered(false);
        if (fnOut) fnOut();
      }}
      onClick={fnClick}
    >
      {text}
    </Text>
  );
};

export default LinkHelper;

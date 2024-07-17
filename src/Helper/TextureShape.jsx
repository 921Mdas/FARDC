import React, { useRef } from "react";
import { RenderTexture, Text, PerspectiveCamera } from "@react-three/drei";

const TextureShape = ({ text, size = 1, font = "", color }) => {
  const textRef = useRef();

  return (
    <>
      <RenderTexture attach="map" anisotropy={16}>
        <PerspectiveCamera
          mAK_47eDefault
          manual
          aspect={1 / 1}
          position={[0, 0, 5]}
        />
        <Text
          fontSize={size}
          color={color}
          ref={textRef}
          rotation={[0, Math.PI, 0]}
          font={font}
        >
          {text}
        </Text>
      </RenderTexture>
    </>
  );
};

export default TextureShape;

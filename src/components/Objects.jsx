// External imports
import React from 'react';
import { MeshLambertMaterial } from 'three';
import spotLightTexture from '../assets/Textures/alpha.jpg';
import { useTexture } from '@react-three/drei';


// Box component that represents a mesh with a given material, size, position, and rotation
const Box = ({ material, size, pos = [0, 0, 0], rot = [0, 0, 0] }) => {
  return (
    <mesh material={material} position={pos} rotation={rot} receiveShadow>
      <boxGeometry args={size} />
    </mesh>
  );
};

// PlaneFoundation component that represents the foundation plane with various textures
const PlaneFoundation = ({_textures, _opacity = 0.7, alphatexture }) => {

  // Create a material with given textures and properties
  const material = new MeshLambertMaterial({
    alphaMap: alphatexture,
    transparent: true,
    opacity: 1
  });

  return (
    <Box
      material={material}
      size={[20,1,20]}
      pos={[0, -0.9, 0]}
      rot={[0, 0, 0]}
    />
  );
};

// Textured Plane Component
const TexturedPlane = () => {
  // Load spotlight texture
  const texturePlane = useTexture(spotLightTexture);
  // Return PlaneFoundation with loaded textures
  return <PlaneFoundation alphatexture={texturePlane} />;
};

export { PlaneFoundation, TexturedPlane };

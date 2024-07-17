// External imports
import React, { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Euler, MathUtils } from "three";

const CameraIntroMovement = () => {
  const { camera } = useThree();

  // Initial and final camera positions and rotations
  const initialCameraPosition = new Vector3(0, 2.5, 20); // Initial camera position
  const initialCameraRotation = new Euler(10, 0, 0); // Initial camera rotation

  const finalCameraPosition = new Vector3(0, 1, 8); // Final camera position
  const finalCameraRotation = new Euler(0, 0, 0); // Final camera rotation

  // Smoothed camera position and rotation
  const [smoothedCameraPosition] = useState(() => initialCameraPosition.clone());
  const [smoothedCameraRotation] = useState(() => initialCameraRotation.clone());

  useFrame((_state, delta) => {
    // Interpolate the camera position
    smoothedCameraPosition.lerp(finalCameraPosition, 3.5 * delta); // Adjust the interpolation speed with the factor (3.5 here)

    // Interpolate the camera rotation
    smoothedCameraRotation.x = MathUtils.lerp(smoothedCameraRotation.x, finalCameraRotation.x, 3.5 * delta);
    smoothedCameraRotation.y = MathUtils.lerp(smoothedCameraRotation.y, finalCameraRotation.y, 3.5 * delta);
    smoothedCameraRotation.z = MathUtils.lerp(smoothedCameraRotation.z, finalCameraRotation.z, 3.5 * delta);

    // Update the camera's position and rotation
    camera.position.copy(smoothedCameraPosition);
    camera.rotation.copy(smoothedCameraRotation);
  });

  return null; // No need to render anything
};

export default CameraIntroMovement;

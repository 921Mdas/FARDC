import React, { useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3, Quaternion } from "three";

const CameraAnimate = ({ finalPosition, finalRotation, duration = 1 }) => {
  const { camera } = useThree();
  const startTime = useRef(Date.now());

  const [initialPosition] = useState(() => camera.position.clone());
  const [initialRotation] = useState(() => camera.quaternion.clone());

  const [smoothedCameraPosition] = useState(() => initialPosition.clone());
  const [smoothedCameraRotation] = useState(() => initialRotation.clone());

  const finalQuaternion = new Quaternion().setFromEuler(finalRotation);

  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000; // Elapsed time in seconds
    const progress = Math.min(elapsed / duration, 1); // Clamp progress between 0 and 1

    // Interpolate the camera position
    smoothedCameraPosition.lerp(finalPosition, progress);

    // Interpolate the camera rotation using quaternion
    smoothedCameraRotation.slerp(finalQuaternion, progress);

    // Update the camera's position and rotation
    camera.position.copy(smoothedCameraPosition);
    camera.quaternion.copy(smoothedCameraRotation);

    // Stop animation when reaching the end
    if (progress === 1) {
      startTime.current = Date.now(); // Reset start time for next animation
    }
  });

  return null; // No need to render anything
};

export default CameraAnimate;

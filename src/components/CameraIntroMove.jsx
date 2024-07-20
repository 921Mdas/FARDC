import React, { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Euler, MathUtils } from "three";
import useStore from "../store/store";

const CameraIntroMovement = () => {
  const { camera } = useThree();
  const { camInitPos, camFinalPos, camInitRot, camFinalRot } = useStore((state) => ({
    camInitPos: state.camInitPos,
    camFinalPos: state.camFinalPos,
    camInitRot: state.camInitRot,
    camFinalRot: state.camFinalRot,
  }));

  // Smoothed camera position and rotation
  const [smoothedCameraPosition, setSmoothedCameraPosition] = useState(camInitPos.clone());
  const [smoothedCameraRotation, setSmoothedCameraRotation] = useState(camInitRot.clone());

  // Update smoothed camera position and rotation when Zustand state changes
  useEffect(() => {
    setSmoothedCameraPosition(camInitPos.clone());
    setSmoothedCameraRotation(camInitRot.clone());
  }, [camInitPos, camInitRot, camFinalPos, camFinalRot]);

  useFrame((_state, delta) => {
    // Interpolate the camera position
    smoothedCameraPosition.lerp(camFinalPos, 3.5 * delta);

    // Interpolate the camera rotation
    smoothedCameraRotation.x = MathUtils.lerp(smoothedCameraRotation.x, camFinalRot.x, 3.5 * delta);
    smoothedCameraRotation.y = MathUtils.lerp(smoothedCameraRotation.y, camFinalRot.y, 3.5 * delta);
    smoothedCameraRotation.z = MathUtils.lerp(smoothedCameraRotation.z, camFinalRot.z, 3.5 * delta);

    // Update the camera's position and rotation
    camera.position.copy(smoothedCameraPosition);
    camera.rotation.copy(smoothedCameraRotation);
  });

  return null; // No need to render anything
};

export default CameraIntroMovement;

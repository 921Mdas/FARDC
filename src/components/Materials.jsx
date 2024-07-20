import { MeshTransmissionMaterial } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

export class Materials {
  constructor() {}

  standard(config) {
    return new THREE.MeshStandardMaterial(config);
  }

  glass(config) {
    return <MeshTransmissionMaterial {...config} />;
  }

  basic(config) {
    return new THREE.MeshBasicMaterial(config)
  }

  lambert(config){
    return new THREE.MeshLambertMaterial(config)
  }
}
import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@react-three/drei';

const UI = ({ SetShowLoadingPage, font }) => {
  const [exitHover, setExitHovered] = useState(false);
  const exit = useRef(null);

  useEffect(() => {
    if (exitHover && exit.current) {
      exit.current.color = 'darkred';
    }

    if (exitHover) {
      document.body.style.cursor = "pointer";
    }

    return () => {
      document.body.style.cursor = "auto";
      if (exit.current) {
        exit.current.color = 'grey';
      }
    };
  }, [exitHover]);

  return (
    <Text
      scale={0.3}
      ref={exit}
      font={font}
      onPointerOver={() => setExitHovered(true)}
      onPointerOut={() => setExitHovered(false)}
      color={'grey'}
      position={[-3, 1.5, 0]}
      anchorX={0}
      anchorY={0}
      onClick={() => SetShowLoadingPage(true)}
    >
      {'<'}
    </Text>
  );
}

export default UI;

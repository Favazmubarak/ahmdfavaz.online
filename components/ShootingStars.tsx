"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ShootingStar = () => {
  const starRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  
  // Randomize properties on spawn for realism
  const config = useMemo(() => {
    // zPos range from far behind (-12) to slightly in front (+2)
    const zPos = (Math.random() * 14) - 12;
    // Scale size and speed based on depth for parallax effect
    const zFactor = (zPos + 12) / 14; // 0 to 1
    const size = 0.02 + (zFactor * 0.08); 
    const speed = 0.6 + (zFactor * 0.9); // Faster speed
    const opacity = 0.1 + (zFactor * 0.5);

    return {
      speed,
      yPos: (Math.random() - 0.5) * 10,
      size,
      color: ["#FFD700", "#FFFFFF", "#00F2FF", "#FF9D00"][Math.floor(Math.random() * 4)],
      zPos,
      opacity
    };
  }, [active]);

  useFrame(() => {
    if (!starRef.current) return;
    
    if (!active) {
      if (Math.random() < 0.006) { // More rare spawns
        setActive(true);
        starRef.current.position.set(-15, config.yPos, config.zPos);
      }
    } else {
      starRef.current.position.x += config.speed;
      if (starRef.current.position.x > 15) {
        setActive(false);
      }
    }
  });

  return (
    <mesh ref={starRef} visible={active}>
      <sphereGeometry args={[config.size, 8, 8]} />
      <meshBasicMaterial color={config.color} transparent opacity={config.opacity} />
      {/* Parallax-aware Trail */}
      <mesh position={[-config.size * 20, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.001, config.size, config.size * 40, 8]} />
        <meshBasicMaterial color={config.color} transparent opacity={config.opacity * 0.4} />
      </mesh>
    </mesh>
  );
};

export const ShootingStarsLayer = ({ count = 8 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <ShootingStar key={i} />
      ))}
    </>
  );
};

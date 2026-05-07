"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Sphere, Stars } from "@react-three/drei";
import { ShootingStarsLayer } from "./ShootingStars";

const MoonSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg",
  ]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 5, 5]} intensity={3} />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color="#4444ff" />
      
      <ShootingStarsLayer count={10} />

      <Float
        speed={1.5} 
        rotationIntensity={0.2} 
        floatIntensity={0.5}
      >
        <group>
          <Sphere ref={meshRef} args={[2.5, 128, 128]}>
            <meshStandardMaterial
              map={colorMap}
              bumpMap={bumpMap}
              bumpScale={0.08}
              roughness={1}
              metalness={0.1}
            />
          </Sphere>
          
          <Sphere args={[2.51, 64, 64]}>
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1} 
              side={THREE.BackSide}
            />
          </Sphere>
        </group>
      </Float>
    </>
  );
};

export const Moon = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <React.Suspense fallback={null}>
          <MoonSphere />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

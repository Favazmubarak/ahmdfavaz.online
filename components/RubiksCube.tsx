"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function MetallicBlock({ position }: { position: [number, number, number] }) {
  const frameSize = 0.58; 
  const insertSize = 0.55; 

  return (
    <group position={position}>
      {/* High-Precision Polished Frame */}
      <RoundedBox args={[frameSize, frameSize, frameSize]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial 
          color="#111111" 
          roughness={0.01} 
          metalness={1} 
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2.5}
        />
      </RoundedBox>

      {/* Ultra-High Finishing Mirror Faces */}
      {[
        [0, 0, frameSize/2], [0, 0, -frameSize/2],
        [0, frameSize/2, 0], [0, -frameSize/2, 0],
        [frameSize/2, 0, 0], [-frameSize/2, 0, 0]
      ].map((pos, i) => (
        <RoundedBox 
          key={i} 
          args={i < 2 ? [insertSize, insertSize, 0.03] : i < 4 ? [insertSize, 0.03, insertSize] : [0.03, insertSize, insertSize]} 
          radius={0.015} 
          smoothness={4} 
          position={pos as [number, number, number]}
        >
          <meshPhysicalMaterial 
            color="#000000" 
            metalness={1} 
            roughness={0} 
            reflectivity={1} 
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={6}
            transmission={0}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

function Cube() {
  const mesh = useRef<THREE.Group>(null!);
  const topLayer = useRef<THREE.Group>(null!);
  const bottomLayer = useRef<THREE.Group>(null!);
  const sideLayer = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) mesh.current.rotation.y += delta * 0.15;

    const moveInterval = 2.5;
    const moveDuration = 0.6;
    const timeInMove = t % moveInterval;

    if (timeInMove < moveDuration) {
      const progress = THREE.MathUtils.smoothstep(timeInMove, 0, moveDuration);
      const angle = progress * (Math.PI / 2);
      if (Math.floor(t / moveInterval) % 2 === 0) {
        if (topLayer.current) topLayer.current.rotation.y = angle;
        if (bottomLayer.current) bottomLayer.current.rotation.y = -angle;
      } else {
        if (sideLayer.current) sideLayer.current.rotation.x = angle;
      }
    } else {
      if (topLayer.current) topLayer.current.rotation.y = Math.PI / 2;
      if (bottomLayer.current) bottomLayer.current.rotation.y = -Math.PI / 2;
      if (sideLayer.current) sideLayer.current.rotation.x = Math.PI / 2;
    }
  });

  const gap = 0.012; 
  const offset = 0.58 + gap;

  const blocks = useMemo(() => {
    const arr = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          arr.push({ x, y, z });
        }
      }
    }
    return arr;
  }, []);

  return (
    <group ref={mesh} rotation={[0.3, 0.4, 0.1]}>
      <group ref={sideLayer}>
        <group ref={topLayer} position={[0, offset, 0]}>
          {blocks.filter(b => b.y === 1).map((b, i) => (
            <MetallicBlock key={i} position={[b.x * offset, 0, b.z * offset]} />
          ))}
        </group>
        <group ref={bottomLayer} position={[0, -offset, 0]}>
          {blocks.filter(b => b.y === -1).map((b, i) => (
            <MetallicBlock key={i} position={[b.x * offset, 0, b.z * offset]} />
          ))}
        </group>
        {blocks.filter(b => b.y === 0).map((b, i) => (
          <MetallicBlock key={i} position={[b.x * offset, b.y * offset, b.z * offset]} />
        ))}
      </group>
    </group>
  );
}

function FocusedSpotlight() {
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.pow((Math.sin(t * 3) + 1) / 2, 8);
    if (spotLightRef.current) {
      spotLightRef.current.intensity = 120 + pulse * 250;
      spotLightRef.current.position.x = 8 + Math.sin(t * 0.5) * 4;
    }
  });
  return (
    <spotLight 
      ref={spotLightRef}
      position={[10, 10, 10]} 
      angle={0.2} 
      penumbra={1} 
      intensity={180} 
      color="#ffffff" 
    />
  );
}

export function RubiksCube() {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#080808]">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'scale(1.2)',
          zIndex: 0
        }}
      />
      
      <Canvas 
        camera={{ position: [8, 8, 8], fov: 28 }} 
        dpr={typeof window !== 'undefined' ? [Math.min(window.devicePixelRatio, 2), 2] : [1, 2]} 
        gl={{ 
          alpha: true, 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        className="relative z-10"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} makeDefault />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <Cube />
          </Float>
          <FocusedSpotlight />
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={12} 
            blur={2} 
            far={4} 
          />
          <Environment preset="city" intensity={1} /> 
        </Suspense>
      </Canvas>
    </div>
  );
}

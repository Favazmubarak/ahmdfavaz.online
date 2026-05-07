"use client";

import React from "react";
import { motion } from "framer-motion";

export const Sun = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center scale-125">
      {/* Core Sun */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden">
        {/* Deep Core */}
        <div className="absolute inset-0 bg-[#FF4D00] shadow-[0_0_100px_#FF4D00,0_0_200px_#FF0000]" />
        
        {/* Plasma Layers */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-20%] bg-[radial-gradient(circle_at_center,_#FFF700_0%,_#FFA200_30%,_#FF4D00_60%,_transparent_100%)] opacity-80 mix-blend-screen blur-xl"
        />

        {/* Surface Turbulence */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.8)_0%,_transparent_50%)] opacity-40 mix-blend-overlay"
        />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FF4D00] opacity-20 blur-[100px] animate-pulse" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FFA200] opacity-10 blur-[80px]" />

      {/* Heat Waves / Distortion (CSS only approximation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              scale: [0.8, 1.5, 2], 
              y: -200,
              x: Math.sin(i) * 50
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            className="absolute left-1/2 top-1/2 w-48 h-48 rounded-full border-t-2 border-orange-500/20 blur-2xl"
          />
        ))}
      </div>

      <style jsx>{`
        .sun-blur {
          filter: url(#plasma-filter);
        }
      `}</style>
      
      <svg width="0" height="0">
        <filter id="plasma-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
        </filter>
      </svg>
    </div>
  );
};

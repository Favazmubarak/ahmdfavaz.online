"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

export const GlobalStarTrail = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const colors = ["#FFD700", "#FFFFFF", "#00F2FF", "#FF9D00"];
    const generateStar = () => ({
      id: Date.now() + Math.random(),
      y: 20 + Math.random() * 60, // Keep in the middle vertically
      delay: 0,
      duration: 3 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 1 + Math.random() * 3,
    });

    const interval = setInterval(() => {
      setStars(prev => [...prev.slice(-15), generateStar()]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ x: "-5%", opacity: 0 }}
            animate={{ 
              x: "105%", 
              opacity: [0, 1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: star.duration, 
              ease: "linear",
              times: [0, 0.1, 0.9, 1]
            }}
            style={{
              position: "absolute",
              top: `${star.y}%`,
              width: star.size * 20,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${star.color})`,
              filter: `blur(${star.size}px) drop-shadow(0 0 5px ${star.color})`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

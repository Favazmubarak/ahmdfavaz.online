"use client";

import React, { useEffect, useRef } from "react";

export function WatchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ms = now.getMilliseconds();
      const date = now.getDate();
      const day = now.toLocaleDateString("en-US", { weekday: 'short' }).toUpperCase();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 245;

      // 1. Premium Rich Backdrop
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      grad.addColorStop(0, "#0a0a0a");
      grad.addColorStop(0.8, "#000000");
      grad.addColorStop(1, "#050505");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();

      // 2. Outer Bezel/Ring Ticks
      for (let i = 0; i < 60; i++) {
        const angle = (i * Math.PI) / 30;
        const isHour = i % 5 === 0;
        ctx.beginPath();
        ctx.moveTo(centerX + (radius - 4) * Math.sin(angle), centerY - (radius - 4) * Math.cos(angle));
        ctx.lineTo(centerX + (radius - (isHour ? 16 : 8)) * Math.sin(angle), centerY - (radius - (isHour ? 16 : 8)) * Math.cos(angle));
        ctx.strokeStyle = isHour ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)";
        ctx.lineWidth = isHour ? 2.5 : 1.5;
        ctx.stroke();
      }

      // 3. Day-Date Window (Original Recessed)
      const windowX = centerX;
      const windowY = centerY + (radius - 90);
      const windowWidth = 70;
      const windowHeight = 24;

      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.beginPath();
      ctx.roundRect(windowX - windowWidth/2, windowY - windowHeight/2, windowWidth, windowHeight, 2);
      ctx.fill();
      
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)"; 
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.strokeRect(windowX - windowWidth/2 + 1, windowY - windowHeight/2 + 1, windowWidth - 2, windowHeight - 2);
      ctx.restore();

      // Day-Date Text
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(212, 175, 55, 0.8)";
      ctx.fillText(day, windowX - 18, windowY);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(windowX - 1, windowY - 6, 1, 12);
      ctx.fillStyle = "white";
      ctx.fillText(date.toString(), windowX + 18, windowY);

      // 4. Roman Numerals
      const roman = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
      ctx.font = "700 24px 'Instrument Serif', serif";
      ctx.fillStyle = "white";
      
      roman.forEach((num, i) => {
        if (i === 6) return; // Skip VI for Day-Date window
        const angle = (i * 30 * Math.PI) / 180;
        const dist = radius - 55;
        const x = centerX + dist * Math.sin(angle);
        const y = centerY - dist * Math.cos(angle);
        ctx.fillText(num, x, y);
      });

      // 5. Hands Implementation
      const hAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * (Math.PI / 6);
      const mAngle = (minutes + seconds / 60) * (Math.PI / 30);
      const sAngle = (seconds + ms / 1000) * (Math.PI / 30);

      // Hour Hand
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(hAngle);
      ctx.beginPath();
      ctx.moveTo(0, 12); ctx.lineTo(-9, 0); ctx.lineTo(0, -radius * 0.52); ctx.lineTo(9, 0); ctx.closePath();
      ctx.fillStyle = "#ffffff"; ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -radius * 0.52); ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();

      // Minute Hand
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(mAngle);
      ctx.beginPath();
      ctx.moveTo(0, 15); ctx.lineTo(-6, 0); ctx.lineTo(0, -radius * 0.85); ctx.lineTo(6, 0); ctx.closePath();
      ctx.fillStyle = "#ffffff"; ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -radius * 0.85); ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();

      // Second Hand
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sAngle);
      ctx.beginPath();
      ctx.moveTo(0, 35); ctx.lineTo(0, -radius * 0.95);
      ctx.strokeStyle = "#a855f7"; // Neon Purple
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Center Pin
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#a855f7";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={480} 
      height={480} 
      className="w-[420px] h-[420px]" 
    />
  );
}

"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Hexagon } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const RubiksCube = dynamic(
  () => import("./RubiksCube").then((m) => m.RubiksCube),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#080808]" /> }
);

const Moon = dynamic(
  () => import("./Moon").then((m) => m.Moon),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#080808]" /> }
);
import { Canvas } from "@react-three/fiber";
import { ShootingStarsLayer } from "./ShootingStars";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time} IST</>;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export default function WatchSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("favazkoppath@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[#000000] py-24 px-8 font-sans">
      {/* 👇 TO CHANGE HEIGHT: Adjust md:h-[540px] in the className below */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-wrap md:flex-nowrap gap-6 h-auto md:h-[500px]"
      >

        {/* ── CARD 1 · System Architect (23%) ─────────────────────────── */}
        <motion.div
          variants={cardVariant}
          className="w-full md:w-[23%] bg-[#080808] rounded-[30px] border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500 relative overflow-hidden flex flex-col justify-between p-10 group"
        >
          {/* subtle inner top-left glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent pointer-events-none" />

          {/* name + location */}
          <div className="relative z-10">
            <h3 className="text-white text-[1.65rem] tracking-tighter leading-none flex items-baseline gap-1.5">
              <span className="font-black uppercase">FAVAZ</span>
              <span
                className="text-white/35 italic font-light text-[1.65rem]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                mubarak
              </span>
            </h3>
            <div className="mt-2.5 flex items-center gap-1.5 opacity-35">
              <MapPin size={9} />
              <p className="text-[8px] uppercase tracking-[0.22em] font-bold">
                ERNAKULAM, IN · <LiveClock />
              </p>
            </div>
          </div>

          {/* Rubik's Cube — fills middle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            <div className="w-[105%] h-[105%] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
              <RubiksCube />
            </div>
          </div>

          {/* social links */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            <div className="w-4/5 h-px bg-white/[0.04]" />
            <div className="flex items-center justify-center gap-7">
              {[
                { icon: <FaLinkedin size={18} />, href: "#" },
                { icon: <FaGithub size={18} />, href: "#" },
                { icon: <FaXTwitter size={17} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="text-white/25 hover:text-white/80 transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CARD 2 · Moon (54%) ─────────────────────────────── */}
<motion.div
  variants={cardVariant}
  className="w-full md:w-[54%] bg-[#080808] rounded-[28px] border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500 relative overflow-hidden flex flex-col p-14 group"
>
  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none z-10" />


  {/* Top Left Title */}
  <div className="relative z-20">
    <span className="text-[10px] text-white/40 font-bold tracking-[0.4em] uppercase mb-2 block">
      CELESTIAL DESIGN
    </span>
    <h3 className="text-white font-black text-5xl tracking-tighter leading-[0.9]">
      Lunar<br />Presence
    </h3>
  </div>

  {/* Center Moon — filling the background */}
  <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
    <div className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700">
      <Moon />
    </div>
  </div>

  {/* Bottom Right Subtitle */}
  <div className="relative z-20 mt-auto ml-auto text-right">
    <p className="text-white/20 text-[11px] uppercase tracking-[0.3em] font-bold mb-1">
      PHASE TWO
    </p>
    <h4 className="text-white font-black text-2xl tracking-tight leading-none italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
      Reflecting excellence<br />in every detail.
    </h4>
  </div>
</motion.div>
        {/* ── CARD 3 · Connect (26%) ───────────────────────────────── */}
        {/* 👇 TO CHANGE WIDTH: Adjust md:w-[23%] in the className below */}
        <motion.div
          variants={cardVariant}
          className="w-full md:w-[23%] bg-[#080808] rounded-[28px] border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500 relative overflow-hidden flex flex-col justify-between p-10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

          {/* top row */}
          <div className="flex justify-between items-start relative z-10">
            {/* Custom Premium Animation Button */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-white/[0.02] to-white/[0.08] border border-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] flex items-center justify-center relative group-hover:border-white/[0.2] transition-all duration-700 overflow-hidden">
              {/* Center Glowing Dot */}
              <div className="w-[4.5px] h-[4.5px] rounded-full bg-white z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
              
              {/* Rest state U-arc */}
              <div className="absolute w-[16px] h-[16px] rounded-full border-[1.5px] border-b-white/40 border-l-white/40 border-r-transparent border-t-transparent -rotate-45 group-hover:opacity-0 transition-opacity duration-500" />

              {/* Hover state SVG drawing ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 36 36">
                <circle 
                  cx="18" 
                  cy="18" 
                  r="8" 
                  fill="none" 
                  stroke="url(#premium-gradient)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  style={{ strokeDasharray: "50.3px" }}
                  className="[stroke-dashoffset:50.3px] group-hover:[stroke-dashoffset:0px] transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                />
                <defs>
                  <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Background Stars Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ShootingStarsLayer count={10} />
              </Canvas>
            </div>

            {/* Available for work pill */}
            <div className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-white/[0.08] transition-colors duration-500 flex items-center gap-2 cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse group-hover:animate-[pulse_0.8s_ease-in-out_infinite]" style={{ boxShadow: "0 0 6px rgba(0,255,102,0.4)" }} />
              <span className="text-[8px] text-white/40 group-hover:text-white/80 transition-colors duration-500 uppercase tracking-widest font-bold">
                Available for work
              </span>
            </div>
          </div>

          {/* headline */}
          <div className="relative z-10 mt-8">
            <h2 className="text-white font-black text-[2.2rem] tracking-tight leading-[1.05] uppercase">
              LET&apos;S BUILD<br />SOMETHING
            </h2>
            <p
              className="text-white/30 text-xl italic font-light mt-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              that actually works.
            </p>
          </div>

          {/* email + CTA */}
          <div className="relative z-10 flex flex-col gap-6 mt-auto pt-6">
            {/* Divider Line */}
            <div className="w-full h-px bg-white/[0.04]" />
            
            <motion.div 
              className="flex flex-col gap-1.5 cursor-pointer group/mail w-max" 
              onClick={handleCopy}
              whileTap={{ scale: 0.98 }}
              animate={copied ? { x: [0, -2, 2, -1, 1, 0] } : { x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 text-white/70 group-hover/mail:text-white transition-colors duration-300 relative pb-2">
                <div className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center group-hover/mail:border-white/20 transition-colors duration-300 relative">
                  <Hexagon size={13} className="text-white/40 group-hover/mail:text-white/70 transition-colors" />
                  <div className="absolute w-[2.5px] h-[2.5px] bg-white/40 rounded-full group-hover/mail:bg-white/70 transition-colors" />
                </div>
                
                <span className="text-[1.05rem] font-medium tracking-tight">
                  favazkoppath@gmail.com
                </span>
                
                {/* Yellow Loading Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover/mail:w-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-gradient-to-r from-orange-400 to-amber-300 rounded-full" />
              </div>

              <div className="pl-11 h-[14px] flex items-center">
                {copied ? (
                  <motion.span 
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[7.5px] text-[#00ff66] uppercase tracking-[0.3em] font-bold flex items-center gap-1.5"
                  >
                    <span className="text-[9px]">✓</span> COPIED TO CLIPBOARD
                  </motion.span>
                ) : (
                  <span className="text-[7.5px] text-white/20 uppercase tracking-[0.3em] font-bold group-hover/mail:text-white/40 transition-colors duration-300">
                    TAP TO COPY EMAIL
                  </span>
                )}
              </div>
            </motion.div>
            
            <a 
              href="mailto:favazkoppath@gmail.com"
              className="group/btn w-full bg-white text-black py-[14px] rounded-2xl text-[10.5px] uppercase tracking-[0.22em] font-black hover:bg-[#f0f0f0] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-2 shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              CONNECT NOW 
              <ArrowUpRight size={11} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

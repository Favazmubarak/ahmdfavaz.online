"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const WatchCanvas = dynamic(
  () => import("./WatchScene").then((m) => m.WatchCanvas),
  { ssr: false }
);

const RubiksCube = dynamic(
  () => import("./RubiksCube").then((m) => m.RubiksCube),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#080808]" /> }
);

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

export default function WatchSection() {
  const rowHeight = 500; 
  const gap = 32; 
  const clockRadius = 190; 
  const socketTop = rowHeight + (gap / 2);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <section className="w-full bg-[#000000] py-24 px-8 font-sans overflow-hidden">
      <div className="w-full relative" style={{ isolation: 'isolate' }}>
        
        {/* ROW 1: TRIPLE CARD GRID */}
        <div className="flex flex-wrap md:flex-nowrap gap-8 h-auto md:h-[500px] w-full relative z-10">
          
          {/* Card 1 (LEFT) - Profile */}
          <motion.div 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[26%] bg-[#080808] rounded-[32px] p-[40px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-white text-3xl tracking-tighter leading-none mb-1 flex items-baseline gap-1.5">
                <span className="font-bold uppercase">FAVAZ</span> 
                <span className="text-white/40 italic font-light text-3xl" style={{ fontFamily: "'Instrument Serif', serif" }}>mubarak</span>
              </h3>
              <div className="mt-2.5 flex items-center gap-1.5 opacity-40">
                <MapPin size={9} />
                <p className="text-[8.5px] uppercase tracking-[0.2em] font-bold">
                  ERNAKULAM, IN · <LiveClock />
                </p>
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-8">
               <div className="w-[110%] h-[110%] scale-100 opacity-90 transition-opacity group-hover:opacity-100">
                  <RubiksCube />
               </div>
            </div>

            <div className="relative z-10 w-full pt-8 flex flex-col items-center">
              <div className="w-[85%] h-[1px] bg-white/[0.03] mb-8" />
              <div className="flex items-center justify-center gap-8">
                {[
                  { icon: <FaLinkedin size={20} />, href: "#" },
                  { icon: <FaGithub size={20} />, href: "#" },
                  { icon: <FaXTwitter size={19} />, href: "#" }
                ].map((social, i) => (
                  <a key={i} href={social.href} className="text-white/30 hover:text-white transition-all duration-300">{social.icon}</a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 (CENTER) - Watch Face */}
          <motion.div 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[54%] bg-[#080808] rounded-[32px] p-[60px] flex flex-col justify-start transition-colors duration-300 relative overflow-hidden group z-10"
            style={{ 
              clipPath: 'url(#card2-clip)',
              WebkitClipPath: 'url(#card2-clip)'
            }}
          >
            {/* SVG Border — draws full card outline with curved clock cutout */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1, overflow: 'visible' }}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <clipPath id="card2-clip" clipPathUnits="objectBoundingBox">
                  <path d="
                    M 0.033,0
                    H 0.967
                    Q 1,0 1,0.033
                    V 1
                    H 0.75
                    Q 0.5,1.01 0.25,1
                    H 0
                    V 0.033
                    Q 0,0 0.033,0
                    Z
                  " />
                </clipPath>
              </defs>
              {/* Outer glow border */}
              <path
                vectorEffect="non-scaling-stroke"
                d="
                  M 3.2,0
                  H 96.8
                  Q 100,0 100,3.2
                  V 100
                  H 75
                  Q 50,101 25,100
                  H 0
                  V 3.2
                  Q 0,0 3.2,0
                  Z
                "
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Sharp border */}
              <path
                vectorEffect="non-scaling-stroke"
                d="
                  M 3.2,0
                  H 96.8
                  Q 100,0 100,3.2
                  V 100
                  H 75
                  Q 50,101 25,100
                  H 0
                  V 3.2
                  Q 0,0 3.2,0
                  Z
                "
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
            </svg>

            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40">
                  <ArrowUpRight size={12} className="rotate-45" />
                </div>
                <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold">DETAIL-DRIVEN UI</span>
              </div>
              <div className="flex items-center gap-1 text-white/20">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">PHILOSOPHY</span>
                <span className="text-xs">+</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-10 relative z-10 mt-12 pr-4">
              <div className="max-w-[420px]">
                <h2 className="text-white font-bold text-7xl tracking-tighter leading-[0.85] mb-2">Interfaces</h2>
                <p className="text-white/40 text-3xl italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>you can feel.</p>
                <p className="text-white/20 text-[11px] mt-8 leading-relaxed max-w-[260px]">I sweat spacing, timing, and feedback — the tiny stuff.</p>
              </div>
              
              <div className="flex flex-col items-end gap-10 mt-4">
                <div className="flex gap-2">
                  {["Motion", "Type", "Feedback", "Craft"].map((tag) => (
                    <span key={tag} className="px-3.5 py-1.5 rounded-full border border-white/10 text-[9px] text-white/40 uppercase tracking-[0.2em] hover:border-white/30 transition-all cursor-default">{tag}</span>
                  ))}
                </div>
                
                <div className="text-right max-w-[180px]">
                  <h4 className="text-white font-bold text-[14px] tracking-tight mb-1.5 uppercase">Micro-interactions</h4>
                  <p className="text-white/30 text-[11px] leading-relaxed italic">Subtle movement that confirms intent — never distracting.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 (RIGHT) - Connect */}
          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[20%] bg-[#080808] rounded-[32px] p-[40px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group z-10"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Available for work</span>
              </div>
            </div>

            <div className="relative z-10 mt-12 text-center md:text-left">
               <h2 className="text-white font-bold text-3xl tracking-tight leading-none uppercase">Let&apos;s build<br/>something</h2>
               <p className="text-white/30 text-xl italic font-light mt-1" style={{ fontFamily: "'Instrument Serif', serif" }}>that actually works.</p>
            </div>

            <div className="relative z-10 w-full pt-8 space-y-8">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer group/mail">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/mail:border-white/20">
                     <ArrowUpRight size={12} className="text-white/40" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">hello@favaz.in</span>
                </div>
                <span className="text-[8px] text-white/20 uppercase tracking-[0.3em] font-bold">TAP TO COPY EMAIL</span>
              </div>
              <button className="w-full bg-white text-black py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-black hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                CONNECT NOW <ArrowUpRight size={12} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* THE GIANT CLOCK SOCKET */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" 
          style={{ top: `${socketTop}px` }}
        >
           {/* OUTER MACHINED RING (The Bezel) */}
           <div 
             className="relative w-[380px] h-[380px] rounded-full flex items-center justify-center p-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_80px_rgba(255,255,255,0.02)] pointer-events-auto"
             style={{
               background: 'linear-gradient(145deg, #2a2a2a, #0a0a0a)',
               boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
             }}
           >
              {/* INNER RECESSED GROOVE - Centering WatchCanvas */}
              <div 
                className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] border border-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent pointer-events-none" />
                
                <div className="scale-[0.78] flex items-center justify-center w-full h-full">
                   <WatchCanvas />
                </div>
                
                <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-[32px] h-[1px] bg-white/10" />
                <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 w-[32px] h-[1px] bg-white/10" />
                <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-[1px] h-[32px] bg-white/10" />
              </div>
           </div>
        </div>

        {/* ROW 2: TWO CARDS */}
        <div className="flex flex-wrap md:flex-nowrap gap-8 h-auto md:h-[580px] w-full mt-8 relative z-10">
          
          {/* Card 4 (LEFT) */}
          <motion.div 
            custom={4}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[calc(50%-16px)] bg-[#0d0d0d] rounded-[24px] p-[56px] flex flex-col justify-between transition-colors duration-300 relative overflow-hidden group z-10"
            style={{ 
              maskImage: `radial-gradient(circle ${clockRadius}px at 100% 0%, transparent 99%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${clockRadius}px at 100% 0%, transparent 99%, black 100%)`
            }}
          >
             <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0 overflow-visible">
                <path d={`M 100%,${clockRadius} A ${clockRadius},${clockRadius} 0 0 0 calc(100% - ${clockRadius}px),0 H 24 A 24,24 0 0 0 0,24 V calc(100% - 24) A 24,24 0 0 0 24,100% H calc(100% - 24) A 24,24 0 0 0 100%,calc(100% - 24) V ${clockRadius} Z`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" className="blur-[3px]" />
                <path d={`M 100%,${clockRadius} A ${clockRadius},${clockRadius} 0 0 0 calc(100% - ${clockRadius}px),0 H 24 A 24,24 0 0 0 0,24 V calc(100% - 24) A 24,24 0 0 0 24,100% H calc(100% - 24) A 24,24 0 0 0 100%,calc(100% - 24) V ${clockRadius} Z`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" className="blur-[0.5px]" />
              </svg>
            </div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white/[0.015] font-black text-[320px] select-none tracking-tighter">WORLD</span>
             </div>
             <div className="relative z-10">
                <span className="text-[13px] text-teal-500 font-bold tracking-widest uppercase mb-10 block">AVAILABLE GLOBALLY</span>
                <h3 className="text-white font-black text-6xl md:text-7xl tracking-tighter leading-none">Adaptable across<br/>time zones</h3>
             </div>
             <div className="relative z-10 flex gap-20 mt-auto">
                <div className="flex flex-col"><span className="text-[16px] text-white/50 font-black uppercase tracking-widest">IST India</span><span className="text-[12px] text-white/20 uppercase">GMT +5:30</span></div>
                <div className="flex flex-col"><span className="text-[16px] text-white/50 font-black uppercase tracking-widest">Remote</span><span className="text-[12px] text-white/20 uppercase">Worldwide</span></div>
             </div>
          </motion.div>

          {/* Card 5 (RIGHT) */}
          <motion.div 
            custom={5}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[calc(50%-16px)] bg-gradient-to-br from-[#1a1025] to-[#0a0a0a] rounded-[24px] p-[56px] flex flex-col justify-between transition-colors duration-300 overflow-hidden group relative z-10"
            style={{ 
              maskImage: `radial-gradient(circle ${clockRadius}px at 0% 0%, transparent 99%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${clockRadius}px at 0% 0%, transparent 99%, black 100%)`
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0 overflow-visible">
                <path d={`M 0,${clockRadius} A ${clockRadius},${clockRadius} 0 0 1 ${clockRadius},0 H calc(100% - 24) A 24,24 0 0 1 100%,24 V calc(100% - 24) A 24,24 0 0 1 calc(100% - 24),100% H 24 A 24,24 0 0 1 0,calc(100% - 24) V ${clockRadius} Z`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" className="blur-[3px]" />
                <path d={`M 0,${clockRadius} A ${clockRadius},${clockRadius} 0 0 1 ${clockRadius},0 H calc(100% - 24) A 24,24 0 0 1 100%,24 V calc(100% - 24) A 24,24 0 0 1 calc(100% - 24),100% H 24 A 24,24 0 0 1 0,calc(100% - 24) V ${clockRadius} Z`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" className="blur-[0.5px]" />
              </svg>
            </div>
             <div>
                <h3 className="text-white font-black text-7xl tracking-tighter leading-none">Founder of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Rune</span></h3>
                <p className="text-white/20 text-[13px] font-bold mt-8 tracking-[0.5em] uppercase">DIGITAL EXPERIENCES</p>
             </div>
             <div className="relative flex-1 mt-16">
                <div className="absolute right-0 bottom-[-100px] w-72 h-[480px] bg-black border border-white/10 rounded-[4rem] transform rotate-6 transition-transform duration-700 group-hover:rotate-0 shadow-2xl" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

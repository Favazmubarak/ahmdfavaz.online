"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Copy, Check } from "lucide-react";
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
  const clockRadius = 210; 
  const socketTop = rowHeight + (gap / 2);

  return (
    <section className="w-full bg-[#000000] py-24 px-8 font-sans overflow-hidden">
      <div className="w-full relative">
        
        {/* ROW 1: TRIPLE CARD GRID */}
        <div className="flex flex-wrap md:flex-nowrap gap-8 h-auto md:h-[500px] w-full relative z-10">
          
          {/* Card 1 (LEFT) - Profile */}
          <div className="w-full md:w-[26%] bg-[#080808] rounded-[32px] p-[40px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group">
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
          </div>

          {/* Card 2 (CENTER) - Watch Face */}
          <div 
            className="w-full md:w-[54%] bg-[#080808] rounded-[32px] p-[40px] flex flex-col justify-between transition-colors duration-300 relative overflow-hidden group"
            style={{ 
              maskImage: `radial-gradient(circle ${clockRadius}px at 50% 100%, transparent 99%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${clockRadius}px at 50% 100%, transparent 99%, black 100%)`
            }}
          >
            {/* Premium Curved Border - Dual Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0 overflow-visible">
                {/* Soft Bezel Glow */}
                <path d={`M 32,0 H calc(100% - 32) A 32,32 0 0 1 100%,32 V 100% H calc(50% + ${clockRadius}px) A ${clockRadius},${clockRadius} 0 0 0 calc(50% - ${clockRadius}px),100% H 0 V 32 A 32,32 0 0 1 32,0 Z`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" className="blur-[3px]" />
                {/* Main Soft Line */}
                <path d={`M 32,0 H calc(100% - 32) A 32,32 0 0 1 100%,32 V 100% H calc(50% + ${clockRadius}px) A ${clockRadius},${clockRadius} 0 0 0 calc(50% - ${clockRadius}px),100% H 0 V 32 A 32,32 0 0 1 32,0 Z`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" className="blur-[0.5px]" />
              </svg>
            </div>

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

            <div className="flex flex-col md:flex-row justify-between items-end gap-10 relative z-10 pb-20">
              <div className="max-w-[280px]">
                <h2 className="text-white font-bold text-5xl tracking-tight leading-none">Interfaces</h2>
                <p className="text-white/40 text-3xl italic font-light mt-1" style={{ fontFamily: "'Instrument Serif', serif" }}>you can feel.</p>
                <p className="text-white/20 text-[11px] mt-6 leading-relaxed">I sweat spacing, timing, and feedback — the tiny stuff.</p>
              </div>
              <div className="flex flex-col items-end gap-6">
                <div className="flex gap-2">
                  {["Motion", "Type", "Feedback", "Craft"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] text-white/40 uppercase tracking-widest hover:border-white/30 transition-colors">{tag}</span>
                  ))}
                </div>
                <div className="text-right max-w-[160px]">
                  <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-2">Micro-interactions</h4>
                  <p className="text-white/20 text-[9px] leading-relaxed italic">Subtle movement that confirms intent — never distracting.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 (RIGHT) - Connect */}
          <div className="w-full md:w-[20%] bg-[#080808] rounded-[32px] p-[40px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group">
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
          </div>
        </div>

        {/* THE GIANT CLOCK SOCKET */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" style={{ top: `${socketTop}px` }}>
           <div className="relative w-[420px] h-[420px] rounded-full bg-black flex items-center justify-center border border-white/[0.08] shadow-[0_0_120px_rgba(255,255,255,0.05)] pointer-events-auto">
              <WatchCanvas />
              <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-[32px] h-[1px] bg-white/10" />
              <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 w-[32px] h-[1px] bg-white/10" />
              <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-[1px] h-[32px] bg-white/10" />
           </div>
        </div>

        {/* ROW 2: TWO CARDS */}
        <div className="flex flex-wrap md:flex-nowrap gap-8 h-auto md:h-[580px] w-full mt-8 relative z-10">
          
          {/* Card 4 (LEFT) */}
          <div 
            className="w-full md:w-1/2 bg-[#0d0d0d] rounded-[24px] p-[56px] flex flex-col justify-between transition-colors duration-300 relative overflow-hidden group"
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
          </div>

          {/* Card 5 (RIGHT) */}
          <div 
            className="w-full md:w-1/2 bg-gradient-to-br from-[#1a1025] to-[#0a0a0a] rounded-[24px] p-[56px] flex flex-col justify-between transition-colors duration-300 overflow-hidden group relative"
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
          </div>

        </div>
      </div>
    </section>
  );
}

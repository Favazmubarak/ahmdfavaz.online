"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
        
        {/* CONSOLIDATED HERO ROW */}
        <div className="flex flex-wrap md:flex-nowrap gap-8 h-auto md:h-[600px] w-full relative z-10">
          
          {/* 1. LEFT CARD - PROFILE & RUBIK (30%) */}
          <motion.div 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[30%] bg-[#080808] rounded-[32px] p-[40px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group z-10"
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
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
               <div className="w-[100%] h-[100%] scale-110 opacity-90 transition-opacity group-hover:opacity-100">
                  <RubiksCube />
               </div>
            </div>

            <div className="relative z-10 w-full pt-8 flex flex-col items-center">
              <div className="w-[85%] h-[1px] bg-white/[0.03] mb-6" />
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

          {/* 2. CENTER CARD - AVAILABLE GLOBALLY (50%) */}
          <motion.div 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[50%] bg-[#0d0d0d] rounded-[32px] p-[56px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group z-10"
          >
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white/[0.015] font-black text-[240px] select-none tracking-tighter">WORLD</span>
             </div>
             <div className="relative z-10">
                <span className="text-[11px] text-teal-500 font-bold tracking-widest uppercase mb-8 block">AVAILABLE GLOBALLY</span>
                <h3 className="text-white font-black text-5xl tracking-tighter leading-none mb-4">Adaptable across<br/>time zones</h3>
                <p className="text-white/30 text-[13px] leading-relaxed max-w-[200px]">Working with teams worldwide from a GMT +5:30 base.</p>
             </div>
             <div className="relative z-10 flex gap-12 mt-auto">
                <div className="flex flex-col"><span className="text-[14px] text-white/50 font-black uppercase tracking-widest">IST India</span><span className="text-[10px] text-white/20 uppercase">GMT +5:30</span></div>
                <div className="flex flex-col"><span className="text-[14px] text-white/50 font-black uppercase tracking-widest">Remote</span><span className="text-[10px] text-white/20 uppercase">Worldwide</span></div>
             </div>
          </motion.div>

          {/* 3. RIGHT CARD - CONNECT (20%) */}
          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full md:w-[20%] bg-[#080808] rounded-[32px] p-[32px] flex flex-col justify-between border border-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden group z-10"
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

            <div className="relative z-10 mt-12">
               <h2 className="text-white font-bold text-4xl tracking-tight leading-none uppercase">Let&apos;s build<br/>something</h2>
               <p className="text-white/30 text-xl italic font-light mt-1" style={{ fontFamily: "'Instrument Serif', serif" }}>that actually works.</p>
            </div>

            <div className="relative z-10 w-full pt-8 space-y-6">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer group/mail">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/mail:border-white/20">
                     <ArrowUpRight size={12} className="text-white/40" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">hello@favaz.in</span>
                </div>
                <span className="text-[8px] text-white/20 uppercase tracking-[0.3em] font-bold pl-11">TAP TO COPY EMAIL</span>
              </div>
              <button className="w-full bg-white text-black py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-black hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                CONNECT NOW <ArrowUpRight size={12} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { Link2, Phone, Moon, Sun, Command } from "lucide-react";
import { useTheme } from "next-themes";
import { CommandMenu } from "./CommandMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!navRef.current) return;
    const ro = new ResizeObserver(() => {
      if (navRef.current) setNavWidth(navRef.current.offsetWidth);
    });
    ro.observe(navRef.current);
    setNavWidth(navRef.current.offsetWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    // Initialize state immediately so it doesn't get stuck on refresh
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getTargetX = () => {
    if (typeof window === "undefined" || navWidth === 0) return 0;
    if (scrolled) return -(navWidth / 2);
    return window.innerWidth / 2 - navWidth - 56;
  };

  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.6 });

  useEffect(() => {
    rawX.set(getTargetX());
  }, [scrolled, navWidth]);
  useEffect(() => {
    const onResize = () => rawX.set(getTargetX());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scrolled, navWidth]);

  const navItems = ["Home", "About", "Work", "Contact"];
  const font: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -6 : 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 left-0 z-[100] flex items-center gap-2.5 px-6 py-4 pointer-events-none select-none"
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#fff",
            fontWeight: 700,
            fontSize: "26px",
            letterSpacing: "-0.02em",
            fontStyle: "italic",
            lineHeight: 0.9,
          }}
        >
          AF
        </span>
        <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 shrink-0" />
        <div className="flex flex-col gap-[2px]">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1,
            }}
          >
            Software Developer
          </span>
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#34d399",
              lineHeight: 1,
            }}
          >
            Building The Future
          </span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[99]" 
        style={{ top: "20px", right: "5px" }}
      >
        <button
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-command-menu"))
          }
          className="flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{
            width: "38px",
            height: "38px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.65)",
            cursor: "pointer",
          }}
          aria-label="Open Command Menu"
        >
          <Command size={14} />
        </button>
      </motion.div>

      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ x, left: "50%", fontFamily: font.fontFamily }}
        className="fixed top-5 z-[100]"
      >
        <div
          className="flex items-center rounded-full"
          style={{
            background: "rgba(150,150,150,0.15)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "5px",
            gap: "2.5px",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)",
            whiteSpace: "nowrap",
          }}
        >
          {navItems.map((item) => (
            <NavItem
              key={item}
              label={item}
              active={item === "Home"}
              font={font}
            />
          ))}

          <div ref={moreRef} className="relative">
            <button
              onClick={() => setShowMore((v) => !v)}
              className="flex items-center rounded-full"
              style={{
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                gap: "4px",
                color: showMore
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.65)",
                background: showMore ? "rgba(255,255,255,0.1)" : "transparent",
                border: "none",
                cursor: "pointer",
                ...font,
              }}
            >
              More
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{ display: "block" }}
              >
                <path
                  d="M1.5 3.5L5 7L8.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 mt-2 w-[288px] rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(12,12,12,0.97)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                    transformOrigin: "top right",
                    ...font,
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Link2
                          size={14}
                          style={{ color: "rgba(255,255,255,0.65)" }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.88)",
                            fontSize: "13px",
                            fontWeight: 600,
                            lineHeight: 1,
                            marginBottom: "3px",
                          }}
                        >
                          Links
                        </p>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.35)",
                            fontSize: "11px",
                          }}
                        >
                          Socials &amp; Profiles
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "4px",
                      }}
                    >
                      {[
                        {
                          href: "https://github.com/Favazmubarak",
                          icon: <FaGithub size={13} />,
                          label: "GitHub",
                          color: "rgba(255,255,255,0.55)",
                        },
                        {
                          href: "https://linkedin.com/in/favazmubarak",
                          icon: <FaLinkedin size={13} />,
                          label: "LinkedIn",
                          color: "#60a5fa",
                        },
                        {
                          href: "https://instagram.com/ahmd.devx",
                          icon: <FaInstagram size={13} />,
                          label: "Instagram",
                          color: "#f472b6",
                        },
                        {
                          href: "mailto:favazkoppath10@gmail.com",
                          icon: <FaEnvelope size={13} />,
                          label: "Email",
                          color: "#f87171",
                        },
                      ].map(({ href, icon, label, color }) => (
                        <DropdownLink
                          key={label}
                          href={href}
                          icon={icon}
                          label={label}
                          iconColor={color}
                          font={font}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.07)",
                        margin: "2px 0",
                      }}
                    />
                    <p
                      style={{
                        color: "rgba(255,255,255,0.2)",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "0 2px",
                      }}
                    >
                      Contact
                    </p>
                    <DropdownContact
                      href="https://wa.me/917510363359?text=Hi%2C%20I%20am%20interested%20in%20hiring%20you."
                      icon={<FaWhatsapp size={14} />}
                      iconColor="#34d399"
                      title="WhatsApp"
                      sub="+91 7510363359"
                      font={font}
                      external
                    />
                    <DropdownContact
                      href="tel:+917510363359"
                      icon={<Phone size={14} />}
                      iconColor="#22d3ee"
                      title="Call Me"
                      sub="+91 7510363359"
                      font={font}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            style={{
              width: "1px",
              height: "16px",
              background: "rgba(255,255,255,0.1)",
              margin: "0 4px",
              flexShrink: 0,
            }}
          />

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{
                width: "30px",
                height: "30px",
                color: "rgba(255,255,255,0.65)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          )}
          <BookCallBtn font={font} />
        </div>
      </motion.nav>

      {/* CommandMenu manages itself — no props */}
      <CommandMenu />
    </>
  );
}

function NavItem({
  label,
  active,
  font,
}: {
  label: string;
  active: boolean;
  font: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: active ? "8px 15px" : "10px 12px",
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        letterSpacing: active ? "-0.01em" : "-0.01em",
        lineHeight: 1,
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        ...font,
        color: active ? "#000" : hovered ? "#fff" : "rgba(255,255,255,0.65)",
        background: active
          ? "#fff"
          : hovered
            ? "rgba(255,255,255,0.1)"
            : "transparent",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function BookCallBtn({ font }: { font: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/917510363359?text=Hi%2C%20I%20want%20to%20book%20a%20call%20with%20you."
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    style={{
  ...font,
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: hovered ? 700 : 500,
  letterSpacing: "-0.01em",
  lineHeight: 1,
  borderRadius: "999px",
  textDecoration: "none",
  transition: "all 0.2s",
  color: hovered ? "#ffffff" : "rgba(255,255,255,1)",
  background: hovered
    ? "linear-gradient(180deg, #8A8A8A 0%, #A0845C 100%)"
    : "rgba(255,255,255,0.1)",
  border: "1px solid",
  borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
  whiteSpace: "nowrap",
  cursor: "pointer",
  display: "inline-block",
  boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
}}
    >
      Book a Call
    </a>
  );
}

function DropdownLink({
  href,
  icon,
  label,
  iconColor,
  font,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  iconColor: string;
  font: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...font,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 10px",
        borderRadius: "10px",
        background: hovered
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.03)",
        textDecoration: "none",
        transition: "background 0.15s",
        color: iconColor,
      }}
    >
      {icon}
      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px" }}>
        {label}
      </span>
    </a>
  );
}

function DropdownContact({
  href,
  icon,
  iconColor,
  title,
  sub,
  font,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  sub: string;
  font: React.CSSProperties;
  external?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...font,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "10px",
        background: hovered
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.03)",
        textDecoration: "none",
        transition: "background 0.15s",
        color: iconColor,
      }}
    >
      {icon}
      <div>
        <p
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: 1,
            marginBottom: "2px",
          }}
        >
          {title}
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>
          {sub}
        </p>
      </div>
    </a>
  );
}

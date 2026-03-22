"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface FallingBlock {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const BLOCK_COLORS = [
  "var(--mc-grass)", "var(--mc-dirt)", "var(--mc-stone)",
  "var(--mc-diamond)", "var(--mc-gold)", "var(--mc-emerald)", "var(--mc-wood)",
];

export default function HeroSection() {
  const [blocks, setBlocks] = useState<FallingBlock[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [xpOrbPositions, setXpOrbPositions] = useState<{ x: number; y: number; delay: number; size: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullText = "Web Developer | Open Source Contributor";

  // Generate falling blocks
  useEffect(() => {
    const generated: FallingBlock[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      size: 4 + Math.random() * 12,
      color: BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)],
    }));
    setBlocks(generated);

    // Generate XP orbs
    const orbs = Array.from({ length: 8 }, () => ({
      x: 30 + Math.random() * 40,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      size: 3 + Math.random() * 4,
    }));
    setXpOrbPositions(orbs);

    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!showContent) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [showContent]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);



  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[90vh] w-full items-center justify-center px-4 mt-10 pb-16 overflow-hidden"
    >
      {/* Falling blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blocks.map((block) => (
          <div
            key={block.id}
            className="absolute opacity-[0.08]"
            style={{
              left: `${block.x}%`,
              top: "-20px",
              width: `${block.size}px`,
              height: `${block.size}px`,
              backgroundColor: block.color,
              animation: `fallingBlock ${block.duration}s linear ${block.delay}s infinite`,
              boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>

      {/* XP Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {xpOrbPositions.map((orb, i) => (
          <div
            key={`xp-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${orb.x}%`,
              bottom: "0",
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: "var(--mc-xp)",
              boxShadow: "0 0 6px var(--mc-xp), 0 0 12px var(--mc-xp)",
              animation: `xpFloat ${4 + Math.random() * 3}s ease-in-out ${orb.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid dots */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--mc-stone) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto flex flex-col items-center relative z-10">


        {/* ===== PROFILE IMAGE AREA ===== */}
        <div className="relative mx-auto w-full max-w-md">
          <div
            className={`relative transition-all duration-700 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Desktop name */}
            <div className="hidden md:block text-center mb-6">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-t-text"
                style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.2)" }}
              >
                <span className="text-mc-grass">Naman</span>{" "}
                <span className="text-mc-diamond">Dadhich</span>
              </h1>
            </div>

            {/* Image with MC Frame + Torches */}
            <div className="relative group">
              {/* Left Torch */}
              <div className="absolute -left-10 top-1/3 z-30 hidden md:flex flex-col items-center">
                <div className="relative w-4 h-6">
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background: "linear-gradient(to top, var(--mc-gold), #ff6600, #ff3300)",
                      animation: "torchFlicker 0.5s ease-in-out infinite alternate",
                      filter: "blur(1px)",
                    }}
                  />
                  <div
                    className="absolute -inset-2 rounded-full opacity-40"
                    style={{
                      background: "radial-gradient(circle, rgba(255,165,0,0.6) 0%, transparent 70%)",
                      animation: "torchGlow 1s ease-in-out infinite alternate",
                    }}
                  />
                </div>
                <div className="w-2 h-10 bg-mc-wood" style={{ boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1)" }} />
              </div>

              {/* Right Torch */}
              <div className="absolute -right-10 top-1/3 z-30 hidden md:flex flex-col items-center">
                <div className="relative w-4 h-6">
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background: "linear-gradient(to top, var(--mc-gold), #ff6600, #ff3300)",
                      animation: "torchFlicker 0.6s ease-in-out infinite alternate",
                      filter: "blur(1px)",
                    }}
                  />
                  <div
                    className="absolute -inset-2 rounded-full opacity-40"
                    style={{
                      background: "radial-gradient(circle, rgba(255,165,0,0.6) 0%, transparent 70%)",
                      animation: "torchGlow 1.2s ease-in-out infinite alternate",
                    }}
                  />
                </div>
                <div className="w-2 h-10 bg-mc-wood" style={{ boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1)" }} />
              </div>

              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-3 border-l-3 border-mc-grass z-20" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-3 border-r-3 border-mc-grass z-20" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-3 border-l-3 border-mc-diamond z-20" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-3 border-r-3 border-mc-diamond z-20" />

              {/* Main image */}
              <div
                className="relative overflow-hidden"
                style={{
                  border: "3px solid var(--mc-stone)",
                  boxShadow:
                    "inset 2px 2px 0 rgba(255,255,255,0.15), inset -2px -2px 0 rgba(0,0,0,0.3), 4px 4px 0 rgba(0,0,0,0.4), 0 0 40px rgba(92,184,92,0.15)",
                }}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/profile.jpg"
                    alt="Portfolio background"
                    fill
                    className="object-cover"
                    priority
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                  }}
                />
              </div>

              {/* Health bar */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-0.5 z-20">
                {[...Array(10)].map((_, i) => (
                  <div key={i} style={{ animation: `heartPop 0.3s ease ${i * 0.05 + 0.5}s both` }}>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                      <path
                        d="M7 11L1.5 5.5C0 4 0 1.5 2 0.5C4 -0.5 6 1 7 2C8 1 10 -0.5 12 0.5C14 1.5 14 4 12.5 5.5L7 11Z"
                        fill="var(--mc-redstone)"
                        stroke="rgba(0,0,0,0.4)"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== PLAYER STATS BAR ===== */}
        <div
          className={`w-full max-w-md mt-12 transition-all duration-700 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div
            className="p-3"
            style={{
              background: "var(--t-surface)",
              border: "2px solid var(--t-border)",
              boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25)",
            }}
          >
            <div className="flex items-center justify-between gap-4 text-xs">
              {/* Health */}
              <div className="flex items-center gap-1.5">
                <span className="text-mc-redstone">❤️</span>
                <div className="w-16 h-2 bg-t-bg relative overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
                  <div className="h-full bg-mc-redstone" style={{ width: "100%" }} />
                </div>
                <span className="text-t-dim font-mono">20/20</span>
              </div>
              {/* Hunger */}
              <div className="flex items-center gap-1.5">
                <span>🍖</span>
                <div className="w-16 h-2 bg-t-bg relative overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
                  <div className="h-full bg-mc-wood" style={{ width: "90%" }} />
                </div>
                <span className="text-t-dim font-mono">18/20</span>
              </div>
              {/* XP */}
              <div className="flex items-center gap-1.5">
                <span className="text-mc-xp">✨</span>
                <div className="w-16 h-2 bg-t-bg relative overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
                  <div
                    className="h-full transition-all duration-[2s] ease-out"
                    style={{
                      width: showContent ? "73%" : "0%",
                      background: "var(--mc-xp)",
                      boxShadow: "0 0 4px var(--mc-xp)",
                    }}
                  />
                </div>
                <span className="text-t-dim font-mono">Lv.99</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM CONTENT ===== */}
        <div
          className={`relative mt-6 transition-all duration-700 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Mobile name */}
          <h1
            className="block md:hidden text-center text-3xl sm:text-4xl font-black uppercase tracking-wider text-t-text mb-2"
            style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}
          >
            <span className="text-mc-grass">Naman</span>{" "}
            <span className="text-mc-diamond">Dadhich</span>
          </h1>
          {/* Mobile level tag */}
          <div className="flex justify-center mb-3 md:hidden">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase"
              style={{
                background: "var(--mc-xp)",
                color: "#000",
                boxShadow: "0 0 8px var(--mc-xp)",
              }}
            >
              ⭐ Level 99
            </span>
          </div>

          {/* Typewriter */}
          <h2 className="mt-1 md:mt-2 text-center text-sm sm:text-lg font-medium uppercase tracking-[0.15em] text-mc-xp">
            {typedText}
            <span
              className={`inline-block w-[2px] h-[1em] bg-mc-xp ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"
                }`}
            />
          </h2>

          {/* XP Bar */}
          <div className="mt-3 flex justify-center">
            <div className="w-64 h-1.5 bg-t-border relative overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
              <div
                className="h-full transition-all duration-[2s] ease-out"
                style={{
                  width: showContent ? "100%" : "0%",
                  background: "var(--mc-xp)",
                  boxShadow: "0 0 8px var(--mc-xp)",
                }}
              />
            </div>
          </div>

          {/* ===== HOTBAR SOCIAL LINKS ===== */}
          <div className="mt-6 flex justify-center">
            <div
              className="flex items-center gap-0.5 p-1.5"
              style={{
                background: "var(--t-surface)",
                border: "3px solid var(--t-border)",
                boxShadow:
                  "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 3px 3px 0 rgba(0,0,0,0.3)",
              }}
            >
              {[
                { icon: "linkedin", url: "https://linkedin.com/in/namannn04", label: "LinkedIn" },
                { icon: "github", url: "https://github.com/namannn04", label: "GitHub" },
                { icon: "discord", url: "https://discord.com/users/736213483581866053", label: "Discord" },
                { icon: "twitter-x", url: "https://x.com/namannn04", label: "X" },
                { icon: "instagram", url: "https://instagram.com/namannn04", label: "Instagram" },
              ].map((social, idx) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-slot relative flex items-center justify-center w-12 h-12 transition-all duration-200 hover:scale-110 group mc-tooltip"
                  aria-label={social.label}
                  data-tooltip={social.label}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {social.icon === "linkedin" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mc-diamond transition-colors group-hover:text-[#0A66C2]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  )}
                  {social.icon === "github" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mc-grass transition-colors group-hover:text-t-text"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  )}
                  {social.icon === "discord" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-mc-diamond transition-colors group-hover:text-[#5865F2]"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8731.8914.0766.0766 0 00-.0407.1067c.3606.698.7721 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.0204 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9746 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
                  )}
                  {social.icon === "twitter-x" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-mc-grass transition-colors group-hover:text-t-text"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" /></svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mc-diamond transition-colors group-hover:text-[#E4405F]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes fallingBlock {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.08; }
          90% { opacity: 0.08; }
          100% { transform: translateY(100vh) rotate(90deg); opacity: 0; }
        }
        @keyframes xpFloat {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.8; }
          50% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes torchFlicker {
          0% { opacity: 0.7; transform: scaleY(0.9); }
          50% { opacity: 1; transform: scaleY(1.1); }
          100% { opacity: 0.8; transform: scaleY(1); }
        }
        @keyframes torchGlow {
          0% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes enchantGlint {
          0% { background-position: -100% -100%; }
          50% { background-position: 200% 200%; }
          100% { background-position: -100% -100%; }
        }
        @keyframes heartPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

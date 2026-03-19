"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function CelestialBody() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <motion.div
        initial={false}
        className="absolute h-40 w-40 sm:h-52 sm:w-52 transform-gpu"
        style={{
          top: "8vh",
          right: "8vw",
          willChange: "transform, opacity",
        }}
        animate={
          isDark
            ? {
                x: 240,
                y: 360,
                rotate: 28,
                scale: 0.78,
                opacity: 0,
              }
            : {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
              }
        }
        transition={{
          x: { type: "spring", stiffness: 95, damping: 18, mass: 0.9 },
          y: { type: "spring", stiffness: 95, damping: 18, mass: 0.9 },
          rotate: { type: "spring", stiffness: 90, damping: 16, mass: 0.85 },
          scale: { type: "spring", stiffness: 110, damping: 20, mass: 0.8 },
          opacity: { duration: 0.45, ease: "easeOut" },
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="absolute -inset-[150%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 44% 40%, rgba(255,224,120,0.26) 0%, rgba(255,214,77,0.145) 26%, rgba(255,214,77,0.075) 48%, rgba(255,214,77,0.032) 66%, rgba(255,214,77,0.01) 82%, transparent 100%)",
              filter: "blur(26px)",
              mixBlendMode: "screen",
              opacity: isDark ? 0 : 0.95,
              transition: "opacity 360ms ease-out",
            }}
          />
          <div
            className="absolute -inset-[200%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 42% 38%, rgba(255,214,77,0.085) 0%, rgba(255,214,77,0.046) 28%, rgba(255,214,77,0.022) 52%, rgba(255,214,77,0.009) 72%, rgba(255,214,77,0.003) 86%, transparent 100%)",
              mixBlendMode: "screen",
              opacity: isDark ? 0 : 0.84,
              transition: "opacity 420ms ease-out",
            }}
          />
          <svg viewBox="0 0 160 160" className="h-full w-full" shapeRendering="crispEdges">
            <rect x="44" y="44" width="72" height="72" fill="var(--mc-gold)" />
            <rect x="52" y="52" width="56" height="56" fill="#f6d56d" />
            <rect x="48" y="48" width="8" height="8" fill="#fff1b8" opacity="0.8" />
            <rect x="60" y="60" width="8" height="8" fill="#fff1b8" opacity="0.6" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        className="absolute h-36 w-36 sm:h-48 sm:w-48 transform-gpu"
        style={{
          top: "9vh",
          right: "9vw",
          willChange: "transform, opacity",
        }}
        animate={
          isDark
            ? {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
              }
            : {
                x: -240,
                y: 360,
                rotate: -28,
                scale: 0.75,
                opacity: 0,
              }
        }
        transition={{
          x: { type: "spring", stiffness: 95, damping: 18, mass: 0.9 },
          y: { type: "spring", stiffness: 95, damping: 18, mass: 0.9 },
          rotate: { type: "spring", stiffness: 90, damping: 16, mass: 0.85 },
          scale: { type: "spring", stiffness: 110, damping: 20, mass: 0.8 },
          opacity: { duration: 0.45, ease: "easeOut" },
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="absolute -inset-[150%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 44% 40%, rgba(147,226,255,0.105) 0%, rgba(125,211,252,0.058) 26%, rgba(125,211,252,0.03) 48%, rgba(125,211,252,0.013) 66%, rgba(125,211,252,0.004) 82%, transparent 100%)",
              filter: "blur(26px)",
              mixBlendMode: "screen",
              opacity: isDark ? 0.92 : 0,
              transition: "opacity 360ms ease-out",
            }}
          />
          <div
            className="absolute -inset-[200%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 42% 38%, rgba(125,211,252,0.034) 0%, rgba(125,211,252,0.018) 28%, rgba(125,211,252,0.009) 52%, rgba(125,211,252,0.0038) 72%, rgba(125,211,252,0.0012) 86%, transparent 100%)",
              mixBlendMode: "screen",
              opacity: isDark ? 0.82 : 0,
              transition: "opacity 420ms ease-out",
            }}
          />
          <svg viewBox="0 0 160 160" className="h-full w-full" shapeRendering="crispEdges">
            <rect x="42" y="42" width="76" height="76" fill="var(--mc-iron)" />
            <rect x="50" y="50" width="60" height="60" fill="#d6dbe2" />
            <rect x="56" y="56" width="10" height="10" fill="#bcc4cf" opacity="0.65" />
            <rect x="96" y="58" width="8" height="8" fill="#bcc4cf" opacity="0.6" />
            <rect x="62" y="66" width="10" height="10" fill="#bcc4cf" />
            <rect x="74" y="82" width="8" height="8" fill="#bcc4cf" />
            <rect x="94" y="88" width="10" height="10" fill="#bcc4cf" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

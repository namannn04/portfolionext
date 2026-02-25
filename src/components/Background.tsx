"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Background() {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<
    { top: number; left: number; delay: number; moveY: number }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      moveY: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-t-bg overflow-hidden">
      {/* Radial background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at center, rgba(55,0,255,0.15), transparent 70%)"
              : "radial-gradient(circle at center, rgba(20,184,166,0.08), transparent 70%)",
        }}
      />

      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-[1px] w-full"
            style={{
              top: `${i * 10}%`,
              background:
                theme === "dark"
                  ? "linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)"
                  : "linear-gradient(to right, transparent, rgba(20,184,166,0.3), transparent)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-[1px]"
            style={{
              left: `${i * 10}%`,
              background:
                theme === "dark"
                  ? "linear-gradient(to bottom, transparent, rgba(59,130,246,0.5), transparent)"
                  : "linear-gradient(to bottom, transparent, rgba(8,145,178,0.3), transparent)",
            }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {particles.map((p, index) => (
        <motion.div
          key={index}
          className="absolute h-1 w-1 rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            background:
              theme === "dark"
                ? "rgba(168,85,247,0.7)"
                : "rgba(20,184,166,0.5)",
          }}
          animate={{
            y: [0, p.moveY],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

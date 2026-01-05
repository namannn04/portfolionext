"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Background() {
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
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {/* Radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,0,255,0.15),transparent_70%)]" />

      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            style={{ top: `${i * 10}%` }}
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
            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent"
            style={{ left: `${i * 10}%` }}
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
          className="absolute h-1 w-1 rounded-full bg-purple-500"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
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

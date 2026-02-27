"use client";

import { useEffect, useState } from "react";

interface Particle {
  top: number;
  left: number;
  delay: number;
  size: number;
  color: string;
  duration: number;
}

const BLOCK_COLORS = [
  "var(--mc-grass)",
  "var(--mc-dirt)",
  "var(--mc-stone)",
  "var(--mc-diamond)",
  "var(--mc-gold)",
  "var(--mc-wood)",
];

export default function Background() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 3 + Math.random() * 5,
      color: BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)],
      duration: 6 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-t-bg overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--t-bg) 80%)",
          opacity: 0.4,
        }}
      />

      {/* Floating block particles */}
      {particles.map((p, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: 0,
            boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)`,
            animation: `xpOrb ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

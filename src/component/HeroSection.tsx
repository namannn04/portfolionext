"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const [particles, setParticles] = useState<
    { top: number; left: number; delay: number; moveY: number }[]
  >([]);
  const [isHovering, setIsHovering] = useState(false);
  const [glitchLines, setGlitchLines] = useState<
    { top: number; height: number; delay: number }[]
  >([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      moveY: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);

    // Create glitch lines
    const lines = Array.from({ length: 20 }, () => ({
      top: Math.random() * 100,
      height: 1 + Math.random() * 5,
      delay: Math.random() * 0.5,
    }));
    setGlitchLines(lines);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-10 px-4 sm:px-6 md:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,0,255,0.15),transparent_70%)]" />

      {/* Diagonal lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"
            style={{ top: `${i * 10}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
            style={{ left: `${i * 10}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="z-10 flex flex-col items-center">
        {/* Main image container with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 flex h-[60vh] sm:h-[70vh] md:h-[80vh] w-auto items-center justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Outer glow that intensifies on hover */}
          <motion.div
            className="absolute -inset-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 opacity-30 blur-xl"
            animate={
              isHovering
                ? {
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.05, 1],
                    background: [
                      "radial-gradient(circle at center, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4))",
                      "radial-gradient(circle at center, rgba(236, 72, 153, 0.5), rgba(34, 211, 238, 0.5))",
                      "radial-gradient(circle at center, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4))",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Animated border elements */}
          <motion.div
            className="absolute -inset-1 rounded-xl border-2 border-teal-500/50 overflow-hidden"
            animate={
              isHovering
                ? {
                    borderColor: [
                      "rgba(168, 85, 247, 0.5)",
                      "rgba(236, 72, 153, 0.7)",
                      "rgba(168, 85, 247, 0.5)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            {/* Animated border light effect */}
            {isHovering && (
              <motion.div
                className="absolute h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ left: "-30%" }}
                animate={{ left: "130%" }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.5,
                }}
              />
            )}
          </motion.div>

          <motion.div
            className="absolute -inset-2 rounded-xl border border-cyan-500/30"
            animate={
              isHovering
                ? {
                    borderColor: [
                      "rgba(59, 130, 246, 0.3)",
                      "rgba(34, 211, 238, 0.5)",
                      "rgba(59, 130, 246, 0.3)",
                    ],
                    rotate: [0, 0.5, 0, -0.5, 0],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Corner elements with more dramatic animation */}
          <motion.div
            className="absolute -bottom-3 -left-3 h-16 w-16 sm:h-20 sm:w-20 border-b-2 border-l-2 border-teal-500"
            animate={
              isHovering
                ? {
                    x: [0, -5, 0],
                    y: [0, 5, 0],
                    borderColor: [
                      "rgb(168, 85, 247)",
                      "rgb(59, 130, 246)",
                      "rgb(168, 85, 247)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
            }}
          />
          <motion.div
            className="absolute -right-3 -top-3 h-16 w-16 sm:h-20 sm:w-20 border-r-2 border-t-2 border-cyan-500"
            animate={
              isHovering
                ? {
                    x: [0, 5, 0],
                    y: [0, -5, 0],
                    borderColor: [
                      "rgb(59, 130, 246)",
                      "rgb(168, 85, 247)",
                      "rgb(59, 130, 246)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Main image */}
          <div
            ref={imageRef}
            className="relative h-full w-auto overflow-hidden"
          >
            {/* Holographic overlay that follows mouse */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 z-20 bg-gradient-to-r from-cyan-500/10 via-teal-500/20 to-pink-500/10"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.1), transparent 70%)`,
                  mixBlendMode: "screen",
                }}
              />
            )}

            {/* Digital noise effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 z-20 mix-blend-overlay opacity-20"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
                  backgroundSize: "cover",
                }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              />
            )}

            {/* Glitch lines that appear on hover */}
            {isHovering &&
              glitchLines.map((line, index) => (
                <motion.div
                  key={`glitch-${index}`}
                  className="absolute left-0 w-full bg-cyan-400 mix-blend-screen"
                  style={{
                    top: `${line.top}%`,
                    height: `${line.height}px`,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: ["-100%", "100%"],
                    scaleY: [1, Math.random() * 3 + 1, 1],
                  }}
                  transition={{
                    duration: 0.2 + Math.random() * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1 + Math.random() * 2,
                    delay: line.delay,
                  }}
                />
              ))}

            {/* Pixel sorting effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, transparent, transparent)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "0 0",
                  mixBlendMode: "difference",
                }}
                animate={{
                  backgroundImage: [
                    "linear-gradient(to bottom, transparent, transparent)",
                    "linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(255,255,255,0.2) 20.5%, rgba(0,0,0,0) 21%, rgba(0,0,0,0) 30%, rgba(255,255,255,0.2) 30.5%, rgba(0,0,0,0) 31%, rgba(0,0,0,0) 60%, rgba(255,255,255,0.2) 60.5%, rgba(0,0,0,0) 61%, rgba(0,0,0,0) 75%, rgba(255,255,255,0.2) 75.5%, rgba(0,0,0,0) 76%, rgba(0,0,0,0) 100%)",
                    "linear-gradient(to bottom, transparent, transparent)",
                  ],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              />
            )}

            {/* RGB split effect on hover - more extreme */}
            {isHovering && (
              <>
                <motion.div
                  className="absolute inset-0 bg-red-500/40 mix-blend-screen"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{
                    x: [0, -15, 0, -8, 0],
                    y: [0, 5, 0, -3, 0],
                    opacity: [0, 0.7, 0.3, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1.5,
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-green-500/40 mix-blend-screen"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{
                    x: [0, 5, 0, -5, 0],
                    y: [0, -5, 0, 5, 0],
                    opacity: [0, 0.7, 0.3, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1.5,
                    delay: 0.05,
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-cyan-500/40 mix-blend-screen"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{
                    x: [0, 15, 0, 8, 0],
                    y: [0, 3, 0, -5, 0],
                    opacity: [0, 0.7, 0.3, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1.5,
                    delay: 0.1,
                  }}
                />
              </>
            )}

            {/* Image distortion effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 z-10"
                style={{
                  backdropFilter: "blur(0px)",
                  WebkitBackdropFilter: "blur(0px)",
                }}
                animate={{
                  backdropFilter: [
                    "blur(0px) hue-rotate(0deg)",
                    "blur(1px) hue-rotate(15deg)",
                    "blur(0px) hue-rotate(0deg)",
                    "blur(2px) hue-rotate(-15deg)",
                    "blur(0px) hue-rotate(0deg)",
                  ],
                  WebkitBackdropFilter: [
                    "blur(0px) hue-rotate(0deg)",
                    "blur(1px) hue-rotate(15deg)",
                    "blur(0px) hue-rotate(0deg)",
                    "blur(2px) hue-rotate(-15deg)",
                    "blur(0px) hue-rotate(0deg)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}

            {/* Main image */}
            <Image
              src="/profile.jpg"
              alt="Naman Dadhich"
              width={600}
              height={800}
              className="h-full w-auto object-cover"
              priority
            />

            {/* Scan line effect - enhanced for hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
              animate={{
                y: ["-100%", "200%"],
                opacity: isHovering ? [0.1, 0.3, 0.1] : 0.1,
              }}
              transition={{
                y: {
                  duration: isHovering ? 2 : 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                opacity: {
                  duration: 1,
                  repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                },
              }}
              style={{ height: "50%" }}
            />

            {/* VHS tracking lines effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 z-10 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                  backgroundSize: "100% 4px",
                  backgroundRepeat: "repeat",
                  mixBlendMode: "overlay",
                }}
                animate={{
                  backgroundPosition: ["0px 0px", "0px 100px"],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            )}

            {/* Data corruption effect */}
            {isHovering && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-cyan-500/50 to-transparent z-20 mix-blend-screen"
                animate={{
                  height: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              />
            )}
          </div>

          {/* Floating data particles that appear on hover */}
          {isHovering &&
            [...Array(15)].map((_, i) => (
              <motion.div
                key={`data-particle-${i}`}
                className="absolute rounded-full bg-white mix-blend-screen"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -(Math.random() * 100 + 50)],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
        </motion.div>

        {/* Name with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Naman Dadhich
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500"
              />
            </span>
          </h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 md:mt-5 text-center text-sm sm:text-lg md:text-xl font-medium uppercase tracking-[0.2em] text-cyan-400"
          >
            Web Developer
          </motion.h2>
        </motion.div>
      </div>

      {/* Floating particles */}
      {particles.map((p, index) => (
        <motion.div
          key={index}
          className="absolute h-1 w-1 rounded-full bg-teal-500"
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
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </section>
  );
}

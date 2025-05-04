"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Add this at the beginning of your component
export default function HeroSection() {
  // Add this useEffect for smooth transitions
  useEffect(() => {
    // Add a style element for smooth transitions
    const style = document.createElement("style");
    style.textContent = `
      .smooth-hover {
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out, background 0.5s ease-in-out, border-color 0.5s ease-in-out !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [particles, setParticles] = useState<
    { top: number; left: number; delay: number; moveY: number }[]
  >([]);
  const [isHovering, setIsHovering] = useState(false);
  const [glitchLines, setGlitchLines] = useState<{ top: number; height: number; delay: number }[]>([]);
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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden sm:pt-10 px-4 sm:px-6 md:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,0,255,0.15),transparent_70%)]" />

      {/* Diagonal lines */}
      {/* <div className="absolute inset-0 overflow-hidden opacity-20">
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
      </div> */}

      <div className="z-10 mt-5 flex flex-col items-center">
        {/* Main image container with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 flex h-[60vh] sm:h-[70vh] md:h-[80vh] w-auto items-center justify-center smooth-hover"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Outer glow that intensifies on hover */}
          <motion.div
            className="absolute -inset-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 opacity-30 blur-xl smooth-hover"
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
              ease: "easeInOut",
            }}
          />

          {/* Animated border elements */}
          <motion.div
            className="absolute -inset-1 rounded-xl border-2 border-teal-500/50 overflow-hidden smooth-hover"
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
              ease: "easeInOut",
            }}
          >
            {/* Animated border light effect */}
            <motion.div
              className="absolute h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 smooth-hover"
              initial={{ left: "-30%" }}
              animate={{ left: "130%" }}
              style={{ opacity: isHovering ? 1 : 0 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
              }}
            />
          </motion.div>

          <motion.div
            className="absolute -inset-2 rounded-xl border border-cyan-500/30 smooth-hover"
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
              ease: "easeInOut",
            }}
          />

          {/* Corner elements with more dramatic animation */}
          <motion.div
            className="absolute -bottom-3 -left-3 h-16 w-16 sm:h-20 sm:w-20 border-b-2 border-l-2 border-teal-500 smooth-hover"
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
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-3 -top-3 h-16 w-16 sm:h-20 sm:w-20 border-r-2 border-t-2 border-cyan-500 smooth-hover"
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
              ease: "easeInOut",
            }}
          />

          {/* Main image */}
          <div
            ref={imageRef}
            className="relative h-full w-auto overflow-hidden"
          >
            {/* Holographic overlay that follows mouse */}
            <motion.div
              className="absolute inset-0 z-20 bg-gradient-to-r from-cyan-500/10 via-teal-500/20 to-pink-500/10 smooth-hover"
              style={{
                background: isHovering
                  ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.1), transparent 70%)`
                  : undefined, // या कोई स्थिर डिफ़ॉल्ट बैकग्राउंड
                mixBlendMode: "screen",
                opacity: isHovering ? 1 : 0,
              }}
            />

            {/* Digital noise effect */}
            <motion.div
              className="absolute inset-0 z-20 mix-blend-overlay opacity-20 smooth-hover"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
                backgroundSize: "cover",
                opacity: isHovering ? 1 : 0,
              }}
              animate={{ opacity: isHovering ? [0.1, 0.3, 0.1] : 0 }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Glitch lines that appear on hover */}
            {glitchLines.map((line, index) => (
              <motion.div
                key={`glitch-${index}`}
                className="absolute left-0 w-full bg-cyan-400 mix-blend-screen smooth-hover"
                style={{
                  top: `${line.top}%`,
                  height: `${line.height}px`,
                  opacity: isHovering ? 0 : 0,
                }}
                animate={{
                  opacity: isHovering ? [0, 0.7, 0] : 0,
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
            <motion.div
              className="absolute inset-0 z-10 smooth-hover"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, transparent, transparent)",
                backgroundSize: "100% 100%",
                backgroundPosition: "0 0",
                mixBlendMode: "difference",
                opacity: isHovering ? 1 : 0,
              }}
              animate={{
                backgroundImage: isHovering
                  ? [
                      "linear-gradient(to bottom, transparent, transparent)",
                      "linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(255,255,255,0.2) 20.5%, rgba(0,0,0,0) 21%, rgba(0,0,0,0) 30%, rgba(255,255,255,0.2) 30.5%, rgba(0,0,0,0) 31%, rgba(0,0,0,0) 60%, rgba(255,255,255,0.2) 60.5%, rgba(0,0,0,0) 61%, rgba(0,0,0,0) 75%, rgba(255,255,255,0.2) 75.5%, rgba(0,0,0,0) 76%, rgba(0,0,0,0) 100%)",
                      "linear-gradient(to bottom, transparent, transparent)",
                    ]
                  : "linear-gradient(to bottom, transparent, transparent)",
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            />

            {/* RGB split effect on hover - more extreme */}
            <motion.div
              className="absolute inset-0 bg-red-500/40 mix-blend-screen smooth-hover"
              style={{ opacity: isHovering ? 0 : 0 }}
              animate={{
                x: isHovering ? [0, -15, 0, -8, 0] : 0,
                y: isHovering ? [0, 5, 0, -3, 0] : 0,
                opacity: isHovering ? [0, 0.7, 0.3, 0.5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-green-500/40 mix-blend-screen smooth-hover"
              style={{ opacity: isHovering ? 0 : 0 }}
              animate={{
                x: isHovering ? [0, 5, 0, -5, 0] : 0,
                y: isHovering ? [0, -5, 0, 5, 0] : 0,
                opacity: isHovering ? [0, 0.7, 0.3, 0.5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
                delay: 0.05,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-cyan-500/40 mix-blend-screen smooth-hover"
              style={{ opacity: isHovering ? 0 : 0 }}
              animate={{
                x: isHovering ? [0, 15, 0, 8, 0] : 0,
                y: isHovering ? [0, 3, 0, -5, 0] : 0,
                opacity: isHovering ? [0, 0.7, 0.3, 0.5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
                delay: 0.1,
                ease: "easeInOut",
              }}
            />

            {/* Image distortion effect */}
            <motion.div
              className="absolute inset-0 z-10 smooth-hover"
              style={{
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                opacity: isHovering ? 1 : 0,
              }}
              animate={{
                backdropFilter: isHovering
                  ? [
                      "blur(0px) hue-rotate(0deg)",
                      "blur(1px) hue-rotate(15deg)",
                      "blur(0px) hue-rotate(0deg)",
                      "blur(2px) hue-rotate(-15deg)",
                      "blur(0px) hue-rotate(0deg)",
                    ]
                  : "blur(0px) hue-rotate(0deg)",
                WebkitBackdropFilter: isHovering
                  ? [
                      "blur(0px) hue-rotate(0deg)",
                      "blur(1px) hue-rotate(15deg)",
                      "blur(0px) hue-rotate(0deg)",
                      "blur(2px) hue-rotate(-15deg)",
                      "blur(0px) hue-rotate(0deg)",
                    ]
                  : "blur(0px) hue-rotate(0deg)",
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

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
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent smooth-hover"
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
                  ease: "easeInOut",
                },
              }}
              style={{ height: "50%" }}
            />

            {/* VHS tracking lines effect */}
            <motion.div
              className="absolute inset-0 z-10 opacity-30 smooth-hover"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                backgroundSize: "100% 4px",
                backgroundRepeat: "repeat",
                mixBlendMode: "overlay",
                opacity: isHovering ? 1 : 0,
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

            {/* Data corruption effect */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-cyan-500/50 to-transparent z-20 mix-blend-screen smooth-hover"
              style={{ opacity: isHovering ? 1 : 0 }}
              animate={{
                height: isHovering ? ["0%", "100%", "0%"] : "0%",
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating data particles that appear on hover */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`data-particle-${i}`}
              className="absolute rounded-full bg-white mix-blend-screen smooth-hover"
              style={{ opacity: 0 }}
              animate={{
                width: isHovering ? Math.random() * 3 + 1 : 0,
                height: isHovering ? Math.random() * 3 + 1 : 0,
                left: isHovering ? `${Math.random() * 100}%` : `${Math.random() * 100}%`,
                top: isHovering ? `${Math.random() * 100}%` : `${Math.random() * 100}%`,
                y: isHovering ? [0, -(Math.random() * 100 + 50)] : 0,
                opacity: isHovering ? [0, 0.8, 0] : 0,
                scale: isHovering ? [0, 1, 0] : 0,
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
            className="mt-2 md:mt-5 text-center text-sm sm:text-lg md:text-lg font-medium uppercase tracking-[0.2em] text-cyan-400"
          >
            Web Developer | Open Source Contributor
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 flex justify-center space-x-5"
          >
            {[
              {
                icon: "linkedin",
                url: "https://linkedin.com",
                label: "LinkedIn",
              },
              { icon: "github", url: "https://github.com", label: "GitHub" },
              { icon: "discord", url: "https://discord.com", label: "Discord" },
              { icon: "twitter-x", url: "https://x.com", label: "X (Twitter)" },
              {
                icon: "instagram",
                url: "https://instagram.com",
                label: "Instagram",
              },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform duration-300 hover:scale-110"
                aria-label={social.label}
              >
                {social.icon === "linkedin" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-500 transition-colors duration-300 ease-in-out group-hover:text-[#0A66C2]"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                )}
                {social.icon === "github" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-500 transition-colors duration-300 ease-in-out group-hover:text-[#181717]"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                )}
                {social.icon === "discord" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-500 transition-colors duration-300 ease-in-out group-hover:text-[#5865F2]"
                  >
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <path d="M7.5 7.2c.3-.2.5-.2.8-.3a12.5 12.5 0 0 1 7.4 0c.3 0 .5.2.8.3 1 .4 1.9 1 2.6 1.7.9 1 1.6 2 2 3.3.4 1.3.6 2.7.7 4a13 13 0 0 1-.7 4c-.4 1.2-1.1 2.3-2 3.2-.7.7-1.6 1.3-2.6 1.7-.3.1-.5.2-.8.3a12.5 12.5 0 0 1-7.4 0c-.3 0-.5-.2-.8-.3a9.9 9.9 0 0 1-2.6-1.7c-.9-1-1.6-2-2-3.2a13 13 0 0 1-.7-4c0-1.3.3-2.7.7-4 .4-1.2 1.1-2.3 2-3.3.7-.7 1.6-1.3 2.6-1.7Z" />
                    <path d="m15.5 17 2 2c.5-1.5 1-3 1.5-4.5.5-1.5.5-3 .5-4.5 0-1.5-.5-3-1-4.5" />
                    <path d="m8.5 17-2 2c-.5-1.5-1-3-1.5-4.5-.5-1.5-.5-3-.5-4.5 0-1.5.5-3 1-4.5" />
                  </svg>
                )}
                {social.icon === "twitter-x" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-cyan-500 transition-colors duration-300 ease-in-out group-hover:text-[#000000]"
                  >
                    <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                  </svg>
                )}
                {social.icon === "instagram" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-500 transition-colors duration-300 ease-in-out group-hover:text-[#E4405F]"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                )}
              </a>
            ))}
          </motion.div>
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

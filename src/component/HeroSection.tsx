"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  // Add this useEffect for smooth transitions
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .smooth-hover {
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out, border-color 0.5s ease-in-out !important;
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
    <section className="flex min-h-[80vh] w-full items-center justify-center px-4 py-16">
      <div className="container mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            perspective: "1000px",
          }}
        >
          <div
            className="relative"
            style={{
              transform: isHovered
                ? "perspective(1000px) rotateX(25deg) scaleY(0.9)"
                : "perspective(1000px) rotateX(0deg) scaleY(1)",
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              transition: "transform 0.5s ease-out",
            }}
          >
            <motion.div
              className="absolute -inset-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 opacity-30 blur-xl smooth-hover"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1],
                background: [
                  "radial-gradient(circle at center, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4))",
                  "radial-gradient(circle at center, rgba(236, 72, 153, 0.5), rgba(34, 211, 238, 0.5))",
                  "radial-gradient(circle at center, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -inset-1 rounded-xl border-2 border-teal-500/50 overflow-hidden smooth-hover"
              animate={{
                borderColor: [
                  "rgba(168, 85, 247, 0.5)",
                  "rgba(236, 72, 153, 0.7)",
                  "rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* Animated border light effect */}
              <motion.div
                className="absolute h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 smooth-hover"
                initial={{ left: "-30%" }}
                animate={{ left: "130%" }}
                style={{ opacity: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.5,
                }}
              />
            </motion.div>
            {/* Outer decorative container that transforms with the card */}
            {/* Main container */}
            <div
              className="relative overflow-hidden rounded-xl border-2 border-cyan-500/50"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 30px 90px -5px rgba(20, 184, 166, 0.3), 0 0 15px rgba(6, 182, 212, 0.5)",
              }}
            >
              {/* Main image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/profile.jpg"
                  alt="Portfolio hero image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Decorative elements that are part of the 3D transform */}
            <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -right-4 -top-4 h-20 w-20 border-r-2 border-t-2 border-cyan-400" />
            <div className="absolute -bottom-2 right-10 h-6 w-20 border-b-2 border-teal-400 opacity-70" />
            <div className="absolute -top-2 left-10 h-6 w-20 border-t-2 border-teal-400 opacity-70" />
          </div>

          {/* Overlay image that is permanently visible */}
          <div
            className="absolute inset-0 overflow-hidden rounded-xl transition-all duration-500 ease-out"
            style={{
              zIndex: 10,
              opacity: 1, // Always visible
              transform: isHovered
                ? "translateY(calc(25deg * 0.1 * 100%)) scale(1.05)"
                : "scale(1)", // Adjust position based on tilt angle
              transformOrigin: "bottom center", // Match the same origin as the tilting card
              transition: "transform 0.5s ease-out, box-shadow 0.5s ease-out",
            }}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/profileBG.png"
                alt="Portfolio overlay image"
                fill
                className="object-cover shadow-xl"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-16"
        >
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white">
            <motion.span
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <span className="relative z-10 text-teal-400">
                Naman <span className="text-cyan-400">Dadhich</span>
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500"
              />
            </motion.span>
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
            ].map((social, index) => (
              <motion.a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform duration-300 hover:scale-110"
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
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
                    className="text-cyan-500 transition-colors duration-300 ease-in-out group-hover:text-[#424141]"
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
                    fill="currentColor"
                    stroke="currentColor"
                    className="text-teal-500 transition-colors duration-300 ease-in-out group-hover:text-[#5865F2]"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8731.8914a.0766.0766 0 00-.0407.1067c.3606.698.7721 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.0204 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9746 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                )}
                {social.icon === "twitter-x" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-cyan-500 transition-colors duration-300 ease-in-out group-hover:text-[#424141]"
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
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -bottom-10 left-1/4 h-20 w-1 border-l-2 border-cyan-500/30"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 80, opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        <motion.div
          className="absolute -bottom-5 right-1/4 h-10 w-1 border-l-2 border-teal-500/30"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
        <motion.div
          className="absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-cyan-500/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        />
        <motion.div
          className="absolute top-20 right-20 h-10 w-10 border-t-2 border-r-2 border-teal-500/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        />
      </div>
    </section>
  );
}

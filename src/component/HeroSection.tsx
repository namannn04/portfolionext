"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  const [particles, setParticles] = useState<
    { top: number; left: number; delay: number; moveY: number }[]
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      moveY: Math.random() * 100 - 50,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-10 bg-black px-4 sm:px-6 md:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,0,255,0.15),transparent_70%)]" />

      {/* Diagonal lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
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
            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent"
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
        >
          <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur-xl" />
          <div className="absolute -inset-1 rounded-xl border-2 border-purple-500/50" />
          <div className="absolute -inset-2 rounded-xl border border-blue-500/30" />
          <div className="absolute -bottom-3 -left-3 h-16 w-16 sm:h-20 sm:w-20 border-b-2 border-l-2 border-purple-500" />
          <div className="absolute -right-3 -top-3 h-16 w-16 sm:h-20 sm:w-20 border-r-2 border-t-2 border-blue-500" />

          {/* Main image */}
          <div className="relative h-full w-auto overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Naman Dadhich"
              width={600}
              height={800}
              className="h-full w-auto object-cover"
              priority
            />

            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ height: "50%" }}
            />
          </div>
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
              <span className="relative z-10 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Naman Dadhich
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </span>
          </h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 text-center text-sm sm:text-lg md:text-xl font-medium uppercase tracking-[0.2em] text-blue-400"
          >
            Web Developer
          </motion.h2>
        </motion.div>
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
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </section>
  )
}

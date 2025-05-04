"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  Code,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Star,
  Clock,
  Award,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/component/Navbar";

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  color: string;
  image?: string;
  icon: React.ReactNode;
}

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExperience, setActiveExperience] = useState<number>(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [backgroundYValue, setBackgroundYValue] = useState<number>(0);
  const [parallaxYValue, setParallaxYValue] = useState<number>(0);
  const [lineYValues, setLineYValues] = useState<number[]>([0, 0, 0]);
  const [lineXValues, setLineXValues] = useState<number[]>([0, 0]);
  const [particleYValues, setParticleYValues] = useState<number[]>(
    Array(15).fill(0)
  );

  useEffect(() => {
    scrollYProgress.onChange((value) => {
      setBackgroundYValue(Number.parseFloat((value * 100).toFixed(2)));
      setParallaxYValue(Number.parseFloat((value * 30).toFixed(2)));
      setLineYValues([
        Number.parseFloat((value * 10 * 0).toFixed(2)),
        Number.parseFloat((value * 10 * -1).toFixed(2)),
        Number.parseFloat((value * 10 * 0).toFixed(2)),
      ]);
      setLineXValues([
        Number.parseFloat((value * 10 * 0).toFixed(2)),
        Number.parseFloat((value * 10 * -1).toFixed(2)),
      ]);
    });
  }, [scrollYProgress]);

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description:
        "Led the frontend development team in building a modern SaaS platform using Next.js and TypeScript. Implemented CI/CD pipelines and improved performance by 40%. Collaborated with designers to create a cohesive user experience across the platform. Mentored junior developers and conducted code reviews to maintain high code quality standards.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "CI/CD",
        "Team Leadership",
        "Performance Optimization",
      ],
      color: "teal",
      image: "/placeholder.svg?height=400&width=800",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Web Developer",
      company: "Pears Global Hackathon",
      period: "2025",
      description:
        "Developed and maintained multiple client projects using React, Node.js, and MongoDB. Collaborated with design teams to implement responsive UI components. Participated in a 48-hour hackathon and secured second place with an innovative solution for sustainable urban mobility. Implemented real-time data visualization using D3.js and Socket.io.",
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "UI/UX",
        "Real-time Data",
        "Responsive Design",
      ],
      color: "cyan",
      image: "/placeholder.svg?height=400&width=800",
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Web Developer",
      company: "Code Kshetra 2.0",
      period: "2024 - 2025",
      description:
        "I had the privilege of participating in a prestigious national-level hackathon organized by Geek Room (MSIT). During the event, I worked on a website using React.js, which proved to be an incredible learning experience. Collaborating with a talented team and overcoming challenges together made this journey truly unforgettable. We developed an accessibility-focused web application that received recognition for its innovative approach to inclusive design.",
      skills: [
        "HTML/CSS",
        "JavaScript",
        "WordPress",
        "PHP",
        "Accessibility",
        "Team Collaboration",
      ],
      color: "blue",
      image: "/placeholder.svg?height=400&width=800",
      icon: <Star className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Web Developer",
      company: "Code Cubicle 3.0",
      period: "2024",
      description:
        "It was one of the major hackathons organized by Geek Room (MSIT), and I had the opportunity to work with their team. I worked on a website using Next.js, which provided a great learning experience. Collaborating with talented individuals and tackling challenges together made it a memorable event. Our project focused on creating an educational platform that leveraged AI to personalize learning experiences for students with different learning styles.",
      skills: [
        "Figma",
        "HTML/CSS",
        "UI/UX",
        "Photoshop",
        "Next.js",
        "AI Integration",
      ],
      color: "purple",
      image: "/placeholder.svg?height=400&width=800",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  // Handle mouse movement for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextExperience = () => {
    setActiveExperience((prev) => (prev === experiences.length ? 1 : prev + 1));
  };

  const prevExperience = () => {
    setActiveExperience((prev) => (prev === 1 ? experiences.length : prev - 1));
  };

  const currentExperience =
    experiences.find((exp) => exp.id === activeExperience) || experiences[0];

  return (
    <div className="sm:block sm:py-20 bg-black">
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>
      <div className="relative overflow-hidden min-h-screen sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-6">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base layer */}
          <div className="absolute inset-0 bg-[#050505]"></div>

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${
                mousePosition.x * 100
              }% ${mousePosition.y * 100}%, 
                rgba(20,184,166,0.15), 
                rgba(8,145,178,0.1), 
                rgba(0,0,0,0))`,
              y: `${backgroundYValue}%`,
            }}
          />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDMwaDMwVjBoLTMwdjMwek0wIDMwaDMwVjBoLTMwdjMwek0wIDYwaDMwVjMwaC0zMHYzMHpNMzAgNjBoMzBWMzBoLTMwdjMweiIgZmlsbD0iIzIyMjIyMiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

          {/* Glowing lines */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`h-line-${i}`}
                className="absolute h-[1px] w-full"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${
                    i % 2 === 0 ? "rgba(20,184,166,0.3)" : "rgba(8,145,178,0.3)"
                  } 50%, transparent 100%)`,
                  top: `${20 + i * 30}%`,
                  opacity: 0.4,
                  y: lineYValues[i],
                }}
              />
            ))}

            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`v-line-${i}`}
                className="absolute w-[1px] h-full"
                style={{
                  background: `linear-gradient(0deg, transparent 0%, ${
                    i % 2 === 0 ? "rgba(20,184,166,0.3)" : "rgba(8,145,178,0.3)"
                  } 50%, transparent 100%)`,
                  left: `${30 + i * 40}%`,
                  opacity: 0.4,
                  x: lineXValues[i],
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  background:
                    i % 2 === 0
                      ? "rgba(20,184,166,0.6)"
                      : "rgba(8,145,178,0.6)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow:
                    i % 2 === 0
                      ? "0 0 10px rgba(20,184,166,0.6)"
                      : "0 0 10px rgba(8,145,178,0.6)",
                  opacity: Math.random() * 0.5 + 0.2,
                  filter: "blur(1px)",
                  y: particleYValues[i],
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header with glass effect */}
          <div className="mb-16 relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-8 md:p-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500"></div>
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-teal-500 to-cyan-500"></div>
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-teal-500 to-cyan-500"></div>

            <Link
              href="/"
              className="inline-flex items-center text-zinc-400 hover:text-cyan-400 transition-colors z-20 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400">
                    My Experience
                  </span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mt-4"></div>
                <p className="text-zinc-400 mt-6 max-w-2xl text-lg">
                  A journey through my professional career, showcasing the
                  projects and roles that have shaped my expertise in web
                  development.
                </p>
              </div>

              <motion.div
                className="mt-6 md:mt-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:opacity-90"></span>
                  <span className="relative z-10 flex items-center text-white font-medium">
                    Download Resume
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-teal-500/10 blur-xl"></div>
          </div>

          {/* 3D Timeline Experience Showcase */}
          <div ref={containerRef} className="relative mt-20">
            {/* Premium Timeline Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-16"
            >
              <div className="relative w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent rounded-full overflow-hidden">
                {/* Glowing progress indicator */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(20,184,166,0.8) 0%, rgba(8,145,178,0.8) 100%)",
                    boxShadow: "0 0 20px rgba(20,184,166,0.6)",
                    width: `${(activeExperience / experiences.length) * 100}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(activeExperience / experiences.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>

                {/* Timeline nodes with hover effects */}
                {experiences.map((exp) => (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActiveExperience(exp.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{
                      left: `calc(${
                        ((exp.id - 1) / (experiences.length - 1)) * 100
                      }%)`,
                      zIndex: 20,
                    }}
                    aria-label={`View ${exp.title} experience`}
                  >
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-300 z-10
                      ${
                        activeExperience === exp.id
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-[0_0_15px_rgba(20,184,166,0.7)]"
                          : "bg-zinc-900 border border-zinc-700 hover:border-teal-500/50"
                      }
                    `}
                    >
                      <div
                        className={`
                        text-white
                        ${
                          activeExperience === exp.id
                            ? "opacity-100"
                            : "opacity-70"
                        }
                      `}
                      >
                        {exp.icon}
                      </div>
                    </div>

                    {/* Year label */}
                    <div
                      className={`
                      absolute -bottom-8 whitespace-nowrap text-sm font-medium
                      transition-all duration-300
                      ${
                        activeExperience === exp.id
                          ? "text-teal-400"
                          : "text-zinc-500"
                      }
                    `}
                    >
                      {exp.period.split(" - ")[0]}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Experience Card with premium glass effect */}
            <div className="relative mx-auto max-w-5xl perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience}
                  initial={{ opacity: 0, rotateX: 10, y: 20 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -10, y: -20 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_20px_80px_-10px_rgba(8,145,178,0.2)]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(15,15,15,0.9) 0%, rgba(10,10,10,0.95) 100%)",
                    border: "1px solid rgba(20,184,166,0.1)",
                  }}
                >
                  <div className="flex flex-col">
                    {/* Image section with parallax effect - now in landscape format */}
                    <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-xl">
                      <motion.div
                        className="absolute inset-0 z-0"
                        style={{ y: parallaxYValue }}
                      >
                        {currentExperience.image && (
                          <Image
                            src={currentExperience.image || "/placeholder.svg"}
                            alt={currentExperience.title}
                            fill
                            className="object-cover mix-blend-luminosity opacity-60"
                          />
                        )}
                      </motion.div>

                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 z-1 mix-blend-overlay"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/30 to-[#050505] z-2"></div>

                      {/* Glowing accent lines */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                      {/* Floating period badge with glow effect */}
                      <motion.div
                        className="absolute top-6 right-6 z-20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div
                          className="px-4 py-2 backdrop-blur-md rounded-lg border border-teal-500/20 inline-block"
                          style={{ background: "rgba(0,0,0,0.6)" }}
                        >
                          <p className="text-teal-400 font-medium">
                            {currentExperience.period}
                          </p>
                        </div>
                      </motion.div>

                      {/* Title overlay on image */}
                      <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <h3 className="text-3xl font-bold mb-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                              {currentExperience.title}
                            </span>
                          </h3>
                          <p className="text-cyan-400 text-lg flex items-center">
                            <span className="inline-block w-4 h-[2px] bg-cyan-500 mr-3"></span>
                            {currentExperience.company}
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Content section with staggered animations */}
                    <div className="p-8">
                      <motion.p
                        className="text-zinc-300 mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {currentExperience.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <span className="inline-block w-4 h-[2px] bg-teal-500 mr-3"></span>
                          Skills & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentExperience.skills.map((skill, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.3 + i * 0.05,
                                ease: "easeOut",
                              }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(20,184,166,0.1)",
                                borderColor: "rgba(20,184,166,0.3)",
                              }}
                              className="px-3 py-1 bg-zinc-800/50 rounded-md text-zinc-300 text-sm border border-zinc-700/50 transition-all duration-300"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Premium navigation buttons */}
              <motion.button
                onClick={prevExperience}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1/2 -translate-y-1/2 -left-5 md:-left-8 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center text-zinc-300 transition-all z-20"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(20,184,166,0.2)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                }}
                aria-label="Previous experience"
              >
                <ChevronLeft className="w-5 h-5 text-teal-400" />
              </motion.button>

              <motion.button
                onClick={nextExperience}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1/2 -translate-y-1/2 -right-5 md:-right-8 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center text-zinc-300 transition-all z-20"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(20,184,166,0.2)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                }}
                aria-label="Next experience"
              >
                <ChevronRight className="w-5 h-5 text-teal-400" />
              </motion.button>
            </div>

            {/* Experience counter with premium styling */}
            <motion.div
              className="text-center mt-8 text-zinc-400 font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-teal-400 font-medium">
                {activeExperience.toString().padStart(2, "0")}
              </span>
              <span className="mx-2 text-zinc-600">/</span>
              <span className="text-zinc-500">
                {experiences.length.toString().padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {/* Bottom navigation with premium styling */}
          <motion.div
            className="mt-24 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/roles">
              <Button
                variant="outline"
                className="relative overflow-hidden group border-zinc-800 hover:border-cyan-500/50 bg-transparent"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center">
                  View My Roles & Responsibilities
                  <Code className="ml-2 h-4 w-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

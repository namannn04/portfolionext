"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Code,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
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
}

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExperience, setActiveExperience] = useState<number>(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      image: "/placeholder.svg?height=400&width=600",
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
      image: "/placeholder.svg?height=400&width=600",
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
      image: "/placeholder.svg?height=400&width=600",
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
      image: "/placeholder.svg?height=400&width=600",
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
    <div className="sm:block pt-20 bg-black">
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>
      <div className="relative overflow-hidden min-h-screen sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-6">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black"
            style={{ y: backgroundY }}
          />

          {/* Dynamic gradient background that follows mouse */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${
                mousePosition.x * 100
              }% ${
                mousePosition.y * 100
              }%, rgba(20,184,166,0.3), rgba(8,145,178,0.2), rgba(0,0,0,0))`,
              transition: "background 0.3s ease",
            }}
          />

          {/* Animated gradient lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"
                style={{
                  top: `${15 + i * 20}%`,
                  left: 0,
                  opacity: 0.6 - i * 0.1,
                  transform: `translateY(${Math.sin(i) * 20}px)`,
                }}
              />
            ))}

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                style={{
                  left: `${20 + i * 30}%`,
                  top: 0,
                  opacity: 0.5 - i * 0.1,
                  transform: `translateX(${Math.cos(i) * 20}px)`,
                }}
              />
            ))}
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDMwaDMwVjBoLTMwdjMwek0wIDMwaDMwVjBoLTMwdjMwek0wIDYwaDMwVjMwaC0zMHYzMHpNMzAgNjBoMzBWMzBoLTMwdjMweiIgZmlsbD0iIzIyMjIyMiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-zinc-400 hover:text-teal-400 transition-colors mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to About
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 leading-tight animate-pulse-slow">
                My Experience
              </h1>
              <p className="text-zinc-400 mt-4 max-w-2xl">
                A journey through my professional career, showcasing the
                projects and roles that have shaped my expertise in web
                development.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                Download Resume
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 3D Card Experience Showcase */}
          <div ref={containerRef} className="relative mt-20">
            <div className="flex justify-center mb-8">
              {/* Timeline indicator */}
              <div className="relative w-3/4 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(activeExperience / experiences.length) * 100}%`,
                  }}
                ></div>

                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExperience(exp.id)}
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      activeExperience === exp.id
                        ? "border-teal-400 bg-teal-500 scale-125"
                        : "border-zinc-600 bg-zinc-800 hover:border-teal-400"
                    }`}
                    style={{
                      left: `calc(${
                        ((exp.id - 1) / (experiences.length - 1)) * 100
                      }% - 10px)`,
                    }}
                    aria-label={`View ${exp.title} experience`}
                  />
                ))}
              </div>
            </div>

            {/* Experience Card */}
            <div className="relative mx-auto max-w-5xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-900/70 backdrop-blur-xl rounded-2xl border border-zinc-800/50 overflow-hidden shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image section */}
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 z-0"></div>
                      {currentExperience.image && (
                        <Image
                          src={currentExperience.image || "/placeholder.svg"}
                          alt={currentExperience.title}
                          fill
                          className="object-cover mix-blend-luminosity opacity-70"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

                      {/* Floating period badge */}
                      <div className="absolute top-6 left-6 z-20">
                        <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-lg border border-teal-500/30 inline-block">
                          <p className="text-teal-400 font-medium">
                            {currentExperience.period}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-8 lg:p-10">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {currentExperience.title}
                      </h3>
                      <p className="text-cyan-400 text-lg mb-6">
                        {currentExperience.company}
                      </p>

                      <p className="text-zinc-300 mb-8 leading-relaxed">
                        {currentExperience.description}
                      </p>

                      <h4 className="text-white font-semibold mb-3">
                        Skills & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {currentExperience.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-zinc-800/70 rounded-md text-zinc-300 text-sm border border-zinc-700/50 hover:border-teal-500/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <button
                onClick={prevExperience}
                className="absolute top-1/2 -translate-y-1/2 -left-5 md:-left-8 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-zinc-300 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all z-20"
                aria-label="Previous experience"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextExperience}
                className="absolute top-1/2 -translate-y-1/2 -right-5 md:-right-8 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-zinc-300 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all z-20"
                aria-label="Next experience"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Experience counter */}
            <div className="text-center mt-8 text-zinc-400">
              <span className="text-teal-400 font-medium">
                {activeExperience}
              </span>{" "}
              / {experiences.length}
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="mt-24 flex justify-center">
            <Link href="/roles">
              <Button
                variant="outline"
                className="border-zinc-700 hover:border-cyan-500 hover:bg-zinc-800/50 group"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                  View My Roles & Responsibilities
                </span>
                <Code className="ml-2 h-4 w-4 text-cyan-400" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

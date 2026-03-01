"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ChevronRight, ChevronLeft, Award, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface Experience {
  id: number; title: string; company: string; period: string; description: string; skills: string[]; color: string; image?: string; icon: React.ReactNode;
}

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExperience, setActiveExperience] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setTimeout(() => setIsVisible(true), 200); }, []);

  const experiences: Experience[] = [
    {
      id: 1, title: "SDE Intern", company: "Zelosify", period: "Jul 2025 - Sept 2025",
      description: "Zelosify is a growing technology company focused on simplifying Vendor and Contract Management for large enterprises. The company provides a platform where organizations can manage their entire vendor ecosystem — from contract creation and approvals to onboarding, workflow tracking, and compliance management in a secure and automated way. As a Software Development Engineer, I built responsive landing pages and role-based dashboards while maintaining CI/CD pipelines. I also implemented secure multi-user authentication via Keycloak and managed cloud storage using AWS S3.",
      skills: ["Next.js", "Typescript", "Keycloak", "Node.js", "PostgreSQL with Prisma ORM", "Docker", "AWS S3", "Postman"],
      color: "var(--mc-diamond)", image: "/experience/zelosify.jpg", icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 2, title: "Development Head", company: "Google Developers Group on Campus - MSIT", period: "2024 - Present",
      description: "As Development Head at GDGOC MSIT, I actively promoted skill upliftment by organizing regular progress updates and providing growth opportunities. Initiated LinkedIn and GitHub profile challenges, assigned tasks, and facilitated hands-on projects to boost members' professional presence. Collaborated closely with the design team to guide developers in building the club website, ensuring smooth coordination and successful project delivery.",
      skills: ["Full Stack Development", "Team Leadership", "Project Management", "Community Building", "Technical Mentorship", "Event Organization", "Code Review"],
      color: "var(--mc-grass)", image: "/experience/gdg.jpeg", icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 3, title: "Development Deputy Head", company: "Geek Room", period: "2025 - Present",
      description: "Recently appointed as Development Deputy Head at Geek Room, where I am supporting ongoing technical initiatives and collaborating with the team on new projects. Assisting in team coordination, skill development, and focusing on helping members improve their professional profiles. Contributing to a positive and productive environment as we work on upcoming projects.",
      skills: ["Team Collaboration", "Communication", "Problem Solving", "Technical Support", "Community Building"],
      color: "var(--mc-gold)", image: "/experience/gr.jpg", icon: <Award className="h-5 w-5" />,
    },
  ];

  const nextExperience = () => setActiveExperience((prev) => (prev === experiences.length ? 1 : prev + 1));
  const prevExperience = () => setActiveExperience((prev) => (prev === 1 ? experiences.length : prev - 1));
  const currentExperience = experiences.find((exp) => exp.id === activeExperience) || experiences[0];

  return (
    <div className="sm:block sm:py-20 bg-t-bg">
      <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto"><Navbar /></div>
      <div className="relative overflow-hidden min-h-screen sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6">
        {/* MC Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--t-border)", boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)" }} />

        <div className="relative z-10 py-10">
          {/* Header Panel */}
          <div
            className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div
              className="p-6 md:p-8"
              style={{
                background: "var(--t-surface)",
                border: "3px solid var(--t-border)",
                boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-mc-xp text-xs font-medium tracking-[0.3em] uppercase" style={{ textShadow: "0 0 10px var(--mc-xp)" }}>
                    🛡️ Battle Log
                  </span>
                  <h1
                    className="text-4xl md:text-5xl font-black text-mc-grass uppercase tracking-wider mt-2"
                    style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)" }}
                  >
                    My Experience
                  </h1>
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-1" style={{ background: "var(--mc-grass)", boxShadow: "0 0 4px var(--mc-grass)" }} />
                    ))}
                  </div>
                  <p className="text-t-muted mt-4 max-w-2xl">
                    A journey through my professional career, showcasing the projects and roles that have shaped my expertise in web development.
                  </p>
                </div>
                <Link href="/resume">
                  <button
                    className="cursor-pointer px-5 py-2.5 text-white font-bold uppercase text-sm tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "var(--mc-grass)",
                      border: "2px solid rgba(0,0,0,0.2)",
                      boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.3)",
                    }}
                  >
                    <span className="flex items-center gap-2">Download Resume <ExternalLink className="h-4 w-4" /></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Timeline Progress Bar */}
          <div className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div
              className="relative w-full max-w-3xl h-[3px] overflow-hidden"
              style={{ background: "var(--t-border)" }}
            >
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500"
                style={{
                  width: `${(activeExperience / experiences.length) * 100}%`,
                  background: "var(--mc-xp)",
                  boxShadow: "0 0 10px var(--mc-xp)",
                }}
              />
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExperience(exp.id)}
                  className="absolute top-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{ left: `calc(${((exp.id - 1) / (experiences.length - 1)) * 100}%)` }}
                  aria-label={`View ${exp.title}`}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center text-t-text transition-all duration-300"
                    style={{
                      background: activeExperience === exp.id ? exp.color : "var(--t-surface)",
                      border: `2px solid ${activeExperience === exp.id ? exp.color : "var(--t-border)"}`,
                      boxShadow: activeExperience === exp.id
                        ? `inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3), 0 0 15px ${exp.color}60`
                        : "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2)",
                    }}
                  >
                    {exp.icon}
                  </div>
                  <div className={`absolute -bottom-8 whitespace-nowrap text-xs font-medium ${activeExperience === exp.id ? "text-mc-grass" : "text-t-dim"}`}>
                    {exp.period.split(" - ")[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Card */}
          <div ref={containerRef} className="relative mx-auto max-w-5xl mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperience}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  style={{
                    background: "var(--t-surface)",
                    border: "3px solid var(--t-border)",
                    boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Image area */}
                  <div className="relative w-full h-56 md:h-72 overflow-hidden">
                    {currentExperience.image && (
                      <Image src={currentExperience.image} alt={currentExperience.title} fill sizes="100vw" quality={85} className="object-cover opacity-60" />
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, var(--t-surface) 100%)" }} />
                    {/* Period badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className="px-3 py-1.5 text-sm font-bold uppercase"
                        style={{
                          background: "var(--t-bg)",
                          border: "2px solid var(--t-border)",
                          color: "var(--mc-xp)",
                          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.3)",
                        }}
                      >
                        {currentExperience.period}
                      </span>
                    </div>
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                      <h3
                        className="text-3xl font-black text-mc-grass uppercase"
                        style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}
                      >
                        {currentExperience.title}
                      </h3>
                      <p className="text-mc-diamond text-lg flex items-center mt-1">
                        <span className="inline-block w-4 h-[2px] bg-mc-diamond mr-3" />
                        {currentExperience.company}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-t-text2 mb-6 leading-relaxed">{currentExperience.description}</p>

                    <h4 className="text-t-text font-bold mb-3 flex items-center uppercase text-sm tracking-wider">
                      <span className="inline-block w-4 h-[2px] bg-mc-grass mr-3" />
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentExperience.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="mc-slot px-3 py-1.5 text-t-text2 text-sm font-medium"
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={prevExperience}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-10 h-10 flex items-center justify-center text-t-text transition-all hover:scale-110 cursor-pointer z-20"
              style={{
                background: "var(--t-surface)",
                border: "2px solid var(--t-border)",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25), 2px 2px 0 rgba(0,0,0,0.3)",
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-mc-grass" />
            </button>
            <button
              onClick={nextExperience}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-10 h-10 flex items-center justify-center text-t-text transition-all hover:scale-110 cursor-pointer z-20"
              style={{
                background: "var(--t-surface)",
                border: "2px solid var(--t-border)",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25), 2px 2px 0 rgba(0,0,0,0.3)",
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-mc-grass" />
            </button>

            {/* Counter */}
            <div className="text-center mt-6 font-mono tracking-wider">
              <span className="text-mc-xp font-bold">{activeExperience.toString().padStart(2, "0")}</span>
              <span className="mx-2 text-t-dim">/</span>
              <span className="text-t-dim">{experiences.length.toString().padStart(2, "0")}</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

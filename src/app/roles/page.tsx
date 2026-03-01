"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface Role {
  id: number; title: string; organization: string; period: string;
  description: string; responsibilities: string[]; skills: string[]; image?: string;
}

export default function RolesPage() {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const roles: Role[] = [
    {
      id: 1, title: "Technical Lead", organization: "Student Developer Society", period: "2023 - Present",
      description: "Leading a team of student developers in building campus projects. Organizing workshops and hackathons to foster technical skills among students.",
      responsibilities: ["Manage a team of 8 student developers working on various campus projects", "Organize bi-weekly code reviews and technical discussions", "Plan and execute hackathons and coding competitions", "Mentor junior developers and provide guidance on best practices", "Coordinate with faculty advisors on project requirements and deadlines"],
      skills: ["Leadership", "Project Management", "Mentoring", "Event Planning", "Technical Communication"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2, title: "Open Source Contributor", organization: "GitHub Community", period: "2022 - Present",
      description: "Actively contributing to various open-source projects. Fixed bugs and implemented new features for popular JavaScript libraries.",
      responsibilities: ["Contribute code to multiple open-source projects in the JavaScript ecosystem", "Review pull requests and provide constructive feedback", "Document code and create tutorials for community members", "Participate in community discussions and help resolve issues", "Organize virtual meetups for open-source contributors"],
      skills: ["Git", "Open Source", "Documentation", "Community Building", "Code Reviews"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3, title: "Workshop Facilitator", organization: "Tech Workshops", period: "2023 - Present",
      description: "Conducting regular workshops on web development technologies. Created comprehensive learning materials and hands-on exercises for participants.",
      responsibilities: ["Design and deliver technical workshops on React, Next.js, and TypeScript", "Create interactive coding exercises and challenges for participants", "Provide one-on-one assistance during workshop sessions", "Collect and incorporate feedback to improve future workshops", "Collaborate with other facilitators to create a cohesive curriculum"],
      skills: ["Public Speaking", "Curriculum Development", "Teaching", "Technical Writing", "Workshop Design"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

  const toggleRole = (id: number) => { setExpandedRole(expandedRole === id ? null : id); };

  return (
    <div className="sm:block sm:py-20 bg-t-bg">
      <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto"><Navbar /></div>
      <div className="relative min-h-screen overflow-hidden sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6">
        {/* MC Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--t-border)", boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)" }} />

        <div className="container mx-auto px-0 py-10 relative z-10">
          {/* Header Panel */}
          <div
            className="mb-12 p-6 md:p-8"
            style={{
              background: "var(--t-surface)",
              border: "3px solid var(--t-border)",
              boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
            }}
          >
            <Link href="/" className="inline-flex items-center text-t-muted hover:text-mc-grass transition-colors mb-4 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />Back to Home
            </Link>
            <span className="block text-mc-xp text-xs font-medium tracking-[0.3em] uppercase mb-2" style={{ textShadow: "0 0 10px var(--mc-xp)" }}>
              👑 Player Ranks
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-mc-grass uppercase tracking-wider"
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)" }}
            >
              Roles & Responsibilities
            </h1>
            <div className="flex gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-1" style={{ background: "var(--mc-grass)", boxShadow: "0 0 4px var(--mc-grass)" }} />
              ))}
            </div>
            <p className="text-t-muted mt-4 max-w-2xl">
              Current positions and responsibilities that showcase my leadership and technical expertise in various communities and organizations.
            </p>
          </div>

          {/* Roles */}
          <div ref={containerRef} className="mt-8">
            <div className="space-y-8">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div
                    className="overflow-hidden transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    style={{
                      background: "var(--t-surface)",
                      border: "3px solid var(--t-border)",
                      boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Image area */}
                    <div className="relative h-52 overflow-hidden" style={{ borderBottom: "2px solid var(--t-border)" }}>
                      <div className="absolute inset-0" style={{ background: "var(--t-bg2)" }} />
                      {role.image && (
                        <Image src={role.image} alt={role.title} fill sizes="100vw" quality={85} className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
                      )}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--t-surface) 0%, transparent 60%)" }} />

                      {/* Period badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className="px-3 py-1 text-xs font-bold uppercase text-mc-xp"
                          style={{
                            background: "var(--t-bg)",
                            border: "2px solid var(--t-border)",
                            boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.15)",
                          }}
                        >
                          {role.period}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-5 z-10">
                        <h3
                          className="text-2xl font-black text-t-text mb-1 group-hover:text-mc-grass transition-colors uppercase"
                          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}
                        >
                          {role.title}
                        </h3>
                        <p className="text-mc-diamond text-sm font-medium">{role.organization}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-t-text2 leading-relaxed">{role.description}</p>

                      {/* Expand toggle */}
                      <button
                        onClick={() => toggleRole(role.id)}
                        className="flex items-center justify-between w-full mt-5 py-2.5 px-4 cursor-pointer transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        style={{
                          background: "var(--t-bg2)",
                          border: "2px solid var(--t-border)",
                          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.06), inset -1px -1px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.2)",
                        }}
                      >
                        <span className="font-medium text-t-text text-sm uppercase tracking-wider">
                          ⚔️ View Responsibilities
                        </span>
                        {expandedRole === role.id ? <ChevronUp className="h-5 w-5 text-mc-grass" /> : <ChevronDown className="h-5 w-5 text-mc-grass" />}
                      </button>

                      {expandedRole === role.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-5 pt-5"
                          style={{ borderTop: "2px solid var(--t-border)" }}
                        >
                          <h4 className="text-sm font-bold text-t-text mb-4 uppercase tracking-wider flex items-center">
                            <span className="inline-block w-4 h-[2px] bg-mc-grass mr-3" />
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2.5 mb-6">
                            {role.responsibilities.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <div
                                  className="mt-1.5 mr-3 w-2 h-2 flex-shrink-0"
                                  style={{
                                    background: "var(--mc-grass)",
                                    boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), 0 0 3px var(--mc-grass)",
                                  }}
                                />
                                <span className="text-t-text2 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>

                          <h4 className="text-sm font-bold text-t-text mb-4 uppercase tracking-wider flex items-center">
                            <span className="inline-block w-4 h-[2px] bg-mc-diamond mr-3" />
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {role.skills.map((skill, i) => (
                              <span key={i} className="mc-slot px-3 py-1.5 text-t-text2 text-sm font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom accent */}
                    <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ background: "var(--mc-grass)" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 flex justify-center">
            <Link href="/experience">
              <button
                className="cursor-pointer px-6 py-3 flex items-center gap-2 text-t-text font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "var(--t-surface)",
                  border: "2px solid var(--t-border)",
                  boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25), 3px 3px 0 rgba(0,0,0,0.3)",
                }}
              >
                <Briefcase className="h-4 w-4 text-mc-grass" />
                View My Experience
                <span className="text-mc-diamond">→</span>
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

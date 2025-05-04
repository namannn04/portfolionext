"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/component/Navbar";

interface Role {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  image?: string;
}

export default function RolesPage() {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const roles: Role[] = [
    {
      id: 1,
      title: "Technical Lead",
      organization: "Student Developer Society",
      period: "2023 - Present",
      description:
        "Leading a team of student developers in building campus projects. Organizing workshops and hackathons to foster technical skills among students.",
      responsibilities: [
        "Manage a team of 8 student developers working on various campus projects",
        "Organize bi-weekly code reviews and technical discussions",
        "Plan and execute hackathons and coding competitions",
        "Mentor junior developers and provide guidance on best practices",
        "Coordinate with faculty advisors on project requirements and deadlines",
      ],
      skills: [
        "Leadership",
        "Project Management",
        "Mentoring",
        "Event Planning",
        "Technical Communication",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Open Source Contributor",
      organization: "GitHub Community",
      period: "2022 - Present",
      description:
        "Actively contributing to various open-source projects. Fixed bugs and implemented new features for popular JavaScript libraries.",
      responsibilities: [
        "Contribute code to multiple open-source projects in the JavaScript ecosystem",
        "Review pull requests and provide constructive feedback",
        "Document code and create tutorials for community members",
        "Participate in community discussions and help resolve issues",
        "Organize virtual meetups for open-source contributors",
      ],
      skills: [
        "Git",
        "Open Source",
        "Documentation",
        "Community Building",
        "Code Reviews",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Workshop Facilitator",
      organization: "Tech Workshops",
      period: "2023 - Present",
      description:
        "Conducting regular workshops on web development technologies. Created comprehensive learning materials and hands-on exercises for participants.",
      responsibilities: [
        "Design and deliver technical workshops on React, Next.js, and TypeScript",
        "Create interactive coding exercises and challenges for participants",
        "Provide one-on-one assistance during workshop sessions",
        "Collect and incorporate feedback to improve future workshops",
        "Collaborate with other facilitators to create a cohesive curriculum",
      ],
      skills: [
        "Public Speaking",
        "Curriculum Development",
        "Teaching",
        "Technical Writing",
        "Workshop Design",
      ],
      image: "/placeholder.svg?height=300&width=400",
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

  const toggleRole = (id: number) => {
    setExpandedRole(expandedRole === id ? null : id);
  };

  return (
    <div className="sm:block sm:py-20 bg-black">
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>
      <div className="relative min-h-screen overflow-hidden sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900/30 to-black"></div>

          {/* Dynamic gradient background that follows mouse */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${
                mousePosition.x * 100
              }% ${
                mousePosition.y * 100
              }%, rgba(8,145,178,0.3), rgba(20,184,166,0.2), rgba(0,0,0,0))`,
              transition: "background 0.3s ease",
            }}
          />

          {/* Animated circles */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-cyan-500/30 blur-[100px] animate-pulse"></div>
            <div
              className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-teal-500/20 blur-[100px] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/3 left-1/4 w-60 h-60 rounded-full bg-purple-500/10 blur-[80px] animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDMwaDMwVjBoLTMwdjMwek0wIDMwaDMwVjBoLTMwdjMwek0wIDYwaDMwVjMwaC0zMHYzMHpNMzAgNjBoMzBWMzBoLTMwdjMweiIgZmlsbD0iIzIyMjIyMiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container bg-black mx-auto px-4 py-20 relative z-10">
          {/* Header with animated gradient */}
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

            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 leading-tight animate-pulse-slow">
              Roles & Responsibilities
            </h1>

            <p className="text-zinc-400 mt-4 max-w-2xl">
              Current positions and responsibilities that showcase my leadership
              and technical expertise in various communities and organizations.
            </p>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-teal-500/10 blur-xl"></div>
          </div>

          {/* Roles cards with 3D hover effect */}
          <div ref={containerRef} className="mt-16">
            <div className="space-y-12">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative perspective"
                >
                  <div
                    className="relative bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-800/50 overflow-hidden shadow-xl transition-all duration-300 transform-gpu group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/30 hover:scale-[1.02]"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Top section with image and title */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 z-0"></div>
                      {role.image && (
                        <Image
                          src={role.image || "/placeholder.svg"}
                          alt={role.title}
                          fill
                          className="object-cover mix-blend-luminosity opacity-70 transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent"></div>

                      {/* Role info overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-3">
                          {role.period}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                          {role.title}
                        </h3>
                        <p className="text-cyan-400 text-lg">
                          {role.organization}
                        </p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-cyan-500/10 blur-xl opacity-70"></div>
                    </div>

                    {/* Description section */}
                    <div className="p-6">
                      <p className="text-zinc-300 leading-relaxed">
                        {role.description}
                      </p>

                      {/* Toggle button */}
                      <button
                        onClick={() => toggleRole(role.id)}
                        className="flex items-center justify-between w-full mt-6 py-3 px-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-zinc-700/50 hover:border-cyan-500/30 transition-colors"
                      >
                        <span className="font-medium text-white">
                          View Responsibilities
                        </span>
                        {expandedRole === role.id ? (
                          <ChevronUp className="h-5 w-5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-cyan-400" />
                        )}
                      </button>

                      {/* Expanded content */}
                      {expandedRole === role.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-zinc-800"
                        >
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Key Responsibilities:
                          </h4>
                          <ul className="space-y-3 mb-6">
                            {role.responsibilities.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-cyan-500"></div>
                                <span className="text-zinc-300">{item}</span>
                              </li>
                            ))}
                          </ul>

                          <h4 className="text-lg font-semibold text-white mb-4">
                            Skills:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {role.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-zinc-800/70 rounded-md text-zinc-300 text-sm border border-zinc-700/50 hover:border-cyan-500/30 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Floating corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-xl"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="mt-24 flex justify-center">
            <Link href="/experience">
              <Button
                variant="outline"
                className="border-zinc-700 hover:border-teal-500 hover:bg-zinc-800/50 group"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                  View My Experience
                </span>
                <Briefcase className="ml-2 h-4 w-4 text-teal-400" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

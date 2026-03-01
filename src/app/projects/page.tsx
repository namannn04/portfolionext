"use client";

import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";

interface Project {
  id: number; title: string; description: string; tags: string[];
  image?: string; video?: string; demoUrl?: string; githubUrl?: string; showViewProject?: boolean;
}

interface GroupProject extends Project {
  contribution: string;
}

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setTimeout(() => setIsVisible(true), 200); }, []);

  const groupProjects: GroupProject[] = [
    { id: 3, title: "SPARK (Under development)", description: "SPARK is a platform for exploring and joining communities, events, internships, and open-source projects. It also includes a social posting feature to stay updated on tech and events, all in one place with unique enhancements.", tags: ["React", "Node.js", "Express.js", "Firebase", "MongoDB", "Tailwind CSS"], video: "/groupProjects/SPARK.mkv", demoUrl: "https://careercompass-xi.vercel.app/", githubUrl: "", showViewProject: false, contribution: "I worked on the frontend development, user authentication implementation, and the backend logic and its integration. I also contributed to the design and implementation of the user interface." },
    { id: 2, title: "careerCompass", description: "CareerCompass is a project providing detailed career guidance using both manual resources and AI. Users can explore 500+ careers, learning about paths, skills, qualifications, counseling, and strategies.", tags: ["React", "Node.js", "Express.js", "Firebase", "Tailwind CSS"], video: "/groupProjects/careercompass.mkv", demoUrl: "https://careercompass-xi.vercel.app/", githubUrl: "", showViewProject: true, contribution: "I contributed to the full stack: frontend UI/design, backend logic, and authentication. I also developed the admin panel for managing counselors and applications." },
    { id: 1, title: "Bulk Certificate Sender", description: "Bulk Certificate Sender is a web app for easily sending personalized certificates to many recipients via CSV import.", tags: ["React", "TypeScript", "Tailwind CSS"], video: "/groupProjects/certificateSender.mkv", demoUrl: "https://codemanipal.geekroom.in/", githubUrl: "", showViewProject: false, contribution: "I designed the complete frontend, implementing a feature that allows users to input HTML with styles for email body with live preview." },
  ];

  const projects: Project[] = [
    { id: 3, title: "bulkMailer", description: "A bulk email sender app with custom styling that allows users to send emails to multiple recipients.", tags: ["Next.js", "Node.js", "Express.js", "Gmail SMTP", "Tailwind CSS"], video: "/projects/bulkmailer.mkv", demoUrl: "", githubUrl: "https://github.com", showViewProject: false },
    { id: 10, title: "PicMorph", description: "A web app that morphs images from one format to another.", tags: ["Next.js", "Tailwind CSS"], video: "/projects/picmorph.mkv", demoUrl: "https://picmorph.namandadhich.me/", githubUrl: "", showViewProject: true },
    { id: 2, title: "Portfolio v2", description: "My second portfolio website with improved tech stack.", tags: ["React", "Three.js", "Tailwind CSS"], video: "/projects/portfolioReact.mkv", demoUrl: "https://namanportfoliov2.vercel.app/", githubUrl: "", showViewProject: true },
    { id: 1, title: "Portfolio v1", description: "My first portfolio website.", tags: ["HTML", "CSS", "JS"], video: "/projects/tempport.mkv", demoUrl: "", githubUrl: "https://github.com/namannn04/Portfolio-temp", showViewProject: true },
  ];

  const MCProjectCard = ({ project, isGroup, index }: { project: Project | GroupProject; isGroup: boolean; index: number }) => (
    <div
      className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px]"
      style={{
        background: "var(--t-surface)",
        border: "3px solid var(--t-border)",
        boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
      }}
    >
      {/* ID badge */}
      <div
        className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center font-mono text-xs font-bold"
        style={{
          background: "var(--t-bg)",
          border: "2px solid var(--t-border)",
          color: "var(--mc-xp)",
        }}
      >
        {project.id.toString().padStart(2, "0")}
      </div>

      {/* Media */}
      <div className="relative h-44 overflow-hidden" style={{ borderBottom: "2px solid var(--t-border)" }}>
        {project.video ? (
          <video className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay loop muted playsInline>
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" quality={85} priority={index < 4} className="object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        <h3
          className="text-lg font-bold text-t-text mb-2 group-hover:text-mc-grass transition-colors"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
        >
          {project.title}
        </h3>
        <p className="text-t-muted text-sm mb-3 line-clamp-2 flex-grow">{project.description}</p>

        {isGroup && "contribution" in project && (
          <p className="text-mc-diamond text-xs mb-3 italic">⛏️ My contribution: {(project as GroupProject).contribution}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs font-medium text-t-text2"
              style={{
                background: "var(--t-bg2)",
                border: "1px solid var(--t-border)",
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-t-dim" style={{ border: "1px solid var(--t-border)" }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {project.showViewProject && (
          <Link
            href={project.demoUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mc-grass text-sm flex items-center hover:text-mc-emerald transition-colors font-medium group/link"
          >
            View Project
            <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-t-bg sm:block">
      <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto"><Navbar /></div>
      <div className="relative min-h-screen overflow-hidden sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--t-border)", boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)" }} />

        <div className="relative z-10">
          {/* Header */}
          <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-mc-xp text-sm font-medium tracking-[0.3em] uppercase mb-3 block" style={{ textShadow: "0 0 10px var(--mc-xp)" }}>🏗️ Build Gallery 🏗️</span>
            <h1
              className="text-4xl md:text-5xl font-black text-mc-grass uppercase tracking-wider mb-4"
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)" }}
            >
              My Projects
            </h1>
            <div className="flex gap-1 justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-1" style={{ background: "var(--mc-grass)", boxShadow: "0 0 4px var(--mc-grass)" }} />
              ))}
            </div>
            <p className="text-t-muted max-w-2xl mx-auto">A collection of my recent work, showcasing web applications, mobile apps, and design projects.</p>
          </div>

          {/* Group Projects */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-t-text mb-6 flex items-center uppercase tracking-wider">
              <div
                className="flex items-center justify-center w-8 h-8 mr-3 text-mc-emerald"
                style={{ background: "var(--t-surface)", border: "2px solid var(--t-border)", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2)" }}
              >
                <span className="font-bold text-sm">{groupProjects.length}</span>
              </div>
              <span>⚔️ Group Projects</span>
              <div className="h-[2px] flex-grow ml-4" style={{ background: "var(--mc-stone)", opacity: 0.3 }} />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {groupProjects.map((project, idx) => <MCProjectCard key={project.id} project={project} isGroup={true} index={idx} />)}
            </div>
          </div>

          {/* Solo Projects */}
          <div>
            <h2 className="text-xl font-bold text-t-text mb-6 flex items-center uppercase tracking-wider">
              <div
                className="flex items-center justify-center w-8 h-8 mr-3 text-mc-diamond"
                style={{ background: "var(--t-surface)", border: "2px solid var(--t-border)", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2)" }}
              >
                <span className="font-bold text-sm">{projects.length}</span>
              </div>
              <span>🛠️ Solo Projects</span>
              <div className="h-[2px] flex-grow ml-4" style={{ background: "var(--mc-stone)", opacity: 0.3 }} />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project, idx) => <MCProjectCard key={project.id} project={project} isGroup={false} index={idx} />)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

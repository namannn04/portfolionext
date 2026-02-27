"use client";

import { useState, useRef, useEffect } from "react";
import { Github, ArrowRight, Play, Pause } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  mediaType: "image" | "video";
  image?: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<{
    [key: number]: boolean;
  }>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "careerCompass",
      description:
        "CareerCompass is a project providing detailed career guidance using both manual resources and AI. Users can explore 500+ careers, learning about paths, skills, qualifications, counseling, and strategies.",
      tags: ["React", "Node.js", "Express.js", "Firebase", "Tailwind CSS"],
      mediaType: "video",
      videoUrl: "/groupProjects/careercompass.mkv",
      image: "/groupProjects/careercompass.jpg",
      liveUrl: "https://careercompass-xi.vercel.app/",
      githubUrl: "https://github.com/namannn04/careerCompass",
    },
    {
      id: 2,
      title: "SPARK (Under development)",
      description:
        "SPARK is a platform for exploring and joining communities, events, internships, and open-source projects. It also includes a social posting feature to stay updated on tech and events, all in one place with unique enhancements.",
      tags: [
        "React",
        "Node.js",
        "Express.js",
        "Firebase",
        "MongoDB",
        "Tailwind CSS",
      ],
      mediaType: "video",
      videoUrl: "/groupProjects/SPARK.mkv",
      image: "/groupProjects/spark.jpg",
      liveUrl: "",
      githubUrl: "",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleVideoPlay = (projectId: number) => {
    const videoElement = videoRefs.current[projectId];
    if (!videoElement) return;
    const isPlaying = playingVideos[projectId];
    if (isPlaying) videoElement.pause();
    else videoElement.play();
    setPlayingVideos((prev) => ({ ...prev, [projectId]: !isPlaying }));
  };

  const handleVideoRef = (
    element: HTMLVideoElement | null,
    projectId: number
  ) => {
    if (element) videoRefs.current[projectId] = element;
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full bg-t-bg py-20 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section heading */}
      <div
        className={`container mx-auto px-4 mb-16 relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <h2
          className="text-4xl md:text-6xl font-black mb-4 text-mc-grass uppercase tracking-wider"
          style={{
            textShadow:
              "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)",
          }}
        >
          Projects
        </h2>
        <div className="flex gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-1"
              style={{
                background: "var(--mc-grass)",
                boxShadow: "0 0 4px var(--mc-grass)",
              }}
            />
          ))}
        </div>
        <p className="text-t-muted max-w-2xl text-lg">
          Explore my latest work and creative endeavors. Each project represents
          a unique challenge and solution.
        </p>
      </div>

      {/* Projects grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {projects.map((project, projectIndex) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${(projectIndex + 1) * 200}ms` }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div
                className="relative overflow-hidden transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                style={{
                  background: "var(--t-surface)",
                  border: "3px solid var(--t-border)",
                  boxShadow:
                    activeProject === project.id
                      ? `inset 2px 2px 0 rgba(255,255,255,0.1), inset -2px -2px 0 rgba(0,0,0,0.25), 6px 6px 0 rgba(0,0,0,0.4), 0 0 20px rgba(92,184,92,0.2)`
                      : "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                <div className="p-5 md:p-7 flex flex-col">
                  {/* Media area */}
                  <div
                    className="relative w-full h-48 md:h-64 mb-5 overflow-hidden"
                    style={{
                      border: "2px solid var(--t-border)",
                      boxShadow:
                        "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2)",
                    }}
                  >
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background:
                          "linear-gradient(transparent 50%, rgba(0,0,0,0.7) 100%)",
                      }}
                    />
                    {project.mediaType === "video" && project.videoUrl ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={(el) => handleVideoRef(el, project.id)}
                          src={project.videoUrl}
                          poster={project.image}
                          className="absolute inset-0 w-full h-full object-cover"
                          playsInline
                          preload="metadata"
                        />
                        <button
                          onClick={() => toggleVideoPlay(project.id)}
                          className="absolute inset-0 w-full h-full z-20 flex items-center justify-center cursor-pointer group/play"
                          aria-label={
                            playingVideos[project.id]
                              ? "Pause video"
                              : "Play video"
                          }
                        >
                          <div
                            className="p-3 transition-transform transform hover:scale-110"
                            style={{
                              background: "var(--mc-grass)",
                              boxShadow:
                                "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.4)",
                            }}
                          >
                            {playingVideos[project.id] ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white" />
                            )}
                          </div>
                        </button>
                      </div>
                    ) : (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Tags */}
                    <div className="absolute bottom-2 left-2 z-20 flex flex-wrap gap-1.5">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs font-medium"
                          style={{
                            background: "rgba(0,0,0,0.7)",
                            border: "1px solid var(--t-border)",
                            color: "var(--t-text2)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project info */}
                  <Link
                    href={project.liveUrl || project.githubUrl || "#"}
                    className="block"
                  >
                    <h3
                      className="text-xl font-bold mb-2 text-t-text group-hover:text-mc-grass transition-colors"
                      style={{
                        textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-t-muted mb-5 flex-grow text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          className="p-2 transition-all duration-200 hover:scale-110"
                          aria-label="GitHub Repository"
                          style={{
                            background: "var(--t-bg2)",
                            border: "2px solid var(--t-border)",
                            boxShadow:
                              "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2)",
                          }}
                        >
                          <Github className="w-4 h-4 text-t-text2 hover:text-mc-grass" />
                        </Link>
                      )}
                    </div>
                    <Link
                      href={project.liveUrl || project.githubUrl || "#"}
                      className="group/btn flex items-center text-sm font-medium text-t-muted hover:text-mc-grass transition-colors"
                    >
                      View {project.title}
                      <ArrowRight className="ml-1 w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View all projects */}
      <div className="container mx-auto px-4 mt-16 text-center relative z-10">
        <Link href="/projects">
          <button
            className="cursor-pointer inline-flex items-center justify-center px-7 py-3 font-medium text-t-text transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
            style={{
              background: "var(--t-surface)",
              border: "2px solid var(--t-border)",
              boxShadow:
                "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25), 3px 3px 0 rgba(0,0,0,0.3)",
            }}
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </section>
  );
}

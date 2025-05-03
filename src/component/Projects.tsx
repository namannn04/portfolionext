"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight, Play, Pause } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  mediaType: "image" | "video"
  image?: string
  videoUrl?: string
  liveUrl?: string
  githubUrl?: string
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [playingVideos, setPlayingVideos] = useState<{ [key: number]: boolean }>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration and admin dashboard.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      mediaType: "image",
      image: "/placeholder.svg?height=600&width=800",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "An AI-powered application that generates marketing content based on user prompts.",
      tags: ["React", "Node.js", "OpenAI", "MongoDB"],
      mediaType: "video",
      videoUrl: "https://example.com/video.mp4", // Replace with your actual video URL
      image: "/placeholder.svg?height=600&width=800", // Fallback image
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Fitness Tracker",
      description: "Mobile-first application for tracking workouts, nutrition, and progress.",
      tags: ["React Native", "Firebase", "Redux", "Charts.js"],
      mediaType: "image",
      image: "/placeholder.svg?height=600&width=800",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A creative portfolio website showcasing my skills and projects.",
      tags: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
      mediaType: "image",
      image: "/placeholder.svg?height=600&width=800",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const sectionElement = sectionRef.current
    if (sectionElement) {
      sectionElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  const toggleVideoPlay = (projectId: number) => {
    const videoElement = videoRefs.current[projectId]

    if (!videoElement) return

    const isPlaying = playingVideos[projectId]

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }

    setPlayingVideos((prev) => ({
      ...prev,
      [projectId]: !isPlaying,
    }))
  }

  const handleVideoRef = (element: HTMLVideoElement | null, projectId: number) => {
    if (element) {
      videoRefs.current[projectId] = element
    }
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-black py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black">
        <div
          className="absolute blur-[100px] opacity-30 rounded-full w-[40vw] h-[40vw]"
          style={{
            background: "radial-gradient(circle, rgba(20,184,166,0.5) 0%, rgba(8,145,178,0.2) 70%, rgba(0,0,0,0) 100%)",
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transition: "left 0.5s ease-out, top 0.5s ease-out",
          }}
        />
      </div>

      {/* Section heading */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
          Projects
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mb-8" />
        <p className="text-gray-400 max-w-2xl text-lg">
          Explore my latest work and creative endeavors. Each project represents a unique challenge and solution.
        </p>
      </div>

      {/* Projects grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: project.id * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                {/* Card content */}
                <div className="p-6 md:p-8 h-full flex flex-col">
                  {/* Project media (image or video) */}
                  <div className="relative w-full h-48 md:h-64 mb-6 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

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
                          className="absolute inset-0 w-full h-full z-20 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                          aria-label={playingVideos[project.id] ? "Pause video" : "Play video"}
                        >
                          <div className="bg-teal-500/80 hover:bg-teal-500 rounded-full p-3 backdrop-blur-sm transition-transform transform hover:scale-110">
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
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    {/* Floating tags */}
                    <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-black/50 backdrop-blur-md border border-gray-700 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project info */}
                  <Link href={project.liveUrl || project.githubUrl || "#"} className="block">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors hover:text-cyan-400">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>

                  {/* Links */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex space-x-4">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          className="p-2 rounded-full bg-gray-800/50 hover:bg-teal-900/50 border border-gray-700 hover:border-teal-500 transition-all duration-300"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-5 h-5 text-gray-300 hover:text-teal-400" />
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          className="p-2 rounded-full bg-gray-800/50 hover:bg-cyan-900/50 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-300 hover:text-cyan-400" />
                        </Link>
                      )}
                    </div>

                    <Link
                      href={project.liveUrl || project.githubUrl || "#"}
                      className="group/btn flex items-center text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      View {project.title}
                      <ArrowRight className="ml-1 w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Glowing border effect on hover */}
                <div
                  className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                    activeProject === project.id ? "opacity-100" : ""
                  }`}
                  style={{
                    boxShadow: "0 0 20px 2px rgba(20,184,166,0.3), inset 0 0 20px 2px rgba(8,145,178,0.2)",
                  }}
                />
              </div>

              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-xl" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-[20%] right-[5%] w-24 h-24 rounded-full bg-teal-500/10 blur-xl animate-pulse" />
      <div
        className="absolute bottom-[15%] left-[10%] w-32 h-32 rounded-full bg-cyan-500/10 blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* View all projects button */}
      <div className="container mx-auto px-4 mt-16 text-center relative z-10">
        <Link
          href="#"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 border border-teal-500/30 hover:border-cyan-400/50 text-white font-medium transition-all duration-300 group"
        >
          View All Projects
          <ArrowRight className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

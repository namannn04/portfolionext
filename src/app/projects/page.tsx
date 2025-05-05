"use client";

import type React from "react";

import Navbar from "@/component/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  demoUrl?: string;
  githubUrl?: string;
  showViewProject?: boolean;
}

interface GroupProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  demoUrl?: string;
  githubUrl?: string;
  showViewProject?: boolean;
  contribution: string;
}

export default function Page() {
  const groupProjects: GroupProject[] = [
    {
      id: 8,
      title: "SPARK (Under development)",
      description:
        "SPARK is a platform for exploring and joining communities, events, internships, and open-source projects. It also includes a social posting feature to stay updated on tech and events, all in one place with unique enhancements.",
      tags: ["React", "Node.js", "Express.js", "Firebase", "MongoDB", "Tailwind CSS"],
      video: "/groupProjects/SPARK.mkv",
      demoUrl: "https://careercompass-xi.vercel.app/",
      githubUrl: "",
      showViewProject: false,
      contribution:
        "I worked on the frontend development, user authentication implementation, and the backend logic and its integration. I also contributed to the design and implementation of the user interface.",
    },
    {
      id: 7,
      title: "careerCompass",
      description:
        "CareerCompass is a project providing detailed career guidance using both manual resources and AI. Users can explore 500+ careers, learning about paths, skills, qualifications, counseling, and strategies.",
      tags: ["React", "Node.js", "Express.js", "Firebase", "Tailwind CSS"],
      video: "/groupProjects/careercompass.mkv",
      demoUrl: "https://careercompass-xi.vercel.app/",
      githubUrl: "",
      showViewProject: true,
      contribution:
        "I contributed to the full stack: frontend UI/design, backend logic, and authentication. I also developed the admin panel for managing counselors and applications.",
    },
    {
      id: 6,
      title: "GDGoc Website",
      description:
        "As the Head of the Development Department and Project Lead, I spearheaded the website creation for the Google Developers Group on Campus - MSIT (GDGoC - MSIT). This involved building a dynamic online presence for the group.",
      tags: ["React", "Tailwind CSS"],
      image: "/groupProjects/gdgmsit.jpg",
      demoUrl: "https://gdgmsit.in/",
      githubUrl: "",
      showViewProject: true,
      contribution:
        "I personally developed the engaging hero section and the informative events section of the website. Additionally, I meticulously refined various smaller details across the site to ensure a seamless and polished user experience.",
    },
    {
      id: 5,
      title: "Bulk Certificate Sender",
      description:
        "Bulk Certificate Sender is a web app for easily sending personalized certificates to many recipients via CSV import container all participant's name and their email id and HTML email design.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      video: "/groupProjects/certificateSender.mkv",
      demoUrl: "https://codemanipal.geekroom.in/",
      githubUrl: "",
      showViewProject: false,
      contribution:
        "I designed the complete frontend, notably implementing a feature that allows users to input HTML with various styles for the email body and see a live preview of the final output that gets sent with each certificate.",
    },
    {
      id: 4,
      title: "Code-ए-Manipal (Hack Organizer)",
      description:
        "Code-ए-Manipal was an offline hackathon organized by the Geek Room community in Jaipur. It attracted teams from various states across India.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "/groupProjects/codemanipal.jpg",
      demoUrl: "https://codemanipal.geekroom.in/",
      githubUrl: "",
      showViewProject: true,
      contribution:
        "As an organizer, I completely reframed their website from a template, handling all the work myself. Despite being an organizer, I went to the hackathon as a participant instead of a moderator.",
    },
    {
      id: 3,
      title: "Pears Global Hackathon (Hack Organizer)",
      description:
        "The Pears Global Hackathon was a global-level online event organized by the Geek Room community in collaboration with Pears (GR x Pears). This hackathon involved numerous international teams.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "/groupProjects/pears.jpg",
      demoUrl: "https://pearshack.geekroom.in/",
      githubUrl: "",
      showViewProject: true,
      contribution:
        "I worked as moderator and on the website, creating sections and significantly focusing on fixing existing issues, bugs, and implementing updates rather than primarily on new creation.",
    },
    {
      id: 2,
      title: "Code Kshetra 2.0 (Hack Organizer)",
      description:
        "Code Kshetra 2.0 was a significant national-level offline hackathon with MLH as a partner and it was organized by Geek Room community. It was an exceptional hackathon experience",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "/groupProjects/ck2.jpg",
      demoUrl: "https://codekshetra2.geekroom.in/",
      githubUrl: "",
      showViewProject: true,
      contribution:
        "I served as a moderator and created several sections of the website. Notably, I resolved almost all the bugs and issues that arose on the site.",
    },
    {
      id: 1,
      title: "Code Cubicle 3.0 (Hack Organizer)",
      description:
        "Code Cubicle 3.0 was a hybrid hackathon organized by the Geek Room community. The offline portion of the event took place at the Microsoft Office.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "/groupProjects/cc3.jpg",
      demoUrl: "https://codecubicle3.geekroom.in/",
      githubUrl: "",
      showViewProject: true,
      contribution:
        "I developed almost the entire website for this hackathon, handling all edits and creations.",
    },
  ];

  // Original projects list (unchanged)
  const projects: Project[] = [
    {
      id: 11,
      title: "bulkMailer",
      description:
        "A bulk email sender app with custom styling ( allows user HTML and CSS inside email body ) that allows users to send emails to multiple recipients.",
      tags: ["Next.js", "Node.js", "Express.js", "Gmail SMTP", "Tailwind CSS"],
      video: "/projects/bulkmailer.mkv",
      demoUrl: "",
      githubUrl: "https://github.com",
      showViewProject: false,
    },
    {
      id: 10,
      title: "PicMorph",
      description: "A web app that morphs images from one format to another.",
      tags: ["Next.js", "Tailwind CSS"],
      video: "/projects/picmorph.mkv",
      demoUrl: "https://picmorph.namandadhich.me/",
      githubUrl: "",
      showViewProject: true,
    },
    {
      id: 9,
      title: "Zwigato",
      description:
        "A food delivery demo app with working cart and admin panel for restaurants.",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      image: "/projects/zwigato.jpg",
      demoUrl: "",
      githubUrl: "https://github.com",
      showViewProject: true,
    },
    {
      id: 8,
      title: "Portfolio v2",
      description:
        "My second portfolio website with improved tech stack, showcasing my projects and skills.",
      tags: ["React", "Three.js", "Tailwind CSS"],
      video: "/projects/portfolioReact.mkv",
      demoUrl: "https://namanportfoliov2.vercel.app/",
      githubUrl: "",
      showViewProject: true,
    },
    {
      id: 7,
      title: "SignIn/SignUp",
      description:
        "A simple and secure authentication system for web applications.",
      tags: ["React", "Firebase", "CSS"],
      video: "/projects/signIn.mkv",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/Sign-in-Page",
      showViewProject: true,
    },
    {
      id: 6,
      title: "Simon Game",
      description:
        "A fun and interactive memory game that challenges players to repeat sequences of colors and sounds.",
      tags: ["HTML", "CSS", "JS"],
      video: "/projects/simon.mkv",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/simon-game",
      showViewProject: true,
    },
    {
      id: 5,
      title: "Portfolio v1",
      description:
        "My first portfolio website, showcasing my projects and skills.",
      tags: ["HTML", "CSS", "JS"],
      video: "/projects/tempport.mkv",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/Portfolio-temp",
      showViewProject: true,
    },
    {
      id: 4,
      title: "Spotify Clone",
      description:
        "I designed a Spotify clone that replicates the landing page of the original music streaming platform.",
      tags: ["HTML", "CSS"],
      video: "/projects/spotify.mkv",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/spotify-clone",
      showViewProject: true,
    },
    {
      id: 3,
      title: "Instagram Clone",
      description:
        "A clone of Instagram's landing page, showcasing its features and design.",
      tags: ["HTML", "CSS", "JS"],
      image: "/projects/insta.jpg",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/instagram-clone",
      showViewProject: true,
    },
    {
      id: 2,
      title: "Calculator",
      description:
        "A simple calculator application that performs basic arithmetic operations.",
      tags: ["HTML", "CSS"],
      video: "/projects/calculator.mkv",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/calculator",
      showViewProject: true,
    },
    {
      id: 1,
      title: "Samsung Landing Page (custom)",
      description:
        "A custom landing page for Samsung, showcasing their latest products and features.",
      tags: ["HTML", "CSS", "JavaScript"],
      video: "/projects/samsung.mkv",
      demoUrl: "",
      githubUrl: "https://github.com/namannn04/samsung-landingPage",
      showViewProject: true,
    },
  ];

  // Project Card Component for regular projects
  const ProjectCard = ({ project }: { project: Project | GroupProject }) => (
    <div
      key={project.id}
      className="group h-[30rem] bg-zinc-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800 hover:border-teal-500/50 transition-all duration-500 flex flex-col relative hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:-translate-y-1"
    >
      {/* Project number */}
      <div className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-teal-500/20 text-teal-400 font-mono text-xs">
        {project.id.toString().padStart(2, "0")}
      </div>

      {/* Project media (image or video) */}
      <div className="relative h-[15rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
        {project.video ? (
          <video
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={project.image || "/placeholder.svg?height=1080&width=1920"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {/* Glowing border */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-zinc-900/40 to-zinc-900/80">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Contribution - only for group projects */}
        {"contribution" in project && (
          <p className="text-teal-400 text-xs mb-3 italic">
            My contribution: {project.contribution}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-zinc-800/70 rounded-full text-xs text-cyan-400 border border-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs text-zinc-500 border border-zinc-700/30">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* View project link - only shown if showViewProject is true */}
        {project.showViewProject && (
          <Link
            href={project.demoUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 text-sm flex items-center hover:text-teal-300 transition-colors group/link"
          >
            <span className="relative">
              View Project
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal-400 group-hover/link:w-full transition-all duration-300"></span>
            </span>
            <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </Link>
        )}
      </div>
    </div>
  );

  const GroupProjectCard = ({
    project,
  }: {
    project: Project | GroupProject;
  }) => (
    <div
      key={project.id}
      className="group h-[36rem] bg-zinc-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800 hover:border-teal-500/50 transition-all duration-500 flex flex-col relative hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:-translate-y-1"
    >
      {/* Project number */}
      <div className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-teal-500/20 text-teal-400 font-mono text-xs">
        {project.id.toString().padStart(2, "0")}
      </div>

      {/* Project media (image or video) */}
      <div className="relative h-[12rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
        {project.video ? (
          <video
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={project.image || "/placeholder.svg?height=1080&width=1920"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {/* Glowing border */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-zinc-900/40 to-zinc-900/80">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Contribution - only for group projects */}
        {"contribution" in project && (
          <p className="text-cyan-400 text-xs mb-3 italic">
            My contribution: {project.contribution}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-zinc-800/70 rounded-full text-xs text-cyan-400 border border-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs text-zinc-500 border border-zinc-700/30">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* View project link - only shown if showViewProject is true */}
        {project.showViewProject && (
          <Link
            href={project.demoUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 text-sm flex items-center hover:text-teal-300 transition-colors group/link"
          >
            <span className="relative">
              View Project
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal-400 group-hover/link:w-full transition-all duration-300"></span>
            </span>
            <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-black sm:block">
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>
      <div className="relative min-h-screen overflow-hidden sm:max-w-[50%] mx-auto sm:border sm:border-teal-500/40 rounded-xl p-6 sm:shadow-[0_0_15px_rgba(20,184,166,0.15)]">
        {/* Projects Showcase */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 mt-5 mb-4 py-5">
              My Projects
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A collection of my recent work, showcasing web applications,
              mobile apps, and design projects.
            </p>
          </div>

          {/* Group Projects Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30">
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent font-bold">
                  {groupProjects.length}
                </span>
              </div>
              <span>Group Projects</span>
              <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-purple-500/30 to-transparent"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {groupProjects.map((project) => (
                <GroupProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* All Projects */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                  {projects.length}
                </span>
              </div>
              <span>Projects</span>
              <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-teal-500/30 to-transparent"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-[#050505]"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDMwaDMwVjBoLTMwdjMwek0wIDMwaDMwVjBoLTMwdjMwek0wIDYwaDMwVjMwaC0zMHYzMHpNMzAgNjBoMzBWMzBoLTMwdjMweiIgZmlsbD0iIzIyMjIyMiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

          {/* Glowing lines */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={`h-line-${i}`}
                className="absolute h-[1px] w-full"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${
                    i % 2 === 0 ? "rgba(20,184,166,0.3)" : "rgba(8,145,178,0.3)"
                  } 50%, transparent 100%)`,
                  top: `${20 + i * 30}%`,
                  opacity: 0.4,
                }}
              />
            ))}

            {[...Array(2)].map((_, i) => (
              <div
                key={`v-line-${i}`}
                className="absolute w-[1px] h-full"
                style={{
                  background: `linear-gradient(0deg, transparent 0%, ${
                    i % 2 === 0 ? "rgba(20,184,166,0.3)" : "rgba(8,145,178,0.3)"
                  } 50%, transparent 100%)`,
                  left: `${30 + i * 40}%`,
                  opacity: 0.4,
                }}
              />
            ))}
          </div>

          {/* Radial gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(20,184,166,0.15), rgba(8,145,178,0.1), rgba(0,0,0,0))`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Reusable Experience Item Component
interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  isFirst?: boolean;
}

const TimelineItem = ({
  title,
  company,
  period,
  description,
  skills,
  isFirst = false,
}: TimelineItemProps) => {
  // Use teal styling for all items as requested (based on first experience item)
  const gradientClass = "from-teal-500 via-teal-500/50 to-teal-500/20";
  const accentColor = "teal";
  const textColor = "cyan-400";
  const bgColor = "cyan-500/10";
  const borderColor = "cyan-500/20";

  return (
    <div className="relative pl-8 pb-8">
      <div
        className={`absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b ${gradientClass}`}
      ></div>
      <div
        className={`absolute w-5 h-5 rounded-full border-2 border-${accentColor}-500 bg-zinc-900 -left-[11px] top-0 z-10`}
      ></div>
      <div
        className={`absolute w-3 h-3 bg-${accentColor}-500 rounded-full -left-[7px] top-[4px] z-20`}
      ></div>

      <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/50 p-5 shadow-lg hover:shadow-teal-500/5 transition-all duration-300 hover:border-cyan-500/30">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
          <div>
            <h4 className="text-white font-semibold text-lg">{title}</h4>
            <p className={`text-${textColor}`}>{company}</p>
          </div>
          <div
            className={`px-3 py-1 bg-${bgColor} border border-${borderColor} rounded-full text-${textColor} text-xs font-medium`}
          >
            {period}
          </div>
        </div>
        <p className="text-zinc-300">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function AboutSection() {
  const [contentHeight, setContentHeight] = useState(0);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Experience data
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description:
        "Led the frontend development team in building a modern SaaS platform using Next.js and TypeScript. Implemented CI/CD pipelines and improved performance by 40%.",
      skills: ["React", "Next.js", "TypeScript", "CI/CD"],
    },
    {
      title: "Web Developer",
      company: "Pears Global Hackathon",
      period: "2025",
      description:
        "Developed and maintained multiple client projects using React, Node.js, and MongoDB. Collaborated with design teams to implement responsive UI components.",
      skills: ["React", "Node.js", "MongoDB", "UI/UX"],
    },
    {
      title: "Web Developer",
      company: "Code Kshetra 2.0",
      period: "2024 - 2025",
      description:
        "I had the privilege of participating in a prestigious national-level hackathon organized by Geek Room (MSIT). During the event, I worked on a website using React.js, which proved to be an incredible learning experience. Collaborating with a talented team and overcoming challenges together made this journey truly unforgettable.",
      skills: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
    },
    {
      title: "Web Developer",
      company: "Code Cubicle 3.0",
      period: "2024",
      description:
        "It was one of the major hackathons organized by Geek Room (MSIT), and I had the opportunity to work with their team. I worked on a website using Next.js, which provided a great learning experience. Collaborating with talented individuals and tackling challenges together made it a memorable event.",
      skills: ["Figma", "HTML/CSS", "UI/UX", "Photoshop"],
    },
  ];

  // Responsibilities data
  const responsibilities = [
    {
      title: "Technical Lead",
      company: "Student Developer Society",
      period: "2023 - Present",
      description:
        "Leading a team of student developers in building campus projects. Organizing workshops and hackathons to foster technical skills among students.",
      skills: [
        "Leadership",
        "Project Management",
        "Mentoring",
        "Event Planning",
      ],
    },
    {
      title: "Open Source Contributor",
      company: "GitHub Community",
      period: "2022 - Present",
      description:
        "Actively contributing to various open-source projects. Fixed bugs and implemented new features for popular JavaScript libraries.",
      skills: ["Git", "Open Source", "Documentation", "Community Building"],
    },
    {
      title: "Workshop Facilitator",
      company: "Tech Workshops",
      period: "2023 - Present",
      description:
        "Conducting regular workshops on web development technologies. Created comprehensive learning materials and hands-on exercises for participants.",
      skills: [
        "Public Speaking",
        "Curriculum Development",
        "Teaching",
        "Technical Writing",
      ],
    },
  ];

  // Set the content height based on the About section's natural height
  useEffect(() => {
    if (aboutContentRef.current) {
      setContentHeight(aboutContentRef.current.scrollHeight);
    }
  }, []);

  // Handle mouse movement for the header animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      className="relative bg-black w-full py-16 px-4 md:px-8 lg:px-2"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-teal-500 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-teal-500 blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Enhanced Header */}
        <div
          ref={headerRef}
          className="mb-16 relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-8 md:p-12"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, rgba(20,184,166,0.15), rgba(8,145,178,0.1), rgba(0,0,0,0))`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500"></div>
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500"></div>
          <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500"></div>

          <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 animate-pulse-slow">
            About Me
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Passionate developer crafting digital experiences with code and
            creativity. Explore my journey, skills, and the path that led me
            here.
          </p>

          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-teal-500/10 blur-xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-xl"></div>
        </div>

        {/* Right column - Content */}
        <div className="lg:col-span-8">
          <div className="bg-black backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl h-full overflow-hidden">
            {/* Content */}
            <div className="p-6" style={{ minHeight: `${contentHeight}px` }}>
              <div
                ref={aboutContentRef}
                className="space-y-6 animate-in fade-in duration-300"
              >
                <div className="space-y-4">
                  <p className="text-zinc-300 leading-relaxed">
                    Hello! I'm Naman Dadhich, a passionate Full Stack Developer
                    with over 1 years of experience in building web
                    applications. I specialize in creating responsive,
                    user-friendly interfaces with modern technologies like
                    React, Next.js, and TypeScript.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    My journey in web development began during my university
                    years when I discovered my passion for creating digital
                    experiences. Since then, I've worked with various startups
                    and established companies to deliver high-quality software
                    solutions that solve real-world problems.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    I believe in writing clean, maintainable code and staying
                    up-to-date with the latest industry trends. When I'm not
                    coding, you can find me exploring new technologies,
                    contributing to open-source projects, or sharing my
                    knowledge through blog posts and community events.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="bg-zinc-700/30 p-4 rounded-lg border border-zinc-700/50">
                      <h4 className="text-white font-semibold mb-2">
                        Education
                      </h4>
                      <p className="text-zinc-300">Bachelor of Technology</p>
                      <p className="text-zinc-400 text-sm">
                        Maharaja Surajmal Institute of Technology, 2027
                      </p>
                    </div>
                    <div className="bg-zinc-700/30 p-4 rounded-lg border border-zinc-700/50">
                      <h4 className="text-white font-semibold mb-2">
                        Location
                      </h4>
                      <p className="text-zinc-300">New Delhi, India</p>
                      <p className="text-zinc-400 text-sm">
                        Available for remote work
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-700/50">
                  <Link href="/resume">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                      Download Resume
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

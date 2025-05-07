"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const [contentHeight, setContentHeight] = useState(0);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set the content height based on the About sections natural height
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
                    Hello! myself Naman Dadhich, a Full Stack Developer with a
                    passion for coding and currently in my second year, fourth
                    semester. I have more than a year of hands-on experience and
                    specialize in developing solid web applications. My
                    technology stack is mostly the MERN framework, and I often
                    use the strength of Next.js and TypeScript to develop
                    scalable and efficient solutions. I am committed to building
                    stylish, clean, and responsive user interfaces that offer
                    great user experiences.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    My path into the field of web development was ignited in my
                    second semester. Although my first projects during the third
                    semester were learning bases in nature (as you can observe
                    in my projects section), a real chance materialized when I
                    spearheaded the development of a website for a hackathon as
                    a project organizer. This one changed how I approached the
                    work, focusing on collaborative work and enabling me to
                    contribute more profoundly. Being the Head of the
                    Development Department in the Google Developer Group (GDG),
                    previously GDSC, on my campus, I have led website
                    development initiatives for several projects. While my own
                    project list may be limited, I have extensive experience
                    with team projects where I have had a leading role.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Outside of the world of code, I absolutely love playing
                    chess—even during boring college lectures, you’ll often find
                    me engrossed in a game. I also enjoy the quiet pleasures of
                    listening to music and taking time to recharge. I am always
                    eager to learn and grow as a coder, welcoming new challenges
                    and striving to create meaningful digital solutions.
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

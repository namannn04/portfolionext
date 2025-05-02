"use client";

import { useState, useEffect, useRef } from "react";
import { Code, ExternalLink, Github, Linkedin, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("about");
  const [contentHeight, setContentHeight] = useState(0);
  const aboutContentRef = useRef<HTMLDivElement>(null);

  // Set the content height based on the About section's natural height
  useEffect(() => {
    if (aboutContentRef.current) {
      setContentHeight(aboutContentRef.current.scrollHeight);
    }
  }, []);

  return (
    <section className="relative bg-black w-full py-16 px-4 md:px-8 lg:px-2">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-500 blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-10"> */}
        {/* Left column - Profile */}

        {/* Right column - Content */}
        <div className="lg:col-span-8">
          <div className="bg-black backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl h-full overflow-hidden">
            {/* Premium Toggle */}
            <div className="p-6 pb-0">
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-1.5 flex items-center justify-center gap-1 max-w-xs mx-auto border border-zinc-800">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 w-full ${
                    activeTab === "about"
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {activeTab === "about" && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg animate-in-toggle"></span>
                  )}
                  <User
                    className={`h-4 w-4 z-10 ${
                      activeTab === "about" ? "text-white" : ""
                    }`}
                  />
                  <span className="z-10">About</span>
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 w-full ${
                    activeTab === "experience"
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {activeTab === "experience" && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg animate-in-toggle"></span>
                  )}
                  <Code
                    className={`h-4 w-4 z-10 ${
                      activeTab === "experience" ? "text-white" : ""
                    }`}
                  />
                  <span className="z-10">Experience</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6" style={{ minHeight: `${contentHeight}px` }}>
              {activeTab === "about" && (
                <div
                  ref={aboutContentRef}
                  className="space-y-6 animate-in fade-in duration-300"
                >
                  <div className="space-y-4">
                    <p className="text-zinc-300 leading-relaxed">
                      Hello! I'm Naman Dadhich, a passionate Full Stack
                      Developer with over 1 years of experience in building web
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
                    <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                      Download Resume
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === "experience" && (
                <div
                  className="animate-in fade-in duration-300 overflow-y-auto custom-scrollbar pr-2"
                  style={{ maxHeight: `${contentHeight}px` }}
                >
                  <div className="space-y-8">
                    {/* Experience Item 1 */}
                    <div className="relative pl-8 pb-8">
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-purple-500 via-purple-500/50 to-purple-500/20"></div>
                      <div className="absolute w-5 h-5 rounded-full border-2 border-purple-500 bg-zinc-900 -left-[11px] top-0 z-10"></div>
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-[4px] z-20"></div>

                      <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/50 p-5 shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:border-purple-500/30">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-lg">
                              Senior Frontend Developer
                            </h4>
                            <p className="text-purple-400">TechCorp Inc.</p>
                          </div>
                          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium">
                            2021 - Present
                          </div>
                        </div>
                        <p className="text-zinc-300">
                          Led the frontend development team in building a modern
                          SaaS platform using Next.js and TypeScript.
                          Implemented CI/CD pipelines and improved performance
                          by 40%.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            React
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            Next.js
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            TypeScript
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            CI/CD
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="relative pl-8 pb-8">
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-purple-500/10"></div>
                      <div className="absolute w-5 h-5 rounded-full border-2 border-purple-500/70 bg-zinc-900 -left-[11px] top-0 z-10"></div>
                      <div className="absolute w-3 h-3 bg-purple-500/70 rounded-full -left-[7px] top-[4px] z-20"></div>

                      <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/50 p-5 shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:border-purple-500/30">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-lg">
                              Web Developer
                            </h4>
                            <p className="text-purple-400">
                              Pears Global Hackathon
                            </p>
                          </div>
                          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium">
                            2025
                          </div>
                        </div>
                        <p className="text-zinc-300">
                          Developed and maintained multiple client projects
                          using React, Node.js, and MongoDB. Collaborated with
                          design teams to implement responsive UI components.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            React
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            Node.js
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            MongoDB
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            UI/UX
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Experience Item 3 */}
                    <div className="relative pl-8 pb-8">
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-purple-500/30 via-purple-500/20 to-purple-500/5"></div>
                      <div className="absolute w-5 h-5 rounded-full border-2 border-purple-500/50 bg-zinc-900 -left-[11px] top-0 z-10"></div>
                      <div className="absolute w-3 h-3 bg-purple-500/50 rounded-full -left-[7px] top-[4px] z-20"></div>

                      <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/50 p-5 shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:border-purple-500/30">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-lg">
                              Web Developer
                            </h4>
                            <p className="text-purple-400">Code Kshetra 2.0</p>
                          </div>
                          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium">
                            2024 - 2025
                          </div>
                        </div>
                        <p className="text-zinc-300">
                          I had the privilege of participating in a prestigious
                          national-level hackathon organized by Geek Room
                          (MSIT). During the event, I worked on a website using
                          React.js, which proved to be an incredible learning
                          experience. Collaborating with a talented team and
                          overcoming challenges together made this journey truly
                          unforgettable.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            HTML/CSS
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            JavaScript
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            WordPress
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            PHP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Experience Item 4 */}
                    <div className="relative pl-8">
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-purple-500/10 to-transparent"></div>
                      <div className="absolute w-5 h-5 rounded-full border-2 border-purple-500/30 bg-zinc-900 -left-[11px] top-0 z-10"></div>
                      <div className="absolute w-3 h-3 bg-purple-500/30 rounded-full -left-[7px] top-[4px] z-20"></div>

                      <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/50 p-5 shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:border-purple-500/30">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-lg">
                              Web Developer
                            </h4>
                            <p className="text-purple-400">Code Cubicle 3.0</p>
                          </div>
                          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium">
                            2024
                          </div>
                        </div>
                        <p className="text-zinc-300">
                          It was one of the major hackathons organized by Geek
                          Room (MSIT), and I had the opportunity to work with
                          their team. I worked on a website using Next.js, which
                          provided a great learning experience. Collaborating
                          with talented individuals and tackling challenges
                          together made it a memorable event.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            Figma
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            HTML/CSS
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            UI/UX
                          </span>
                          <span className="px-2 py-1 bg-zinc-700/50 rounded-md text-zinc-300 text-xs">
                            Photoshop
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

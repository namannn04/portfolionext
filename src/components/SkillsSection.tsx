"use client";

import { useState } from "react";
import { Code2, Database, Layers, Wrench, Crown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Move skills to the top so it is accessible for type inference
const skills = {
  languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "HTML",
    "CSS",
    "SQL",
    "DOM",
  ],
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "TailwindCSS",
    "Redux",
    "Rest API",
    "Framer Motion",
    "Mongoose ODM",
    "Bootstrap",
  ],
  databases: ["MongoDB", "MySQL", "Firebase"],
  tools: [
    "Git",
    "AWS",
    "Vercel",
    "Netlify",
    "Render",
    "Figma",
    "VS Code",
    "Postman",
    "GitHub Actions",
  ],
  softSkills: [
    "Problem Solving",
    "Teamwork",
    "Leadership",
    "Adaptability",
  ],
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof skills>("languages");

  const categoryIcons = {
    languages: <Code2 className="h-6 w-6" />,
    frameworks: <Layers className="h-6 w-6" />,
    databases: <Database className="h-6 w-6" />,
    tools: <Wrench className="h-6 w-6" />,
    softSkills: <Crown className="h-6 w-6" />,
  };

  const categoryLabels = {
    languages: "Languages",
    frameworks: "Libraries & Frameworks",
    databases: "Databases",
    tools: "Tools & Platforms",
    softSkills: "Soft Skills",
  };

  return (
    <section
      id="skills"
      className="py-16 px-4 md:px-8 text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-400 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="text-teal-400 text-lg font-medium tracking-wider uppercase mb-2">
            Professional Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            My{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof skills)}
              className={`p-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm ${
                activeCategory === category
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20"
                  : "bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700"
              }`}
            >
              <div
                className={`${
                  activeCategory === category ? "text-white" : "text-teal-400"
                }`}
              >
                {categoryIcons[category as keyof typeof skills]}
              </div>
              <span className="font-medium">
                {categoryLabels[category as keyof typeof skills]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
            <div className="absolute -top-6 left-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
              {categoryLabels[activeCategory]}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {skills[activeCategory].map((skill) => (
                <div key={skill} className="group relative perspective-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg transform rotate-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <Badge className="w-full py-3 px-4 text-center bg-slate-800 hover:bg-slate-800 text-white border border-slate-700/50 relative z-10 group-hover:translate-y-0.5 group-hover:-translate-x-0.5 transition-transform duration-300">
                    <span className="font-medium text-sm">{skill}</span>
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border-l-4 border-teal-500 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-teal-500/20 p-2 rounded-lg">
                <Code2 className="h-5 w-5 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold">Skill Progression</h3>
            </div>
            <p className="text-slate-300">
              Continuously expanding my technical arsenal with cutting-edge
              technologies and best practices to deliver exceptional digital
              experiences.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border-l-4 border-cyan-500 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-cyan-500/20 p-2 rounded-lg">
                <Layers className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold">Learning Approach</h3>
            </div>
            <p className="text-slate-300">
              Embracing challenges through hands-on projects and collaborative
              development, turning complex problems into elegant solutions.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
            <Link href="/resume">
              <button className="relative px-7 py-3 bg-slate-900 rounded-lg leading-none flex items-center divide-x divide-gray-600">
                <span className="flex items-center space-x-2 pr-6">
                  <Wrench className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-100 font-medium">
                    View Full Resume
                  </span>
                </span>
                <span className="pl-6 text-cyan-400 group-hover:text-gray-100 transition duration-300">
                  See more &rarr;
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

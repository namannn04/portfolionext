"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, Database, Layers, Wrench, Crown } from "lucide-react";
import Link from "next/link";

const skills = {
  languages: [
    "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "HTML", "CSS", "SQL", "DOM",
  ],
  frameworks: [
    "React", "Next.js", "Node.js", "Express.js", "TailwindCSS", "Redux",
    "Rest API", "Framer Motion", "Mongoose ODM", "Bootstrap", "Prisma",
    "shadcn/ui", "JWT", "Bcrypt", "Material-UI",
  ],
  databases: ["MongoDB", "MySQL", "Firebase", "PostgreSQL"],
  tools: [
    "Git", "AWS", "Vercel", "Netlify", "Render", "Figma", "VS Code",
    "Postman", "GitHub Actions", "Cloudinary",
  ],
  softSkills: ["Problem Solving", "Teamwork", "Leadership", "Adaptability"],
};

const categoryMeta: Record<
  keyof typeof skills,
  { icon: React.ReactNode; label: string; emoji: string; color: string }
> = {
  languages: {
    icon: <Code2 className="h-5 w-5" />,
    label: "Languages",
    emoji: "⚔️",
    color: "var(--mc-diamond)",
  },
  frameworks: {
    icon: <Layers className="h-5 w-5" />,
    label: "Libraries & Frameworks",
    emoji: "🛡️",
    color: "var(--mc-grass)",
  },
  databases: {
    icon: <Database className="h-5 w-5" />,
    label: "Databases",
    emoji: "📦",
    color: "var(--mc-gold)",
  },
  tools: {
    icon: <Wrench className="h-5 w-5" />,
    label: "Tools & Platforms",
    emoji: "⛏️",
    color: "var(--mc-iron)",
  },
  softSkills: {
    icon: <Crown className="h-5 w-5" />,
    label: "Soft Skills",
    emoji: "👑",
    color: "var(--mc-emerald)",
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof skills>("languages");
  const [isVisible, setIsVisible] = useState(false);
  const [placedItems, setPlacedItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

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

  // Stagger "place block" animation when category switches
  useEffect(() => {
    setPlacedItems(new Set());
    const items = skills[activeCategory];
    items.forEach((_, i) => {
      setTimeout(() => {
        setPlacedItems((prev) => new Set(prev).add(i));
      }, i * 60);
    });
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 px-4 md:px-8 text-t-text relative overflow-hidden"
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col items-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2
            className="text-4xl md:text-6xl font-black text-center text-mc-grass uppercase tracking-wider"
            style={{
              textShadow:
                "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)",
            }}
          >
            My Tech Stack
          </h2>
          <div className="mt-4 flex gap-1">
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
        </div>

        {/* Category tabs - Crafting tab style */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-10 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {(Object.keys(skills) as (keyof typeof skills)[]).map((category) => {
            const meta = categoryMeta[category];
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative p-3 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer text-sm`}
                style={{
                  background: isActive ? meta.color : "var(--t-surface)",
                  color: isActive ? "white" : "var(--t-text2)",
                  border: `2px solid ${isActive ? meta.color : "var(--t-border)"}`,
                  boxShadow: isActive
                    ? `inset 1px 1px 0 rgba(255,255,255,0.25), inset -1px -1px 0 rgba(0,0,0,0.3), 0 0 15px ${meta.color}40, 2px 2px 0 rgba(0,0,0,0.3)`
                    : "inset 1px 1px 0 rgba(255,255,255,0.06), inset -1px -1px 0 rgba(0,0,0,0.2)",
                }}
              >
                <span>{meta.emoji}</span>
                <span className="font-medium hidden sm:inline">
                  {meta.label}
                </span>
                <span className="font-medium sm:hidden">
                  {meta.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills grid - Inventory slots */}
        <div
          className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div
            style={{
              background: "var(--t-surface)",
              border: "3px solid var(--t-border)",
              boxShadow:
                "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
            }}
          >
            {/* Panel header */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{
                background: "var(--t-bg2)",
                borderBottom: "2px solid var(--t-border)",
              }}
            >
              <div
                className="w-3 h-3"
                style={{ background: categoryMeta[activeCategory].color }}
              />
              <span className="text-t-text font-bold uppercase text-sm tracking-wider">
                {categoryMeta[activeCategory].label}
              </span>
              <span className="text-t-dim text-xs ml-auto">
                {skills[activeCategory].length} items
              </span>
            </div>

            {/* Skills inventory grid */}
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {skills[activeCategory].map((skill, index) => (
                  <div
                    key={skill}
                    className={`mc-slot relative group cursor-default flex items-center justify-center py-3 px-3 text-center transition-all duration-200 mc-crack-hover ${placedItems.has(index)
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                      }`}
                    style={{
                      borderColor: placedItems.has(index)
                        ? undefined
                        : "transparent",
                    }}
                  >
                    <span className="text-sm font-medium text-t-text2 group-hover:text-mc-grass transition-colors">
                      {skill}
                    </span>

                    {/* Item count in corner */}
                    <span
                      className="absolute bottom-0.5 right-1 text-[10px] text-t-dim font-mono"
                      style={{
                        textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div
            className="p-6"
            style={{
              background: "var(--t-surface)",
              border: "2px solid var(--t-border)",
              borderLeft: "4px solid var(--mc-grass)",
              boxShadow:
                "inset 1px 1px 0 rgba(255,255,255,0.06), inset -1px -1px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="p-2"
                style={{
                  background: "var(--mc-grass)",
                  boxShadow:
                    "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)",
                }}
              >
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold">Skill Progression</h3>
            </div>
            <p className="text-t-text2 text-sm">
              Continuously expanding my technical arsenal with cutting-edge
              technologies and best practices to deliver exceptional digital
              experiences.
            </p>
          </div>

          <div
            className="p-6"
            style={{
              background: "var(--t-surface)",
              border: "2px solid var(--t-border)",
              borderLeft: "4px solid var(--mc-diamond)",
              boxShadow:
                "inset 1px 1px 0 rgba(255,255,255,0.06), inset -1px -1px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="p-2"
                style={{
                  background: "var(--mc-diamond)",
                  boxShadow:
                    "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)",
                }}
              >
                <Layers className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold">Learning Approach</h3>
            </div>
            <p className="text-t-text2 text-sm">
              Embracing challenges through hands-on projects and collaborative
              development, turning complex problems into elegant solutions.
            </p>
          </div>
        </div>

        {/* Resume link */}
        <div className="mt-12 flex justify-center">
          <Link href="/resume">
            <button
              className="cursor-pointer px-6 py-3 flex items-center gap-4 text-t-text font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "var(--t-surface)",
                border: "2px solid var(--t-border)",
                boxShadow:
                  "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25), 3px 3px 0 rgba(0,0,0,0.3)",
              }}
            >
              <span className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-mc-grass" />
                <span>View Full Resume</span>
              </span>
              <span className="text-mc-diamond">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

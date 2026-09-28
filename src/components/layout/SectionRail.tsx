"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { scrollToHash, scrollToTop, useLenis } from "./SmoothScroll";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Toolkit" },
  { id: "events", label: "Community" },
  { id: "contact", label: "Contact" },
];

/** Fixed index of sections on large screens, with overall scroll progress. */
export default function SectionRail() {
  const lenis = useLenis();
  const [active, setActive] = useState("top");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.45;
      let current = "top";
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) current = section.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 xl:block 2xl:right-6">
      <div className="relative flex gap-2">
        <ol className="flex flex-col items-end gap-3">
          {SECTIONS.map((section, index) => {
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <a
                  href={section.id === "top" ? "/" : `/#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (section.id === "top") scrollToTop(lenis);
                    else scrollToHash(lenis, `#${section.id}`);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex items-center gap-2 py-0.5"
                >
                  <span
                    className={cn(
                      "pointer-events-none absolute right-full mr-3 rounded-full border border-line/70 bg-ink/85 px-2.5 py-1 font-mono text-[0.68rem] tracking-wide whitespace-nowrap uppercase backdrop-blur-md transition-[opacity,transform] duration-300 ease-out-expo",
                      "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                    )}
                  >
                    {section.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[0.62rem] tabular-nums transition-colors duration-300",
                      isActive ? "text-accent" : "text-mute/70 group-hover:text-fg",
                    )}
                  >
                    {String(index).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "block h-px transition-[width,background-color] duration-500 ease-out-expo",
                      isActive ? "w-4 bg-accent" : "w-2 bg-fg/35 group-hover:w-3 group-hover:bg-fg",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ol>
        <div className="relative w-px overflow-hidden bg-line/60">
          <motion.div className="absolute inset-x-0 top-0 h-full origin-top bg-accent" style={{ scaleY: progress }} />
        </div>
      </div>
    </nav>
  );
}

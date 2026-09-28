"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experiences, profile, stats } from "@/content/data";
import { useLocalTime } from "@/lib/useLocalTime";
import { ScrollHighlight, SectionHeading, ease } from "@/components/ui/motion";
import Tile from "@/components/ui/Tile";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [display, setDisplay] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export default function About() {
  const [lead, ...story] = profile.about;
  const [expanded, setExpanded] = useState(false);
  const time = useLocalTime(profile.timezone);
  const current = experiences.filter((item) => item.period.includes("Present"));

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading index="01" label="About" title="Code, community and a lot of chess." />

        <div className="mt-16 grid auto-rows-auto grid-cols-1 gap-3 sm:grid-cols-2 md:mt-24 md:gap-4 lg:grid-cols-12">
          {/* Portrait */}
          <Tile className="sm:col-span-2 lg:col-span-4 lg:row-span-3">
            <div className="relative h-full min-h-[26rem] overflow-hidden">
              <Image
                src="/profileBlack.png"
                alt="Portrait of Naman Dadhich"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top grayscale-[30%] transition-[filter,transform] duration-1000 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-ink/80 px-4 py-3 text-sm backdrop-blur-md">
                <span>{profile.name}</span>
                <span className="font-mono text-xs text-mute">@{profile.handle}</span>
              </div>
            </div>
          </Tile>

          {/* Lead statement */}
          <Tile className="p-6 sm:col-span-2 md:p-10 lg:col-span-8" delay={0.05}>
            <Label>In short</Label>
            <ScrollHighlight
              text={lead}
              className="display mt-5 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.18] font-medium tracking-[-0.02em]"
            />
          </Tile>

          {/* Stats */}
          {stats.map((stat, index) => (
            <Tile key={stat.label} className="p-6 lg:col-span-2" delay={0.08 + index * 0.04}>
              <p className="display text-5xl text-fg md:text-6xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-3 text-sm text-mute">{stat.label}</p>
            </Tile>
          ))}

          {/* Story */}
          <Tile className="flex flex-col p-6 sm:col-span-2 md:p-8 lg:col-span-5" delay={0.1}>
            <Label>The longer story</Label>
            <p className="mt-4 text-lg leading-relaxed text-fg-2">{story[0]}</p>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="overflow-hidden"
                >
                  {story.slice(1).map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="mt-4 text-lg leading-relaxed text-fg-2">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
            >
              {expanded ? "Show less" : "Read the full story"}
              <span
                aria-hidden="true"
                className="transition-transform duration-500 ease-out-expo"
                style={{ rotate: expanded ? "180deg" : "0deg" }}
              >
                ↓
              </span>
            </button>
          </Tile>

          {/* Right stack */}
          <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2 md:gap-4 lg:col-span-3 lg:grid-cols-1">
            <Tile className="p-6" delay={0.12}>
              <Label>Education</Label>
              <p className="mt-4 text-fg">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-mute">
                {profile.education.school}, {profile.education.year}
              </p>
            </Tile>
            <Tile className="p-6" delay={0.16}>
              <Label>Local time</Label>
              <p className="display mt-4 text-4xl tabular-nums">{time || "--:--"}</p>
              <p className="mt-1 text-sm text-mute">{profile.location} · open to remote</p>
            </Tile>
          </div>

          {/* Now + off the clock */}
          <Tile className="p-6 sm:col-span-2 md:p-8 lg:col-span-6" delay={0.14}>
            <Label>Right now</Label>
            <ul className="mt-4 space-y-3">
              {current.map((item) => (
                <li
                  key={item.company}
                  className="flex items-baseline justify-between gap-4 border-b border-line/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-fg">{item.title}</span>
                  <span className="text-right text-sm text-mute">{item.company}</span>
                </li>
              ))}
            </ul>
          </Tile>
          <Tile className="relative p-6 sm:col-span-2 md:p-8 lg:col-span-6" delay={0.18}>
            <Label>Off the clock</Label>
            <p className="mt-4 max-w-[30ch] text-lg text-fg-2">
              Chess between lectures, music on repeat, and always one more side project.
            </p>
            <span
              aria-hidden="true"
              className="absolute right-6 bottom-2 text-[5.5rem] leading-none text-fg/10 transition-[color,transform] duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:rotate-[-8deg] group-hover:text-accent/40"
            >
              ♞
            </span>
          </Tile>
        </div>
      </div>
    </section>
  );
}

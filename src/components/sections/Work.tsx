"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { featuredProjects, soloProjects, type Project } from "@/content/data";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { Reveal, SectionHeading, Tilt, ease, useMediaQuery } from "@/components/ui/motion";
import { scrollToElement, useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

type Entry = Project & { kind: "Team" | "Solo" };

const entries: Entry[] = [
  ...featuredProjects.map((project) => ({ ...project, kind: "Team" as const })),
  ...soloProjects.map((project) => ({ ...project, kind: "Solo" as const })),
];

const pad = (value: number) => String(value).padStart(2, "0");

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-line/80 px-3 py-1 text-xs text-fg-2">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function VisitLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex h-11 shrink-0 items-center gap-3 rounded-full bg-accent pr-1.5 pl-5 text-sm font-medium text-accent-ink transition-transform active:scale-[0.97]"
    >
      Visit project
      <span className="grid size-8 place-items-center rounded-full bg-accent-ink text-accent transition-transform duration-500 ease-out-expo group-hover:rotate-45">
        ↗
      </span>
    </a>
  );
}

function Details({ project, index }: { project: Entry; index: number }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-mute">
        <span className="text-accent">{pad(index + 1)}</span>
        <span className="h-px w-6 bg-line" />
        <span className="uppercase">{project.kind} project</span>
        {project.status && (
          <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[0.68rem] tracking-wide text-accent uppercase">
            {project.status}
          </span>
        )}
      </div>
      <p className="max-w-[56ch] text-lg leading-relaxed text-fg-2">{project.description}</p>
      {project.contribution && (
        <p className="max-w-[56ch] border-l-2 border-accent/70 pl-4 text-sm leading-relaxed text-fg-2">
          <span className="eyebrow mb-1 block">My role</span>
          {project.contribution}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tags tags={project.tags} />
        {project.href && <VisitLink href={project.href} />}
      </div>
    </div>
  );
}

/** Desktop: a scroll-driven index on the left drives a sticky showcase on the right. */
function Showcase() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const probe = window.innerHeight * 0.5;
      let best = 0;
      let bestDistance = Infinity;
      items.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - probe);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const project = entries[active];

  return (
    <div className="mt-16 grid grid-cols-12 gap-10">
      <ol className="col-span-5 pt-[18svh] pb-[34svh]">
        {entries.map((entry, index) => {
          const isActive = index === active;
          const firstSolo = entry.kind === "Solo" && entries[index - 1]?.kind === "Team";
          return (
            <li
              key={entry.title}
              ref={(node) => {
                items.current[index] = node;
              }}
              className={cn(firstSolo && "mt-14")}
            >
              {index === 0 && <p className="eyebrow mb-4">Team products</p>}
              {firstSolo && <p className="eyebrow mb-4">Solo builds</p>}
              <button
                type="button"
                onClick={() => {
                  const node = items.current[index];
                  if (node) scrollToElement(lenis, node, -(window.innerHeight / 2 - node.offsetHeight / 2));
                }}
                aria-current={isActive ? "true" : undefined}
                data-cursor="View"
                className="group flex w-full items-baseline gap-5 py-3 text-left"
              >
                <span
                  className={cn(
                    "font-mono text-xs transition-colors duration-500",
                    isActive ? "text-accent" : "text-mute",
                  )}
                >
                  {pad(index + 1)}
                </span>
                <span
                  className={cn(
                    "display text-[clamp(2.25rem,4.2vw,4.25rem)] leading-[0.95] transition-[color,transform] duration-700 ease-out-expo",
                    isActive ? "translate-x-2 text-fg" : "text-fg/25 group-hover:translate-x-1 group-hover:text-fg/60",
                  )}
                >
                  {entry.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="col-span-7">
        <div className="sticky top-[11svh] flex h-[80svh] flex-col gap-7">
          <Tilt className="min-h-0 flex-1 rounded-[2rem]" max={3}>
            <div
              data-cursor={project.href ? "Visit" : "Preview"}
              onClick={() => project.href && window.open(project.href, "_blank", "noopener")}
              className="relative h-full overflow-hidden rounded-[inherit] border border-line/70 bg-ink-2"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={project.title}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <ProjectMedia
                    video={project.video}
                    poster={project.poster}
                    title={project.title}
                    sizes="60vw"
                    className="size-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="pointer-events-none absolute right-6 bottom-5 left-6 flex items-end justify-between gap-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={project.title}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease }}
                    className="display text-4xl text-fg"
                  >
                    {project.title}
                  </motion.span>
                </AnimatePresence>
                <span className="font-mono text-xs text-fg-2 tabular-nums">
                  {pad(active + 1)} / {pad(entries.length)}
                </span>
              </div>
              {/* Progress ticks across the top of the panel */}
              <div className="pointer-events-none absolute inset-x-6 top-5 flex gap-1.5">
                {entries.map((entry, index) => (
                  <span
                    key={entry.title}
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-500",
                      index <= active ? "bg-accent" : "bg-fg/20",
                    )}
                  />
                ))}
              </div>
            </div>
          </Tilt>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              <Details project={project} index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Phones and tablets: one clean card per project. */
function Cards() {
  return (
    <ol className="mt-14 flex flex-col gap-16">
      {entries.map((project, index) => (
        <Reveal as="li" key={project.title}>
          <article className="flex flex-col gap-6">
            <ProjectMedia
              video={project.video}
              poster={project.poster}
              title={project.title}
              sizes="100vw"
              className="aspect-[16/10] rounded-[1.5rem] border border-line/70"
            />
            <h3 className="display text-[clamp(2.25rem,9vw,3.5rem)]">{project.title}</h3>
            <Details project={project} index={index} />
          </article>
        </Reveal>
      ))}
    </ol>
  );
}

export default function Work() {
  const desktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="03" label="Selected work" title="Things I’ve helped ship." />
          <Reveal className="max-w-[36ch] text-fg-2 md:pb-3">
            {entries.length} projects: team products first, then the solo builds where I learned the most.
          </Reveal>
        </div>
        {desktop ? <Showcase /> : <Cards />}
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { featuredProjects, soloProjects, type Project } from "@/content/data";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { Reveal, SectionHeading, Tilt, useMediaQuery } from "@/components/ui/motion";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-ink-3 px-3 py-1 text-xs text-fg-2">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function VisitLink({ href, label = "Visit project" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 text-sm font-medium text-fg"
    >
      <span className="link-underline">{label}</span>
      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}

/** Makes the media itself clickable when there's somewhere to go. */
function MediaLink({ href, title, children }: { href?: string; title: string; children: React.ReactNode }) {
  if (!href) return <div data-cursor="Preview">{children}</div>;
  return (
    // The visible text link is the keyboard target; this is a bigger mouse target.
    <a href={href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" data-cursor="Visit" title={title}>
      {children}
    </a>
  );
}

function FeaturedCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks slightly as the ones after it slide over the top.
  // Mobile cards can be taller than the screen, so they scroll normally there.
  const stacked = useMediaQuery("(min-width: 768px)");
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.045]);
  const dim = useTransform(progress, [start, 1], [0, (total - index - 1) * 0.18]);

  return (
    <div className="md:sticky" style={{ top: `calc(5.5rem + ${index * 1.25}rem)` }}>
      <motion.article
        style={stacked ? { scale } : undefined}
        className="relative origin-top overflow-hidden rounded-[1.75rem] border border-line/70 bg-ink-2 p-4 shadow-[0_-24px_60px_-30px_rgb(0_0_0/0.8)] md:rounded-[2.25rem] md:p-6"
      >
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-6 p-2 md:col-span-5 md:p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-mute">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              {project.status && (
                <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-accent uppercase">
                  {project.status}
                </span>
              )}
            </div>
            <h3 className="display text-[clamp(2.25rem,3.2vw,3.5rem)] break-words">{project.title}</h3>
            <p className="text-fg-2 leading-relaxed">{project.description}</p>
            {project.contribution && (
              <div className="border-l-2 border-accent/70 pl-4 text-sm leading-relaxed text-fg-2">
                <p className="eyebrow mb-1.5">My role</p>
                {project.contribution}
              </div>
            )}
            <div className="mt-auto flex flex-col gap-5">
              <Tags tags={project.tags} />
              {project.href && <VisitLink href={project.href} label="Visit live site" />}
            </div>
          </div>
          <div className="order-first md:order-none md:col-span-7">
            <MediaLink href={project.href} title={project.title}>
              <Tilt className="h-full rounded-[1.25rem] md:rounded-[1.75rem]" max={4}>
                <ProjectMedia
                  video={project.video}
                  poster={project.poster}
                  title={project.title}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="aspect-[16/10] h-full rounded-[inherit] md:aspect-auto md:min-h-[min(26rem,58svh)]"
                />
              </Tilt>
            </MediaLink>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ opacity: stacked ? dim : 0 }}
          className="pointer-events-none absolute inset-0 bg-ink"
        />
      </motion.article>
    </div>
  );
}

function SoloCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="li" delay={(index % 2) * 0.08} className="group">
      <MediaLink href={project.href} title={project.title}>
        <Tilt className="rounded-[1.5rem]" max={5}>
          <ProjectMedia
            video={project.video}
            poster={project.poster}
            title={project.title}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-[16/10] rounded-[inherit] border border-line/60"
          />
        </Tilt>
      </MediaLink>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="display text-2xl font-semibold md:text-3xl">{project.title}</h3>
          <p className="mt-2 max-w-[44ch] text-fg-2">{project.description}</p>
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${project.title}`}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-[background-color,color,border-color,transform] duration-500 ease-out-expo hover:rotate-45 hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            ↗
          </a>
        )}
      </div>
      <div className="mt-4">
        <Tags tags={project.tags} />
      </div>
    </Reveal>
  );
}

export default function Work() {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="03" label="Selected work" title="Things I’ve helped ship." />
          <Reveal className="max-w-[36ch] text-fg-2 md:pb-3">
            Team products first, then the solo builds where I learned the most.
          </Reveal>
        </div>

        <div ref={stack} className="mt-16 flex flex-col gap-10 md:mt-24 md:gap-16">
          {featuredProjects.map((project, index) => (
            <FeaturedCard
              key={project.title}
              project={project}
              index={index}
              total={featuredProjects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <div className="mt-28 md:mt-40">
          <Reveal className="flex items-center justify-between border-b border-line/60 pb-5">
            <h3 className="eyebrow">Solo projects</h3>
            <span className="font-mono text-xs text-mute">{String(soloProjects.length).padStart(2, "0")}</span>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {soloProjects.map((project, index) => (
              <SoloCard key={project.title} project={project} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

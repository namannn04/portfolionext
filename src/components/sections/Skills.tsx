"use client";

import dynamic from "next/dynamic";
import { profile, skills } from "@/content/data";
import { Reveal, SectionHeading } from "@/components/ui/motion";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => <div className="h-[140px] animate-pulse rounded-xl bg-ink-3/60" />,
});

function Marquee({ items, reverse = false, duration = 45 }: { items: string[]; reverse?: boolean; duration?: number }) {
  return (
    <div
      className="marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      <div
        className="marquee-track flex shrink-0 items-center"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="display flex items-center text-[clamp(2.5rem,7vw,6rem)] whitespace-nowrap text-fg/90"
          >
            {item}
            <span className="mx-6 inline-block size-3 rotate-45 bg-accent md:mx-10 md:size-4" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const primary = ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS", "Docker"];
  const secondary = [
    "Express.js",
    "Prisma",
    "MongoDB",
    "Framer Motion",
    "Three.js",
    "Firebase",
    "Redux",
    "GitHub Actions",
  ];

  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading index="04" label="Toolkit" title="The stack I reach for." />
      </div>

      <div className="mt-16 flex flex-col gap-2 md:mt-24 md:gap-4">
        <Marquee items={primary} />
        <Marquee items={secondary} reverse duration={55} />
      </div>

      <div className="shell mt-20 md:mt-28">
        <dl className="border-t border-line/60">
          {skills.map((group, index) => (
            <Reveal
              key={group.label}
              delay={index * 0.04}
              className="grid gap-4 border-b border-line/60 py-7 md:grid-cols-[16rem_1fr] md:gap-10 md:py-9"
            >
              <dt className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-lg text-fg">{group.label}</span>
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg-2 transition-colors duration-300 hover:border-accent hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-20 rounded-[1.75rem] border border-line/70 bg-ink-2/80 p-5 backdrop-blur-sm md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Open source</p>
              <p className="mt-1 text-lg">GitHub activity</p>
            </div>
            <a
              href={`https://github.com/${profile.handle}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-4 py-2 font-mono text-xs text-fg-2 transition-colors hover:border-fg hover:text-fg"
            >
              @{profile.handle} ↗
            </a>
          </div>
          <div className="overflow-x-auto text-fg-2 [scrollbar-width:thin]">
            <GitHubCalendar
              username={profile.handle}
              colorScheme="dark"
              blockSize={12}
              blockMargin={4}
              fontSize={13}
              theme={{ dark: ["#1d2027", "#3b4a1d", "#6a8a24", "#a3cf2f", "#d3f45a"] }}
              errorMessage="GitHub activity is unavailable right now."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

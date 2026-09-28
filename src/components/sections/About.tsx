"use client";

import Image from "next/image";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/content/data";
import { Reveal, ScrollHighlight, SectionHeading, Tilt } from "@/components/ui/motion";

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

export default function About() {
  const [lead, ...rest] = profile.about;

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading index="01" label="About" title="Code, community and a lot of chess." />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <Tilt className="rounded-3xl" max={6}>
                  <div className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-ink-3 sm:aspect-[5/7]">
                    <Image
                      src="/profileBlack.png"
                      alt="Portrait of Naman Dadhich"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
                    />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-ink/80 px-4 py-3 text-sm backdrop-blur-md">
                      <span>{profile.name}</span>
                      <span className="font-mono text-xs text-mute">@{profile.handle}</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="mt-8 divide-y divide-line/60 border-y border-line/60 text-sm">
                  <div className="flex flex-col gap-1 py-4">
                    <dt className="eyebrow">Education</dt>
                    <dd className="text-fg">{profile.education.degree}</dd>
                    <dd className="text-mute">
                      {profile.education.school}, {profile.education.year}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 py-4">
                    <dt className="eyebrow">Location</dt>
                    <dd className="text-fg">{profile.location}</dd>
                    <dd className="text-mute">Available for remote work</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <ScrollHighlight
              text={lead}
              className="display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.12] tracking-[-0.025em] font-medium"
            />
            <div className="mt-14 grid gap-6 text-lg leading-relaxed text-fg-2 md:grid-cols-2 md:gap-x-10">
              {rest.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05} as="p" className={index === 0 ? "md:col-span-2 md:max-w-[62ch]" : ""}>
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <dl className="mt-20 grid grid-cols-2 border-t border-line/60 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 0.06}
                  className="border-line/60 py-6 pr-4 max-lg:border-b max-lg:odd:border-r max-lg:even:pl-6 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="display text-5xl text-fg md:text-6xl">
                    <CountUp value={stat.value} />
                  </dd>
                  <dd aria-hidden="true" className="mt-3 text-sm text-mute">
                    {stat.label}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

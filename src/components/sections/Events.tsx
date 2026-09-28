"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { events, type EventItem } from "@/content/data";
import { Reveal, SectionHeading, useMediaQuery } from "@/components/ui/motion";

function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <article className="group flex w-[82vw] shrink-0 snap-start flex-col sm:w-[26rem] md:w-[34rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink-3">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 82vw, 34rem"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-fg uppercase backdrop-blur-md">
          {event.role}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl font-semibold md:text-3xl">{event.title}</h3>
        <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="mt-1 text-sm text-mute">
        {event.date} · {event.location}
      </p>
      <p className="mt-3 max-w-[46ch] text-fg-2">{event.description}</p>
    </article>
  );
}

/** Desktop: vertical scroll drives a pinned horizontal track. */
function PinnedTrack() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={section} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max gap-8 px-[var(--gutter)] will-change-transform">
          {events.map((event, index) => (
            <EventCard key={event.title} event={event} index={index} />
          ))}
        </motion.div>
        <div className="shell mt-12">
          <div className="h-px w-full overflow-hidden bg-line/60">
            <motion.div className="h-full bg-accent" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const desktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="events" className="relative pt-28 md:pt-40">
      <div className="shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading index="05" label="Community" title="Hackathons I’ve helped run." />
        <Reveal className="max-w-[36ch] text-fg-2 md:pb-3">
          From national-level hackathons to contests at Microsoft’s Gurugram office.
        </Reveal>
      </div>

      {desktop ? (
        <PinnedTrack />
      ) : (
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {events.map((event, index) => (
            <EventCard key={event.title} event={event} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

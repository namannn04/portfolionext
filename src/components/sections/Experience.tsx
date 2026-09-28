"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { experiences } from "@/content/data";
import { Reveal, SectionHeading, ease } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [open, setOpen] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 28 });
  const springY = useSpring(y, { stiffness: 260, damping: 28 });

  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="02" label="Experience" title="Where I’ve been building." />
          <Reveal className="max-w-[36ch] text-fg-2 md:pb-3">
            From enterprise dashboards to leading campus developer communities.
          </Reveal>
        </div>

        <div
          className="relative mt-16 md:mt-24"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - rect.left);
            y.set(event.clientY - rect.top);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <ol className="border-t border-line/60">
            {experiences.map((item, index) => {
              const isOpen = open === index;
              return (
                <Reveal as="li" key={item.company} delay={index * 0.06} className="border-b border-line/60">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(index)}
                    aria-expanded={isOpen}
                    aria-controls={`experience-${index}`}
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-7 text-left md:grid-cols-[10rem_1fr_1fr_auto] md:py-9"
                  >
                    <span className="col-span-2 font-mono text-xs text-mute md:col-span-1 md:text-sm">
                      {item.period}
                    </span>
                    <span className="display text-[clamp(1.75rem,3.4vw,3rem)] font-semibold transition-colors duration-300 group-hover:text-accent">
                      {item.title}
                    </span>
                    <span className="order-last col-span-2 text-fg-2 md:order-none md:col-span-1">{item.company}</span>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,border-color] duration-500 ease-out-expo md:size-12",
                        isOpen ? "rotate-45 border-accent bg-accent text-accent-ink" : "group-hover:border-fg",
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`experience-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 md:grid-cols-[10rem_1fr_1fr_auto] md:gap-x-6">
                          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-3 md:hidden">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="100vw"
                              className={cn(item.logo ? "bg-white object-contain p-8" : "object-cover")}
                            />
                          </div>
                          <p className="max-w-[62ch] text-lg leading-relaxed text-fg-2 md:col-span-2 md:col-start-2">
                            {item.description}
                          </p>
                          <ul className="flex flex-wrap content-start gap-2 md:col-span-1">
                            {item.skills.map((skill) => (
                              <li key={skill} className="rounded-full border border-line px-3 py-1.5 text-sm text-fg-2">
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ol>

          {/* Cursor-following preview, desktop pointers only */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
            style={{ x: springX, y: springY }}
          >
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-2xl border border-line bg-ink-3 shadow-2xl shadow-black/50"
                  style={{ width: 280, height: 170 }}
                >
                  {experiences.map((item, index) => (
                    <Image
                      key={item.image}
                      src={item.image}
                      alt=""
                      fill
                      sizes="280px"
                      className={cn(
                        "transition-opacity duration-300",
                        item.logo ? "bg-white object-contain p-8" : "object-cover",
                        hovered === index ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

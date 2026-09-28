"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content/data";
import { useIntroDone } from "@/lib/intro";
import { Magnetic, ease } from "@/components/ui/motion";
import { scrollToHash, useLenis } from "@/components/layout/SmoothScroll";

const meta = [
  { label: "Currently", value: "B.Tech CSE, MSIT ’27" },
  { label: "Previously", value: "SDE Intern at Zelosify" },
  { label: "Based in", value: "New Delhi · open to remote" },
];

const statement = ["Full-stack developer building", "scalable products and the", "communities around them."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const goTo = (hash: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToHash(lenis, hash);
  };

  // Everything waits for the preloader curtain, then staggers in.
  const show = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section ref={ref} id="top" className="relative flex min-h-[max(100svh,640px)] flex-col pt-24 md:pt-28">
      <motion.div style={{ y, opacity }} className="shell flex flex-1 flex-col">
        <motion.div {...show(0.5)} className="flex items-center justify-between gap-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-accent" />
            {profile.role}
          </p>
          <p className="eyebrow hidden pointer-fine:sm:block">
            Move through the name · Press <kbd className="rounded border border-line px-1.5 py-0.5 text-fg">/</kbd>
          </p>
        </motion.div>

        {/* The particle name renders here in WebGL; this keeps the space. */}
        <h1 className="sr-only">
          {profile.name}, {profile.role}
        </h1>
        <div className="flex-1" aria-hidden="true" />

        <div className="flex flex-col items-start gap-8 pb-8 md:items-center md:pb-10 md:text-center">
          <p className="display max-w-[24ch] text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.08] font-medium tracking-[-0.03em] text-fg">
            {statement.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={ready ? { y: "0%" } : undefined}
                  transition={{ duration: 1.2, ease, delay: 0.9 + index * 0.08 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.div {...show(1.25)} className="flex flex-wrap items-center gap-3 md:justify-center">
            <Magnetic>
              <Link
                href="/#work"
                onClick={goTo("#work")}
                data-cursor="Explore"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent pr-2 pl-6 font-medium text-accent-ink transition-transform duration-300 active:scale-[0.97]"
              >
                See selected work
                <span className="grid size-8 place-items-center rounded-full bg-accent-ink text-accent transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                  →
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/#contact"
                onClick={goTo("#contact")}
                className="inline-flex h-12 items-center rounded-full border border-line bg-ink/40 px-6 font-medium text-fg backdrop-blur-sm transition-colors hover:border-fg active:scale-[0.97]"
              >
                Get in touch
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.dl
          {...show(1.4)}
          className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line/60 py-6 text-sm md:grid-cols-4"
        >
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="eyebrow">{item.label}</dt>
              <dd className="mt-1.5 text-fg-2">{item.value}</dd>
            </div>
          ))}
          <div className="hidden items-end justify-end md:flex">
            <span className="flex items-center gap-3 text-mute">
              Scroll
              <span className="relative h-8 w-px overflow-hidden bg-line">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-fg"
                  animate={reduce ? undefined : { y: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </span>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  );
}

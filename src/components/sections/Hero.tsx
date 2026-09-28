"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content/data";
import { Magnetic, SplitText, ease } from "@/components/ui/motion";
import { scrollToHash, useLenis } from "@/components/layout/SmoothScroll";

const meta = [
  { label: "Currently", value: "B.Tech CSE, MSIT ’27" },
  { label: "Previously", value: "SDE Intern at Zelosify" },
  { label: "Based in", value: "New Delhi · open to remote" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const goTo = (hash: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToHash(lenis, hash);
  };

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col pt-24 md:pt-28">
      <motion.div style={{ y, opacity }} className="shell flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-end pb-10 md:justify-center md:pb-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {profile.role} — Portfolio 2026
          </motion.p>

          <h1 className="display text-[clamp(4.5rem,19vw,15.5rem)] md:text-[clamp(4.5rem,17vw,15.5rem)] leading-[0.84]">
            <span className="block">
              <SplitText text="Naman" animateOnMount delay={0.3} />
            </span>
            <span className="block text-fg-2">
              <SplitText text="Dadhich" animateOnMount delay={0.42} />
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.75 }}
              className="max-w-[34ch] text-lg leading-relaxed text-fg-2 md:text-xl"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Link
                  href="/#work"
                  onClick={goTo("#work")}
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
                  className="inline-flex h-12 items-center rounded-full border border-line px-6 font-medium text-fg transition-colors hover:border-fg active:scale-[0.97]"
                >
                  Get in touch
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <motion.dl
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
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

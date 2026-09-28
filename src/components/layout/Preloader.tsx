"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { intro } from "@/lib/intro";
import { useLenis } from "./SmoothScroll";

const SEEN_KEY = "nd-intro-seen";
const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Counter-and-curtain intro. Plays once per session; repeat visits and
 * reduced-motion users skip straight to the page.
 */
export default function Preloader() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      skip ||= sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; just play the intro.
    }
    if (skip) {
      setVisible(false);
      intro.finish();
      return;
    }

    const duration = 1900;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Fast start, lingering finish reads as "loading".
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        intro.finish();
        setVisible(false);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) {
      lenis?.start();
      document.documentElement.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  }, [visible, lenis]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.1, ease }}
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink-2 px-[var(--gutter)] py-8 md:py-10"
        >
          <div className="flex items-center justify-between font-mono text-xs tracking-wide text-mute uppercase">
            <span>Naman Dadhich</span>
            <span>Portfolio — {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="max-w-[26ch] text-sm leading-relaxed text-fg-2 md:text-base">
              Assembling particles, loading projects, warming up the GPU.
            </div>
            <div className="display text-[clamp(5rem,22vw,17rem)] leading-[0.8] tabular-nums text-fg">
              {String(count).padStart(3, "0")}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div className="h-full bg-accent" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Dot + trailing ring cursor for fine pointers. Elements can opt into a label
 * with `data-cursor="Label"`; links and buttons get a subtle grow.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(media.matches && !reduce.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const inspect = (target: Element | null) => {
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setInteractive(!!target?.closest("a, button, [role='button'], label, input, textarea"));
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      inspect(event.target as Element | null);
    };
    // Content moves under a still mouse while scrolling; re-check what's there.
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        inspect(document.elementFromPoint(x.get(), y.get()));
      });
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 88 : interactive ? 52 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}>
        <motion.div
          className={cn(
            "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-300",
            label ? "border-accent bg-accent text-accent-ink" : "border-fg/50 bg-transparent",
          )}
          animate={{ width: size, height: size, scale: pressed ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[0.68rem] font-medium tracking-wide uppercase"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute top-0 left-0" style={{ x, y, opacity: visible && !label ? 1 : 0 }}>
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg" />
      </motion.div>
    </div>
  );
}

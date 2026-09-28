"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

/**
 * Text that decodes itself, left to right, whenever its parent is hovered or
 * focused. Screen readers always get the real text.
 */
export default function Scramble({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      cancelAnimationFrame(frame.current);
      const start = performance.now();
      const duration = 420;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const settled = Math.floor(progress * text.length);
        setDisplay(
          text
            .split("")
            .map((char, index) =>
              index < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            )
            .join(""),
        );
        if (progress < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    };

    host.addEventListener("pointerenter", run);
    host.addEventListener("focus", run);
    return () => {
      host.removeEventListener("pointerenter", run);
      host.removeEventListener("focus", run);
      cancelAnimationFrame(frame.current);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

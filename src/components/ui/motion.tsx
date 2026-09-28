"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const ease = [0.16, 1, 0.3, 1] as const;

/** True when the media query matches; false during SSR and first paint. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Fades and lifts children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Component>
  );
}

/** Splits text into words that rise out of a mask, staggered. */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  // Observe the wrapper: the masked words themselves start clipped, so an
  // IntersectionObserver on them would never fire.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = animateOnMount || inView;
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text} role="text">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "110%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 1.1, ease, delay: delay + index * stagger }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {word}{" "}
    </motion.span>
  );
}

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <ScrollWord
          key={index}
          word={word}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
        />
      ))}
    </p>
  );
}

/** Pulls its child gently towards the cursor. No-op on touch devices. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Tilts its content in 3D towards the cursor, with a soft moving highlight. */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 20 });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(420px circle at ${gx} ${gy}, rgb(255 255 255 / 0.09), transparent 60%)`,
  );

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        className="relative h-full rounded-[inherit] [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || !ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          px.set((event.clientX - rect.left) / rect.width);
          py.set((event.clientY - rect.top) / rect.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span className="eyebrow">{label}</span>
      </Reveal>
      <h2 className="display max-w-[16ch] text-[clamp(2.75rem,7.5vw,6.5rem)]">
        <SplitText text={title} />
      </h2>
    </div>
  );
}

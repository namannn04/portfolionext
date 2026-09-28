"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee whose speed, direction and skew follow scroll velocity:
 * scrolling fast whips the row forward and leans the type into the motion.
 */
export default function VelocityMarquee({
  items,
  baseSpeed = 2.2,
  reverse = false,
  className,
}: {
  items: string[];
  baseSpeed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2500, 0, 2500], [-6, 0, 6], { clamp: false });
  const skew = useTransform(velocity, [-2500, 2500], [12, -12]);
  const direction = useRef(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speedBoost = boost.get();
    // Scrolling up flips the row, like it's being pulled by the page.
    if (speedBoost < 0) direction.current = reverse ? 1 : -1;
    else if (speedBoost > 0) direction.current = reverse ? -1 : 1;
    const move = direction.current * baseSpeed * (delta / 1000) * (1 + Math.abs(speedBoost));
    offset.set(offset.get() + move);
  });

  // Four copies make the wrap seamless at any viewport width.
  const x = useTransform(offset, (v) => `${wrap(-25, 0, -v)}%`);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <motion.div className="flex shrink-0 items-center will-change-transform" style={{ x, skewX: reduce ? 0 : skew }}>
        {Array.from({ length: 4 }).flatMap((_, copy) =>
          items.map((item, index) => (
            <span
              key={`${copy}-${index}`}
              className="display flex items-center text-[clamp(2.5rem,7vw,6rem)] whitespace-nowrap text-fg/90"
            >
              {item}
              <span className="mx-6 inline-block size-3 rotate-45 bg-accent md:mx-10 md:size-4" />
            </span>
          )),
        )}
      </motion.div>
    </div>
  );
}

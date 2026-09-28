"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "./motion";

/**
 * Bento tile with a soft spotlight that follows the cursor across its
 * surface and a lit border where the light hits.
 */
export default function Tile({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(198 244 50 / 0.08), transparent 65%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(198 244 50 / 0.55), transparent 70%)`;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease, delay }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.75rem] border border-line/70 bg-ink-2/75 backdrop-blur-md",
        className,
      )}
    >
      {/* Border light: a masked gradient sitting on the 1px edge. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] p-px [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]"
        style={{ background: edge }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
}

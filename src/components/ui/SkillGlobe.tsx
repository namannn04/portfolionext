"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Words placed on a Fibonacci sphere and rendered with plain DOM transforms,
 * so every label stays crisp, selectable and readable. It spins on its own;
 * drag (or swipe) to throw it, and it keeps the momentum.
 */
export default function SkillGlobe({ items, className }: { items: string[]; className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);

  const points = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return items.map((_, i) => {
      const y = 1 - (i / Math.max(items.length - 1, 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, [items]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rotX = -0.25;
    let rotY = 0;
    let velX = 0;
    let velY = reduce ? 0 : 0.0035;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let radius = el.clientWidth * 0.4;
    let frame = 0;
    let visible = true;

    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      if (!dragging) {
        // Drift back towards a gentle idle spin after a throw.
        velY += ((reduce ? 0 : 0.0035) - velY) * 0.02;
        velX += (0 - velX) * 0.04;
        rotY += velY;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
      }
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      points.forEach((p, i) => {
        const node = nodes.current[i];
        if (!node) return;
        // Rotate around Y, then X.
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const scale = 0.55 + depth * 0.65;
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
        node.style.opacity = String(0.14 + depth * 0.86);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : "none";
      });
    };
    frame = requestAnimationFrame(render);

    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      el.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      velY = dx * 0.006;
      velX = -dy * 0.006;
      rotY += velY;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
    };
    const onUp = () => (dragging = false);
    const resize = new ResizeObserver(() => (radius = el.clientWidth * 0.4));
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    resize.observe(el);
    io.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      resize.disconnect();
      io.disconnect();
    };
  }, [points]);

  return (
    <div
      ref={stage}
      data-cursor="Drag"
      className={cn("relative aspect-square w-full touch-pan-y select-none active:cursor-grabbing", className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full border border-line/50 bg-[radial-gradient(circle_at_35%_30%,rgb(198_244_50/0.10),transparent_60%)]"
      />
      <ul className="absolute inset-0" aria-label="Skills">
        {items.map((item, index) => (
          <li
            key={item}
            ref={(node) => {
              nodes.current[index] = node;
            }}
            className="absolute top-1/2 left-1/2 rounded-full border border-line/70 bg-ink-2/80 px-3 py-1.5 text-sm whitespace-nowrap text-fg will-change-transform md:text-base"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lazy project video: nothing is downloaded until the card nears the viewport,
 * and playback pauses when it leaves. Falls back to the poster (or a quiet
 * placeholder) when the browser can't decode the file, e.g. MKV on Safari.
 */
export default function ProjectMedia({
  video,
  poster,
  title,
  sizes,
  className,
}: {
  video?: string;
  poster?: string;
  title: string;
  sizes: string;
  className?: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrapper.current;
    if (!el || !video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          if (!reduce) player.current?.play().catch(() => undefined);
        } else {
          player.current?.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video]);

  return (
    <div ref={wrapper} className={cn("relative overflow-hidden bg-ink-3", className)}>
      {poster ? (
        <Image src={poster} alt={`${title} preview`} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,oklch(0.3_0.04_200),transparent_60%),radial-gradient(circle_at_80%_90%,oklch(0.3_0.06_124),transparent_55%)]">
          <span className="display text-3xl text-fg/70">{title}</span>
        </div>
      )}
      {video && load && !failed && (
        <video
          ref={player}
          src={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={`${title} demo`}
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}

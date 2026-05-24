"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HerobrineLoaderProps = {
  onComplete?: () => void;
  openDelayMs?: number;
  finishDelayMs?: number;
};

export default function HerobrineLoader({
  onComplete,
  openDelayMs = 2000,
  finishDelayMs = 3800,
}: HerobrineLoaderProps) {
  const [phase, setPhase] = useState<"closed" | "open">("closed");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    const openTimer = setTimeout(() => setPhase("open"), openDelayMs);
    const finishTimer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, finishDelayMs);

    return () => {
      document.body.classList.remove("no-scroll");
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [finishDelayMs, onComplete, openDelayMs]);

  if (!visible) return null;

  return (
    <div
      className="herobrine-loader fixed inset-0 z-[60] flex items-center justify-center bg-black"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        <div className="herobrine-face-frame">
          <Image
            src="/herobrineClose.png"
            alt="Herobrine eyes closed"
            className={`herobrine-face ${phase === "open" ? "herobrine-face-hidden" : ""}`}
            fill
            sizes="(max-width: 768px) 92vw, 1000px"
            priority
            draggable={false}
          />
          <Image
            src="/herobrineOpen.png"
            alt="Herobrine eyes open"
            className={`herobrine-face herobrine-face-open ${phase === "open" ? "herobrine-face-opened" : ""}`}
            fill
            sizes="(max-width: 768px) 92vw, 1000px"
            priority
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

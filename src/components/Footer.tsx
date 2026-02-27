"use client";

import React from "react";

// Pre-computed deterministic values to avoid SSR hydration mismatch
const BEDROCK_SEGMENTS = [
  { width: 18, opacity: 0.42 },
  { width: 24, opacity: 0.55 },
  { width: 14, opacity: 0.35 },
  { width: 20, opacity: 0.48 },
  { width: 16, opacity: 0.38 },
  { width: 26, opacity: 0.52 },
  { width: 13, opacity: 0.33 },
  { width: 22, opacity: 0.45 },
  { width: 15, opacity: 0.4 },
  { width: 25, opacity: 0.5 },
  { width: 17, opacity: 0.36 },
  { width: 21, opacity: 0.47 },
  { width: 19, opacity: 0.43 },
  { width: 23, opacity: 0.53 },
  { width: 12, opacity: 0.3 },
];

export default function Footer() {
  return (
    <div className="pb-10">
      {/* Bedrock-style separator */}
      <div className="flex justify-center items-center gap-1 mt-10 mb-5">
        {BEDROCK_SEGMENTS.map((seg, i) => (
          <div
            key={i}
            className="h-[2px]"
            style={{
              width: `${seg.width}px`,
              background: "var(--mc-stone)",
              opacity: seg.opacity,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <p
          className="text-mc-grass text-sm flex items-center gap-2"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
        >
          <span>⛏️</span>
          Crafted with
          <span style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}>
            ❤️
          </span>
          by Naman
          <span>🏗️</span>
        </p>
      </div>
    </div>
  );
}

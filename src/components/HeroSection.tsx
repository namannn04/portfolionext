"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Floating Block Types ────────────────────────────────────────────────────
const BLOCK_TYPES = [
  {
    color: "var(--mc-grass)",
    shadow: "color-mix(in srgb, var(--mc-grass) 60%, #000)",
    label: "grass",
  },
  {
    color: "var(--mc-dirt)",
    shadow: "color-mix(in srgb, var(--mc-dirt) 60%, #000)",
    label: "dirt",
  },
  {
    color: "var(--mc-stone)",
    shadow: "color-mix(in srgb, var(--mc-stone) 60%, #000)",
    label: "stone",
  },
  {
    color: "var(--mc-diamond)",
    shadow: "color-mix(in srgb, var(--mc-diamond) 60%, #000)",
    label: "diamond",
  },
  {
    color: "var(--mc-gold)",
    shadow: "color-mix(in srgb, var(--mc-gold) 60%, #000)",
    label: "gold",
  },
  {
    color: "color-mix(in srgb, var(--mc-gold) 55%, var(--mc-redstone) 45%)",
    shadow: "color-mix(in srgb, var(--mc-redstone) 55%, #000)",
    label: "copper",
  },
  {
    color: "var(--mc-lapis)",
    shadow: "color-mix(in srgb, var(--mc-lapis) 60%, #000)",
    label: "lapis",
  },
];

interface FloatingBlock {
  id: number;
  x: number;
  y: number;
  size: number;
  type: (typeof BLOCK_TYPES)[number];
  rotation: number;
  opacity: number;
}

// ─── Mini Block Component ────────────────────────────────────────────────────
function MinecraftBlock({
  size,
  color,
  shadow,
  style,
}: {
  size: number;
  color: string;
  shadow: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        imageRendering: "pixelated",
        ...style,
      }}
    >
      {/* Top face */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: color,
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.07) 0px,
              rgba(255,255,255,0.07) 2px,
              transparent 2px,
              transparent ${Math.max(4, size / 8)}px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.07) 0px,
              rgba(0,0,0,0.07) 2px,
              transparent 2px,
              transparent ${Math.max(4, size / 8)}px
            )
          `,
          boxShadow: `inset 2px 2px 0 rgba(255,255,255,0.25), inset -2px -2px 0 rgba(0,0,0,0.35), 0 0 0 2px ${shadow}`,
        }}
      />
    </div>
  );
}

// ─── Stat Bar ────────────────────────────────────────────────────────────────
function StatBar({
  icon,
  value,
  max,
  color,
  label,
}: {
  icon: string;
  value: number;
  max: number;
  color: string;
  label: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 14, lineHeight: 1 }}>{icon}</span>
      <div
        style={{
          flex: 1,
          height: 8,
          background: "var(--t-bg2)",
          border: "2px solid var(--t-border)",
          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.06)",
          imageRendering: "pixelated",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            boxShadow: `0 0 6px ${color}`,
            transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          color: "var(--t-muted)",
          minWidth: 36,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Hotbar Slot ─────────────────────────────────────────────────────────────
function HotbarSlot({
  children,
  label,
  href,
  delay,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 52,
        height: 52,
        background: hovered
          ? "var(--t-hover)"
          : "var(--t-bg2)",
        border: hovered
          ? "3px solid color-mix(in srgb, var(--t-text) 70%, transparent)"
          : "3px solid var(--t-border)",
        boxShadow: hovered
          ? "inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.25), 0 0 18px rgba(255,255,255,0.2)"
          : "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.35)",
        transition: "all 0.12s ease",
        transform: hovered ? "scale(1.15) translateY(-4px)" : "scale(1)",
        animationDelay: `${delay}s`,
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {children}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--t-notification-bg)",
            border: "2px solid color-mix(in srgb, var(--mc-diamond) 60%, transparent)",
            color: "var(--t-text)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            padding: "4px 8px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "2px 2px 0 var(--t-shadow-color)",
            zIndex: 50,
          }}
        >
          {label}
        </div>
      )}
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  // const [typedText] = useState("Web Developer | Open Source Contributor");

  const staticBlocks: FloatingBlock[] = [
    { id: 1, x: 12, y: 8, size: 28, type: BLOCK_TYPES[0], rotation: -8, opacity: 0.16 },
    { id: 2, x: 78, y: 14, size: 34, type: BLOCK_TYPES[3], rotation: 12, opacity: 0.14 },
    { id: 3, x: 30, y: 22, size: 22, type: BLOCK_TYPES[2], rotation: 6, opacity: 0.12 },
    { id: 4, x: 62, y: 26, size: 26, type: BLOCK_TYPES[6], rotation: -4, opacity: 0.15 },
  ];

  const socials = [
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--mc-diamond)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/in/namannn04",
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--mc-grass)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      label: "GitHub",
      href: "https://github.com/namannn04",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--mc-diamond)">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8731.8914.0766.0766 0 00-.0407.1067c.3606.698.7721 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.0204 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9746 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
      label: "Discord",
      href: "https://discord.com/users/736213483581866053",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--t-text)">
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
      label: "Twitter",
      href: "https://x.com/namannn04",
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--mc-redstone)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
      href: "https://instagram.com/namannn04",
    },
  ];

  return (
    <>
      {/* Google Font for pixelated feel */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        @keyframes nameGlitch {
          0%,95%,100% { text-shadow: 4px 4px 0 var(--t-shadow-color), -1px 0 0 color-mix(in srgb, var(--mc-diamond) 40%, transparent); }
          96% { text-shadow: 6px 4px 0 color-mix(in srgb, var(--mc-grass) 70%, transparent), -4px -2px 0 color-mix(in srgb, var(--mc-diamond) 70%, transparent), 4px 4px 0 var(--t-shadow-color); letter-spacing: 0.28em; }
          97% { text-shadow: -2px 4px 0 var(--t-shadow-color); letter-spacing: 0.22em; }
          98% { text-shadow: 4px 4px 0 var(--t-shadow-color), 3px 0 0 color-mix(in srgb, var(--mc-gold) 55%, var(--mc-redstone) 45%); letter-spacing: 0.25em; }
        }

        [data-theme='light'] .img-dark { display: none !important; }
        [data-theme='dark'] .img-light { display: none !important; }

        .mc-hero-section * { box-sizing: border-box; }
      `}</style>

      <section
        className="mc-hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, var(--t-bg) 0%, var(--t-bg2) 40%, color-mix(in srgb, var(--t-bg2) 70%, var(--mc-grass) 30%) 100%)",
          paddingTop: 40,
          paddingBottom: 60,
        }}
      >
        {/* ── Sky gradient overlay ─────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--mc-diamond) 30%, transparent) 0%, transparent 70%)",
        }} />

        {/* ── Star field ──────────────────────────────────── */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 7 === 0 ? 3 : 2,
            height: i % 7 === 0 ? 3 : 2,
            background: "var(--t-text)",
            left: `${(i * 17.3) % 100}%`,
            top: `${(i * 13.7) % 55}%`,
            opacity: 0.08 + (i % 5) * 0.05,
            imageRendering: "pixelated",
          }} />
        ))}

        {/* ── Falling Blocks (ambient) ─────────────────────── */}
        {staticBlocks.map((b) => (
          <div
            key={b.id}
            style={{
              position: "absolute",
              left: `${b.x}%`,
              top: `${b.y}%`,
              opacity: b.opacity,
              transform: `rotate(${b.rotation}deg)`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <MinecraftBlock size={b.size} color={b.type.color} shadow={b.type.shadow} />
          </div>
        ))}

        {/* ── Ground / Terrain at Bottom ───────────────────── */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          display: "flex",
          alignItems: "flex-end",
          pointerEvents: "none",
          zIndex: 2,
        }}>
          {Array.from({ length: 64 }).map((_, i) => {
            const h = 24 + Math.sin(i * 0.8) * 12 + Math.sin(i * 1.4 + 1) * 8;
            const isTall = i % 11 === 0 || i % 17 === 4;
            const colors = isTall
              ? [
                  "color-mix(in srgb, var(--mc-grass) 70%, #000)",
                  "color-mix(in srgb, var(--mc-grass) 85%, #000)",
                  "color-mix(in srgb, var(--mc-grass) 60%, #000)",
                ]
              : [
                  "var(--mc-grass)",
                  "color-mix(in srgb, var(--mc-grass) 85%, #000)",
                  "color-mix(in srgb, var(--mc-grass) 60%, #000)",
                ];
            return (
              <div key={i} style={{
                flex: 1,
                height: Math.round(h) + (isTall ? 16 : 0),
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "hidden",
              }}>
                <div style={{ height: 4, background: colors[0] }} />
                <div style={{ flex: 1, background: colors[1] }} />
                <div style={{ height: 2, background: colors[2] }} />
              </div>
            );
          })}
        </div>

        {/* ── Main Content Card ────────────────────────────── */}
        <div style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 960,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}>

          {/* ── BIG PIXELATED NAME ────────────────────────── */}
          <div style={{
            marginBottom: 8,
            textAlign: "center",
          }}>

            <h1 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(28px, 7.5cqi, 72px)",
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: "0.06em",
            }}>
              <span style={{
                display: "inline-block",
                color: "var(--mc-grass)",
                textShadow: "4px 4px 0 #000, 3px 3px 0 color-mix(in srgb, var(--mc-grass) 60%, #000)",
                filter:
                  "drop-shadow(0 0 20px color-mix(in srgb, var(--mc-grass) 40%, transparent))",
              }}>
                NAMAN
              </span>
              <br />
              <span style={{
                display: "inline-block",
                color: "var(--mc-diamond)",
                textShadow: "4px 4px 0 #000, 3px 3px 0 color-mix(in srgb, var(--mc-diamond) 60%, #000)",
                filter:
                  "drop-shadow(0 0 20px color-mix(in srgb, var(--mc-diamond) 40%, transparent))",
              }}>
                DADHICH
              </span>
            </h1>

            {/* XP Bar under name */}
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "clamp(200px, 40cqi, 380px)",
                height: 10,
                background: "var(--t-bg2)",
                border: "2px solid var(--t-border)",
                boxShadow: "inset 2px 2px 0 var(--t-shadow-color)",
                position: "relative",
                overflow: "hidden",
                imageRendering: "pixelated",
              }}>
                <div style={{
                  height: "100%",
                  width: "100%",
                  background:
                    "linear-gradient(90deg, var(--mc-grass), var(--mc-xp), var(--mc-grass))",
                  backgroundSize: "200% 100%",
                }} />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,0,0,0.15) 18px, rgba(0,0,0,0.15) 20px)",
                }} />
              </div>
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(7px, 1.4cqi, 9px)",
              color: "var(--mc-xp)",
              marginTop: 6,
              textShadow: "0 0 6px color-mix(in srgb, var(--mc-xp) 80%, transparent)",
              letterSpacing: "0.2em",
            }}>
              ★ LEVEL 99 ★ MAX XP
            </div>
          </div>

          {/* ── MAIN PANEL (Image + Stats) ────────────────── */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            marginTop: 24,
          }}>

            {/* ── PROFILE FRAME ───────────────────────────── */}
            <div style={{
              position: "relative",
              flexShrink: 0,
            }}>
              {/* Torch Left */}
              {/* <div style={{
                position: "absolute",
                left: -28,
                top: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 20,
              }}>
                <div style={{
                  width: 12,
                  height: 18,
                  background:
                    "linear-gradient(to top, var(--mc-gold), color-mix(in srgb, var(--mc-gold) 55%, var(--mc-redstone) 45%), var(--mc-redstone))",
                  borderRadius: 2,
                  filter: "blur(0.5px)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,165,0,0.5) 0%, transparent 70%)",
                  }} />
                </div>
                <div
                  style={{
                    width: 6,
                    height: 32,
                    background: "var(--mc-dirt)",
                    boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1)",
                  }}
                />
              </div> */}

              {/* Torch Right */}
              {/* <div style={{
                position: "absolute",
                right: -28,
                top: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 20,
              }}>
                <div style={{
                  width: 12,
                  height: 18,
                  background:
                    "linear-gradient(to top, var(--mc-gold), color-mix(in srgb, var(--mc-gold) 55%, var(--mc-redstone) 45%), var(--mc-redstone))",
                  borderRadius: 2,
                  filter: "blur(0.5px)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,165,0,0.5) 0%, transparent 70%)",
                  }} />
                </div>
                <div
                  style={{
                    width: 6,
                    height: 32,
                    background: "var(--mc-dirt)",
                    boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1)",
                  }}
                />
              </div> */}

              {/* Corner Decorations */}
              {[
                {
                  top: -6,
                  left: -6,
                  borderTop: "4px solid var(--mc-grass)",
                  borderLeft: "4px solid var(--mc-grass)",
                },
                {
                  top: -6,
                  right: -6,
                  borderTop: "4px solid var(--mc-grass)",
                  borderRight: "4px solid var(--mc-grass)",
                },
                {
                  bottom: -6,
                  left: -6,
                  borderBottom: "4px solid var(--mc-diamond)",
                  borderLeft: "4px solid var(--mc-diamond)",
                },
                {
                  bottom: -6,
                  right: -6,
                  borderBottom: "4px solid var(--mc-diamond)",
                  borderRight: "4px solid var(--mc-diamond)",
                },
              ].map((s, i) => (
                <div key={i} style={{
                  position: "absolute",
                  width: 20,
                  height: 20,
                  zIndex: 21,
                  ...s,
                }} />
              ))}

              {/* Image Frame */}
              <div style={{
                width: "clamp(180px, 27cqi, 260px)",
                position: "relative",
                overflow: "hidden",
                  border: "4px solid var(--t-border)",
                boxShadow: `
                  inset 3px 3px 0 rgba(255,255,255,0.15),
                  inset -3px -3px 0 rgba(0,0,0,0.5),
                  6px 6px 0 rgba(0,0,0,0.6),
                  0 0 40px rgba(90,138,58,0.2),
                  0 0 80px rgba(79,195,247,0.1)
                `,
              }}>
                <div style={{ aspectRatio: "3/4", position: "relative" }}>
                  <Image
                    src="/profilewhite.jpeg"
                    alt="Naman Dadhich"
                    fill
                    className="object-cover img-light"
                    priority
                    fetchPriority="high"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 260px"
                  />
                  <Image
                    src="/profileBlack.png"
                    alt="Naman Dadhich"
                    fill
                    className="object-cover img-dark"
                    priority
                    fetchPriority="high"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 260px"
                  />
                </div>

                {/* Player name tag at bottom of image */}
                {/* <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "color-mix(in srgb, var(--t-bg2) 80%, transparent)",
                    backdropFilter: "blur(4px)",
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderTop:
                      "2px solid color-mix(in srgb, var(--mc-xp) 35%, transparent)",
                  }}
                >
                  <div style={{
                    width: 8,
                    height: 8,
                    background: "var(--mc-xp)",
                    boxShadow: "0 0 6px var(--mc-xp)",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 7,
                    color: "var(--t-text)",
                    letterSpacing: "0.05em",
                  }}>
                    namannn04
                  </span>
                </div> */}
              </div>
            </div>

            {/* ── STATS PANEL ─────────────────────────────── */}
            <div style={{
              background: "var(--t-card)",
              border: "3px solid var(--t-border)",
              boxShadow:
                "inset 3px 3px 0 rgba(255,255,255,0.07), inset -3px -3px 0 rgba(0,0,0,0.35), 5px 5px 0 var(--t-shadow-color)",
              padding: "clamp(16px, 2.5cqi, 28px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minWidth: "clamp(240px, 35cqi, 340px)",
              maxWidth: 380,
              backdropFilter: "blur(8px)",
              flex: 1,
              opacity: 1,
            }}>
              {/* Panel title */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(8px, 1.7cqi, 11px)",
                color: "var(--mc-gold)",
                textShadow: "2px 2px 0 #000, 0 0 8px color-mix(in srgb, var(--mc-gold) 60%, transparent)",
                borderBottom: "2px solid color-mix(in srgb, var(--mc-gold) 25%, transparent)",
                paddingBottom: 12,
                letterSpacing: "0.08em",
              }}>
                <span>▶ PLAYER STATS</span>
                <span style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "clamp(6px, 1.1cqi, 9px)",
                  color: "var(--mc-xp)",
                  textShadow: "0 0 4px var(--mc-xp)",
                  whiteSpace: "nowrap",
                }}>
                  ● ONLINE
                </span>
              </div>

              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(7px, 1.5cqi, 10px)",
                color: "var(--t-text)",
                letterSpacing: "0.08em",
                lineHeight: 1.5,
              }}>
                <div style={{ color: "var(--mc-xp)" }}>USER: namannn04</div>
                <div>&gt; SDE</div>
                <div>&gt; OPEN SOURCE CONTRIBUTOR</div>
                <div>&gt; FREELANCER</div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <StatBar icon="❤️" value={20} max={20} color="var(--mc-redstone)" label="HP 20/20" />
                <StatBar icon="🍖" value={18} max={20} color="var(--mc-dirt)" label="FD 18/20" />
                <StatBar icon="✨" value={73} max={100} color="var(--mc-xp)" label="XP 99LV" />
              </div>

              {/* Divider */}
              <div style={{ height: 2, background: "color-mix(in srgb, var(--t-text) 6%, transparent)" }} />

              {/* Inventory: Skills */}
              <div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 8,
                  color: "var(--t-muted)",
                  marginBottom: 10,
                  letterSpacing: "0.1em",
                }}>
                  INVENTORY
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["React", "Next.js", "TypeScript", "Node"].map((skill, i) => (
                    <div key={skill} style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "clamp(6px, 1.1cqi, 8px)",
                      padding: "5px 8px",
                      background:
                        i % 2 === 0
                          ? "color-mix(in srgb, var(--mc-grass) 18%, transparent)"
                          : "color-mix(in srgb, var(--mc-diamond) 16%, transparent)",
                      border: `2px solid ${
                        i % 2 === 0
                          ? "color-mix(in srgb, var(--mc-grass) 55%, transparent)"
                          : "color-mix(in srgb, var(--mc-diamond) 45%, transparent)"
                      }`,
                      color: i % 2 === 0 ? "var(--mc-xp)" : "var(--mc-diamond)",
                      boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
                      textShadow: `0 0 4px ${i % 2 === 0 ? "var(--mc-xp)" : "var(--mc-diamond)"}`,
                    }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── TYPEWRITER ROLE ────────────────────────────── */}
          {/* <div style={{
            marginTop: 28,
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(8px, 1.9cqi, 13px)",
            color: "var(--mc-xp)",
            textShadow:
              "0 0 10px color-mix(in srgb, var(--mc-xp) 60%, transparent)",
            letterSpacing: "0.15em",
            textAlign: "center",
            opacity: 1,
          }}>
            &gt; {typedText}
          </div> */}

          {/* ── HOTBAR SOCIAL LINKS ──────────────────────── */}
          <div style={{
            marginTop: 28,
            opacity: 1,
          }}>
            {/* Hotbar container */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              padding: 6,
              background: "var(--t-bg2)",
              border: "4px solid var(--t-border)",
              boxShadow: "inset 3px 3px 0 rgba(255,255,255,0.08), inset -3px -3px 0 rgba(0,0,0,0.4), 4px 4px 0 rgba(0,0,0,0.5)",
            }}>
              {socials.map((s, i) => (
                <HotbarSlot key={s.label} label={s.label} href={s.href} delay={i * 0.08}>
                  {s.icon}
                </HotbarSlot>
              ))}
            </div>
          </div>

          {/* ── CTA Buttons ─────────────────────────────── */}
          <div style={{
            marginTop: 28,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 1,
          }}>
            {[
              {
                label: "⚔ View Projects",
                href: "/projects",
                color: "var(--mc-grass)",
                shadow: "color-mix(in srgb, var(--mc-grass) 55%, #000)",
                glow: "color-mix(in srgb, var(--mc-grass) 45%, transparent)",
              },
              {
                label: "✉ Hire Me",
                href: "/contact",
                color: "var(--mc-diamond)",
                shadow: "color-mix(in srgb, var(--mc-diamond) 55%, #000)",
                glow: "color-mix(in srgb, var(--mc-diamond) 45%, transparent)",
              },
            ].map((btn) => (
              <Link
                key={btn.label}
                href={btn.href}
                prefetch
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "clamp(8px, 1.7cqi, 11px)",
                  padding: "clamp(10px, 1.9cqi, 14px) clamp(16px, 2.5cqi, 28px)",
                  background: btn.color,
                  color: "var(--primary-foreground)",
                  border: "none",
                  borderBottom: `5px solid ${btn.shadow}`,
                  boxShadow: `inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.2), 0 0 20px ${btn.glow}`,
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
                  transition: "all 0.1s",
                  imageRendering: "pixelated",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(3px)";
                  e.currentTarget.style.borderBottomWidth = "2px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderBottomWidth = "5px";
                }}
              >
                {btn.label}
              </Link>
            ))}
          </div>

        </div>

        {/* ── Corner Block Decorations ─────────────────────── */}
        <>
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 5, opacity: 0.4 }}>
              <MinecraftBlock
                size={24}
                color="var(--mc-grass)"
                shadow="color-mix(in srgb, var(--mc-grass) 60%, #000)"
              />
            </div>
            <div style={{ position: "absolute", top: 16, right: 16, zIndex: 5, opacity: 0.4 }}>
              <MinecraftBlock
                size={24}
                color="var(--mc-diamond)"
                shadow="color-mix(in srgb, var(--mc-diamond) 60%, #000)"
              />
            </div>
            <div style={{ position: "absolute", top: 48, left: 16, zIndex: 5, opacity: 0.25 }}>
              <MinecraftBlock
                size={24}
                color="var(--mc-stone)"
                shadow="color-mix(in srgb, var(--mc-stone) 60%, #000)"
              />
            </div>
            <div style={{ position: "absolute", top: 48, right: 16, zIndex: 5, opacity: 0.25 }}>
              <MinecraftBlock
                size={24}
                color="var(--mc-gold)"
                shadow="color-mix(in srgb, var(--mc-gold) 60%, #000)"
              />
            </div>
        </>
      </section>
    </>
  );
}
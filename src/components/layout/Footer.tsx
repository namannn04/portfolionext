"use client";

import { useLocalTime } from "@/lib/useLocalTime";
import { profile } from "@/content/data";
import { scrollToTop, useLenis } from "./SmoothScroll";
import Scramble from "@/components/ui/Scramble";

export default function Footer() {
  const lenis = useLenis();
  const time = useLocalTime(profile.timezone);

  return (
    <footer className="relative z-10 border-t border-line/60 bg-ink">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16">
        <div className="space-y-6">
          <p className="display text-[clamp(2.5rem,9vw,7.5rem)] text-fg">{profile.name}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-2">
            {profile.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="link-underline">
                <Scramble text={social.label} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-10 text-sm md:flex-col md:items-end">
          <div className="md:text-right">
            <p className="eyebrow">Local time</p>
            <p className="mt-1 font-mono tabular-nums text-fg-2">{time || "--:--"} IST</p>
          </div>
          <button
            type="button"
            onClick={() => scrollToTop(lenis)}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg-2 transition-colors hover:border-fg hover:text-fg"
          >
            Back to top
            <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">↑</span>
          </button>
        </div>
      </div>
      <div className="shell flex flex-col gap-1 border-t border-line/60 py-5 text-xs text-mute sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Designed and built by Naman with Next.js and Three.js</p>
      </div>
    </footer>
  );
}

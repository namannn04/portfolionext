"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Scrolls to an in-page hash like "#work", using Lenis when available. */
export function scrollToHash(lenis: Lenis | null, hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;
  if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  else target.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", hash);
  return true;
}

export function scrollToTop(lenis: Lenis | null) {
  if (lenis) lenis.scrollTo(0, { duration: 1.5 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1, anchors: false });
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Honour hashes when arriving from another route (e.g. /resume -> /#work).
  useEffect(() => {
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true });
      return;
    }
    const id = window.setTimeout(() => scrollToHash(lenis, window.location.hash), 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

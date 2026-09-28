"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/content/data";
import { scrollToHash, scrollToTop, useLenis } from "./SmoothScroll";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 320 && !open);
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (event: React.MouseEvent, href: string) => {
    setOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    event.preventDefault();
    // Wait a tick so Lenis is restarted after the mobile menu closes.
    window.setTimeout(() => scrollToHash(lenis, href.slice(1)), open ? 60 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || open
              ? "border-b border-line/60 bg-ink/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav className="shell flex h-16 items-center justify-between md:h-18" aria-label="Primary">
            <Link
              href="/"
              onClick={(event) => {
                setOpen(false);
                if (pathname === "/") {
                  event.preventDefault();
                  scrollToTop(lenis);
                }
              }}
              className="group flex items-center gap-2.5 text-sm font-medium"
            >
              <span className="grid size-8 place-items-center rounded-full bg-fg text-[0.7rem] font-bold tracking-tight text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[-12deg]">
                ND
              </span>
              <span className="hidden sm:inline">{profile.name}</span>
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleNav(event, link.href)}
                    className="rounded-full px-4 py-2 text-sm text-fg-2 transition-colors hover:bg-ink-3 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/resume"
                className={cn(
                  "hidden rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-fg sm:inline-flex",
                  pathname === "/resume" && "border-fg",
                )}
              >
                Resume
              </Link>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="relative grid size-10 place-items-center rounded-full bg-ink-3 md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span
                  className={cn(
                    "absolute h-px w-4 bg-fg transition-transform duration-500 ease-out-expo",
                    open ? "rotate-45" : "-translate-y-[3px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-fg transition-transform duration-500 ease-out-expo",
                    open ? "-rotate-45" : "translate-y-[3px]",
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-2 px-[var(--gutter)] pt-24 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[...navLinks, { label: "Resume", href: "/resume" }].map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(event) => handleNav(event, link.href)}
                      className="display flex items-baseline gap-4 py-1 text-[clamp(2.75rem,13vw,4.5rem)]"
                    >
                      <span className="font-mono text-xs font-normal tracking-normal text-mute">0{index + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-2"
            >
              {profile.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="link-underline">
                  {social.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

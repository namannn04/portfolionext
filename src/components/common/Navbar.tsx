"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const navOptions = [
  { name: "About", href: "#about", shortcut: "a" },
  { name: "Skills", href: "#skills", shortcut: "s" },
  { name: "Projects", href: "/projects", shortcut: "p" },
  { name: "Experience", href: "/experience", shortcut: "e" },
  { name: "Events", href: "/events", shortcut: "v" },
  { name: "Resume", href: "/resume", shortcut: "r" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFloating, setShowFloating] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const halfPage = window.innerHeight / 2;
          const previousScrollY = lastScrollYRef.current;
          const scrollingDown = scrollY > previousScrollY;
          const scrollDelta = Math.abs(scrollY - previousScrollY);
          lastScrollYRef.current = scrollY;

          if (scrollY > halfPage + 24) {
            setShowFloating(true);
          } else if (scrollY < halfPage - 24) {
            setShowFloating(false);
          } else if (!scrollingDown && scrollDelta > 80) {
            setShowFloating(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToElement = useCallback((element: HTMLElement) => {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    });
  }, []);

  const handleNavigation = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        if (pathname !== "/") {
          router.push("/");
          setTimeout(() => {
            const id = href.substring(1);
            const element = document.getElementById(id);
            if (element) {
              scrollToElement(element);
            }
          }, 300);
        } else {
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            scrollToElement(element);
          }
        }
      } else {
        router.push(href);
      }
    },
    [pathname, router, scrollToElement]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (isInputActive) return;

      const key = e.key.toLowerCase();
      const option = navOptions.find((opt) => opt.shortcut === key);
      if (option) {
        handleNavigation(option.href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNavigation]);

  useEffect(() => {
    const index = navOptions.findIndex((option) => {
      if (option.href.startsWith("#")) {
        return pathname === "/" && window.location.hash === option.href;
      }
      return option.href === pathname;
    });
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [pathname]);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(element);
        }
      }, 100);
    }
  }, [pathname, scrollToElement]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index);
    handleNavigation(href);
  };

  if (!mounted) return null;

  return (
    <>
      {/* === TOP NAVBAR - Minecraft Hotbar Style === */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent text-t-text md:relative md:mb-5 no-mc-font">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between md:justify-center md:gap-6 lg:gap-24 h-16">
            {/* Mobile hamburger */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-mc-grass hover:text-mc-emerald focus:outline-none cursor-pointer transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <></> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Desktop nav - Hotbar slots */}
            <div
              className="hidden md:flex items-center gap-1 p-1.5"
              style={{
                background: "transparent",
                border: "2px solid var(--t-border)",
                boxShadow:
                  "inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(0,0,0,0.25)",
              }}
            >
              {navOptions.map((option, index) => (
                <button
                  key={option.name}
                  onClick={() => handleNavClick(index, option.href)}
                  className={cn(
                    "relative cursor-pointer px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1.5",
                    activeIndex === index
                      ? "bg-mc-grass text-white"
                      : "hover:bg-t-hover text-t-text2"
                  )}
                  style={
                    activeIndex === index
                      ? {
                        boxShadow:
                          "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3), 0 0 10px rgba(92,184,92,0.3)",
                      }
                      : {
                        boxShadow:
                          "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.15)",
                      }
                  }
                >
                  <span>{option.name}</span>
                  <span
                    className={cn(
                      "text-xs",
                      activeIndex === index
                        ? "text-white/60"
                        : "text-t-dim"
                    )}
                  >
                    ({option.shortcut})
                  </span>
                </button>
              ))}
            </div>

            {/* Logo + Theme Toggle */}
            <div className="flex items-center gap-5 sm:gap-6">
              <ThemeToggle />
              <div
                className="text-mc-grass font-bold text-xl"
                style={{
                  textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                }}
              >
                <Link href="/" className="hover:text-mc-emerald transition-colors no-mc-font">
                  .dadhich
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-transparent md:hidden">
            {/* Close button */}
            <div className="absolute top-4 left-4">
              <button
                onClick={toggleMenu}
                className="text-mc-grass hover:text-mc-emerald focus:outline-none cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items - inventory grid */}
            <div className="pt-20 px-4">
              <div className="w-full space-y-2">
                {navOptions.map((option, index) => (
                  <div
                    key={option.name}
                    className="menu-item"
                    style={{
                      animation: `slideIn 300ms forwards ${index * 80}ms`,
                      opacity: 0,
                      transform: "translateX(-100%)",
                    }}
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick(index, option.href);
                      }}
                      className="mc-slot cursor-pointer w-full text-left px-4 py-3 flex items-center gap-3 text-t-text hover:text-mc-grass transition-all"
                    >
                      <span className="font-medium">
                        {option.name}
                      </span>
                      <span className="text-t-dim text-xs ml-auto">
                        [{option.shortcut}]
                      </span>
                    </button>
                  </div>
                ))}
                {/* Theme toggle in mobile */}
                <div
                  className="menu-item pt-4"
                  style={{
                    animation: `slideIn 300ms forwards ${navOptions.length * 80}ms`,
                    opacity: 0,
                    transform: "translateX(-100%)",
                  }}
                >
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16 md:hidden" aria-hidden="true" />

      {/* === FLOATING BOTTOM NAVBAR - Hotbar === */}
      <div
        className={cn(
          "fixed left-1/2 bottom-8 z-50 -translate-x-1/2 transition-all duration-500 hidden md:flex items-center no-mc-font",
          showFloating
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-4"
        )}
      >
        <div
          className="flex items-center gap-1 p-1.5"
          style={{
            background: "var(--t-bg)",
            border: "3px solid var(--t-border)",
            boxShadow:
              "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {navOptions.map((option, index) => (
            <button
              key={option.name}
              onClick={() => handleNavClick(index, option.href)}
              className={cn(
                "relative cursor-pointer px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap",
                activeIndex === index
                  ? "bg-mc-grass text-white"
                  : "hover:bg-t-hover text-t-text2"
              )}
              style={
                activeIndex === index
                  ? {
                    boxShadow:
                      "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3), 0 0 10px rgba(92,184,92,0.3)",
                  }
                  : {
                    boxShadow:
                      "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.15)",
                  }
              }
            >
              <span>{option.name}</span>
              <span
                className={cn(
                  "text-xs",
                  activeIndex === index ? "text-white/60" : "text-t-dim"
                )}
              >
                ({option.shortcut})
              </span>
            </button>
          ))}
          <div className="flex-shrink-0 ml-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
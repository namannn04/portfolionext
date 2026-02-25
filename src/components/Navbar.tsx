"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [lastScrollY, setLastScrollY] = useState(0);

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
          const scrollingDown = scrollY > lastScrollY;
          setLastScrollY(scrollY);
          if (scrollY > halfPage && scrollingDown) {
            setShowFloating(true);
          } else if (scrollY < halfPage || !scrollingDown) {
            setShowFloating(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, lastScrollY]);

  const scrollToElement = useCallback((element: HTMLElement) => {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    });
  }, []);

  const handleNavigation = useCallback((href: string) => {
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
  }, [pathname, router, scrollToElement]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute('contenteditable') === 'true';

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
      {/* Original Navbar at top */}
      <nav className="mb-5 z-50 bg-t-bg text-t-text relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger menu for mobile */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-teal-400 hover:text-teal-300 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <></>
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop navigation with underline indicator */}
            <div className="hidden md:flex relative">
              {navOptions.map((option, index) => (
                <div key={option.name} className="relative flex flex-col items-center">
                  <button
                    onClick={() => handleNavClick(index, option.href)}
                    className={cn(
                      "cursor-pointer px-3 py-2 mx-1 transition-all duration-300 text-sm text-t-text hover:text-cyan-300",
                      pathname === option.href ||
                        (option.href.startsWith("#") &&
                          pathname === "/" &&
                          window.location.hash === option.href)
                        ? "text-cyan-300"
                        : ""
                    )}
                  >
                    {option.name} ({option.shortcut})
                  </button>
                  <span
                    className={cn(
                      "absolute left-0 bottom-0 h-0.5 w-full bg-teal-400 rounded origin-left transition-transform duration-300",
                      activeIndex === index ? "scale-x-100" : "scale-x-0"
                    )}
                  ></span>
                </div>
              ))}
            </div>

            {/* Logo + Theme Toggle */}
            <div className="flex items-center gap-8">
              <ThemeToggle />
              <div className="text-cyan-400 font-bold text-xl">
                <Link href="/">.dadhich</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-t-bg/95 backdrop-blur-sm md:hidden">
            {/* Close button */}
            <div className="absolute top-4 left-4">
              <button
                onClick={toggleMenu}
                className="text-teal-400 hover:text-teal-300 focus:outline-none cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items with staggered animation */}
            <div className="pt-20 px-4">
              <div className="w-full space-y-3">
                {navOptions.map((option, index) => (
                  <div
                    key={option.name}
                    className="menu-item"
                    style={{
                      animation: `slideIn 300ms forwards ${index * 100}ms`,
                      opacity: 0,
                      transform: "translateX(-100%)",
                    }}
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick(index, option.href);
                      }}
                      className="cursor-pointer inline-block px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-700 text-white hover:text-cyan-300 transition-all duration-300"
                    >
                      {option.name} ({option.shortcut})
                    </button>
                  </div>
                ))}
                {/* Theme toggle in mobile */}
                <div
                  className="menu-item pt-4"
                  style={{
                    animation: `slideIn 300ms forwards ${navOptions.length * 100}ms`,
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

        {/* CSS Animation KeyFrames */}
        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .menu-item {
            animation-fill-mode: forwards;
          }
        `}</style>
      </nav>

      {/* Floating Bottom Navbar */}
      <div
        className={cn(
          "fixed left-1/2 bottom-10 z-50 w-[90vw] max-w-3xl -translate-x-1/2 bg-t-bg text-t-text rounded-full shadow-lg transition-all duration-700 items-center justify-between h-16 px-4 border border-cyan-400 hidden md:flex",
          showFloating ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ boxShadow: "0 4px 24px var(--t-shadow-color)" }}
      >
        {/* Floating nav options with underline effect */}
        <div className="flex w-full justify-between gap-1 md:gap-2 lg:gap-4 items-center">
          {navOptions.map((option, index) => (
            <div key={option.name} className="relative flex flex-col items-center w-full">
              <button
                onClick={() => handleNavClick(index, option.href)}
                className={cn(
                  "cursor-pointer px-3 py-2 mx-1 transition-all duration-300 text-sm text-t-text hover:text-cyan-300 flex flex-row items-center whitespace-nowrap",
                  activeIndex === index ? "text-cyan-300" : ""
                )}
              >
                <span className="whitespace-nowrap flex flex-row items-center">{option.name} <span className={cn("ml-1 text-sm", activeIndex === index ? "text-cyan-400" : "text-t-dim")}>({option.shortcut})</span></span>
              </button>
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-1/2 bg-teal-400 rounded origin-center transition-transform duration-300",
                  activeIndex === index ? "scale-x-100" : "scale-x-0"
                )}
              ></span>
            </div>
          ))}
          {/* Theme toggle in floating nav */}
          <div className="flex-shrink-0 ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
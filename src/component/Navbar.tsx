"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Find the navigation option with the matching shortcut
      const option = navOptions.find((opt) => opt.shortcut === key);
      if (option) {
        handleNavigation(option.href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname]);

  // Set active index based on current path
  useEffect(() => {
    const index = navOptions.findIndex((option) => {
      // Check if the current path matches the route or if it's the home page with the hash
      if (option.href.startsWith("#")) {
        return pathname === "/" && window.location.hash === option.href;
      }
      return option.href === pathname;
    });

    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [pathname]);

  // Handle scroll to hash on page load
  useEffect(() => {
    if (window.location.hash) {
      // Delay to ensure DOM is ready
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(element);
        }
      }, 100);
    }
  }, [pathname]);

  const scrollToElement = (element: HTMLElement) => {
    window.scrollTo({
      top: element.offsetTop - 80, // Adjust offset as needed
      behavior: "smooth",
    });
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      // If we're not on the home page, first navigate to home
      if (pathname !== "/") {
        router.push("/");
        // After navigation, scroll to the element
        setTimeout(() => {
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            scrollToElement(element);
          }
        }, 300); // Allow time for page transition
      } else {
        // We're already on the home page, just scroll
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(element);
        }
      }
    } else {
      // For non-hash links, just navigate normally
      router.push(href);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navOptions = [
    { name: "About", href: "#about", shortcut: "a" },
    { name: "Skills", href: "#skills", shortcut: "s" },
    { name: "Projects", href: "#projects", shortcut: "p" },
    { name: "Experience", href: "/experience", shortcut: "e" },
    { name: "Roles", href: "/roles", shortcut: "r" },
  ];

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index);
    handleNavigation(href);
  };

  if (!mounted) return null;

  return (
    <nav className="mb-5 z-50 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger menu for mobile */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-teal-400 hover:text-teal-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation with underline indicator */}
          <div className="hidden md:flex relative">
            {/* Animated underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-teal-400 transition-all duration-300 ease-in-out"
              style={{
                left: `${activeIndex * 120}px`,
                width: "80px",
                transform: "translateX(20px)",
              }}
            />

            {navOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={() => handleNavClick(index, option.href)}
                className={cn(
                  "px-4 py-2 mx-2 transition-all duration-300 text-white hover:text-cyan-300",
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
            ))}
          </div>

          {/* Logo/Brand on the right */}
          <div className="text-cyan-400 font-bold text-xl">
            <Link href="/">.dadhich</Link>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown with auto-width capsules */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-2 space-y-3 bg-black">
          {navOptions.map((option, index) => (
            <div
              key={option.name}
              className="transform transition-transform duration-500"
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick(index, option.href);
                }}
                className="inline-block px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-700 text-white hover:text-cyan-300 transition-all duration-300"
              >
                {option.name} ({option.shortcut})
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

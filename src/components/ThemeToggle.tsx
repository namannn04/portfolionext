"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    const iconTransition = {
        type: "spring" as const,
        stiffness: 170,
        damping: 18,
        mass: 0.7,
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative h-10 w-10 overflow-hidden rounded-full border border-t-border bg-t-surface/50 backdrop-blur-sm cursor-pointer transform-gpu"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: isDark
                        ? "radial-gradient(circle at 30% 25%, rgba(8,47,73,0.95) 0%, rgba(15,23,42,0.95) 55%, rgba(2,6,23,0.95) 100%)"
                        : "radial-gradient(circle at 30% 25%, rgba(253,224,71,0.5) 0%, rgba(251,191,36,0.18) 45%, rgba(120,53,15,0.1) 100%)",
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: isDark
                        ? "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%)",
                }}
            />

            <motion.div
                initial={false}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: "transform, opacity" }}
                animate={
                    isDark
                        ? {
                                x: 24,
                                y: 24,
                                rotate: 80,
                                scale: 0.6,
                                opacity: 0,
                            }
                        : {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 1,
                                opacity: 1,
                            }
                }
                transition={{
                    x: iconTransition,
                    y: iconTransition,
                    rotate: iconTransition,
                    scale: iconTransition,
                    opacity: { duration: 0.35, ease: "easeOut" },
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            </motion.div>

            <motion.div
                initial={false}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: "transform, opacity" }}
                animate={
                    isDark
                        ? {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 1,
                                opacity: 1,
                            }
                        : {
                                x: -24,
                                y: 24,
                                rotate: -80,
                                scale: 0.6,
                                opacity: 0,
                            }
                }
                transition={{
                    x: iconTransition,
                    y: iconTransition,
                    rotate: iconTransition,
                    scale: iconTransition,
                    opacity: { duration: 0.35, ease: "easeOut" },
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </motion.div>
        </motion.button>
    );
}

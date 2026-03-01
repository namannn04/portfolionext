"use client";

import { useEffect, useRef } from "react";
import { triggerAchievement } from "@/components/AchievementToast";

interface Achievement {
    id: string;
    title: string;
    desc: string;
}

/**
 * Hook: triggers a Minecraft achievement when a section scrolls into view.
 * Only fires once per achievement ID.
 */
export function useAchievementOnView(achievement: Achievement) {
    const ref = useRef<HTMLDivElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || triggered.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true;
                    // Small delay so the section is visible first
                    setTimeout(() => triggerAchievement(achievement), 600);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [achievement]);

    return ref;
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Achievement {
    id: string;
    title: string;
    desc: string;
}

// One global queue — achievements pop in bottom-right, one at a time
let globalShow: (a: Achievement) => void = () => { };

export function triggerAchievement(a: Achievement) {
    globalShow(a);
}

export default function AchievementToast() {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState<Achievement | null>(null);
    const shownIds = useRef<Set<string>>(new Set());
    const queue = useRef<Achievement[]>([]);
    const isBusy = useRef(false);

    const processQueue = useCallback(() => {
        if (isBusy.current || queue.current.length === 0) return;

        const next = queue.current.shift()!;
        isBusy.current = true;
        setCurrent(next);
        setVisible(true);

        // Show for 3s, then hide
        setTimeout(() => {
            setVisible(false);
            // Wait for exit animation
            setTimeout(() => {
                isBusy.current = false;
                setCurrent(null);
                processQueue(); // process next in queue
            }, 500);
        }, 3000);
    }, []);

    const showAchievement = useCallback(
        (a: Achievement) => {
            // Don't show same achievement twice
            if (shownIds.current.has(a.id)) return;
            shownIds.current.add(a.id);
            queue.current.push(a);
            processQueue();
        },
        [processQueue]
    );

    // Register global function
    useEffect(() => {
        globalShow = showAchievement;
        return () => {
            globalShow = () => { };
        };
    }, [showAchievement]);

    if (!current) return null;

    return (
        <div
            className={`fixed bottom-20 right-4 sm:right-8 z-50 transition-all duration-500 ${visible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
        >
            <div
                className="flex items-center gap-3 px-5 py-3 min-w-[260px] sm:min-w-[300px]"
                style={{
                    background: "var(--t-bg)",
                    border: "3px solid var(--mc-gold)",
                    boxShadow:
                        "inset 2px 2px 0 rgba(255,255,255,0.1), inset -2px -2px 0 rgba(0,0,0,0.3), 4px 4px 0 rgba(0,0,0,0.4), 0 0 20px rgba(240,192,64,0.3)",
                }}
            >
                <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg"
                    style={{
                        background: "var(--mc-gold)",
                        boxShadow:
                            "inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3)",
                    }}
                >
                    🏆
                </div>
                <div>
                    <p className="text-mc-gold text-xs font-bold uppercase tracking-wider">
                        Achievement Unlocked!
                    </p>
                    <p className="text-t-text font-bold text-sm">{current.title}</p>
                    <p className="text-t-muted text-xs">{current.desc}</p>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useCallback, useEffect, useRef } from "react";

interface VideoLoaderProps {
  onComplete: () => void;
  timeoutMs?: number;
}

export default function VideoLoader({ onComplete, timeoutMs = 7000 }: VideoLoaderProps) {
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      finish();
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [finish, timeoutMs]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <video
        className="h-full w-full object-cover"
        src="/herobrineLoader.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        onError={finish}
      />
    </div>
  );
}

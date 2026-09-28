"use client";

import { useSyncExternalStore } from "react";

// Tiny shared flag: the preloader flips it, the WebGL scene and hero wait on
// it, so the reveal happens in sync with the curtain lifting.
let done = false;
const listeners = new Set<() => void>();

export const intro = {
  get done() {
    return done;
  },
  finish() {
    if (done) return;
    done = true;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

/** True once the intro has finished. */
export function useIntroDone() {
  return useSyncExternalStore(
    intro.subscribe,
    () => intro.done,
    () => false,
  );
}

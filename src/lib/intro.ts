// Tiny shared flag: the preloader flips it, the WebGL scene waits on it to
// assemble the particles, so the reveal happens in sync with the curtain.
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
    return () => listeners.delete(listener);
  },
};

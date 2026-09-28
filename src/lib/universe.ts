// Shared, mutable control surface for the WebGL scene. Plain module state
// (read every frame inside useFrame) so UI like the terminal can steer the
// universe without re-rendering React.
export const universe = {
  /** Extra warp speed, decays back to 0 on its own. */
  warp: 0,
  /** Force a particle shape slot (0-6), or null to follow the page. */
  shape: null as number | null,
  /** performance.now() of the last explosion request. */
  explodeAt: -Infinity,
  /** performance.now() of the last celebration request. */
  celebrateAt: -Infinity,
};

export const SHAPES = ["name", "globe", "helix", "wave", "knot", "galaxy", "portal"] as const;

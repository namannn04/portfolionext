// Point-cloud targets for the particle morph. Every generator returns exactly
// `count` xyz triples so any shape can blend into any other, particle by particle.

type Shape = Float32Array;

/** Deterministic PRNG so shapes are identical between renders and devices. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Samples filled pixels of `text` rendered in `font`, returned centred and
 * scaled so the text is `width` world units wide.
 */
export function textShape(count: number, text: string, font: string, width: number): { points: Shape; height: number } {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const fontSize = 220;
  ctx.font = `700 ${fontSize}px ${font}`;
  const metrics = ctx.measureText(text);
  const w = Math.ceil(metrics.width + 40);
  const h = Math.ceil(fontSize * 1.1);
  canvas.width = w;
  canvas.height = h;
  ctx.font = `700 ${fontSize}px ${font}`;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // Tighten tracking to match the display type on the page.
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "-8px";
  ctx.fillText(text, w / 2, h / 2);

  const data = ctx.getImageData(0, 0, w, h).data;
  const filled: number[] = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 140) filled.push(x, y);
    }
  }

  const rand = mulberry32(7);
  const scale = width / w;
  const points = new Float32Array(count * 3);
  const pairs = filled.length / 2;
  for (let i = 0; i < count; i += 1) {
    const pick = Math.floor(rand() * pairs) * 2;
    const px = filled[pick] + (rand() - 0.5) * 2;
    const py = filled[pick + 1] + (rand() - 0.5) * 2;
    points[i * 3] = (px - w / 2) * scale;
    points[i * 3 + 1] = -(py - h / 2) * scale;
    points[i * 3 + 2] = (rand() - 0.5) * 0.18;
  }
  return { points, height: h * scale };
}

export function sphereShape(count: number, radius = 1.6): Shape {
  const points = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const rand = mulberry32(11);
  for (let i = 0; i < count; i += 1) {
    // Most points on a Fibonacci shell, a few drifting inside for depth.
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const shell = rand() < 0.85 ? 1 : 0.35 + rand() * 0.6;
    points[i * 3] = Math.cos(theta) * r * radius * shell;
    points[i * 3 + 1] = y * radius * shell;
    points[i * 3 + 2] = Math.sin(theta) * r * radius * shell;
  }
  return points;
}

export function helixShape(count: number, length = 5.2, radius = 0.75): Shape {
  const points = new Float32Array(count * 3);
  const rand = mulberry32(23);
  for (let i = 0; i < count; i += 1) {
    const t = rand();
    const angle = t * Math.PI * 7;
    const strand = i % 3; // two strands and the rungs between them
    const x = (t - 0.5) * length;
    if (strand < 2) {
      const a = angle + strand * Math.PI;
      const jitter = 0.05;
      points[i * 3] = x + (rand() - 0.5) * jitter;
      points[i * 3 + 1] = Math.cos(a) * radius + (rand() - 0.5) * jitter;
      points[i * 3 + 2] = Math.sin(a) * radius + (rand() - 0.5) * jitter;
    } else {
      const k = (rand() - 0.5) * 2;
      points[i * 3] = x;
      points[i * 3 + 1] = Math.cos(angle) * radius * k;
      points[i * 3 + 2] = Math.sin(angle) * radius * k;
    }
  }
  return points;
}

export function waveShape(count: number, size = 5.5): Shape {
  const points = new Float32Array(count * 3);
  const side = Math.ceil(Math.sqrt(count));
  for (let i = 0; i < count; i += 1) {
    const gx = (i % side) / (side - 1) - 0.5;
    const gz = Math.floor(i / side) / (side - 1) - 0.5;
    points[i * 3] = gx * size;
    points[i * 3 + 1] = 0; // animated in the vertex shader
    points[i * 3 + 2] = gz * size * 0.7;
  }
  return points;
}

export function knotShape(count: number, scale = 0.62, p = 2, q = 3): Shape {
  const points = new Float32Array(count * 3);
  const rand = mulberry32(31);
  for (let i = 0; i < count; i += 1) {
    const t = rand() * Math.PI * 2;
    const r = 2 + Math.cos(q * t);
    const cx = r * Math.cos(p * t);
    const cy = r * Math.sin(p * t);
    const cz = -Math.sin(q * t);
    // Scatter around the curve to give it a tube.
    const tube = 0.32 * Math.sqrt(rand());
    const a = rand() * Math.PI * 2;
    points[i * 3] = (cx + Math.cos(a) * tube) * scale;
    points[i * 3 + 1] = (cy + Math.sin(a) * tube) * scale;
    points[i * 3 + 2] = (cz + Math.cos(a + 1.3) * tube) * scale;
  }
  return points;
}

export function galaxyShape(count: number, radius = 2.8, arms = 3): Shape {
  const points = new Float32Array(count * 3);
  const rand = mulberry32(47);
  for (let i = 0; i < count; i += 1) {
    const r = Math.pow(rand(), 1.6) * radius;
    const arm = ((i % arms) / arms) * Math.PI * 2;
    const spin = r * 1.25;
    const spread = 0.35 * (1 - r / radius) + 0.08;
    points[i * 3] = Math.cos(arm + spin) * r + (rand() - 0.5) * spread;
    points[i * 3 + 1] = (rand() - 0.5) * spread * 0.6;
    points[i * 3 + 2] = Math.sin(arm + spin) * r + (rand() - 0.5) * spread;
  }
  return points;
}

export function ringShape(count: number, radius = 1.9): Shape {
  const points = new Float32Array(count * 3);
  const rand = mulberry32(59);
  for (let i = 0; i < count; i += 1) {
    const a = rand() * Math.PI * 2;
    // Three concentric bands read as a portal.
    const band = [1, 0.82, 0.64][i % 3];
    const r = radius * band + (rand() - 0.5) * 0.08;
    points[i * 3] = Math.cos(a) * r;
    points[i * 3 + 1] = Math.sin(a) * r;
    points[i * 3 + 2] = (rand() - 0.5) * 0.12;
  }
  return points;
}

/** Loose cloud the particles start in before assembling. */
export function cloudShape(count: number, radius = 9): Shape {
  const points = new Float32Array(count * 3);
  const rand = mulberry32(71);
  for (let i = 0; i < count; i += 1) {
    const r = radius * Math.cbrt(rand());
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    points[i * 3 + 2] = r * Math.cos(phi) * 0.5;
  }
  return points;
}

export function randoms(count: number): Float32Array {
  const values = new Float32Array(count * 3);
  const rand = mulberry32(83);
  for (let i = 0; i < values.length; i += 1) values[i] = rand();
  return values;
}

// Ashima Arts 3D simplex noise (MIT) — https://github.com/ashima/webgl-noise
const simplex = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 noiseVec(vec3 p) {
  return vec3(snoise(p), snoise(p + vec3(31.4, 17.7, 5.3)), snoise(p + vec3(-11.2, 43.1, 27.9)));
}
`;

/*
 * Shape slots: 0 text (position), 1 sphere, 2 helix, 3 wave, 4 knot,
 * 5 galaxy, 6 ring. uFrom/uTo pick two slots and uMix blends between them.
 */
export const morphVertex = /* glsl */ `
uniform float uTime;
uniform float uFrom;
uniform float uTo;
uniform float uMix;
uniform float uIntro;
uniform float uSize;
uniform float uPixelRatio;
uniform float uTurbulence;
uniform float uExplode;
uniform vec3 uMouse;
uniform float uMouseStrength;

attribute vec3 aSphere;
attribute vec3 aHelix;
attribute vec3 aWave;
attribute vec3 aKnot;
attribute vec3 aGalaxy;
attribute vec3 aRing;
attribute vec3 aCloud;
attribute vec3 aRand;

varying float vAlpha;
varying float vAccent;
varying float vGlow;

${simplex}

mat3 rotY(float a) { float s = sin(a), c = cos(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
mat3 rotX(float a) { float s = sin(a), c = cos(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }
mat3 rotZ(float a) { float s = sin(a), c = cos(a); return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0); }

vec3 shapeAt(float slot) {
  float spin = uTime * 0.16;
  if (slot < 0.5) return position;
  if (slot < 1.5) return rotY(spin) * aSphere;
  if (slot < 2.5) return rotX(uTime * 0.35) * aHelix;
  if (slot < 3.5) {
    vec3 p = aWave;
    p.y = sin(p.x * 1.3 + uTime * 1.1) * 0.28 + cos(p.z * 1.9 + uTime * 0.8) * 0.22;
    return rotX(0.55) * p;
  }
  if (slot < 4.5) return rotY(spin) * rotX(spin * 0.6) * aKnot;
  if (slot < 5.5) return rotX(-1.05) * rotY(spin * 0.8) * aGalaxy;
  return rotZ(uTime * 0.1) * aRing;
}

void main() {
  float delay = aRand.x * 0.35;
  float m = smoothstep(delay, delay + 0.65, uMix);
  vec3 p = mix(shapeAt(uFrom), shapeAt(uTo), m);

  // Particles swirl apart mid-morph and settle as they arrive.
  float transit = sin(m * 3.14159);
  p += noiseVec(p * 0.55 + uTime * 0.18) * (transit * 0.85 + uTurbulence);
  p += noiseVec(p * 1.4 + uTime * 0.12) * 0.012;

  // Intro: assemble out of a wide cloud.
  float intro = smoothstep(aRand.y * 0.45, aRand.y * 0.45 + 0.55, uIntro);
  p = mix(aCloud, p, intro);

  // Explosion: every particle flies outward along its own jittered ray.
  vec3 ray = normalize(p + (aRand - 0.5) * 0.9 + 1e-4);
  p += ray * uExplode * (1.2 + aRand.x * 3.2);
  p += noiseVec(p * 0.4 + uTime * 0.5) * uExplode * 0.6;

  // Cursor pushes particles away and towards the camera.
  vec2 d = p.xy - uMouse.xy;
  float dist = length(d);
  float force = (1.0 - smoothstep(0.0, uMouse.z, dist)) * uMouseStrength;
  p.xy += normalize(d + 1e-5) * force * uMouse.z * 0.8;
  p.z += force * 0.5;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (0.55 + aRand.z * 0.9) * (1.0 + force * 1.2);
  gl_PointSize = size * uPixelRatio / -mv.z;

  vAccent = step(0.86, aRand.z);
  vGlow = force;
  vAlpha = (0.65 + 0.35 * sin(uTime * 0.9 + aRand.x * 40.0)) * mix(0.2, 1.0, intro);
}
`;

export const morphFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uOpacity;
uniform float uPulse;

varying float vAlpha;
varying float vAccent;
varying float vGlow;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float core = 1.0 - smoothstep(0.12, 0.5, d);
  if (core < 0.01) discard;
  vec3 color = mix(uColor, uAccent, clamp(vAccent + vGlow * 0.9 + uPulse, 0.0, 1.0));
  gl_FragColor = vec4(color, core * vAlpha * uOpacity);
}
`;

/*
 * Starfield. Stars live in a deep box in front of the camera and drift
 * slowly towards it, wrapping around so the field never runs out.
 */
const starCommon = /* glsl */ `
uniform float uTime;
uniform float uTravel;
uniform float uDepth;
attribute vec3 aSeed;

vec3 starPosition(vec3 p) {
  // Wrap depth so stars recycle endlessly in both scroll directions.
  float z = mod(p.z + uTravel, uDepth) - uDepth + 4.0;
  return vec3(p.xy, z);
}

float depthFade(float z) {
  // Fade in from the far plane and out right before the camera.
  return smoothstep(-uDepth + 4.0, -uDepth * 0.55, z) * (1.0 - smoothstep(1.5, 4.0, z));
}
`;

export const starPointVertex = /* glsl */ `
${starCommon}
uniform float uPixelRatio;
uniform float uSize;
varying float vAlpha;
varying float vTint;

void main() {
  vec3 p = starPosition(position);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed.y * 2.2) + aSeed.x * 40.0);
  gl_PointSize = uSize * (0.35 + aSeed.z * aSeed.z * 1.6) * uPixelRatio / -mv.z;
  vAlpha = depthFade(p.z) * twinkle;
  vTint = aSeed.y;
}
`;

export const starPointFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccent;
uniform vec3 uCool;
varying float vAlpha;
varying float vTint;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float core = 1.0 - smoothstep(0.0, 0.5, d);
  float halo = pow(core, 3.0);
  if (core < 0.01) discard;
  vec3 color = vTint > 0.92 ? uAccent : vTint > 0.78 ? uCool : uColor;
  gl_FragColor = vec4(color, (core * 0.5 + halo) * vAlpha);
}
`;

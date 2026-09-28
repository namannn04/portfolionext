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
`;

export const blobVertex = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uTwist;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vNoise;

${simplex}

vec3 twist(vec3 p, float amount) {
  float angle = p.y * amount;
  float s = sin(angle);
  float c = cos(angle);
  return vec3(c * p.x - s * p.z, p.y, s * p.x + c * p.z);
}

float field(vec3 p) {
  float slow = snoise(p * uFrequency + vec3(0.0, uTime * 0.18, uTime * 0.12));
  float fine = snoise(p * uFrequency * 2.1 - uTime * 0.2) * 0.12;
  return slow + fine;
}

vec3 displace(vec3 p) {
  vec3 n = normalize(p);
  return twist(p + n * field(p) * uAmplitude, uTwist);
}

void main() {
  vec3 p = position;
  vec3 n = normalize(normal);
  // Finite-difference normals keep the lighting correct after displacement.
  vec3 tangent = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 bitangent = normalize(cross(n, tangent));
  float e = 0.012;
  vec3 d0 = displace(p);
  vec3 d1 = displace(p + tangent * e);
  vec3 d2 = displace(p + bitangent * e);
  vec3 displacedNormal = normalize(cross(d1 - d0, d2 - d0));

  vNoise = field(p);
  vec4 mv = modelViewMatrix * vec4(d0, 1.0);
  vNormal = normalize(normalMatrix * displacedNormal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

export const blobFragment = /* glsl */ `
uniform float uTime;
uniform float uHue;
uniform float uDim;
uniform vec3 uAccent;
uniform vec3 uBase;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vNoise;

vec3 palette(float t) {
  // Cool iridescence: deep teal -> cyan -> lime, anchored to the brand accent.
  vec3 a = vec3(0.42, 0.5, 0.46);
  vec3 b = vec3(0.38, 0.4, 0.34);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.32 + uHue, 0.42 + uHue, 0.58 + uHue);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vViewDir);
  if (!gl_FrontFacing) n = -n;

  float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.4);
  vec3 keyDir = normalize(vec3(-0.6, 0.8, 0.7));
  vec3 rimDir = normalize(vec3(0.9, -0.3, -0.4));
  float diffuse = max(dot(n, keyDir), 0.0);
  float spec = pow(max(dot(reflect(-keyDir, n), v), 0.0), 28.0);
  float rim = pow(max(dot(n, rimDir), 0.0), 3.0);

  vec3 irid = palette(fresnel * 0.9 + vNoise * 0.22 + uTime * 0.015);
  vec3 color = uBase;
  color += uBase * diffuse * 1.6;
  color = mix(color, irid, fresnel * 0.85);
  color += uAccent * rim * 0.55;
  color += vec3(spec) * 0.45;
  color += uAccent * smoothstep(0.35, 1.0, vNoise) * 0.14;

  gl_FragColor = vec4(color * uDim, 1.0);
  #include <colorspace_fragment>
}
`;

export const particlesVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
attribute float aScale;
attribute float aOffset;
varying float vAlpha;

void main() {
  vec3 p = position;
  p.y += sin(uTime * 0.35 + aOffset * 6.28) * 0.12;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.6 + aOffset * 40.0));
}
`;

export const particlesFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.0, d) * vAlpha * 0.7;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(uColor, alpha);
}
`;

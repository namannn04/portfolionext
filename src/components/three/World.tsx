"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { blobFragment, blobVertex, particlesFragment, particlesVertex } from "./shaders";

type Pose = { x: number; y: number; scale: number; amplitude: number; hue: number; dim?: number };
type Preset = { id: string; desktop: Pose; mobile: Pose };

// One pose per page section. x/y are fractions of the half-viewport, scale is a
// fraction of the smaller viewport side, so poses hold up at any aspect ratio.
const PRESETS: Preset[] = [
  { id: "top", desktop: { x: 0.46, y: 0.02, scale: 0.3, amplitude: 0.24, hue: 0, dim: 1 }, mobile: { x: 0.28, y: 0.6, scale: 0.25, amplitude: 0.22, hue: 0, dim: 1 } },
  { id: "about", desktop: { x: 0.74, y: 0.5, scale: 0.19, amplitude: 0.42, hue: 0.06 }, mobile: { x: 0.62, y: 0.72, scale: 0.2, amplitude: 0.4, hue: 0.06 } },
  { id: "experience", desktop: { x: 0.64, y: -0.25, scale: 0.22, amplitude: 0.28, hue: 0.12 }, mobile: { x: -0.7, y: 0.78, scale: 0.18, amplitude: 0.28, hue: 0.12 } },
  { id: "work", desktop: { x: -0.7, y: 0.45, scale: 0.16, amplitude: 0.5, hue: 0.2 }, mobile: { x: 0.72, y: 0.8, scale: 0.16, amplitude: 0.45, hue: 0.2 } },
  { id: "skills", desktop: { x: 0.58, y: 0.05, scale: 0.26, amplitude: 0.36, hue: 0.28 }, mobile: { x: -0.6, y: 0.74, scale: 0.2, amplitude: 0.34, hue: 0.28 } },
  { id: "events", desktop: { x: -0.6, y: -0.35, scale: 0.18, amplitude: 0.3, hue: 0.34 }, mobile: { x: 0.66, y: 0.78, scale: 0.17, amplitude: 0.3, hue: 0.34 } },
  { id: "contact", desktop: { x: 0.36, y: 0.0, scale: 0.36, amplitude: 0.38, hue: 0.4, dim: 1 }, mobile: { x: 0.0, y: 0.5, scale: 0.3, amplitude: 0.36, hue: 0.4, dim: 0.8 } },
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const mixPose = (a: Pose, b: Pose, t: number): Pose => ({
  x: THREE.MathUtils.lerp(a.x, b.x, t),
  y: THREE.MathUtils.lerp(a.y, b.y, t),
  scale: THREE.MathUtils.lerp(a.scale, b.scale, t),
  amplitude: THREE.MathUtils.lerp(a.amplitude, b.amplitude, t),
  hue: THREE.MathUtils.lerp(a.hue, b.hue, t),
  dim: THREE.MathUtils.lerp(a.dim ?? 0.62, b.dim ?? 0.62, t),
});

/** Tracks the document offset of every section that has a preset. */
function useSectionOffsets() {
  const offsets = useRef<{ index: number; top: number }[]>([]);
  useEffect(() => {
    const measure = () => {
      offsets.current = PRESETS.flatMap((preset, index) => {
        const el = document.getElementById(preset.id);
        return el ? [{ index, top: el.getBoundingClientRect().top + window.scrollY }] : [];
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return offsets;
}

function currentPose(offsets: { index: number; top: number }[], mobile: boolean): Pose {
  const pick = (index: number) => (mobile ? PRESETS[index].mobile : PRESETS[index].desktop);
  if (offsets.length === 0) return pick(0);
  const probe = window.scrollY + window.innerHeight * 0.5;
  if (probe <= offsets[0].top) return pick(offsets[0].index);
  for (let i = 0; i < offsets.length - 1; i += 1) {
    const from = offsets[i];
    const to = offsets[i + 1];
    if (probe < to.top) {
      // Hold each pose through most of its section, then glide to the next.
      const raw = (probe - from.top) / Math.max(1, to.top - from.top);
      const t = smooth(THREE.MathUtils.clamp((raw - 0.45) / 0.55, 0, 1));
      return mixPose(pick(from.index), pick(to.index), t);
    }
  }
  return pick(offsets[offsets.length - 1].index);
}

function Blob({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const offsets = useSectionOffsets();
  const pointer = useRef({ x: 0, y: 0 });
  const lastScroll = useRef(0);
  const energy = useRef(0);
  const reveal = useRef(0);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, mobile ? 28 : 48), [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.32 },
      uFrequency: { value: 0.95 },
      uTwist: { value: 0.35 },
      uHue: { value: 0 },
      uDim: { value: 1 },
      uAccent: { value: new THREE.Color("#c6f432") },
      uBase: { value: new THREE.Color("#0c1116") },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;
    const dt = Math.min(delta, 1 / 30);
    const damp = (current: number, target: number, speed: number) =>
      THREE.MathUtils.damp(current, target, speed, dt);

    const scrollY = window.scrollY;
    const velocity = Math.abs(scrollY - lastScroll.current) / Math.max(dt, 1e-3);
    lastScroll.current = scrollY;
    energy.current = damp(energy.current, Math.min(velocity / 2600, 1), 3);
    reveal.current = damp(reveal.current, 1, 1.6);

    const pose = currentPose(offsets.current, mobile);
    const minSide = Math.min(viewport.width, viewport.height);
    const targetScale = pose.scale * minSide * (0.75 + 0.25 * reveal.current);
    const targetX = pose.x * viewport.width * 0.5 + pointer.current.x * 0.12;
    const targetY = pose.y * viewport.height * 0.5 + pointer.current.y * 0.12;

    group.current.position.x = damp(group.current.position.x, targetX, 2.4);
    group.current.position.y = damp(group.current.position.y, targetY, 2.4);
    const scale = damp(group.current.scale.x, targetScale, 2.4);
    group.current.scale.setScalar(scale);

    group.current.rotation.x = damp(group.current.rotation.x, pointer.current.y * 0.35, 2);
    group.current.rotation.y = damp(group.current.rotation.y, pointer.current.x * 0.5, 2);
    if (!reducedMotion) mesh.current.rotation.y += dt * (0.08 + energy.current * 0.6);

    uniforms.uTime.value += reducedMotion ? 0 : dt * (1 + energy.current * 2.5);
    uniforms.uAmplitude.value = damp(uniforms.uAmplitude.value, pose.amplitude + energy.current * 0.25, 3);
    uniforms.uTwist.value = damp(uniforms.uTwist.value, 0.35 + energy.current * 1.4, 3);
    uniforms.uHue.value = damp(uniforms.uHue.value, pose.hue, 2);
    uniforms.uDim.value = damp(uniforms.uDim.value, pose.dim ?? 0.62, 2.5);
    state.camera.position.y = damp(state.camera.position.y, -scrollY * 0.0004, 4);
  });

  return (
    <group ref={group} scale={0.001}>
      <mesh ref={mesh} geometry={geometry}>
        <shaderMaterial vertexShader={blobVertex} fragmentShader={blobFragment} uniforms={uniforms} />
      </mesh>
    </group>
  );
}

function Dust({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const radius = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 3;
      scales[i] = 0.4 + Math.random();
      offsets[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    g.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    return g;
  }, [count]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 26 },
      uColor: { value: new THREE.Color("#dfe7ee") },
    }),
    [gl],
  );

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return;
    uniforms.uTime.value += delta;
    points.current.rotation.y += delta * 0.012;
    points.current.rotation.x = -window.scrollY * 0.00008;
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        vertexShader={particlesVertex}
        fragmentShader={particlesFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function World() {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.innerWidth < 768);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1600ms] ease-out-quart"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        fallback={null}
      >
        <Blob reducedMotion={reducedMotion} />
        <Dust count={mobile ? 450 : 1100} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

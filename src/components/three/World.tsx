"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { intro } from "@/lib/intro";
import { dustFragment, dustVertex, morphFragment, morphVertex } from "./shaders";
import {
  cloudShape,
  galaxyShape,
  helixShape,
  knotShape,
  randoms,
  ringShape,
  sphereShape,
  textShape,
  waveShape,
} from "./shapes";

/** Shape slots, matching `shapeAt` in the vertex shader. */
const SLOT = { text: 0, sphere: 1, helix: 2, wave: 3, knot: 4, galaxy: 5, ring: 6 } as const;

type Pose = { x: number; y: number; scale: number; opacity: number };
type Preset = { id: string; slot: number; desktop: Pose; mobile: Pose };

// x/y are fractions of the half-viewport. scale is relative to the smaller
// viewport side (the hero text is sized in world units, so it uses 1).
const PRESETS: Preset[] = [
  {
    id: "top",
    slot: SLOT.text,
    desktop: { x: 0, y: 0.2, scale: 1, opacity: 1 },
    mobile: { x: 0, y: 0.36, scale: 1, opacity: 1 },
  },
  {
    id: "about",
    slot: SLOT.sphere,
    desktop: { x: 0.74, y: 0.42, scale: 0.46, opacity: 0.55 },
    mobile: { x: 0.55, y: 0.66, scale: 0.34, opacity: 0.45 },
  },
  {
    id: "experience",
    slot: SLOT.helix,
    desktop: { x: 0.05, y: -0.68, scale: 0.72, opacity: 0.42 },
    mobile: { x: 0, y: 0.74, scale: 0.36, opacity: 0.45 },
  },
  {
    id: "work",
    slot: SLOT.wave,
    desktop: { x: 0, y: -0.62, scale: 1.05, opacity: 0.45 },
    mobile: { x: 0, y: -0.72, scale: 0.5, opacity: 0.4 },
  },
  {
    id: "skills",
    slot: SLOT.knot,
    desktop: { x: 0.7, y: 0.38, scale: 0.52, opacity: 0.55 },
    mobile: { x: 0.5, y: 0.68, scale: 0.34, opacity: 0.45 },
  },
  {
    id: "events",
    slot: SLOT.galaxy,
    desktop: { x: 0.02, y: 0.66, scale: 0.72, opacity: 0.5 },
    mobile: { x: 0, y: 0.7, scale: 0.4, opacity: 0.45 },
  },
  {
    id: "contact",
    slot: SLOT.ring,
    desktop: { x: 0.64, y: 0.34, scale: 0.46, opacity: 0.9 },
    mobile: { x: 0.52, y: 0.7, scale: 0.3, opacity: 0.6 },
  },
];

const smooth = (t: number) => t * t * (3 - 2 * t);

type Frame = { from: number; to: number; mix: number; pose: Pose };

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

function resolve(offsets: { index: number; top: number }[], mobile: boolean): Frame {
  const pick = (index: number) => (mobile ? PRESETS[index].mobile : PRESETS[index].desktop);
  const hold = (index: number): Frame => ({
    from: PRESETS[index].slot,
    to: PRESETS[index].slot,
    mix: 0,
    pose: pick(index),
  });
  if (offsets.length === 0) return hold(0);
  const probe = window.scrollY + window.innerHeight * 0.55;
  if (probe <= offsets[0].top) return hold(offsets[0].index);
  for (let i = 0; i < offsets.length - 1; i += 1) {
    const a = offsets[i];
    const b = offsets[i + 1];
    if (probe < b.top) {
      // Hold each shape through most of its section, then morph into the next.
      const raw = (probe - a.top) / Math.max(1, b.top - a.top);
      const t = smooth(THREE.MathUtils.clamp((raw - 0.5) / 0.5, 0, 1));
      const pa = pick(a.index);
      const pb = pick(b.index);
      const lerp = THREE.MathUtils.lerp;
      return {
        from: PRESETS[a.index].slot,
        to: PRESETS[b.index].slot,
        mix: t,
        pose: {
          x: lerp(pa.x, pb.x, t),
          y: lerp(pa.y, pb.y, t),
          scale: lerp(pa.scale, pb.scale, t),
          opacity: lerp(pa.opacity, pb.opacity, t),
        },
      };
    }
  }
  return hold(offsets[offsets.length - 1].index);
}

function Particles({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const { viewport, size, gl } = useThree();
  const mobile = size.width < 768 || size.height > size.width * 1.15;
  const offsets = useSectionOffsets();
  const pointer = useRef({ x: 0, y: 0, active: 0, last: -10 });
  const introProgress = useRef(reducedMotion ? 1 : 0);
  const introStart = useRef<number | null>(intro.done ? performance.now() : null);
  const lastScroll = useRef(0);
  const energy = useRef(0);
  // Text is sized in world units, so track the viewport width it was built for.
  const textWidth = useRef(0);
  const textPose = useRef(1);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aSphere", new THREE.BufferAttribute(sphereShape(count), 3));
    g.setAttribute("aHelix", new THREE.BufferAttribute(helixShape(count), 3));
    g.setAttribute("aWave", new THREE.BufferAttribute(waveShape(count), 3));
    g.setAttribute("aKnot", new THREE.BufferAttribute(knotShape(count), 3));
    g.setAttribute("aGalaxy", new THREE.BufferAttribute(galaxyShape(count), 3));
    g.setAttribute("aRing", new THREE.BufferAttribute(ringShape(count), 3));
    g.setAttribute("aCloud", new THREE.BufferAttribute(cloudShape(count), 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(randoms(count), 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);
    return g;
  }, [count]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uMix: { value: 0 },
      uIntro: { value: introProgress.current },
      uSize: { value: 14 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uTurbulence: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0.5) },
      uMouseStrength: { value: 0 },
      uOpacity: { value: 1 },
      uColor: { value: new THREE.Color("#e9eef5") },
      uAccent: { value: new THREE.Color("#c6f432") },
    }),
    [gl],
  );
  // Own the material so these exact uniform objects reach the GPU.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: morphVertex,
        fragmentShader: morphFragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  );
  useEffect(() => () => material.dispose(), [material]);

  // (Re)build the name whenever the viewport width changes meaningfully.
  useEffect(() => {
    const target = viewport.width * (mobile ? 0.92 : 0.86);
    if (Math.abs(target - textWidth.current) < 0.05) return;
    textWidth.current = target;
    let cancelled = false;
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage").trim() || "sans-serif";
    document.fonts
      .load(`700 220px ${family}`)
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        const { points } = textShape(count, "NAMAN", family, target);
        const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
        (attribute.array as Float32Array).set(points);
        attribute.needsUpdate = true;
      });
    return () => {
      cancelled = true;
    };
  }, [viewport.width, mobile, count, geometry]);

  useEffect(() => {
    uniforms.uSize.value = THREE.MathUtils.clamp(18 + (size.width / 1440) * 14, 20, 34);
  }, [size.width, uniforms]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointer.current.last = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    const begin = () => (introStart.current ??= performance.now());
    const unsubscribe = intro.subscribe(begin);
    // Safety net: never leave the particles scattered if no preloader runs.
    const fallback = window.setTimeout(begin, 4000);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      unsubscribe();
    };
  }, []);

  useFrame((_, delta) => {
    const group = points.current;
    if (!group) return;
    const dt = Math.min(delta, 1 / 30);
    const damp = (current: number, target: number, speed: number) => THREE.MathUtils.damp(current, target, speed, dt);

    const scrollY = window.scrollY;
    const velocity = Math.abs(scrollY - lastScroll.current) / Math.max(dt, 1e-3);
    lastScroll.current = scrollY;
    energy.current = damp(energy.current, Math.min(velocity / 3000, 1), 3);

    // Wall-clock based so the assembly finishes on time even at low frame rates.
    if (introStart.current !== null && !reducedMotion) {
      const t = Math.min((performance.now() - introStart.current) / 2600, 1);
      introProgress.current = 1 - Math.pow(1 - t, 3);
    }
    uniforms.uIntro.value = introProgress.current;

    const frame = resolve(offsets.current, mobile);
    uniforms.uFrom.value = frame.from;
    uniforms.uTo.value = frame.to;
    uniforms.uMix.value = frame.mix;

    // Text is authored at world scale; every other shape scales with the viewport.
    const minSide = Math.min(viewport.width, viewport.height);
    const shapeScale = (frame.pose.scale * minSide) / 3.2;
    textPose.current = frame.from === SLOT.text ? 1 - frame.mix : 0;
    const targetScale = THREE.MathUtils.lerp(shapeScale, 1, textPose.current);
    const scale = damp(group.scale.x, targetScale, 3.2);
    group.scale.setScalar(scale);
    group.position.x = damp(group.position.x, (frame.pose.x * viewport.width) / 2, 3.2);
    group.position.y = damp(group.position.y, (frame.pose.y * viewport.height) / 2, 3.2);

    // Cursor in the group's local space, so the push works at any pose.
    const recent = performance.now() - pointer.current.last < 1400;
    pointer.current.active = damp(pointer.current.active, recent ? 1 : 0, recent ? 6 : 1.5);
    const worldX = (pointer.current.x * viewport.width) / 2;
    const worldY = (pointer.current.y * viewport.height) / 2;
    const mouse = uniforms.uMouse.value;
    mouse.x = damp(mouse.x, (worldX - group.position.x) / scale, 10);
    mouse.y = damp(mouse.y, (worldY - group.position.y) / scale, 10);
    mouse.z = (mobile ? 0.3 : 0.42) / scale;
    uniforms.uMouseStrength.value = reducedMotion ? 0 : pointer.current.active;

    uniforms.uTime.value += reducedMotion ? 0 : dt;
    uniforms.uTurbulence.value = energy.current * 0.6;
    uniforms.uOpacity.value = damp(uniforms.uOpacity.value, frame.pose.opacity, 2.5);
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

function Dust({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 5;
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
      uSize: { value: 22 },
      uColor: { value: new THREE.Color("#aeb8c4") },
    }),
    [gl],
  );
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dustVertex,
        fragmentShader: dustFragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return;
    uniforms.uTime.value += delta;
    points.current.rotation.y += delta * 0.01;
    points.current.rotation.x = -window.scrollY * 0.00005;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

export default function World() {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<{ count: number; dust: number; reducedMotion: boolean; dpr: number } | null>(
    null,
  );

  useEffect(() => {
    const narrow = window.innerWidth < 768;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    setSettings({
      count: narrow ? 9000 : weak ? 11000 : 18000,
      dust: narrow ? 300 : 700,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      dpr: narrow ? 1.5 : 2,
    });
  }, []);

  if (!settings) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1200ms] ease-out-quart"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, settings.dpr]}
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        fallback={null}
      >
        <Particles count={settings.count} reducedMotion={settings.reducedMotion} />
        <Dust count={settings.dust} reducedMotion={settings.reducedMotion} />
      </Canvas>
    </div>
  );
}

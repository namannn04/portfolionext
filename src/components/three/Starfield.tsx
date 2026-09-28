"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { universe } from "@/lib/universe";
import { starPointFragment, starPointVertex } from "./shaders";

const DEPTH = 42;

/**
 * Deep, calm starfield drifting slowly towards the camera. Scroll adds a
 * gentle, capped parallax so it feels alive without ever streaking.
 */
export default function Starfield({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const { gl } = useThree();
  const lastScroll = useRef<number | null>(null);
  const speed = useRef(0.35);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 19;
      positions[i * 3 + 2] = Math.random() * DEPTH;
      seeds[i * 3] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
    // Positions are rewritten in the shader, so skip culling bounds.
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTravel: { value: 0 },
      uDepth: { value: DEPTH },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 30 },
      uColor: { value: new THREE.Color("#dde6f0") },
      uCool: { value: new THREE.Color("#8fd3ff") },
      uAccent: { value: new THREE.Color("#c6f432") },
    }),
    [gl],
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: starPointVertex,
        fragmentShader: starPointFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    uniforms.uTime.value += dt;
    if (reducedMotion) return;

    const scrollY = window.scrollY;
    const scrollDelta = lastScroll.current === null ? 0 : scrollY - lastScroll.current;
    lastScroll.current = scrollY;
    // Slow idle drift plus a soft, clamped nudge from scrolling.
    const nudge = THREE.MathUtils.clamp((scrollDelta / Math.max(dt, 1e-3)) * 0.0015, -1.2, 1.2);
    const target = 0.35 + nudge + Math.min(universe.warp, 6);
    speed.current = THREE.MathUtils.damp(speed.current, target, 2.5, dt);
    universe.warp = THREE.MathUtils.damp(universe.warp, 0, 0.8, dt);
    uniforms.uTravel.value += speed.current * dt;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

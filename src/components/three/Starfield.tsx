"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { universe } from "@/lib/universe";
import { starLineFragment, starLineVertex, starPointFragment, starPointVertex } from "./shaders";

const DEPTH = 42;

/**
 * Deep starfield that flies towards the camera as you scroll. At speed the
 * stars stretch into hyperspace streaks; scrolling up reverses the flight.
 */
export default function Starfield({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const { gl } = useThree();
  const lastScroll = useRef<number | null>(null);
  const speed = useRef(0);

  const { pointGeometry, lineGeometry } = useMemo(() => {
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
    const points = new THREE.BufferGeometry();
    points.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    points.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));

    // Each streak is a head/tail pair sharing its star's position and seed.
    const linePositions = new Float32Array(count * 6);
    const lineSeeds = new Float32Array(count * 6);
    const ends = new Float32Array(count * 2);
    for (let i = 0; i < count; i += 1) {
      for (let end = 0; end < 2; end += 1) {
        linePositions.set(positions.subarray(i * 3, i * 3 + 3), (i * 2 + end) * 3);
        lineSeeds.set(seeds.subarray(i * 3, i * 3 + 3), (i * 2 + end) * 3);
        ends[i * 2 + end] = end;
      }
    }
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lines.setAttribute("aSeed", new THREE.BufferAttribute(lineSeeds, 3));
    lines.setAttribute("aEnd", new THREE.BufferAttribute(ends, 1));
    // Positions are rewritten in the shader, so skip culling bounds.
    points.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);
    lines.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);
    return { pointGeometry: points, lineGeometry: lines };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTravel: { value: 0 },
      uDepth: { value: DEPTH },
      uStretch: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 30 },
      uColor: { value: new THREE.Color("#dde6f0") },
      uCool: { value: new THREE.Color("#8fd3ff") },
      uAccent: { value: new THREE.Color("#c6f432") },
    }),
    [gl],
  );

  const materials = useMemo(() => {
    const shared = { uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
    return {
      points: new THREE.ShaderMaterial({ ...shared, vertexShader: starPointVertex, fragmentShader: starPointFragment }),
      lines: new THREE.ShaderMaterial({ ...shared, vertexShader: starLineVertex, fragmentShader: starLineFragment }),
    };
  }, [uniforms]);

  useEffect(
    () => () => {
      pointGeometry.dispose();
      lineGeometry.dispose();
      materials.points.dispose();
      materials.lines.dispose();
    },
    [pointGeometry, lineGeometry, materials],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    uniforms.uTime.value += dt;
    if (reducedMotion) return;

    const scrollY = window.scrollY;
    const scrollDelta = lastScroll.current === null ? 0 : scrollY - lastScroll.current;
    lastScroll.current = scrollY;
    // Scroll px/s -> world units/s, plus whatever the terminal asked for.
    const target = 0.5 + (scrollDelta / Math.max(dt, 1e-3)) * 0.012 + universe.warp;
    speed.current = THREE.MathUtils.damp(speed.current, target, 4, dt);
    universe.warp = THREE.MathUtils.damp(universe.warp, 0, 0.8, dt);

    uniforms.uTravel.value += speed.current * dt;
    uniforms.uStretch.value = THREE.MathUtils.damp(
      uniforms.uStretch.value,
      Math.min(Math.max(Math.abs(speed.current) - 1.2, 0) * 0.16, 5),
      6,
      dt,
    );
  });

  return (
    <group>
      <lineSegments geometry={lineGeometry} material={materials.lines} frustumCulled={false} />
      <points geometry={pointGeometry} material={materials.points} frustumCulled={false} />
    </group>
  );
}

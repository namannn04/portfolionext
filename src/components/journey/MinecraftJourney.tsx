"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BlockPosition = [number, number, number];
const WORLD_END = 78;

function seededNoise(x: number, y: number, seed = 17) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + seed * 31.17) * 43758.5453;
  return value - Math.floor(value);
}

function terrainHeight(x: number, z: number) {
  if (x < 18) return Math.round(Math.sin(x * 0.24) * 0.5 + Math.sin(z * 0.42) * 0.35);
  if (x < 37) return Math.round(1 + Math.sin(x * 0.31) * 0.85 + Math.cos(z * 0.5) * 0.55);
  if (x < 56) return Math.round(1.4 + Math.sin(x * 0.17) * 1.5 + Math.cos(z * 0.35) * 0.75);
  return Math.round(0.5 + Math.sin(x * 0.22) * 0.65 + Math.cos(z * 0.45) * 0.4);
}

function createPixelTexture(base: string, flecks: Array<{ color: string; amount: number }>, seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext("2d")!;
  context.fillStyle = base;
  context.fillRect(0, 0, 16, 16);
  flecks.forEach((fleck, fleckIndex) => {
    context.fillStyle = fleck.color;
    for (let index = 0; index < fleck.amount; index += 1) {
      const x = Math.floor(seededNoise(index, fleckIndex, seed) * 16);
      const y = Math.floor(seededNoise(fleckIndex, index, seed + 7) * 16);
      const size = seededNoise(index, fleckIndex, seed + 13) > 0.78 ? 2 : 1;
      context.fillRect(x, y, size, size);
    }
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  return texture;
}

function useBlockMaterials() {
  return useMemo(() => {
    const grassTop = createPixelTexture("#5f9d39", [{ color: "#78b64b", amount: 42 }, { color: "#3f792b", amount: 35 }, { color: "#90c85c", amount: 14 }], 2);
    const grassSide = createPixelTexture("#725033", [{ color: "#4d842f", amount: 54 }, { color: "#8b6844", amount: 42 }, { color: "#5e3f29", amount: 24 }], 5);
    const dirt = createPixelTexture("#785238", [{ color: "#936849", amount: 55 }, { color: "#593a28", amount: 38 }, { color: "#ad7b55", amount: 16 }], 9);
    const stone = createPixelTexture("#777777", [{ color: "#919191", amount: 48 }, { color: "#5d5d5d", amount: 38 }, { color: "#a6a6a6", amount: 12 }], 13);
    const logSide = createPixelTexture("#6c4b2b", [{ color: "#8b6338", amount: 38 }, { color: "#4f351f", amount: 30 }], 17);
    const logTop = createPixelTexture("#a17a49", [{ color: "#684a2b", amount: 31 }, { color: "#c1955b", amount: 24 }], 19);
    const leaves = createPixelTexture("#397d31", [{ color: "#4f963d", amount: 61 }, { color: "#285d28", amount: 43 }, { color: "#66aa4a", amount: 18 }], 23);
    const planks = createPixelTexture("#a77a45", [{ color: "#c09257", amount: 36 }, { color: "#76502f", amount: 28 }], 29);
    const cobble = createPixelTexture("#747474", [{ color: "#969696", amount: 42 }, { color: "#4e4e4e", amount: 42 }], 31);
    const obsidian = createPixelTexture("#181126", [{ color: "#302149", amount: 45 }, { color: "#0b0810", amount: 38 }, { color: "#50336f", amount: 10 }], 37);
    const netherrack = createPixelTexture("#6f2e2e", [{ color: "#9a4140", amount: 51 }, { color: "#4e2024", amount: 44 }, { color: "#bd5850", amount: 13 }], 41);
    const lambert = (map: THREE.Texture) => new THREE.MeshLambertMaterial({ map });
    const grassSideMaterial = lambert(grassSide);
    const dirtMaterial = lambert(dirt);
    const logSideMaterial = lambert(logSide);
    return {
      grass: [grassSideMaterial, grassSideMaterial, lambert(grassTop), dirtMaterial, grassSideMaterial, grassSideMaterial],
      dirt: dirtMaterial,
      stone: lambert(stone),
      log: [logSideMaterial, logSideMaterial, lambert(logTop), lambert(logTop), logSideMaterial, logSideMaterial],
      leaves: lambert(leaves),
      planks: lambert(planks),
      cobble: lambert(cobble),
      obsidian: lambert(obsidian),
      netherrack: lambert(netherrack),
    };
  }, []);
}

function InstancedBlocks({ positions, material, castShadow = true }: { positions: BlockPosition[]; material: THREE.Material | THREE.Material[]; castShadow?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const matrix = new THREE.Matrix4();
    positions.forEach(([x, y, z], index) => {
      matrix.makeTranslation(x, y, z);
      mesh.current!.setMatrixAt(index, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [positions]);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, positions.length]} material={material} castShadow={castShadow} receiveShadow frustumCulled>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}

function VoxelTree({ x, z, birch = false }: { x: number; z: number; birch?: boolean }) {
  const materials = useBlockMaterials();
  const y = terrainHeight(x, z) + 1;
  const leaves: BlockPosition[] = [];
  for (let dy = 3; dy <= 5; dy += 1) {
    const radius = dy === 5 ? 1 : 2;
    for (let dx = -radius; dx <= radius; dx += 1) {
      for (let dz = -radius; dz <= radius; dz += 1) {
        if (Math.abs(dx) === radius && Math.abs(dz) === radius && seededNoise(x + dx, z + dz, dy) > 0.42) continue;
        leaves.push([x + dx, y + dy, z + dz]);
      }
    }
  }
  const birchTexture = useMemo(() => createPixelTexture("#d9d2b7", [{ color: "#25221f", amount: 31 }, { color: "#f0ead5", amount: 32 }], 71), []);
  const birchMaterial = useMemo(() => new THREE.MeshLambertMaterial({ map: birchTexture }), [birchTexture]);
  return (
    <group>
      <InstancedBlocks positions={[[x, y, z], [x, y + 1, z], [x, y + 2, z], [x, y + 3, z]]} material={birch ? birchMaterial : materials.log} />
      <InstancedBlocks positions={leaves} material={materials.leaves} castShadow={false} />
    </group>
  );
}

function VillageHouse({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  const materials = useBlockMaterials();
  const baseY = terrainHeight(x, z) + 1;
  const wood: BlockPosition[] = [];
  const cobble: BlockPosition[] = [];
  for (let dx = -3; dx <= 3; dx += 1) {
    for (let dz = -2; dz <= 2; dz += 1) {
      cobble.push([dx, 0, dz]);
      for (let dy = 1; dy <= 3; dy += 1) {
        const edge = Math.abs(dx) === 3 || Math.abs(dz) === 2;
        const doorway = dz === 2 && dx === 0 && dy <= 2;
        const window = Math.abs(dx) === 3 && dz === 0 && dy === 2;
        if (edge && !doorway && !window) wood.push([dx, dy, dz]);
      }
    }
  }
  for (let level = 0; level < 4; level += 1) {
    const half = 4 - level;
    for (let dx = -half; dx <= half; dx += 1) wood.push([dx, 4 + level, -3 + level], [dx, 4 + level, 3 - level]);
  }
  return (
    <group position={[x, baseY, z]} rotation-y={rotation}>
      <InstancedBlocks positions={cobble} material={materials.cobble} />
      <InstancedBlocks positions={wood} material={materials.planks} />
      <mesh position={[0, 2, 2.51]} castShadow><boxGeometry args={[0.9, 2, 0.12]} /><meshLambertMaterial color="#5a351d" /></mesh>
      <mesh position={[3.51, 2, 0]}><boxGeometry args={[0.08, 1, 1]} /><meshBasicMaterial color="#74b9d1" transparent opacity={0.72} /></mesh>
      <pointLight position={[0, 3, 2.8]} color="#ffb64d" intensity={3.5} distance={7} />
    </group>
  );
}

function NetherPortal({ x }: { x: number }) {
  const materials = useBlockMaterials();
  const y = terrainHeight(x, 0) + 1;
  const frame: BlockPosition[] = [];
  for (let dy = 0; dy <= 5; dy += 1) frame.push([-2, dy, 0], [2, dy, 0]);
  for (let dx = -1; dx <= 1; dx += 1) frame.push([dx, 0, 0], [dx, 5, 0]);
  const netherrack: BlockPosition[] = [[-3, 0, 1], [-2, 0, 1], [2, 0, 1], [3, 0, 1], [-3, -1, 0], [3, -1, 0]];
  return (
    <group position={[x, y, 0]}>
      <InstancedBlocks positions={frame} material={materials.obsidian} />
      <InstancedBlocks positions={netherrack} material={materials.netherrack} />
      <mesh position={[0, 2.65, 0]}><planeGeometry args={[3, 4.15]} /><meshBasicMaterial color="#8d32cd" transparent opacity={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.65, -0.03]}><planeGeometry args={[3, 4.15, 12, 12]} /><meshBasicMaterial color="#d068ff" transparent opacity={0.2} wireframe /></mesh>
      <pointLight position={[0, 2.5, 1]} color="#b348ff" intensity={7} distance={12} />
    </group>
  );
}

function MinecraftPlayer({ progress }: { progress: number }) {
  const player = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3());
  const cameraTarget = useRef(new THREE.Vector3());
  const previousX = useRef(0);
  useFrame((state, delta) => {
    if (!player.current) return;
    const targetX = -3 + progress * WORLD_END;
    const groundY = terrainHeight(targetX, 0) + 0.52;
    target.current.set(targetX, groundY, 0);
    player.current.position.lerp(target.current, 1 - Math.exp(-delta * 6.5));
    const velocity = Math.abs(player.current.position.x - previousX.current) / Math.max(delta, 0.001);
    previousX.current = player.current.position.x;
    const moving = velocity > 0.12;
    const swing = moving ? Math.sin(state.clock.elapsedTime * 11) * 0.72 : Math.sin(state.clock.elapsedTime * 1.8) * 0.035;
    if (leftArm.current) leftArm.current.rotation.x = swing;
    if (rightArm.current) rightArm.current.rotation.x = -swing;
    if (leftLeg.current) leftLeg.current.rotation.x = -swing;
    if (rightLeg.current) rightLeg.current.rotation.x = swing;
    player.current.position.y += moving ? Math.abs(Math.sin(state.clock.elapsedTime * 11)) * 0.055 : 0;
    cameraTarget.current.set(player.current.position.x + 8.5, player.current.position.y + 5.1, 10.8);
    state.camera.position.lerp(cameraTarget.current, 1 - Math.exp(-delta * 4.2));
    state.camera.lookAt(player.current.position.x + 2.2, player.current.position.y + 1.65, 0);
  });
  const skin = "#9b6546";
  const shirt = "#f2f0e5";
  const jeans = "#2d466c";
  return (
    <group ref={player} position={[-3, 0.5, 0]} rotation-y={0.12}>
      <Html position={[0, 3.45, 0]} center distanceFactor={9} className="mc3d-name-tag">namannn04</Html>
      <mesh position={[0, 2.72, 0]} castShadow><boxGeometry args={[0.82, 0.82, 0.82]} /><meshLambertMaterial color={skin} /></mesh>
      <mesh position={[0, 3.03, -0.17]} castShadow><boxGeometry args={[0.84, 0.25, 0.5]} /><meshLambertMaterial color="#231b19" /></mesh>
      <mesh position={[-0.2, 2.75, 0.416]}><boxGeometry args={[0.12, 0.08, 0.015]} /><meshBasicMaterial color="#f4f6ee" /></mesh>
      <mesh position={[0.2, 2.75, 0.416]}><boxGeometry args={[0.12, 0.08, 0.015]} /><meshBasicMaterial color="#f4f6ee" /></mesh>
      <mesh position={[0, 1.72, 0]} castShadow><boxGeometry args={[0.86, 1.25, 0.46]} /><meshLambertMaterial color={shirt} /></mesh>
      <mesh position={[0, 1.75, 0.236]}><boxGeometry args={[0.28, 0.22, 0.015]} /><meshBasicMaterial color="#377da2" /></mesh>
      <group ref={leftArm} position={[-0.64, 2.22, 0]}><mesh position={[0, -0.58, 0]} castShadow><boxGeometry args={[0.38, 1.2, 0.44]} /><meshLambertMaterial color={shirt} /></mesh><mesh position={[0, -1.03, 0]}><boxGeometry args={[0.39, 0.3, 0.45]} /><meshLambertMaterial color={skin} /></mesh></group>
      <group ref={rightArm} position={[0.64, 2.22, 0]}><mesh position={[0, -0.58, 0]} castShadow><boxGeometry args={[0.38, 1.2, 0.44]} /><meshLambertMaterial color={shirt} /></mesh><mesh position={[0, -1.03, 0]}><boxGeometry args={[0.39, 0.3, 0.45]} /><meshLambertMaterial color={skin} /></mesh></group>
      <group ref={leftLeg} position={[-0.23, 1.08, 0]}><mesh position={[0, -0.6, 0]} castShadow><boxGeometry args={[0.42, 1.22, 0.44]} /><meshLambertMaterial color={jeans} /></mesh><mesh position={[0, -1.16, 0.08]}><boxGeometry args={[0.43, 0.22, 0.62]} /><meshLambertMaterial color="#272523" /></mesh></group>
      <group ref={rightLeg} position={[0.23, 1.08, 0]}><mesh position={[0, -0.6, 0]} castShadow><boxGeometry args={[0.42, 1.22, 0.44]} /><meshLambertMaterial color={jeans} /></mesh><mesh position={[0, -1.16, 0.08]}><boxGeometry args={[0.43, 0.22, 0.62]} /><meshLambertMaterial color="#272523" /></mesh></group>
    </group>
  );
}

function VoxelWorld({ progress, onReady }: { progress: number; onReady: () => void }) {
  const materials = useBlockMaterials();
  const blocks = useMemo(() => {
    const grass: BlockPosition[] = [];
    const dirt: BlockPosition[] = [];
    const stone: BlockPosition[] = [];
    for (let x = -16; x <= 88; x += 1) {
      for (let z = -8; z <= 8; z += 1) {
        const height = terrainHeight(x, z);
        grass.push([x, height, z]);
        dirt.push([x, height - 1, z], [x, height - 2, z]);
        if ((x + z) % 3 === 0) stone.push([x, height - 3, z]);
      }
    }
    return { grass, dirt, stone };
  }, []);
  useEffect(() => onReady(), [onReady]);
  return (
    <>
      <color attach="background" args={["#83c9ec"]} />
      <fog attach="fog" args={["#a7d6ec", 18, 48]} />
      <hemisphereLight args={["#c8edff", "#5e513a", 1.8]} />
      <directionalLight castShadow position={[-12, 22, 14]} intensity={2.2} color="#fff4d2" shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-18} shadow-camera-right={18} shadow-camera-top={16} shadow-camera-bottom={-12} />
      <mesh position={[-8, 17, -24]}><boxGeometry args={[4, 4, 0.5]} /><meshBasicMaterial color="#fff0a1" /></mesh>
      <InstancedBlocks positions={blocks.grass} material={materials.grass} />
      <InstancedBlocks positions={blocks.dirt} material={materials.dirt} />
      <InstancedBlocks positions={blocks.stone} material={materials.stone} />
      <VoxelTree x={4} z={-4} /><VoxelTree x={9} z={4} /><VoxelTree x={20} z={-4} /><VoxelTree x={24} z={3} birch /><VoxelTree x={28} z={-1} /><VoxelTree x={34} z={5} birch /><VoxelTree x={42} z={-5} /><VoxelTree x={48} z={4} />
      <VillageHouse x={15} z={-3} rotation={0.06} /><VillageHouse x={39} z={-2} rotation={-0.04} /><VillageHouse x={51} z={3} rotation={Math.PI} />
      <NetherPortal x={71} />
      <MinecraftPlayer progress={progress} />
    </>
  );
}

function WorldLoadingScreen({ ready, onComplete }: { ready: boolean; onComplete: () => void }) {
  const { progress: assetProgress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const timeProgress = Math.min(100, ((now - started) / 1750) * 100);
      const combined = Math.min(100, Math.max(timeProgress, assetProgress));
      setDisplayProgress(combined);
      if (combined < 100 || !ready) frame = requestAnimationFrame(tick);
      else setTimeout(onComplete, 260);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [assetProgress, onComplete, ready]);
  const cells = useMemo(() => Array.from({ length: 121 }, (_, index) => {
    const x = index % 11;
    const y = Math.floor(index / 11);
    return { index, order: Math.hypot(x - 5, y - 5) + seededNoise(x, y, 88) * 1.7 };
  }).sort((a, b) => a.order - b.order), []);
  const filledIds = new Set(cells.slice(0, Math.floor((displayProgress / 100) * cells.length)).map((cell) => cell.index));
  return (
    <div className="mc-load-screen" role="status" aria-label={`Generating portfolio world ${Math.round(displayProgress)} percent`}>
      <div className="mc-load-vignette" />
      <div className="mc-load-content">
        <div className="mc-load-map" aria-hidden="true">{Array.from({ length: 121 }, (_, index) => <i key={index} className={filledIds.has(index) ? "is-generated" : ""} />)}</div>
        <p>Generating world</p><strong>{Math.round(displayProgress)}%</strong>
        <span>{displayProgress < 72 ? "Building terrain..." : "Preparing spawn area..."}</span>
      </div>
    </div>
  );
}

export default function MinecraftJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [worldReady, setWorldReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = rootRef.current;
      if (!root) return;
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, (window.scrollY - root.offsetTop) / travel));
      setProgress(next);
      if (next > 0.015) setShowHelp(false);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  const handleReady = useCallback(() => setWorldReady(true), []);
  const handleLoaded = useCallback(() => setLoaded(true), []);
  const biome = progress < 0.22 ? "Plains" : progress < 0.48 ? "Forest" : progress < 0.75 ? "Village" : "Ruined Portal";
  return (
    <main ref={rootRef} className="mc3d-root">
      {!loaded && <WorldLoadingScreen ready={worldReady} onComplete={handleLoaded} />}
      <div className="mc3d-viewport">
        <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }} camera={{ position: [7, 5.5, 11], fov: 52, near: 0.1, far: 100 }} onCreated={({ gl }) => { gl.shadowMap.enabled = true; gl.shadowMap.type = THREE.PCFShadowMap; gl.outputColorSpace = THREE.SRGBColorSpace; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05; }}>
          <VoxelWorld progress={progress} onReady={handleReady} />
        </Canvas>
        <header className="mc3d-topbar"><Link href="/" className="mc3d-logo">NAMAN&apos;S WORLD</Link><div className="mc3d-biome"><span>Biome</span><strong>{biome}</strong></div><Link href="/contact" className="mc3d-menu-button">Contact</Link></header>
        <section className={`mc3d-intro ${progress > 0.13 ? "is-hidden" : ""}`}><p>PLAYER PROFILE</p><h1>NAMAN<br />DADHICH</h1><div>Full Stack Developer · Open Source Contributor</div><nav><Link href="/projects">View builds</Link><Link href="/resume">Inventory / Resume</Link></nav></section>
        <section className={`mc3d-location-card ${progress > 0.18 && progress < 0.33 ? "is-visible" : ""}`}><small>PLAYER BASE</small><h2>About Naman</h2><p>I build scalable full-stack products, lead developer communities, and turn ambitious ideas into shipped experiences.</p><Link href="/resume">Open player journal →</Link></section>
        <section className={`mc3d-location-card ${progress > 0.45 && progress < 0.61 ? "is-visible" : ""}`}><small>VILLAGE WORKSHOP</small><h2>Crafting loadout</h2><p>Next.js · TypeScript · React · Node.js · PostgreSQL · AWS</p><Link href="/resume">Inspect inventory →</Link></section>
        <section className={`mc3d-location-card ${progress > 0.66 && progress < 0.82 ? "is-visible" : ""}`}><small>BUILD VILLAGE</small><h2>Featured projects</h2><p>CareerCompass and SPARK—platforms for career discovery, communities, events, and opportunities.</p><Link href="/projects">Enter project world →</Link></section>
        <section className={`mc3d-location-card mc3d-location-card--portal ${progress > 0.88 ? "is-visible" : ""}`}><small>RUINED PORTAL</small><h2>Next dimension</h2><p>Enter the Nether to explore the complete project world.</p><Link href="/projects">Enter portal →</Link></section>
        <div className="mc3d-hud" aria-hidden="true"><div className="mc3d-status"><span>♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥</span><span>🍖 🍖 🍖 🍖 🍖 🍖 🍖 🍖 🍖 🍖</span></div><div className="mc3d-xp"><i style={{ width: `${Math.max(6, progress * 100)}%` }} /></div><div className="mc3d-hotbar">{["⌂", "⚒", "◆", "✦", "✉", "", "", "", ""].map((item, index) => <i key={index} className={index === Math.min(4, Math.floor(progress * 5)) ? "is-selected" : ""}>{item}</i>)}</div></div>
        {showHelp && loaded && <div className="mc3d-scroll-help">SCROLL TO WALK <span>↓</span></div>}
        <div className="mc3d-progress"><span style={{ width: `${progress * 100}%` }} /></div>
      </div>
    </main>
  );
}

import Scene from "@/components/three/Scene";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Scene />
      <main className="relative z-10">
        <Hero />
        <About />
      </main>
    </>
  );
}

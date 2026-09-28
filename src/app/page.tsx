import Scene from "@/components/three/Scene";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Scene />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Work />
      </main>
    </>
  );
}

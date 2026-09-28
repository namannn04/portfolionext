import Scene from "@/components/three/Scene";
import SectionRail from "@/components/layout/SectionRail";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Events from "@/components/sections/Events";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Scene />
      <SectionRail />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Events />
        <Contact />
      </main>
    </>
  );
}

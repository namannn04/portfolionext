"use client";

import AboutUs from "@/components/AboutUs";
import HerobrineLoader from "@/components/common/HerobrineLoader";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import SkillsSection from "@/components/SkillsSection";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <HerobrineLoader onComplete={() => setIsLoading(false)} />}
      <HeroSection />
      <AboutUs />
      <SkillsSection />
      <Projects />
    </>
  );
}

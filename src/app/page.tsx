"use client";

import { useState } from "react";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/HeroSection";
import LoaderScreen from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import Projects from "@/components/Projects";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoaderScreen onComplete={() => setIsLoading(false)} />}
      <div className="bg-t-bg min-h-screen">
        <div className="sm:py-20">
          <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto">
            <Navbar />
          </div>
          <div className="mx-auto px-4 sm:px-0">
            <div
              className="sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6"
              style={{
                border: "none",
              }}
            >
              <div
                className="hidden sm:block"
                style={{
                  border: "3px solid var(--t-border)",
                  boxShadow:
                    "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)",
                  padding: "1.5rem",
                }}
              >
                  <HeroSection />
                  <AboutUs />
                  <SkillsSection />
                  <Projects />
                <Footer />
              </div>
              {/* Mobile: no outer border */}
              <div className="sm:hidden">
                  <HeroSection />
                  <AboutUs />
                  <SkillsSection />
                  <Projects />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

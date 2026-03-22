"use client";

import { useState } from "react";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/HeroSection";
import LoaderScreen from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import Projects from "@/components/Projects";
import SkillsSection from "@/components/SkillsSection";
import AchievementToast from "@/components/AchievementToast";
import { useAchievementOnView } from "@/hooks/useAchievementOnView";

// Section-specific achievements that trigger when each section scrolls into view
const SECTION_ACHIEVEMENTS = {
  hero: { id: "hero", title: "Getting Started!", desc: "Welcome to Naman's world" },
  about: { id: "about", title: "Player Info Loaded!", desc: "Now you know the player" },
  skills: { id: "skills", title: "Inventory Full!", desc: "So many tools in the chest" },
  projects: { id: "projects", title: "Master Builder!", desc: "Check out these builds" },
};

function AchievementSection({ achievement, children }: { achievement: { id: string; title: string; desc: string }; children: React.ReactNode }) {
  const ref = useAchievementOnView(achievement);
  return <div ref={ref}>{children}</div>;
}

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
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.hero}>
                  <HeroSection />
                </AchievementSection>
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.about}>
                  <AboutUs />
                </AchievementSection>
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.skills}>
                  <SkillsSection />
                </AchievementSection>
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.projects}>
                  <Projects />
                </AchievementSection>
                <Footer />
              </div>
              {/* Mobile: no outer border */}
              <div className="sm:hidden">
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.hero}>
                  <HeroSection />
                </AchievementSection>
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.about}>
                  <AboutUs />
                </AchievementSection>
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.skills}>
                  <SkillsSection />
                </AchievementSection>
                <AchievementSection achievement={SECTION_ACHIEVEMENTS.projects}>
                  <Projects />
                </AchievementSection>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Global achievement toast — renders once, bottom-right */}
      <AchievementToast />
    </>
  );
}

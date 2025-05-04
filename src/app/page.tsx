import AboutUs from "@/component/AboutUs";
import GitHubContribution from "@/component/GitHubContribution";
import HeroSection from "@/component/HeroSection";
import Navbar from "@/component/Navbar";
import Projects from "@/component/Projects";
import SkillsSection from "@/component/SkillsSection";

export default function Home() {
  return (
    <>
      <div className="bg-black min-h-screen">
        <div className="sm:py-20">
          <div className="sm:max-w-[50%] mx-auto">
            <Navbar />
          </div>
          <div className="mx-auto px-4 sm:px-0">
            <div className="sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-6">
              <HeroSection />
              <main className="sm:mt-20 py-10 px-2">
                <GitHubContribution />
              </main>
              <AboutUs />
              <SkillsSection />
              <Projects />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
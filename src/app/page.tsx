import AboutUs from "@/component/AboutUs";
// import Background from "@/components/Background";
import GitHubContribution from "@/component/GitHubContribution";
import HeroSection from "@/component/HeroSection";
import Navbar from "@/component/Navbar";
import Projects from "@/component/Projects";
import SkillsSection from "@/component/SkillsSection";

export default function Home() {
  return (
    <>
      {/* <Background /> */}
      <div className="bg-black">
        <div className="sm:py-20">
          <div className="sm:max-w-[50%] mx-auto">
            <Navbar />
          </div>
          {/* Box only visible on screens >= sm */}
          <div className="sm:block">
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
      {/* On mobile: nothing shown */}
    </>
  );
}

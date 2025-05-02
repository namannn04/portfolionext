import AboutSection from "@/component/AboutUs";
import Background from "@/component/Background";
import GitHubContribution from "@/component/GitHubContribution";
import HeroSection from "@/component/HeroSection";
import SkillsSection from "@/component/SkillsSection";

export default function Home() {
  return (
    <>
      {/* <Background /> */}
      <div className="bg-black">
        {/* Box only visible on screens >= sm */}
        <div className="sm:block pt-20">
          <div className="sm:max-w-[60%] mx-auto border border-teal-500 rounded-xl p-6">
            <HeroSection />
            <main className="mt-20 py-10 px-2">
              <GitHubContribution />
            </main>
            <AboutSection />
            <SkillsSection />
          </div>
        </div>
      </div>
      {/* On mobile: nothing shown */}
    </>
  );
}

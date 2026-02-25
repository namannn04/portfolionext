import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
// import GitHubContribution from "@/components/GitHubContribution";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <div className="bg-t-bg min-h-screen">
        <div className="sm:py-20">
          <div className="sm:max-w-[50%] mx-auto">
            <Navbar />
          </div>
          <div className="mx-auto px-4 sm:px-0">
            <div className="sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-6">
              <HeroSection />
              {/* <main className="sm:mt-20 py-10 px-2">
                <GitHubContribution />
              </main> */}
              <AboutUs />
              <SkillsSection />
              <Projects />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

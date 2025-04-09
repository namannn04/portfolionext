import Background from "@/component/Background";
import GitHubContribution from "@/component/GitHubContribution";
import HeroSection from "@/component/HeroSection";

export default function Home() {
  return (
    <>
      <Background /> {/* No need to wrap anything inside it now */}
      <HeroSection />
      <main className="container mx-auto mt-20 py-10 px-4">
        <GitHubContribution />
      </main>
    </>
  );
}

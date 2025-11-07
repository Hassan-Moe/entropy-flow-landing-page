import { DummyContent } from "@/components/dummy-content/DummyContent";
import HeroSection from "@/components/hero-section/HeroSection";

export default function Home() {
  return (
    <main className="flex main-container flex-col gap-10 py-10">
      <HeroSection />
      <DummyContent />
    </main>
  );
}

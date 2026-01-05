import Navbar from "@/components/layouts/Navbar";
import Hero from "@/components/Hero";
import FeatureMarquee from "@/components/layouts/MarqueeSection";
import PersonaSection from "@/components/PersonaSection";
export default function Page() {
  return (
    <div className="min-h-screen relative pt-16">
      <Navbar />
      <Hero />
      <FeatureMarquee />
      <PersonaSection />
    </div>
  );
}

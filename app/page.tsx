import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero";
import FeatureMarquee from "@/components/layouts/MarqueeSection";
import PersonaSection from "@/components/PersonaSection";
import Testimonials from "@/components/layouts/Testimonials";
import FaqSection from "@/components/layouts/FaqSection";
import Footer from "@/components/Footer/Footer";
import CtaSection from "@/components/layouts/cta";
import Pricing from "@/components/layouts/Pricing";
import ShowcaseHorizontal from "@/components/Showcase/ShowcaseSection";
import ScrollRevealSection from "@/components/RevealImage/ScrollRevealSection";

export default function Page() {
  return (
    <div className="min-h-screen relative flex flex-col items-center gap-16">
      <Navbar />
      <Hero />
      <FeatureMarquee />
      {/* <ShowcaseHorizontal /> */}
      <ScrollRevealSection />
      <PersonaSection />
      <FaqSection />
      <Testimonials />
      <Pricing />
      <CtaSection />
      <Footer />
    </div>
  );
}

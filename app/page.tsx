import Navbar from "@/components/layouts/Navbar";
import Hero from "@/components/Hero";
import FeatureMarquee from "@/components/layouts/MarqueeSection";
import PersonaSection from "@/components/PersonaSection";
import Testimonials from "@/components/layouts/Testimonials";
import FaqSection from "@/components/layouts/FaqSection";
import Footer from "@/components/Footer/Footer";
import CtaSection from "@/components/layouts/cta";
import Pricing from "@/components/layouts/Pricing";
export default function Page() {
  return (
    <div className="min-h-screen relative pt-16">
      <Navbar />
      <Hero />
      <FeatureMarquee />
      <PersonaSection />
      <FaqSection />
      <Testimonials />
      <Pricing />
      <CtaSection />
      <Footer />
    </div>
  );
}

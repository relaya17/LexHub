import HeroSection from "@/components/landing/hero-section";
import AboutSection from "@/components/landing/about-section";
import ServicesSection from "@/components/landing/services-section";
import ContactSection from "@/components/landing/contact-section";
import CTASection from "@/components/landing/cta-section";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  );
}

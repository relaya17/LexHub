import { cookies } from 'next/headers';
import type { Language } from '@/lib/translations';
import { translations } from '@/lib/translations';
import { HeroSection } from "@/components/landing/hero-section";
import AboutSection from "@/components/landing/about-section";
import ServicesSection from "@/components/landing/services-section";
import ContactSection from "@/components/landing/contact-section";
import Header from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  const cookieStore = cookies();
  const lang = (cookieStore.get('lang')?.value || 'he') as Language;
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection t={t} />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer t={t} />
    </main>
  );
}

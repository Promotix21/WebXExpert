import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { Services } from "@/components/sections/Services";
import { CapabilityShowcase } from "@/components/sections/CapabilityShowcase";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesMarquee />
        <Services />
        <CapabilityShowcase />
        <About />
        <Process />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

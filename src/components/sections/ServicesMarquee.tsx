"use client";

import { TextMarquee } from "@/components/animations/Marquee";

const services = [
  "Web Design",
  "Web Development",
  "CRM Systems",
  "Custom Software",
  "API Integrations",
  "E-commerce",
  "WordPress",
  "Shopify",
  "AI Integration",
  "Automation",
  "GSAP Animations",
  "WebGL Experiences",
];

export function ServicesMarquee() {
  return (
    <section className="mt-16 md:mt-24 py-8 md:py-12 border-y border-surface-300/50 bg-surface-050/50 overflow-hidden">
      <TextMarquee
        items={services}
        speed={40}
        direction="left"
        textClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-600 hover:text-white transition-colors duration-300"
        separator={
          <span className="text-brand-cyan-500 mx-3 sm:mx-4 md:mx-6 text-lg sm:text-xl md:text-2xl">
            ✦
          </span>
        }
      />
    </section>
  );
}

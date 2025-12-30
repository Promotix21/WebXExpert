"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    if (!orb1 || !orb2) return;

    // Floating animation for orbs
    gsap.to(orb1, {
      y: -30,
      x: 20,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(orb2, {
      y: 20,
      x: -30,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-surface-050 relative overflow-hidden"
    >
      {/* Gradient orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-brand-pink-500/20 blur-[150px] pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-700/20 blur-[150px] pointer-events-none"
      />

      <div className="container-narrow relative z-10 text-center">
        <Reveal>
          <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
            Let&apos;s Build Something
          </span>
        </Reveal>

        <SplitText
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8"
          highlightWords={["Extraordinary"]}
          highlightClassName="gradient-text"
        >
          Ready to Build Something Extraordinary?
        </SplitText>

        <Reveal delay={0.4}>
          <p className="text-base md:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Whether it&apos;s a stunning website, a powerful CRM, or a complete
            digital transformation—we&apos;re ready to bring your vision to life.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
              Start Your Project
            </button>
            <button className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
              Schedule a Call
            </button>
          </div>
        </Reveal>

        {/* Contact info */}
        <Reveal delay={0.8}>
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-surface-300/50">
            <p className="text-xs md:text-sm text-neutral-500 mb-4">
              Or reach out directly
            </p>
            <a
              href="mailto:hello@webxexpert.com"
              className="text-lg md:text-xl lg:text-2xl font-medium text-white hover:text-brand-pink-500 transition-colors"
            >
              hello@webxexpert.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useMousePosition";
import { ParticleField } from "@/components/animations/ParticleField";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  // Parallax effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const moveElements = container.querySelectorAll("[data-parallax]");

    moveElements.forEach((el) => {
      const speed = parseFloat((el as HTMLElement).dataset.parallax || "0.1");
      gsap.to(el, {
        x: mouse.normalizedX * 30 * speed,
        y: mouse.normalizedY * 30 * speed,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [mouse.normalizedX, mouse.normalizedY]);

  // Scroll indicator animation
  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;

    gsap.to(indicator, {
      y: 10,
      opacity: 0.5,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* WebGL Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Gradient Orbs */}
      <div
        data-parallax="0.3"
        className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-pink-500/20 rounded-full blur-[128px] pointer-events-none"
      />
      <div
        data-parallax="0.2"
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-purple-700/20 rounded-full blur-[128px] pointer-events-none"
      />
      <div
        data-parallax="0.4"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan-500/10 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 container-main text-center px-4 sm:px-6 pt-24 md:pt-0">
        {/* Overline */}
        <Reveal delay={0.2} distance={30}>
          <p className="text-sm md:text-base text-brand-pink-500 font-medium tracking-widest uppercase mb-4 md:mb-6">
            Premium Web Solutions
          </p>
        </Reveal>

        {/* Main Headline */}
        <div className="max-w-5xl mx-auto mb-6 md:mb-8">
          <SplitText
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
            animation="reveal"
            stagger={0.04}
            duration={1}
            ease="power4.out"
            highlightWords={["Digital", "Experiences", "Dominate"]}
            highlightClassName="gradient-text font-black"
          >
            We Build Digital Experiences That Dominate
          </SplitText>
        </div>

        {/* Subline */}
        <Reveal delay={0.8} className="max-w-2xl mx-auto mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed px-4">
            Award-worthy websites, powerful CRMs, and custom software
            engineered to elevate your brand and dominate your market.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={1} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
            Start Your Project
          </button>
          <button className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
            View Our Work
          </button>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={1.2} className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-surface-300/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <StatItem value="18+" label="Years Experience" />
            <StatItem value="50+" label="Projects Delivered" />
            <StatItem value="5+" label="CRMs Built" />
            <StatItem value="100%" label="Client Satisfaction" />
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-neutral-500 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-brand-pink-500" />
        </div>
      </div>
    </section>
  );
}

/**
 * Stat Item Component
 */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-neutral-500">{label}</div>
    </div>
  );
}

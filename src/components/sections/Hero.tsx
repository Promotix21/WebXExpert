"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { HeroScene } from "@/components/canvas/HeroScene";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Main entrance animation
  useEffect(() => {
    setIsLoaded(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Overline animation
      tl.fromTo(
        ".hero-overline",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // Main headline word-by-word reveal
      tl.fromTo(
        ".hero-word",
        { y: 100, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.4"
      );

      // Gradient words get extra shine effect
      tl.fromTo(
        ".hero-gradient-word",
        { backgroundPosition: "200% center" },
        {
          backgroundPosition: "0% center",
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Subline fade in
      tl.fromTo(
        ".hero-subline",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // CTA buttons
      tl.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // Stats counter animation
      tl.fromTo(
        ".hero-stat",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll indicator pulse animation
  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;

    const ctx = gsap.context(() => {
      gsap.to(".scroll-dot", {
        y: 12,
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(indicator, {
        opacity: 0.3,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    });

    return () => ctx.revert();
  }, []);

  // Counter animation for stats
  useEffect(() => {
    const counters = document.querySelectorAll(".counter-value");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      const suffix = counter.getAttribute("data-suffix") || "";

      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          delay: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            counter.textContent = Math.round(parseFloat(counter.textContent || "0")) + suffix;
          },
        }
      );
    });
  }, []);

  const words = ["We", "Build", "Digital", "Experiences", "That", "Dominate"];
  const highlightWords = ["Digital", "Experiences", "Dominate"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* WebGL Background */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 container-main text-center px-4 sm:px-6 pt-32 md:pt-24">
        {/* Overline */}
        <div className="hero-overline mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-pink-500 animate-pulse" />
            <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-300">
              Premium Web Solutions
            </span>
          </span>
        </div>

        {/* Main Headline */}
        <div
          ref={headlineRef}
          className="max-w-5xl mx-auto mb-6 md:mb-8 perspective-1000"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
            {words.map((word, index) => (
              <span
                key={index}
                className={cn(
                  "hero-word inline-block mr-[0.25em] last:mr-0",
                  highlightWords.includes(word) && "hero-gradient-word"
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {highlightWords.includes(word) ? (
                  <span
                    className="bg-gradient-to-r from-brand-pink-500 via-brand-purple-500 to-brand-cyan-500 bg-clip-text text-transparent font-black"
                    style={{
                      backgroundSize: "200% auto",
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Subline */}
        <div className="hero-subline max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed px-4">
            Award-worthy websites, powerful CRMs, and custom software
            engineered to elevate your brand and{" "}
            <span className="text-brand-cyan-400">dominate your market</span>.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-24">
          <a
            href="#contact"
            className="hero-cta group relative px-8 py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,128,0.4)] w-full sm:w-auto"
            data-cursor-text="Let's talk"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your Project
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </a>

          <a
            href="#work"
            className="hero-cta group px-8 py-4 text-base md:text-lg font-semibold text-white border border-white/20 rounded-full transition-all duration-300 hover:border-brand-cyan-500 hover:bg-brand-cyan-500/10 w-full sm:w-auto"
            data-cursor-text="Explore"
          >
            <span className="flex items-center justify-center gap-2">
              View Our Work
              <span className="w-2 h-2 rounded-full bg-brand-cyan-500" />
            </span>
          </a>
        </div>

        {/* Stats Row */}
        <div className="pt-8 md:pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto">
            <StatItem value={18} suffix="+" label="Years Experience" delay={0} />
            <StatItem value={50} suffix="+" label="Projects Delivered" delay={0.1} />
            <StatItem value={5} suffix="+" label="CRMs Built" delay={0.2} />
            <StatItem value={100} suffix="%" label="Client Satisfaction" delay={0.3} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-neutral-600 flex items-start justify-center pt-2 overflow-hidden">
          <div className="scroll-dot w-1 h-1.5 rounded-full bg-gradient-to-b from-brand-pink-500 to-brand-cyan-500" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[5]" />
    </section>
  );
}

/**
 * Stat Item Component with counter animation
 */
function StatItem({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <div className="hero-stat text-center" style={{ animationDelay: `${delay}s` }}>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
        <span
          className="counter-value bg-gradient-to-r from-brand-pink-500 to-brand-cyan-500 bg-clip-text text-transparent"
          data-target={value}
          data-suffix={suffix}
        >
          0{suffix}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-neutral-500">{label}</div>
    </div>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your vision, goals, and challenges. We dive deep into your business to craft the perfect solution.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    color: "pink",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Planning architecture, tech stack, and roadmap. Every decision is intentional and future-proof.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "cyan",
  },
  {
    number: "03",
    title: "Design",
    description: "Crafting the visual experience and interactions. Every pixel is placed with purpose.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2L9.586 9.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    color: "purple",
  },
  {
    number: "04",
    title: "Develop",
    description: "Building it bulletproof with clean, scalable code. Performance and quality are non-negotiable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="14" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    color: "cyan",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deployment, testing, and ongoing support. Your success is our success.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M4.5 16.5C3 15 3 12.5 3 11C3 7.5 5.5 4 10 4C14 4 17.5 6 19 8L13 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14.5 4C16 3 18.5 3 20 3C20.5 3 21 3.5 21 4C21 5.5 21 8 20 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M7 17L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    color: "pink",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track || !progress) return;

    const ctx = gsap.context(() => {
      // Get the width to scroll
      const getScrollWidth = () => track.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      const scrollTween = gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress line animation
      gsap.to(progress, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          scrub: 1,
        },
      });

      // Animate each step
      const steps = track.querySelectorAll(".process-step");
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: step,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          }
        );

        // Animate the step number
        const number = step.querySelector(".step-number");
        if (number) {
          gsap.fromTo(
            number,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              scrollTrigger: {
                trigger: step,
                containerAnimation: scrollTween,
                start: "left 70%",
                end: "left 40%",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink":
        return {
          bg: "bg-brand-pink-500/10",
          border: "border-brand-pink-500/30",
          text: "text-brand-pink-500",
          glow: "hover:shadow-[0_0_40px_rgba(255,0,128,0.2)]",
        };
      case "cyan":
        return {
          bg: "bg-brand-cyan-500/10",
          border: "border-brand-cyan-500/30",
          text: "text-brand-cyan-500",
          glow: "hover:shadow-[0_0_40px_rgba(0,212,255,0.2)]",
        };
      case "purple":
        return {
          bg: "bg-brand-purple-500/10",
          border: "border-brand-purple-500/30",
          text: "text-brand-purple-500",
          glow: "hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]",
        };
      default:
        return {
          bg: "bg-white/5",
          border: "border-white/10",
          text: "text-white",
          glow: "",
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-050 via-black to-black" />

      {/* Section Header - Fixed at top */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-8 md:pt-12">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-brand-cyan-500 font-medium tracking-widest uppercase mb-2 block">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                How We <span className="gradient-text-cyan">Build</span>
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-sm text-neutral-500">Scroll to explore</span>
              <div className="flex items-center gap-2 justify-end mt-2">
                <span className="text-xs text-neutral-600">01</span>
                <div className="w-24 h-1 bg-surface-300 rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-full w-0 bg-gradient-to-r from-brand-pink-500 via-brand-purple-500 to-brand-cyan-500 rounded-full"
                  />
                </div>
                <span className="text-xs text-neutral-600">05</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex items-center min-h-screen pt-32 pb-20">
        {/* Initial spacer */}
        <div className="shrink-0 w-[10vw]" />

        {/* Timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-300/30 to-transparent pointer-events-none" />

        {/* Steps */}
        {processSteps.map((step, index) => {
          const colors = getColorClasses(step.color);

          return (
            <div
              key={step.number}
              className="process-step shrink-0 w-[85vw] md:w-[60vw] lg:w-[40vw] px-4 md:px-8"
            >
              <div
                className={cn(
                  "relative p-8 md:p-10 rounded-3xl border backdrop-blur-sm transition-all duration-500 group",
                  colors.bg,
                  colors.border,
                  "hover:scale-[1.02]",
                  colors.glow
                )}
              >
                {/* Step number badge */}
                <div
                  className={cn(
                    "step-number absolute -top-6 -left-2 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold",
                    "bg-black border-2",
                    colors.border,
                    colors.text
                  )}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className={cn("mb-6", colors.text)}>{step.icon}</div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>

                {/* Connector dots */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", colors.bg)} />
                    <div className="w-1 h-1 rounded-full bg-surface-300/50" />
                    <div className="w-1 h-1 rounded-full bg-surface-300/30" />
                  </div>
                )}

                {/* Decorative corner accents */}
                <div className={cn("absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-30", colors.border)} />
                <div className={cn("absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg opacity-30", colors.border)} />
              </div>
            </div>
          );
        })}

        {/* End spacer */}
        <div className="shrink-0 w-[30vw]" />
      </div>
    </section>
  );
}

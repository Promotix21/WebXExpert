"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, goals, and target audience. Understanding your vision is the foundation of everything we build.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We architect the technical approach, define the user experience, and plan every feature. No surprises, just clarity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Design",
    description:
      "Award-worthy visuals and interactions take shape. Every pixel, every animation, every microinteraction crafted with intention.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" strokeLinecap="round" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Develop",
    description:
      "Clean, performant code brings designs to life. We build for scale, security, and speed. No shortcuts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8">
        <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Rigorous testing, deployment, and ongoing support. We don't disappear after launch—we're here for the long haul.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const ctx = gsap.context(() => {
      // Animate the progress line
      gsap.fromTo(
        timeline,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Animate each step
      stepsRef.current.forEach((step, i) => {
        if (!step) return;

        gsap.fromTo(
          step,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-surface-050 relative overflow-hidden"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <Reveal>
            <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
              Our Process
            </span>
          </Reveal>

          <SplitText
            as="h2"
            className="heading-section mb-6"
            highlightWords={["Chaos"]}
            highlightClassName="gradient-text"
          >
            From Chaos to Launch
          </SplitText>

          <Reveal delay={0.4}>
            <p className="body-large">
              A battle-tested process refined over 18 years. We turn complex
              ideas into polished products, on time and on budget.
            </p>
          </Reveal>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-0.5 bg-surface-300">
            <div
              ref={timelineRef}
              className="absolute inset-0 bg-gradient-to-r from-brand-pink-500 via-brand-purple-500 to-brand-cyan-500 origin-left"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
                className="relative"
              >
                {/* Mobile/Tablet connector line */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-brand-pink-500 to-transparent opacity-20" />
                )}

                {/* Step card */}
                <div
                  className={cn(
                    "relative bg-surface-100 rounded-2xl p-5 md:p-6 border border-surface-300/50",
                    "hover:border-brand-pink-500/50 transition-colors duration-300"
                  )}
                >
                  {/* Number badge */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-200 flex items-center justify-center mb-4 md:mb-6 text-brand-pink-500 font-bold text-sm md:text-base">
                    {step.number}
                  </div>

                  {/* Connector dot for desktop */}
                  <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-surface-050 border-2 border-brand-pink-500">
                    <div className="absolute inset-1 md:inset-1.5 rounded-full bg-brand-pink-500" />
                  </div>

                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="text-neutral-400">{step.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                  </div>

                  <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/animations/Reveal";
import { useCounter } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 18, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "CRMs Built" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const strengths = [
  {
    title: "Award-Worthy Design",
    description:
      "Every project is crafted with Awwwards-level attention to detail. Motion, interaction, and aesthetics working in harmony.",
  },
  {
    title: "Full-Stack Expertise",
    description:
      "From frontend animations to backend infrastructure. We handle the complete stack so you get a unified, polished product.",
  },
  {
    title: "18 Years of Craft",
    description:
      "Building since 2007. We've seen technologies come and go, and we know what works. Experience that translates to fewer mistakes.",
  },
  {
    title: "AI-Enhanced Workflow",
    description:
      "We leverage cutting-edge AI tools to accelerate development without sacrificing quality. Modern solutions, faster delivery.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-padding bg-surface-000 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-pink-500/5 to-transparent pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <Reveal>
              <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
                Why WebXExpert
              </span>
            </Reveal>

            <SplitText
              as="h2"
              className="heading-section mb-6"
              highlightWords={["Obsession"]}
              highlightClassName="gradient-text"
            >
              Crafted With Obsession
            </SplitText>

            <Reveal delay={0.4}>
              <p className="body-large mb-8">
                We don&apos;t just build websites. We architect digital experiences
                that make your competitors nervous. Every line of code, every
                animation, every interaction—engineered for impact.
              </p>
            </Reveal>

            {/* Strengths Grid */}
            <StaggerReveal
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              stagger={0.1}
            >
              {strengths.map((strength, i) => (
                <StaggerItem key={i}>
                  <div className="group">
                    <h4 className="text-base md:text-lg font-semibold mb-2 group-hover:text-brand-pink-500 transition-colors">
                      {strength.title}
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* Right: Stats */}
          <div className="relative">
            <Reveal delay={0.2}>
              <div className="bg-surface-100 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-surface-300/50 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,128,0.1) 10px, rgba(255,0,128,0.1) 11px)`,
                    }}
                  />
                </div>

                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold mb-8 md:mb-12">
                    The Numbers That Matter
                  </h3>

                  <div className="grid grid-cols-2 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                      <StatCounter key={i} {...stat} delay={i * 0.2} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Floating badge */}
            <Reveal delay={0.8}>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-brand-pink-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold shadow-glow-md">
                Since 2007
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stat Counter Component
 */
function StatCounter({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value,
      duration: 2,
      delay: delay + 0.5,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(counter.value).toString();
      },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  }, [value, delay]);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2">
        <span ref={counterRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-neutral-500">{label}</div>
    </div>
  );
}

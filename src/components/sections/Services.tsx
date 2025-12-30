"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/animations/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "design",
    number: "01",
    title: "Web Design",
    description:
      "Award-worthy designs with GSAP animations, WebGL experiences, and interactions that captivate. Every pixel crafted with purpose.",
    features: [
      "Motion Design & GSAP",
      "WebGL & Three.js",
      "Responsive & Mobile-First",
      "Conversion-Focused UX",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 4h16v12H4z" strokeLinejoin="round" />
        <path d="M8 20h8M12 16v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "development",
    number: "02",
    title: "Web Development",
    description:
      "Full-stack expertise in Next.js, NestJS, React, and beyond. We build scalable, performant applications that power your business.",
    features: [
      "Next.js & React",
      "Node.js & NestJS",
      "Headless CMS",
      "API Development",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 4l-4 16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "software",
    number: "03",
    title: "Custom Software",
    description:
      "CRMs, ERPs, dashboards, and internal tools built from scratch. If you can imagine it, we can build it.",
    features: [
      "CRM & ERP Systems",
      "Dashboard Development",
      "Workflow Automation",
      "Real-time Applications",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "integrations",
    number: "04",
    title: "Integrations",
    description:
      "Connect any system to anything. APIs, webhooks, automation workflows—if it exists, we can integrate it.",
    features: [
      "API Integrations",
      "N8N & Automation",
      "Payment Gateways",
      "Third-party Services",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-surface-000 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 -left-1/4 w-1/2 h-1/2 bg-brand-pink-500/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-brand-purple-700/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-20">
          <Reveal>
            <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
              What We Do
            </span>
          </Reveal>

          <SplitText
            as="h2"
            className="heading-section mb-6"
            highlightWords={["Extraordinary"]}
            highlightClassName="gradient-text"
          >
            Building Extraordinary Digital Products
          </SplitText>

          <Reveal delay={0.4}>
            <p className="body-large">
              From concept to deployment, we craft digital experiences that
              perform. Every project is an opportunity to push boundaries.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          stagger={0.15}
        >
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/**
 * Service Card Component
 */
interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

function ServiceCard({
  number,
  title,
  description,
  features,
  icon,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl",
        "bg-surface-100/80 border border-surface-300/50",
        "transition-all duration-500 ease-out-expo",
        "hover:border-brand-pink-500/50 hover:bg-surface-150/80",
        "hover:-translate-y-1 hover:shadow-glow-sm",
        "before:absolute before:inset-0 before:rounded-2xl md:before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,0,128,0.1),transparent_40%)]",
        "hover:before:opacity-100"
      )}
    >
      {/* Number */}
      <span className="absolute top-6 right-6 md:top-8 md:right-8 text-6xl md:text-7xl lg:text-8xl font-bold text-surface-200 group-hover:text-surface-250 transition-colors select-none">
        {number}
      </span>

      {/* Icon */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-surface-200 flex items-center justify-center mb-6 md:mb-8 text-neutral-400 group-hover:text-brand-pink-500 group-hover:bg-brand-pink-500/10 transition-all duration-300">
        {icon}
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-sm md:text-base text-neutral-400 mb-6 md:mb-8 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 md:space-y-3">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors"
            >
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-pink-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Arrow */}
        <div className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-200 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 md:w-5 md:h-5 text-brand-pink-500"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

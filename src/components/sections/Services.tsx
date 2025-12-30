"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

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
    features: ["Motion Design & GSAP", "WebGL & Three.js", "Responsive & Mobile-First", "Conversion-Focused UX"],
    color: "pink",
  },
  {
    id: "development",
    number: "02",
    title: "Web Development",
    description:
      "Full-stack expertise in Next.js, NestJS, React, and beyond. We build scalable, performant applications that power your business.",
    features: ["Next.js & React", "Node.js & NestJS", "Headless CMS", "API Development"],
    color: "cyan",
  },
  {
    id: "software",
    number: "03",
    title: "Custom Software",
    description:
      "CRMs, ERPs, dashboards, and internal tools built from scratch. If you can imagine it, we can build it.",
    features: ["CRM & ERP Systems", "Dashboard Development", "Workflow Automation", "Real-time Applications"],
    color: "purple",
  },
  {
    id: "integrations",
    number: "04",
    title: "Integrations",
    description:
      "Connect any system to anything. APIs, webhooks, automation workflows—if it exists, we can integrate it.",
    features: ["API Integrations", "N8N & Automation", "Payment Gateways", "Third-party Services"],
    color: "cyan",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".service-card");

    const ctx = gsap.context(() => {
      // Stacking cards effect
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;

        if (!isLast) {
          gsap.to(card, {
            scale: 0.9 - i * 0.02,
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 10%",
              end: "bottom 10%",
              scrub: 0.5,
            },
          });
        }

        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          end: isLast ? "top 10%" : "bottom -100%",
          pin: true,
          pinSpacing: isLast,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink":
        return {
          accent: "#FF0080",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          glow: "shadow-[0_0_60px_rgba(255,0,128,0.15)]",
        };
      case "cyan":
        return {
          accent: "#00D4FF",
          bg: "bg-brand-cyan-500",
          bgLight: "bg-brand-cyan-500/10",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          glow: "shadow-[0_0_60px_rgba(0,212,255,0.15)]",
        };
      case "purple":
        return {
          accent: "#7C3AED",
          bg: "bg-brand-purple-500",
          bgLight: "bg-brand-purple-500/10",
          text: "text-brand-purple-500",
          border: "border-brand-purple-500/30",
          glow: "shadow-[0_0_60px_rgba(124,58,237,0.15)]",
        };
      default:
        return {
          accent: "#FF0080",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          glow: "shadow-[0_0_60px_rgba(255,0,128,0.15)]",
        };
    }
  };

  return (
    <section ref={sectionRef} id="services" className="bg-black relative">
      {/* Section Header */}
      <div className="container-main pt-20 md:pt-32 pb-12">
        <div className="max-w-3xl">
          <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building{" "}
            <span className="bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 bg-clip-text text-transparent">
              Extraordinary
            </span>{" "}
            Digital Products
          </h2>
          <p className="text-lg text-neutral-400">
            From concept to deployment, we craft digital experiences that perform.
          </p>
        </div>
      </div>

      {/* Stacking Cards */}
      <div ref={cardsRef} className="relative">
        {services.map((service, index) => {
          const colors = getColorClasses(service.color);

          return (
            <div
              key={service.id}
              className="service-card min-h-screen flex items-center py-12 bg-black"
            >
              <div className="container-main">
                <div
                  className={cn(
                    "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                    "p-8 md:p-12 lg:p-16 rounded-3xl",
                    "bg-surface-100/50 backdrop-blur-sm border",
                    colors.border,
                    colors.glow
                  )}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <span className={cn("text-7xl md:text-8xl font-bold opacity-20", colors.text)}>
                      {service.number}
                    </span>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 -mt-4">{service.title}</h3>

                    <p className="text-lg text-neutral-400 mb-8 leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-neutral-300">
                          <span className={cn("w-2 h-2 rounded-full", colors.bg)} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={cn(
                        "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                        colors.bg,
                        "text-white hover:scale-105"
                      )}
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Animated Visual */}
                  <div className={cn("relative", index % 2 === 1 ? "lg:order-1" : "")}>
                    <ServiceAnimation type={service.id} color={colors.accent} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Service Animation Component - Animated representation of each service
 */
function ServiceAnimation({ type, color }: { type: string; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      switch (type) {
        case "design":
          // Wireframe building animation
          tl.fromTo(".wireframe-block",
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
          )
          .fromTo(".wireframe-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(".wireframe-cursor",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
            "-=0.2"
          )
          .to(".wireframe-cursor", {
            x: 50, y: 30, duration: 1.5, ease: "power1.inOut", repeat: -1, yoyo: true
          });
          break;

        case "development":
          // Code typing animation
          tl.fromTo(".code-line",
            { width: 0, opacity: 0 },
            { width: "100%", opacity: 1, duration: 0.5, stagger: 0.15, ease: "none" }
          )
          .fromTo(".cursor-blink",
            { opacity: 0 },
            { opacity: 1, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" },
            "-=0.5"
          );
          break;

        case "software":
          // Dashboard assembling animation
          tl.fromTo(".dash-sidebar",
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          )
          .fromTo(".dash-card",
            { y: -20, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.3"
          )
          .fromTo(".dash-bar",
            { scaleY: 0 },
            { scaleY: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
            "-=0.2"
          )
          .fromTo(".dash-table-row",
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" },
            "-=0.3"
          );
          break;

        case "integrations":
          // Nodes connecting animation
          tl.fromTo(".int-center",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          )
          .fromTo(".int-node",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.2"
          )
          .fromTo(".int-line",
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.5"
          )
          .fromTo(".int-pulse",
            { scale: 1, opacity: 0.5 },
            { scale: 1.5, opacity: 0, duration: 1, repeat: -1, ease: "power1.out" },
            "-=0.3"
          );
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [type]);

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-lg mx-auto">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />

      {/* Animation container */}
      <div className="relative w-full h-full bg-surface-100/30 rounded-3xl border border-surface-300/30 overflow-hidden p-8">
        {type === "design" && <WireframeAnimation color={color} />}
        {type === "development" && <CodeAnimation color={color} />}
        {type === "software" && <DashboardAnimation color={color} />}
        {type === "integrations" && <IntegrationAnimation color={color} />}
      </div>
    </div>
  );
}

// Wireframe Building Animation
function WireframeAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full relative">
      {/* Browser frame */}
      <div className="absolute inset-4 border-2 rounded-xl" style={{ borderColor: color, opacity: 0.3 }}>
        {/* Browser header */}
        <div className="h-8 border-b flex items-center gap-2 px-3" style={{ borderColor: color, opacity: 0.3 }}>
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
          <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.6 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.3 }} />
        </div>

        {/* Content blocks */}
        <div className="p-4 space-y-3">
          {/* Header block */}
          <div className="wireframe-block h-12 rounded-lg origin-top" style={{ background: color, opacity: 0.4 }} />

          {/* Nav lines */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="wireframe-line h-2 flex-1 rounded origin-left" style={{ background: color, opacity: 0.3 }} />
            ))}
          </div>

          {/* Hero block */}
          <div className="wireframe-block h-24 rounded-lg origin-top" style={{ background: color, opacity: 0.2 }} />

          {/* Content grid */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="wireframe-block h-16 rounded-lg origin-top" style={{ background: color, opacity: 0.25 }} />
            ))}
          </div>

          {/* Text lines */}
          <div className="space-y-2">
            <div className="wireframe-line h-2 w-full rounded origin-left" style={{ background: color, opacity: 0.2 }} />
            <div className="wireframe-line h-2 w-3/4 rounded origin-left" style={{ background: color, opacity: 0.2 }} />
            <div className="wireframe-line h-2 w-1/2 rounded origin-left" style={{ background: color, opacity: 0.2 }} />
          </div>
        </div>
      </div>

      {/* Cursor */}
      <div className="wireframe-cursor absolute top-1/2 left-1/2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
          <path d="M4 4l16 6-6 2-2 6-8-14z" />
        </svg>
      </div>
    </div>
  );
}

// Code Typing Animation
function CodeAnimation({ color }: { color: string }) {
  const codeLines = [
    { indent: 0, keyword: "function", text: " buildAwesome() {", kwColor: "#FF0080" },
    { indent: 1, keyword: "const", text: " design = ", value: "'pixel-perfect'", kwColor: "#00D4FF" },
    { indent: 1, keyword: "const", text: " code = ", value: "'clean'", kwColor: "#00D4FF" },
    { indent: 1, keyword: "const", text: " result = ", value: "'extraordinary'", kwColor: "#00D4FF" },
    { indent: 1, keyword: "", text: "" },
    { indent: 1, keyword: "return", text: " magic(design, code)", kwColor: "#7C3AED" },
    { indent: 0, keyword: "}", text: "", kwColor: "#FF0080" },
  ];

  return (
    <div className="w-full h-full font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-surface-300/30">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-neutral-500">index.tsx</span>
      </div>

      {/* Code lines */}
      <div className="space-y-1.5">
        {codeLines.map((line, i) => (
          <div key={i} className="flex items-center" style={{ paddingLeft: `${line.indent * 20}px` }}>
            <span className="text-neutral-600 w-6 text-right mr-4 select-none">{i + 1}</span>
            <div className="code-line overflow-hidden whitespace-nowrap">
              {line.keyword && <span style={{ color: line.kwColor }}>{line.keyword}</span>}
              <span className="text-neutral-300">{line.text}</span>
              {line.value && <span style={{ color: "#98C379" }}>{line.value}</span>}
            </div>
          </div>
        ))}
        {/* Blinking cursor */}
        <div className="flex items-center" style={{ paddingLeft: "20px" }}>
          <span className="text-neutral-600 w-6 text-right mr-4 select-none">8</span>
          <span className="cursor-blink w-2 h-5" style={{ background: color }} />
        </div>
      </div>
    </div>
  );
}

// Dashboard Assembling Animation
function DashboardAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex gap-3">
      {/* Sidebar */}
      <div className="dash-sidebar w-12 rounded-xl flex flex-col items-center py-4 gap-3" style={{ background: color, opacity: 0.2 }}>
        <div className="w-6 h-6 rounded-lg" style={{ background: color, opacity: 0.6 }} />
        <div className="w-6 h-1 rounded" style={{ background: color, opacity: 0.4 }} />
        <div className="w-6 h-1 rounded" style={{ background: color, opacity: 0.4 }} />
        <div className="w-6 h-1 rounded" style={{ background: color, opacity: 0.4 }} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Stat cards */}
        <div className="flex gap-3">
          {[0.8, 0.6, 0.7].map((opacity, i) => (
            <div key={i} className="dash-card flex-1 h-16 rounded-xl p-3" style={{ background: color, opacity: opacity * 0.3 }}>
              <div className="w-8 h-2 rounded mb-2" style={{ background: color, opacity: 0.5 }} />
              <div className="w-12 h-4 rounded" style={{ background: color, opacity: 0.7 }} />
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 rounded-xl p-4" style={{ background: color, opacity: 0.1 }}>
          <div className="w-16 h-2 rounded mb-4" style={{ background: color, opacity: 0.3 }} />
          <div className="flex items-end justify-between h-24 gap-2">
            {[60, 80, 45, 90, 70, 85, 55].map((height, i) => (
              <div
                key={i}
                className="dash-bar flex-1 rounded-t origin-bottom"
                style={{ height: `${height}%`, background: color, opacity: 0.6 }}
              />
            ))}
          </div>
        </div>

        {/* Table rows */}
        <div className="rounded-xl p-3 space-y-2" style={{ background: color, opacity: 0.1 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="dash-table-row h-6 rounded flex gap-2">
              <div className="w-6 h-full rounded" style={{ background: color, opacity: 0.3 }} />
              <div className="flex-1 h-full rounded" style={{ background: color, opacity: 0.2 }} />
              <div className="w-16 h-full rounded" style={{ background: color, opacity: 0.25 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Integration Nodes Animation
function IntegrationAnimation({ color }: { color: string }) {
  const nodes = [
    { x: 50, y: 15, label: "API" },
    { x: 85, y: 35, label: "CRM" },
    { x: 85, y: 65, label: "ERP" },
    { x: 50, y: 85, label: "DB" },
    { x: 15, y: 65, label: "AI" },
    { x: 15, y: 35, label: "Web" },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <filter id="glow-int" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {nodes.map((node, i) => (
        <line
          key={`line-${i}`}
          className="int-line"
          x1="50"
          y1="50"
          x2={node.x}
          y2={node.y}
          stroke={color}
          strokeWidth="1"
          strokeDasharray="100"
          opacity="0.5"
        />
      ))}

      {/* Center node pulse */}
      <circle className="int-pulse" cx="50" cy="50" r="15" fill={color} opacity="0.3" />

      {/* Center node */}
      <g className="int-center">
        <circle cx="50" cy="50" r="15" fill={color} opacity="0.3" filter="url(#glow-int)" />
        <circle cx="50" cy="50" r="10" fill="#0A0A0A" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="4" fill={color} />
        <text x="50" y="54" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">HUB</text>
      </g>

      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`} className="int-node">
          <circle cx={node.x} cy={node.y} r="10" fill={color} opacity="0.2" filter="url(#glow-int)" />
          <circle cx={node.x} cy={node.y} r="7" fill="#0A0A0A" stroke={color} strokeWidth="1.5" />
          <circle cx={node.x} cy={node.y} r="2" fill={color} />
          <text x={node.x} y={node.y + 16} textAnchor="middle" fill="white" fontSize="5" opacity="0.7">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
    color: "cyan",
    href: "/services/web-design",
  },
  {
    id: "development",
    number: "02",
    title: "Web Development",
    description:
      "Full-stack expertise in Next.js, NestJS, React, and beyond. We build scalable, performant applications that power your business.",
    features: ["Next.js & React", "Node.js & NestJS", "Headless CMS", "API Development"],
    color: "purple",
    href: "/services/web-development",
  },
  {
    id: "software",
    number: "03",
    title: "Custom Software",
    description:
      "CRMs, ERPs, dashboards, and internal tools built from scratch. If you can imagine it, we can build it.",
    features: ["CRM & ERP Systems", "Dashboard Development", "Workflow Automation", "Real-time Applications"],
    color: "cyan",
    href: "/services/custom-software",
  },
  {
    id: "integrations",
    number: "04",
    title: "Integrations",
    description:
      "Connect any system to anything. APIs, webhooks, automation workflows—if it exists, we can integrate it.",
    features: ["API Integrations", "N8N & Automation", "Payment Gateways", "Third-party Services"],
    color: "purple",
    href: "/services/integrations",
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
          accent: "#00D4FF",
          bg: "bg-brand-cyan-500",
          bgLight: "bg-brand-cyan-500/10",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          glow: "shadow-[0_0_60px_rgba(0,212,255,0.15)]",
        };
    }
  };

  return (
    <section ref={sectionRef} id="services" className="bg-black relative">
      {/* Section Header */}
      <div className="container-main pt-20 md:pt-32 pb-12">
        <div className="max-w-3xl">
          <span className="text-sm text-brand-cyan-500 font-medium tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building{" "}
            <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
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

                    <Link
                      href={service.href}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300",
                        colors.bg,
                        "text-white hover:scale-105 hover:shadow-lg"
                      )}
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
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
 * Service Animation Component - UNIQUE animated visuals for each service
 */
function ServiceAnimation({ type, color }: { type: string; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Entry animation timeline
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous animation timeline (loops forever)
      const loopTl = gsap.timeline({ repeat: -1, delay: 0.5 });

      switch (type) {
        case "design":
          // Entry: Build the canvas
          entryTl.fromTo(".canvas-layer", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" })
            .fromTo(".design-element", { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, "-=0.3");

          // Loop: Cursor moves, elements resize, colors shift
          loopTl.to(".design-cursor", { x: 80, y: 40, duration: 1.5, ease: "power2.inOut" })
            .to(".design-box-1", { width: "70%", duration: 0.8, ease: "power2.inOut" }, "-=1")
            .to(".design-cursor", { x: 20, y: 100, duration: 1.2, ease: "power2.inOut" })
            .to(".design-box-2", { height: 60, duration: 0.6, ease: "power2.inOut" }, "-=0.8")
            .to(".design-cursor", { x: 120, y: 60, duration: 1, ease: "power2.inOut" })
            .to(".color-swatch", { scale: 1.2, duration: 0.3, stagger: 0.1, ease: "power2.out" })
            .to(".color-swatch", { scale: 1, duration: 0.3, stagger: 0.1, ease: "power2.in" })
            .to(".design-cursor", { x: 0, y: 0, duration: 1.5, ease: "power2.inOut" });
          break;

        case "development":
          // Entry: Terminal opens, code types in
          entryTl.fromTo(".dev-terminal", { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out" })
            .fromTo(".code-line", { width: 0, opacity: 0 }, { width: "100%", opacity: 1, duration: 0.4, stagger: 0.15 }, "-=0.2");

          // Loop: New code lines type, cursor blinks, output updates
          loopTl.to(".cursor-line", { opacity: 0, duration: 0.4, repeat: 5, yoyo: true })
            .to(".output-value", { textContent: "++", duration: 0.01 })
            .fromTo(".new-line", { width: 0, opacity: 0 }, { width: "100%", opacity: 1, duration: 0.6 })
            .to(".build-progress", { width: "100%", duration: 1.5, ease: "power1.inOut" })
            .to(".build-status", { color: "#4ADE80", duration: 0.2 })
            .set(".build-status", { textContent: "Success!" })
            .to({}, { duration: 1 })
            .to(".build-progress", { width: "0%", duration: 0.01 })
            .set(".build-status", { textContent: "Building...", color: color })
            .to(".new-line", { width: 0, opacity: 0, duration: 0.01 });
          break;

        case "software":
          // Entry: Dashboard assembles
          entryTl.fromTo(".dash-frame", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 })
            .fromTo(".metric-card", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }, "-=0.2")
            .fromTo(".chart-bar", { scaleY: 0 }, { scaleY: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" }, "-=0.3");

          // Loop: Metrics update, charts animate, notifications pop
          loopTl.to(".metric-value-1", { textContent: 2847, duration: 1, snap: { textContent: 1 } })
            .to(".metric-value-2", { textContent: 94, duration: 0.8, snap: { textContent: 1 } }, "-=0.5")
            .to(".chart-bar", { scaleY: () => 0.5 + Math.random() * 0.5, stagger: 0.08, duration: 0.5, ease: "power2.inOut" })
            .fromTo(".notification-dot", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" })
            .to(".notification-dot", { scale: 0, duration: 0.3, delay: 0.5 })
            .to(".chart-bar", { scaleY: () => 0.4 + Math.random() * 0.6, stagger: 0.08, duration: 0.5, ease: "power2.inOut" })
            .to(".metric-value-1", { textContent: 2912, duration: 0.8, snap: { textContent: 1 } })
            .to(".table-row", { x: -5, duration: 0.2, stagger: 0.1 })
            .to(".table-row", { x: 0, duration: 0.2, stagger: 0.1 });
          break;

        case "integrations":
          // Entry: Central API connects to services
          entryTl.fromTo(".api-core", { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2)" })
            .fromTo(".service-node", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: "back.out(1.5)" }, "-=0.2")
            .fromTo(".data-path", { strokeDashoffset: 100 }, { strokeDashoffset: 0, stagger: 0.1, duration: 0.5 }, "-=0.3");

          // Loop: Data packets flow between services continuously
          loopTl.to(".packet-1", { motionPath: { path: "#path-1", align: "#path-1", alignOrigin: [0.5, 0.5] }, duration: 1, ease: "power1.inOut" })
            .to(".packet-2", { motionPath: { path: "#path-2", align: "#path-2", alignOrigin: [0.5, 0.5] }, duration: 1.2, ease: "power1.inOut" }, "-=0.8")
            .to(".packet-3", { motionPath: { path: "#path-3", align: "#path-3", alignOrigin: [0.5, 0.5] }, duration: 0.9, ease: "power1.inOut" }, "-=0.6")
            .fromTo(".sync-indicator", { opacity: 0.3 }, { opacity: 1, duration: 0.3, stagger: 0.1 })
            .to(".sync-indicator", { opacity: 0.3, duration: 0.3, stagger: 0.1, delay: 0.5 })
            .to(".packet-1", { opacity: 0, duration: 0.01 })
            .to(".packet-2", { opacity: 0, duration: 0.01 })
            .to(".packet-3", { opacity: 0, duration: 0.01 })
            .set(".packet-1", { clearProps: "all" })
            .set(".packet-2", { clearProps: "all" })
            .set(".packet-3", { clearProps: "all" });
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [type, color]);

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-lg mx-auto">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />

      {/* Animation container */}
      <div className="relative w-full h-full bg-surface-100/30 rounded-3xl border border-surface-300/30 overflow-hidden p-6">
        {type === "design" && <DesignCanvasAnimation color={color} />}
        {type === "development" && <DevelopmentAnimation color={color} />}
        {type === "software" && <SoftwareDashboardAnimation color={color} />}
        {type === "integrations" && <IntegrationFlowAnimation color={color} />}
      </div>
    </div>
  );
}

// 1. Design Canvas - Interactive design tool
function DesignCanvasAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full relative">
      {/* Toolbar */}
      <div className="canvas-layer absolute top-0 left-0 right-0 h-10 bg-surface-200/50 rounded-t-xl flex items-center gap-2 px-3">
        <div className="w-4 h-4 rounded" style={{ background: color }} />
        <div className="w-4 h-4 rounded border-2" style={{ borderColor: color }} />
        <div className="w-4 h-4 rounded-full" style={{ background: color, opacity: 0.5 }} />
        <div className="ml-auto flex gap-1">
          <div className="color-swatch w-4 h-4 rounded-full bg-red-500" />
          <div className="color-swatch w-4 h-4 rounded-full bg-yellow-500" />
          <div className="color-swatch w-4 h-4 rounded-full bg-green-500" />
          <div className="color-swatch w-4 h-4 rounded-full" style={{ background: color }} />
        </div>
      </div>

      {/* Canvas Area */}
      <div className="canvas-layer absolute top-12 left-2 right-2 bottom-2 bg-surface-300/20 rounded-xl p-4">
        {/* Design elements */}
        <div className="design-element design-box-1 h-8 rounded-lg mb-3" style={{ background: color, width: "50%", opacity: 0.7 }} />
        <div className="design-element design-box-2 w-full rounded-lg mb-3" style={{ background: color, opacity: 0.3, height: 40 }} />
        <div className="design-element flex gap-2 mb-3">
          <div className="w-12 h-12 rounded-lg" style={{ background: color, opacity: 0.5 }} />
          <div className="flex-1 space-y-2">
            <div className="h-2 rounded" style={{ background: color, opacity: 0.4, width: "80%" }} />
            <div className="h-2 rounded" style={{ background: color, opacity: 0.3, width: "60%" }} />
          </div>
        </div>
        <div className="design-element grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg" style={{ background: color, opacity: 0.2 + i * 0.1 }} />
          ))}
        </div>
      </div>

      {/* Cursor */}
      <div className="design-cursor absolute top-20 left-10 pointer-events-none z-10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
          <path d="M4 4l16 6-6 2-2 6-8-14z" />
        </svg>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ background: color }} />
      </div>
    </div>
  );
}

// 2. Development - Code editor with live output
function DevelopmentAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col font-mono text-xs">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-surface-300/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-neutral-500">terminal</span>
      </div>

      {/* Code area */}
      <div className="dev-terminal flex-1 space-y-1.5 origin-top">
        <div className="code-line flex">
          <span style={{ color }}>$</span>
          <span className="ml-2 text-neutral-300">npm run build</span>
        </div>
        <div className="code-line flex">
          <span className="text-neutral-500">→</span>
          <span className="ml-2 text-neutral-400">Compiling TypeScript...</span>
        </div>
        <div className="code-line flex">
          <span className="text-green-400">✓</span>
          <span className="ml-2 text-neutral-300">Components compiled <span className="output-value">(24)</span></span>
        </div>
        <div className="new-line flex overflow-hidden" style={{ width: 0, opacity: 0 }}>
          <span className="text-green-400">✓</span>
          <span className="ml-2 text-neutral-300">Bundle optimized</span>
        </div>
        <div className="flex mt-2">
          <span style={{ color }}>$</span>
          <span className="cursor-line ml-1 w-2 h-4" style={{ background: color }} />
        </div>
      </div>

      {/* Build status bar */}
      <div className="mt-3 pt-3 border-t border-surface-300/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-neutral-500">Build Status</span>
          <span className="build-status text-xs" style={{ color }}>Building...</span>
        </div>
        <div className="h-1.5 bg-surface-300/30 rounded-full overflow-hidden">
          <div className="build-progress h-full rounded-full" style={{ background: color, width: "0%" }} />
        </div>
      </div>
    </div>
  );
}

// 3. Software Dashboard - Live metrics
function SoftwareDashboardAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="dash-frame flex-1 flex flex-col gap-3">
        {/* Metrics row */}
        <div className="flex gap-3">
          <div className="metric-card flex-1 bg-surface-200/50 rounded-xl p-3 relative">
            <div className="notification-dot absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: color, transform: "scale(0)" }} />
            <span className="text-[10px] text-neutral-500 uppercase">Users</span>
            <div className="metric-value-1 text-2xl font-bold mt-1" style={{ color }}>2583</div>
          </div>
          <div className="metric-card flex-1 bg-surface-200/50 rounded-xl p-3">
            <span className="text-[10px] text-neutral-500 uppercase">Conv %</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value-2 text-2xl font-bold" style={{ color }}>87</span>
              <span className="text-xs text-neutral-500">%</span>
            </div>
          </div>
          <div className="metric-card flex-1 bg-surface-200/50 rounded-xl p-3">
            <span className="text-[10px] text-neutral-500 uppercase">Revenue</span>
            <div className="text-2xl font-bold mt-1" style={{ color }}>$48K</div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 bg-surface-200/50 rounded-xl p-3">
          <div className="text-[10px] text-neutral-500 uppercase mb-2">Weekly Activity</div>
          <div className="flex items-end justify-between h-20 gap-1.5">
            {[0.6, 0.8, 0.5, 0.9, 0.7, 0.85, 0.65].map((h, i) => (
              <div
                key={i}
                className="chart-bar flex-1 rounded-t origin-bottom"
                style={{ height: `${h * 100}%`, background: color, opacity: 0.5 + (i % 2) * 0.3 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[8px] text-neutral-600">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-200/50 rounded-xl p-3 space-y-2">
          {["Lead: John Doe", "Deal: Acme Corp", "Task: Follow up"].map((row, i) => (
            <div key={i} className="table-row flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.5 + i * 0.2 }} />
              <span className="text-neutral-300">{row}</span>
              <span className="ml-auto text-neutral-500 text-[10px]">2m ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. Integration Flow - API connecting services with data flow
function IntegrationFlowAnimation({ color }: { color: string }) {
  const services = [
    { id: "stripe", name: "Stripe", x: 15, y: 20 },
    { id: "slack", name: "Slack", x: 85, y: 20 },
    { id: "hubspot", name: "HubSpot", x: 15, y: 80 },
    { id: "sheets", name: "Sheets", x: 85, y: 80 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <filter id="glow-svc" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Data flow paths */}
        <path id="path-1" d="M50,50 Q30,35 15,20" fill="none" />
        <path id="path-2" d="M50,50 Q70,35 85,20" fill="none" />
        <path id="path-3" d="M50,50 Q30,65 15,80" fill="none" />
        <path id="path-4" d="M50,50 Q70,65 85,80" fill="none" />
      </defs>

      {/* Connection lines */}
      {services.map((svc, i) => (
        <path
          key={`line-${i}`}
          className="data-path"
          d={`M50,50 Q${50 + (svc.x - 50) * 0.5},${50 + (svc.y - 50) * 0.3} ${svc.x},${svc.y}`}
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="100"
          fill="none"
          opacity="0.4"
        />
      ))}

      {/* Central API hub */}
      <g className="api-core">
        <circle cx="50" cy="50" r="12" fill={color} opacity="0.2" filter="url(#glow-svc)" />
        <circle cx="50" cy="50" r="8" fill="#0A0A0A" stroke={color} strokeWidth="1.5" />
        <text x="50" y="52" textAnchor="middle" fill={color} fontSize="4" fontWeight="bold">API</text>
        {/* Rotating ring */}
        <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="0.3" strokeDasharray="4 4" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Service nodes */}
      {services.map((svc, i) => (
        <g key={svc.id} className="service-node">
          <rect x={svc.x - 10} y={svc.y - 6} width="20" height="12" rx="3" fill="#0A0A0A" stroke={color} strokeWidth="1" />
          <text x={svc.x} y={svc.y + 2} textAnchor="middle" fill={color} fontSize="3.5">{svc.name}</text>
          <circle className="sync-indicator" cx={svc.x + 8} cy={svc.y - 4} r="1.5" fill="#4ADE80" opacity="0.3" />
        </g>
      ))}

      {/* Data packets that flow */}
      <circle className="packet-1" cx="50" cy="50" r="2" fill={color} opacity="0.9" />
      <circle className="packet-2" cx="50" cy="50" r="2" fill="#4ADE80" opacity="0.9" />
      <circle className="packet-3" cx="50" cy="50" r="2" fill="#FBBF24" opacity="0.9" />

      {/* Animated data streams */}
      <g opacity="0.6">
        <circle r="1" fill={color}>
          <animateMotion dur="2s" repeatCount="indefinite" path="M50,50 Q30,35 15,20" />
        </circle>
        <circle r="1" fill={color}>
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M50,50 Q70,35 85,20" begin="0.5s" />
        </circle>
        <circle r="1" fill={color}>
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M50,50 Q30,65 15,80" begin="1s" />
        </circle>
        <circle r="1" fill={color}>
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M50,50 Q70,65 85,80" begin="0.3s" />
        </circle>
      </g>
    </svg>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// Capability categories with flow data
const capabilities = [
  {
    id: "real-estate-crm",
    title: "Real Estate CRM",
    subtitle: "Complete Property Management",
    description:
      "End-to-end CRM with lead capture, EMI calculations, WhatsApp automation, and Facebook Ads integration.",
    color: "pink",
    nodes: [
      { id: "fb", label: "FB Ads", x: 10, y: 20 },
      { id: "landing", label: "Landing", x: 30, y: 20 },
      { id: "lead", label: "Lead", x: 50, y: 20 },
      { id: "wa", label: "WhatsApp", x: 70, y: 20 },
      { id: "deal", label: "Deal", x: 90, y: 20 },
    ],
    connections: [
      { from: "fb", to: "landing" },
      { from: "landing", to: "lead" },
      { from: "lead", to: "wa" },
      { from: "wa", to: "deal" },
    ],
    stats: ["10K+ Leads", "85% Conversion", "24/7"],
  },
  {
    id: "marketing-crm",
    title: "Marketing CRM",
    subtitle: "Multi-Channel Campaign Hub",
    description:
      "Unified platform for lead management, campaign automation, analytics, and team collaboration.",
    color: "cyan",
    nodes: [
      { id: "web", label: "Website", x: 10, y: 15 },
      { id: "social", label: "Social", x: 10, y: 35 },
      { id: "hub", label: "Hub", x: 40, y: 25 },
      { id: "analytics", label: "Analytics", x: 70, y: 25 },
      { id: "roi", label: "ROI", x: 90, y: 25 },
    ],
    connections: [
      { from: "web", to: "hub" },
      { from: "social", to: "hub" },
      { from: "hub", to: "analytics" },
      { from: "analytics", to: "roi" },
    ],
    stats: ["50+ Integrations", "Real-time", "AI-Powered"],
  },
  {
    id: "seo-software",
    title: "SEO Automation",
    subtitle: "Autonomous Optimization Engine",
    description:
      "Automated crawling, analysis, optimization execution, and performance tracking.",
    color: "purple",
    nodes: [
      { id: "crawl", label: "Crawl", x: 10, y: 25 },
      { id: "analyze", label: "Analyze", x: 35, y: 25 },
      { id: "optimize", label: "Optimize", x: 60, y: 25 },
      { id: "track", label: "Track", x: 85, y: 25 },
    ],
    connections: [
      { from: "crawl", to: "analyze" },
      { from: "analyze", to: "optimize" },
      { from: "optimize", to: "track" },
    ],
    stats: ["500+ Sites", "3x Growth", "Auto-Updates"],
  },
  {
    id: "chatbot",
    title: "AI Chatbots",
    subtitle: "Multi-Platform Conversations",
    description:
      "Intelligent chatbots across WhatsApp, Instagram, and Messenger with AI-powered responses.",
    color: "cyan",
    nodes: [
      { id: "wa", label: "WhatsApp", x: 10, y: 15 },
      { id: "ig", label: "Instagram", x: 10, y: 35 },
      { id: "ai", label: "AI", x: 50, y: 25 },
      { id: "resolved", label: "Resolved", x: 90, y: 25 },
    ],
    connections: [
      { from: "wa", to: "ai" },
      { from: "ig", to: "ai" },
      { from: "ai", to: "resolved" },
    ],
    stats: ["1M+ Messages", "95% Auto", "24/7"],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Custom Shopping Experiences",
    description:
      "Complete e-commerce with inventory sync, payment gateways, and automated fulfillment.",
    color: "pink",
    nodes: [
      { id: "browse", label: "Browse", x: 10, y: 25 },
      { id: "cart", label: "Cart", x: 35, y: 25 },
      { id: "pay", label: "Pay", x: 60, y: 25 },
      { id: "ship", label: "Ship", x: 85, y: 25 },
    ],
    connections: [
      { from: "browse", to: "cart" },
      { from: "cart", to: "pay" },
      { from: "pay", to: "ship" },
    ],
    stats: ["$2M+ Processed", "99.9% Uptime", "Global"],
  },
  {
    id: "devtools",
    title: "Developer Tools",
    subtitle: "Modern Development Stack",
    description:
      "N8N workflows, AWS infrastructure, AI integrations with cutting-edge automation.",
    color: "purple",
    nodes: [
      { id: "input", label: "Input", x: 10, y: 25 },
      { id: "n8n", label: "N8N", x: 35, y: 25 },
      { id: "aws", label: "AWS", x: 60, y: 25 },
      { id: "scale", label: "Scale", x: 85, y: 25 },
    ],
    connections: [
      { from: "input", to: "n8n" },
      { from: "n8n", to: "aws" },
      { from: "aws", to: "scale" },
    ],
    stats: ["100+ Workflows", "Auto-Scale", "99.99% SLA"],
  },
];

export function CapabilityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track || !progress) return;

    const ctx = gsap.context(() => {
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

      // Progress bar animation
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

      // Animate each card
      const cards = track.querySelectorAll(".capability-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink":
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          shadow: "shadow-[0_0_60px_rgba(255,0,128,0.2)]",
        };
      case "cyan":
        return {
          accent: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.5)",
          bg: "bg-brand-cyan-500",
          bgLight: "bg-brand-cyan-500/10",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          shadow: "shadow-[0_0_60px_rgba(0,212,255,0.2)]",
        };
      case "purple":
        return {
          accent: "#7C3AED",
          glow: "rgba(124, 58, 237, 0.5)",
          bg: "bg-brand-purple-500",
          bgLight: "bg-brand-purple-500/10",
          text: "text-brand-purple-500",
          border: "border-brand-purple-500/30",
          shadow: "shadow-[0_0_60px_rgba(124,58,237,0.2)]",
        };
      default:
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          shadow: "shadow-[0_0_60px_rgba(255,0,128,0.2)]",
        };
    }
  };

  return (
    <section ref={sectionRef} id="work" className="relative bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,128,0.03)_0%,transparent_70%)]" />

      {/* Section Header - Fixed at top */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-8 md:pt-12">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-2 block">
                What We Build
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Intelligent <span className="gradient-text">Systems</span>
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
                <span className="text-xs text-neutral-600">06</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex items-center min-h-screen pt-32 pb-20">
        {/* Initial spacer */}
        <div className="shrink-0 w-[5vw]" />

        {/* Cards */}
        {capabilities.map((capability, index) => {
          const colors = getColorClasses(capability.color);

          return (
            <div
              key={capability.id}
              className="capability-card shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] px-4 md:px-6"
            >
              <div
                className={cn(
                  "h-full p-6 md:p-8 lg:p-10 rounded-3xl border backdrop-blur-sm",
                  colors.bgLight,
                  colors.border,
                  colors.shadow
                )}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={cn("text-xs font-medium tracking-wider uppercase", colors.text)}>
                      {capability.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-1">{capability.title}</h3>
                  </div>
                  <span className={cn("text-5xl md:text-6xl font-bold opacity-20", colors.text)}>
                    0{index + 1}
                  </span>
                </div>

                {/* Flow Diagram */}
                <div className="mb-6">
                  <FlowDiagram capability={capability} colors={colors} />
                </div>

                {/* Description */}
                <p className="text-neutral-400 text-sm md:text-base mb-6 leading-relaxed">
                  {capability.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2">
                  {capability.stats.map((stat, i) => (
                    <span
                      key={i}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium",
                        colors.bgLight,
                        colors.text
                      )}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* End spacer */}
        <div className="shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}

/**
 * Animated Flow Diagram Component
 */
function FlowDiagram({
  capability,
  colors,
}: {
  capability: (typeof capabilities)[0];
  colors: ReturnType<typeof getColorClasses>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  function getColorClasses(color: string) {
    switch (color) {
      case "pink":
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          shadow: "shadow-[0_0_60px_rgba(255,0,128,0.2)]",
        };
      case "cyan":
        return {
          accent: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.5)",
          bg: "bg-brand-cyan-500",
          bgLight: "bg-brand-cyan-500/10",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          shadow: "shadow-[0_0_60px_rgba(0,212,255,0.2)]",
        };
      case "purple":
        return {
          accent: "#7C3AED",
          glow: "rgba(124, 58, 237, 0.5)",
          bg: "bg-brand-purple-500",
          bgLight: "bg-brand-purple-500/10",
          text: "text-brand-purple-500",
          border: "border-brand-purple-500/30",
          shadow: "shadow-[0_0_60px_rgba(124,58,237,0.2)]",
        };
      default:
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          shadow: "shadow-[0_0_60px_rgba(255,0,128,0.2)]",
        };
    }
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      // Animate nodes appearing
      const nodes = svg.querySelectorAll(".flow-node");
      gsap.fromTo(
        nodes,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );

      // Animate connection lines drawing
      const lines = svg.querySelectorAll(".flow-line");
      lines.forEach((line) => {
        const length = (line as SVGPathElement).getTotalLength();
        gsap.fromTo(
          line,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      });

      // Continuous particle animation
      const particles = svg.querySelectorAll(".data-particle");
      particles.forEach((particle, i) => {
        const pathId = particle.getAttribute("data-path");
        const path = svg.querySelector(`#${pathId}`) as SVGPathElement;

        if (path) {
          gsap.to(particle, {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            duration: 1.5 + Math.random() * 0.5,
            repeat: -1,
            delay: i * 0.3,
            ease: "none",
          });
        }
      });

      // Pulse glow on nodes
      const glows = svg.querySelectorAll(".node-glow");
      gsap.to(glows, {
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
        ease: "sine.inOut",
      });
    }, svg);

    return () => ctx.revert();
  }, [capability]);

  const getNodeById = (id: string) => capability.nodes.find((n) => n.id === id);

  return (
    <div className="relative aspect-[3/1] w-full bg-black/30 rounded-2xl overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 100 50"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id={`glow-${capability.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {capability.connections.map((conn) => {
          const fromNode = getNodeById(conn.from);
          const toNode = getNodeById(conn.to);
          if (!fromNode || !toNode) return null;

          const pathId = `path-${capability.id}-${conn.from}-${conn.to}`;

          return (
            <g key={pathId}>
              <path
                d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                id={pathId}
                className="flow-line"
                d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                stroke={colors.accent}
                strokeWidth="0.8"
                fill="none"
                opacity="0.7"
              />
            </g>
          );
        })}

        {/* Data particles */}
        {capability.connections.map((conn, i) => {
          const pathId = `path-${capability.id}-${conn.from}-${conn.to}`;
          return (
            <circle
              key={`particle-${capability.id}-${i}`}
              className="data-particle"
              r="1.5"
              fill={colors.accent}
              data-path={pathId}
              filter={`url(#glow-${capability.id})`}
            />
          );
        })}

        {/* Nodes */}
        {capability.nodes.map((node) => (
          <g
            key={`${capability.id}-${node.id}`}
            className="flow-node"
            transform={`translate(${node.x}, ${node.y})`}
          >
            <circle
              className="node-glow"
              r="6"
              fill={colors.accent}
              opacity="0.3"
              filter={`url(#glow-${capability.id})`}
            />
            <circle r="4" fill="#0A0A0A" stroke={colors.accent} strokeWidth="1" />
            <circle r="1.5" fill={colors.accent} />
            <text
              y="12"
              textAnchor="middle"
              fill="white"
              fontSize="3.5"
              fontWeight="500"
              className="select-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

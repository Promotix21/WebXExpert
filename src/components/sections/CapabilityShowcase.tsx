"use client";

import { useRef, useEffect, useState } from "react";
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
      "End-to-end CRM with lead capture, EMI calculations, WhatsApp automation, and Facebook Ads integration. Watch how leads flow through your sales pipeline.",
    color: "pink",
    nodes: [
      { id: "fb", label: "FB Ads", x: 5, y: 25 },
      { id: "landing", label: "Landing Page", x: 20, y: 25 },
      { id: "lead", label: "Lead Captured", x: 35, y: 25 },
      { id: "auto", label: "Auto-Assign", x: 50, y: 15 },
      { id: "emi", label: "EMI Calculator", x: 50, y: 35 },
      { id: "wa", label: "WhatsApp", x: 65, y: 25 },
      { id: "agent", label: "Agent", x: 80, y: 15 },
      { id: "deal", label: "Deal Closed", x: 95, y: 25 },
    ],
    connections: [
      { from: "fb", to: "landing" },
      { from: "landing", to: "lead" },
      { from: "lead", to: "auto" },
      { from: "lead", to: "emi" },
      { from: "auto", to: "wa" },
      { from: "emi", to: "wa" },
      { from: "wa", to: "agent" },
      { from: "wa", to: "deal" },
      { from: "agent", to: "deal" },
    ],
    stats: ["10K+ Leads Processed", "85% Conversion Rate", "24/7 Automation"],
  },
  {
    id: "marketing-crm",
    title: "Marketing CRM",
    subtitle: "Multi-Channel Campaign Hub",
    description:
      "Unified platform for lead management, campaign automation, analytics, and team collaboration. All channels converge into one powerful dashboard.",
    color: "cyan",
    nodes: [
      { id: "web", label: "Website", x: 5, y: 15 },
      { id: "social", label: "Social", x: 5, y: 35 },
      { id: "email", label: "Email", x: 5, y: 55 },
      { id: "hub", label: "Central Hub", x: 30, y: 35 },
      { id: "segment", label: "Segmentation", x: 50, y: 20 },
      { id: "campaign", label: "Campaign", x: 50, y: 50 },
      { id: "analytics", label: "Analytics", x: 70, y: 35 },
      { id: "roi", label: "ROI Report", x: 90, y: 35 },
    ],
    connections: [
      { from: "web", to: "hub" },
      { from: "social", to: "hub" },
      { from: "email", to: "hub" },
      { from: "hub", to: "segment" },
      { from: "hub", to: "campaign" },
      { from: "segment", to: "analytics" },
      { from: "campaign", to: "analytics" },
      { from: "analytics", to: "roi" },
    ],
    stats: ["50+ Integrations", "Real-time Analytics", "AI-Powered"],
  },
  {
    id: "seo-software",
    title: "SEO Automation",
    subtitle: "Autonomous Optimization Engine",
    description:
      "Automated crawling, analysis, optimization execution, and performance tracking. Watch your rankings climb with intelligent automation.",
    color: "purple",
    nodes: [
      { id: "crawl", label: "Crawler", x: 5, y: 30 },
      { id: "data", label: "Data Extract", x: 20, y: 30 },
      { id: "ai", label: "AI Analysis", x: 38, y: 15 },
      { id: "audit", label: "Site Audit", x: 38, y: 45 },
      { id: "optimize", label: "Auto-Optimize", x: 58, y: 30 },
      { id: "report", label: "Reports", x: 78, y: 15 },
      { id: "rank", label: "Rank Track", x: 78, y: 45 },
      { id: "growth", label: "Growth", x: 95, y: 30 },
    ],
    connections: [
      { from: "crawl", to: "data" },
      { from: "data", to: "ai" },
      { from: "data", to: "audit" },
      { from: "ai", to: "optimize" },
      { from: "audit", to: "optimize" },
      { from: "optimize", to: "report" },
      { from: "optimize", to: "rank" },
      { from: "report", to: "growth" },
      { from: "rank", to: "growth" },
    ],
    stats: ["500+ Sites Optimized", "3x Traffic Growth", "Auto-Updates"],
  },
  {
    id: "chatbot",
    title: "AI Chatbots",
    subtitle: "Multi-Platform Conversations",
    description:
      "Intelligent chatbots across WhatsApp, Instagram, and Messenger. See how conversations flow from first message to conversion.",
    color: "cyan",
    nodes: [
      { id: "whatsapp", label: "WhatsApp", x: 5, y: 15 },
      { id: "insta", label: "Instagram", x: 5, y: 35 },
      { id: "messenger", label: "Messenger", x: 5, y: 55 },
      { id: "router", label: "AI Router", x: 28, y: 35 },
      { id: "intent", label: "Intent", x: 48, y: 20 },
      { id: "response", label: "Response", x: 48, y: 50 },
      { id: "human", label: "Human", x: 68, y: 35 },
      { id: "resolved", label: "Resolved", x: 90, y: 35 },
    ],
    connections: [
      { from: "whatsapp", to: "router" },
      { from: "insta", to: "router" },
      { from: "messenger", to: "router" },
      { from: "router", to: "intent" },
      { from: "router", to: "response" },
      { from: "intent", to: "response" },
      { from: "response", to: "human" },
      { from: "response", to: "resolved" },
      { from: "human", to: "resolved" },
    ],
    stats: ["1M+ Messages", "95% Auto-Resolved", "24/7 Available"],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Custom Shopping Experiences",
    description:
      "Complete e-commerce with inventory sync, payment gateways, and automated fulfillment. Track the customer journey from browse to buy.",
    color: "pink",
    nodes: [
      { id: "browse", label: "Browse", x: 5, y: 30 },
      { id: "cart", label: "Cart", x: 20, y: 30 },
      { id: "checkout", label: "Checkout", x: 38, y: 30 },
      { id: "payment", label: "Payment", x: 55, y: 15 },
      { id: "inventory", label: "Inventory", x: 55, y: 45 },
      { id: "ship", label: "Shipping", x: 72, y: 30 },
      { id: "notify", label: "Notify", x: 88, y: 15 },
      { id: "deliver", label: "Delivered", x: 88, y: 45 },
    ],
    connections: [
      { from: "browse", to: "cart" },
      { from: "cart", to: "checkout" },
      { from: "checkout", to: "payment" },
      { from: "checkout", to: "inventory" },
      { from: "payment", to: "ship" },
      { from: "inventory", to: "ship" },
      { from: "ship", to: "notify" },
      { from: "ship", to: "deliver" },
    ],
    stats: ["$2M+ Processed", "99.9% Uptime", "Global Shipping"],
  },
  {
    id: "devtools",
    title: "Developer Tools",
    subtitle: "Modern Development Stack",
    description:
      "N8N workflows, AWS infrastructure, AI integrations. See how we orchestrate complex automations with cutting-edge tools.",
    color: "purple",
    nodes: [
      { id: "input", label: "Input", x: 5, y: 30 },
      { id: "n8n", label: "N8N", x: 22, y: 30 },
      { id: "ai", label: "AI Process", x: 40, y: 15 },
      { id: "api", label: "API Layer", x: 40, y: 45 },
      { id: "aws", label: "AWS", x: 58, y: 30 },
      { id: "output", label: "Output", x: 76, y: 15 },
      { id: "monitor", label: "Monitor", x: 76, y: 45 },
      { id: "scale", label: "Scale", x: 92, y: 30 },
    ],
    connections: [
      { from: "input", to: "n8n" },
      { from: "n8n", to: "ai" },
      { from: "n8n", to: "api" },
      { from: "ai", to: "aws" },
      { from: "api", to: "aws" },
      { from: "aws", to: "output" },
      { from: "aws", to: "monitor" },
      { from: "output", to: "scale" },
      { from: "monitor", to: "scale" },
    ],
    stats: ["100+ Workflows", "Auto-Scaling", "99.99% SLA"],
  },
];

export function CapabilityShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeCapability = capabilities[activeIndex];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink":
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500",
        };
      case "cyan":
        return {
          accent: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.5)",
          bg: "bg-brand-cyan-500",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500",
        };
      case "purple":
        return {
          accent: "#7C3AED",
          glow: "rgba(124, 58, 237, 0.5)",
          bg: "bg-brand-purple-500",
          text: "text-brand-purple-500",
          border: "border-brand-purple-500",
        };
      default:
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500",
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,128,0.05)_0%,transparent_70%)]" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
            What We Build
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Intelligent <span className="gradient-text">Systems</span> That Power Business
          </h2>
          <p className="text-neutral-400 text-lg">
            We don&apos;t just build websites. We architect complete digital ecosystems
            with intelligent automation and seamless integrations.
          </p>
        </div>

        {/* Capability Selector */}
        <div className="mb-8 md:mb-12 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-3 justify-start lg:justify-center min-w-max lg:min-w-0 pb-2">
            {capabilities.map((cap, index) => {
              const colors = getColorClasses(cap.color);
              const isActive = activeIndex === index;

              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? `${colors.bg} text-white shadow-lg`
                      : "bg-surface-200/50 text-neutral-400 hover:text-white hover:bg-surface-200"
                  )}
                  style={{
                    boxShadow: isActive ? `0 0 20px ${colors.glow}` : "none",
                  }}
                >
                  {cap.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Capability Display */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Info Panel */}
          <div className="order-2 lg:order-1 space-y-6">
            <div>
              <span
                className={cn(
                  "text-sm font-medium tracking-wider uppercase",
                  getColorClasses(activeCapability.color).text
                )}
              >
                {activeCapability.subtitle}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">
                {activeCapability.title}
              </h3>
            </div>

            <p className="text-neutral-400 leading-relaxed">
              {activeCapability.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              {activeCapability.stats.map((stat, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-lg bg-surface-100 border border-surface-300/50"
                >
                  <span className="text-sm font-medium text-white">{stat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                getColorClasses(activeCapability.color).bg,
                "text-white hover:scale-105"
              )}
              style={{
                boxShadow: `0 0 30px ${getColorClasses(activeCapability.color).glow}`,
              }}
            >
              Learn More
            </button>
          </div>

          {/* Animated Flow Diagram */}
          <div className="order-1 lg:order-2">
            <FlowDiagram
              key={activeIndex}
              capability={activeCapability}
              colors={getColorClasses(activeCapability.color)}
            />
          </div>
        </div>
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
  const containerRef = useRef<HTMLDivElement>(null);

  function getColorClasses(color: string) {
    switch (color) {
      case "pink":
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500",
        };
      case "cyan":
        return {
          accent: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.5)",
          bg: "bg-brand-cyan-500",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500",
        };
      case "purple":
        return {
          accent: "#7C3AED",
          glow: "rgba(124, 58, 237, 0.5)",
          bg: "bg-brand-purple-500",
          text: "text-brand-purple-500",
          border: "border-brand-purple-500",
        };
      default:
        return {
          accent: "#FF0080",
          glow: "rgba(255, 0, 128, 0.5)",
          bg: "bg-brand-pink-500",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500",
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
          stagger: 0.08,
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
            delay: 0.4,
          }
        );
      });

      // Animate data particles flowing
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
            duration: 2 + Math.random(),
            repeat: -1,
            delay: 1 + i * 0.3,
            ease: "none",
          });

          // Pulse opacity
          gsap.to(particle, {
            opacity: 0.3,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
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
        stagger: 0.2,
        ease: "sine.inOut",
      });
    }, svg);

    return () => ctx.revert();
  }, [capability]);

  const getNodeById = (id: string) => capability.nodes.find((n) => n.id === id);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full bg-surface-100/50 rounded-3xl border border-surface-300/30 overflow-hidden backdrop-blur-sm"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 60%)`,
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 100 70"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.2" />
            <stop offset="50%" stopColor={colors.accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {capability.connections.map((conn, i) => {
          const fromNode = getNodeById(conn.from);
          const toNode = getNodeById(conn.to);
          if (!fromNode || !toNode) return null;

          const pathId = `path-${conn.from}-${conn.to}`;
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          const controlOffset = Math.abs(toNode.y - fromNode.y) > 10 ? 5 : 0;

          return (
            <g key={pathId}>
              {/* Background line */}
              <path
                d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY + controlOffset} ${toNode.x} ${toNode.y}`}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
                fill="none"
              />
              {/* Animated line */}
              <path
                id={pathId}
                className="flow-line"
                d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY + controlOffset} ${toNode.x} ${toNode.y}`}
                stroke={colors.accent}
                strokeWidth="0.4"
                fill="none"
                opacity="0.6"
              />
            </g>
          );
        })}

        {/* Data particles */}
        {capability.connections.slice(0, 5).map((conn, i) => {
          const pathId = `path-${conn.from}-${conn.to}`;
          return (
            <circle
              key={`particle-${i}`}
              className="data-particle"
              r="1"
              fill={colors.accent}
              data-path={pathId}
              filter="url(#glow)"
            />
          );
        })}

        {/* Nodes */}
        {capability.nodes.map((node) => (
          <g
            key={node.id}
            className="flow-node"
            transform={`translate(${node.x}, ${node.y})`}
          >
            {/* Glow circle */}
            <circle
              className="node-glow"
              r="5"
              fill={colors.accent}
              opacity="0.2"
              filter="url(#glow)"
            />
            {/* Main circle */}
            <circle
              r="3"
              fill="#0A0A0A"
              stroke={colors.accent}
              strokeWidth="0.5"
            />
            {/* Inner dot */}
            <circle r="1.2" fill={colors.accent} />
            {/* Label */}
            <text
              y="7"
              textAnchor="middle"
              fill="white"
              fontSize="2.5"
              fontWeight="500"
              className="select-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Corner accents */}
      <div
        className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 rounded-tl-lg opacity-50"
        style={{ borderColor: colors.accent }}
      />
      <div
        className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 rounded-br-lg opacity-50"
        style={{ borderColor: colors.accent }}
      />

      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: colors.accent }}
        />
        <span className="text-xs text-neutral-500 uppercase tracking-wider">
          Live Flow
        </span>
      </div>
    </div>
  );
}

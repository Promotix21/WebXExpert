"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Capability categories
const capabilities = [
  {
    id: "real-estate-crm",
    title: "Real Estate CRM",
    subtitle: "Complete Property Management",
    description:
      "End-to-end CRM with lead capture, EMI calculations, WhatsApp automation, and Facebook Ads integration.",
    nodes: [
      { id: "fb-ad", label: "FB Ad", x: 10, y: 20, color: "pink" },
      { id: "lead", label: "Lead Captured", x: 30, y: 20, color: "cyan" },
      { id: "assign", label: "Auto-Assign", x: 50, y: 20, color: "purple" },
      { id: "emi", label: "EMI Calculator", x: 70, y: 20, color: "cyan" },
      { id: "whatsapp", label: "WhatsApp", x: 50, y: 50, color: "green" },
      { id: "agent", label: "Agent Dashboard", x: 70, y: 50, color: "pink" },
      { id: "billing", label: "Billing System", x: 90, y: 35, color: "purple" },
    ],
    connections: [
      ["fb-ad", "lead"],
      ["lead", "assign"],
      ["assign", "emi"],
      ["assign", "whatsapp"],
      ["whatsapp", "agent"],
      ["emi", "billing"],
      ["agent", "billing"],
    ],
  },
  {
    id: "marketing-crm",
    title: "Marketing CRM",
    subtitle: "Multi-Channel Campaign Hub",
    description:
      "Unified platform for lead management, campaign automation, analytics, and team collaboration.",
    nodes: [
      { id: "web-form", label: "Web Forms", x: 15, y: 15, color: "cyan" },
      { id: "social", label: "Social Media", x: 15, y: 40, color: "pink" },
      { id: "chat", label: "Live Chat", x: 15, y: 65, color: "purple" },
      { id: "hub", label: "Central Hub", x: 45, y: 40, color: "pink" },
      { id: "segment", label: "Segmentation", x: 65, y: 25, color: "cyan" },
      { id: "campaign", label: "Campaigns", x: 65, y: 55, color: "purple" },
      { id: "analytics", label: "Analytics", x: 85, y: 40, color: "green" },
    ],
    connections: [
      ["web-form", "hub"],
      ["social", "hub"],
      ["chat", "hub"],
      ["hub", "segment"],
      ["hub", "campaign"],
      ["segment", "campaign"],
      ["campaign", "analytics"],
      ["segment", "analytics"],
    ],
  },
  {
    id: "seo-software",
    title: "SEO Software",
    subtitle: "Autonomous Optimization Engine",
    description:
      "Automated crawling, analysis, optimization execution, and performance tracking—all hands-free.",
    nodes: [
      { id: "crawler", label: "Crawler", x: 10, y: 35, color: "cyan" },
      { id: "extract", label: "Data Extract", x: 28, y: 35, color: "purple" },
      { id: "analyze", label: "AI Analysis", x: 46, y: 20, color: "pink" },
      { id: "audit", label: "Site Audit", x: 46, y: 50, color: "cyan" },
      { id: "optimize", label: "Auto-Optimize", x: 64, y: 35, color: "green" },
      { id: "report", label: "Reports", x: 82, y: 20, color: "purple" },
      { id: "track", label: "Rank Tracking", x: 82, y: 50, color: "pink" },
    ],
    connections: [
      ["crawler", "extract"],
      ["extract", "analyze"],
      ["extract", "audit"],
      ["analyze", "optimize"],
      ["audit", "optimize"],
      ["optimize", "report"],
      ["optimize", "track"],
    ],
  },
  {
    id: "chatbot-automation",
    title: "Chatbot & Automation",
    subtitle: "Multi-Platform AI Conversations",
    description:
      "Intelligent chatbots across WhatsApp, Instagram DM, and Facebook Messenger with human handoff.",
    nodes: [
      { id: "wa", label: "WhatsApp", x: 15, y: 20, color: "green" },
      { id: "ig", label: "Instagram", x: 15, y: 40, color: "pink" },
      { id: "fb", label: "Messenger", x: 15, y: 60, color: "cyan" },
      { id: "router", label: "AI Router", x: 40, y: 40, color: "purple" },
      { id: "intent", label: "Intent Detection", x: 60, y: 25, color: "cyan" },
      { id: "response", label: "Auto Response", x: 60, y: 55, color: "pink" },
      { id: "human", label: "Human Handoff", x: 80, y: 40, color: "green" },
    ],
    connections: [
      ["wa", "router"],
      ["ig", "router"],
      ["fb", "router"],
      ["router", "intent"],
      ["router", "response"],
      ["intent", "response"],
      ["intent", "human"],
      ["response", "human"],
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    subtitle: "Custom Shopping Experiences",
    description:
      "Custom-built e-commerce with inventory sync, payment gateways, and automated fulfillment.",
    nodes: [
      { id: "cart", label: "Shopping Cart", x: 12, y: 35, color: "cyan" },
      { id: "checkout", label: "Checkout", x: 30, y: 35, color: "pink" },
      { id: "payment", label: "Payment", x: 48, y: 20, color: "green" },
      { id: "inventory", label: "Inventory", x: 48, y: 50, color: "purple" },
      { id: "shipping", label: "Shipping", x: 66, y: 35, color: "cyan" },
      { id: "notify", label: "Notifications", x: 84, y: 20, color: "pink" },
      { id: "crm", label: "CRM Sync", x: 84, y: 50, color: "purple" },
    ],
    connections: [
      ["cart", "checkout"],
      ["checkout", "payment"],
      ["checkout", "inventory"],
      ["payment", "shipping"],
      ["inventory", "shipping"],
      ["shipping", "notify"],
      ["shipping", "crm"],
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools & AI",
    subtitle: "Modern Development Stack",
    description:
      "N8N workflows, AWS infrastructure, AI integrations, and custom tooling for any use case.",
    nodes: [
      { id: "input", label: "Input Data", x: 10, y: 35, color: "cyan" },
      { id: "n8n", label: "N8N Workflow", x: 28, y: 35, color: "purple" },
      { id: "ai", label: "AI Processing", x: 46, y: 20, color: "pink" },
      { id: "api", label: "API Layer", x: 46, y: 50, color: "green" },
      { id: "aws", label: "AWS Cloud", x: 64, y: 35, color: "cyan" },
      { id: "output", label: "Output", x: 82, y: 20, color: "purple" },
      { id: "monitor", label: "Monitoring", x: 82, y: 50, color: "pink" },
    ],
    connections: [
      ["input", "n8n"],
      ["n8n", "ai"],
      ["n8n", "api"],
      ["ai", "aws"],
      ["api", "aws"],
      ["aws", "output"],
      ["aws", "monitor"],
    ],
  },
];

export function CapabilityShowcase() {
  const [activeCapability, setActiveCapability] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding bg-surface-050 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,128,0.03)_0%,transparent_50%)]" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <Reveal>
            <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
              What We&apos;ve Built
            </span>
          </Reveal>

          <SplitText
            as="h2"
            className="heading-section mb-6"
            highlightWords={["Systems"]}
            highlightClassName="gradient-text"
          >
            Intelligent Systems That Power Business
          </SplitText>

          <Reveal delay={0.4}>
            <p className="body-large">
              We don&apos;t just build websites. We architect complete digital
              ecosystems with intelligent automation and seamless integrations.
            </p>
          </Reveal>
        </div>

        {/* Capability Selector - Horizontal scroll on mobile */}
        <div className="mb-8 md:mb-12 -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-3 justify-start md:justify-center min-w-max md:min-w-0 pb-2">
            {capabilities.map((cap, index) => (
              <button
                key={cap.id}
                onClick={() => setActiveCapability(index)}
                className={cn(
                  "px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  activeCapability === index
                    ? "bg-brand-pink-500 text-white"
                    : "bg-surface-200 text-neutral-400 hover:text-white hover:bg-surface-250"
                )}
              >
                {cap.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Capability Display */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Info Panel */}
          <div className="order-2 lg:order-1">
            <Reveal key={activeCapability}>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <span className="text-xs md:text-sm text-brand-cyan-500 font-medium tracking-wider uppercase">
                    {capabilities[activeCapability].subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                    {capabilities[activeCapability].title}
                  </h3>
                </div>

                <p className="text-sm md:text-base lg:text-lg text-neutral-400 leading-relaxed">
                  {capabilities[activeCapability].description}
                </p>

                {/* Node labels as tags */}
                <div className="flex flex-wrap gap-2">
                  {capabilities[activeCapability].nodes.map((node) => (
                    <span
                      key={node.id}
                      className={cn(
                        "px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium",
                        node.color === "pink" &&
                          "bg-brand-pink-500/20 text-brand-pink-400",
                        node.color === "cyan" &&
                          "bg-brand-cyan-500/20 text-brand-cyan-400",
                        node.color === "purple" &&
                          "bg-brand-purple-500/20 text-brand-purple-400",
                        node.color === "green" && "bg-success/20 text-success"
                      )}
                    >
                      {node.label}
                    </span>
                  ))}
                </div>

                <button className="btn-primary mt-4 md:mt-6">
                  Learn More
                </button>
              </div>
            </Reveal>
          </div>

          {/* Animated Diagram */}
          <div className="order-1 lg:order-2">
            <SystemDiagram
              key={activeCapability}
              capability={capabilities[activeCapability]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Animated System Diagram
 */
interface SystemDiagramProps {
  capability: (typeof capabilities)[0];
}

function SystemDiagram({ capability }: SystemDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    contextRef.current = gsap.context(() => {
      // Animate nodes appearing
      const nodes = svg.querySelectorAll(".system-node");
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

      // Animate connections drawing
      const connections = svg.querySelectorAll(".system-connection");
      connections.forEach((conn) => {
        const length = (conn as SVGPathElement).getTotalLength();
        gsap.fromTo(
          conn,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      });

      // Animate data particles
      const particles = svg.querySelectorAll(".data-particle");
      particles.forEach((particle, i) => {
        gsap.fromTo(
          particle,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay: 1 + i * 0.2,
          }
        );

        // Animate along path
        const motionPath = particle.getAttribute("data-path");
        if (motionPath) {
          gsap.to(particle, {
            motionPath: {
              path: motionPath,
              align: motionPath,
              autoRotate: true,
            },
            duration: 2,
            repeat: -1,
            delay: 1.5 + i * 0.3,
            ease: "none",
          });
        }
      });
    });

    return () => {
      contextRef.current?.revert();
    };
  }, [capability]);

  const getNodeColor = (color: string) => {
    switch (color) {
      case "pink":
        return "#FF0080";
      case "cyan":
        return "#00D4FF";
      case "purple":
        return "#7C3AED";
      case "green":
        return "#00FF88";
      default:
        return "#FF0080";
    }
  };

  const getNodeById = (id: string) =>
    capability.nodes.find((n) => n.id === id);

  return (
    <div className="relative aspect-[4/3] w-full bg-surface-100 rounded-2xl md:rounded-3xl border border-surface-300/50 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 100 75"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for particles */}
          <linearGradient id="particle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0080" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {capability.connections.map(([from, to], i) => {
          const fromNode = getNodeById(from);
          const toNode = getNodeById(to);
          if (!fromNode || !toNode) return null;

          return (
            <path
              key={`${from}-${to}`}
              className="system-connection"
              d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              fill="none"
            />
          );
        })}

        {/* Animated connection lines (on top) */}
        {capability.connections.map(([from, to], i) => {
          const fromNode = getNodeById(from);
          const toNode = getNodeById(to);
          if (!fromNode || !toNode) return null;

          return (
            <path
              key={`active-${from}-${to}`}
              className="system-connection"
              d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
              stroke="url(#particle-gradient)"
              strokeWidth="0.3"
              fill="none"
              opacity="0.5"
            />
          );
        })}

        {/* Nodes */}
        {capability.nodes.map((node) => (
          <g key={node.id} className="system-node" transform={`translate(${node.x}, ${node.y})`}>
            {/* Glow circle */}
            <circle
              r="4"
              fill={getNodeColor(node.color)}
              opacity="0.2"
              filter="url(#glow-pink)"
            />
            {/* Main circle */}
            <circle
              r="2.5"
              fill="rgba(0,0,0,0.8)"
              stroke={getNodeColor(node.color)}
              strokeWidth="0.4"
            />
            {/* Inner dot */}
            <circle r="0.8" fill={getNodeColor(node.color)} />
            {/* Label */}
            <text
              y="6"
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

        {/* Data particles (animated dots traveling along paths) */}
        {capability.connections.slice(0, 3).map(([from, to], i) => {
          const fromNode = getNodeById(from);
          const toNode = getNodeById(to);
          if (!fromNode || !toNode) return null;

          return (
            <circle
              key={`particle-${from}-${to}`}
              className="data-particle"
              r="0.6"
              fill="#FF0080"
              data-path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
              opacity="0"
            />
          );
        })}
      </svg>

      {/* Corner accents */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-brand-pink-500/50" />
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-brand-cyan-500/50" />
    </div>
  );
}

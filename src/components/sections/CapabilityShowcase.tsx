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
      "End-to-end CRM with lead capture, EMI calculations, WhatsApp automation, and Facebook Ads integration. Turn property inquiries into closed deals with intelligent automation.",
    color: "cyan",
    features: ["Lead Capture Forms", "EMI Calculator", "WhatsApp Integration", "FB Ads Sync"],
    nodes: [
      { id: "fb", label: "FB Ads", x: 15, y: 25 },
      { id: "landing", label: "Landing", x: 35, y: 25 },
      { id: "lead", label: "Lead", x: 55, y: 25 },
      { id: "wa", label: "WhatsApp", x: 75, y: 25 },
      { id: "deal", label: "Deal", x: 95, y: 25 },
    ],
    connections: [
      { from: "fb", to: "landing" },
      { from: "landing", to: "lead" },
      { from: "lead", to: "wa" },
      { from: "wa", to: "deal" },
    ],
    stats: ["10K+ Leads", "85% Conversion", "24/7 Active"],
  },
  {
    id: "marketing-crm",
    title: "Marketing CRM",
    subtitle: "Multi-Channel Campaign Hub",
    description:
      "Unified platform for lead management, campaign automation, analytics, and team collaboration. Manage all your marketing channels from a single powerful dashboard.",
    color: "cyan",
    features: ["Multi-Channel Sync", "Campaign Automation", "Real-time Analytics", "Team Collaboration"],
    nodes: [
      { id: "web", label: "Website", x: 10, y: 15 },
      { id: "social", label: "Social", x: 10, y: 35 },
      { id: "email", label: "Email", x: 10, y: 55 },
      { id: "hub", label: "Hub", x: 45, y: 35 },
      { id: "analytics", label: "Analytics", x: 75, y: 35 },
      { id: "roi", label: "ROI", x: 95, y: 35 },
    ],
    connections: [
      { from: "web", to: "hub" },
      { from: "social", to: "hub" },
      { from: "email", to: "hub" },
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
      "Automated crawling, analysis, optimization execution, and performance tracking. Let AI handle your SEO while you focus on growing your business.",
    color: "purple",
    features: ["Auto Crawling", "Keyword Analysis", "Content Optimization", "Rank Tracking"],
    nodes: [
      { id: "crawl", label: "Crawl", x: 12, y: 35 },
      { id: "analyze", label: "Analyze", x: 38, y: 35 },
      { id: "optimize", label: "Optimize", x: 64, y: 35 },
      { id: "track", label: "Track", x: 90, y: 35 },
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
      "Intelligent chatbots across WhatsApp, Instagram, and Messenger with AI-powered responses. Automate customer support and lead qualification 24/7.",
    color: "cyan",
    features: ["WhatsApp Business", "Instagram DMs", "Messenger Bots", "AI Responses"],
    nodes: [
      { id: "wa", label: "WhatsApp", x: 10, y: 15 },
      { id: "ig", label: "Instagram", x: 10, y: 35 },
      { id: "fb", label: "Messenger", x: 10, y: 55 },
      { id: "ai", label: "AI Engine", x: 50, y: 35 },
      { id: "resolved", label: "Resolved", x: 90, y: 35 },
    ],
    connections: [
      { from: "wa", to: "ai" },
      { from: "ig", to: "ai" },
      { from: "fb", to: "ai" },
      { from: "ai", to: "resolved" },
    ],
    stats: ["1M+ Messages", "95% Auto", "24/7 Active"],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Custom Shopping Experiences",
    description:
      "Complete e-commerce with inventory sync, payment gateways, and automated fulfillment. Build stores that convert visitors into loyal customers.",
    color: "cyan",
    features: ["Inventory Sync", "Payment Gateway", "Auto Fulfillment", "Customer Portal"],
    nodes: [
      { id: "browse", label: "Browse", x: 12, y: 35 },
      { id: "cart", label: "Cart", x: 35, y: 35 },
      { id: "pay", label: "Pay", x: 58, y: 35 },
      { id: "ship", label: "Ship", x: 81, y: 35 },
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
      "N8N workflows, AWS infrastructure, AI integrations with cutting-edge automation. Enterprise-grade tools for modern development teams.",
    color: "purple",
    features: ["N8N Workflows", "AWS Infrastructure", "AI Integrations", "Auto Scaling"],
    nodes: [
      { id: "input", label: "Input", x: 12, y: 35 },
      { id: "n8n", label: "N8N", x: 38, y: 35 },
      { id: "aws", label: "AWS", x: 64, y: 35 },
      { id: "scale", label: "Scale", x: 90, y: 35 },
    ],
    connections: [
      { from: "input", to: "n8n" },
      { from: "n8n", to: "aws" },
      { from: "aws", to: "scale" },
    ],
    stats: ["100+ Workflows", "Auto-Scale", "99.99% SLA"],
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "cyan":
      return {
        accent: "#00D4FF",
        glow: "rgba(0, 212, 255, 0.5)",
        bg: "bg-brand-cyan-500",
        bgLight: "bg-brand-cyan-500/10",
        text: "text-brand-cyan-500",
        border: "border-brand-cyan-500/30",
        shadow: "shadow-[0_0_60px_rgba(0,212,255,0.2)]",
        gradient: "from-brand-cyan-500/20 to-transparent",
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
        gradient: "from-brand-purple-500/20 to-transparent",
      };
    default:
      return {
        accent: "#00D4FF",
        glow: "rgba(0, 212, 255, 0.5)",
        bg: "bg-brand-cyan-500",
        bgLight: "bg-brand-cyan-500/10",
        text: "text-brand-cyan-500",
        border: "border-brand-cyan-500/30",
        shadow: "shadow-[0_0_60px_rgba(0,212,255,0.2)]",
        gradient: "from-brand-cyan-500/20 to-transparent",
      };
  }
};

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

      // Animate each card's content
      const cards = track.querySelectorAll(".capability-card");
      cards.forEach((card) => {
        const leftContent = card.querySelector(".card-left-content");
        const rightContent = card.querySelector(".card-right-content");

        // Left content animates in
        if (leftContent) {
          gsap.fromTo(
            leftContent,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 70%",
                end: "left 30%",
                scrub: true,
              },
            }
          );
        }

        // Right content animates in
        if (rightContent) {
          gsap.fromTo(
            rightContent,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 70%",
                end: "left 30%",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)]" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-6 md:pt-8 pointer-events-none opacity-0 capability-header">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-brand-cyan-500 font-medium tracking-widest uppercase mb-1 block">
                What We Build
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                Intelligent <span className="gradient-text">Systems</span>
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-xs text-neutral-500">Scroll to explore</span>
              <div className="flex items-center gap-2 justify-end mt-1">
                <span className="text-[10px] text-neutral-600">01</span>
                <div className="w-20 h-0.5 bg-surface-300 rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-full w-0 bg-gradient-to-r from-brand-cyan-500 via-brand-purple-500 to-brand-cyan-400 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-neutral-600">06</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Track - 100vh cards */}
      <div ref={trackRef} className="flex">
        {/* Cards - each is 100vw x 100vh */}
        {capabilities.map((capability, index) => {
          const colors = getColorClasses(capability.color);

          return (
            <div
              key={capability.id}
              className="capability-card shrink-0 w-screen h-screen flex items-center"
            >
              {/* Full-screen 40/60 layout - more space for animation */}
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[40%_60%]">
                {/* Left Side - Content */}
                <div className="card-left-content flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-0">
                  {/* Number badge */}
                  <div className={cn("inline-flex items-center gap-3 mb-6")}>
                    <span
                      className={cn(
                        "text-7xl md:text-8xl lg:text-9xl font-bold opacity-10",
                        colors.text
                      )}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <span
                    className={cn(
                      "text-sm font-medium tracking-widest uppercase mb-3",
                      colors.text
                    )}
                  >
                    {capability.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
                    {capability.features.map((feature, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-2 text-sm text-neutral-300"
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", colors.bg)} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3">
                    {capability.stats.map((stat, i) => (
                      <span
                        key={i}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium border",
                          colors.bgLight,
                          colors.border,
                          colors.text
                        )}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side - Animation */}
                <div className="card-right-content relative flex items-center justify-center p-8 lg:p-12">
                  {/* Background glow */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-radial opacity-30",
                      colors.gradient
                    )}
                    style={{
                      background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Flow Diagram - Now much larger */}
                  <div className="relative w-full max-w-2xl aspect-square">
                    <FlowDiagram capability={capability} colors={colors} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* End spacer for smooth scroll finish */}
        <div className="shrink-0 w-[10vw]" />
      </div>
    </section>
  );
}

/**
 * Animated Flow Diagram Component - Now larger and more impressive
 */
function FlowDiagram({
  capability,
  colors,
}: {
  capability: (typeof capabilities)[0];
  colors: ReturnType<typeof getColorClasses>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

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
          duration: 0.6,
          stagger: 0.15,
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
            duration: 1,
            ease: "power2.out",
            delay: 0.4,
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
            duration: 2 + Math.random() * 0.5,
            repeat: -1,
            delay: i * 0.4,
            ease: "none",
          });
        }
      });

      // Pulse glow on nodes
      const glows = svg.querySelectorAll(".node-glow");
      gsap.to(glows, {
        opacity: 0.4,
        scale: 1.2,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut",
      });

      // Rotating outer ring
      const rings = svg.querySelectorAll(".rotating-ring");
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          transformOrigin: "center center",
          duration: 20 + i * 5,
          repeat: -1,
          ease: "none",
        });
      });
    }, svg);

    return () => ctx.revert();
  }, [capability]);

  const getNodeById = (id: string) => capability.nodes.find((n) => n.id === id);

  return (
    <div className="relative w-full h-full">
      {/* Decorative outer rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[120%] h-[120%] rounded-full border opacity-10"
          style={{ borderColor: colors.accent }}
        />
        <div
          className="absolute w-[140%] h-[140%] rounded-full border opacity-5 rotating-ring"
          style={{ borderColor: colors.accent }}
        />
      </div>

      {/* Main diagram container */}
      <div className="relative w-full h-full bg-black/40 rounded-3xl overflow-hidden border border-white/5">
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
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.glow} 0%, transparent 60%)`,
            opacity: 0.15,
          }}
        />

        <svg
          ref={svgRef}
          viewBox="0 0 100 70"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id={`glow-${capability.id}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id={`gradient-${capability.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
              <stop offset="50%" stopColor={colors.accent} stopOpacity="1" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Decorative circles */}
          <circle
            cx="50"
            cy="35"
            r="30"
            fill="none"
            stroke={colors.accent}
            strokeWidth="0.2"
            opacity="0.2"
            className="rotating-ring"
          />
          <circle
            cx="50"
            cy="35"
            r="25"
            fill="none"
            stroke={colors.accent}
            strokeWidth="0.1"
            opacity="0.1"
            strokeDasharray="2 4"
            className="rotating-ring"
          />

          {/* Connection lines */}
          {capability.connections.map((conn) => {
            const fromNode = getNodeById(conn.from);
            const toNode = getNodeById(conn.to);
            if (!fromNode || !toNode) return null;

            const pathId = `path-${capability.id}-${conn.from}-${conn.to}`;

            // Calculate curved path for more visual interest
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2 - 5;

            return (
              <g key={pathId}>
                {/* Shadow line */}
                <path
                  d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Main line */}
                <path
                  id={pathId}
                  className="flow-line"
                  d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                  stroke={`url(#gradient-${capability.id})`}
                  strokeWidth="1.5"
                  fill="none"
                />
              </g>
            );
          })}

          {/* Data particles - multiple per connection */}
          {capability.connections.flatMap((conn, connIndex) => {
            const pathId = `path-${capability.id}-${conn.from}-${conn.to}`;
            return [0, 1].map((i) => (
              <circle
                key={`particle-${capability.id}-${connIndex}-${i}`}
                className="data-particle"
                r="2"
                fill={colors.accent}
                data-path={pathId}
                filter={`url(#glow-${capability.id})`}
                style={{ opacity: i === 0 ? 1 : 0.6 }}
              />
            ));
          })}

          {/* Nodes */}
          {capability.nodes.map((node) => (
            <g
              key={`${capability.id}-${node.id}`}
              className="flow-node"
              transform={`translate(${node.x}, ${node.y})`}
            >
              {/* Outer glow */}
              <circle
                className="node-glow"
                r="10"
                fill={colors.accent}
                opacity="0.2"
                filter={`url(#glow-${capability.id})`}
              />
              {/* Node background */}
              <circle r="7" fill="#0A0A0A" stroke={colors.accent} strokeWidth="1.5" />
              {/* Inner circle */}
              <circle r="3" fill={colors.accent} opacity="0.8" />
              {/* Center dot */}
              <circle r="1" fill="white" />
              {/* Label */}
              <text
                y="16"
                textAnchor="middle"
                fill="white"
                fontSize="5"
                fontWeight="600"
                className="select-none"
                style={{ textShadow: "0 0 10px rgba(0,0,0,0.8)" }}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 rounded-tl-3xl opacity-30"
        style={{ borderColor: colors.accent }}
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 rounded-br-3xl opacity-30"
        style={{ borderColor: colors.accent }}
      />
    </div>
  );
}

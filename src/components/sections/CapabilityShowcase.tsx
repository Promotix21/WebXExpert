"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Each capability with UNIQUE animation type
const capabilities = [
  {
    id: "real-estate-crm",
    title: "Real Estate CRM",
    subtitle: "Complete Property Management",
    description:
      "End-to-end CRM with lead capture, EMI calculations, WhatsApp automation, and Facebook Ads integration.",
    features: ["Lead Capture", "EMI Calculator", "WhatsApp", "FB Ads"],
    stats: ["10K+ Leads", "85% Conversion", "24/7"],
    color: "cyan",
    animationType: "property-funnel",
  },
  {
    id: "marketing-crm",
    title: "Marketing CRM",
    subtitle: "Multi-Channel Campaign Hub",
    description:
      "Unified platform for lead management, campaign automation, analytics, and team collaboration.",
    features: ["Multi-Channel", "Automation", "Analytics", "Collaboration"],
    stats: ["50+ Integrations", "Real-time", "AI-Powered"],
    color: "purple",
    animationType: "channel-dashboard",
  },
  {
    id: "seo-software",
    title: "SEO Automation",
    subtitle: "Autonomous Optimization Engine",
    description:
      "Automated crawling, analysis, optimization execution, and performance tracking.",
    features: ["Auto Crawl", "Keyword AI", "Rank Track", "Reports"],
    stats: ["500+ Sites", "3x Growth", "Auto-Updates"],
    color: "cyan",
    animationType: "seo-rankings",
  },
  {
    id: "chatbot",
    title: "AI Chatbots",
    subtitle: "Multi-Platform Conversations",
    description:
      "Intelligent chatbots across WhatsApp, Instagram, and Messenger with AI-powered responses.",
    features: ["WhatsApp", "Instagram", "Messenger", "AI Brain"],
    stats: ["1M+ Messages", "95% Auto", "24/7"],
    color: "purple",
    animationType: "chat-conversation",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Custom Shopping Experiences",
    description:
      "Complete e-commerce with inventory sync, payment gateways, and automated fulfillment.",
    features: ["Inventory", "Payments", "Shipping", "Analytics"],
    stats: ["$2M+ Processed", "99.9% Uptime", "Global"],
    color: "cyan",
    animationType: "shopping-cart",
  },
  {
    id: "devtools",
    title: "Developer Tools",
    subtitle: "Modern Development Stack",
    description:
      "N8N workflows, AWS infrastructure, AI integrations with cutting-edge automation.",
    features: ["N8N Flows", "AWS", "AI APIs", "Auto-Scale"],
    stats: ["100+ Workflows", "Auto-Scale", "99.99% SLA"],
    color: "purple",
    animationType: "code-terminal",
  },
];

const getColorClasses = (color: string) => {
  if (color === "purple") {
    return {
      accent: "#7C3AED",
      glow: "rgba(124, 58, 237, 0.5)",
      text: "text-brand-purple-500",
      bg: "bg-brand-purple-500",
      border: "border-brand-purple-500/30",
    };
  }
  return {
    accent: "#00D4FF",
    glow: "rgba(0, 212, 255, 0.5)",
    text: "text-brand-cyan-500",
    bg: "bg-brand-cyan-500",
    border: "border-brand-cyan-500/30",
  };
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

      // Horizontal scroll
      gsap.to(track, {
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

      // Progress bar
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative bg-black overflow-hidden">
      {/* Progress indicator - top right */}
      <div className="absolute top-8 right-8 z-20 hidden md:flex items-center gap-3">
        <span className="text-xs text-neutral-500">01</span>
        <div className="w-20 h-0.5 bg-surface-300 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 rounded-full"
          />
        </div>
        <span className="text-xs text-neutral-500">06</span>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex">
        {capabilities.map((capability, index) => {
          const colors = getColorClasses(capability.color);

          return (
            <div
              key={capability.id}
              className="shrink-0 w-screen h-screen flex items-center justify-center p-8 md:p-16"
            >
              {/* 40/60 Grid */}
              <div className="w-full max-w-7xl h-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center">
                {/* Left - Content */}
                <div className="flex flex-col justify-center">
                  <span className={cn("text-8xl font-black opacity-10 mb-4", colors.text)}>
                    0{index + 1}
                  </span>
                  <span className={cn("text-xs font-semibold tracking-widest uppercase mb-3", colors.text)}>
                    {capability.subtitle}
                  </span>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {capability.title}
                  </h3>
                  <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                    {capability.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {capability.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                        <span className={cn("w-1.5 h-1.5 rounded-full", colors.bg)} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {capability.stats.map((stat, i) => (
                      <span
                        key={i}
                        className={cn("px-3 py-1.5 rounded-full text-xs font-medium border", colors.border, colors.text)}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right - UNIQUE Animation with CONTINUOUS movement */}
                <div className="relative h-full flex items-center justify-center">
                  <LiveAnimation type={capability.animationType} color={colors.accent} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// LIVE animations with continuous movement
function LiveAnimation({ type, color }: { type: string; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Initial entrance timeline
      const enterTl = gsap.timeline({ delay: 0.3 });

      // Continuous loop timeline
      const loopTl = gsap.timeline({ repeat: -1, delay: 1 });

      switch (type) {
        case "property-funnel":
          // Entry
          enterTl.fromTo(".funnel-stage", { scaleX: 0 }, { scaleX: 1, stagger: 0.15, duration: 0.5, ease: "power2.out" })
            .fromTo(".funnel-count", { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 0.3 }, "-=0.3");

          // Loop: Leads flow through funnel continuously
          loopTl.to(".lead-dot-1", { y: 60, opacity: 0, duration: 1, ease: "power1.in" })
            .fromTo(".lead-dot-1", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
            .to(".funnel-count-1", { textContent: 1052, duration: 0.5, snap: { textContent: 1 } }, "-=0.5")
            .to(".lead-dot-2", { y: 60, opacity: 0, duration: 1, ease: "power1.in" }, "-=0.3")
            .fromTo(".lead-dot-2", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
            .to(".funnel-count-2", { textContent: 368, duration: 0.5, snap: { textContent: 1 } }, "-=0.5")
            .to(".conversion-arrow", { y: -5, duration: 0.3, yoyo: true, repeat: 3 })
            .to(".funnel-count-3", { textContent: 127, duration: 0.5, snap: { textContent: 1 } })
            .to(".deal-pulse", { scale: 1.3, opacity: 0, duration: 0.5, repeat: 2 })
            .to(".funnel-count-4", { textContent: 48, duration: 0.3, snap: { textContent: 1 } })
            .set(".funnel-count-1", { textContent: 1000 })
            .set(".funnel-count-2", { textContent: 350 })
            .set(".funnel-count-3", { textContent: 120 })
            .set(".funnel-count-4", { textContent: 45 });
          break;

        case "channel-dashboard":
          // Entry
          enterTl.fromTo(".channel-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 })
            .fromTo(".metric-bar", { scaleY: 0 }, { scaleY: 1, stagger: 0.05, duration: 0.3 }, "-=0.2");

          // Loop: Live metrics updating, bars animating
          loopTl.to(".email-count", { textContent: 2847, duration: 1, snap: { textContent: 1 } })
            .to(".social-count", { textContent: 5621, duration: 1, snap: { textContent: 1 } }, "-=0.5")
            .to(".metric-bar", { scaleY: () => 0.3 + Math.random() * 0.7, stagger: 0.08, duration: 0.6 })
            .to(".live-indicator", { opacity: 0, duration: 0.3, yoyo: true, repeat: 5 })
            .to(".ads-count", { textContent: 1293, duration: 0.8, snap: { textContent: 1 } })
            .to(".metric-bar", { scaleY: () => 0.4 + Math.random() * 0.6, stagger: 0.08, duration: 0.6 })
            .fromTo(".notification-badge", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(2)" })
            .to(".notification-badge", { scale: 0, duration: 0.2, delay: 1 })
            .set(".email-count", { textContent: 2583 })
            .set(".social-count", { textContent: 5412 })
            .set(".ads-count", { textContent: 1156 });
          break;

        case "seo-rankings":
          // Entry
          enterTl.fromTo(".rank-row", { x: -50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 0.4 })
            .fromTo(".rank-bar-fill", { width: 0 }, { width: "var(--bar-width)", stagger: 0.1, duration: 0.5 }, "-=0.3");

          // Loop: Rankings change, positions update
          loopTl.to(".rank-1", { x: -3, duration: 0.2, yoyo: true, repeat: 1 })
            .to(".pos-1", { textContent: 1, duration: 0.01, color: "#4ADE80" })
            .fromTo(".rank-up-1", { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 })
            .to(".rank-up-1", { opacity: 0, duration: 0.3, delay: 0.5 })
            .to(".bar-1", { width: "95%", duration: 0.5 })
            .to(".rank-3", { x: -3, duration: 0.2, yoyo: true, repeat: 1 }, "-=0.3")
            .to(".pos-3", { textContent: 1, duration: 0.01, color: "#4ADE80" })
            .fromTo(".rank-up-3", { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 })
            .to(".rank-up-3", { opacity: 0, duration: 0.3, delay: 0.5 })
            .to(".bar-3", { width: "98%", duration: 0.5 })
            .to(".crawl-indicator", { rotation: 360, duration: 1 })
            .set(".pos-1", { textContent: 2, color: color })
            .set(".pos-3", { textContent: 3, color: color })
            .set(".bar-1", { width: "85%" })
            .set(".bar-3", { width: "75%" });
          break;

        case "chat-conversation":
          // Entry
          enterTl.fromTo(".chat-msg", { scale: 0, y: 20 }, { scale: 1, y: 0, stagger: 0.2, duration: 0.4, ease: "back.out(1.5)" });

          // Loop: New messages appear, typing indicator, responses
          loopTl.to(".typing-dot", { y: -3, stagger: 0.1, duration: 0.2, yoyo: true, repeat: 5 })
            .fromTo(".new-msg-1", { scale: 0, y: 20 }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
            .to(".typing-dot", { y: -3, stagger: 0.1, duration: 0.2, yoyo: true, repeat: 5, delay: 0.5 })
            .fromTo(".new-msg-2", { scale: 0, y: 20 }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
            .to(".ai-thinking", { opacity: 1, duration: 0.3 })
            .to(".ai-thinking", { opacity: 0, duration: 0.3, delay: 0.8 })
            .fromTo(".new-msg-3", { scale: 0, y: 20 }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
            .to({}, { duration: 1 })
            .to(".new-msg-1, .new-msg-2, .new-msg-3", { scale: 0, y: 20, duration: 0.3, stagger: 0.1 });
          break;

        case "shopping-cart":
          // Entry
          enterTl.fromTo(".cart-product", { x: 100, rotation: 10, opacity: 0 }, { x: 0, rotation: 0, opacity: 1, stagger: 0.15, duration: 0.5, ease: "power2.out" })
            .fromTo(".cart-summary", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2");

          // Loop: Items added, quantity changes, checkout pulse
          loopTl.to(".qty-1", { textContent: 2, duration: 0.01 })
            .to(".item-total-1", { textContent: "$598", duration: 0.3 })
            .to(".cart-total", { textContent: "$746", duration: 0.5, snap: { textContent: 1 } })
            .fromTo(".add-effect", { scale: 0, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.5 }, "-=0.3")
            .fromTo(".new-item", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" })
            .to(".cart-badge", { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 })
            .to(".cart-total", { textContent: "$845", duration: 0.5 })
            .to(".checkout-btn", { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3 })
            .to(".checkout-btn", { background: "#4ADE80", duration: 0.2 })
            .set(".checkout-btn", { background: color })
            .to(".new-item", { x: 100, opacity: 0, duration: 0.3 })
            .set(".qty-1", { textContent: 1 })
            .set(".item-total-1", { textContent: "$299" })
            .set(".cart-total", { textContent: "$447" });
          break;

        case "code-terminal":
          // Entry
          enterTl.fromTo(".term-line", { width: 0, opacity: 0 }, { width: "100%", opacity: 1, stagger: 0.15, duration: 0.4 });

          // Loop: Commands run, output streams, deploys happen
          loopTl.to(".cursor", { opacity: 0, duration: 0.3, yoyo: true, repeat: 5 })
            .fromTo(".new-cmd", { width: 0 }, { width: "100%", duration: 0.8 })
            .fromTo(".output-1", { opacity: 0 }, { opacity: 1, duration: 0.2 })
            .fromTo(".output-2", { opacity: 0 }, { opacity: 1, duration: 0.2, delay: 0.3 })
            .fromTo(".output-3", { opacity: 0 }, { opacity: 1, duration: 0.2, delay: 0.3 })
            .to(".progress-bar", { width: "100%", duration: 1.5, ease: "power1.inOut" })
            .to(".deploy-status", { color: "#4ADE80", duration: 0.2 })
            .set(".deploy-status-text", { textContent: "Deployed!" })
            .to(".workflow-node", { scale: 1.1, stagger: 0.1, duration: 0.2, yoyo: true, repeat: 1 })
            .to({}, { duration: 1 })
            .set(".new-cmd", { width: 0 })
            .set(".output-1, .output-2, .output-3", { opacity: 0 })
            .set(".progress-bar", { width: "0%" })
            .set(".deploy-status", { color: color })
            .set(".deploy-status-text", { textContent: "Ready" });
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [type, color]);

  return (
    <div ref={containerRef} className="w-full max-w-xl aspect-square relative">
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />

      {/* Animation container */}
      <div className="relative w-full h-full bg-surface-100/30 rounded-3xl border border-surface-300/20 p-6 overflow-hidden">
        {type === "property-funnel" && <PropertyFunnelLive color={color} />}
        {type === "channel-dashboard" && <ChannelDashboardLive color={color} />}
        {type === "seo-rankings" && <SEORankingsLive color={color} />}
        {type === "chat-conversation" && <ChatConversationLive color={color} />}
        {type === "shopping-cart" && <ShoppingCartLive color={color} />}
        {type === "code-terminal" && <CodeTerminalLive color={color} />}
      </div>
    </div>
  );
}

// 1. Property Funnel - Live lead flow
function PropertyFunnelLive({ color }: { color: string }) {
  const stages = [
    { label: "Visitors", count: 1000, width: "100%" },
    { label: "Leads", count: 350, width: "75%" },
    { label: "Qualified", count: 120, width: "50%" },
    { label: "Deals", count: 45, width: "30%" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 p-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-500 uppercase tracking-wider">Lead Funnel</span>
        <span className="text-[10px] text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      </div>
      {stages.map((stage, i) => (
        <div key={i} className={`funnel-stage flex items-center gap-3 rank-${i + 1}`}>
          <div className="w-16 text-right">
            <span className={`funnel-count funnel-count-${i + 1} text-lg font-bold`} style={{ color }}>{stage.count}</span>
          </div>
          <div className="flex-1 h-9 relative bg-surface-300/20 rounded-lg overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-lg"
              style={{ width: stage.width, background: `${color}${i === 3 ? '' : '40'}` }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xs font-medium z-10">
              {stage.label}
            </span>
            {/* Floating lead dots */}
            {i < 2 && (
              <div className={`lead-dot-${i + 1} absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full`} style={{ background: color }} />
            )}
            {i === 2 && (
              <div className="conversion-arrow absolute right-4 top-1/2 -translate-y-1/2" style={{ color }}>↓</div>
            )}
            {i === 3 && (
              <div className="deal-pulse absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ background: color }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. Channel Dashboard - Live metrics
function ChannelDashboardLive({ color }: { color: string }) {
  const channels = [
    { name: "Email", count: 2583, icon: "✉" },
    { name: "Social", count: 5412, icon: "📱" },
    { name: "Ads", count: 1156, icon: "📊" },
    { name: "SEO", count: 3891, icon: "🔍" },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 p-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500 uppercase">Campaign Dashboard</span>
        <div className="flex items-center gap-1">
          <span className="live-indicator w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[10px] text-green-400">Live</span>
          <div className="notification-badge ml-2 w-4 h-4 rounded-full bg-red-500 text-[8px] text-white flex items-center justify-center" style={{ transform: "scale(0)" }}>3</div>
        </div>
      </div>

      {/* Channel cards */}
      <div className="grid grid-cols-2 gap-2">
        {channels.map((ch, i) => (
          <div key={i} className="channel-card bg-surface-200/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{ch.icon}</span>
              <span className="text-[10px] text-neutral-500 uppercase">{ch.name}</span>
            </div>
            <div className={`${ch.name.toLowerCase()}-count text-xl font-bold`} style={{ color }}>{ch.count}</div>
          </div>
        ))}
      </div>

      {/* Live chart */}
      <div className="flex-1 bg-surface-200/50 rounded-xl p-3">
        <div className="text-[10px] text-neutral-500 uppercase mb-2">Hourly Traffic</div>
        <div className="flex items-end justify-between h-16 gap-1">
          {[0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.8, 0.6, 0.75, 0.85].map((h, i) => (
            <div
              key={i}
              className="metric-bar flex-1 rounded-t origin-bottom"
              style={{ height: `${h * 100}%`, background: color, opacity: 0.4 + (i % 3) * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. SEO Rankings - Live position updates
function SEORankingsLive({ color }: { color: string }) {
  const keywords = [
    { word: "web development", rank: 2, width: "85%" },
    { word: "react agency", rank: 4, width: "70%" },
    { word: "custom crm", rank: 3, width: "75%" },
    { word: "next.js experts", rank: 5, width: "60%" },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500 uppercase">Keyword Rankings</span>
        <div className="crawl-indicator w-4 h-4 border-2 border-t-transparent rounded-full" style={{ borderColor: color }} />
      </div>

      {/* Rankings */}
      <div className="space-y-3 flex-1">
        {keywords.map((kw, i) => (
          <div key={i} className={`rank-row rank-${i + 1} flex items-center gap-2`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-200/50">
              <span className={`pos-${i + 1} text-sm font-bold`} style={{ color }}>#{kw.rank}</span>
            </div>
            <div className="flex-1">
              <div className="text-xs text-neutral-300 mb-1">{kw.word}</div>
              <div className="h-2 bg-surface-300/30 rounded-full overflow-hidden">
                <div
                  className={`rank-bar-fill bar-${i + 1} h-full rounded-full`}
                  style={{ background: color, width: kw.width, ["--bar-width" as string]: kw.width }}
                />
              </div>
            </div>
            <div className={`rank-up-${i + 1} text-xs text-green-400`} style={{ opacity: 0 }}>↑</div>
          </div>
        ))}
      </div>

      {/* Stats footer */}
      <div className="flex justify-between pt-2 border-t border-surface-300/20 text-[10px]">
        <span className="text-neutral-500">Total Keywords: <span style={{ color }}>156</span></span>
        <span className="text-neutral-500">Avg Position: <span style={{ color }}>3.2</span></span>
      </div>
    </div>
  );
}

// 4. Chat Conversation - Live chat
function ChatConversationLive({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Chat header */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-surface-300/20">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: color }}>AI</div>
        <div className="flex-1">
          <div className="text-sm font-medium">Support Bot</div>
          <div className="text-[10px] text-green-400">● Online</div>
        </div>
        <div className="ai-thinking text-[10px] px-2 py-1 rounded-full bg-surface-200/50" style={{ opacity: 0, color }}>Thinking...</div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="chat-msg bg-surface-200/50 rounded-2xl rounded-tl-sm p-3 text-xs max-w-[85%]" style={{ borderLeft: `2px solid ${color}` }}>
          Hi! How can I help you today?
        </div>
        <div className="chat-msg bg-surface-300/50 rounded-2xl rounded-tr-sm p-3 text-xs max-w-[85%] ml-auto">
          I need help with my order
        </div>
        <div className="chat-msg bg-surface-200/50 rounded-2xl rounded-tl-sm p-3 text-xs max-w-[85%]" style={{ borderLeft: `2px solid ${color}` }}>
          Of course! What&apos;s your order number?
        </div>

        {/* New messages that appear */}
        <div className="new-msg-1 bg-surface-300/50 rounded-2xl rounded-tr-sm p-3 text-xs max-w-[85%] ml-auto" style={{ transform: "scale(0)" }}>
          #ORD-29471
        </div>
        <div className="new-msg-2 bg-surface-200/50 rounded-2xl rounded-tl-sm p-3 text-xs max-w-[85%]" style={{ borderLeft: `2px solid ${color}`, transform: "scale(0)" }}>
          Found it! Your package is out for delivery.
        </div>
        <div className="new-msg-3 bg-surface-300/50 rounded-2xl rounded-tr-sm p-3 text-xs max-w-[85%] ml-auto" style={{ transform: "scale(0)" }}>
          Thanks! 🎉
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex gap-1 p-3 w-16 bg-surface-200/50 rounded-2xl mt-2" style={{ borderLeft: `2px solid ${color}` }}>
        <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      </div>
    </div>
  );
}

// 5. Shopping Cart - Live e-commerce
function ShoppingCartLive({ color }: { color: string }) {
  const items = [
    { name: "Premium Plan", price: "$299", qty: 1 },
    { name: "Support Add-on", price: "$99", qty: 1 },
    { name: "Storage Pack", price: "$49", qty: 1 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-surface-300/20">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="text-sm font-medium">Your Cart</span>
        <div className="cart-badge ml-auto w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-black" style={{ background: color }}>3</div>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-2 relative">
        {items.map((item, i) => (
          <div key={i} className={`cart-product flex items-center gap-3 p-2 bg-surface-200/50 rounded-xl`}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center relative" style={{ background: `${color}20` }}>
              <span style={{ color }}>✓</span>
              {i === 0 && <div className="add-effect absolute inset-0 rounded-lg" style={{ background: color, transform: "scale(0)" }} />}
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium">{item.name}</div>
              <div className="text-[10px] text-neutral-500">Qty: <span className={`qty-${i + 1}`}>{item.qty}</span></div>
            </div>
            <div className={`item-total-${i + 1} text-sm font-bold`} style={{ color }}>{item.price}</div>
          </div>
        ))}

        {/* New item that appears */}
        <div className="new-item flex items-center gap-3 p-2 bg-surface-200/50 rounded-xl" style={{ opacity: 0 }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
            <span style={{ color }}>✓</span>
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium">Priority Support</div>
            <div className="text-[10px] text-neutral-500">Qty: 1</div>
          </div>
          <div className="text-sm font-bold" style={{ color }}>$99</div>
        </div>
      </div>

      {/* Summary */}
      <div className="cart-summary pt-3 mt-2 border-t border-surface-300/20">
        <div className="flex justify-between mb-3">
          <span className="text-neutral-400 text-sm">Total</span>
          <span className="cart-total text-xl font-bold" style={{ color }}>$447</span>
        </div>
        <button className="checkout-btn w-full py-2.5 rounded-xl font-semibold text-sm text-black" style={{ background: color }}>
          Checkout Now →
        </button>
      </div>
    </div>
  );
}

// 6. Code Terminal - Live deployment
function CodeTerminalLive({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col font-mono text-[11px]">
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-surface-300/20">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-neutral-500 text-[10px]">terminal</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="deploy-status-text text-[10px]" style={{ color }}>Ready</span>
          <div className="deploy-status w-2 h-2 rounded-full" style={{ background: color }} />
        </div>
      </div>

      {/* Terminal content */}
      <div className="flex-1 space-y-1">
        <div className="term-line flex gap-2">
          <span style={{ color }}>$</span>
          <span className="text-neutral-300">n8n start --tunnel</span>
        </div>
        <div className="term-line flex gap-2">
          <span className="text-neutral-500">→</span>
          <span className="text-neutral-400">Starting workflow engine...</span>
        </div>
        <div className="term-line flex gap-2">
          <span className="text-green-400">✓</span>
          <span className="text-neutral-300">Connected to AWS</span>
        </div>

        {/* New command that types */}
        <div className="new-cmd flex gap-2 overflow-hidden" style={{ width: 0 }}>
          <span style={{ color }}>$</span>
          <span className="text-neutral-300">deploy --prod</span>
        </div>

        {/* Output lines */}
        <div className="output-1 flex gap-2" style={{ opacity: 0 }}>
          <span className="text-neutral-500">→</span>
          <span className="text-neutral-400">Building bundle...</span>
        </div>
        <div className="output-2 flex gap-2" style={{ opacity: 0 }}>
          <span className="text-neutral-500">→</span>
          <span className="text-neutral-400">Optimizing assets...</span>
        </div>
        <div className="output-3 flex gap-2" style={{ opacity: 0 }}>
          <span className="text-green-400">✓</span>
          <span className="text-neutral-300">Deployment complete!</span>
        </div>

        {/* Cursor */}
        <div className="flex gap-2 mt-2">
          <span style={{ color }}>$</span>
          <span className="cursor w-2 h-4" style={{ background: color }} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2 pt-2 border-t border-surface-300/20">
        <div className="h-1 bg-surface-300/30 rounded-full overflow-hidden">
          <div className="progress-bar h-full rounded-full" style={{ background: color, width: "0%" }} />
        </div>
      </div>

      {/* Workflow nodes */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {["N8N", "AWS", "API", "DB"].map((node, i) => (
          <div key={i} className="workflow-node flex flex-col items-center">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[9px] font-bold border" style={{ borderColor: color, color }}>
              {node}
            </div>
            {i < 3 && <div className="w-6 h-0.5 mt-1" style={{ background: `${color}50` }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

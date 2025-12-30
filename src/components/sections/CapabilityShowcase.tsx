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

                {/* Right - UNIQUE Animation */}
                <div className="relative h-full flex items-center justify-center">
                  <UniqueAnimation type={capability.animationType} color={colors.accent} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// UNIQUE animations for each capability
function UniqueAnimation({ type, color }: { type: string; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "left 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animation based on type
      switch (type) {
        case "property-funnel":
          tl.fromTo(".funnel-stage", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, stagger: 0.15, duration: 0.5 })
            .fromTo(".funnel-icon", { scale: 0 }, { scale: 1, stagger: 0.1, duration: 0.3, ease: "back.out" }, "-=0.3")
            .fromTo(".funnel-count", { textContent: 0 }, { textContent: 100, snap: { textContent: 1 }, stagger: 0.1, duration: 1 }, "-=0.5");
          break;
        case "channel-dashboard":
          tl.fromTo(".dash-panel", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 })
            .fromTo(".dash-bar", { scaleY: 0 }, { scaleY: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" }, "-=0.2")
            .fromTo(".dash-dot", { scale: 0 }, { scale: 1, stagger: 0.03, duration: 0.2, ease: "back.out" }, "-=0.2");
          break;
        case "seo-rankings":
          tl.fromTo(".rank-bar", { width: 0 }, { width: "100%", stagger: 0.1, duration: 0.6, ease: "power2.out" })
            .fromTo(".rank-num", { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.3 }, "-=0.4")
            .fromTo(".keyword-tag", { scale: 0, rotation: -10 }, { scale: 1, rotation: 0, stagger: 0.05, duration: 0.3, ease: "back.out" }, "-=0.3");
          break;
        case "chat-conversation":
          tl.fromTo(".chat-bubble", { scale: 0, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 0.4, ease: "back.out" })
            .fromTo(".typing-dot", { scale: 0 }, { scale: 1, stagger: 0.1, duration: 0.2, repeat: -1, yoyo: true }, "-=0.2");
          break;
        case "shopping-cart":
          tl.fromTo(".cart-item", { x: 100, opacity: 0, rotation: 15 }, { x: 0, opacity: 1, rotation: 0, stagger: 0.15, duration: 0.5, ease: "power2.out" })
            .fromTo(".cart-total", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out" }, "-=0.2")
            .fromTo(".checkout-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, "-=0.1");
          break;
        case "code-terminal":
          tl.fromTo(".term-line", { width: 0, opacity: 0 }, { width: "100%", opacity: 1, stagger: 0.15, duration: 0.4 })
            .fromTo(".term-cursor", { opacity: 0 }, { opacity: 1, duration: 0.3, repeat: -1, yoyo: true }, "-=0.2")
            .fromTo(".workflow-node", { scale: 0 }, { scale: 1, stagger: 0.1, duration: 0.3, ease: "back.out" }, "-=0.5");
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [type]);

  return (
    <div ref={containerRef} className="w-full max-w-xl aspect-square relative">
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />

      {/* Animation container */}
      <div className="relative w-full h-full bg-surface-100/30 rounded-3xl border border-surface-300/20 p-6 overflow-hidden">
        {type === "property-funnel" && <PropertyFunnelAnimation color={color} />}
        {type === "channel-dashboard" && <ChannelDashboardAnimation color={color} />}
        {type === "seo-rankings" && <SEORankingsAnimation color={color} />}
        {type === "chat-conversation" && <ChatConversationAnimation color={color} />}
        {type === "shopping-cart" && <ShoppingCartAnimation color={color} />}
        {type === "code-terminal" && <CodeTerminalAnimation color={color} />}
      </div>
    </div>
  );
}

// 1. Property Funnel Animation - Lead conversion funnel
function PropertyFunnelAnimation({ color }: { color: string }) {
  const stages = [
    { label: "Visitors", count: 1000, width: "100%" },
    { label: "Leads", count: 350, width: "75%" },
    { label: "Qualified", count: 120, width: "50%" },
    { label: "Deals", count: 45, width: "30%" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center gap-4 p-4">
      <div className="text-center mb-4">
        <span className="text-xs text-neutral-500 uppercase tracking-wider">Lead Funnel</span>
      </div>
      {stages.map((stage, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-20 text-right">
            <span className="funnel-count text-lg font-bold" style={{ color }}>{stage.count}</span>
          </div>
          <div className="flex-1 h-10 relative">
            <div
              className="funnel-stage absolute inset-y-0 left-0 rounded-lg origin-left"
              style={{ width: stage.width, background: `${color}${i === 3 ? '' : '40'}` }}
            />
            <span className="funnel-icon absolute left-3 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
              {stage.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. Channel Dashboard Animation - Multi-channel metrics
function ChannelDashboardAnimation({ color }: { color: string }) {
  const channels = ["Email", "Social", "Ads", "SEO"];
  const metrics = [65, 45, 80, 55, 70, 40, 85];

  return (
    <div className="w-full h-full grid grid-cols-2 gap-3 p-2">
      {/* Channel cards */}
      {channels.map((ch, i) => (
        <div key={i} className="dash-panel bg-surface-200/50 rounded-xl p-3">
          <span className="text-[10px] text-neutral-500 uppercase">{ch}</span>
          <div className="text-xl font-bold mt-1" style={{ color }}>{(i + 1) * 234}</div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3].map((j) => (
              <div key={j} className="dash-dot w-1.5 h-1.5 rounded-full" style={{ background: color, opacity: 0.3 + j * 0.2 }} />
            ))}
          </div>
        </div>
      ))}
      {/* Bar chart */}
      <div className="col-span-2 dash-panel bg-surface-200/50 rounded-xl p-3">
        <span className="text-[10px] text-neutral-500 uppercase">Weekly Performance</span>
        <div className="flex items-end gap-2 h-20 mt-2">
          {metrics.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="dash-bar w-full rounded-t origin-bottom"
                style={{ height: `${h}%`, background: color, opacity: 0.6 + (i % 2) * 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. SEO Rankings Animation - Keyword rankings
function SEORankingsAnimation({ color }: { color: string }) {
  const keywords = [
    { word: "web design", rank: 1, change: "+3" },
    { word: "react developer", rank: 3, change: "+5" },
    { word: "crm software", rank: 2, change: "+2" },
    { word: "custom apps", rank: 4, change: "+8" },
  ];
  const tags = ["SEO", "SEM", "Keywords", "Backlinks", "Speed", "Mobile"];

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-4">Keyword Rankings</div>
      <div className="space-y-3 flex-1">
        {keywords.map((kw, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="rank-num w-6 text-lg font-bold" style={{ color }}>#{kw.rank}</span>
            <div className="flex-1 h-8 bg-surface-200/50 rounded-lg overflow-hidden">
              <div className="rank-bar h-full rounded-lg flex items-center px-3" style={{ background: `${color}30`, maxWidth: `${100 - i * 15}%` }}>
                <span className="text-xs text-white truncate">{kw.word}</span>
              </div>
            </div>
            <span className="text-xs text-green-400">{kw.change}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, i) => (
          <span key={i} className="keyword-tag px-2 py-1 text-[10px] rounded-full border" style={{ borderColor: color, color }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// 4. Chat Conversation Animation - AI chatbot
function ChatConversationAnimation({ color }: { color: string }) {
  const messages = [
    { from: "user", text: "Hi, I need help with my order" },
    { from: "bot", text: "Hello! I'd be happy to help. What's your order number?" },
    { from: "user", text: "#ORD-2847" },
    { from: "bot", text: "Found it! Your order is out for delivery today." },
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-surface-300/30">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: color }}>AI</div>
        <div>
          <div className="text-sm font-medium">Support Bot</div>
          <div className="text-[10px] text-green-400">● Online</div>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden">
        {messages.map((msg, i) => (
          <div key={i} className={cn("chat-bubble max-w-[80%] p-3 rounded-2xl text-xs", msg.from === "user" ? "ml-auto bg-surface-200" : "bg-surface-300/50")} style={msg.from === "bot" ? { borderLeft: `2px solid ${color}` } : {}}>
            {msg.text}
          </div>
        ))}
        {/* Typing indicator */}
        <div className="flex gap-1 p-3 w-16 bg-surface-300/50 rounded-2xl" style={{ borderLeft: `2px solid ${color}` }}>
          <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        </div>
      </div>
    </div>
  );
}

// 5. Shopping Cart Animation - E-commerce
function ShoppingCartAnimation({ color }: { color: string }) {
  const items = [
    { name: "Premium Plan", price: 299 },
    { name: "Add-on Pack", price: 49 },
    { name: "Support 24/7", price: 99 },
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="text-sm font-medium">Your Cart</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-black" style={{ background: color }}>3</span>
      </div>
      <div className="flex-1 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="cart-item flex items-center gap-3 p-3 bg-surface-200/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}30` }}>
              <span style={{ color }}>✓</span>
            </div>
            <div className="flex-1">
              <div className="text-sm">{item.name}</div>
              <div className="text-xs text-neutral-500">Digital Product</div>
            </div>
            <div className="text-sm font-bold" style={{ color }}>${item.price}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-surface-300/30">
        <div className="cart-total flex justify-between mb-3">
          <span className="text-neutral-400">Total</span>
          <span className="text-xl font-bold" style={{ color }}>$447</span>
        </div>
        <button className="checkout-btn w-full py-3 rounded-xl font-semibold text-black" style={{ background: color }}>
          Checkout Now
        </button>
      </div>
    </div>
  );
}

// 6. Code Terminal Animation - Developer tools
function CodeTerminalAnimation({ color }: { color: string }) {
  const lines = [
    { prefix: "$", text: "n8n start --tunnel" },
    { prefix: "→", text: "Workflow engine started..." },
    { prefix: "→", text: "Connecting to AWS Lambda..." },
    { prefix: "✓", text: "Deployed successfully!" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Terminal */}
      <div className="flex-1 bg-black/50 rounded-xl p-4 font-mono text-xs">
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="space-y-2">
          {lines.map((line, i) => (
            <div key={i} className="term-line flex gap-2 overflow-hidden">
              <span style={{ color }}>{line.prefix}</span>
              <span className="text-neutral-300">{line.text}</span>
            </div>
          ))}
          <div className="flex gap-2">
            <span style={{ color }}>$</span>
            <span className="term-cursor w-2 h-4" style={{ background: color }} />
          </div>
        </div>
      </div>
      {/* Workflow nodes */}
      <div className="mt-4 flex items-center justify-center gap-4">
        {["N8N", "AWS", "API", "DB"].map((node, i) => (
          <div key={i} className="workflow-node flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border" style={{ borderColor: color, color }}>
              {node}
            </div>
            {i < 3 && <div className="w-8 h-0.5" style={{ background: `${color}50` }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { InnerHeader } from "@/components/layout/InnerHeader";
import { Footer } from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive API Flow Hero Animation
function APIFlowHero() {
  const flowRef = useRef<HTMLDivElement>(null);
  const [activePacket, setActivePacket] = useState(0);

  const services = [
    { name: "Salesforce", icon: "☁️", color: "#00A1E0" },
    { name: "HubSpot", icon: "🔶", color: "#FF7A59" },
    { name: "Stripe", icon: "💳", color: "#635BFF" },
    { name: "Slack", icon: "💬", color: "#4A154B" },
    { name: "Shopify", icon: "🛍️", color: "#96BF48" },
    { name: "Mailchimp", icon: "📧", color: "#FFE01B" },
  ];

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;

    // Cycle active packet
    const packetInterval = setInterval(() => {
      setActivePacket(prev => (prev + 1) % services.length);
    }, 1500);

    const ctx = gsap.context(() => {
      // Animate main hub
      gsap.fromTo(
        ".api-hub",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
      );

      // Animate service nodes
      gsap.fromTo(
        ".service-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.6,
        }
      );

      // Animate connection lines
      gsap.fromTo(
        ".connection-line",
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.8,
        }
      );

      // Animate data packets flowing continuously
      const packets = document.querySelectorAll('.data-packet');
      packets.forEach((packet, i) => {
        gsap.to(packet, {
          motionPath: {
            path: `#path-${i}`,
            align: `#path-${i}`,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 2,
          repeat: -1,
          ease: "none",
          delay: i * 0.3,
        });
      });

      // Pulse animation for hub
      gsap.to(".hub-pulse", {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });

      // Status indicators
      gsap.to(".status-dot", {
        opacity: 0.3,
        duration: 0.5,
        stagger: { each: 0.2, repeat: -1, yoyo: true },
      });

      // Request count animation
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 847293,
        duration: 2,
        delay: 1,
        onUpdate: () => {
          const el = document.querySelector('.request-counter');
          if (el) el.textContent = Math.floor(counter.val).toLocaleString();
        },
      });
    }, flow);

    return () => {
      clearInterval(packetInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={flowRef} className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-video">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-cyan-500/20 rounded-full blur-[100px]" />

      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Connection paths */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const x = 200 + Math.cos(angle) * 120;
          const y = 150 + Math.sin(angle) * 100;
          return (
            <g key={i}>
              <path
                id={`path-${i}`}
                className="connection-line"
                d={`M200,150 Q${200 + (x - 200) * 0.5},${150 + (y - 150) * 0.3} ${x},${y}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="200"
              />
              {/* Data packet */}
              <circle
                className="data-packet"
                r="4"
                fill="#00D4FF"
                filter="url(#glow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Central API Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="hub-pulse absolute inset-0 w-32 h-32 bg-brand-cyan-500/30 rounded-full" />
        <div className="api-hub w-32 h-32 rounded-full bg-gradient-to-br from-brand-cyan-500 to-brand-purple-500 flex items-center justify-center shadow-[0_0_60px_rgba(0,212,255,0.4)]">
          <div className="text-center">
            <div className="text-3xl mb-1">⚡</div>
            <div className="text-xs font-bold text-white/90">API HUB</div>
          </div>
        </div>
      </div>

      {/* Service Nodes */}
      {services.map((service, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const x = 50 + Math.cos(angle) * 38; // percentage
        const y = 50 + Math.sin(angle) * 40;
        return (
          <div
            key={service.name}
            className="service-node absolute z-10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center shadow-xl transition-all duration-300",
                activePacket === i
                  ? "scale-110 shadow-[0_0_30px_rgba(0,212,255,0.5)]"
                  : ""
              )}
              style={{
                background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                border: `1px solid ${service.color}50`,
              }}
            >
              <span className="text-xl md:text-2xl">{service.icon}</span>
              <span className="text-[8px] md:text-[10px] text-neutral-300 mt-1">
                {service.name}
              </span>
              <div
                className="status-dot absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ background: service.color }}
              />
            </div>
          </div>
        );
      })}

      {/* Stats Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="px-4 py-2 rounded-xl bg-surface-100/80 backdrop-blur-sm border border-surface-300/30">
          <div className="text-[10px] text-neutral-500">Requests Today</div>
          <div className="request-counter text-lg font-bold text-brand-cyan-500">0</div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-surface-100/80 backdrop-blur-sm border border-surface-300/30">
          <div className="text-[10px] text-neutral-500">Avg. Latency</div>
          <div className="text-lg font-bold text-green-400">23ms</div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-surface-100/80 backdrop-blur-sm border border-surface-300/30 hidden md:block">
          <div className="text-[10px] text-neutral-500">Success Rate</div>
          <div className="text-lg font-bold text-brand-purple-500">99.9%</div>
        </div>
      </div>
    </div>
  );
}

const integrations = [
  {
    category: "CRM & Sales",
    items: [
      { name: "Salesforce", description: "Full API integration" },
      { name: "HubSpot", description: "Marketing automation" },
      { name: "Pipedrive", description: "Deal management" },
      { name: "Zoho", description: "Complete suite" },
    ],
    color: "brand-cyan-500",
  },
  {
    category: "Payments",
    items: [
      { name: "Stripe", description: "Payment processing" },
      { name: "PayPal", description: "Global payments" },
      { name: "Square", description: "POS integration" },
      { name: "Plaid", description: "Banking data" },
    ],
    color: "brand-purple-500",
  },
  {
    category: "E-commerce",
    items: [
      { name: "Shopify", description: "Store sync" },
      { name: "WooCommerce", description: "WordPress" },
      { name: "Magento", description: "Enterprise" },
      { name: "BigCommerce", description: "Multichannel" },
    ],
    color: "green-400",
  },
  {
    category: "Communication",
    items: [
      { name: "Slack", description: "Team messaging" },
      { name: "Twilio", description: "SMS & voice" },
      { name: "SendGrid", description: "Email delivery" },
      { name: "Mailchimp", description: "Marketing" },
    ],
    color: "yellow-400",
  },
];

const features = [
  {
    icon: "🔌",
    title: "Seamless Connectivity",
    description:
      "Connect any system, anywhere. REST, GraphQL, SOAP, webhooks—we speak every protocol.",
  },
  {
    icon: "🔄",
    title: "Real-time Sync",
    description:
      "Keep data in perfect harmony across all platforms with instant bi-directional sync.",
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    description:
      "OAuth 2.0, API keys, encryption at rest and in transit. Your data stays protected.",
  },
  {
    icon: "📊",
    title: "Monitoring & Logs",
    description:
      "Complete visibility into every request, response, and data transformation.",
  },
  {
    icon: "⚡",
    title: "High Performance",
    description:
      "Optimized for speed with caching, rate limiting, and intelligent retry logic.",
  },
  {
    icon: "🔧",
    title: "Custom Transforms",
    description:
      "Map and transform data between systems with powerful, flexible rules.",
  },
];

const useCases = [
  {
    title: "E-commerce Automation",
    description:
      "Sync orders, inventory, and customers across Shopify, your ERP, and shipping providers.",
    flow: ["Shopify", "→", "API Hub", "→", "ERP + Shipping"],
  },
  {
    title: "Sales Pipeline Sync",
    description:
      "Keep Salesforce, HubSpot, and your internal tools perfectly aligned in real-time.",
    flow: ["CRM", "↔", "API Hub", "↔", "Internal Tools"],
  },
  {
    title: "Payment Reconciliation",
    description:
      "Automatically match Stripe transactions with your accounting software.",
    flow: ["Stripe", "→", "API Hub", "→", "QuickBooks"],
  },
];

export default function IntegrationsPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate integration categories
      gsap.utils.toArray<HTMLElement>(".integration-category").forEach((cat) => {
        gsap.fromTo(
          cat,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 85%",
            },
          }
        );
      });

      // Animate features
      gsap.utils.toArray<HTMLElement>(".integration-feature").forEach((feat) => {
        gsap.fromTo(
          feat,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: feat,
              start: "top 85%",
            },
          }
        );
      });

      // Animate use cases
      gsap.utils.toArray<HTMLElement>(".use-case").forEach((uc, i) => {
        gsap.fromTo(
          uc,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: uc,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <InnerHeader />

      <main className="bg-black min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-cyan-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-brand-purple-500/15 rounded-full blur-[80px]" />
          </div>

          <div className="container-main relative z-10">
            <div className="text-center mb-12">
              <span className="text-sm text-brand-cyan-500 font-semibold tracking-widest uppercase mb-4 block drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                API Integrations & Automation
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Connect{" "}
                <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                  Everything
                </span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Seamless integrations that make your tools talk to each other.
                No more copy-paste. No more data silos. Just pure automation.
              </p>
            </div>

            {/* Interactive Hero Animation */}
            <APIFlowHero />
          </div>
        </section>

        {/* Popular Integrations */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Popular <span className="text-brand-cyan-500">Integrations</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                We integrate with 100+ services. Here are some favorites.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrations.map((category, i) => (
                <div
                  key={i}
                  className="integration-category p-6 rounded-2xl bg-surface-200/50 border border-surface-300/30"
                >
                  <h3 className={`text-lg font-bold mb-4 text-${category.color}`}>
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-neutral-300">{item.name}</span>
                        <span className="text-neutral-500 text-xs">
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for <span className="text-brand-purple-500">Scale</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Enterprise-grade integration infrastructure that handles millions of requests.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="integration-feature p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30 hover:border-brand-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-cyan-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Real-World <span className="text-brand-cyan-500">Use Cases</span>
              </h2>
              <p className="text-neutral-400">
                See how businesses use our integration platform.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {useCases.map((uc, i) => (
                <div
                  key={i}
                  className="use-case p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30"
                >
                  <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{uc.title}</h3>
                      <p className="text-neutral-400">{uc.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono">
                      {uc.flow.map((step, j) => (
                        <span
                          key={j}
                          className={cn(
                            step.includes("→") || step.includes("↔")
                              ? "text-brand-cyan-500"
                              : step === "API Hub"
                              ? "px-3 py-1 rounded-lg bg-brand-cyan-500/20 text-brand-cyan-500"
                              : "px-3 py-1 rounded-lg bg-surface-300/50 text-neutral-300"
                          )}
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Docs Preview */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Developer <span className="text-brand-cyan-500">Friendly</span>
                </h2>
                <p className="text-neutral-400 mb-8 text-lg">
                  Clean, well-documented APIs with SDKs for every major language.
                </p>
                <ul className="space-y-4">
                  {[
                    "RESTful & GraphQL endpoints",
                    "Comprehensive documentation",
                    "SDKs for Node, Python, Ruby, PHP",
                    "Webhooks with retry logic",
                    "Sandbox environment",
                    "24/7 developer support",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-neutral-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand-cyan-500/20 flex items-center justify-center text-brand-cyan-500 text-sm">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan-500/20 to-brand-purple-500/20 rounded-3xl blur-xl" />
                <div className="relative p-6 rounded-3xl bg-surface-200/50 border border-surface-300/30">
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-neutral-500">// Quick start example</div>
                    <div className="text-brand-purple-500">import</div>
                    <div className="pl-2 text-neutral-300">{`{ WebXExpert }`}</div>
                    <div className="text-brand-purple-500">from</div>
                    <div className="text-yellow-400">&apos;@webxexpert/sdk&apos;</div>
                    <div className="mt-4 text-brand-cyan-500">const api = new WebXExpert({"{"}</div>
                    <div className="pl-4 text-neutral-300">apiKey: process.env.API_KEY</div>
                    <div className="text-brand-cyan-500">{"}"})</div>
                    <div className="mt-4 text-brand-cyan-500">await api.sync({"{"}</div>
                    <div className="pl-4 text-yellow-400">from: &apos;shopify&apos;,</div>
                    <div className="pl-4 text-yellow-400">to: &apos;salesforce&apos;,</div>
                    <div className="pl-4 text-yellow-400">data: &apos;orders&apos;</div>
                    <div className="text-brand-cyan-500">{"}"})</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32">
          <div className="container-main text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="text-brand-cyan-500">Automate?</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s map out your integration architecture. Book a free
              technical consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-cyan-500 text-black font-semibold rounded-full hover:bg-brand-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Get Started
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

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

// Interactive Design Canvas Hero Animation
function DesignCanvasHero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = gsap.context(() => {
      // Animate the browser window appearing
      gsap.fromTo(
        ".browser-frame",
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      // Animate design elements appearing
      gsap.fromTo(
        ".design-block",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.8,
        }
      );

      // Animate cursor
      gsap.to(".design-cursor", {
        x: "random(-50, 150)",
        y: "random(-30, 100)",
        duration: 2,
        repeat: -1,
        repeatRefresh: true,
        ease: "power2.inOut",
      });

      // Animate toolbar icons
      gsap.fromTo(
        ".tool-icon",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 1 }
      );

      // Continuous element morphing
      gsap.to(".morph-rect", {
        borderRadius: "50%",
        rotation: 180,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Color palette animation
      gsap.to(".color-dot", {
        scale: 1.3,
        duration: 0.5,
        stagger: { each: 0.2, repeat: -1, yoyo: true },
      });

      // Floating layers animation
      gsap.to(".float-layer", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, canvas);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={canvasRef} className="relative w-full max-w-4xl mx-auto aspect-video">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-cyan-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-purple-500/20 rounded-full blur-3xl" />

      {/* Browser Frame */}
      <div className="browser-frame relative bg-surface-100/80 backdrop-blur-xl rounded-2xl border border-surface-300/50 overflow-hidden shadow-2xl">
        {/* Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-200/50 border-b border-surface-300/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-surface-300/30 rounded-lg text-xs text-neutral-500">
              design-studio.webxexpert.com
            </div>
          </div>
        </div>

        {/* Design Canvas */}
        <div className="flex">
          {/* Toolbar */}
          <div className="w-14 bg-surface-200/30 border-r border-surface-300/20 p-2 space-y-2">
            {["V", "□", "○", "T", "✎", "◐"].map((icon, i) => (
              <div
                key={i}
                className={cn(
                  "tool-icon w-10 h-10 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all",
                  i === 1
                    ? "bg-brand-cyan-500 text-black"
                    : "bg-surface-300/30 text-neutral-400 hover:bg-surface-300/50"
                )}
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-8 min-h-[300px] md:min-h-[400px] relative bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Design Elements */}
            <div className="relative z-10">
              {/* Header Block */}
              <div className="design-block float-layer h-12 w-3/4 bg-gradient-to-r from-brand-cyan-500/40 to-brand-cyan-500/20 rounded-lg mb-4 flex items-center px-4">
                <div className="w-8 h-8 rounded-lg bg-brand-cyan-500/60" />
                <div className="ml-3 space-y-1">
                  <div className="w-16 h-2 bg-white/40 rounded" />
                  <div className="w-10 h-1.5 bg-white/20 rounded" />
                </div>
                <div className="ml-auto flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-2 bg-white/30 rounded" />
                  ))}
                </div>
              </div>

              {/* Hero Section */}
              <div className="design-block float-layer grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-3 p-4">
                  <div className="w-full h-3 bg-white/30 rounded" />
                  <div className="w-4/5 h-3 bg-white/20 rounded" />
                  <div className="w-2/3 h-3 bg-white/10 rounded" />
                  <div className="mt-4 w-24 h-8 bg-brand-cyan-500/50 rounded-lg" />
                </div>
                <div className="morph-rect bg-gradient-to-br from-brand-cyan-500/30 to-brand-purple-500/30 rounded-xl" />
              </div>

              {/* Cards Grid */}
              <div className="design-block float-layer grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 rounded-lg p-3"
                    style={{
                      background: `linear-gradient(135deg, ${
                        i === 1
                          ? "rgba(0,212,255,0.3)"
                          : i === 2
                          ? "rgba(124,58,237,0.3)"
                          : "rgba(0,212,255,0.2)"
                      }, transparent)`,
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 mb-2" />
                    <div className="w-full h-2 bg-white/20 rounded" />
                    <div className="w-2/3 h-1.5 bg-white/10 rounded mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Cursor */}
            <div className="design-cursor absolute top-1/2 left-1/2 pointer-events-none z-20">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-brand-cyan-500">
                <path fill="currentColor" d="M4 4l16 6-6 2-2 6-8-14z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-brand-cyan-500 animate-ping" />
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-48 bg-surface-200/30 border-l border-surface-300/20 p-3 hidden md:block">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-3">
              Properties
            </div>
            <div className="space-y-4">
              {/* Size */}
              <div>
                <div className="text-[10px] text-neutral-600 mb-1">Size</div>
                <div className="flex gap-2">
                  <div className="flex-1 px-2 py-1 bg-surface-300/30 rounded text-xs text-neutral-400">
                    W: 1200
                  </div>
                  <div className="flex-1 px-2 py-1 bg-surface-300/30 rounded text-xs text-neutral-400">
                    H: 800
                  </div>
                </div>
              </div>
              {/* Colors */}
              <div>
                <div className="text-[10px] text-neutral-600 mb-2">Colors</div>
                <div className="flex gap-2">
                  <div className="color-dot w-6 h-6 rounded-full bg-brand-cyan-500 cursor-pointer" />
                  <div className="color-dot w-6 h-6 rounded-full bg-brand-purple-500 cursor-pointer" />
                  <div className="color-dot w-6 h-6 rounded-full bg-white cursor-pointer" />
                  <div className="color-dot w-6 h-6 rounded-full bg-neutral-800 border border-neutral-600 cursor-pointer" />
                </div>
              </div>
              {/* Layers */}
              <div>
                <div className="text-[10px] text-neutral-600 mb-2">Layers</div>
                <div className="space-y-1">
                  {["Header", "Hero", "Cards", "Footer"].map((layer, i) => (
                    <div
                      key={layer}
                      className="flex items-center gap-2 px-2 py-1.5 rounded bg-surface-300/20 text-xs text-neutral-400"
                    >
                      <span className="w-3 h-3 rounded bg-brand-cyan-500/50" />
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🎨",
    title: "Pixel-Perfect Design",
    description:
      "Every element precisely crafted with obsessive attention to detail. We don't do 'good enough'.",
  },
  {
    icon: "✨",
    title: "Motion & Micro-interactions",
    description:
      "GSAP-powered animations that bring interfaces to life and guide users through delightful experiences.",
  },
  {
    icon: "📱",
    title: "Responsive by Default",
    description:
      "Designs that adapt flawlessly from mobile to 4K displays. Every breakpoint considered.",
  },
  {
    icon: "🎯",
    title: "Conversion-Focused",
    description:
      "Beautiful design that drives results. Every layout decision backed by UX research and testing.",
  },
  {
    icon: "🚀",
    title: "Performance Optimized",
    description:
      "Lightweight assets, lazy loading, and optimized animations for blazing-fast experiences.",
  },
  {
    icon: "♿",
    title: "Accessibility First",
    description:
      "WCAG compliant designs ensuring your site is usable by everyone, everywhere.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Research",
    description: "Deep dive into your brand, audience, competitors, and goals to inform design decisions.",
  },
  {
    step: "02",
    title: "Wireframing",
    description: "Low-fidelity layouts to nail down structure and user flows before visual design.",
  },
  {
    step: "03",
    title: "Visual Design",
    description: "High-fidelity mockups with your brand identity, typography, and color system.",
  },
  {
    step: "04",
    title: "Prototyping",
    description: "Interactive prototypes with real animations and transitions for testing.",
  },
  {
    step: "05",
    title: "Refinement",
    description: "Iterative feedback cycles to perfect every detail before development.",
  },
];

const tools = [
  "Figma",
  "Adobe XD",
  "Framer",
  "Principle",
  "After Effects",
  "Illustrator",
  "Photoshop",
  "Spline",
];

export default function WebDesignPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate features on scroll
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });

      // Animate process steps
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
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
                Web Design Services
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Design That{" "}
                <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]">
                  Captivates
                </span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Award-worthy designs with obsessive attention to detail. We craft digital
                experiences that stop scrolling and start converting.
              </p>
            </div>

            {/* Interactive Hero Animation */}
            <DesignCanvasHero />
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Sets Us <span className="text-brand-cyan-500">Apart</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                We don&apos;t just make things look pretty. We create strategic designs
                that drive real business results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="feature-card p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30 hover:border-brand-cyan-500/30 transition-all duration-300 group"
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

        {/* Process */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Design <span className="text-brand-purple-500">Process</span>
              </h2>
              <p className="text-neutral-400">
                A proven methodology that delivers exceptional results every time.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {process.map((step, i) => (
                <div
                  key={i}
                  className={cn(
                    "process-step flex gap-8 mb-12 last:mb-0",
                    i % 2 === 1 && "flex-row-reverse text-right"
                  )}
                >
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0",
                      i % 2 === 0
                        ? "bg-brand-cyan-500 text-black"
                        : "bg-brand-purple-500 text-white"
                    )}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-neutral-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-neutral-500">
                Tools We Master
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((tool, i) => (
                <span
                  key={tool}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105",
                    i % 2 === 0
                      ? "border-brand-cyan-500/30 text-brand-cyan-500 hover:bg-brand-cyan-500/10"
                      : "border-brand-purple-500/30 text-brand-purple-500 hover:bg-brand-purple-500/10"
                  )}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32">
          <div className="container-main text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for a Design That{" "}
              <span className="text-brand-cyan-500">Dominates?</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s create something extraordinary together. Book a free consultation
              to discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-cyan-500 text-black font-semibold rounded-full hover:bg-brand-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Start Your Project
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

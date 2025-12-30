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

// Interactive Code Editor Hero Animation
function CodeEditorHero() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);

  const codeLines = [
    { text: "import { NextApp } from 'next';", color: "text-brand-purple-500" },
    { text: "import { Database } from '@/lib/db';", color: "text-brand-purple-500" },
    { text: "", color: "text-white" },
    { text: "export default async function App() {", color: "text-brand-cyan-500" },
    { text: "  const data = await Database.fetch();", color: "text-white" },
    { text: "  const optimized = transform(data);", color: "text-white" },
    { text: "", color: "text-white" },
    { text: "  return (", color: "text-brand-cyan-500" },
    { text: "    <Experience", color: "text-green-400" },
    { text: '      performance="blazing"', color: "text-yellow-400" },
    { text: '      quality="exceptional"', color: "text-yellow-400" },
    { text: "    />", color: "text-green-400" },
    { text: "  );", color: "text-brand-cyan-500" },
    { text: "}", color: "text-brand-cyan-500" },
  ];

  const terminalLines = [
    { text: "$ npm run build", delay: 0 },
    { text: "✓ Compiled successfully", delay: 0.5 },
    { text: "✓ Linting passed", delay: 0.8 },
    { text: "✓ Type checking complete", delay: 1.1 },
    { text: "✓ Bundle optimized (124kb)", delay: 1.4 },
    { text: "✓ Ready for production!", delay: 1.7 },
  ];

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const ctx = gsap.context(() => {
      // Animate editor window
      gsap.fromTo(
        ".editor-window",
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );

      // Animate terminal window
      gsap.fromTo(
        ".terminal-window",
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );

      // Typewriter effect for code
      const typeLine = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      codeLines.forEach((_, i) => {
        typeLine.to({}, {
          duration: 0.15,
          onComplete: () => setCurrentLine(i),
        });
      });

      // Terminal output animation
      gsap.fromTo(
        ".terminal-line",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.4,
          repeat: -1,
          repeatDelay: 2,
          ease: "power2.out",
          delay: 1,
        }
      );

      // Cursor blink
      gsap.to(".cursor-blink", {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // File tabs animation
      gsap.fromTo(
        ".file-tab",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.8 }
      );

      // Sidebar file icons
      gsap.fromTo(
        ".sidebar-file",
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, stagger: 0.05, delay: 0.6 }
      );

      // Status bar items
      gsap.fromTo(
        ".status-item",
        { y: 5, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 1 }
      );
    }, editor);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={editorRef} className="relative w-full max-w-5xl mx-auto">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-cyan-500/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-brand-purple-500/20 rounded-full blur-[80px]" />

      <div className="grid md:grid-cols-[1fr_1fr] gap-4">
        {/* Code Editor */}
        <div className="editor-window bg-surface-100/90 backdrop-blur-xl rounded-2xl border border-surface-300/50 overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-200/70 border-b border-surface-300/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            {/* File Tabs */}
            <div className="flex gap-1 ml-4">
              {["app.tsx", "api.ts", "utils.ts"].map((file, i) => (
                <div
                  key={file}
                  className={cn(
                    "file-tab px-3 py-1 rounded-t-lg text-xs",
                    i === 0
                      ? "bg-surface-100 text-brand-cyan-500"
                      : "bg-surface-300/30 text-neutral-500"
                  )}
                >
                  {file}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-12 bg-surface-200/30 border-r border-surface-300/20 p-2 hidden md:block">
              {["📁", "🔍", "⚙️", "📦"].map((icon, i) => (
                <div
                  key={i}
                  className="sidebar-file w-8 h-8 rounded flex items-center justify-center text-sm text-neutral-500 hover:bg-surface-300/30 cursor-pointer mb-1"
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div className="flex-1 p-4 font-mono text-sm min-h-[280px] md:min-h-[320px]">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center",
                    i <= currentLine ? "opacity-100" : "opacity-20"
                  )}
                >
                  <span className="w-8 text-neutral-600 text-xs select-none">
                    {i + 1}
                  </span>
                  <span className={line.color}>{line.text}</span>
                  {i === currentLine && (
                    <span className="cursor-blink w-2 h-5 bg-brand-cyan-500 ml-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center gap-4 px-4 py-1.5 bg-brand-cyan-500/10 border-t border-surface-300/20 text-xs">
            <span className="status-item text-brand-cyan-500">TypeScript</span>
            <span className="status-item text-neutral-500">UTF-8</span>
            <span className="status-item text-neutral-500">Ln 14, Col 1</span>
            <span className="status-item ml-auto text-green-400">✓ No issues</span>
          </div>
        </div>

        {/* Terminal */}
        <div className="terminal-window bg-surface-100/90 backdrop-blur-xl rounded-2xl border border-surface-300/50 overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-200/70 border-b border-surface-300/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-neutral-500 ml-4">Terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="p-4 font-mono text-sm min-h-[280px] md:min-h-[320px] bg-black/50">
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "terminal-line mb-2",
                  line.text.includes("✓")
                    ? "text-green-400"
                    : line.text.startsWith("$")
                    ? "text-brand-cyan-500"
                    : "text-neutral-400"
                )}
              >
                {line.text}
              </div>
            ))}
            <div className="flex items-center text-brand-cyan-500 mt-4">
              <span>$</span>
              <span className="cursor-blink w-2 h-4 bg-brand-cyan-500 ml-2" />
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="px-4 py-3 bg-surface-200/30 border-t border-surface-300/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-cyan-500">98</div>
                <div className="text-xs text-neutral-500">Performance</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">100</div>
                <div className="text-xs text-neutral-500">Accessibility</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-purple-500">99</div>
                <div className="text-xs text-neutral-500">Best Practices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const technologies = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "GSAP"],
    color: "brand-cyan-500",
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis"],
    color: "brand-purple-500",
  },
  {
    category: "Infrastructure",
    items: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    color: "green-400",
  },
];

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast Performance",
    description:
      "Sub-second load times with code splitting, lazy loading, and edge caching.",
  },
  {
    icon: "🔒",
    title: "Security First",
    description:
      "Enterprise-grade security with OWASP compliance, encryption, and regular audits.",
  },
  {
    icon: "📈",
    title: "Built to Scale",
    description:
      "Architecture designed to handle millions of users without breaking a sweat.",
  },
  {
    icon: "🧪",
    title: "Thoroughly Tested",
    description:
      "Comprehensive test coverage with unit, integration, and E2E testing.",
  },
  {
    icon: "📱",
    title: "Progressive Web Apps",
    description:
      "Offline-capable, installable apps with native-like experience.",
  },
  {
    icon: "♻️",
    title: "Clean Code",
    description:
      "Maintainable, well-documented code following industry best practices.",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<200ms", label: "Response Time" },
  { value: "50+", label: "Projects Shipped" },
  { value: "0", label: "Security Breaches" },
];

export default function WebDevelopmentPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate tech categories
      gsap.utils.toArray<HTMLElement>(".tech-category").forEach((cat, i) => {
        gsap.fromTo(
          cat,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 85%",
            },
          }
        );
      });

      // Animate features
      gsap.utils.toArray<HTMLElement>(".dev-feature").forEach((feat) => {
        gsap.fromTo(
          feat,
          { y: 50, opacity: 0 },
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

      // Animate stats
      gsap.fromTo(
        ".stat-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
          },
        }
      );
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
                Web Development Services
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Code That{" "}
                <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                  Performs
                </span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Modern, scalable web applications built with cutting-edge technology.
                Performance isn&apos;t an afterthought—it&apos;s our foundation.
              </p>
            </div>

            {/* Interactive Hero Animation */}
            <CodeEditorHero />
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section py-16 bg-surface-100/30">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-cyan-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Technology <span className="text-brand-cyan-500">Stack</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                We choose the best tool for each job, not the trendiest.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="tech-category p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30"
                >
                  <h3 className={`text-xl font-bold mb-6 text-${tech.color}`}>
                    {tech.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 rounded-lg bg-surface-300/30 text-neutral-300 text-sm hover:bg-surface-300/50 transition-colors"
                      >
                        {item}
                      </span>
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
                Why Choose <span className="text-brand-purple-500">Us</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Every line of code is written with purpose and precision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="dev-feature p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30 hover:border-brand-cyan-500/30 transition-all duration-300 group"
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

        {/* Code Quality Section */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Quality Over{" "}
                  <span className="text-brand-cyan-500">Quantity</span>
                </h2>
                <p className="text-neutral-400 mb-8 text-lg">
                  We don&apos;t cut corners. Every project includes:
                </p>
                <ul className="space-y-4">
                  {[
                    "Comprehensive code reviews",
                    "Automated testing pipelines",
                    "Performance monitoring",
                    "Security scanning",
                    "Detailed documentation",
                    "24/7 monitoring & support",
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
                <div className="relative p-8 rounded-3xl bg-surface-200/50 border border-surface-300/30">
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-neutral-500">// Our code standards</div>
                    <div className="text-brand-cyan-500">const quality = {"{"}</div>
                    <div className="pl-4 text-yellow-400">testCoverage: &quot;95%+&quot;,</div>
                    <div className="pl-4 text-yellow-400">lighthouse: &quot;90+&quot;,</div>
                    <div className="pl-4 text-yellow-400">accessibility: &quot;WCAG AA&quot;,</div>
                    <div className="pl-4 text-yellow-400">security: &quot;OWASP Top 10&quot;,</div>
                    <div className="pl-4 text-yellow-400">documentation: &quot;comprehensive&quot;</div>
                    <div className="text-brand-cyan-500">{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-surface-100/30 to-black">
          <div className="container-main text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="text-brand-cyan-500">Ship?</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s build something that scales. Book a technical consultation
              to discuss your project architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-cyan-500 text-black font-semibold rounded-full hover:bg-brand-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Start Building
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                See Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

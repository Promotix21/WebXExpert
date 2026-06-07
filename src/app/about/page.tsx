"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { InnerHeader } from "@/components/layout/InnerHeader";
import { Footer } from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  {
    idx: "01",
    title: "System Architecture",
    desc: "Domain-driven service design, scalable data flows, and platform-level abstractions for products built to grow.",
    tags: ["DDD", "Event-driven", "Multi-tenant"],
    bg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=70",
  },
  {
    idx: "02",
    title: "AI Product Engineering",
    desc: "Agentic workflows, LLM orchestration, retrieval pipelines, and AI-native product surfaces with measurable outcomes.",
    tags: ["Agents", "RAG", "Bedrock", "NIMs"],
    bg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=70",
  },
  {
    idx: "03",
    title: "Full Stack Engineering",
    desc: "Production systems end-to-end — typed APIs, resilient data layers, and cinematic frontends that hold up under load.",
    tags: ["Next.js", "Node", "PHP", "Python"],
    bg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=70",
  },
  {
    idx: "04",
    title: "Automation Strategy",
    desc: "Workflow engines, multi-channel pipelines, and operational automation that compress manual work into background tasks.",
    tags: ["Queues", "Webhooks", "Schedulers"],
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=70",
  },
  {
    idx: "05",
    title: "Cloud & Infrastructure",
    desc: "AWS, Cloudflare, Azure DevOps — observability, CI/CD, and edge delivery for systems that don't fall over.",
    tags: ["AWS", "Cloudflare", "CI/CD"],
    bg: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=70",
  },
  {
    idx: "06",
    title: "Cinematic Frontend",
    desc: "GSAP & ScrollTrigger choreography, smooth-scroll architecture, and immersive interaction systems engineered for conversion.",
    tags: ["GSAP", "Lenis", "WebGL"],
    bg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=70",
  },
];

const projects = [
  {
    idx: "PRJ-01",
    category: "AI Developer Platform",
    title: "Cortex AI CLI System",
    desc: "Advanced AI-native CLI environment — built for intelligent workflows, automation orchestration, and developer-focused AI operations. Streaming agents, tool-calling, deterministic replay.",
    role: "System Architect · AI Workflow Engineer · Full Stack Developer",
    visual: "terminal",
  },
  {
    idx: "PRJ-02",
    category: "Autonomous SEO Platform",
    title: "RankOps — Autonomous SEO & AI Visibility",
    desc: "AI-powered autonomous SEO and AEO system focused on semantic optimization, AI discoverability, automated content intelligence, and scalable search visibility workflows.",
    role: "Product Architect · AI Systems Engineer · Backend Developer",
    visual: "seo",
    reverse: true,
  },
  {
    idx: "PRJ-03",
    category: "Automation Hub",
    title: "Nexara — Automation Hub",
    desc: "Centralized automation platform integrating WhatsApp, Facebook, Instagram, DMs, conversational workflows, lead handling, notification systems, and operational automation pipelines.",
    role: "Automation Architect · Full Stack Developer · AI Workflow Engineer",
    visual: "nexara",
  },
  {
    idx: "PRJ-04",
    category: "Business Platform",
    title: "SynergyHub — Business Platform & App Ecosystem",
    desc: "A scalable operational ecosystem with connected application workflows, backend systems, business automation, dashboard infrastructure, and platform-level architecture.",
    role: "Full Stack Developer · System Architect · Product Engineer",
    visual: "synergy",
    reverse: true,
  },
  {
    idx: "PRJ-05",
    category: "Operational Workflow",
    title: "AI-Powered Operational Workflow Systems",
    desc: "Scalable workflow-driven platforms with authentication systems, dashboard architecture, monetization workflows, operational automation, role-based systems, and business process optimization.",
    role: "System Architect · Backend Engineer · Workflow Designer",
    visual: "workflow",
  },
  {
    idx: "PRJ-06",
    category: "Cinematic Frontend",
    title: "Premium Cinematic Digital Experiences",
    desc: "High-end frontend systems using GSAP, ScrollTrigger, smooth-scroll architecture, cinematic motion design, immersive storytelling, and conversion-focused interaction engineering.",
    role: "Creative Frontend Engineer · Motion Systems Architect",
    visual: "cinematic",
    reverse: true,
  },
];

const philosophy = [
  { num: "P.01", title: "Systems, not features.", body: "Every interface is the surface of a system. I design the data shape, the lifecycle, and the failure modes before writing a single component." },
  { num: "P.02", title: "Operational by default.", body: "Logs, traces, evals, cost. If you can't observe it, you can't run it. Observability is a feature, not an afterthought." },
  { num: "P.03", title: "AI as infrastructure.", body: "Agents are services. They version, they fail gracefully, they have SLAs. Treat them like databases, not magic." },
  { num: "P.04", title: "Motion with intent.", body: "Every animation should clarify hierarchy, signal causality, or set pace. Otherwise it's noise — and noise is the enemy of craft." },
];

const stack = [
  { label: "// frontend", items: ["Next.js", "React", "TypeScript", "JavaScript", "GSAP", "ScrollTrigger", "Lenis", "Tailwind"] },
  { label: "// backend", items: ["Node.js", "PHP", "Python", "REST / GraphQL", "MySQL", "PostgreSQL", "MongoDB", "Redis"] },
  { label: "// cloud / infra", items: ["AWS", "Cloudflare", "Azure DevOps", "GitHub Actions", "Linux / Bash", "Docker", "CI/CD", "Observability"] },
  { label: "// ai systems", items: ["AWS Bedrock", "NVIDIA NIMs", "Agentic Workflows", "RAG Pipelines", "Conversational AI", "Prompt Engineering", "Tool Calling", "Evals"] },
];

const infra = [
  { tag: "EDGE", name: "Cloudflare", desc: "DNS, CDN, Workers, Pages — global edge delivery.", level: "L1" },
  { tag: "CLOUD", name: "AWS · EC2 · S3 · Lambda", desc: "Compute, storage, and serverless event handlers.", level: "L2" },
  { tag: "AI", name: "AWS Bedrock · NIMs", desc: "Hosted models, embeddings, agent runtime.", level: "L2" },
  { tag: "CI/CD", name: "GitHub Actions · Azure DevOps", desc: "Pipeline-driven deploys, env promotion, rollback.", level: "L3" },
  { tag: "DATA", name: "PostgreSQL · MongoDB · Redis", desc: "Relational, document, and cache — chosen per workload.", level: "L3" },
  { tag: "OBS", name: "Logs · Traces · Evals", desc: "End-to-end visibility across services and agents.", level: "L4" },
];

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(".hero-copy > *", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2,
      });
      gsap.fromTo(".hud-panel", { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.5,
      });

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".cap-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: (i % 3) * 0.1,
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.fromTo(row, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".phil-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: i * 0.08,
        });
      });

      gsap.utils.toArray<HTMLElement>(".stack-col").forEach((col, i) => {
        gsap.fromTo(col, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: col, start: "top 88%" },
          delay: i * 0.1,
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

        .jb-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        /* Blobs */
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; pointer-events: none; }
        .blob-1 { width: min(60vw, 900px); height: min(60vw, 900px); top: -10%; left: -8%;
          background: radial-gradient(circle, #22d3ee 0%, #0891b2 40%, transparent 70%);
          animation: blobFloat1 22s ease-in-out infinite; }
        .blob-2 { width: min(50vw, 760px); height: min(50vw, 760px); bottom: -15%; right: -8%;
          background: radial-gradient(circle, #7c3aed 0%, #4c1d95 50%, transparent 75%);
          animation: blobFloat2 28s ease-in-out infinite; opacity: 0.45; }
        .blob-3 { width: min(35vw, 520px); height: min(35vw, 520px); top: 35%; left: 38%;
          background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
          animation: blobFloat3 18s ease-in-out infinite; opacity: 0.3; }
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(6%,8%) scale(1.08)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-8%,-6%) scale(1.12)} }
        @keyframes blobFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-10%,10%) scale(0.85)} }

        /* Status dot */
        .status-dot { width:6px; height:6px; border-radius:50%; background:#22c55e;
          box-shadow: 0 0 8px #22c55e; animation: statusPulse 2s ease-in-out infinite; }
        @keyframes statusPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }

        /* HUD panel */
        .hud-panel { background: rgba(10,11,16,0.8); border: 1px solid rgba(34,211,238,0.15);
          border-radius: 12px; padding: 20px; backdrop-filter: blur(12px);
          font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.05em; }
        .hud-head { display:flex; justify-content:space-between; color: rgba(34,211,238,0.6);
          font-size:10px; margin-bottom:16px; padding-bottom:12px;
          border-bottom: 1px solid rgba(255,255,255,0.05); }
        .hud-row { display:grid; grid-template-columns:1fr auto auto; gap:12px; align-items:center;
          padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .hud-row .k { color:#6b7280; }
        .hud-row .v { color:#22d3ee; font-weight:500; }
        .hud-row .n { color:rgba(34,211,238,0.5); font-size:10px; }
        .hud-bar { height:3px; background:rgba(255,255,255,0.06); border-radius:2px; overflow:hidden; }
        .hud-bar i { display:block; height:100%; background:linear-gradient(90deg,#22d3ee,#7c3aed);
          border-radius:2px; width:71%; }
        .hud-foot { display:flex; justify-content:space-between; color:#3f444d; font-size:10px; margin-top:14px; }

        /* HUD label eyebrow */
        .hud-label { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.18em;
          text-transform:uppercase; color:#6b7280; display:inline-flex; align-items:center; gap:10px; }
        .hud-label::before { content:""; width:24px; height:1px; background:#22d3ee; display:inline-block; }

        /* Capability cards */
        .cap-card { position:relative; overflow:hidden; border-radius:16px;
          border: 1px solid rgba(255,255,255,0.06); background:#0a0b10;
          transition: border-color 0.3s, transform 0.3s; }
        .cap-card:hover { border-color: rgba(34,211,238,0.35); transform: translateY(-4px); }
        .cap-bg { position:absolute; inset:0; background-size:cover; background-position:center;
          opacity:0.08; transition:opacity 0.4s; filter:saturate(0.3) brightness(0.7); }
        .cap-card:hover .cap-bg { opacity:0.15; }
        .cap-body { position:relative; z-index:1; padding:28px; display:flex; flex-direction:column; gap:14px; }
        .cap-idx { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(34,211,238,0.5);
          letter-spacing:0.15em; }
        .cap-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:4px; }
        .cap-tag { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.1em;
          padding:3px 10px; border-radius:4px; background:rgba(34,211,238,0.08);
          color:rgba(34,211,238,0.7); border: 1px solid rgba(34,211,238,0.15); }

        /* Project layout */
        .project-row { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:center; }
        .project-row.reverse .proj-copy { order:2; }
        .project-row.reverse .proj-vis { order:1; }
        @media(max-width:860px) {
          .project-row { grid-template-columns:1fr; }
          .project-row.reverse .proj-copy { order:1; }
          .project-row.reverse .proj-vis { order:2; }
        }
        .proj-vis { position:relative; aspect-ratio:16/10; background:rgba(10,11,16,0.9);
          border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; }
        .vis-corner { position:absolute; font-family:'JetBrains Mono',monospace; font-size:9px;
          color:#3f444d; letter-spacing:0.12em; z-index:10; }
        .vis-corner.tl { top:12px; left:14px; }
        .vis-corner.tr { top:12px; right:14px; }

        /* Terminal */
        .term { font-family:'JetBrains Mono',monospace; font-size:10px; line-height:1.7;
          padding:16px; color:#aab2bf; position:absolute; inset:36px 16px 16px; overflow:hidden; }
        .term .cur { display:inline-block; width:7px; height:13px; background:#22d3ee;
          vertical-align:text-bottom; animation:blink 1.1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* SEO signal */
        .sig { font-family:'JetBrains Mono',monospace; font-size:11px; position:absolute;
          inset:36px 16px 16px; display:flex; flex-direction:column; gap:10px; color:#6b7280; }
        .sig .scan { height:1px; background:linear-gradient(90deg,transparent,#22d3ee,transparent);
          animation:scan 2.5s ease-in-out infinite; }
        @keyframes scan { 0%,100%{opacity:0;transform:scaleX(0)} 50%{opacity:1;transform:scaleX(1)} }
        .sig-bars { display:flex; align-items:flex-end; gap:3px; height:32px; margin-top:4px; }
        .sig-bars i { width:8px; background:rgba(34,211,238,0.5); border-radius:2px 2px 0 0;
          animation:barGrow 1.8s ease-in-out infinite alternate; }
        .sig-bars i:nth-child(1){height:40%;animation-delay:0s}
        .sig-bars i:nth-child(2){height:70%;animation-delay:.15s}
        .sig-bars i:nth-child(3){height:55%;animation-delay:.3s}
        .sig-bars i:nth-child(4){height:90%;animation-delay:.45s}
        .sig-bars i:nth-child(5){height:65%;animation-delay:.6s}
        .sig-bars i:nth-child(6){height:80%;animation-delay:.75s}
        .sig-bars i:nth-child(7){height:45%;animation-delay:.9s}
        @keyframes barGrow { from{opacity:.5} to{opacity:1;transform:scaleY(1.15)} }

        /* Synergy grid */
        .synergy-grid { position:absolute; inset:36px 16px 16px;
          display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(3,1fr); gap:6px; }
        .syn-cell { border:1px solid rgba(255,255,255,0.06); padding:8px;
          font-family:'JetBrains Mono',monospace; font-size:9px; color:#6b7280; border-radius:4px; }
        .syn-cell.core { border-color:rgba(34,211,238,0.35); color:#22d3ee;
          background:rgba(34,211,238,0.04); }
        .syn-dot { color:#22d3ee; animation:synPulse 2s ease-in-out infinite; }
        .syn-dot:nth-child(1){animation-delay:0s} .syn-dot:nth-child(2){animation-delay:.2s}
        @keyframes synPulse { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* SVG edges */
        .edge { stroke:rgba(34,211,238,0.2); stroke-width:1; }
        .node { fill:#22d3ee; }
        .node-pulse { animation:nodePulse 2s ease-in-out infinite; }
        @keyframes nodePulse { 0%,100%{r:5;opacity:1} 50%{r:8;opacity:.5} }

        /* Reel */
        .reel { position:absolute; inset:36px 0 0; overflow:hidden; display:flex; flex-direction:column; gap:6px; padding:0 8px; }
        .reel-lane { overflow:hidden; flex:1; }
        .reel-track { display:flex; gap:6px; animation:reelScroll 18s linear infinite; }
        .reel-track.l2 { animation-direction:reverse; animation-duration:22s; }
        .reel-track.l3 { animation-duration:16s; }
        @keyframes reelScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .reel-card { flex-shrink:0; width:120px; height:60px; border:1px solid rgba(255,255,255,0.06);
          border-radius:6px; background:#0a0b10; padding:8px; font-family:'JetBrains Mono',monospace; font-size:9px; }
        .reel-card.accent { border-color:rgba(34,211,238,0.3); background:rgba(34,211,238,0.04); color:#22d3ee; }
        .reel-card.thumb { background:rgba(255,255,255,0.02); }
        .reel-card .tag { color:#3f444d; font-size:8px; margin-bottom:3px; }
        .reel-card .title { color:#aab2bf; font-size:9px; line-height:1.3; }
        .reel-card .bar { margin-top:6px; height:2px; background:rgba(34,211,238,0.2); border-radius:1px; }
        .reel-card .bar i { display:block; height:100%; width:70%; background:#22d3ee; border-radius:1px; }
        .reel-overlay { position:absolute; top:8px; right:12px; font-family:'JetBrains Mono',monospace;
          font-size:9px; color:rgba(239,68,68,0.8); letter-spacing:.12em; }
        .reel-corner-rec { position:absolute; bottom:8px; right:12px; font-family:'JetBrains Mono',monospace;
          font-size:8px; color:#3f444d; letter-spacing:.1em; }

        /* Workflow nodes */
        .flow-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:2px; }
        .flow-node { border:1px solid rgba(255,255,255,0.06); padding:20px 16px;
          display:flex; flex-direction:column; gap:6px;
          font-family:'JetBrains Mono',monospace; }
        .flow-node .num { font-size:9px; color:rgba(34,211,238,0.5); letter-spacing:.15em; }
        .flow-node .label { font-size:13px; color:#e9eef5; font-weight:500; line-height:1.3; }
        .flow-node .sub { font-size:10px; color:#6b7280; }
        @media(max-width:860px) { .flow-grid { grid-template-columns:1fr 1fr; } }

        /* Infra row */
        .infra-row { display:flex; align-items:flex-start; gap:16px; padding:18px 0;
          border-bottom:1px solid rgba(255,255,255,0.05); }
        .infra-tag { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.15em;
          padding:4px 8px; border:1px solid rgba(34,211,238,0.2); color:rgba(34,211,238,0.7);
          border-radius:4px; flex-shrink:0; width:52px; text-align:center; }
        .infra-level { font-family:'JetBrains Mono',monospace; font-size:10px; color:#3f444d;
          margin-left:auto; flex-shrink:0; padding-top:2px; }

        /* Philosophy */
        .phil-card { padding:32px; border:1px solid rgba(255,255,255,0.06); border-radius:16px;
          background:#0a0b10; transition:border-color .3s,background .3s; }
        .phil-card:hover { border-color:rgba(34,211,238,0.25); background:rgba(34,211,238,0.03); }
        .phil-num { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(34,211,238,0.5);
          letter-spacing:.15em; margin-bottom:16px; }

        /* Section separator */
        .sec-sep { border-top: 1px solid rgba(255,255,255,0.05); }
      `}</style>

      <InnerHeader />

      <main ref={mainRef} className="bg-black min-h-screen relative overflow-x-hidden">

        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
          {/* Blobs */}
          <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          {/* Dot grid */}
          <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          }} />

          <div className="container-main relative z-10 w-full">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-center">

              {/* Copy */}
              <div className="hero-copy flex flex-col gap-8">
                <span className="hud-label">001 / IDENTITY · NODE-RK-01</span>

                <h1 style={{ fontSize: "clamp(48px,8vw,110px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
                  <span style={{ display: "block" }}>Engineering</span>
                  <span style={{ display: "block" }}>modern{" "}
                    <em style={{ color: "#22d3ee", fontStyle: "normal" }}>digital</em>
                  </span>
                  <span style={{ display: "block" }}>
                    <em style={{ color: "#22d3ee", fontStyle: "normal" }}>systems</em>.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
                  I architect AI-native platforms — cinematic frontends, scalable backends, agentic workflows,
                  and operational intelligence. Built for scale, automation, and future-ready digital ecosystems.
                </p>

                <div className="jb-mono text-xs text-neutral-500 flex flex-col gap-3" style={{ letterSpacing: "0.04em" }}>
                  <div className="flex gap-4 flex-wrap">
                    <span className="text-neutral-300">ROLE</span>
                    <strong className="font-medium" style={{ color: "#22d3ee" }}>System Architect · Full Stack · AI Product Engineer</strong>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <span className="text-neutral-300">FOCUS</span>
                    <strong className="font-medium" style={{ color: "#22d3ee" }}>AI Systems · Automation · Cloud Architecture · Cinematic UX</strong>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <span className="text-neutral-300">STATUS</span>
                    <strong className="font-medium" style={{ color: "#22d3ee" }}>Accepting select engagements · Remote / Global</strong>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <span className="text-neutral-300">BASE</span>
                    <strong className="font-medium" style={{ color: "#22d3ee" }}>Jamshedpur, India</strong>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                    style={{ background: "linear-gradient(135deg,#22d3ee,#06b6d4)" }}>
                    Start a Project →
                  </Link>
                  <Link href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white border transition-all duration-300 hover:bg-white/5"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                    View Work →
                  </Link>
                </div>
              </div>

              {/* HUD Panel */}
              <aside className="hud-panel hidden lg:block">
                <div className="hud-head">
                  <span>SYS://node-rk-01.runtime</span>
                  <span style={{ color: "#22c55e" }}>ONLINE</span>
                </div>
                {[
                  { k: "uptime", v: "99.98%", n: "↑" },
                  { k: "latency", v: "9.4ms", n: "stable" },
                  { k: "throughput", v: "4,820/s", n: "↑" },
                  { k: "deploys", v: "412 this quarter", n: "ci/cd" },
                  { k: "agents", v: "24 running", n: "healthy" },
                ].map((r) => (
                  <div key={r.k} className="hud-row">
                    <span className="k">{r.k}</span>
                    <span className="v">{r.v}</span>
                    <span className="n">{r.n}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14 }}>
                  <div className="jb-mono flex justify-between mb-1.5" style={{ fontSize: 10, color: "#6b7280", letterSpacing: ".14em" }}>
                    <span>SYSTEM LOAD</span><span>71%</span>
                  </div>
                  <div className="hud-bar"><i /></div>
                </div>
                <div className="hud-foot">
                  <span>Jamshedpur, India</span>
                  <span>build · 2026</span>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 jb-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 10 }}>
                  <div className="status-dot" />
                  <span style={{ color: "#6b7280" }}>AVAILABLE / 2026 Q3</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ─── CAPABILITIES ─── */}
        <section className="py-24 md:py-36 sec-sep">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16">
              <div className="flex flex-col gap-5">
                <span className="hud-label">002 / CAPABILITIES</span>
                <h2 className="reveal" style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "22ch" }}>
                  A unified engineering surface — from agents to infrastructure.
                </h2>
              </div>
              <p className="reveal text-lg text-neutral-400 leading-relaxed max-w-xl">
                Cross-disciplinary execution across system design, AI engineering, frontend craft, and cloud operations —
                built to ship production systems, not prototypes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((cap) => (
                <div key={cap.idx} className="cap-card">
                  <div className="cap-bg" style={{ backgroundImage: `url('${cap.bg}')` }} />
                  <div className="cap-body">
                    <span className="cap-idx">{cap.idx}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", color: "#e9eef5" }}>{cap.title}</h3>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{cap.desc}</p>
                    <div className="cap-tags">
                      {cap.tags.map((t) => <span key={t} className="cap-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SELECTED WORK ─── */}
        <section className="py-24 md:py-36 sec-sep">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16">
              <div className="flex flex-col gap-5">
                <span className="hud-label">003 / SELECTED WORK · 2024–2026</span>
                <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "22ch" }}>
                  Systems shipped — not prototypes paraded.
                </h2>
              </div>
              <p className="reveal text-lg text-neutral-400 leading-relaxed max-w-xl">
                Six engagements across AI-native CLIs, autonomous SEO platforms, automation hubs,
                business ecosystems, operational workflows, and cinematic experiences.
              </p>
            </div>

            <div className="flex flex-col gap-24">
              {projects.map((proj) => (
                <div key={proj.idx} className={`project-row${proj.reverse ? " reverse" : ""}`}>
                  {/* Copy */}
                  <div className="proj-copy flex flex-col gap-5">
                    <div className="flex items-center gap-3 jb-mono" style={{ fontSize: 11, color: "#6b7280", letterSpacing: ".12em" }}>
                      <span style={{ color: "#22d3ee" }}>{proj.idx}</span>
                      <span>·</span>
                      <span>{proj.category}</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 500, letterSpacing: "-0.01em", color: "#e9eef5", lineHeight: 1.2 }}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.65 }}>{proj.desc}</p>
                    <p className="jb-mono" style={{ fontSize: 11, color: "#3f444d", letterSpacing: ".08em" }}>
                      ROLE / <strong style={{ color: "#aab2bf", fontWeight: 500 }}>{proj.role}</strong>
                    </p>
                  </div>

                  {/* Visual */}
                  <div className="proj-vis">
                    <span className="vis-corner tl">{proj.idx.toLowerCase()} · {proj.visual}</span>
                    <span className="vis-corner tr">{proj.visual === "terminal" ? "v0.42" : proj.visual === "seo" ? "live" : proj.visual === "nexara" ? "●●●" : proj.visual === "synergy" ? "multi-app" : proj.visual === "workflow" ? "42 nodes" : "60fps"}</span>
                    {proj.visual === "terminal" && <TerminalVis />}
                    {proj.visual === "seo" && <SeoVis />}
                    {proj.visual === "nexara" && <NexaraVis />}
                    {proj.visual === "synergy" && <SynergyVis />}
                    {proj.visual === "workflow" && <WorkflowVis />}
                    {proj.visual === "cinematic" && <CinematicVis />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AI & AUTOMATION ─── */}
        <section className="py-24 md:py-36 sec-sep">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14">
              <div className="flex flex-col gap-5">
                <span className="hud-label">004 / AI & AUTOMATION</span>
                <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  Agentic systems with measurable operational impact.
                </h2>
              </div>
              <p className="reveal text-lg text-neutral-400 leading-relaxed max-w-xl">
                I build AI as production infrastructure — agent orchestration, retrieval pipelines, tool execution,
                and human-in-the-loop control surfaces. Not demos. Systems that compound.
              </p>
            </div>

            <div className="reveal flow-grid" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
              {[
                { num: "01 / INGEST", label: "Multi-channel signals", sub: "webhooks · streams" },
                { num: "02 / ROUTE", label: "Intent classifier", sub: "llm · rules" },
                { num: "03 / REASON", label: "Agent orchestrator", sub: "plan · tools · memory" },
                { num: "04 / EXECUTE", label: "Tool calls + actions", sub: "apis · queues" },
                { num: "05 / OBSERVE", label: "Traces & evals", sub: "cost · quality · drift" },
              ].map((node) => (
                <div key={node.num} className="flow-node">
                  <span className="num">{node.num}</span>
                  <span className="label">{node.label}</span>
                  <span className="sub">{node.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PHILOSOPHY ─── */}
        <section className="py-24 md:py-36 sec-sep">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14">
              <div className="flex flex-col gap-5">
                <span className="hud-label">005 / ENGINEERING PHILOSOPHY</span>
                <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  Architecture first. Cinematic second. Production always.
                </h2>
              </div>
              <p className="reveal text-lg text-neutral-400 leading-relaxed max-w-xl">
                Four principles that shape every system shipped — from the data model to the last keyframe.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {philosophy.map((p) => (
                <div key={p.num} className="phil-card phil-card">
                  <div className="phil-num">{p.num}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: "#e9eef5", marginBottom: 10, letterSpacing: "-0.01em" }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TECH STACK ─── */}
        <section className="py-24 md:py-36 sec-sep">
          <div className="container-main">
            <div className="flex flex-col gap-5 mb-14">
              <span className="hud-label">006 / TECHNICAL STACK</span>
              <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                A toolkit forged for production systems.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
              {stack.map((col) => (
                <div key={col.label} className="stack-col" style={{ background: "#050507", padding: "28px 24px" }}>
                  <h4 className="jb-mono mb-5" style={{ fontSize: 11, color: "#22d3ee", letterSpacing: ".15em" }}>{col.label}</h4>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item} className="jb-mono" style={{ fontSize: 12, color: "#6b7280", letterSpacing: ".04em", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(34,211,238,0.4)", flexShrink: 0, display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INFRASTRUCTURE ─── */}
        <section className="py-24 md:py-36 sec-sep">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14">
              <div className="flex flex-col gap-5">
                <span className="hud-label">007 / INFRASTRUCTURE</span>
                <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  Edge to core — built for uptime under real load.
                </h2>
              </div>
              <p className="reveal text-lg text-neutral-400 leading-relaxed max-w-xl">
                Topology, CI/CD, observability — engineered as part of the product, not bolted on afterwards.
              </p>
            </div>
            <div className="reveal" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
              {infra.map((row) => (
                <div key={row.tag} className="infra-row" style={{ padding: "18px 24px" }}>
                  <span className="infra-tag">{row.tag}</span>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="jb-mono" style={{ fontSize: 13, color: "#e9eef5", fontWeight: 500 }}>{row.name}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{row.desc}</div>
                  </div>
                  <span className="infra-level">{row.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT CTA ─── */}
        <section className="py-24 md:py-36 sec-sep relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 70%)",
          }} />
          <div className="container-main relative z-10 max-w-3xl">
            <span className="hud-label">008 / CONTACT · HANDSHAKE</span>
            <h2 className="mt-6 mb-6" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.0 }}>
              Let's architect{" "}
              <em style={{ color: "#22d3ee", fontStyle: "normal" }}>something</em>{" "}
              that compounds.
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-xl">
              Selectively taking on AI-native platforms, automation systems, and cinematic product engagements.
              Reach out — concise briefs preferred.
            </p>
            <div className="flex gap-4 flex-wrap mb-6">
              <a href="https://wa.me/918789389941" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                style={{ background: "linear-gradient(135deg,#22d3ee,#06b6d4)" }}>
                Open WhatsApp · +91 87893 89941 →
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white border transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                Send a Brief →
              </Link>
            </div>
            <div className="jb-mono flex gap-6 flex-wrap" style={{ fontSize: 11, letterSpacing: ".12em", color: "#3f444d" }}>
              <span>RESP &lt; 24h</span><span>·</span><span>REMOTE / GLOBAL</span><span>·</span><span>NDA ON REQUEST</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

/* ─── Visual Panel Components ─── */

function TerminalVis() {
  return (
    <div className="term">
      <div><span style={{ color: "#22d3ee" }}>cortex</span> <span style={{ color: "#6b7280" }}>~/</span> <span style={{ color: "#e9eef5" }}>$</span> agent run --plan refactor</div>
      <div style={{ color: "#6b7280" }}>→ planning [████████████] 12/12 steps</div>
      <div style={{ color: "#6b7280" }}>→ exec&nbsp;&nbsp;&nbsp;[██████░░░░░░] tool: code.edit</div>
      <div style={{ color: "#7c3aed" }}>▌ writing src/services/auth.ts</div>
      <div style={{ color: "#22c55e" }}>✓ tests passed (38)</div>
      <div style={{ color: "#6b7280" }}>→ tokens: 18,420 / cost: $0.21</div>
      <div style={{ color: "#e9eef5", marginTop: 6 }}>▍<span className="cur" /></div>
    </div>
  );
}

function SeoVis() {
  return (
    <div className="sig">
      <div className="scan" />
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>SERP / google</span><span style={{ color: "#22d3ee" }}>↑ 12 → 03</span></div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>AEO / chatgpt</span><span style={{ color: "#22d3ee" }}>cited · 8 q&apos;s</span></div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>AEO / perplexity</span><span style={{ color: "#22d3ee" }}>cited · 14 q&apos;s</span></div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>semantic clusters</span><span style={{ color: "#e9eef5" }}>42 active</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>auto-briefs / wk</span><span style={{ color: "#e9eef5" }}>128</span></div>
      <div className="sig-bars">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
    </div>
  );
}

function NexaraVis() {
  return (
    <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: "36px 16px 16px", width: "calc(100% - 32px)", height: "calc(100% - 52px)" }} fill="none">
      <g>
        {[["60,60","200,150"],["60,150","200,150"],["60,240","200,150"],["200,150","340,80"],["200,150","340,150"],["200,150","340,220"]].map(([a,b],i) => (
          <line key={i} className="edge" x1={a.split(",")[0]} y1={a.split(",")[1]} x2={b.split(",")[0]} y2={b.split(",")[1]} />
        ))}
      </g>
      <g fontFamily="'JetBrains Mono',monospace" fontSize="10">
        {[["10,44","60","60","WhatsApp"],["10,134","60","154","Instagram"],["10,224","60","244","Facebook"]].map(([rect,cx,cy,label]) => (
          <g key={label}>
            <rect x={rect.split(",")[0]} y={rect.split(",")[1]} width="100" height="32" fill="rgba(5,5,7,.9)" stroke="rgba(34,211,238,.3)" />
            <text x={cx} y={cy} textAnchor="middle" fill="#aab2bf">{label}</text>
          </g>
        ))}
        <rect x="150" y="134" width="100" height="32" fill="rgba(124,58,237,.15)" stroke="rgba(34,211,238,.6)" />
        <text x="200" y="154" textAnchor="middle" fill="#22d3ee">AI Router</text>
        {[["290,64","340","84","CRM"],["290,134","340","154","Notify"],["290,204","340","224","Analytics"]].map(([rect,cx,cy,label]) => (
          <g key={label}>
            <rect x={rect.split(",")[0]} y={rect.split(",")[1]} width="100" height="32" fill="rgba(5,5,7,.9)" stroke="rgba(255,255,255,.06)" />
            <text x={cx} y={cy} textAnchor="middle" fill="#6b7280">{label}</text>
          </g>
        ))}
      </g>
      <g fill="#22d3ee">
        <circle r="3"><animateMotion dur="2.8s" repeatCount="indefinite" path="M60,60 L200,150" /></circle>
        <circle r="3"><animateMotion dur="3.2s" begin="0.4s" repeatCount="indefinite" path="M60,150 L200,150" /></circle>
        <circle r="3"><animateMotion dur="3.0s" begin="0.8s" repeatCount="indefinite" path="M60,240 L200,150" /></circle>
        <circle r="3" fill="#7c3aed"><animateMotion dur="2.6s" begin="1.2s" repeatCount="indefinite" path="M200,150 L340,80" /></circle>
        <circle r="3" fill="#7c3aed"><animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite" path="M200,150 L340,150" /></circle>
        <circle r="3" fill="#7c3aed"><animateMotion dur="2.8s" begin="2.0s" repeatCount="indefinite" path="M200,150 L340,220" /></circle>
      </g>
    </svg>
  );
}

function SynergyVis() {
  const cells = [
    { label: "CRM", core: false }, { label: "Billing", core: false }, { label: "Auth", core: false },
    { label: "Workflows", core: false }, { label: "CORE\nv3.2", core: true }, { label: "Reports", core: false },
    { label: "API GW", core: false }, { label: "Queue", core: false }, { label: "Notify", core: false },
  ];
  return (
    <div className="synergy-grid">
      {cells.map((c, i) => (
        <div key={i} className={`syn-cell${c.core ? " core" : ""}`}>
          {c.label.split("\n").map((l, j) => <div key={j}>{l}</div>)}
          {!c.core && <span className="syn-dot" style={{ animationDelay: `${i * 0.2}s` }}>●</span>}
        </div>
      ))}
    </div>
  );
}

function WorkflowVis() {
  return (
    <svg viewBox="0 0 400 280" style={{ position: "absolute", inset: "40px 16px 16px", width: "calc(100% - 32px)", height: "calc(100% - 56px)" }} fill="none">
      <g>
        {[["40,140","120,80"],["40,140","120,200"],["120,80","200,140"],["120,200","200,140"],["200,140","280,60"],["200,140","280,140"],["200,140","280,220"],["280,60","360,140"],["280,140","360,140"],["280,220","360,140"]].map(([a,b],i) => (
          <line key={i} className="edge" x1={a.split(",")[0]} y1={a.split(",")[1]} x2={b.split(",")[0]} y2={b.split(",")[1]} />
        ))}
      </g>
      <g fill="#22d3ee">
        {[["40,140","5"],["120,80","4"],["120,200","4"],["280,60","4"],["280,140","4"],["280,220","4"],["360,140","5"]].map(([pos,r]) => (
          <circle key={pos} className="node" cx={pos.split(",")[0]} cy={pos.split(",")[1]} r={r} />
        ))}
        <circle className="node node-pulse" cx="200" cy="140" r="6" />
      </g>
      <g fill="#22d3ee">
        <circle r="3"><animateMotion dur="2.6s" repeatCount="indefinite" path="M40,140 L120,80 L200,140 L280,60 L360,140" /></circle>
        <circle r="3" fill="#7c3aed"><animateMotion dur="3.0s" begin="0.4s" repeatCount="indefinite" path="M40,140 L120,200 L200,140 L280,220 L360,140" /></circle>
        <circle r="3"><animateMotion dur="2.4s" begin="0.9s" repeatCount="indefinite" path="M40,140 L120,80 L200,140 L280,140 L360,140" /></circle>
      </g>
      <g fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#6b7280">
        <text x="20" y="160">trigger</text>
        <text x="178" y="160" fill="#22d3ee">router</text>
        <text x="338" y="160">deliver</text>
      </g>
    </svg>
  );
}

function CinematicVis() {
  const cards1 = [
    { type: "accent", tag: "scene · 01", title: "Cinematic hero reveal", bar: true },
    { type: "thumb" },
    { type: "normal", tag: "parallax", title: "Depth layers · 0.4×" },
    { type: "thumb" },
    { type: "accent", tag: "scene · 04", title: "Pinned storytelling", bar: true },
    { type: "normal", tag: "motion", title: "Stagger · 0.06s" },
    { type: "accent", tag: "scene · 01", title: "Cinematic hero reveal", bar: true },
    { type: "thumb" },
    { type: "normal", tag: "parallax", title: "Depth layers · 0.4×" },
    { type: "thumb" },
    { type: "accent", tag: "scene · 04", title: "Pinned storytelling", bar: true },
    { type: "normal", tag: "motion", title: "Stagger · 0.06s" },
  ];
  const cards2 = [
    { type: "thumb" }, { type: "normal", tag: "timeline", title: "scrub · 1.2s" },
    { type: "accent", tag: "scene · 02", title: "Kinetic typography", bar: true },
    { type: "thumb" }, { type: "normal", tag: "scroll", title: "Lenis · 1.15 ease" }, { type: "thumb" },
    { type: "thumb" }, { type: "normal", tag: "timeline", title: "scrub · 1.2s" },
    { type: "accent", tag: "scene · 02", title: "Kinetic typography", bar: true },
    { type: "thumb" }, { type: "normal", tag: "scroll", title: "Lenis · 1.15 ease" }, { type: "thumb" },
  ];

  return (
    <div className="reel">
      <div className="reel-lane">
        <div className="reel-track l1">
          {cards1.map((c, i) => (
            <div key={i} className={`reel-card${c.type === "accent" ? " accent" : c.type === "thumb" ? " thumb" : ""}`}>
              {c.tag && <div className="tag">{c.tag}</div>}
              {c.title && <div className="title">{c.title}</div>}
              {c.bar && <div className="bar"><i /></div>}
            </div>
          ))}
        </div>
      </div>
      <div className="reel-lane">
        <div className="reel-track l2">
          {cards2.map((c, i) => (
            <div key={i} className={`reel-card${c.type === "accent" ? " accent" : c.type === "thumb" ? " thumb" : ""}`}>
              {c.tag && <div className="tag">{c.tag}</div>}
              {c.title && <div className="title">{c.title}</div>}
              {c.bar && <div className="bar"><i /></div>}
            </div>
          ))}
        </div>
      </div>
      <span className="reel-overlay">REC · LIVE</span>
      <span className="reel-corner-rec">60FPS · GSAP+LENIS</span>
    </div>
  );
}

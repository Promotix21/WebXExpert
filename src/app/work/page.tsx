"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { InnerHeader } from "@/components/layout/InnerHeader";
import { PageHeader } from "@/components/layout/PageHeader";
import { Footer } from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  "All",
  "Web Design",
  "CRM",
  "E-commerce",
  "SaaS",
  "Mobile App",
];

const projects = [
  {
    id: "real-estate-crm",
    title: "PROPIX",
    category: "CRM",
    description:
      "Complete real estate CRM with lead capture, EMI calculator, WhatsApp automation, and Facebook Ads integration. Processes 10,000+ leads monthly.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "WhatsApp API"],
    color: "cyan",
    stats: { leads: "10K+", conversion: "85%", users: "500+" },
    featured: true,
    animationType: "crm-dashboard",
  },
  {
    id: "marketing-platform",
    title: "MarketPro Suite",
    category: "SaaS",
    description:
      "Multi-channel marketing automation platform with campaign management, analytics, and AI-powered content suggestions.",
    tags: ["React", "Node.js", "MongoDB", "AI/ML"],
    color: "purple",
    stats: { campaigns: "50K+", emails: "2M+", clients: "200+" },
    featured: true,
    animationType: "marketing-analytics",
  },
  {
    id: "ecommerce-platform",
    title: "LuxeCart",
    category: "E-commerce",
    description:
      "High-end e-commerce platform for luxury goods with AR try-on, real-time inventory, and multi-currency support.",
    tags: ["Next.js", "Stripe", "Three.js", "Shopify"],
    color: "cyan",
    stats: { gmv: "$2M+", products: "5K+", countries: "30+" },
    featured: true,
    animationType: "ecommerce-showcase",
  },
  {
    id: "seo-tool",
    title: "RankGenius",
    category: "SaaS",
    description:
      "Autonomous SEO optimization engine with automated crawling, keyword analysis, and rank tracking across 500+ websites.",
    tags: ["Python", "React", "Elasticsearch", "AI"],
    color: "purple",
    stats: { sites: "500+", keywords: "1M+", growth: "3x" },
    animationType: "seo-engine",
  },
  {
    id: "fintech-app",
    title: "PayFlow",
    category: "Mobile App",
    description:
      "Mobile payment and expense tracking app with biometric authentication, split bills, and real-time notifications.",
    tags: ["React Native", "Node.js", "Plaid", "Firebase"],
    color: "cyan",
    stats: { users: "100K+", transactions: "1M+", rating: "4.9" },
    animationType: "fintech-mobile",
  },
  {
    id: "healthcare-portal",
    title: "MedConnect",
    category: "Web Design",
    description:
      "Patient portal with appointment scheduling, telemedicine integration, and secure health records management.",
    tags: ["Next.js", "HIPAA", "WebRTC", "PostgreSQL"],
    color: "purple",
    stats: { patients: "50K+", appointments: "200K+", doctors: "500+" },
    animationType: "healthcare-portal",
  },
  {
    id: "logistics-dashboard",
    title: "FleetMaster",
    category: "CRM",
    description:
      "Fleet management dashboard with real-time GPS tracking, route optimization, and driver performance analytics.",
    tags: ["React", "Node.js", "Google Maps", "Redis"],
    color: "cyan",
    stats: { vehicles: "2K+", deliveries: "500K+", savings: "40%" },
    animationType: "logistics-map",
  },
  {
    id: "education-platform",
    title: "LearnHub",
    category: "SaaS",
    description:
      "Online learning platform with live classes, course management, progress tracking, and certification system.",
    tags: ["Next.js", "WebRTC", "Stripe", "AWS"],
    color: "purple",
    stats: { students: "25K+", courses: "500+", completion: "78%" },
    animationType: "education-platform",
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <>
      <InnerHeader />

      <main className="bg-black min-h-screen">
        <PageHeader
          title="Our Work"
          subtitle="Portfolio"
          description="A showcase of digital products we've crafted for ambitious businesses. Each project tells a story of innovation, precision, and measurable results."
          gradient="mixed"
          size="large"
        />

        {/* Filter Tabs */}
        <section className="py-8 border-b border-surface-300/20 sticky top-16 md:top-20 z-40 bg-black/90 backdrop-blur-xl">
          <div className="container-main">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                    activeCategory === cat
                      ? "bg-brand-cyan-500 text-black"
                      : "bg-surface-200/50 text-neutral-400 hover:text-white hover:bg-surface-300/50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            {/* Featured Grid */}
            {filteredProjects.filter((p) => p.featured).length > 0 && (
              <div className="mb-20">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan-500" />
                  Featured Projects
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredProjects
                    .filter((p) => p.featured)
                    .map((project, i) => (
                      <FeaturedProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
              </div>
            )}

            {/* All Projects Grid */}
            <div ref={gridRef}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-purple-500" />
                {activeCategory === "All" ? "All Projects" : activeCategory}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects
                  .filter((p) => !p.featured || activeCategory !== "All")
                  .map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-16 bg-surface-100/30 border-y border-surface-300/20">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "$10M+", label: "Revenue Generated" },
                { value: "15+", label: "Industries Served" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container-main text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Create Your{" "}
              <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                Success Story
              </span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Ready to join our portfolio of successful projects? Let&apos;s discuss
              how we can help transform your vision into reality.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-cyan-500 text-black font-semibold rounded-full hover:bg-brand-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Start Your Project
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const colorClasses =
    project.color === "purple"
      ? {
          text: "text-brand-purple-500",
          bg: "bg-brand-purple-500",
          border: "border-brand-purple-500/30",
          glow: "group-hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]",
          accent: "#7C3AED",
        }
      : {
          text: "text-brand-cyan-500",
          bg: "bg-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          glow: "group-hover:shadow-[0_0_60px_rgba(0,212,255,0.2)]",
          accent: "#00D4FF",
        };

  return (
    <div
      className={cn(
        "project-card group relative rounded-3xl overflow-hidden bg-surface-100/50 border transition-all duration-500",
        colorClasses.border,
        colorClasses.glow,
        index === 0 && "lg:col-span-2"
      )}
    >
      {/* Animation Area */}
      <div className="relative aspect-video bg-surface-200/50 overflow-hidden">
        <ProjectAnimation type={project.animationType} color={colorClasses.accent} featured />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              colorClasses.bg,
              "text-black"
            )}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-brand-cyan-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-400 mb-6">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-surface-200/50 text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-6 pt-6 border-t border-surface-300/20">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key}>
              <div className={cn("text-xl font-bold", colorClasses.text)}>
                {value}
              </div>
              <div className="text-xs text-neutral-600 capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const colorClasses =
    project.color === "purple"
      ? {
          text: "text-brand-purple-500",
          bg: "bg-brand-purple-500",
          border: "border-brand-purple-500/30",
          accent: "#7C3AED",
        }
      : {
          text: "text-brand-cyan-500",
          bg: "bg-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          accent: "#00D4FF",
        };

  return (
    <div
      className={cn(
        "project-card group rounded-2xl overflow-hidden bg-surface-100/50 border transition-all duration-300 hover:border-brand-cyan-500/50",
        colorClasses.border
      )}
    >
      {/* Animation */}
      <div className="relative aspect-video bg-surface-200/50 overflow-hidden">
        <ProjectAnimation type={project.animationType} color={colorClasses.accent} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <span
          className={cn(
            "absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-medium z-10",
            colorClasses.bg,
            "text-black"
          )}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 group-hover:text-brand-cyan-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] bg-surface-200/50 text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Unique Project Animations
function ProjectAnimation({ type, color, featured = false }: { type: string; color: string; featured?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const loopTl = gsap.timeline({ repeat: -1, delay: 0.5 });

      switch (type) {
        case "crm-dashboard":
          // CRM: Lead cards flowing, stats updating, notifications
          loopTl.fromTo(".lead-card", { x: 100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: "power2.out" })
            .to(".crm-stat", { textContent: "+=12", duration: 0.5, stagger: 0.1, snap: { textContent: 1 } })
            .fromTo(".notif-dot", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" })
            .to(".pipeline-bar", { width: "85%", duration: 1, ease: "power2.inOut" })
            .to(".notif-dot", { scale: 0, duration: 0.2, delay: 0.5 })
            .to(".lead-card", { x: -100, opacity: 0, stagger: 0.1, duration: 0.3 })
            .to(".pipeline-bar", { width: "45%", duration: 0.5 })
            .to(".crm-stat", { textContent: "-=12", duration: 0.3, stagger: 0.1, snap: { textContent: 1 } });
          break;

        case "marketing-analytics":
          // Marketing: Charts animating, campaign metrics, email flows
          loopTl.to(".chart-slice", { rotation: "+=30", transformOrigin: "50% 50%", stagger: 0.1, duration: 0.8 })
            .to(".campaign-metric", { scale: 1.1, duration: 0.3, stagger: 0.05 })
            .to(".campaign-metric", { scale: 1, duration: 0.3, stagger: 0.05 })
            .fromTo(".email-flow", { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1, stagger: 0.2 })
            .to(".analytics-bar", { scaleY: () => 0.3 + Math.random() * 0.7, stagger: 0.08, duration: 0.4 })
            .to(".open-rate", { textContent: 68, duration: 0.5, snap: { textContent: 1 } })
            .to(".click-rate", { textContent: 24, duration: 0.5, snap: { textContent: 1 } }, "-=0.3")
            .to({}, { duration: 0.5 })
            .set(".open-rate", { textContent: 45 })
            .set(".click-rate", { textContent: 12 })
            .to(".email-flow", { strokeDashoffset: 100, duration: 0.5 });
          break;

        case "ecommerce-showcase":
          // E-commerce: Products rotating in 3D, cart animations, checkout flow
          loopTl.to(".product-showcase", { rotationY: 360, duration: 3, ease: "none" })
            .fromTo(".price-tag", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=2")
            .to(".cart-icon", { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 }, "-=1")
            .fromTo(".cart-item", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, "-=0.5")
            .to(".checkout-progress", { width: "100%", duration: 1.5, ease: "power1.inOut" })
            .fromTo(".success-check", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2)" })
            .to(".success-check", { scale: 0, duration: 0.3, delay: 0.5 })
            .to(".checkout-progress", { width: "0%", duration: 0.3 })
            .to(".cart-item", { opacity: 0, duration: 0.2 });
          break;

        case "seo-engine":
          // SEO: Rankings climbing, keyword bubbles, graph growth
          loopTl.to(".rank-number", { textContent: 1, duration: 1, snap: { textContent: 1 } })
            .fromTo(".keyword-bubble", { scale: 0 }, { scale: 1, stagger: 0.1, duration: 0.3, ease: "back.out(2)" }, "-=0.5")
            .to(".seo-graph", { attr: { d: "M0,80 L20,60 L40,70 L60,40 L80,50 L100,20" }, duration: 1, ease: "power2.out" })
            .to(".crawl-bot", { x: 150, duration: 2, ease: "power1.inOut" })
            .to(".crawl-bot", { x: 0, duration: 0.01 })
            .to(".keyword-bubble", { scale: 0, stagger: 0.05, duration: 0.2 })
            .to(".rank-number", { textContent: 15, duration: 0.5, snap: { textContent: 1 } })
            .to(".seo-graph", { attr: { d: "M0,80 L20,75 L40,80 L60,70 L80,75 L100,65" }, duration: 0.5 });
          break;

        case "fintech-mobile":
          // Fintech: Phone with transactions, money flows, balance updates
          loopTl.fromTo(".transaction", { x: -50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.3, duration: 0.4 })
            .to(".balance-amount", { textContent: 12847, duration: 1, snap: { textContent: 1 } })
            .fromTo(".money-particle", { y: 50, opacity: 0 }, { y: -50, opacity: 1, stagger: 0.1, duration: 0.4 })
            .to(".money-particle", { opacity: 0, duration: 0.4 })
            .to(".spend-ring", { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" })
            .fromTo(".notification-toast", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 })
            .to(".notification-toast", { y: -20, opacity: 0, duration: 0.3, delay: 1 })
            .to(".transaction", { x: 50, opacity: 0, stagger: 0.1, duration: 0.3 })
            .set(".balance-amount", { textContent: 10234 })
            .to(".spend-ring", { strokeDashoffset: 100, duration: 0.3 });
          break;

        case "healthcare-portal":
          // Healthcare: Heart rate monitor, appointment cards, video call
          loopTl.to(".heartbeat-line", { strokeDashoffset: -200, duration: 2, ease: "none", repeat: 2 })
            .fromTo(".appointment-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.4 }, "-=4")
            .to(".vital-value", { textContent: 72, duration: 0.5, snap: { textContent: 1 } }, "-=3")
            .fromTo(".video-ring", { scale: 0.8, opacity: 0.5 }, { scale: 1.2, opacity: 0, duration: 1, repeat: 3 }, "-=2")
            .to(".appointment-card", { x: -50, opacity: 0, stagger: 0.1, duration: 0.3 })
            .set(".vital-value", { textContent: 68 });
          break;

        case "logistics-map":
          // Logistics: Map with moving trucks, route animations, delivery pins
          loopTl.to(".truck-icon", { motionPath: { path: ".route-path", align: ".route-path" }, duration: 3, ease: "power1.inOut" })
            .fromTo(".delivery-pin", { scale: 0, y: 10 }, { scale: 1, y: 0, stagger: 0.3, duration: 0.3, ease: "back.out(2)" }, "-=2.5")
            .to(".eta-value", { textContent: 0, duration: 2, snap: { textContent: 1 } }, "-=2")
            .fromTo(".checkmark", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(2)" })
            .to(".delivery-pin", { scale: 0, stagger: 0.1, duration: 0.2, delay: 0.5 })
            .to(".checkmark", { scale: 0, duration: 0.2 })
            .set(".eta-value", { textContent: 15 })
            .set(".truck-icon", { clearProps: "all" });
          break;

        case "education-platform":
          // Education: Progress circles, lesson cards, achievement badges
          loopTl.to(".progress-circle", { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
            .fromTo(".lesson-card", { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: "back.out(1.5)" }, "-=1")
            .to(".xp-counter", { textContent: 2500, duration: 1, snap: { textContent: 1 } }, "-=0.5")
            .fromTo(".badge", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" })
            .fromTo(".confetti", { y: 0, opacity: 0 }, { y: -50, opacity: 1, stagger: 0.05, duration: 0.4 })
            .to(".confetti", { y: -100, opacity: 0, stagger: 0.02, duration: 0.4 })
            .to(".lesson-card", { rotationX: -90, opacity: 0, stagger: 0.1, duration: 0.3, delay: 0.5 })
            .to(".badge", { scale: 0, duration: 0.2 })
            .set(".xp-counter", { textContent: 2100 })
            .to(".progress-circle", { strokeDashoffset: 100, duration: 0.3 });
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [type]);

  return (
    <div ref={containerRef} className={cn("w-full h-full flex items-center justify-center p-4", featured ? "p-6" : "")}>
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />

      {/* Animation Content */}
      <div className="relative w-full h-full">
        {type === "crm-dashboard" && <CRMDashboardAnimation color={color} />}
        {type === "marketing-analytics" && <MarketingAnalyticsAnimation color={color} />}
        {type === "ecommerce-showcase" && <EcommerceShowcaseAnimation color={color} />}
        {type === "seo-engine" && <SEOEngineAnimation color={color} />}
        {type === "fintech-mobile" && <FintechMobileAnimation color={color} />}
        {type === "healthcare-portal" && <HealthcarePortalAnimation color={color} />}
        {type === "logistics-map" && <LogisticsMapAnimation color={color} />}
        {type === "education-platform" && <EducationPlatformAnimation color={color} />}
      </div>
    </div>
  );
}

// 1. CRM Dashboard Animation
function CRMDashboardAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-2 font-mono text-[10px]">
      <div className="flex items-center justify-between px-2">
        <span className="text-neutral-500">CRM Dashboard</span>
        <div className="notif-dot w-2 h-2 rounded-full" style={{ background: "#EF4444", transform: "scale(0)" }} />
      </div>
      {/* Stats Row */}
      <div className="flex gap-2 px-2">
        {[{ label: "Leads", val: 248 }, { label: "Deals", val: 45 }, { label: "Revenue", val: 127 }].map((s, i) => (
          <div key={i} className="flex-1 bg-surface-300/30 rounded-lg p-2 text-center">
            <div className="crm-stat text-lg font-bold" style={{ color }}>{s.val}</div>
            <div className="text-[8px] text-neutral-500">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Pipeline */}
      <div className="px-2">
        <div className="text-neutral-500 mb-1">Pipeline</div>
        <div className="h-2 bg-surface-300/30 rounded-full overflow-hidden">
          <div className="pipeline-bar h-full rounded-full" style={{ background: color, width: "45%" }} />
        </div>
      </div>
      {/* Lead Cards */}
      <div className="flex-1 px-2 space-y-1 overflow-hidden">
        {["John Doe - $5,000", "Acme Corp - $12,500", "Tech Inc - $8,200"].map((lead, i) => (
          <div key={i} className="lead-card flex items-center gap-2 bg-surface-300/30 rounded-lg p-2" style={{ opacity: 0 }}>
            <div className="w-6 h-6 rounded-full" style={{ background: `${color}30` }} />
            <span className="text-neutral-300 flex-1">{lead}</span>
            <span style={{ color }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Marketing Analytics Animation
function MarketingAnalyticsAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <div className="text-[10px] text-neutral-500">Campaign Analytics</div>
      {/* Metrics */}
      <div className="flex gap-2">
        <div className="campaign-metric flex-1 bg-surface-300/30 rounded-lg p-2 text-center">
          <div className="open-rate text-xl font-bold" style={{ color }}>45</div>
          <div className="text-[8px] text-neutral-500">Open Rate %</div>
        </div>
        <div className="campaign-metric flex-1 bg-surface-300/30 rounded-lg p-2 text-center">
          <div className="click-rate text-xl font-bold" style={{ color }}>12</div>
          <div className="text-[8px] text-neutral-500">Click Rate %</div>
        </div>
      </div>
      {/* Chart */}
      <div className="flex-1 relative bg-surface-300/20 rounded-lg p-2">
        <div className="flex items-end justify-between h-full gap-1">
          {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 0.6].map((h, i) => (
            <div key={i} className="analytics-bar flex-1 rounded-t origin-bottom" style={{ height: `${h * 100}%`, background: color, opacity: 0.5 + (i % 2) * 0.3 }} />
          ))}
        </div>
        {/* Email flow lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path className="email-flow" d="M10,50 Q50,20 90,40" fill="none" stroke={color} strokeWidth="1" strokeDasharray="100" strokeDashoffset="100" opacity="0.5" />
        </svg>
      </div>
      {/* Pie chart slice */}
      <div className="flex items-center justify-center">
        <svg className="w-12 h-12">
          <circle cx="24" cy="24" r="20" fill="none" stroke={`${color}30`} strokeWidth="4" />
          <circle className="chart-slice" cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="4" strokeDasharray="40 100" style={{ transformOrigin: "center" }} />
        </svg>
      </div>
    </div>
  );
}

// 3. E-commerce Showcase Animation
function EcommerceShowcaseAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2">
      {/* Product showcase */}
      <div className="product-showcase relative w-20 h-20 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, perspective: "200px" }}>
        <div className="text-3xl">👜</div>
        <div className="price-tag absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-black" style={{ background: color, transform: "scale(0)" }}>$299</div>
      </div>
      {/* Cart */}
      <div className="flex items-center gap-2 w-full px-4">
        <div className="cart-icon w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
          <span style={{ color }}>🛒</span>
        </div>
        <div className="cart-item flex-1 bg-surface-300/30 rounded-lg p-2" style={{ opacity: 0 }}>
          <div className="text-[10px] text-neutral-300">Added to cart</div>
        </div>
      </div>
      {/* Checkout progress */}
      <div className="w-full px-4">
        <div className="h-1 bg-surface-300/30 rounded-full overflow-hidden">
          <div className="checkout-progress h-full rounded-full" style={{ background: color, width: "0%" }} />
        </div>
      </div>
      {/* Success */}
      <div className="success-check w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "#4ADE80", transform: "scale(0)" }}>✓</div>
    </div>
  );
}

// 4. SEO Engine Animation
function SEOEngineAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-neutral-500">SEO Engine</span>
        <div className="crawl-bot text-lg">🤖</div>
      </div>
      {/* Rank display */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500">Position</div>
        <div className="rank-number text-4xl font-black" style={{ color }}>15</div>
      </div>
      {/* Graph */}
      <svg className="flex-1 w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="seo-graph" d="M0,80 L20,75 L40,80 L60,70 L80,75 L100,65" fill="none" stroke={color} strokeWidth="2" />
        <path d="M0,80 L20,75 L40,80 L60,70 L80,75 L100,65 L100,100 L0,100 Z" fill={`${color}20`} />
      </svg>
      {/* Keywords */}
      <div className="flex flex-wrap gap-1 justify-center">
        {["SEO", "Rank", "Keywords", "Traffic"].map((kw, i) => (
          <span key={i} className="keyword-bubble px-2 py-0.5 rounded-full text-[8px]" style={{ background: `${color}30`, color, transform: "scale(0)" }}>{kw}</span>
        ))}
      </div>
    </div>
  );
}

// 5. Fintech Mobile Animation
function FintechMobileAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Phone frame */}
      <div className="relative w-28 h-48 bg-surface-300/50 rounded-2xl border-4 border-surface-400/50 overflow-hidden p-2">
        {/* Balance */}
        <div className="text-center mb-2">
          <div className="text-[8px] text-neutral-500">Balance</div>
          <div className="balance-amount text-lg font-bold" style={{ color }}>$10,234</div>
        </div>
        {/* Spending ring */}
        <svg className="w-12 h-12 mx-auto mb-2">
          <circle cx="24" cy="24" r="20" fill="none" stroke={`${color}30`} strokeWidth="3" />
          <circle className="spend-ring" cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3" strokeDasharray="100" strokeDashoffset="100" transform="rotate(-90 24 24)" />
        </svg>
        {/* Transactions */}
        <div className="space-y-1">
          {["Coffee ☕", "Uber 🚗", "Amazon 📦"].map((t, i) => (
            <div key={i} className="transaction flex items-center gap-1 bg-surface-300/30 rounded p-1 text-[8px]" style={{ opacity: 0 }}>
              <span>{t}</span>
              <span className="ml-auto text-red-400">-$12</span>
            </div>
          ))}
        </div>
        {/* Money particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="money-particle absolute text-lg" style={{ left: `${20 + i * 15}%`, bottom: 0, opacity: 0 }}>💰</div>
          ))}
        </div>
        {/* Notification toast */}
        <div className="notification-toast absolute bottom-2 left-2 right-2 bg-green-500/80 rounded-lg p-1 text-[8px] text-white text-center" style={{ opacity: 0 }}>
          Payment received! +$500
        </div>
      </div>
    </div>
  );
}

// 6. Healthcare Portal Animation
function HealthcarePortalAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <div className="text-[10px] text-neutral-500">Patient Portal</div>
      {/* Vitals */}
      <div className="flex gap-2">
        <div className="flex-1 bg-surface-300/30 rounded-lg p-2 text-center">
          <div className="vital-value text-xl font-bold" style={{ color }}>68</div>
          <div className="text-[8px] text-neutral-500">Heart Rate</div>
        </div>
        <div className="flex-1 bg-surface-300/30 rounded-lg p-2 text-center">
          <div className="text-xl font-bold" style={{ color }}>120/80</div>
          <div className="text-[8px] text-neutral-500">BP</div>
        </div>
      </div>
      {/* Heartbeat monitor */}
      <div className="h-10 relative bg-surface-300/20 rounded-lg overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          <path className="heartbeat-line" d="M0,20 L20,20 L25,5 L30,35 L35,15 L40,20 L60,20 L65,5 L70,35 L75,15 L80,20 L100,20" fill="none" stroke={color} strokeWidth="2" strokeDasharray="200" strokeDashoffset="0" />
        </svg>
      </div>
      {/* Appointments */}
      <div className="space-y-1">
        {["Dr. Smith - 10:00 AM", "Lab Test - 2:00 PM"].map((appt, i) => (
          <div key={i} className="appointment-card flex items-center gap-2 bg-surface-300/30 rounded-lg p-2 text-[9px]" style={{ opacity: 0 }}>
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-neutral-300">{appt}</span>
          </div>
        ))}
      </div>
      {/* Video call indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="relative">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}30` }}>📹</div>
          <div className="video-ring absolute inset-0 rounded-full border-2" style={{ borderColor: color, opacity: 0, transform: "scale(0.8)" }} />
        </div>
        <span className="text-[10px] text-neutral-400">Telehealth Ready</span>
      </div>
    </div>
  );
}

// 7. Logistics Map Animation
function LogisticsMapAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full relative">
      {/* Map grid background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${color}20 1px, transparent 1px), linear-gradient(90deg, ${color}20 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />

      {/* Route path */}
      <svg className="absolute inset-0 w-full h-full">
        <path className="route-path" d="M20,80 Q50,20 80,50 Q110,80 150,30" fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />
      </svg>

      {/* Truck */}
      <div className="truck-icon absolute text-2xl" style={{ left: "10%", top: "70%" }}>🚛</div>

      {/* Delivery pins */}
      <div className="delivery-pin absolute text-xl" style={{ left: "75%", top: "45%", transform: "scale(0)" }}>📍</div>
      <div className="delivery-pin absolute text-xl" style={{ left: "90%", top: "25%", transform: "scale(0)" }}>📍</div>

      {/* Checkmark */}
      <div className="checkmark absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "#4ADE80", left: "85%", top: "30%", transform: "scale(0)" }}>✓</div>

      {/* ETA */}
      <div className="absolute bottom-2 left-2 right-2 bg-surface-300/50 rounded-lg p-2 flex items-center justify-between">
        <span className="text-[10px] text-neutral-400">ETA</span>
        <div className="flex items-center gap-1">
          <span className="eta-value text-lg font-bold" style={{ color }}>15</span>
          <span className="text-[10px] text-neutral-500">min</span>
        </div>
      </div>
    </div>
  );
}

// 8. Education Platform Animation
function EducationPlatformAnimation({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2 relative">
      {/* Progress circle */}
      <svg className="w-16 h-16">
        <circle cx="32" cy="32" r="28" fill="none" stroke={`${color}30`} strokeWidth="4" />
        <circle className="progress-circle" cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="4" strokeDasharray="176" strokeDashoffset="100" transform="rotate(-90 32 32)" />
        <text x="32" y="36" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">78%</text>
      </svg>

      {/* XP Counter */}
      <div className="text-center">
        <div className="xp-counter text-xl font-bold" style={{ color }}>2100</div>
        <div className="text-[8px] text-neutral-500">XP Points</div>
      </div>

      {/* Lesson cards */}
      <div className="flex gap-1">
        {["📚", "🎯", "💡"].map((icon, i) => (
          <div key={i} className="lesson-card w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: `${color}20`, opacity: 0, transform: "rotateX(90deg)" }}>
            {icon}
          </div>
        ))}
      </div>

      {/* Badge */}
      <div className="badge w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: `linear-gradient(135deg, ${color}, #FFD700)`, transform: "scale(0)" }}>🏆</div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="confetti absolute text-sm" style={{ left: `${10 + i * 8}%`, top: "100%", opacity: 0 }}>
            {["🎉", "⭐", "✨"][i % 3]}
          </div>
        ))}
      </div>
    </div>
  );
}

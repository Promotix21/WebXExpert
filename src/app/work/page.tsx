"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
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
    title: "PropVista CRM",
    category: "CRM",
    description:
      "Complete real estate CRM with lead capture, EMI calculator, WhatsApp automation, and Facebook Ads integration. Processes 10,000+ leads monthly.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "WhatsApp API"],
    image: "/images/work/propvista.jpg",
    color: "cyan",
    stats: { leads: "10K+", conversion: "85%", users: "500+" },
    featured: true,
  },
  {
    id: "marketing-platform",
    title: "MarketPro Suite",
    category: "SaaS",
    description:
      "Multi-channel marketing automation platform with campaign management, analytics, and AI-powered content suggestions.",
    tags: ["React", "Node.js", "MongoDB", "AI/ML"],
    image: "/images/work/marketpro.jpg",
    color: "purple",
    stats: { campaigns: "50K+", emails: "2M+", clients: "200+" },
    featured: true,
  },
  {
    id: "ecommerce-platform",
    title: "LuxeCart",
    category: "E-commerce",
    description:
      "High-end e-commerce platform for luxury goods with AR try-on, real-time inventory, and multi-currency support.",
    tags: ["Next.js", "Stripe", "Three.js", "Shopify"],
    image: "/images/work/luxecart.jpg",
    color: "cyan",
    stats: { gmv: "$2M+", products: "5K+", countries: "30+" },
    featured: true,
  },
  {
    id: "seo-tool",
    title: "RankGenius",
    category: "SaaS",
    description:
      "Autonomous SEO optimization engine with automated crawling, keyword analysis, and rank tracking across 500+ websites.",
    tags: ["Python", "React", "Elasticsearch", "AI"],
    image: "/images/work/rankgenius.jpg",
    color: "purple",
    stats: { sites: "500+", keywords: "1M+", growth: "3x" },
  },
  {
    id: "fintech-app",
    title: "PayFlow",
    category: "Mobile App",
    description:
      "Mobile payment and expense tracking app with biometric authentication, split bills, and real-time notifications.",
    tags: ["React Native", "Node.js", "Plaid", "Firebase"],
    image: "/images/work/payflow.jpg",
    color: "cyan",
    stats: { users: "100K+", transactions: "1M+", rating: "4.9" },
  },
  {
    id: "healthcare-portal",
    title: "MedConnect",
    category: "Web Design",
    description:
      "Patient portal with appointment scheduling, telemedicine integration, and secure health records management.",
    tags: ["Next.js", "HIPAA", "WebRTC", "PostgreSQL"],
    image: "/images/work/medconnect.jpg",
    color: "purple",
    stats: { patients: "50K+", appointments: "200K+", doctors: "500+" },
  },
  {
    id: "logistics-dashboard",
    title: "FleetMaster",
    category: "CRM",
    description:
      "Fleet management dashboard with real-time GPS tracking, route optimization, and driver performance analytics.",
    tags: ["React", "Node.js", "Google Maps", "Redis"],
    image: "/images/work/fleetmaster.jpg",
    color: "cyan",
    stats: { vehicles: "2K+", deliveries: "500K+", savings: "40%" },
  },
  {
    id: "education-platform",
    title: "LearnHub",
    category: "SaaS",
    description:
      "Online learning platform with live classes, course management, progress tracking, and certification system.",
    tags: ["Next.js", "WebRTC", "Stripe", "AWS"],
    image: "/images/work/learnhub.jpg",
    color: "purple",
    stats: { students: "25K+", courses: "500+", completion: "78%" },
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
      // Animate project cards
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
        }
      : {
          text: "text-brand-cyan-500",
          bg: "bg-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          glow: "group-hover:shadow-[0_0_60px_rgba(0,212,255,0.2)]",
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
      {/* Image Area */}
      <div className="relative aspect-video bg-surface-200/50">
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className={cn(
                "w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center",
                colorClasses.bg,
                "bg-opacity-20"
              )}
            >
              <span className="text-3xl">
                {project.category === "CRM" && "📊"}
                {project.category === "SaaS" && "☁️"}
                {project.category === "E-commerce" && "🛒"}
                {project.category === "Mobile App" && "📱"}
                {project.category === "Web Design" && "🎨"}
              </span>
            </div>
            <p className="text-xs text-neutral-600">Add: {project.image}</p>
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
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
        }
      : {
          text: "text-brand-cyan-500",
          bg: "bg-brand-cyan-500",
          border: "border-brand-cyan-500/30",
        };

  return (
    <div
      className={cn(
        "project-card group rounded-2xl overflow-hidden bg-surface-100/50 border transition-all duration-300 hover:border-brand-cyan-500/50",
        colorClasses.border
      )}
    >
      {/* Image */}
      <div className="relative aspect-video bg-surface-200/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl opacity-50">
            {project.category === "CRM" && "📊"}
            {project.category === "SaaS" && "☁️"}
            {project.category === "E-commerce" && "🛒"}
            {project.category === "Mobile App" && "📱"}
            {project.category === "Web Design" && "🎨"}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <span
          className={cn(
            "absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-medium",
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

"use client";

import { useRef, useEffect } from "react";
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

const services = [
  {
    id: "web-design",
    title: "Web Design",
    tagline: "Award-Worthy Digital Experiences",
    description:
      "We don't just design websites—we craft immersive digital experiences that captivate, convert, and dominate. Every pixel is intentional, every animation purposeful.",
    features: [
      {
        title: "Motion Design & GSAP",
        description: "Scroll-triggered animations that bring your brand to life",
      },
      {
        title: "WebGL & Three.js",
        description: "Immersive 3D experiences that set you apart",
      },
      {
        title: "Responsive Design",
        description: "Flawless experience across all devices",
      },
      {
        title: "Conversion-Focused UX",
        description: "Design that drives measurable business results",
      },
    ],
    stats: [
      { value: "50+", label: "Websites Launched" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "3x", label: "Avg Conversion Lift" },
    ],
    color: "cyan",
    image: "/images/services/web-design.jpg",
  },
  {
    id: "web-development",
    title: "Web Development",
    tagline: "Code That Performs",
    description:
      "Full-stack expertise in modern technologies. From blazing-fast frontends to scalable backends, we build applications that power serious businesses.",
    features: [
      {
        title: "Next.js & React",
        description: "Server-side rendering for optimal performance",
      },
      {
        title: "Node.js & NestJS",
        description: "Robust, scalable backend architecture",
      },
      {
        title: "Headless CMS",
        description: "Content management that scales with you",
      },
      {
        title: "API Development",
        description: "RESTful and GraphQL APIs built to last",
      },
    ],
    stats: [
      { value: "100+", label: "Apps Deployed" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "<1s", label: "Avg Load Time" },
    ],
    color: "purple",
    image: "/images/services/web-development.jpg",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    tagline: "Built From Scratch, For You",
    description:
      "CRMs, ERPs, dashboards, internal tools—if you can imagine it, we can build it. Custom software tailored to your exact business processes.",
    features: [
      {
        title: "CRM Development",
        description: "Lead management systems that close deals",
      },
      {
        title: "Dashboard & Analytics",
        description: "Real-time insights for data-driven decisions",
      },
      {
        title: "Workflow Automation",
        description: "Eliminate manual tasks, boost productivity",
      },
      {
        title: "Real-time Applications",
        description: "WebSocket-powered live updates",
      },
    ],
    stats: [
      { value: "40+", label: "Custom Apps Built" },
      { value: "500K+", label: "Users Served" },
      { value: "85%", label: "Time Saved" },
    ],
    color: "cyan",
    image: "/images/services/custom-software.jpg",
  },
  {
    id: "integrations",
    title: "API Integrations",
    tagline: "Connect Everything",
    description:
      "We wire your systems together seamlessly. Payment gateways, CRMs, marketing tools, ERPs—if it has an API, we can integrate it.",
    features: [
      {
        title: "Payment Gateways",
        description: "Stripe, PayPal, Razorpay, and more",
      },
      {
        title: "N8N & Automation",
        description: "Complex workflows made simple",
      },
      {
        title: "Third-party Services",
        description: "Connect to 1000+ apps and services",
      },
      {
        title: "Custom APIs",
        description: "Build bridges between any systems",
      },
    ],
    stats: [
      { value: "200+", label: "Integrations Built" },
      { value: "50+", label: "APIs Connected" },
      { value: "24/7", label: "Sync & Automation" },
    ],
    color: "purple",
    image: "/images/services/integrations.jpg",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, goals, and challenges. No generic solutions—only strategies tailored to your specific needs.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "We architect the solution, defining tech stack, timelines, and milestones. You'll know exactly what's coming and when.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "High-fidelity designs and prototypes that let you see and feel your product before a single line of code is written.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Agile sprints with regular demos. You're involved at every step, ensuring the final product matches your vision.",
  },
  {
    step: "05",
    title: "Launch",
    description:
      "Rigorous testing, optimization, and deployment. We don't just launch—we ensure you're set up for success.",
  },
  {
    step: "06",
    title: "Support",
    description:
      "Ongoing maintenance, updates, and optimization. We're your long-term technology partner.",
  },
];

export default function ServicesPage() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards on scroll
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
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
              toggleActions: "play none none reverse",
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
        <PageHeader
          title="Our Services"
          subtitle="What We Do"
          description="From concept to deployment, we craft digital experiences that perform. Premium solutions for businesses that demand excellence."
          gradient="cyan"
          size="large"
        />

        {/* Services Grid */}
        <section ref={servicesRef} className="py-20 md:py-32">
          <div className="container-main">
            <div className="space-y-32">
              {services.map((service, index) => {
                const isReversed = index % 2 === 1;
                const colorClasses =
                  service.color === "purple"
                    ? {
                        text: "text-brand-purple-500",
                        bg: "bg-brand-purple-500",
                        border: "border-brand-purple-500/30",
                        glow: "shadow-[0_0_80px_rgba(124,58,237,0.15)]",
                      }
                    : {
                        text: "text-brand-cyan-500",
                        bg: "bg-brand-cyan-500",
                        border: "border-brand-cyan-500/30",
                        glow: "shadow-[0_0_80px_rgba(0,212,255,0.15)]",
                      };

                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className="service-card"
                  >
                    <div
                      className={cn(
                        "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                      )}
                    >
                      {/* Content */}
                      <div className={cn(isReversed && "lg:order-2")}>
                        <span
                          className={cn(
                            "text-sm font-semibold tracking-widest uppercase mb-4 block",
                            colorClasses.text
                          )}
                        >
                          {service.tagline}
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                          {service.title}
                        </h2>
                        <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                          {service.features.map((feature, i) => (
                            <div
                              key={i}
                              className={cn(
                                "p-4 rounded-xl bg-surface-100/50 border",
                                colorClasses.border
                              )}
                            >
                              <h4 className="font-semibold mb-1">
                                {feature.title}
                              </h4>
                              <p className="text-sm text-neutral-500">
                                {feature.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8">
                          {service.stats.map((stat, i) => (
                            <div key={i}>
                              <div
                                className={cn(
                                  "text-3xl md:text-4xl font-bold mb-1",
                                  colorClasses.text
                                )}
                              >
                                {stat.value}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Image Placeholder */}
                      <div className={cn(isReversed && "lg:order-1")}>
                        <div
                          className={cn(
                            "relative aspect-[4/3] rounded-3xl overflow-hidden",
                            "bg-surface-100/50 border",
                            colorClasses.border,
                            colorClasses.glow
                          )}
                        >
                          {/* Placeholder for image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div
                                className={cn(
                                  "w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                                  colorClasses.bg,
                                  "bg-opacity-20"
                                )}
                              >
                                <span className="text-4xl">
                                  {index === 0 && "🎨"}
                                  {index === 1 && "💻"}
                                  {index === 2 && "⚙️"}
                                  {index === 3 && "🔗"}
                                </span>
                              </div>
                              <p className="text-sm text-neutral-500">
                                Add image: {service.image}
                              </p>
                            </div>
                          </div>
                          {/* Decorative gradient */}
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background: `radial-gradient(circle at ${
                                isReversed ? "20%" : "80%"
                              } 50%, ${
                                service.color === "purple"
                                  ? "#7C3AED"
                                  : "#00D4FF"
                              } 0%, transparent 50%)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm text-brand-cyan-500 font-semibold tracking-widest uppercase mb-4 block">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How We{" "}
                <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                  Deliver Excellence
                </span>
              </h2>
              <p className="text-lg text-neutral-400">
                A proven methodology refined over years of building exceptional
                digital products.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="process-step p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30 hover:border-brand-cyan-500/30 transition-all duration-300 group"
                >
                  <span className="text-5xl font-black text-brand-cyan-500/20 group-hover:text-brand-cyan-500/40 transition-colors">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold mt-4 mb-3 group-hover:text-brand-cyan-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-cyan-500/10 via-surface-100 to-brand-purple-500/10 border border-surface-300/30 p-12 md:p-20 text-center">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-cyan-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-purple-500 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to Build Something{" "}
                  <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                    Extraordinary?
                  </span>
                </h2>
                <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                  Let&apos;s discuss your project and see how we can help you
                  achieve your goals.
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

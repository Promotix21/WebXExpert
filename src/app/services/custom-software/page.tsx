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

// Interactive Dashboard Hero Animation
function DashboardHero() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({
    revenue: 847520,
    users: 12847,
    orders: 3421,
    conversion: 4.8,
  });

  useEffect(() => {
    const dashboard = dashboardRef.current;
    if (!dashboard) return;

    // Update metrics periodically
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        users: prev.users + Math.floor(Math.random() * 50),
        orders: prev.orders + Math.floor(Math.random() * 10),
        conversion: +(prev.conversion + (Math.random() - 0.5) * 0.2).toFixed(1),
      }));
    }, 2000);

    const ctx = gsap.context(() => {
      // Animate dashboard window
      gsap.fromTo(
        ".dashboard-window",
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );

      // Animate sidebar items
      gsap.fromTo(
        ".sidebar-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.6 }
      );

      // Animate metric cards
      gsap.fromTo(
        ".metric-card",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.8 }
      );

      // Animate chart bars
      gsap.fromTo(
        ".chart-bar",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          delay: 1,
          transformOrigin: "bottom",
        }
      );

      // Continuous chart animation
      const chartBars = document.querySelectorAll('.chart-bar');
      chartBars.forEach((bar) => {
        gsap.to(bar, {
          scaleY: "random(0.4, 1)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 0.5,
        });
      });

      // Pie chart segments animation
      gsap.fromTo(
        ".pie-segment",
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
          delay: 1.2,
        }
      );

      // Activity feed animation
      gsap.fromTo(
        ".activity-item",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          repeat: -1,
          repeatDelay: 3,
          delay: 1.5,
        }
      );

      // Notification badge pulse
      gsap.to(".notification-badge", {
        scale: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, dashboard);

    return () => {
      clearInterval(metricsInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={dashboardRef} className="relative w-full max-w-5xl mx-auto">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-purple-500/25 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-cyan-500/20 rounded-full blur-[80px]" />

      {/* Dashboard Window */}
      <div className="dashboard-window bg-surface-100/90 backdrop-blur-xl rounded-2xl border border-surface-300/50 overflow-hidden shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-200/70 border-b border-surface-300/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-surface-300/30 rounded-lg text-xs text-neutral-500">
              dashboard.yourcompany.com
            </div>
          </div>
          <div className="relative">
            <span className="text-neutral-500">🔔</span>
            <span className="notification-badge absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 bg-surface-200/30 border-r border-surface-300/20 p-4 hidden md:block">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-purple-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-semibold text-sm">Analytics Pro</span>
            </div>
            {[
              { icon: "📊", label: "Dashboard", active: true },
              { icon: "👥", label: "Users" },
              { icon: "📦", label: "Orders" },
              { icon: "💳", label: "Revenue" },
              { icon: "📈", label: "Analytics" },
              { icon: "⚙️", label: "Settings" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm cursor-pointer transition-colors",
                  item.active
                    ? "bg-brand-purple-500/20 text-brand-purple-500"
                    : "text-neutral-400 hover:bg-surface-300/30"
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6 min-h-[400px]">
            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Revenue", value: `$${metrics.revenue.toLocaleString()}`, change: "+12.5%", color: "brand-purple-500" },
                { label: "Active Users", value: metrics.users.toLocaleString(), change: "+8.2%", color: "brand-cyan-500" },
                { label: "Orders", value: metrics.orders.toLocaleString(), change: "+15.3%", color: "green-400" },
                { label: "Conversion", value: `${metrics.conversion}%`, change: "+2.1%", color: "yellow-400" },
              ].map((metric, i) => (
                <div
                  key={metric.label}
                  className="metric-card p-4 rounded-xl bg-surface-200/50 border border-surface-300/20"
                >
                  <div className="text-xs text-neutral-500 mb-1">{metric.label}</div>
                  <div className={`text-xl font-bold text-${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-green-400 mt-1">{metric.change}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Bar Chart */}
              <div className="p-4 rounded-xl bg-surface-200/50 border border-surface-300/20">
                <div className="text-sm font-semibold mb-4">Revenue Trend</div>
                <div className="flex items-end gap-2 h-32">
                  {[65, 45, 78, 52, 90, 68, 85, 73, 95, 60, 82, 88].map((height, i) => (
                    <div
                      key={i}
                      className="chart-bar flex-1 rounded-t-sm bg-gradient-to-t from-brand-purple-500 to-brand-cyan-500"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-neutral-500 mt-2">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="p-4 rounded-xl bg-surface-200/50 border border-surface-300/20">
                <div className="text-sm font-semibold mb-4">Traffic Sources</div>
                <div className="flex items-center gap-4">
                  <svg className="w-24 h-24" viewBox="0 0 36 36">
                    <circle
                      className="pie-segment"
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#7C3AED"
                      strokeWidth="3"
                      strokeDasharray="40 60"
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                    <circle
                      className="pie-segment"
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#00D4FF"
                      strokeWidth="3"
                      strokeDasharray="30 70"
                      strokeDashoffset="-40"
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                    <circle
                      className="pie-segment"
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#4ADE80"
                      strokeWidth="3"
                      strokeDasharray="20 80"
                      strokeDashoffset="-70"
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-purple-500" />
                      <span className="text-neutral-400">Organic (40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-cyan-500" />
                      <span className="text-neutral-400">Direct (30%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="text-neutral-400">Referral (20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="p-4 rounded-xl bg-surface-200/50 border border-surface-300/20">
              <div className="text-sm font-semibold mb-3">Recent Activity</div>
              <div className="space-y-2">
                {[
                  { action: "New order received", user: "John D.", time: "2m ago", type: "order" },
                  { action: "User signed up", user: "Sarah M.", time: "5m ago", type: "user" },
                  { action: "Payment processed", user: "$499.00", time: "8m ago", type: "payment" },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="activity-item flex items-center gap-3 text-sm"
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                        activity.type === "order" && "bg-brand-purple-500/20 text-brand-purple-500",
                        activity.type === "user" && "bg-brand-cyan-500/20 text-brand-cyan-500",
                        activity.type === "payment" && "bg-green-500/20 text-green-400"
                      )}
                    >
                      {activity.type === "order" ? "📦" : activity.type === "user" ? "👤" : "💳"}
                    </div>
                    <div className="flex-1">
                      <span className="text-neutral-300">{activity.action}</span>
                      <span className="text-neutral-500 ml-2">{activity.user}</span>
                    </div>
                    <span className="text-neutral-600 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const solutions = [
  {
    icon: "🏢",
    title: "Enterprise Resource Planning",
    description:
      "Unified systems for HR, finance, inventory, and operations tailored to your workflows.",
    features: ["Custom modules", "Role-based access", "Audit trails", "Integrations"],
  },
  {
    icon: "🤝",
    title: "Customer Relationship Management",
    description:
      "Track leads, manage deals, and nurture relationships with intelligent automation.",
    features: ["Pipeline management", "Email automation", "Analytics", "Mobile app"],
  },
  {
    icon: "📊",
    title: "Business Intelligence",
    description:
      "Transform raw data into actionable insights with custom dashboards and reports.",
    features: ["Real-time data", "Custom KPIs", "Forecasting", "Export tools"],
  },
  {
    icon: "🔄",
    title: "Workflow Automation",
    description:
      "Eliminate manual tasks and streamline processes with intelligent automation.",
    features: ["Visual builder", "Triggers & actions", "Approvals", "Notifications"],
  },
];

const benefits = [
  { value: "60%", label: "Reduced manual work" },
  { value: "3x", label: "Faster decisions" },
  { value: "40%", label: "Cost savings" },
  { value: "99%", label: "Data accuracy" },
];

const process = [
  {
    phase: "Discovery",
    description: "Deep dive into your business processes, pain points, and goals.",
    duration: "1-2 weeks",
  },
  {
    phase: "Design",
    description: "Architecture planning, UX design, and technical specification.",
    duration: "2-3 weeks",
  },
  {
    phase: "Development",
    description: "Agile sprints with regular demos and feedback loops.",
    duration: "8-16 weeks",
  },
  {
    phase: "Deployment",
    description: "Testing, training, data migration, and go-live support.",
    duration: "2-4 weeks",
  },
];

export default function CustomSoftwarePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate solutions
      gsap.utils.toArray<HTMLElement>(".solution-card").forEach((card) => {
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

      // Animate benefits
      gsap.fromTo(
        ".benefit-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".benefits-section",
            start: "top 80%",
          },
        }
      );

      // Animate process timeline
      gsap.utils.toArray<HTMLElement>(".process-phase").forEach((phase, i) => {
        gsap.fromTo(
          phase,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: phase,
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
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-purple-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-brand-cyan-500/15 rounded-full blur-[80px]" />
          </div>

          <div className="container-main relative z-10">
            <div className="text-center mb-12">
              <span className="text-sm text-brand-purple-500 font-semibold tracking-widest uppercase mb-4 block drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                Custom Software Development
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Software That{" "}
                <span className="bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 bg-clip-text text-transparent">
                  Transforms
                </span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Bespoke business applications designed around your unique processes.
                No off-the-shelf compromises—just software that works exactly how you need it.
              </p>
            </div>

            {/* Interactive Hero Animation */}
            <DashboardHero />
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section py-16 bg-surface-100/30">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="benefit-item text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-purple-500 mb-2">
                    {benefit.value}
                  </div>
                  <div className="text-neutral-500">{benefit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What We <span className="text-brand-purple-500">Build</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Enterprise-grade solutions tailored to your industry and workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {solutions.map((solution, i) => (
                <div
                  key={i}
                  className="solution-card p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30 hover:border-brand-purple-500/30 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{solution.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-purple-500 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-neutral-400 mb-6">{solution.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-brand-purple-500/10 text-brand-purple-500 text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-brand-cyan-500">Process</span>
              </h2>
              <p className="text-neutral-400">
                A proven methodology for delivering successful custom software.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple-500 via-brand-cyan-500 to-brand-purple-500" />

              {process.map((phase, i) => (
                <div
                  key={i}
                  className={cn(
                    "process-phase relative grid md:grid-cols-2 gap-8 mb-12 last:mb-0",
                    i % 2 === 1 && "md:text-right"
                  )}
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2",
                      i % 2 === 0 ? "bg-brand-purple-500" : "bg-brand-cyan-500"
                    )}
                  />

                  {/* Content */}
                  <div
                    className={cn(
                      "pl-16 md:pl-0",
                      i % 2 === 0 ? "md:pr-12" : "md:order-2 md:pl-12"
                    )}
                  >
                    <div
                      className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2",
                        i % 2 === 0
                          ? "bg-brand-purple-500/20 text-brand-purple-500"
                          : "bg-brand-cyan-500/20 text-brand-cyan-500"
                      )}
                    >
                      {phase.duration}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{phase.phase}</h3>
                    <p className="text-neutral-400">{phase.description}</p>
                  </div>

                  {/* Empty column for alternating layout */}
                  <div className={cn("hidden md:block", i % 2 === 1 && "md:order-1")} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Industries We <span className="text-brand-purple-500">Serve</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Real Estate",
                "Healthcare",
                "Finance",
                "E-commerce",
                "Logistics",
                "Manufacturing",
                "Education",
                "Hospitality",
              ].map((industry, i) => (
                <span
                  key={industry}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105",
                    i % 2 === 0
                      ? "border-brand-purple-500/30 text-brand-purple-500 hover:bg-brand-purple-500/10"
                      : "border-brand-cyan-500/30 text-brand-cyan-500 hover:bg-brand-cyan-500/10"
                  )}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-surface-100/30 to-black">
          <div className="container-main text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Streamline Your{" "}
              <span className="text-brand-purple-500">Business?</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how custom software can transform your operations.
              Book a free discovery session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-purple-500 text-white font-semibold rounded-full hover:bg-brand-purple-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              >
                Book Discovery Call
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

"use client";

import { useRef, useEffect } from "react";
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

const values = [
  {
    icon: "⚡",
    title: "Obsession with Quality",
    description:
      "We don't ship good enough. Every pixel, every line of code, every interaction is crafted with obsessive attention to detail.",
  },
  {
    icon: "🎯",
    title: "Results-Driven",
    description:
      "Beautiful design means nothing without business impact. We measure success by the results we deliver for our clients.",
  },
  {
    icon: "🤝",
    title: "True Partnership",
    description:
      "We're not vendors—we're partners. Your success is our success, and we're invested in your long-term growth.",
  },
  {
    icon: "🚀",
    title: "Innovation First",
    description:
      "We stay ahead of the curve, constantly exploring new technologies and approaches to give you a competitive edge.",
  },
  {
    icon: "💬",
    title: "Radical Transparency",
    description:
      "No surprises, no hidden costs, no BS. You'll always know exactly where your project stands.",
  },
  {
    icon: "⏱️",
    title: "Speed Without Sacrifice",
    description:
      "We move fast but never cut corners. Efficient processes mean faster delivery without compromising quality.",
  },
];

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    bio: "Full-stack developer and digital strategist with deep expertise in web design, custom software, and CRM development. Building premium digital experiences that drive real business results.",
    image: "",
    socials: {
      email: "hello@webxexpert.com",
      phone: "+91 8789389941",
    },
  },
];

const milestones = [
  { year: "2019", title: "Founded", description: "Started with a vision to build exceptional digital products" },
  { year: "2020", title: "First Major Client", description: "Delivered enterprise CRM serving 100K+ users" },
  { year: "2021", title: "Team Growth", description: "Expanded to 15 talented team members" },
  { year: "2022", title: "50+ Projects", description: "Crossed milestone of 50 successful projects" },
  { year: "2023", title: "Global Reach", description: "Clients across 12 countries on 4 continents" },
  { year: "2024", title: "Industry Recognition", description: "Named top development agency by TechCrunch" },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Three.js",
  "GSAP",
  "Tailwind",
];

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate story section
      gsap.fromTo(
        ".story-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-content",
            start: "top 80%",
          },
        }
      );

      // Animate value cards
      gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
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

      // Animate team cards
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });

      // Animate timeline
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
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
        <PageHeader
          title="About Us"
          subtitle="Who We Are"
          description="We're a team of designers, engineers, and strategists who believe in the power of exceptional digital experiences."
          gradient="purple"
          size="large"
        />

        {/* Story Section */}
        <section ref={storyRef} className="py-20 md:py-32">
          <div className="container-main">
            <div className="story-content grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <div>
                <span className="text-sm text-brand-purple-500 font-semibold tracking-widest uppercase mb-4 block">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Built Different,{" "}
                  <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                    By Design
                  </span>
                </h2>
                <div className="space-y-4 text-neutral-400 text-lg leading-relaxed">
                  <p>
                    WebXExpert was born from a simple frustration: too many agencies
                    deliver mediocre work at premium prices. We set out to change that.
                  </p>
                  <p>
                    Our founding team came from tech giants and award-winning agencies,
                    bringing enterprise-grade expertise to businesses of all sizes. We
                    believe every company deserves world-class digital experiences—not
                    just the Fortune 500.
                  </p>
                  <p>
                    Today, we&apos;re a tight-knit team of craftspeople who genuinely love
                    what we do. We geek out over smooth animations, obsess over
                    performance metrics, and celebrate when our clients succeed.
                  </p>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-100/50 border border-brand-purple-500/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl mx-auto mb-4 bg-brand-purple-500/20 flex items-center justify-center">
                      <span className="text-5xl">🏢</span>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Add: /images/about/team-office.jpg
                    </p>
                  </div>
                </div>
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 via-transparent to-brand-purple-500/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm text-brand-cyan-500 font-semibold tracking-widest uppercase mb-4 block">
                Our Values
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What We{" "}
                <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                  Stand For
                </span>
              </h2>
              <p className="text-lg text-neutral-400">
                These aren&apos;t just words on a wall. They guide every decision we
                make and every line of code we write.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="value-card p-8 rounded-2xl bg-surface-200/50 border border-surface-300/30 hover:border-brand-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-cyan-500 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm text-brand-purple-500 font-semibold tracking-widest uppercase mb-4 block">
                The Founder
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The Person{" "}
                <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                  Behind It All
                </span>
              </h2>
              <p className="text-lg text-neutral-400">
                WebXExpert is founder-led — every project gets my direct attention,
                expertise, and commitment to excellence.
              </p>
            </div>

            <div className="flex justify-center">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="team-card group w-full max-w-sm rounded-3xl overflow-hidden bg-surface-100/50 border border-surface-300/30 hover:border-brand-purple-500/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(124,58,237,0.15)]"
                >
                  {/* Avatar */}
                  <div className="relative aspect-square bg-surface-200/50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-32 h-32 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(124,58,237,0.2) 100%)",
                          border: "2px solid rgba(0,212,255,0.3)",
                        }}
                      >
                        <span className="text-5xl font-black text-white/70 tracking-tight">
                          RK
                        </span>
                      </div>
                    </div>
                    {/* Decorative glow */}
                    <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    {/* Founder badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan-500 text-black">
                      Founder
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-brand-purple-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-brand-cyan-500 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Contact links */}
                    <div className="flex flex-col gap-2 pt-6 border-t border-surface-300/20">
                      <a
                        href={`mailto:${member.socials.email}`}
                        className="flex items-center gap-3 text-sm text-neutral-400 hover:text-brand-cyan-500 transition-colors"
                      >
                        <span className="text-lg">📧</span>
                        {member.socials.email}
                      </a>
                      <a
                        href={`tel:${member.socials.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-sm text-neutral-400 hover:text-brand-cyan-500 transition-colors"
                      >
                        <span className="text-lg">📱</span>
                        {member.socials.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm text-brand-cyan-500 font-semibold tracking-widest uppercase mb-4 block">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan-500 via-brand-purple-500 to-brand-cyan-500" />

                {/* Timeline items */}
                <div className="space-y-8">
                  {milestones.map((milestone, i) => (
                    <div
                      key={i}
                      className="timeline-item relative flex gap-8 items-start"
                    >
                      {/* Dot */}
                      <div
                        className={cn(
                          "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0",
                          i % 2 === 0
                            ? "bg-brand-cyan-500 text-black"
                            : "bg-brand-purple-500 text-white"
                        )}
                      >
                        {milestone.year}
                      </div>

                      {/* Content */}
                      <div className="pt-3">
                        <h3 className="text-xl font-bold mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-neutral-400">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Tech Stack</h2>
              <p className="text-neutral-500">
                We use the best tools for the job
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, i) => (
                <span
                  key={tech}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105",
                    i % 2 === 0
                      ? "border-brand-cyan-500/30 text-brand-cyan-500 hover:bg-brand-cyan-500/10"
                      : "border-brand-purple-500/30 text-brand-purple-500 hover:bg-brand-purple-500/10"
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Want to Work With{" "}
              <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
                Us?
              </span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              We&apos;re always looking for talented people and exciting projects.
              Let&apos;s build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-cyan-500 text-black font-semibold rounded-full hover:bg-brand-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Start a Project
              </Link>
              <a
                href="mailto:careers@webxexpert.com"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Join Our Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

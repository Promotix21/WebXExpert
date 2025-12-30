"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/animations/Reveal";

const techCategories = [
  {
    name: "Frontend",
    items: [
      { name: "Next.js", icon: "⚡" },
      { name: "React", icon: "⚛️" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "GSAP", icon: "✨" },
      { name: "Three.js", icon: "🎮" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: "🟢" },
      { name: "NestJS", icon: "🦅" },
      { name: "Express", icon: "🚂" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Redis", icon: "🔴" },
    ],
  },
  {
    name: "CMS & E-commerce",
    items: [
      { name: "WordPress", icon: "📝" },
      { name: "Shopify", icon: "🛒" },
      { name: "Strapi", icon: "🚀" },
      { name: "Sanity", icon: "📦" },
      { name: "WooCommerce", icon: "🛍️" },
      { name: "Elementor", icon: "🔧" },
    ],
  },
  {
    name: "DevOps & Tools",
    items: [
      { name: "AWS", icon: "☁️" },
      { name: "Vercel", icon: "▲" },
      { name: "Docker", icon: "🐳" },
      { name: "N8N", icon: "🔄" },
      { name: "Git", icon: "📂" },
      { name: "Cloudflare", icon: "🔶" },
    ],
  },
];

export function TechStack() {
  return (
    <section className="section-padding bg-surface-000 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <Reveal>
            <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
              Tech Stack
            </span>
          </Reveal>

          <SplitText
            as="h2"
            className="heading-section mb-6"
            highlightWords={["Modern"]}
            highlightClassName="gradient-text"
          >
            Built With Modern Technologies
          </SplitText>

          <Reveal delay={0.4}>
            <p className="body-large">
              We use the best tools for the job. Always learning, always
              evolving, always delivering cutting-edge solutions.
            </p>
          </Reveal>
        </div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {techCategories.map((category, catIndex) => (
            <Reveal key={category.name} delay={catIndex * 0.1}>
              <div className="bg-surface-100 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-surface-300/50">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-neutral-300">
                  {category.name}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {category.items.map((tech, i) => (
                    <TechBadge key={tech.name} {...tech} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Additional Tools Row */}
        <Reveal delay={0.5}>
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-sm text-neutral-500 mb-4">And many more...</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "Framer Motion",
                "Lenis",
                "Prisma",
                "GraphQL",
                "REST APIs",
                "WebSockets",
                "Stripe",
                "OpenAI",
                "Claude",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-surface-200 rounded-full text-xs md:text-sm text-neutral-400 hover:text-white hover:bg-surface-250 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Tech Badge Component
 */
function TechBadge({
  name,
  icon,
  delay = 0,
}: {
  name: string;
  icon: string;
  delay?: number;
}) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;

    const handleMouseEnter = () => {
      gsap.to(badge, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(badge, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    badge.addEventListener("mouseenter", handleMouseEnter);
    badge.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      badge.removeEventListener("mouseenter", handleMouseEnter);
      badge.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className={cn(
        "flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl",
        "bg-surface-200/50 hover:bg-surface-200 transition-colors",
        "cursor-default"
      )}
    >
      <span className="text-lg md:text-xl">{icon}</span>
      <span className="text-xs md:text-sm font-medium text-neutral-300">{name}</span>
    </div>
  );
}

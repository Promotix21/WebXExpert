"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  gradient?: "cyan" | "purple" | "mixed";
  size?: "default" | "large";
}

export function PageHeader({
  title,
  subtitle,
  description,
  gradient = "cyan",
  size = "default",
}: PageHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      // Animate title words
      const words = header.querySelectorAll(".title-word");
      gsap.fromTo(
        words,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Animate subtitle
      gsap.fromTo(
        header.querySelector(".page-subtitle"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );

      // Animate description
      gsap.fromTo(
        header.querySelector(".page-description"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.6 }
      );

      // Animate decorative elements
      gsap.fromTo(
        header.querySelectorAll(".header-decoration"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)", delay: 0.5 }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  const gradientClass = {
    cyan: "from-brand-cyan-500 to-brand-cyan-400",
    purple: "from-brand-purple-500 to-brand-purple-400",
    mixed: "from-brand-cyan-500 to-brand-purple-500",
  }[gradient];

  const titleWords = title.split(" ");

  return (
    <div
      ref={headerRef}
      className={cn(
        "relative overflow-hidden bg-black",
        size === "large" ? "pt-40 pb-24 md:pt-48 md:pb-32" : "pt-32 pb-16 md:pt-40 md:pb-20"
      )}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div
          className="header-decoration absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: gradient === "purple" ? "#7C3AED" : "#00D4FF",
          }}
        />
        <div
          className="header-decoration absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{
            background: gradient === "cyan" ? "#00D4FF" : "#7C3AED",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* Subtitle */}
        {subtitle && (
          <span
            className={cn(
              "page-subtitle inline-block text-sm font-semibold tracking-widest uppercase mb-6",
              gradient === "purple" ? "text-brand-purple-500" : "text-brand-cyan-500"
            )}
          >
            {subtitle}
          </span>
        )}

        {/* Title with word-by-word animation */}
        <h1
          className={cn(
            "font-bold leading-tight mb-6",
            size === "large"
              ? "text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              : "text-4xl md:text-5xl lg:text-6xl"
          )}
          style={{ perspective: "1000px" }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span
                className={cn(
                  "title-word inline-block",
                  i === titleWords.length - 1 &&
                    `bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`
                )}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Description */}
        {description && (
          <p className="page-description text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: string;
}

/**
 * Infinite marquee component
 */
export function Marquee({
  children,
  className,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  gap = "2rem",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Get content width
    const contentWidth = content.offsetWidth;

    // Set initial position based on direction
    gsap.set(content, {
      x: direction === "left" ? 0 : -contentWidth,
    });

    // Calculate duration based on speed (pixels per second)
    const duration = contentWidth / speed;

    // Create infinite animation
    animationRef.current = gsap.to(content, {
      x: direction === "left" ? -contentWidth : 0,
      duration,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => {
        gsap.to(animationRef.current, { timeScale: 0, duration: 0.5 });
      });

      container.addEventListener("mouseleave", () => {
        gsap.to(animationRef.current, { timeScale: 1, duration: 0.5 });
      });
    }

    return () => {
      animationRef.current?.kill();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden relative", className)}
    >
      <div
        ref={contentRef}
        className="flex will-change-transform"
        style={{ gap }}
      >
        {/* Original content */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        {/* Duplicated for seamless loop */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * MarqueeItem - Individual item in marquee
 */
export function MarqueeItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("shrink-0", className)}>
      {children}
    </div>
  );
}

/**
 * TextMarquee - Preset for text marquees
 */
interface TextMarqueeProps {
  items: string[];
  className?: string;
  textClassName?: string;
  separator?: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
}

export function TextMarquee({
  items,
  className,
  textClassName,
  separator = <span className="text-brand-pink-500 mx-4">•</span>,
  speed = 50,
  direction = "left",
}: TextMarqueeProps) {
  return (
    <Marquee speed={speed} direction={direction} className={className}>
      {items.map((item, i) => (
        <MarqueeItem key={i} className="flex items-center">
          <span className={cn("whitespace-nowrap", textClassName)}>
            {item}
          </span>
          {separator}
        </MarqueeItem>
      ))}
    </Marquee>
  );
}

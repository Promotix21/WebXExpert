"use client";

import { useRef, useEffect, useMemo, createElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  splitType?: "words" | "chars" | "lines";
  animation?: "reveal" | "stagger" | "wave" | "fade";
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: boolean;
  triggerStart?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

/**
 * SplitText component for animated text reveals
 * Splits text into words without breaking mid-word
 */
export function SplitText({
  children,
  className,
  as = "div",
  animation = "reveal",
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  trigger = true,
  triggerStart = "top 80%",
  highlightWords = [],
  highlightClassName = "gradient-text",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  // Split text into words
  const words = useMemo(() => {
    return children.split(/\s+/).filter(Boolean);
  }, [children]);

  // Check if word should be highlighted
  const isHighlighted = (word: string) => {
    return highlightWords.some(
      (hw) => word.toLowerCase().includes(hw.toLowerCase())
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll("[data-split]");
    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, {
      yPercent: animation === "reveal" ? 100 : 0,
      opacity: animation === "fade" ? 0 : 1,
    });

    contextRef.current = gsap.context(() => {
      const animationConfig: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger: {
          amount: stagger * elements.length,
          from: animation === "wave" ? "center" : "start",
        },
        ease,
        delay,
      };

      if (trigger) {
        animationConfig.scrollTrigger = {
          trigger: container,
          start: triggerStart,
          toggleActions: "play none none reverse",
        };
      }

      gsap.to(elements, animationConfig);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, [animation, duration, stagger, ease, delay, trigger, triggerStart]);

  const content = (
    <>
      {words.map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden mr-[0.25em]">
          <span
            data-split
            className={cn(
              "inline-block",
              isHighlighted(word) && highlightClassName
            )}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  );

  return createElement(
    as,
    {
      ref: containerRef,
      className: cn("split-text", className),
      "aria-label": children,
    },
    content
  );
}

/**
 * AnimatedHeadline - Preset for hero headlines
 */
export function AnimatedHeadline({
  children,
  className,
  highlightWords = [],
}: {
  children: string;
  className?: string;
  highlightWords?: string[];
}) {
  return (
    <SplitText
      as="h1"
      className={cn("heading-display", className)}
      animation="reveal"
      stagger={0.04}
      duration={1}
      ease="power4.out"
      highlightWords={highlightWords}
      highlightClassName="gradient-text font-black"
    >
      {children}
    </SplitText>
  );
}

/**
 * AnimatedParagraph - Preset for body text reveals
 */
export function AnimatedParagraph({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <SplitText
      as="p"
      className={cn("body-large", className)}
      animation="fade"
      stagger={0.02}
      duration={0.6}
      delay={0.3}
    >
      {children}
    </SplitText>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  duration?: number;
  delay?: number;
  ease?: string;
  distance?: number;
  trigger?: boolean;
  triggerStart?: string;
  once?: boolean;
}

/**
 * Reveal component for scroll-triggered animations
 */
export function Reveal({
  children,
  className,
  direction = "up",
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  distance = 60,
  trigger = true,
  triggerStart = "top 85%",
  once = false,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Determine initial state based on direction
    const initialState: gsap.TweenVars = { opacity: 0 };
    const finalState: gsap.TweenVars = { opacity: 1 };

    switch (direction) {
      case "up":
        initialState.y = distance;
        finalState.y = 0;
        break;
      case "down":
        initialState.y = -distance;
        finalState.y = 0;
        break;
      case "left":
        initialState.x = distance;
        finalState.x = 0;
        break;
      case "right":
        initialState.x = -distance;
        finalState.x = 0;
        break;
      case "scale":
        initialState.scale = 0.8;
        finalState.scale = 1;
        break;
      case "fade":
        // Only opacity, already set
        break;
    }

    // Set initial state
    gsap.set(element, initialState);

    contextRef.current = gsap.context(() => {
      const animationConfig: gsap.TweenVars = {
        ...finalState,
        duration,
        ease,
        delay,
      };

      if (trigger) {
        animationConfig.scrollTrigger = {
          trigger: element,
          start: triggerStart,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        };
      }

      gsap.to(element, animationConfig);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, [direction, duration, delay, ease, distance, trigger, triggerStart, once]);

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/**
 * StaggerReveal - Container for staggered children animations
 */
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  triggerStart?: string;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  duration = 0.8,
  direction = "up",
  distance = 40,
  triggerStart = "top 85%",
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll("[data-stagger-item]");
    if (children.length === 0) return;

    // Determine animation based on direction
    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = { opacity: 1 };

    switch (direction) {
      case "up":
        from.y = distance;
        to.y = 0;
        break;
      case "down":
        from.y = -distance;
        to.y = 0;
        break;
      case "left":
        from.x = distance;
        to.x = 0;
        break;
      case "right":
        from.x = -distance;
        to.x = 0;
        break;
      case "scale":
        from.scale = 0.8;
        to.scale = 1;
        break;
    }

    gsap.set(children, from);

    contextRef.current = gsap.context(() => {
      gsap.to(children, {
        ...to,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      contextRef.current?.revert();
    };
  }, [stagger, duration, direction, distance, triggerStart]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * StaggerItem - Child item for StaggerReveal
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger-item className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

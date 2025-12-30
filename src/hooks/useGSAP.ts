"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export function useGSAP<T extends HTMLElement = HTMLElement>(
  callback: (element: T, gsapContext: gsap.Context) => void | gsap.core.Timeline | gsap.core.Tween,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create GSAP context for automatic cleanup
    contextRef.current = gsap.context(() => {
      callback(element, contextRef.current!);
    }, element);

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger<T extends HTMLElement = HTMLElement>(
  options: {
    animation: gsap.TweenVars;
    trigger?: ScrollTrigger.Vars;
  },
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    contextRef.current = gsap.context(() => {
      gsap.to(element, {
        ...options.animation,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...options.trigger,
        },
      });
    });

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}

/**
 * Hook for staggered reveal animations
 */
export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  options: {
    staggerAmount?: number;
    duration?: number;
    ease?: string;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
  } = {},
  deps: React.DependencyList = []
) {
  const containerRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const {
    staggerAmount = 0.1,
    duration = 0.8,
    ease = "power3.out",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll("[data-stagger]");
    if (children.length === 0) return;

    contextRef.current = gsap.context(() => {
      gsap.fromTo(
        children,
        from,
        {
          ...to,
          duration,
          stagger: staggerAmount,
          ease,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Hook for magnetic button effect
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength: number = 0.5
) {
  const elementRef = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return elementRef;
}

/**
 * Hook for parallax effect
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  speed: number = 0.5,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    contextRef.current = gsap.context(() => {
      gsap.to(element, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}

/**
 * Hook for text reveal animation (word by word)
 */
export function useTextReveal<T extends HTMLElement = HTMLElement>(
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const words = element.querySelectorAll(".split-word > span");
    if (words.length === 0) return;

    contextRef.current = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}

/**
 * Hook for counter animation
 */
export function useCounter(
  endValue: number,
  options: {
    duration?: number;
    delay?: number;
    decimals?: number;
  } = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const { duration = 2, delay = 0, decimals = 0 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    contextRef.current = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = counter.value.toFixed(decimals);
        },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      contextRef.current?.revert();
    };
  }, [endValue, duration, delay, decimals]);

  return elementRef;
}

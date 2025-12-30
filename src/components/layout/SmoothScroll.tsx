"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // GSAP integration - will be used later
    // ScrollTrigger.scrollerProxy(document.body, {
    //   scrollTop(value) {
    //     if (arguments.length && lenisRef.current) {
    //       lenisRef.current.scrollTo(value as number, { immediate: true });
    //     }
    //     return lenisRef.current?.scroll || 0;
    //   },
    //   getBoundingClientRect() {
    //     return {
    //       top: 0,
    //       left: 0,
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     };
    //   },
    // });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose Lenis to window for GSAP ScrollTrigger integration
    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenisRef.current;
    }

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}

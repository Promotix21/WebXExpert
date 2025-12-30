"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Reset lenis scroll position if available
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    // Create entrance animation timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsReady(true)
      });

      // Animate columns revealing content
      const columns = overlay.querySelectorAll('.transition-column');

      tl.set(columns, { scaleY: 1 })
        .to(columns, {
          scaleY: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.inOut",
          transformOrigin: "top"
        })
        .fromTo(content,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div className="relative">
      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none flex"
        aria-hidden="true"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="transition-column flex-1 bg-black relative"
            style={{ transformOrigin: "top" }}
          >
            {/* Gradient accent at bottom of each column */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: i % 2 === 0
                  ? "linear-gradient(90deg, #00D4FF 0%, #7C3AED 100%)"
                  : "linear-gradient(90deg, #7C3AED 0%, #00D4FF 100%)"
              }}
            />
            {/* Particle sparkle effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-1 h-1 rounded-full bg-brand-cyan-500"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: "100%",
                    opacity: 0
                  }}
                  animate={{
                    y: "-10%",
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08 + j * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Page Content */}
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>

      {/* Loading indicator for slow transitions */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="fixed bottom-8 right-8 z-[10000]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-brand-cyan-500/30 border-t-brand-cyan-500 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

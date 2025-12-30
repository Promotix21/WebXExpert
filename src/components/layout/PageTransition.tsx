"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Column reveal transition overlay */}
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { delay: 0.8, duration: 0.3 } }}
        >
          <div ref={columnsRef} className="flex h-full">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-black relative overflow-hidden"
                initial={{ scaleY: 1 }}
                animate={{
                  scaleY: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1 + i * 0.08,
                    ease: [0.645, 0.045, 0.355, 1.000]
                  }
                }}
                style={{ transformOrigin: "top" }}
              >
                {/* Gradient accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(90deg, #00D4FF, #7C3AED)"
                      : "linear-gradient(90deg, #7C3AED, #00D4FF)"
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: { duration: 0.4, delay: i * 0.05 }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Page content with fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: 0.5,
              ease: [0.645, 0.045, 0.355, 1.000]
            }
          }}
          exit={{
            opacity: 0,
            y: -10,
            transition: { duration: 0.3 }
          }}
        >
          {children}
        </motion.div>

        {/* Exit animation overlay */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ opacity: 0 }}
          exit={{ opacity: 1, transition: { duration: 0.2 } }}
        >
          <div className="flex h-full">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-black"
                initial={{ scaleY: 0 }}
                exit={{
                  scaleY: 1,
                  transition: {
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.645, 0.045, 0.355, 1.000]
                  }
                }}
                style={{ transformOrigin: "bottom" }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Alternative: Morph transition for more dramatic effect
export function MorphPageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline();

      tl.fromTo(
        ".morph-circle",
        { scale: 0 },
        {
          scale: 60,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1
        }
      )
      .to(".morph-circle", {
        opacity: 0,
        duration: 0.3,
      }, "-=0.2")
      .fromTo(
        ".page-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }, container);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={containerRef} className="relative">
      {/* Morph circles */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="morph-circle absolute w-10 h-10 rounded-full"
          style={{ background: "linear-gradient(135deg, #00D4FF, #7C3AED)" }}
        />
        <div
          className="morph-circle absolute w-10 h-10 rounded-full"
          style={{ background: "#00D4FF", opacity: 0.5 }}
        />
      </div>

      {/* Page content */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}

// Slide transition
export function SlidePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: "100%", opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }
        }}
        exit={{
          x: "-30%",
          opacity: 0,
          transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

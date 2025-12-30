"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Reset lenis scroll position if available
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Create entrance animation timeline - only animate the overlay, not the content
    const ctx = gsap.context(() => {
      const columns = overlay.querySelectorAll('.transition-column');

      // Quick reveal animation that doesn't touch page content
      gsap.fromTo(columns,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.inOut",
          transformOrigin: "top"
        }
      );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay - reveals content from top */}
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
          </div>
        ))}
      </div>

      {/* Page Content - rendered directly without wrapper that affects opacity */}
      {children}
    </>
  );
}

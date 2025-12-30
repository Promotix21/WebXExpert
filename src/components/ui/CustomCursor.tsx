"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor || !cursorDot || !cursorTextEl) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Instant dot movement - no delay
      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth cursor follow animation - faster lerp for snappier response
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      gsap.set(cursorTextEl, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Handle hover states
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor;

      if (isInteractive) {
        setIsHovering(true);
        const text = target.dataset.cursorText || target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, []);

  // Hide on touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
    }
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovering ? "scale-150" : "scale-100"}`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? "border-brand-cyan-500 bg-brand-cyan-500/10"
              : "border-white"
          }`}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            isHovering ? "bg-brand-cyan-500 scale-0" : "bg-white scale-100"
          }`}
        />
      </div>

      {/* Cursor text */}
      <div
        ref={cursorTextRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ${
          cursorText ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <span className="block mt-16 text-xs font-medium text-white whitespace-nowrap">
          {cursorText}
        </span>
      </div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

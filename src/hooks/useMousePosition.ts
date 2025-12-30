"use client";

import { useState, useEffect, useCallback } from "react";
import { throttle } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

/**
 * Hook to track mouse position with normalized values (-1 to 1)
 */
export function useMousePosition(throttleMs: number = 16) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = (y / window.innerHeight) * 2 - 1;

    setMousePosition({ x, y, normalizedX, normalizedY });
  }, []);

  useEffect(() => {
    const throttledUpdate = throttle(updateMousePosition, throttleMs);
    window.addEventListener("mousemove", throttledUpdate);

    return () => {
      window.removeEventListener("mousemove", throttledUpdate);
    };
  }, [updateMousePosition, throttleMs]);

  return mousePosition;
}

/**
 * Hook to track mouse position relative to an element
 */
export function useRelativeMousePosition<T extends HTMLElement>(
  throttleMs: number = 16
) {
  const [ref, setRef] = useState<T | null>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInside: false,
  });

  const updatePosition = useCallback(
    (e: MouseEvent) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;
      const isInside =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      setPosition({ x, y, normalizedX, normalizedY, isInside });
    },
    [ref]
  );

  useEffect(() => {
    if (!ref) return;

    const throttledUpdate = throttle(updatePosition, throttleMs);
    window.addEventListener("mousemove", throttledUpdate);

    return () => {
      window.removeEventListener("mousemove", throttledUpdate);
    };
  }, [ref, updatePosition, throttleMs]);

  return { ref: setRef, position };
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useGSAP";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.3);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate header on mount
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Animate mobile menu
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isMobileMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        menu,
        { opacity: 0, clipPath: "circle(0% at 100% 0%)" },
        {
          opacity: 1,
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.8,
          ease: "power4.out",
        }
      );

      // Stagger menu items
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(menu, {
        opacity: 0,
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.5,
        ease: "power3.in",
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-surface-000/80 backdrop-blur-lg border-b border-surface-300/50"
            : "bg-transparent"
        )}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-60 flex items-center gap-2 group"
              onClick={closeMobileMenu}
            >
              <Logo />
              <span className="text-lg md:text-xl font-bold tracking-tight">
                Web<span className="gradient-text">X</span>Expert
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button
                ref={ctaRef}
                className="btn-primary px-6 py-2.5 text-sm"
              >
                Start Project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="relative z-60 lg:hidden w-10 h-10 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-4 flex flex-col justify-between">
                <span
                  className={cn(
                    "block h-0.5 bg-white transition-all duration-300 origin-center",
                    isMobileMenuOpen && "rotate-45 translate-y-[7px]"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 bg-white transition-all duration-300",
                    isMobileMenuOpen && "opacity-0 scale-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 bg-white transition-all duration-300 origin-center",
                    isMobileMenuOpen && "-rotate-45 -translate-y-[7px]"
                  )}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 z-50 bg-surface-000 opacity-0 pointer-events-none lg:hidden",
          isMobileMenuOpen && "pointer-events-auto"
        )}
      >
        <div className="h-full flex flex-col justify-center items-center px-6">
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                ref={(el) => {
                  menuItemsRef.current[i] = el;
                }}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-4xl md:text-5xl font-bold text-white hover:text-brand-pink-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            ref={(el) => {
              menuItemsRef.current[navItems.length] = el as unknown as HTMLAnchorElement;
            }}
            className="btn-primary mt-12 text-lg px-8 py-4"
            onClick={closeMobileMenu}
          >
            Start Project
          </button>

          {/* Contact info at bottom */}
          <div
            ref={(el) => {
              menuItemsRef.current[navItems.length + 1] = el as unknown as HTMLAnchorElement;
            }}
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-sm text-neutral-500"
          >
            <a
              href="mailto:hello@webxexpert.com"
              className="hover:text-brand-pink-500 transition-colors"
            >
              hello@webxexpert.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * NavLink component with hover animation
 */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const underline = link.querySelector(".underline-animation");
    if (!underline) return;

    const handleMouseEnter = () => {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      className="relative text-sm font-medium text-neutral-300 hover:text-white transition-colors py-2"
    >
      {children}
      <span className="underline-animation absolute bottom-0 left-0 w-full h-0.5 bg-brand-pink-500 scale-x-0" />
    </a>
  );
}

/**
 * WebXExpert Logo - Animated X mark
 */
function Logo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const triangle = svg.querySelector(".logo-triangle");
    if (!triangle) return;

    // Initial draw animation
    gsap.fromTo(
      triangle,
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.8,
      }
    );
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 32 32"
      className="w-8 h-8 md:w-10 md:h-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* X shape */}
      <path
        d="M6 6L26 26M26 6L6 26"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Accent triangle */}
      <path
        className="logo-triangle"
        d="M16 4L24 16L16 28"
        stroke="url(#gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset="100"
        fill="none"
      />
      <defs>
        <linearGradient id="gradient" x1="16" y1="4" x2="24" y2="28">
          <stop stopColor="#FF0080" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

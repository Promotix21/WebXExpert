"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

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
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.fromTo(
        header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Logo reveal with scale
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
        );
      }

      // CTA button glow pulse
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          boxShadow: "0 0 30px rgba(255, 0, 128, 0.5)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Magnetic effect for CTA button
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animate mobile menu
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isMobileMenuOpen) {
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
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-60 flex items-center gap-2 group"
              onClick={closeMobileMenu}
            >
              <div ref={logoRef} className="relative">
                <Image
                  src="/webxexpert-logo-light.png"
                  alt="WebXExpert"
                  width={180}
                  height={45}
                  className="h-8 md:h-10 w-auto"
                  priority
                />
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg bg-gradient-to-r from-brand-pink-500/30 to-brand-cyan-500/30" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <NavLink key={item.href} href={item.href} index={index}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button
                ref={ctaRef}
                className="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 rounded-full overflow-hidden group"
              >
                <span className="relative z-10">Start Project</span>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
                    "block h-0.5 rounded-full bg-white transition-all duration-300 origin-center",
                    isMobileMenuOpen && "rotate-45 translate-y-[7px]"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 rounded-full bg-white transition-all duration-300",
                    isMobileMenuOpen && "opacity-0 scale-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 rounded-full bg-white transition-all duration-300 origin-center",
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
          "fixed inset-0 z-50 bg-black opacity-0 pointer-events-none lg:hidden",
          isMobileMenuOpen && "pointer-events-auto"
        )}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-500/10 via-transparent to-brand-cyan-500/10" />

        <div className="h-full flex flex-col justify-center items-center px-6 relative">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                ref={(el) => {
                  menuItemsRef.current[i] = el;
                }}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-4xl md:text-5xl font-bold text-white hover:text-brand-pink-500 transition-colors relative group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-brand-pink-500 to-brand-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <button
            ref={(el) => {
              menuItemsRef.current[navItems.length] = el as unknown as HTMLAnchorElement;
            }}
            className="mt-12 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 rounded-full"
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
  index,
}: {
  href: string;
  children: React.ReactNode;
  index: number;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    // Staggered entrance animation
    gsap.fromTo(
      link,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.6 + index * 0.1,
      }
    );
  }, [index]);

  return (
    <a
      ref={linkRef}
      href={href}
      className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
    >
      {children}
      {/* Animated underline */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-pink-500 to-brand-cyan-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
      {/* Hover glow */}
      <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>
  );
}

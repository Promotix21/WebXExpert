"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function InnerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  // Animate header on mount
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );

      // CTA button glow pulse
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
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
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5"
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-60 flex items-center gap-2 group"
              onClick={closeMobileMenu}
            >
              <Image
                src="/webxexpert-logo-light.png"
                alt="WebXExpert"
                width={180}
                height={45}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors group",
                    pathname === item.href
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  {item.label}
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-cyan-500" />
                  )}
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-cyan-500 to-brand-cyan-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                ref={ctaRef}
                href="/contact"
                className="relative inline-block px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-cyan-500 to-brand-cyan-600 rounded-full overflow-hidden group"
              >
                <span className="relative z-10">Start Project</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Link>
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
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 via-transparent to-brand-purple-500/10" />

        <div className="h-full flex flex-col justify-center items-center px-6 relative">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                ref={(el) => {
                  menuItemsRef.current[i] = el;
                }}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "text-4xl md:text-5xl font-bold transition-colors relative group",
                  pathname === item.href
                    ? "text-brand-cyan-500"
                    : "text-white hover:text-brand-cyan-500"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <Link
            ref={(el) => {
              menuItemsRef.current[navItems.length] = el;
            }}
            href="/contact"
            className="mt-12 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-brand-cyan-500 to-brand-cyan-600 rounded-full"
            onClick={closeMobileMenu}
          >
            Start Project
          </Link>
        </div>
      </div>
    </>
  );
}

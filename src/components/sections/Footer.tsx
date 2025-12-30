"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = {
  services: [
    { label: "Web Design", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "Custom Software", href: "#services" },
    { label: "CRM Development", href: "#work" },
    { label: "API Integrations", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  connect: [
    { label: "Twitter/X", href: "https://twitter.com", icon: "𝕏" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
    { label: "GitHub", href: "https://github.com", icon: "◉" },
    { label: "Instagram", href: "https://instagram.com", icon: "◎" },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      // Reveal animation on scroll
      gsap.fromTo(
        content.querySelectorAll(".footer-animate"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan-500/5 via-transparent to-transparent" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan-500/50 to-transparent" />

      <div ref={contentRef} className="container-main relative z-10">
        {/* Main Footer */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-5 footer-animate">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <Image
                  src="/webxexpert-logo-light.png"
                  alt="WebXExpert"
                  width={48}
                  height={48}
                  className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-2xl font-bold tracking-tight">
                  Web<span className="text-brand-cyan-500">X</span>Expert
                </span>
              </Link>

              <p className="text-neutral-400 max-w-md mb-8 leading-relaxed">
                Premium web solutions crafted with obsession. We build digital
                experiences that dominate markets and elevate brands.
              </p>

              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-cyan-500 text-black font-semibold rounded-full hover:bg-brand-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] group"
              >
                Start Your Project
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Services */}
                <div className="footer-animate">
                  <h4 className="text-sm font-semibold mb-6 text-brand-cyan-500 uppercase tracking-wider">
                    Services
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand-cyan-500/50 group-hover:bg-brand-cyan-500 transition-colors" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="footer-animate">
                  <h4 className="text-sm font-semibold mb-6 text-brand-cyan-500 uppercase tracking-wider">
                    Company
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks.company.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand-cyan-500/50 group-hover:bg-brand-cyan-500 transition-colors" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social */}
                <div className="footer-animate">
                  <h4 className="text-sm font-semibold mb-6 text-brand-cyan-500 uppercase tracking-wider">
                    Connect
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {footerLinks.connect.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-surface-200/50 border border-surface-300/30 flex items-center justify-center text-neutral-400 hover:text-brand-cyan-500 hover:border-brand-cyan-500/50 hover:bg-brand-cyan-500/10 transition-all duration-300"
                        title={link.label}
                      >
                        <span className="text-lg font-bold">{link.icon}</span>
                      </a>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="mt-6">
                    <a
                      href="mailto:hello@webxexpert.com"
                      className="text-neutral-400 hover:text-brand-cyan-500 transition-colors text-sm"
                    >
                      hello@webxexpert.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-surface-300/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600 text-center md:text-left">
              © {new Date().getFullYear()} WebXExpert. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <a href="#" className="hover:text-brand-cyan-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-brand-cyan-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <div className="container-main">
          <span className="text-[15vw] font-black text-surface-100/30 leading-none block -mb-[5vw]">
            WEBXEXPERT
          </span>
        </div>
      </div>
    </footer>
  );
}

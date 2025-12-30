"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const footerLinks = {
  services: [
    { label: "Web Design", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "Custom Software", href: "#services" },
    { label: "CRM Development", href: "#services" },
    { label: "API Integrations", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  connect: [
    { label: "Twitter/X", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
};

export function Footer() {
  const logoRef = useRef<SVGSVGElement>(null);

  // Easter egg: Logo animation on hover
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseEnter = () => {
      gsap.to(logo, {
        rotation: 360,
        scale: 1.1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    logo.addEventListener("mouseenter", handleMouseEnter);
    logo.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      logo.removeEventListener("mouseenter", handleMouseEnter);
      logo.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <footer className="bg-surface-000 border-t border-surface-300/50">
      <div className="container-main">
        {/* Main Footer */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2 mb-8 lg:mb-0">
              <Link href="/" className="flex items-center gap-2 mb-4 md:mb-6">
                <svg
                  ref={logoRef}
                  viewBox="0 0 32 32"
                  className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                  fill="none"
                >
                  <path
                    d="M6 6L26 26M26 6L6 26"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 4L24 16L16 28"
                    stroke="url(#footer-gradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="footer-gradient"
                      x1="16"
                      y1="4"
                      x2="24"
                      y2="28"
                    >
                      <stop stopColor="#FF0080" />
                      <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-lg md:text-xl font-bold tracking-tight">
                  Web<span className="gradient-text">X</span>Expert
                </span>
              </Link>

              <p className="text-sm text-neutral-500 max-w-xs mb-4 md:mb-6">
                Premium web solutions crafted with obsession. We build digital
                experiences that dominate.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="mailto:hello@webxexpert.com"
                  className="text-sm text-neutral-400 hover:text-brand-pink-500 transition-colors"
                >
                  hello@webxexpert.com
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-neutral-500 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <svg
                        viewBox="0 0 16 16"
                        className="w-3 h-3 opacity-50"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M5 11L11 5M11 5H6M11 5V10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-surface-300/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600 text-center md:text-left">
            © {new Date().getFullYear()} WebXExpert. Crafted with obsession.
          </p>

          <div className="flex items-center gap-4 md:gap-6 text-xs text-neutral-600">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

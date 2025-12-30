"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "design",
    number: "01",
    title: "Web Design",
    description:
      "Award-worthy designs with GSAP animations, WebGL experiences, and interactions that captivate. Every pixel crafted with purpose.",
    features: ["Motion Design & GSAP", "WebGL & Three.js", "Responsive & Mobile-First", "Conversion-Focused UX"],
    color: "pink",
    visual: "design",
  },
  {
    id: "development",
    number: "02",
    title: "Web Development",
    description:
      "Full-stack expertise in Next.js, NestJS, React, and beyond. We build scalable, performant applications that power your business.",
    features: ["Next.js & React", "Node.js & NestJS", "Headless CMS", "API Development"],
    color: "cyan",
    visual: "code",
  },
  {
    id: "software",
    number: "03",
    title: "Custom Software",
    description:
      "CRMs, ERPs, dashboards, and internal tools built from scratch. If you can imagine it, we can build it.",
    features: ["CRM & ERP Systems", "Dashboard Development", "Workflow Automation", "Real-time Applications"],
    color: "purple",
    visual: "dashboard",
  },
  {
    id: "integrations",
    number: "04",
    title: "Integrations",
    description:
      "Connect any system to anything. APIs, webhooks, automation workflows—if it exists, we can integrate it.",
    features: ["API Integrations", "N8N & Automation", "Payment Gateways", "Third-party Services"],
    color: "cyan",
    visual: "connect",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".service-card");

    const ctx = gsap.context(() => {
      // Stacking cards effect
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;

        if (!isLast) {
          gsap.to(card, {
            scale: 0.9 - i * 0.02,
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 10%",
              end: "bottom 10%",
              scrub: 0.5,
            },
          });
        }

        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          end: isLast ? "top 10%" : "bottom -100%",
          pin: true,
          pinSpacing: isLast,
        });
      });

      // Animate visuals on each card
      cards.forEach((card) => {
        const visual = card.querySelector(".service-visual");
        const lines = card.querySelectorAll(".visual-line");
        const dots = card.querySelectorAll(".visual-dot");
        const bars = card.querySelectorAll(".visual-bar");

        if (visual) {
          gsap.fromTo(
            visual,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (lines.length) {
          gsap.fromTo(
            lines,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (dots.length) {
          gsap.fromTo(
            dots,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (bars.length) {
          gsap.fromTo(
            bars,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink":
        return {
          accent: "#FF0080",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          glow: "shadow-[0_0_60px_rgba(255,0,128,0.15)]",
        };
      case "cyan":
        return {
          accent: "#00D4FF",
          bg: "bg-brand-cyan-500",
          bgLight: "bg-brand-cyan-500/10",
          text: "text-brand-cyan-500",
          border: "border-brand-cyan-500/30",
          glow: "shadow-[0_0_60px_rgba(0,212,255,0.15)]",
        };
      case "purple":
        return {
          accent: "#7C3AED",
          bg: "bg-brand-purple-500",
          bgLight: "bg-brand-purple-500/10",
          text: "text-brand-purple-500",
          border: "border-brand-purple-500/30",
          glow: "shadow-[0_0_60px_rgba(124,58,237,0.15)]",
        };
      default:
        return {
          accent: "#FF0080",
          bg: "bg-brand-pink-500",
          bgLight: "bg-brand-pink-500/10",
          text: "text-brand-pink-500",
          border: "border-brand-pink-500/30",
          glow: "shadow-[0_0_60px_rgba(255,0,128,0.15)]",
        };
    }
  };

  return (
    <section ref={sectionRef} id="services" className="bg-black relative">
      {/* Section Header - Fixed */}
      <div className="container-main pt-20 md:pt-32 pb-12">
        <div className="max-w-3xl">
          <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building{" "}
            <span className="bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 bg-clip-text text-transparent">
              Extraordinary
            </span>{" "}
            Digital Products
          </h2>
          <p className="text-lg text-neutral-400">
            From concept to deployment, we craft digital experiences that perform. Every project is an opportunity to
            push boundaries.
          </p>
        </div>
      </div>

      {/* Stacking Cards */}
      <div ref={cardsRef} className="relative">
        {services.map((service, index) => {
          const colors = getColorClasses(service.color);

          return (
            <div
              key={service.id}
              className={cn(
                "service-card min-h-screen flex items-center py-12",
                "bg-black"
              )}
            >
              <div className="container-main">
                <div
                  className={cn(
                    "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                    "p-8 md:p-12 lg:p-16 rounded-3xl",
                    "bg-surface-100/50 backdrop-blur-sm border",
                    colors.border,
                    colors.glow
                  )}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className={cn("text-6xl md:text-7xl font-bold opacity-20", colors.text)}>
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{service.title}</h3>

                    <p className="text-lg text-neutral-400 mb-8 leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-neutral-300">
                          <span className={cn("w-2 h-2 rounded-full", colors.bg)} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={cn(
                        "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                        colors.bg,
                        "text-white hover:scale-105"
                      )}
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Visual Animation */}
                  <div className={cn("service-visual", index % 2 === 1 ? "lg:order-1" : "")}>
                    <ServiceVisual type={service.visual} color={colors.accent} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Service Visual Component - Animated SVG representation of each service
 */
function ServiceVisual({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "design":
      return (
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Browser frame */}
            <rect
              x="20"
              y="20"
              width="160"
              height="120"
              rx="8"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.5"
            />
            {/* Browser header */}
            <rect x="20" y="20" width="160" height="20" rx="8" fill={color} opacity="0.2" />
            <circle className="visual-dot" cx="35" cy="30" r="3" fill={color} />
            <circle className="visual-dot" cx="48" cy="30" r="3" fill={color} />
            <circle className="visual-dot" cx="61" cy="30" r="3" fill={color} />

            {/* Design elements */}
            <rect className="visual-line" x="30" y="50" width="60" height="8" rx="2" fill={color} opacity="0.6" style={{ transformOrigin: "30px 54px" }} />
            <rect className="visual-line" x="30" y="65" width="100" height="4" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "30px 67px" }} />
            <rect className="visual-line" x="30" y="75" width="80" height="4" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "30px 77px" }} />

            {/* Image placeholder */}
            <rect className="visual-bar" x="30" y="90" width="50" height="40" rx="4" fill={color} opacity="0.4" style={{ transformOrigin: "55px 130px" }} />
            <rect className="visual-bar" x="90" y="90" width="80" height="18" rx="2" fill={color} opacity="0.2" style={{ transformOrigin: "130px 130px" }} />
            <rect className="visual-bar" x="90" y="115" width="60" height="15" rx="2" fill={color} opacity="0.3" style={{ transformOrigin: "120px 130px" }} />

            {/* Cursor */}
            <path d="M150 100 L160 115 L155 115 L158 125 L154 126 L151 116 L147 120 Z" fill={color} className="visual-dot" />
          </svg>
        </div>
      );

    case "code":
      return (
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Terminal frame */}
            <rect
              x="20"
              y="20"
              width="160"
              height="160"
              rx="8"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.5"
            />
            <rect x="20" y="20" width="160" height="24" rx="8" fill={color} opacity="0.2" />
            <circle className="visual-dot" cx="35" cy="32" r="4" fill={color} />
            <circle className="visual-dot" cx="50" cy="32" r="4" fill={color} />
            <circle className="visual-dot" cx="65" cy="32" r="4" fill={color} />

            {/* Code lines */}
            <rect className="visual-line" x="30" y="55" width="20" height="4" rx="1" fill={color} opacity="0.6" style={{ transformOrigin: "30px 57px" }} />
            <rect className="visual-line" x="55" y="55" width="60" height="4" rx="1" fill="#00D4FF" opacity="0.5" style={{ transformOrigin: "55px 57px" }} />

            <rect className="visual-line" x="40" y="70" width="15" height="4" rx="1" fill={color} opacity="0.4" style={{ transformOrigin: "40px 72px" }} />
            <rect className="visual-line" x="60" y="70" width="80" height="4" rx="1" fill={color} opacity="0.6" style={{ transformOrigin: "60px 72px" }} />

            <rect className="visual-line" x="40" y="85" width="25" height="4" rx="1" fill="#7C3AED" opacity="0.5" style={{ transformOrigin: "40px 87px" }} />
            <rect className="visual-line" x="70" y="85" width="50" height="4" rx="1" fill={color} opacity="0.4" style={{ transformOrigin: "70px 87px" }} />

            <rect className="visual-line" x="40" y="100" width="40" height="4" rx="1" fill={color} opacity="0.5" style={{ transformOrigin: "40px 102px" }} />
            <rect className="visual-line" x="85" y="100" width="30" height="4" rx="1" fill="#00D4FF" opacity="0.4" style={{ transformOrigin: "85px 102px" }} />

            <rect className="visual-line" x="30" y="115" width="15" height="4" rx="1" fill={color} opacity="0.6" style={{ transformOrigin: "30px 117px" }} />

            <rect className="visual-line" x="30" y="135" width="100" height="4" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "30px 137px" }} />
            <rect className="visual-line" x="30" y="150" width="70" height="4" rx="1" fill="#7C3AED" opacity="0.4" style={{ transformOrigin: "30px 152px" }} />
            <rect className="visual-line" x="30" y="165" width="40" height="4" rx="1" fill={color} opacity="0.5" style={{ transformOrigin: "30px 167px" }} />
          </svg>
        </div>
      );

    case "dashboard":
      return (
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Dashboard frame */}
            <rect x="10" y="10" width="180" height="180" rx="8" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />

            {/* Sidebar */}
            <rect x="10" y="10" width="40" height="180" rx="8" fill={color} opacity="0.1" />
            <circle className="visual-dot" cx="30" cy="35" r="8" fill={color} opacity="0.5" />
            <rect className="visual-line" x="18" y="55" width="24" height="3" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "18px 56px" }} />
            <rect className="visual-line" x="18" y="70" width="24" height="3" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "18px 71px" }} />
            <rect className="visual-line" x="18" y="85" width="24" height="3" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "18px 86px" }} />

            {/* Stats cards */}
            <rect className="visual-bar" x="60" y="25" width="55" height="35" rx="4" fill={color} opacity="0.2" style={{ transformOrigin: "87px 60px" }} />
            <rect className="visual-bar" x="125" y="25" width="55" height="35" rx="4" fill="#00D4FF" opacity="0.2" style={{ transformOrigin: "152px 60px" }} />

            {/* Chart */}
            <rect x="60" y="70" width="120" height="60" rx="4" fill={color} opacity="0.1" />
            <rect className="visual-bar" x="70" y="105" width="12" height="20" rx="2" fill={color} opacity="0.6" style={{ transformOrigin: "76px 125px" }} />
            <rect className="visual-bar" x="90" y="95" width="12" height="30" rx="2" fill={color} opacity="0.7" style={{ transformOrigin: "96px 125px" }} />
            <rect className="visual-bar" x="110" y="85" width="12" height="40" rx="2" fill={color} opacity="0.8" style={{ transformOrigin: "116px 125px" }} />
            <rect className="visual-bar" x="130" y="90" width="12" height="35" rx="2" fill={color} opacity="0.7" style={{ transformOrigin: "136px 125px" }} />
            <rect className="visual-bar" x="150" y="80" width="12" height="45" rx="2" fill={color} opacity="0.9" style={{ transformOrigin: "156px 125px" }} />

            {/* Table */}
            <rect x="60" y="140" width="120" height="45" rx="4" fill={color} opacity="0.1" />
            <rect className="visual-line" x="70" y="150" width="100" height="3" rx="1" fill={color} opacity="0.4" style={{ transformOrigin: "70px 151px" }} />
            <rect className="visual-line" x="70" y="160" width="80" height="3" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "70px 161px" }} />
            <rect className="visual-line" x="70" y="170" width="60" height="3" rx="1" fill={color} opacity="0.3" style={{ transformOrigin: "70px 171px" }} />
          </svg>
        </div>
      );

    case "connect":
      return (
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Central hub */}
            <circle className="visual-dot" cx="100" cy="100" r="25" fill={color} opacity="0.3" />
            <circle className="visual-dot" cx="100" cy="100" r="15" fill={color} opacity="0.6" />
            <circle className="visual-dot" cx="100" cy="100" r="5" fill={color} />

            {/* Connection lines */}
            <line className="visual-line" x1="100" y1="100" x2="40" y2="40" stroke={color} strokeWidth="2" opacity="0.5" style={{ transformOrigin: "100px 100px" }} />
            <line className="visual-line" x1="100" y1="100" x2="160" y2="40" stroke="#00D4FF" strokeWidth="2" opacity="0.5" style={{ transformOrigin: "100px 100px" }} />
            <line className="visual-line" x1="100" y1="100" x2="40" y2="160" stroke="#7C3AED" strokeWidth="2" opacity="0.5" style={{ transformOrigin: "100px 100px" }} />
            <line className="visual-line" x1="100" y1="100" x2="160" y2="160" stroke={color} strokeWidth="2" opacity="0.5" style={{ transformOrigin: "100px 100px" }} />
            <line className="visual-line" x1="100" y1="100" x2="100" y2="25" stroke="#00D4FF" strokeWidth="2" opacity="0.5" style={{ transformOrigin: "100px 100px" }} />
            <line className="visual-line" x1="100" y1="100" x2="100" y2="175" stroke={color} strokeWidth="2" opacity="0.5" style={{ transformOrigin: "100px 100px" }} />

            {/* Outer nodes */}
            <circle className="visual-dot" cx="40" cy="40" r="15" fill={color} opacity="0.4" />
            <circle className="visual-dot" cx="40" cy="40" r="8" fill={color} />

            <circle className="visual-dot" cx="160" cy="40" r="15" fill="#00D4FF" opacity="0.4" />
            <circle className="visual-dot" cx="160" cy="40" r="8" fill="#00D4FF" />

            <circle className="visual-dot" cx="40" cy="160" r="15" fill="#7C3AED" opacity="0.4" />
            <circle className="visual-dot" cx="40" cy="160" r="8" fill="#7C3AED" />

            <circle className="visual-dot" cx="160" cy="160" r="15" fill={color} opacity="0.4" />
            <circle className="visual-dot" cx="160" cy="160" r="8" fill={color} />

            <circle className="visual-dot" cx="100" cy="25" r="12" fill="#00D4FF" opacity="0.4" />
            <circle className="visual-dot" cx="100" cy="25" r="6" fill="#00D4FF" />

            <circle className="visual-dot" cx="100" cy="175" r="12" fill={color} opacity="0.4" />
            <circle className="visual-dot" cx="100" cy="175" r="6" fill={color} />
          </svg>
        </div>
      );

    default:
      return null;
  }
}

"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate floating orbs
      gsap.to(".cta-orb-1", {
        y: -40,
        x: 30,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cta-orb-2", {
        y: 30,
        x: -40,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cta-orb-3", {
        y: -20,
        x: -20,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Section reveal animation
      gsap.fromTo(
        ".cta-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      // Form fields stagger animation
      gsap.fromTo(
        ".form-field",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", budget: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="cta-orb-1 absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-pink-500/10 blur-[150px] pointer-events-none" />
      <div className="cta-orb-2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple-700/10 blur-[150px] pointer-events-none" />
      <div className="cta-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div className="cta-content">
            <span className="text-sm text-brand-pink-500 font-medium tracking-widest uppercase mb-4 block">
              Let&apos;s Build Something
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Ready to Build Something{" "}
              <span className="bg-gradient-to-r from-brand-pink-500 via-brand-purple-500 to-brand-cyan-500 bg-clip-text text-transparent">
                Extraordinary
              </span>
              ?
            </h2>

            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              Whether it&apos;s a stunning website, a powerful CRM, or a complete
              digital transformation—we&apos;re ready to bring your vision to life.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4">
              <a
                href="mailto:hello@webxexpert.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-100/50 border border-surface-300/30 hover:border-brand-pink-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-pink-500/10 flex items-center justify-center text-brand-pink-500 group-hover:bg-brand-pink-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Email us</p>
                  <p className="text-white font-medium">hello@webxexpert.com</p>
                </div>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-100/50 border border-surface-300/30 hover:border-brand-cyan-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-cyan-500/10 flex items-center justify-center text-brand-cyan-500 group-hover:bg-brand-cyan-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Call us</p>
                  <p className="text-white font-medium">Schedule a call</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="relative">
            {/* Form card */}
            <div className="bg-surface-100/80 backdrop-blur-xl rounded-3xl border border-surface-300/30 p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-neutral-400">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="form-field">
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface-200/50 border border-surface-300/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-pink-500 focus:ring-1 focus:ring-brand-pink-500 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface-200/50 border border-surface-300/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-pink-500 focus:ring-1 focus:ring-brand-pink-500 transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="form-field grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-neutral-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-200/50 border border-surface-300/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-pink-500 focus:ring-1 focus:ring-brand-pink-500 transition-all duration-300"
                        placeholder="Company Inc."
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-neutral-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-200/50 border border-surface-300/50 rounded-xl text-white focus:outline-none focus:border-brand-pink-500 focus:ring-1 focus:ring-brand-pink-500 transition-all duration-300"
                      >
                        <option value="" className="bg-surface-200">Select...</option>
                        <option value="5k-10k" className="bg-surface-200">$5K - $10K</option>
                        <option value="10k-25k" className="bg-surface-200">$10K - $25K</option>
                        <option value="25k-50k" className="bg-surface-200">$25K - $50K</option>
                        <option value="50k+" className="bg-surface-200">$50K+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-surface-200/50 border border-surface-300/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-pink-500 focus:ring-1 focus:ring-brand-pink-500 transition-all duration-300 resize-none"
                      placeholder="I need a website for..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "form-field w-full py-4 rounded-xl font-semibold text-white transition-all duration-300",
                      "bg-gradient-to-r from-brand-pink-500 to-brand-pink-600",
                      "hover:shadow-[0_0_40px_rgba(255,0,128,0.4)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p className="text-xs text-neutral-500 text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-brand-pink-500/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-brand-cyan-500/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

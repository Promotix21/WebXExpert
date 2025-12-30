"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { InnerHeader } from "@/components/layout/InnerHeader";
import { PageHeader } from "@/components/layout/PageHeader";
import { Footer } from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  "Web Design",
  "Web Development",
  "Custom Software",
  "CRM Development",
  "API Integrations",
  "Consulting",
];

const budgets = [
  "$5K - $10K",
  "$10K - $25K",
  "$25K - $50K",
  "$50K - $100K",
  "$100K+",
];

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@webxexpert.com",
    href: "mailto:hello@webxexpert.com",
  },
  {
    icon: "📱",
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: "📍",
    label: "Office",
    value: "San Francisco, CA",
    href: "#",
  },
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form fields
      gsap.fromTo(
        ".form-field",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      // Animate contact cards
      gsap.fromTo(
        ".contact-card",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <InnerHeader />

      <main className="bg-black min-h-screen">
        <PageHeader
          title="Get in Touch"
          subtitle="Contact Us"
          description="Ready to start your project? We'd love to hear about your vision and explore how we can bring it to life."
          gradient="cyan"
          size="large"
        />

        {/* Contact Section */}
        <section className="py-20 md:py-32">
          <div className="container-main">
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
              {/* Form */}
              <div className="order-2 lg:order-1">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Name <span className="text-brand-cyan-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-100/50 border border-surface-300/30 rounded-xl focus:border-brand-cyan-500 focus:ring-1 focus:ring-brand-cyan-500 outline-none transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-field">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address <span className="text-brand-cyan-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-100/50 border border-surface-300/30 rounded-xl focus:border-brand-cyan-500 focus:ring-1 focus:ring-brand-cyan-500 outline-none transition-all duration-200"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="form-field">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-100/50 border border-surface-300/30 rounded-xl focus:border-brand-cyan-500 focus:ring-1 focus:ring-brand-cyan-500 outline-none transition-all duration-200"
                      placeholder="Acme Inc."
                    />
                  </div>

                  {/* Service & Budget Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium mb-2"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-100/50 border border-surface-300/30 rounded-xl focus:border-brand-cyan-500 focus:ring-1 focus:ring-brand-cyan-500 outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium mb-2"
                      >
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface-100/50 border border-surface-300/30 rounded-xl focus:border-brand-cyan-500 focus:ring-1 focus:ring-brand-cyan-500 outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Project Details <span className="text-brand-cyan-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-100/50 border border-surface-300/30 rounded-xl focus:border-brand-cyan-500 focus:ring-1 focus:ring-brand-cyan-500 outline-none transition-all duration-200 resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-field">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full md:w-auto px-8 py-4 rounded-full font-semibold transition-all duration-300",
                        isSubmitting
                          ? "bg-neutral-600 cursor-not-allowed"
                          : "bg-brand-cyan-500 text-black hover:bg-brand-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="form-field p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                      <p className="flex items-center gap-2">
                        <span>✓</span>
                        Message sent successfully! We&apos;ll get back to you within 24
                        hours.
                      </p>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="form-field p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                      <p className="flex items-center gap-2">
                        <span>✕</span>
                        Something went wrong. Please try again or email us directly.
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Sidebar */}
              <div className="order-1 lg:order-2 space-y-6">
                {/* Contact Info Cards */}
                {contactInfo.map((info, i) => (
                  <a
                    key={i}
                    href={info.href}
                    className="contact-card block p-6 rounded-2xl bg-surface-100/50 border border-surface-300/30 hover:border-brand-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-cyan-500/10 flex items-center justify-center text-2xl group-hover:bg-brand-cyan-500/20 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">
                          {info.label}
                        </p>
                        <p className="font-medium group-hover:text-brand-cyan-500 transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}

                {/* Response Time */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-cyan-500/10 to-brand-purple-500/10 border border-surface-300/30">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-brand-cyan-500">⚡</span>
                    Quick Response
                  </h3>
                  <p className="text-sm text-neutral-400">
                    We typically respond within 24 hours on business days. For
                    urgent inquiries, call us directly.
                  </p>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-2xl bg-surface-100/50 border border-surface-300/30">
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: "𝕏", href: "#", label: "Twitter" },
                      { icon: "in", href: "#", label: "LinkedIn" },
                      { icon: "◉", href: "#", label: "GitHub" },
                      { icon: "◎", href: "#", label: "Instagram" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-12 h-12 rounded-xl bg-surface-200/50 border border-surface-300/30 flex items-center justify-center text-neutral-400 hover:text-brand-cyan-500 hover:border-brand-cyan-500/50 transition-all duration-300"
                        title={social.label}
                      >
                        <span className="font-bold">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-surface-100/30">
          <div className="container-main">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked{" "}
                <span className="text-brand-cyan-500">Questions</span>
              </h2>
              <p className="text-neutral-400">
                Quick answers to questions we get asked most often.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary based on scope. A marketing website typically takes 4-6 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline after our discovery call.",
                },
                {
                  q: "What's your development process?",
                  a: "We follow an agile methodology with 2-week sprints. You'll see progress regularly, provide feedback, and stay in control throughout the project.",
                },
                {
                  q: "Do you provide ongoing support?",
                  a: "Yes! We offer maintenance packages and ongoing support. We don't just build and disappear—we're here for the long haul.",
                },
                {
                  q: "Can you work with our existing team?",
                  a: "Absolutely. We regularly collaborate with in-house teams, acting as an extension rather than a replacement.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface-200/50 border border-surface-300/30"
                >
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-neutral-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-[400px] relative bg-surface-100/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 bg-brand-cyan-500/20 flex items-center justify-center">
                <span className="text-4xl">🗺️</span>
              </div>
              <p className="text-neutral-500">
                Add: Google Maps embed or custom map
              </p>
            </div>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        </section>
      </main>

      <Footer />
    </>
  );
}

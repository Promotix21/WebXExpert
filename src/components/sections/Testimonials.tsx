"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ReviewSchema } from "@/components/seo/JsonLd";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "TechVentures Inc.",
    image: "/testimonials/sarah.jpg",
    content:
      "WebXExpert transformed our outdated platform into a cutting-edge web application. The team's attention to detail and technical expertise exceeded our expectations. Our conversion rates increased by 340% within the first month.",
    rating: 5,
    project: "E-commerce Platform Redesign",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Founder",
    company: "PropVista Real Estate",
    image: "/testimonials/marcus.jpg",
    content:
      "The CRM they built for us handles 10,000+ leads monthly with zero issues. The WhatsApp integration alone saved us 20 hours per week. Best investment we've made in years.",
    rating: 5,
    project: "Custom CRM Development",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Marketing Director",
    company: "GrowthLabs",
    image: "/testimonials/emily.jpg",
    content:
      "Their design work is absolutely stunning. Every animation, every interaction feels intentional. Our bounce rate dropped 60% and time on site tripled. They truly understand modern web design.",
    rating: 5,
    project: "Marketing Website Redesign",
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "FinanceFlow",
    image: "/testimonials/david.jpg",
    content:
      "We needed complex API integrations with multiple payment providers and banking systems. WebXExpert delivered a bulletproof solution that processes millions in transactions daily.",
    rating: 5,
    project: "Payment Integration Platform",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager",
    company: "LogiTrack",
    image: "/testimonials/lisa.jpg",
    content:
      "The fleet management dashboard they built gives us real-time visibility into our entire operation. Route optimization alone saved us 40% in fuel costs. Game-changing technology.",
    rating: 5,
    project: "Logistics Dashboard",
  },
  {
    id: 6,
    name: "James Mitchell",
    role: "Founder",
    company: "EduConnect",
    image: "/testimonials/james.jpg",
    content:
      "Our online learning platform now serves 25,000+ students seamlessly. The live class integration and progress tracking features are exactly what we envisioned. Phenomenal work.",
    rating: 5,
    project: "Learning Management System",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".testimonials-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-title",
            start: "top 85%",
          },
        }
      );

      // Animate cards with stagger
      gsap.fromTo(
        ".testimonial-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Prepare reviews for schema
  const reviewsForSchema = testimonials.map((t) => ({
    author: t.name,
    reviewBody: t.content,
    ratingValue: t.rating,
  }));

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-surface-100/30 relative overflow-hidden"
      id="testimonials"
    >
      {/* Schema for Reviews */}
      <ReviewSchema reviews={reviewsForSchema} />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="testimonials-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm text-brand-cyan-500 font-semibold tracking-widest uppercase mb-4 block">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg text-neutral-400">
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about working with WebXExpert.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "98%", label: "Client Satisfaction" },
            { value: "50+", label: "Projects Delivered" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "100%", label: "On-Time Delivery" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const colors = index % 2 === 0 ? "cyan" : "purple";

  return (
    <div
      className={cn(
        "testimonial-card group relative p-6 rounded-2xl bg-surface-200/50 border transition-all duration-500 hover:shadow-lg",
        colors === "cyan"
          ? "border-brand-cyan-500/20 hover:border-brand-cyan-500/40 hover:shadow-brand-cyan-500/10"
          : "border-brand-purple-500/20 hover:border-brand-purple-500/40 hover:shadow-brand-purple-500/10"
      )}
    >
      {/* Quote icon */}
      <div
        className={cn(
          "absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-2xl",
          colors === "cyan" ? "bg-brand-cyan-500" : "bg-brand-purple-500"
        )}
      >
        <span className="text-black">&ldquo;</span>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4 mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              "w-4 h-4",
              i < testimonial.rating ? "text-yellow-500" : "text-neutral-600"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <p className="text-neutral-300 text-sm leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Project tag */}
      <div className="mb-4">
        <span
          className={cn(
            "text-xs px-3 py-1 rounded-full",
            colors === "cyan"
              ? "bg-brand-cyan-500/10 text-brand-cyan-500"
              : "bg-brand-purple-500/10 text-brand-purple-500"
          )}
        >
          {testimonial.project}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-surface-300/30">
        {/* Avatar placeholder */}
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
            colors === "cyan"
              ? "bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600"
              : "bg-gradient-to-br from-brand-purple-500 to-brand-purple-600"
          )}
        >
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-neutral-500">
            {testimonial.role} at {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

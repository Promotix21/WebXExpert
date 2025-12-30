"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techItems = [
  { name: "Next.js", icon: "⚡", color: "#00D4FF" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "TypeScript", icon: "📘", color: "#3178C6" },
  { name: "Tailwind", icon: "🎨", color: "#38BDF8" },
  { name: "GSAP", icon: "✨", color: "#88CE02" },
  { name: "Three.js", icon: "🎮", color: "#00D4FF" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "NestJS", icon: "🦅", color: "#E0234E" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "N8N", icon: "🔄", color: "#EA4B71" },
  { name: "Vercel", icon: "▲", color: "#00D4FF" },
  { name: "Redis", icon: "🔴", color: "#DC382D" },
  { name: "GraphQL", icon: "◈", color: "#E10098" },
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  // Intersection observer to trigger animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isVisible]);

  // Matter.js physics
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      restitution: 0.8,
    };

    const walls = [
      // Floor
      Matter.Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions),
      // Left wall
      Matter.Bodies.rectangle(-30, height / 2, 60, height, wallOptions),
      // Right wall
      Matter.Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions),
    ];

    Matter.Composite.add(engine.world, walls);

    // Create tech item bodies with varied sizes
    const bodies: Matter.Body[] = [];

    // Size categories: small, medium, large, xlarge
    const sizeCategories = [
      { min: 40, max: 50 },   // Small
      { min: 55, max: 65 },   // Medium
      { min: 70, max: 80 },   // Large
      { min: 85, max: 100 },  // XLarge
    ];

    techItems.forEach((item, i) => {
      // Distribute across different sizes based on index
      const sizeCategory = sizeCategories[i % 4];
      const radius = sizeCategory.min + Math.random() * (sizeCategory.max - sizeCategory.min);

      // Spread starting positions more - use grid-like distribution
      const cols = 4;
      const col = i % cols;
      const colWidth = (width - 200) / cols;
      const x = 100 + col * colWidth + Math.random() * colWidth * 0.5;
      const y = -150 - Math.floor(i / cols) * 200 - Math.random() * 100; // Stagger vertically

      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.01,
        render: {
          fillStyle: item.color + "20",
          strokeStyle: item.color,
          lineWidth: 3,
        },
        label: item.name,
        // Store radius for text scaling
        plugin: { radius },
      });

      bodies.push(body);
    });

    // Add bodies with stagger
    bodies.forEach((body, i) => {
      setTimeout(() => {
        Matter.Composite.add(engine.world, body);
      }, i * 100);
    });

    // Add mouse control
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync
    render.mouse = mouse;

    // Click to "irritate" balls - apply explosive force
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const allBodies = Matter.Composite.allBodies(engine.world);

      allBodies.forEach((body) => {
        if (body.isStatic) return;

        // Calculate distance from click to body
        const dx = body.position.x - clickX;
        const dy = body.position.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = (body.plugin as any)?.radius || 50;

        // If clicked directly on the ball
        if (distance < radius + 20) {
          // Apply strong random force - "irritated" reaction
          const forceMagnitude = 0.15 + Math.random() * 0.1;
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;

          Matter.Body.applyForce(body, body.position, {
            x: Math.cos(angle) * forceMagnitude,
            y: Math.sin(angle) * forceMagnitude - 0.1, // Slight upward bias
          });

          // Add aggressive spin
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);

          // Brief "shake" effect - rapid small forces
          let shakeCount = 0;
          const shakeInterval = setInterval(() => {
            if (shakeCount >= 5) {
              clearInterval(shakeInterval);
              return;
            }
            Matter.Body.applyForce(body, body.position, {
              x: (Math.random() - 0.5) * 0.02,
              y: (Math.random() - 0.5) * 0.02,
            });
            shakeCount++;
          }, 50);
        }
        // Nearby balls also react (ripple effect)
        else if (distance < 200) {
          const forceMagnitude = 0.03 * (1 - distance / 200);
          const angle = Math.atan2(dy, dx);

          Matter.Body.applyForce(body, body.position, {
            x: Math.cos(angle) * forceMagnitude,
            y: Math.sin(angle) * forceMagnitude,
          });
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    // Run engine and renderer
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Custom render for text labels - scale based on ball size
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const allBodies = Matter.Composite.allBodies(engine.world);

      allBodies.forEach((body) => {
        if (body.label && body.label !== "Rectangle Body" && body.label !== "Circle Body") {
          const item = techItems.find((t) => t.name === body.label);
          if (item) {
            // Get stored radius for scaling
            const radius = (body.plugin as any)?.radius || 50;
            const scale = radius / 60; // Base scale factor

            ctx.save();
            ctx.translate(body.position.x, body.position.y);
            ctx.rotate(body.angle);

            // Draw icon - scaled
            const iconSize = Math.round(24 * scale);
            ctx.font = `${iconSize}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(item.icon, 0, -radius * 0.15);

            // Draw name - scaled
            const nameSize = Math.round(11 * scale);
            ctx.font = `bold ${nameSize}px system-ui`;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(item.name, 0, radius * 0.3);

            ctx.restore();
          }
        }
      });
    });

    // Cleanup
    return () => {
      canvas.removeEventListener("click", handleClick);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isVisible]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (renderRef.current && canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          renderRef.current.options.width = container.clientWidth;
          renderRef.current.options.height = container.clientHeight;
          renderRef.current.canvas.width = container.clientWidth;
          renderRef.current.canvas.height = container.clientHeight;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-surface-000 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm text-brand-cyan-500 font-medium tracking-widest uppercase mb-4 block">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Built With{" "}
            <span className="bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 bg-clip-text text-transparent">
              Modern
            </span>{" "}
            Technologies
          </h2>
          <p className="text-lg text-neutral-400">
            We use the best tools for the job. Always learning, always evolving,
            always delivering cutting-edge solutions.
          </p>
        </div>

        {/* Physics Canvas Container */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl bg-surface-100/30 border border-surface-300/30 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ touchAction: "none" }}
          />

          {/* Instruction overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs text-neutral-500 px-4 py-2 bg-surface-100/50 backdrop-blur-sm rounded-full">
              Click or drag the tech badges!
            </span>
          </div>
        </div>

        {/* Additional Tools Row */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500 mb-4">And many more...</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {[
              "Framer Motion",
              "Lenis",
              "Prisma",
              "REST APIs",
              "WebSockets",
              "Stripe",
              "OpenAI",
              "Claude AI",
              "Shopify",
              "WordPress",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-surface-200 rounded-full text-xs md:text-sm text-neutral-400 hover:text-brand-cyan-500 hover:bg-surface-250 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth mouse follow
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.pointer.x * Math.PI) / 10, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.pointer.y * Math.PI) / 10, 0.05);

    groupRef.current.rotation.x = mouse.current.y;
    groupRef.current.rotation.y = mouse.current.x;
  });

  return (
    <group ref={groupRef}>
      {/* Main morphing sphere - Pink */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[2.5, 0, 0]}>
          <MeshDistortMaterial
            color="#FF0080"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Cyan accent sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[0.6, 32, 32]} position={[-2, 1.5, -1]}>
          <MeshDistortMaterial
            color="#00D4FF"
            attach="material"
            distort={0.3}
            speed={3}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>

      {/* Purple accent sphere */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[0.4, 32, 32]} position={[-1, -1.5, 0.5]}>
          <MeshDistortMaterial
            color="#7C3AED"
            attach="material"
            distort={0.5}
            speed={2.5}
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.5}
          />
        </Sphere>
      </Float>

      {/* Small accent spheres */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.2}>
        <Sphere args={[0.2, 16, 16]} position={[1, 2, -2]}>
          <meshStandardMaterial color="#FF0080" emissive="#FF0080" emissiveIntensity={0.5} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.9}>
        <Sphere args={[0.15, 16, 16]} position={[-2.5, -1, 1]}>
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
    </group>
  );
}

// Particle system using Points component from drei
function Particles({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Random colors between pink, cyan, and white
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Pink
        col[i * 3] = 1;
        col[i * 3 + 1] = 0;
        col[i * 3 + 2] = 0.5;
      } else if (colorChoice < 0.66) {
        // Cyan
        col[i * 3] = 0;
        col[i * 3 + 1] = 0.83;
        col[i * 3 + 2] = 1;
      } else {
        // White
        col[i * 3] = 1;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1;
      }
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  // Create the geometry with buffer attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Mouse-following light
function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = pointer.x * 5;
    lightRef.current.position.y = pointer.y * 5;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={2}
      color="#FF0080"
      distance={15}
    />
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 25]} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />

      {/* Key lights */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D4FF" />

      {/* Mouse-following light */}
      <MovingLight />

      {/* Main elements */}
      <FloatingShapes />
      <Particles count={300} />

      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

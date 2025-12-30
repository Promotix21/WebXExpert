"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Particle system for hero background
function Particles({ count = 1000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPink = new THREE.Color("#FF0080");
    const colorCyan = new THREE.Color("#00D4FF");
    const colorPurple = new THREE.Color("#7C3AED");

    for (let i = 0; i < count; i++) {
      // Spread particles in a spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      // Random color from palette
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) {
        color = colorPink;
      } else if (colorChoice < 0.66) {
        color = colorCyan;
      } else {
        color = colorPurple;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Track mouse for interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle rotation
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = Math.sin(time * 0.03) * 0.1;

    // Mouse influence
    mesh.current.rotation.y += mouseRef.current.x * 0.01;
    mesh.current.rotation.x += mouseRef.current.y * 0.01;

    // Animate individual particles (wave effect)
    const positionAttribute = mesh.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];

      // Add subtle floating motion
      positionAttribute.setY(i, y + Math.sin(time + x * 0.5) * 0.1);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.2 + i;
      child.rotation.y = time * 0.3 + i;
      child.position.y = Math.sin(time * 0.5 + i * 2) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe octahedron */}
      <mesh position={[-3, 0, -2]}>
        <octahedronGeometry args={[0.5]} />
        <meshBasicMaterial
          color="#FF0080"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Wireframe icosahedron */}
      <mesh position={[3, 1, -3]}>
        <icosahedronGeometry args={[0.4]} />
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Wireframe torus */}
      <mesh position={[2, -1, -2]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Scene with camera
function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  return (
    <>
      <Particles count={800} />
      <FloatingShapes />
    </>
  );
}

// Main component
export function ParticleField() {
  return (
    <Canvas
      className="w-full h-full"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Scene />
    </Canvas>
  );
}

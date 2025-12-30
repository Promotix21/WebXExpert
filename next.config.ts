import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Transpile Three.js packages
  transpilePackages: ["three"],
};

export default nextConfig;

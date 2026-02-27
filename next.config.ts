import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep images unoptimized during early development to avoid external upload issues
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

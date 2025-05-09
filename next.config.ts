import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
  },
};

export default nextConfig;

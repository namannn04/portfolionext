import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Handle canvas module for PDF viewer
    if (!isServer) {
      config.resolve.alias.canvas = false;
      config.resolve.alias.encoding = false;
    }
    
    // Ignore node-specific modules
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    return config;
  },
};

export default nextConfig;

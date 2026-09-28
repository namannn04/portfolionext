import type { NextConfig } from "next";

const sections: Record<string, string> = {
  projects: "work",
  experience: "experience",
  roles: "experience",
  events: "events",
  contact: "contact",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Old multi-page routes now live as sections on the home page.
    return Object.entries(sections).map(([source, hash]) => ({
      source: `/${source}`,
      destination: `/#${hash}`,
      permanent: false,
    }));
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stops `next dev` from generating AGENTS.md; agent rules live in CLAUDE.md.
  agentRules: false,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;

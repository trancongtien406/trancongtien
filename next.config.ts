import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The site is primarily reached by first-time visitors from search.
    // Inlining the small Tailwind bundle removes a render-blocking CSS round trip.
    inlineCss: true,
  },
  turbopack: {
    ignoreIssue: [
      {
        path: "**/next.config.ts",
        title: "Encountered unexpected file in NFT list",
      },
    ],
  },
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/uploads/**" },
      { pathname: "/api/uploads/**" },
      { pathname: "/icons/**" },
    ],
  },
};

export default nextConfig;

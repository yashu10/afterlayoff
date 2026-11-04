import type { NextConfig } from "next";

// Static export so the site can be hosted anywhere (GitHub Pages, Hostinger, Netlify...).
// Set NEXT_PUBLIC_BASE_PATH=/afterlayoff when serving from https://<user>.github.io/afterlayoff,
// leave it empty when serving from the custom domain (afterlayoff.in).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST_DIR || "dist",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

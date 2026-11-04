// Plain JavaScript config (not .ts) so it loads on hosts whose Node/GLIBC cannot run Next's native compiler
// (e.g. Hostinger shared hosting), where a TypeScript config fails with "Failed to load next.config.ts".

// Static export so the site can be hosted anywhere (GitHub Pages, Hostinger, Vercel, Netlify...).
// Set NEXT_PUBLIC_BASE_PATH=/afterlayoff when serving from https://<user>.github.io/afterlayoff,
// leave it empty when serving from the custom domain (afterlayoff.in).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST_DIR || "dist",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

import type { NextConfig } from "next";

/**
 * CareFlow AI - Next.js 14 Production Configuration
 */
const nextConfig: NextConfig = {
  // Enable React Strict Mode for detecting side-effects and hydration bugs
  reactStrictMode: true,

  // Image Optimization Domains for Avatars, Medical Scans, and Third-Party Assets
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },

  // Package import optimization for lightweight client bundles
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // API Proxy Rewrites (Routes frontend /api calls seamlessly to Express Backend)
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

    // Strip trailing slash if present to avoid double slashes
    const sanitizedBackendUrl = backendUrl.replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${sanitizedBackendUrl}/:path*`,
      },
    ];
  },

  // HTTP Security Headers (OWASP Security Best Practices)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
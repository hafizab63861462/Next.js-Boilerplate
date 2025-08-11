import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  // swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // compiler: {
  //   // removeConsole: process.env.NODE_ENV === "production",
  // },
  experimental: {
    ...(process.env.NODE_ENV === "production"
      ? {
          serverActions: {
            allowedOrigins: [],
          },
        }
      : {}),
    authInterrupts: true,
  },
};

export default nextConfig;

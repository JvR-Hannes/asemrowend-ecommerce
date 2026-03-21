import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ufc2dcvmxbm5fkiv.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
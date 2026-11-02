import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Product photos pass through a server action on their way to the API.
    serverActions: { bodySizeLimit: "6mb" },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',

      },
    ],
  },
};

export default nextConfig;

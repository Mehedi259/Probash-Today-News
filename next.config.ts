import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.225.103.236:8002/api/:path*/',
      },
      {
        source: '/media/:path*',
        destination: 'http://46.225.103.236:8002/media/:path*',
      },
    ];
  },
};

export default nextConfig;

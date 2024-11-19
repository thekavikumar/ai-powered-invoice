import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Match both 'http' and 'https'
        hostname: '**', // Match all hostnames
        port: '**', // Match all ports
        pathname: '**', // Match all paths
      },
    ],
  },
};

export default nextConfig;

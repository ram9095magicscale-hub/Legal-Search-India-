import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fssai.org',
      },
      {
        protocol: 'https',
        hostname: 'fssai.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'images.fssai.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'mca.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'gst.gov.in',
      },
    ],
  },
};

export default nextConfig;

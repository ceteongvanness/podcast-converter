import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config: Configuration) {
    return config;
  },
};

export default nextConfig;
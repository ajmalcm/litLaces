import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly opt into a turbopack config (empty) to avoid the automatic
  // Turbopack migration error when using a custom webpack config. This tells
  // Next to keep using webpack for builds while silencing the migration warning.
  turbopack: {},

  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|avi)$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;

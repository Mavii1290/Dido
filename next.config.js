const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  publicExcludes: [
    '!_next/static/chunks/pages/sw.js',
    '!_next/static/chunks/pages/workbox-*.js',
  ],
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true, 
  },
  webpack(config) {
    return config;
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
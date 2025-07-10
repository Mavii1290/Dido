/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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

module.exports = withBundleAnalyzer(nextConfig);

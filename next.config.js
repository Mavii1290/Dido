/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  output: "export", // for static export
  images: {
    unoptimized: true, // <--- disables server-side image optimization
  },
  webpack(config) {
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

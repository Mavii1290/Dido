/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  output: 'standalone',
  webpack(config) {
    // Optionally analyze size later
    return config;
  },
};
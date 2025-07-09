/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
	webpack(config) {
		// Optionally analyze size later
		return config;
	},
};

module.exports = withBundleAnalyzer(nextConfig);

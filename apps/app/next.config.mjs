import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Add any other Next.js configuration options here
	experimental: {
		ppr: true,
		reactCompiler: true,
	},
};

export default withPWA({
	dest: "public",
	disable: process.env.NODE_ENV === "development", // Disable PWA in development, enabled in production
})(nextConfig);

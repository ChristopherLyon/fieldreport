import withPWA from "next-pwa";

const nextConfig = {
	// Add any other Next.js configuration options here
};

export default withPWA({
	dest: "public",
	disable: process.env.NODE_ENV === "development", // Disable PWA in development, enabled in production
})(nextConfig);

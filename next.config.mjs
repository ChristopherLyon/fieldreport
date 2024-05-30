import withPWA from "next-pwa";

const nextConfig = {
  // Add any other Next.js configuration options here
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Any additional PWA-specific configuration options can be added here
})(nextConfig);

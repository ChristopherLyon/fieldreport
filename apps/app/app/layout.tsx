import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Libraries
import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/session-provider-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DM_Sans } from "next/font/google";

// load DM sans from vercel fonts
const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

export const metadata: Metadata = {
	title: "FieldReport",
	description: "Turbocharge your reports with AI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProviderWrapper>
			<html lang="en">
				<head>
					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#000000" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="description" content="Field Reports for the Modern Age" />
					<meta property="og:title" content="FieldReport" />
					<meta
						property="og:description"
						content="Field Reports for the Modern Age"
					/>
					<meta property="og:image" content="/icons/icon-512x512.png" />
					<meta property="og:url" content="https://fieldreport.ai" />
					<meta name="twitter:card" content="summary_large_image" />
				</head>
				<body
					className={`bg-background text-neutral-900 dark:text-neutral-100 ${dmSans.className}`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Analytics />
						<SpeedInsights />
						{children}
						<Toaster richColors position="bottom-left" />
					</ThemeProvider>
				</body>
			</html>
		</SessionProviderWrapper>
	);
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

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
		<html lang="en">
			<Analytics />
			<body className={dmSans.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

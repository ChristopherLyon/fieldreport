// Libraries
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProviderWrapper from "@/components/session-provider-wrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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
          <meta property="og:description" content="Field Reports for the Modern Age" />
          <meta property="og:image" content="/icons/icon-512x512.png" />
          <meta property="og:url" content="https://fieldreport.ai" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body className={`bg-background text-gray-900 dark:text-gray-100 ${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Analytics />
            <SpeedInsights />
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
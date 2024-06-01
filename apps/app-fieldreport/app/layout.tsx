import type * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_getServerSession } from "next-auth";
import { CONFIG } from "@/app/api/auth/[...nextauth]/config";
import { Menu, AudioLines } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import RealtimeClock from "@/components/app/realtime-clock";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavLinks, NavLinksMobile } from "@/components/nav-links";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserAvatar from "@/components/user-avatar";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProviderWrapper from "@/components/session-provider-wrapper";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FieldReport",
  description: "Field Reports for the Modern Age",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await unstable_getServerSession(CONFIG);
  if (!session) {
    redirect("/auth/signin");
  }

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
            <main className="font-raleway h-screen overflow-hidden relative">
              <div className="grid min-h-screen w-full md:grid-cols-[70px_1fr] relative">
                <div className="hidden md:block">
                  <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b mx-auto"></div>
                    <div className="flex-1 overflow-auto">
                      <NavLinks />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full overflow-hidden relative">
                  <header className="flex flex-row items-center h-16 gap-2 px-4 md:px-0 md:pr-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden mr-2">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="flex flex-col">
                        <NavLinksMobile />
                      </SheetContent>
                    </Sheet>
                    <div className="w-full flex flex-row gap-4 items-center">
                      <Link className='flex items-center' href='/app'>
                        <AudioLines className="h-5 w-auto" />
                        <span className="pl-1">FieldReport</span>
                      </Link>
                      <div className="hidden md:block">
                        <RealtimeClock />
                      </div>
                    </div>
                    <ThemeToggle />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <UserAvatar />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </header>
                  <div className="flex-1 max-h-[calc(98vh-4rem)] mr-4 ml-4 md:ml-0 relative">
                    {children}
                  </div>
                </div>
              </div>
            </main>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
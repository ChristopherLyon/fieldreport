// Libraries
import type * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_getServerSession } from "next-auth";
import { CONFIG } from "@/app/api/auth/[...nextauth]/config";

// UI Components
import {
  Menu,
  Search,
  AppWindow,
  AudioLines,
} from "lucide-react";
import { ThemeToggle } from "@/components/darkmode-toggle";
import { Button } from "@/components/ui/button";
import RealtimeClock from "@/components/app/realtime-clock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLinks, NavLinksMobile } from "@/components/nav-links";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserAvatar from "@/components/user-avatar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await unstable_getServerSession(CONFIG);
  if (!session) {
    redirect("/");
  }

  return (
    <main className="font-raleway">
      <div className="grid min-h-screen w-full md:grid-cols-[70px_1fr] ">
        <div className="hidden md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 ">
            <div className="flex h-14 items-center border-b mx-auto">

            </div>
            <div className="flex-1">
              <NavLinks />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex flex-row items-center h-16 gap-2 pr-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">
                    Toggle navigation menu
                  </span>
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
                <DropdownMenuLabel>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full mr-4 mb-4 rounded-lg overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
}

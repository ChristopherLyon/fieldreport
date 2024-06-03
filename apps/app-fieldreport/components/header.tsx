'use client';

import React from 'react';
import Link from 'next/link';

// UI Libraries
import { Menu, AudioLines } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import RealtimeClock from '@/components/realtime-clock';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserAvatar from '@/components/user-avatar';
import { NavLinksMobile } from '@/components/nav-links';

export default function Header() {
  // State for sheet
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="flex flex-row items-center h-16 gap-2 px-4 md:px-0 md:pr-4">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden mr-2"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <NavLinksMobile setIsSheetOpen={setIsSheetOpen} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex flex-row gap-4 items-center">
        <Link className="flex items-center" href="/app">
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
  );
}

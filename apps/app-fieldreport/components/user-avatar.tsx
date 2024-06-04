'use client';

// Libraries
import { useSession, signOut } from 'next-auth/react';

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Maximize, Receipt } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

// Handle function to make the app fullscreen
function toggleFullscreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void document.documentElement.requestFullscreen();
  }
}

export default function UserAvatar() {
  const { data: session } = useSession();

  return (
    <div className="font-raleway">
      {/* If !session show skeleton, else show avatar */}
      {!session ? (
        <Skeleton className="w-8 h-8 rounded-full" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage src={session.user?.image ?? ''} />
              <AvatarFallback>
                {(session.user?.name ?? '')
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleFullscreen}>
              <Maximize className="w-4 h-4 mr-2" />
              Toggle Immersive
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                window.location.href = 'https://billing.stripe.com/p/login/aEU28RgqbaxWcDu3cc';
              }}
            >
              <Receipt className="w-4 h-4 mr-2" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => void signOut({ callbackUrl: '/auth/signin' })}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

"use client";

// Libraries
import { useSession, signIn, signOut } from "next-auth/react";

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, LogOutIcon, Replace } from "lucide-react";

export default function UserAvatar() {

    const { data: session, status } = useSession();

    return (
        <div className="font-raleway">

            {/* If !session show skeleton, else show avatar */}
            {!session ? (
                <Skeleton className="w-10 h-10 rounded-full" />
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={session.user?.image || ""} />
                            <AvatarFallback>
                                {(session.user?.name || "")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            {session.user?.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signIn()}>
                            <Replace className="w-4 h-4 mr-2" />
                            Switch Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )}
        </div>
    );
}

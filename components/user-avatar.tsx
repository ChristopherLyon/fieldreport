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

export default function UserAvatar() {

    const { data: session, status } = useSession();

    return (
        <div>

            {/* If !session show skeleton, else show avatar */}
            {!session ? (
                <Skeleton className="w-10 h-10 rounded-full" />
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
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
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signIn()}>
                            Switch Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )}
        </div>
    );
}

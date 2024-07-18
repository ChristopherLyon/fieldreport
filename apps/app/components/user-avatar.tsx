"use client";

// Libraries

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
import {
	GoogleOneTap,
	OrganizationList,
	OrganizationSwitcher,
	UserButton,
	UserProfile,
} from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { LogOut, Maximize, Receipt } from "lucide-react";

export default function UserAvatar() {
	return (
		<>
			<OrganizationSwitcher />
			<UserButton />
		</>
	);
}

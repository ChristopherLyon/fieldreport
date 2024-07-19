"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function UserAvatar() {
	const { theme } = useTheme();

	return (
		<>
			<OrganizationSwitcher
				appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
			/>
			<UserButton
				appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
			/>
		</>
	);
}

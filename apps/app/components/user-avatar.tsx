"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function UserAvatar() {
	return (
		<>
			<OrganizationSwitcher appearance={{ baseTheme: dark }} />
			<UserButton />
		</>
	);
}

"use client";

import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const OrgRefresh = () => {
	const organization = useOrganization();
	const router = useRouter();

	// when the org changes, refresh the page to get new data
	useEffect(() => {
		router.refresh();
	}, [organization.organization, router]);

	return null;
};

import { ClerkProvider } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// Libraries
import type * as React from "react";

import Header from "@/components/header";
// UI Components
import { NavLinks } from "@/components/nav-links";
import { auth } from "@clerk/nextjs/server";

export default async function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// auth().protect();
	return (
		<ClerkProvider>
			<main className="h-screen overflow-hidden relative">
				<div className="grid min-h-screen w-full md:grid-cols-[140px_1fr] relative">
					<div className="hidden md:block">
						<div className="flex h-full max-h-screen flex-col gap-2">
							<div className="flex h-14 items-center border-b mx-auto" />
							<div className="flex-1 overflow-auto">
								<NavLinks />
							</div>
						</div>
					</div>
					<div className="flex flex-col h-full overflow-hidden relative">
						<Header />

						<div className="flex-1 max-h-[calc(98vh-4rem)] mr-4 ml-4 md:ml-0 relative">
							{children}
						</div>
					</div>
				</div>
				{modal}
			</main>
		</ClerkProvider>
	);
}

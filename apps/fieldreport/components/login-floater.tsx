"use client";

// Libraries
import Link from "next/link";
// UI Components
import { Button } from "@/components/ui/button";

export function LoginFloater() {
	return (
		<div className="hidden lg:block fixed top-3 right-8 z-50">
			<Link href="https://app.fieldreport.ai/auth/signin">
				<Button className="text-xs flex items-center" variant={"outline"}>
					<span className="relative flex h-2 w-2 mr-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
					</span>
					Login to FieldReport
				</Button>
			</Link>
		</div>
	);
}

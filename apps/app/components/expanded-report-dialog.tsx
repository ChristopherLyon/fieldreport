"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { IReport } from "@fr/trpc/types";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MarkdownWrapper from "./markdown-wrapper";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "./ui/dialog";

export default function ExpandedCardDialog({
	report,
	expandedDialogOpen,
	setExpandedDialogOpen,
}: {
	report: IReport;
	expandedDialogOpen: boolean;
	setExpandedDialogOpen?:
		| React.Dispatch<React.SetStateAction<boolean>>
		| string;
}) {
	const router = useRouter();

	const navigate =
		typeof setExpandedDialogOpen === "function"
			? () => setExpandedDialogOpen(false)
			: setExpandedDialogOpen
				? () => router.push(setExpandedDialogOpen)
				: undefined;

	// Close the dialog if the user presses escape
	useEffect(() => {
		if (!setExpandedDialogOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				navigate?.();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setExpandedDialogOpen]);

	const close =
		typeof setExpandedDialogOpen === "string" ? (
			<Link href={setExpandedDialogOpen}>
				<X className="absolute top-2 left-2 cursor-pointer z-50 p-1" />
			</Link>
		) : setExpandedDialogOpen ? (
			<X
				className="absolute top-2 left-2 cursor-pointer z-50 p-1"
				onClick={() => setExpandedDialogOpen(false)}
			/>
		) : null;

	return (
		<Dialog open={expandedDialogOpen} onOpenChange={navigate}>
			<DialogContent className="max-w-4xl">
				<DialogTitle>Report</DialogTitle>
				<DialogDescription className="max-h-[36rem] overflow-y-scroll">
					<MarkdownWrapper markdown={report.ai_generated?.markdown_content} />
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}

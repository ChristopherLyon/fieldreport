"use client";

import type { IStream } from "@fr/trpc/types";
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
	stream,
	expandedDialogOpen,
	setExpandedDialogOpen,
}: {
	stream: IStream;
	expandedDialogOpen: boolean;
	setExpandedDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | string;
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

	if (!expandedDialogOpen) return null;

	return (
		<Dialog open={expandedDialogOpen} onOpenChange={navigate}>
			<DialogContent className="max-w-4xl">
				<DialogTitle>Stream</DialogTitle>
				<DialogDescription className="max-h-[36rem] overflow-y-scroll">
					<MarkdownWrapper
						markdown={stream.ai_generated?.markdown_content ?? ""}
					/>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { format } from "date-fns";
// Libraries
import { useState } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { api } from "@fr/trpc/clients/react";
import type { IReport } from "@fr/trpc/types";
// UI Components
import { Calendar, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ExpandedReportDialog from "./expanded-report-dialog";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ReportCardProps {
	report: IReport;
}

export default function ReportCard({ report }: ReportCardProps) {
	const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
	const [deleteDialogAlertOpen, setDeleteDialogAlertOpen] = useState(false);
	const router = useRouter();

	const deleteReport = api.reports.deleteReport.useMutation();

	const handleDeleteReport = async () => {
		try {
			const resp = await deleteReport.mutateAsync({
				id: report._id.toString(),
			});

			if ("error" in resp) {
				toast.error(`Failed to delete report: ${resp.error}`);
			}

			router.refresh(); // Revalidate the cache
			toast.success("Report deleted successfully");
		} catch (error) {
			toast.error("Failed to delete report");
		}
	};

	const handleCardClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		const target = event.target as HTMLElement;

		if (
			!(
				target.closest("button") ??
				target.closest("a") ??
				target.closest("[data-no-expand]")
			)
		) {
			setExpandedDialogOpen(true);
		}
	};

	const { ai_generated } = report;

	return (
		<>
			<AlertDialog
				open={deleteDialogAlertOpen}
				onOpenChange={setDeleteDialogAlertOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							report.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
						<AlertDialogAction onClick={handleDeleteReport}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<ContextMenu>
				<ContextMenuTrigger>
					<Link href={`/reports/${report._id.toString()}`}>
						<Card
							onClick={handleCardClick}
							className="h-64 w-full rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-muted/10"
						>
							<CardContent className="h-full grid grid-rows-[auto_1fr_auto] p-6 gap-2">
								<div className="flex flex-col">
									{ai_generated?.topic_category && (
										<div className="text-orange-500 font-medium text-xs">
											{ai_generated.topic_category.charAt(0).toUpperCase() +
												ai_generated.topic_category.slice(1)}
										</div>
									)}
									<CardTitle className="text-md">
										{ai_generated?.title}
									</CardTitle>
								</div>
								<div className="text-neutral-500 dark:text-neutral-400 text-sm">
									{ai_generated?.summary}
								</div>
								<div className="flex items-center justify-between">
									<div className="flex flex-row items-center gap-2">
										<Avatar className="size-4">
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
									</div>
									<div className="text-neutral-500 dark:text-neutral-400 text-xs items-center flex font-mono">
										<Calendar className="w-4 h-4 mr-2 inline-block" />
										{format(new Date(report.created_at), "MMM dd")}
									</div>
								</div>
								<div className="w-full overflow-x-scroll">
									<div className="flex gap-2 items-center w-max">
										{ai_generated?.tags?.map((tag) => (
											<Badge variant={"outline"} key={tag} className="w-max">
												{tag}
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						className="text-red-500 flex flex-row items-center gap-2"
						onClick={() => setDeleteDialogAlertOpen(true)}
					>
						<Trash className="h-3 w-3" />
						Delete Report
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			{/* <ExpandedReportDialog
				report={report}
				expandedDialogOpen={expandedDialogOpen}
				setExpandedDialogOpen={setExpandedDialogOpen}
			/> */}
		</>
	);
}

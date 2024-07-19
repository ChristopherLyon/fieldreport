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
							<CardContent className="h-full grid grid-rows-[auto_1fr_auto] p-6 gap-4">
								<div className="flex items-center justify-between">
									<CardTitle className="text-md">
										{ai_generated?.title}
									</CardTitle>
									<div className="flex items-start gap-2 flex-wrap justify-end">
										{ai_generated?.tags?.map((tag) => (
											<Badge
												variant={"outline"}
												key={tag}
												className="capitalize first-letter:text-lg"
											>
												{tag}
											</Badge>
										))}
									</div>
								</div>
								<div className="text-gray-500 dark:text-gray-400 line-clamp-3 text-sm">
									{ai_generated?.summary}
								</div>
								<div className="flex items-center justify-between">
									<div className="flex flex-row items-center gap-2">
										{ai_generated?.topic_category && (
											<div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium text-xs">
												{ai_generated.topic_category.charAt(0).toUpperCase() +
													ai_generated.topic_category.slice(1)}
											</div>
										)}
									</div>
									<div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
										<Calendar className="w-4 h-4 mr-2 inline-block" />
										{format(new Date(report.created_at), "MMM dd")}
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

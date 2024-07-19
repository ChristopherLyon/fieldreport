"use client";

import type { IStream, ITask } from "@/types/types";

import { format } from "date-fns";
// Libraries
import { useEffect, useState } from "react";

import ExpandedCardDialog from "@/components/expanded-card-dialog copy";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@fr/trpc/clients/react";
import { streamInput } from "@fr/trpc/routers/streams";
// UI Components
import {
	AudioLines,
	Calendar,
	ListTodo,
	Medal,
	ThumbsDown,
	Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";
import { Badge } from "./ui/badge";

interface StreamCardProps {
	stream: IStream;
	setLocalStreams: React.Dispatch<React.SetStateAction<IStream[]>>;
}

export default function StreamCard({
	stream,
	setLocalStreams,
}: StreamCardProps) {
	const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
	const [deleteDialogAlertOpen, setDeleteDialogAlertOpen] = useState(false);
	const router = useRouter();

	const deleteMutation = api.streams.deleteStream.useMutation();
	const { data: streamTask } = api.tasks.getTasks.useQuery({
		taskId: stream.ai_generated?.spawned_task_id,
	});

	const task = streamTask?.task;

	const handleDeleteStream = async () => {
		try {
			setLocalStreams((prevStreams) =>
				prevStreams.filter((n) => n._id !== stream._id),
			);
			const response = await deleteMutation.mutateAsync({ id: stream._id });
			if ("error" in response) {
				toast.error("Failed to delete stream");
			} else {
				router.refresh();
				toast.success("Stream deleted successfully");
			}
		} catch (error) {
			toast.error("Failed to delete stream");
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

	const { ai_generated } = stream;

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
							stream and all of its data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
						<AlertDialogAction onClick={handleDeleteStream}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<ContextMenu>
				<ContextMenuTrigger>
					<Card
						onClick={handleCardClick}
						className="h-64 w-full rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-muted/10"
					>
						<CardContent className="h-full grid grid-rows-[auto_1fr_auto] p-6 gap-4">
							<div className="flex flex-col">
								{ai_generated?.topic_category && (
									<div className="text-orange-500 font-medium text-xs">
										{ai_generated.topic_category.charAt(0).toUpperCase() +
											ai_generated.topic_category.slice(1)}
									</div>
								)}
								<CardTitle className="text-md">{ai_generated?.title}</CardTitle>
							</div>
							<div className="text-gray-500 dark:text-gray-400 line-clamp-3 text-sm">
								{ai_generated?.summary}
							</div>
							<div className="flex items-center justify-between">
								<div className="flex flex-row items-center gap-2">
									<Avatar className="size-4">
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									{task && (
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Link href="/tasks/" data-no-expand>
														<ListTodo className="w-4 h-4 " />
													</Link>
												</TooltipTrigger>
												<TooltipContent>
													<p className="font-mono text-xs flex flex-row items-center gap-1">
														<AudioLines className="w-4 h-4 inline-block" />
														<span>Task</span>
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									)}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												{ai_generated?.user_input_quality_ranking?.score !==
													undefined &&
													(ai_generated.user_input_quality_ranking.score < 5 ? (
														<ThumbsDown
															className="w-4 h-4 text-red-500"
															data-no-expand
														/>
													) : ai_generated.user_input_quality_ranking.score >=
														8 ? (
														<Medal
															className="w-4 h-4 text-blue-500"
															data-no-expand
														/>
													) : null)}
											</TooltipTrigger>
											{ai_generated?.user_input_quality_ranking
												?.score_tooltip && (
												<TooltipContent>
													<p className="font-mono text-xs">
														{
															ai_generated.user_input_quality_ranking
																.score_tooltip
														}{" "}
														[score:{" "}
														{ai_generated.user_input_quality_ranking.score}]
													</p>
												</TooltipContent>
											)}
										</Tooltip>
									</TooltipProvider>
								</div>
								<div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
									<Calendar className="w-4 h-4 mr-2 inline-block" />
									{format(new Date(stream.created_at), "MMM dd")}
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
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						className="text-red-500 flex flex-row items-center gap-2"
						onClick={() => setDeleteDialogAlertOpen(true)}
					>
						<Trash className="h-3 w-3" />
						Delete Stream & Tasks
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<ExpandedCardDialog
				stream={stream}
				expandedDialogOpen={expandedDialogOpen}
				setExpandedDialogOpen={setExpandedDialogOpen}
			/>
		</>
	);
}

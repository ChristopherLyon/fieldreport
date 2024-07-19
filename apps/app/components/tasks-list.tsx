"use client";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	isToday as checkIfToday,
	isTomorrow as checkIfTomorrow,
	format,
} from "date-fns";
import { useEffect, useState } from "react";

import NoDataContextCard from "@/components/no-data-context-card";
import {
	Calendar,
	CircleDashed,
	CircleDot,
	CircleDotDashed,
	Minus,
	ShieldAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { api } from "@fr/trpc/clients/react";
import type { ISubTask, ITask } from "@fr/trpc/types";

export const TasksList = ({ tasks }) => {
	const [localTasks, setLocalTasks] = useState<ITask[]>(tasks);
	const router = useRouter();

	const updateTask = api.tasks.updateTask.useMutation();

	// replace tasks when they update
	useEffect(() => {
		if (tasks) {
			setLocalTasks(tasks);
		}
	}, [tasks]);

	if (localTasks.length === 0)
		return (
			<NoDataContextCard
				title="No tasks found"
				description="You have no tasks to display."
			/>
		);
	if (
		localTasks.every((task) =>
			task.sub_tasks.every((subTask) => subTask.completed),
		)
	) {
		return (
			<NoDataContextCard
				title="You're all caught up!"
				description="Enjoy your day, you have no pending tasks."
			/>
		);
	}

	const handleTaskUpdate = async (updatedTask: ITask) => {
		try {
			const response = await updateTask.mutateAsync(updatedTask);
			if ("error" in response) {
				throw new Error(response.error);
			}

			setLocalTasks((prevTasks) =>
				prevTasks.map((task) =>
					task._id === updatedTask._id ? updatedTask : task,
				),
			);
			router.refresh(); // Revalidate the cache
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubtaskUpdate = async (task: ITask, updatedSubtask: ISubTask) => {
		const updatedTask = {
			...task,
			sub_tasks: task.sub_tasks.map((subTask) =>
				subTask.title === updatedSubtask.title ? updatedSubtask : subTask,
			),
		};
		await handleTaskUpdate(updatedTask);
	};

	const handleSubtaskDelete = async (task: ITask, subtaskTitle: string) => {
		const updatedTask = {
			...task,
			sub_tasks: task.sub_tasks.filter(
				(subTask) => subTask.title !== subtaskTitle,
			),
		};
		await handleTaskUpdate(updatedTask);
	};

	const getFurthestSubtaskDueDate = (subTasks: ISubTask[]): Date | null => {
		if (!subTasks || subTasks.length === 0) return null;
		const furthestDueDate = Math.max(
			...subTasks.map((subTask) => new Date(subTask.due_date).getTime()),
		);
		return Number.isNaN(furthestDueDate) ? null : new Date(furthestDueDate);
	};

	const categorizeTasks = (tasks: ITask[]) => {
		const categories: Record<string, ITask[]> = {};
		tasks
			// Remove tasks with all subtasks completed
			.filter((task) => task.sub_tasks.some((subTask) => !subTask.completed))
			.forEach((task) => {
				const dueDate = getFurthestSubtaskDueDate(task.sub_tasks);
				if (dueDate) {
					const dateKey = format(dueDate, "yyyy-MM-dd");
					if (!categories[dateKey]) {
						categories[dateKey] = [];
					}
					categories[dateKey].push(task);
				}
			});

		const sortedCategories = Object.keys(categories)
			.sort()
			.map((key) => ({
				date: key,
				tasks: categories[key],
			}));

		return sortedCategories;
	};

	const taskCategories = categorizeTasks(localTasks);

	const renderTaskTable = (category: { date: string; tasks: ITask[] }) => {
		const date = new Date(category.date);
		const isUpNext = checkIfToday(date);
		const isTomorrow = checkIfTomorrow(date);

		return (
			<div key={category.date} className="mb-8">
				<h2 className="text-lg font-semibold mb-4">
					{isUpNext
						? "Up next"
						: isTomorrow
							? "Tomorrow"
							: format(date, "dd MMM")}
				</h2>
				<div className="border rounded-lg overflow-hidden">
					<Table className="bg-muted/10">
						<TableHeader>
							<TableRow>
								<TableHead className="text-left">Task</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{category.tasks.map((task) => (
								<React.Fragment key={task._id.toString()}>
									<TableRow className="w-full">
										<TableCell className="flex items-center justify-between pl-5 gap-5 w-full text-xs md:text-base">
											<div className="flex flex-row items-center gap-5">
												{priorityIcon(task.priority)}
												<div>
													<div className="text-base font-medium truncate">
														{task.title}
													</div>
													<div className="text-xs text-wrap text-foreground/50">
														{task.description}
													</div>
												</div>
											</div>
											<div className="text-xs items-center flex font-mono text-nowrap text-foreground/50">
												<Calendar className="w-4 h-4 mr-2 inline-block" />
												{getFurthestSubtaskDueDate(task.sub_tasks)
													? format(
															getFurthestSubtaskDueDate(task.sub_tasks)!,
															"MMM dd",
														)
													: "No due date"}
											</div>
										</TableCell>
									</TableRow>
									{task.sub_tasks && (
										<Table>
											<TableBody className="w-full">
												{task.sub_tasks.map((subTask) => (
													<ContextMenu key={subTask.title}>
														<TableRow className="w-full">
															<ContextMenuTrigger>
																<TableCell className="flex items-center justify-between gap-3 w-full text-xs md:text-base pl-14">
																	<div className="flex flex-row items-center gap-3">
																		<Minus className="w-4 h-4 text-foreground/40" />
																		<div>
																			<div
																				className={`text-sm truncate ${subTask.completed ? "line-through" : ""}`}
																			>
																				{subTask.title}
																			</div>
																			<div
																				className={`text-xs text-wrap text-foreground/50 ${subTask.completed ? "hidden" : ""}`}
																			>
																				{subTask.description}
																			</div>
																		</div>
																	</div>
																	<div className="text-xs items-center flex font-mono text-nowrap text-foreground/50">
																		<Calendar className="w-4 h-4 mr-2 inline-block" />
																		{format(
																			new Date(subTask.due_date),
																			"MMM dd",
																		)}
																	</div>
																</TableCell>
															</ContextMenuTrigger>
														</TableRow>
														<ContextMenuContent>
															<ContextMenuItem
																onClick={() =>
																	void handleSubtaskUpdate(task, {
																		...subTask,
																		completed: !subTask.completed,
																	})
																}
															>
																{subTask.completed
																	? "Undo Complete"
																	: "Complete"}
															</ContextMenuItem>
															<ContextMenuItem
																onClick={() =>
																	void handleSubtaskDelete(task, subTask.title)
																}
															>
																Delete
															</ContextMenuItem>
														</ContextMenuContent>
													</ContextMenu>
												))}
											</TableBody>
										</Table>
									)}
								</React.Fragment>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full mx-auto max-w-6xl h-screen overflow-auto">
			{taskCategories.map((category) => renderTaskTable(category))}
		</div>
	);
};

function priorityIcon(priority: Priority) {
	switch (priority) {
		case "low":
			return <CircleDashed className="w-5 h-5 text-green-500" />;
		case "medium":
			return <CircleDotDashed className="w-5 h-5 text-yellow-500" />;
		case "high":
			return <CircleDot className="w-5 h-5 text-red-500" />;
		case "urgent":
			return <ShieldAlert className="w-5 h-5 text-red-500" />;
		default:
			return null;
	}
}

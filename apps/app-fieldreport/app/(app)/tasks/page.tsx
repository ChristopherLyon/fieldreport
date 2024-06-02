"use client";
import useSWR from 'swr';
import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import { ITask, Priority } from "@/types/types";
import { format } from "date-fns";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import React from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TaskTable() {
    const { data: tasks, error, isLoading, mutate } = useSWR<ITask[]>('/api/tasks', fetcher, {
        refreshInterval: 5000
    });
    const [localTasks, setLocalTasks] = useState<ITask[]>([]);

    useEffect(() => {
        if (tasks) {
            setLocalTasks(tasks);
        }
    }, [tasks]);

    if (error) return <div>Error loading tasks.</div>;
    if (isLoading && localTasks.length === 0) return <div>Loading tasks...</div>;

    const handleTaskUpdate = async (updatedTask: ITask) => {
        try {
            const response = await fetch(`/api/tasks`, {
                method: 'PUT',
                body: JSON.stringify(updatedTask),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            setLocalTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
            mutate(); // Revalidate the cache
        } catch (error) {
            console.error(error);
        }
    };

    const handleTaskDelete = async (taskId: ObjectId) => {
        try {
            const response = await fetch(`/api/tasks`, {
                method: 'DELETE',
                body: JSON.stringify({ _id: taskId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setLocalTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            mutate(); // Revalidate the cache
        } catch (error) {
            console.error(error);
        }
    };

    const handlePriorityChange = (task: ITask, priority: Priority) => {
        handleTaskUpdate({ ...task, priority });
    };

    const handleStatusChange = (task: ITask, status: "not-started" | "in-progress" | "completed") => {
        handleTaskUpdate({ ...task, completed: status === "completed" });
    };

    const statusOptions = ["not-started", "in-progress", "completed"] as const;

    return (
        <div className="w-full mx-auto max-w-6xl">
            <div className="border rounded-lg overflow-hidden">
                <Table className="bg-muted/10">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Task</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {localTasks.map((task) => (
                            <React.Fragment key={task._id.toString()}>
                                <TableRow className='w-full'>
                                    <TableCell className="flex items-center pl-5 gap-5 w-full text-xs md:text-base">
                                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority ?? "medium")}`} />
                                        <div>
                                            <div className="font-medium truncate">{task.title}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                {task.description}
                                            </div>
                                        </div>

                                        {task.due_date && (
                                            <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                                                <Calendar className="w-4 h-4 mr-2 inline-block" />
                                                {format(new Date(task.due_date), "MMM dd")}
                                            </div>
                                        )}

                                        
                                    </TableCell>
                                </TableRow>
                                {task.sub_tasks && task.sub_tasks.length > 0 && (
                                    <Table>
                                        <TableBody>
                                            {task.sub_tasks.map((subTask) => (
                                                <TableRow key={subTask.title.toString()} className='w-full'>
                                                    <TableCell className="flex items-center gap-3 w-full text-xs md:text-base pl-16">
                                                        <div>
                                                            <div className="font-medium truncate">{subTask.title}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                                {subTask.description}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {subTask.due_date && (
                                                            <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                                                                <Calendar className="w-4 h-4 mr-2 inline-block" />
                                                                {format(new Date(subTask.due_date), "MMM dd")}
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
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
}

function getPriorityColor(priority?: Priority) {
    switch (priority) {
        case "low":
            return "bg-green-500";
        case "medium":
            return "bg-yellow-500";
        case "high":
            return "bg-red-500";
        case "urgent":
            return "bg-red-700";
        default:
            return "bg-yellow-500";
    }
}
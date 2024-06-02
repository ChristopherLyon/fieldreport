"use client";
import useSWR from 'swr';
import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import { ITask, ISubTask, Priority } from "@/types/types";
import { format } from "date-fns";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { Minus, Calendar, CircleDashed, CircleDot, CircleDotDashed, ShieldAlert } from "lucide-react";
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

    const getFurthestSubtaskDueDate = (subTasks: ISubTask[]): Date | null => {
        if (!subTasks || subTasks.length === 0) return null;
        const furthestDueDate = Math.max(
            ...subTasks
                .map((subTask) => new Date(subTask.due_date).getTime())
        );
        return isNaN(furthestDueDate) ? null : new Date(furthestDueDate);
    };

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
                                        {priorityIcon(task.priority)}
                                        <div>
                                            <div className="text-base font-medium truncate">{task.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {task.description}
                                            </div>
                                        </div>
                                        <TableCell className="md:table-cell ml-auto">
                                            <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                                                <Calendar className="w-4 h-4 mr-2 inline-block" />
                                                {getFurthestSubtaskDueDate(task.sub_tasks) ? (
                                                    format(getFurthestSubtaskDueDate(task.sub_tasks)!, "MMM dd")
                                                ) : (
                                                    'No due date'
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableCell>
                                </TableRow>
                                {task.sub_tasks && (
                                    <Table>
                                        <TableBody>
                                            {task.sub_tasks.map((subTask) => (
                                                <TableRow key={subTask.title} className='w-full'>
                                                    <TableCell className="flex items-center gap-3 w-full text-xs md:text-base pl-14">
                                                        <Minus className="w-4 h-4 text-foreground/40" />
                                                        <div>
                                                            <div className="text-sm truncate">{subTask.title}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                                {subTask.description}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="md:table-cell ml-auto">
                                                        <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                                                            <Calendar className="w-4 h-4 mr-2 inline-block" />
                                                            {format(new Date(subTask.due_date), "MMM dd")}
                                                        </div>
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

function priorityIcon(priority: Priority) {
    switch (priority) {
        case "low":
            return <CircleDashed className="w-4 h-4 text-green-500" />;
        case "medium":
            return <CircleDotDashed className="w-4 h-4 text-yellow-500" />;
        case "high":
            return <CircleDot className="w-4 h-4 text-red-500" />;
        case "urgent":
            return <ShieldAlert className="w-4 h-4 text-red-500" />;
        default:
            return null;
    }
}

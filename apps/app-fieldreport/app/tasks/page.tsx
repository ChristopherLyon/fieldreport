"use client";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { ITask, ISubTask } from "@/types/types"; // Import the types
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
import React from "react";

export default function TaskTable() {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        // Fetch tasks
        async function fetchTasks() {
            const response = await fetch("/api/tasks");
            const data: ITask[] = await response.json();
            setTasks(data);
        }
        fetchTasks();
    }, []);

    return (
        <div className="w-full mx-auto max-w-6xl">
            <div className="border rounded-lg overflow-hidden">
                <Table className="bg-muted/10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-8" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <React.Fragment key={task._id.toString()}>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Checkbox
                                                id={`task-${task._id}`}
                                                checked={task.completed ?? false}
                                            />
                                            <div>
                                                <div className="font-medium">{task.title}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {task.description}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <span>
                                                {task.due_date
                                                    ? new Date(task.due_date).toLocaleDateString()
                                                    : "No due date"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Select defaultValue={task.priority ?? "medium"}>
                                            <SelectTrigger className="w-24">
                                                <SelectValue>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${getPriorityColor(
                                                                task.priority ?? "medium"
                                                            )}`}
                                                        />
                                                        <span>{capitalizeFirstLetter(task.priority ?? "medium")}</span>
                                                    </div>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                                        <span>Low</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                        <span>Medium</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                                        <span>High</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="urgent">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-red-700" />
                                                        <span>Urgent</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={task.completed ? "completed" : "in-progress"}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue>
                                                    <span>
                                                        {task.completed ? "Completed" : "In Progress"}
                                                    </span>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="not-started">Not Started</SelectItem>
                                                <SelectItem value="in-progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="icon" variant="ghost">
                                            <ChevronDown className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {task.sub_tasks && task.sub_tasks.length > 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <div className="p-4 bg-muted/30">
                                                <div className="grid gap-4">
                                                    {task.sub_tasks.map((subtask, index) => (
                                                        <div
                                                            className="flex items-center gap-3"
                                                            key={`sub-task-${task._id}-${index}`}
                                                        >
                                                            <Checkbox
                                                                id={`sub-task-${task._id}-${index}`}
                                                                checked={subtask.completed ?? false}
                                                            />
                                                            <div>
                                                                <div className="font-medium">{subtask.title}</div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {subtask.description}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 ml-auto">
                                                                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                                <span>
                                                                    {subtask.due_date
                                                                        ? new Date(subtask.due_date).toLocaleDateString()
                                                                        : "No due date"}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Select
                                                                    defaultValue={subtask.completed ? "completed" : "in-progress"}
                                                                >
                                                                    <SelectTrigger className="w-32">
                                                                        <SelectValue>
                                                                            <span>
                                                                                {subtask.completed ? "Completed" : "In Progress"}
                                                                            </span>
                                                                        </SelectValue>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="not-started">Not Started</SelectItem>
                                                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                                                        <SelectItem value="completed">Completed</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to get the priority color class
function getPriorityColor(priority?: string) {
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

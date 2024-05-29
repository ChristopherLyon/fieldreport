// Types 
import { IStream } from "@/types/types";

// Libraries
import { useState, useEffect, use } from "react";
// date fns
import { format } from "date-fns";

// UI

import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    Truck,
    Trash,
    Calendar,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { toast } from "sonner"

import { Badge } from "../ui/badge";
import ExpandedCardDialog from "./expanded-card-dialog";

// takes in a stream as well as the setStreams function to be able to delete streams. Set the types for the stream
export default function StreamCard({ stream, setStreams }: { stream: IStream; setStreams: React.Dispatch<React.SetStateAction<IStream[]>> }) {

    // State for opening the expanded dialog
    const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
    const [deleteDialogAlertOpen, setDeleteDialogAlertOpen] = useState(false);

    // Handle delete stream
    const handleDeleteStream = () => {
        fetch("/api/backend/streams", {
            method: "DELETE",
            body: JSON.stringify({ _id: stream._id }),
        });
        setStreams((prevStreams) => prevStreams.filter((n) => n._id !== stream._id));
        toast.success("Stream deleted successfully");

    };

    return (
        <>
            <AlertDialog open={deleteDialogAlertOpen} onOpenChange={setDeleteDialogAlertOpen}>
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
                        <AlertDialogAction onClick={handleDeleteStream}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <ContextMenu>
                <ContextMenuTrigger>
                    <Card onClick={() => setExpandedDialogOpen(true)} className="h-[250px] w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-background">
                        <CardContent className="h-full grid grid-rows-[auto_1fr_auto] p-6 gap-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">{stream.ai_generated.title}</CardTitle>
                                <div className="flex items-start gap-2 flex-wrap justify-end">
                                    {stream.ai_generated.tags.map((tag) => (
                                        <Badge variant={"outline"} key={tag} className="capitalize first-letter:text-lg">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 line-clamp-3 text-sm">
                                {stream.ai_generated.summary}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium text-xs">
                                    {stream.ai_generated.topic_category.charAt(0).toUpperCase() + stream.ai_generated.topic_category.slice(1)}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                                    <Calendar className="w-4 h-4 mr-2 inline-block" />
                                    {format(new Date(stream.created_at), "MMM dd, yyyy")}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem className="text-red-500 flex flex-row items-center gap-2" onClick={() => setDeleteDialogAlertOpen(true)}>
                        <Trash className="h-3 w-3" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <ExpandedCardDialog stream={stream} expandedDialogOpen={expandedDialogOpen} setExpandedDialogOpen={setExpandedDialogOpen} />
        </>


    );
}


/* 
 <AlertDialog open={deleteDialogAlertOpen} onOpenChange={setDeleteDialogAlertOpen}>
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
                        <AlertDialogAction onClick={handleDeleteStream}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <ContextMenu>
                <ContextMenuTrigger>
                    <Card
                        onClick={() => setExpandedDialogOpen(true)}
                        className="h-[250px] w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-background">
                        <CardContent className="h-full grid grid-rows-[auto_1fr_auto] p-6 gap-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">{stream.ai_generated.title}</CardTitle>
                                <div className="flex items-start gap-2 flex-wrap justify-end">
                                    {stream.ai_generated.tags.map((tag) => (
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
                            <div className="text-gray-500 dark:text-gray-400 line-clamp-3">
                                {stream.ai_generated.summary}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium text-xs">Finance</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm items-center flex">
                                    <Calendar className="w-4 h-4 mr-1 inline-block" />
                                    {format(new Date(stream.created_at), "MMM dd, yyyy")}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem className="text-red-500 flex flex-row items-center gap-2" onClick={() => setDeleteDialogAlertOpen(true)}>
                        <Trash className="h-3 w-3" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

*/
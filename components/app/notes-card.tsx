// Types 
import { INote } from "@/types/types";

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
    Trash,
    Truck,
} from "lucide-react"

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

// takes in a note as well as the setNotes function to be able to delete notes. Set the types for the note
export default function NotesCard({ note, setNotes }: { note: INote; setNotes: React.Dispatch<React.SetStateAction<INote[]>> }) {

    // State for opening the expanded dialog
    const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
    const [deleteDialogAlertOpen, setDeleteDialogAlertOpen] = useState(false);

    // Handle delete note
    const handleDeleteNote = () => {
        fetch("/api/backend/notes", {
            method: "DELETE",
            body: JSON.stringify({ _id: note._id }),
        });
        setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
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
                        <AlertDialogAction onClick={handleDeleteNote}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <ContextMenu>
                <ContextMenuTrigger>
                    <Card
                        onClick={() => setExpandedDialogOpen(true)}
                        className="flex flex-col justify-between overflow-hidden">
                        <div>
                            <CardContent className="p-6 text-sm flex flex-col gap-4">
                                <div className="felx flex-row gap-2">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        {/* If note.ai_generated.task.is_task, then show the priority in a coloured badge*/}
                                        {note.ai_generated.title}
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription className="flex gap-2">
                                        {/* Date using date-fns for DD MMM YYYY format */}
                                        {format(new Date(note.created_at), "dd MMM yyyy")}
                                        {note.ai_generated.task.is_task && note.ai_generated.task.priority && (
                                            <Badge variant="outline">
                                                {note.ai_generated.task.priority.charAt(0).toUpperCase() + note.ai_generated.task.priority.slice(1)}
                                            </Badge>
                                        )}
                                    </CardDescription>
                                </div>
                                {note.ai_generated.summary}
                            </CardContent>
                        </div>
                        <CardFooter className="flex flex-row border-t bg-muted/50 px-6 py-3 mt-auto">
                            {/* Show all tags as badges*/}
                            <div className="flex gap-2 flex-wrap">
                                {note.ai_generated.tags.map((tag) => (
                                    <Badge
                                        variant="outline"
                                        key={tag}
                                        className="capitalize whitespace-nowrap"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem className="text-red-500 flex flex-row items-center gap-2" onClick={() => setDeleteDialogAlertOpen(true)}>
                        <Trash className="h-3 w-3" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <ExpandedCardDialog note={note} expandedDialogOpen={expandedDialogOpen} setExpandedDialogOpen={setExpandedDialogOpen} />


        </>
    );
}

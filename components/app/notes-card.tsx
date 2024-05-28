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
    Truck,
    Trash,
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
                    <Card className="overflow-hidden h-72 flex flex-col justify-between" onClick={() => setExpandedDialogOpen(true)}>
                        <CardHeader className="flex flex-row items-start bg-muted/50 flex-none">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
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
                                <CardDescription>
                                    gweinguiowrng
                                </CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm overflow-hidden flex-auto">
                            <div className="grid gap-3 h-full">
                                <div className="font-semibold">Note Summary</div>
                                <p className="text-muted-foreground overflow-hidden text-ellipsis">
                                    {note.ai_generated.summary}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 flex-none">
                            <div className="text-xs text-muted-foreground">
                                Updated <time>{format(new Date(note.updated_at), "MMMM dd, yyyy")}</time>
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

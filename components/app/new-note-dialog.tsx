"use client";

// Libraries
import React from "react";

// UI
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AudioLines, WandSparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

export default function NewNoteDialog() {

    // State for raw_input
    const [rawInput, setRawInput] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const minimumNoteLength = 20;
    // Progress is grom 0-100, calculate the percentage of the minimum note length
    const progress = (rawInput.length / minimumNoteLength) * 100;

    // Submit function
    const handleSubmit = async () => {
        // If rawInput is empty, is "" or has only spaces, show a sonner toast and return
        if (rawInput === "" || rawInput.trim() === "") {
            toast.error("Note cannot be empty");
            return;
        }

        // If the note is less than the minimum length, show a sonner toast and return
        if (rawInput.length < minimumNoteLength) {
            toast.error(`Note must be at least ${minimumNoteLength} characters long`);
            return;
        }

        try {
            // Show success toast and reset the form
            toast.info("Note added to AI queue 🚀");
            setRawInput("");
            setDialogOpen(false);

            const response = await fetch("/api/backend/notes", {
                method: "POST",
                body: JSON.stringify({ raw_note: rawInput, source: "web" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Note added successfully");

            if (!response.ok) {
                throw new Error("Failed to add note");
            }

        } catch (error) {
            toast.error("Failed to add note");
        }
    };

    // If enter is pressed at any time, as long as shift is not pressed, submit the note and close the dialog
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [rawInput]);

    // If ctrl or cmd + n is pressed, open the dialog. Prevent default to avoid browser new window
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "n") {
                setDialogOpen(true);
                e.preventDefault();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                    Add New Stream <AudioLines className="pl-2 h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new stream</DialogTitle>
                    <DialogDescription>
                        FieldReport's AI will process your stream and provide automatic insights for you.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-1">
                    <Progress value={progress} className="w-full h-1 mb-7" />
                    <Textarea
                        id="note"
                        value={rawInput}
                        placeholder="Start typing here..."
                        onChange={(e) => setRawInput(e.target.value)}
                        className="col-span-3"
                        autoFocus
                        rows={10}
                    />
                </div>
                <DialogFooter>
                    <Label className="text-xs text-muted-foreground">
                        Press <kbd>Enter</kbd> to submit
                    </Label>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

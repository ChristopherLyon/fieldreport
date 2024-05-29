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
import { AudioLines, AudioWaveform, WandSparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { ContextMenuShortcut } from "../ui/context-menu";

export default function NewStreamDialog() {

    // State for raw_input
    const [rawInput, setRawInput] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const minimumStreamLength = 20;
    // Progress is grom 0-100, calculate the percentage of the minimum stream length
    const progress = (rawInput.length / minimumStreamLength) * 100;

    // Submit function
    const handleSubmit = async () => {
        // If rawInput is empty, is "" or has only spaces, show a sonner toast and return
        if (rawInput === "" || rawInput.trim() === "") {
            toast.error("Stream cannot be empty");
            return;
        }

        // If the stream is less than the minimum length, show a sonner toast and return
        if (rawInput.length < minimumStreamLength) {
            toast.error(`Stream must be at least ${minimumStreamLength} characters long`);
            return;
        }

        try {
            // Show success toast and reset the form
            toast.info("Stream added to AI queue 🚀");
            setRawInput("");
            setDialogOpen(false);

            const response = await fetch("/api/backend/streams", {
                method: "POST",
                body: JSON.stringify({ raw_stream: rawInput, source: "web" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Stream added successfully");

            if (!response.ok) {
                throw new Error("Failed to add stream");
            }

        } catch (error) {
            toast.error("Failed to add stream");
        }
    };

    // If enter is pressed at any time, as long as shift is not pressed, submit the stream and close the dialog
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
                <Button  className="flex flex-rol items-center justify-between gap-2 ">
                    <span>New Stream </span>
                    <AudioWaveform className="w-4 h-4" />
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new stream</DialogTitle>
                    <DialogDescription>
                        FieldReport&apos;s AI will process your stream and provide automatic insights for you.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-1">
                    <Progress value={progress} className="w-full h-1 mb-7" />
                    <Textarea
                        id="stream"
                        value={rawInput}
                        placeholder="Start typing here..."
                        onChange={(e) => setRawInput(e.target.value)}
                        className="col-span-3"
                        autoFocus
                        rows={10}
                    />
                </div>
                <DialogFooter>
                    {/* Based on the length of input and the max, tell the users to write more if ots less, or tell them how to submit */}
                    {rawInput.length < minimumStreamLength ? (
                        null
                    ) : (
                        <Label className="text-xs text-muted-foreground">
                            Press <kbd>Enter</kbd> to submit
                        </Label>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

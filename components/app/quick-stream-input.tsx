"use client";
// Types
import { IStream } from "@/types/types";

// UI
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface QuickStreamInputProps {
    setStreams: React.Dispatch<React.SetStateAction<IStream[]>>;
    setStreamAiProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickStreamInput: React.FC<QuickStreamInputProps> = ({ setStreams, setStreamAiProcessing }) => {
    const [rawInput, setRawInput] = React.useState("");
    const minimumStreamLength = 20;

    const progress = (rawInput.length / minimumStreamLength) * 100;

    const handleSubmit = async () => {
        if (rawInput.trim() === "") {
            toast.error("Stream cannot be empty");
            return;
        }

        if (rawInput.length < minimumStreamLength) {
            toast.error(`Stream must be at least ${minimumStreamLength} characters long`);
            return;
        }

        try {
            setStreamAiProcessing(true);
            toast.info("Stream added to AI queue 🚀");
            setRawInput("");

            const response = await fetch("/api/backend/streams", {
                method: "POST",
                body: JSON.stringify({ raw_stream: rawInput, source: "web" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to add stream");
            }

            const newStream = await response.json();
            setStreams((prevStreams) => [newStream.stream, ...prevStreams]); // Prepend the new stream
            toast.success("Stream processed successfully");
        } catch (error) {
            toast.error("Failed to add stream");
        } finally {
            setStreamAiProcessing(false);
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [rawInput]);

    return (
        <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring h-96 flex flex-col justify-between">
            <Label htmlFor="message" className="sr-only">Message</Label>
            <Textarea
                id="message"
                placeholder="Add a new AI Stream..."
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 h-full"
            />
            <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Paperclip className="size-4" />
                                <span className="sr-only">Attach file</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button onClick={handleSubmit} size="sm" className="ml-auto gap-1.5 font-sans">
                    Commit
                    <CornerDownLeft className="size-3.5" />
                </Button>
            </div>
        </div>
    );
};

export default QuickStreamInput;

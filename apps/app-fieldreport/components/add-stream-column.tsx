"use client";
// Types
import { IStream, ILocation } from "@/types/types";

// UI
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AudioLines, CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import LockedMapWidget from "@/components/locked-map-widget";
import { Progress } from "@/components/ui/progress";

interface AddStreamColumnProps {
    setLocalStreams: React.Dispatch<React.SetStateAction<IStream[]>>;
    setStreamAiProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    mutate: () => void;
}

const AddStreamColumn: React.FC<AddStreamColumnProps> = ({ setLocalStreams, setStreamAiProcessing, mutate }) => {
    const [rawInput, setRawInput] = useState("");
    const minimumStreamLength = 20;
    const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position.coords);
        }, (error) => {
            console.error(error);
        }, {
            enableHighAccuracy: true
        });
    }, []);

    const handleSubmit = useCallback(async () => {
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

            const sanitizedLocation: ILocation | null = location
                ? {
                    type: "Point",
                    coordinates: [location.longitude, location.latitude],
                    accuracy: location.accuracy,
                }
                : null;

            const response = await fetch("/api/streams", {
                method: "POST",
                body: JSON.stringify({ raw_stream: rawInput, source: "web", location: sanitizedLocation }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to add stream");
            }

            const newStream = await response.json();
            setLocalStreams((prevStreams) => [newStream.stream, ...prevStreams]);

            if (newStream.stream.ai_generated.user_input_quality_ranking.score === 10) {
                toast.success("Perfect Stream added successfully 🎉");
            } else {
                toast.success("Stream added successfully");
            }

            mutate(); // Revalidate the cache

        } catch (error) {
            toast.error("Failed to add stream");
        } finally {
            setStreamAiProcessing(false);
        }
    }, [rawInput, location, minimumStreamLength, setStreamAiProcessing, setLocalStreams, mutate]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleSubmit]);

    const progress = (rawInput.length / minimumStreamLength) * 100;

    return (
        <>
            {/* Desktop Input */}
            <div className="hidden lg:flex flex-col h-full w-96 gap-4">
                <div className="relative overflow-hidden rounded-lg border focus-within:ring-1 focus-within:ring-ring h-full flex flex-col justify-between">
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
                <div className="h-64">
                    <LockedMapWidget />
                </div>
            </div>

            {/* Mobile Input */}
            <div className="lg:hidden fixed bottom-4 right-4 z-20">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="p-3 h-36 opacity-90 bg-muted/90" variant={"outline"}>
                            <AudioLines className="" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] -mt-40">
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
                            {rawInput.length < minimumStreamLength ? (
                                null
                            ) : (
                                <Label className="text-xs text-muted-foreground" onClick={handleSubmit}>
                                    Press <kbd>Enter</kbd> to submit
                                </Label>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default AddStreamColumn;

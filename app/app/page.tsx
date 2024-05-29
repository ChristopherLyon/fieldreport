// page.tsx

"use client";
// Types
import { IStream } from "@/types/types";

// Libraries
import { useState, useEffect } from "react";

// UI
import NoDataContextCard from "@/components/no-data-context-card";
import React from "react";
import StreamCard from "@/components/app/stream-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function App() {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [fetchingStreams, setFetchingStreams] = useState<boolean>(true);

  useEffect(() => {
    const fetchStreams = () => {
      fetch("/api/backend/streams")
        .then((res) => res.json())
        .then((data) => {
          setStreams(data);
          setFetchingStreams(false);
        });
    };

    fetchStreams();
    const interval = setInterval(() => {
      fetchStreams();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // State for raw_input
  const [rawInput, setRawInput] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const minimumStreamLength = 20;
  // Progress is from 0-100, calculate the percentage of the minimum stream length
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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rawInput]);

  return (
    <div className="flex flex-1 h-full gap-4">
      <div className="flex-1 h-full overflow-hidden flex flex-col">
        {fetchingStreams ? (
          <NoDataContextCard title="Loading Streams" description="Please wait while we fetch your streams." />
        ) : streams.length === 0 ? (
          <NoDataContextCard title="No Streams Found" description="You have no streams. Click the button below to create a new stream." />
        ) : (
          <div className="flex-1 overflow-y-auto max-h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {streams.map((stream) => (
                <StreamCard key={stream._id.toString()} stream={stream} setStreams={setStreams} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:flex flex-col h-full w-96 gap-4">
        <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring h-96 flex flex-col justify-between">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
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
            <Button 
            onClick={handleSubmit}
            size="sm" className="ml-auto gap-1.5 font-sans">
              Commit
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </div>

        <Card className="h-full bg-background" />
      </div>
    </div>
  );
}

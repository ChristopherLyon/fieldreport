"use client";

import GenerateReportButton from "@/components/generate-report-button";
import LockedMapWidget from "@/components/locked-map-widget";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@fr/trpc/clients/react";
import type { IStream } from "@fr/trpc/types";
import { sub } from "date-fns";
import { AudioLines, CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
// UI
import type React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

interface AddStreamColumnProps {
	setLocalStreams: React.Dispatch<React.SetStateAction<IStream[]>>;
	setStreamAiProcessing: React.Dispatch<React.SetStateAction<boolean>>;
	userId: string;
	orgId?: string;
}

const MINIMUM_STREAM_LENGTH = 20;

const AddStreamColumn: React.FC<AddStreamColumnProps> = ({
	setLocalStreams,
	setStreamAiProcessing,
	userId,
	orgId,
}) => {
	const [rawInput, setRawInput] = useState("");
	const [rawContext, setRawContext] = useLocalStorage<string>(
		`savedContext-${userId}-${orgId ?? "personal"}`,
		"",
	);

	const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
	const [mobileStreamInputOpen, setMobileStreamInputOpen] =
		useState<boolean>(false);
	const router = useRouter();

	const createStreamMutation = api.streams.createStream.useMutation();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation(position.coords);
			},
			(error) => {
				console.error(error);
			},
			{
				enableHighAccuracy: true,
			},
		);
	}, []);

	const handleSubmit = useCallback(async () => {
		const trimmedInput = rawInput.trim();
		if (trimmedInput.length < MINIMUM_STREAM_LENGTH) {
			toast.error(
				`Stream must be at least ${MINIMUM_STREAM_LENGTH} characters long`,
			);
			return;
		}

		const trimmedContext = rawContext.trim();

		try {
			setStreamAiProcessing(true);
			setMobileStreamInputOpen(false);
			toast.info("Stream added to AI queue 🚀");
			setRawInput("");

			const response = await createStreamMutation.mutateAsync({
				raw_stream: trimmedInput,
				raw_context: rawContext.length === 0 ? undefined : trimmedContext,
				source: "web",
				location:
					location !== null
						? {
								type: "Point",
								coordinates: [location.longitude, location.latitude],
								accuracy: location.accuracy,
							}
						: undefined,
			});

			if ("error" in response) {
				throw new Error(response.error);
			}

			setLocalStreams((prevStreams) => [response.stream, ...prevStreams]);

			if (
				response.stream.ai_generated?.user_input_quality_ranking?.score === 10
			) {
				toast.success("Perfect Stream added successfully 🎉");
			} else {
				toast.success("Stream added successfully");
			}

			router.refresh(); // Revalidate the cache
		} catch (error) {
			toast.error(`Failed to add stream: ${error}`);
		} finally {
			setStreamAiProcessing(false);

			// TODO: re-add subscription check
		}
	}, [
		rawInput,
		location,
		MINIMUM_STREAM_LENGTH,
		setStreamAiProcessing,
		setLocalStreams,
	]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				void handleSubmit();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleSubmit]);

	const progress = (rawInput.length / MINIMUM_STREAM_LENGTH) * 100;

	return (
		<>
			{/* Desktop Input */}
			<div className="hidden lg:flex flex-col h-full w-96 gap-4">
				<GenerateReportButton />
				<div className="relative overflow-hidden h-full flex flex-col gap-4 justify-between">
					<Label htmlFor="message" className="sr-only">
						Message
					</Label>
					<Textarea
						id="context"
						placeholder="What is the context you are working in today?"
						value={rawContext}
						onChange={(e) => setRawContext(e.target.value)}
						className="min-h-12 resize-none h-72 p-3 shadow-none focus-visible:ring-0 rounded-lg border focus-within:ring-1 focus-within:ring-ring"
					/>
					<Textarea
						id="message"
						placeholder="Add a new AI Stream..."
						value={rawInput}
						onChange={(e) => setRawInput(e.target.value)}
						className="min-h-12 resize-none p-3 shadow-none focus-visible:ring-0 h-full rounded-lg border focus-within:ring-1 focus-within:ring-ring"
					/>
					<div className="flex items-center p-3 pt-0">
						{/*  <TooltipProvider>
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
            </TooltipProvider> */}
						<Button
							onClick={handleSubmit}
							size="sm"
							className="ml-auto gap-1.5 font-sans"
						>
							Commit
							<CornerDownLeft className="size-3.5" />
						</Button>
					</div>
				</div>
				{/* <div className="h-64">
          <LockedMapWidget />
        </div> */}
			</div>

			{/* Mobile Input */}
			<div className="lg:hidden fixed bottom-4 right-4 z-20">
				<Dialog
					open={mobileStreamInputOpen}
					onOpenChange={setMobileStreamInputOpen}
				>
					<DialogTrigger asChild>
						<Button className="p-3 h-36 bg-muted" variant={"outline"}>
							<AudioLines className="" />
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] -mt-40">
						<DialogHeader>
							<DialogTitle>Add new stream</DialogTitle>
							<DialogDescription>
								FieldReport&apos;s AI will process your stream and provide
								automatic insights for you.
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
							{rawInput.length < MINIMUM_STREAM_LENGTH ? null : (
								<Label
									className="text-xs text-muted-foreground"
									onClick={handleSubmit}
								>
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

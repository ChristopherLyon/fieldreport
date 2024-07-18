import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function GenerateReportComponent() {
	const router = useRouter();
	const today = new Date();
	const [fromDate, setFromDate] = useState<Date | undefined>(today);
	const [toDate, setToDate] = useState<Date | undefined>(today);
	const [prompt, setPrompt] = useState<string>("");
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleGenerateReport = async () => {
		if (!fromDate || !toDate) {
			toast.error("Please select a date range");
			return;
		}

		toast.loading("Generating report...");
		setDialogOpen(false);

		const response = await fetch("/api/generate-report", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: format(fromDate, "yyyy-MM-dd"),
				to: format(toDate, "yyyy-MM-dd"),
				prompt,
			}),
		});

		if (response.ok) {
			toast.dismiss();
			toast.success("Report generated successfully", {
				action: {
					label: "View",
					onClick: () => router.push("/reports"),
				},
			});
		} else {
			toast.dismiss();
			toast.error("Failed to generate report");
		}
	};

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button>Generate Report</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-left">Generate Report</DialogTitle>
					<DialogDescription className="text-left">
						Select a date range and add any custom instructions.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Label htmlFor="last-week">Quick Select</Label>
					<div className="flex gap-2">
						<Button
							onClick={() => {
								setFromDate(
									new Date(
										today.getFullYear(),
										today.getMonth(),
										today.getDate() - 7,
									),
								);
								setToDate(today);
							}}
							variant={"secondary"}
							size={"sm"}
						>
							Last Week
						</Button>
						<Button
							onClick={() => {
								setFromDate(
									new Date(
										today.getFullYear(),
										today.getMonth() - 1,
										today.getDate(),
									),
								);
								setToDate(today);
							}}
							variant={"secondary"}
							size={"sm"}
						>
							Last Month
						</Button>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="from-date">From Date</Label>
							<Popover modal={true}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-start font-normal"
									>
										<CalendarDays className="mr-2 h-4 w-4" />
										{fromDate?.toDateString() === new Date().toDateString()
											? "Today"
											: fromDate?.toDateString()}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={fromDate}
										onSelect={setFromDate}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="space-y-2">
							<Label htmlFor="to-date">To Date</Label>
							<Popover modal={true}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-start font-normal"
									>
										<CalendarDays className="mr-2 h-4 w-4" />

										{toDate?.toDateString() === new Date().toDateString()
											? "Today"
											: /* Else diaply the date that has been selected by passing in the toDate varibale in a human readable format*/
												toDate?.toDateString()}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={toDate}
										onSelect={setToDate}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="instructions">Custom Instructions</Label>
						<Textarea
							id="instructions"
							placeholder="Enter any additional instructions..."
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
					<Button onClick={handleGenerateReport} className="font-normal">
						Generate
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

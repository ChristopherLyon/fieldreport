"use client";
// This component renders a 24 May 2024 12:00:00:000 format clock at 1 second intervals
// Libraries
import { useEffect, useState } from "react";

export default function RealtimeClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Define the locale and options for formatting the date
	const locale = "en-GB"; // This matches the date format "28/05/2024, 17:52:52"
	const options = {
		year: "numeric" as const,
		month: "2-digit" as const,
		day: "2-digit" as const,
		hour: "2-digit" as const,
		minute: "2-digit" as const,
		second: "2-digit" as const,
		hour12: false,
	};

	return (
		<time
			// mono font
			className="font-mono text-xs text-muted-foreground"
			dateTime={time.toISOString()}
		>
			{time.toLocaleString(locale, options)}
		</time>
	);
}

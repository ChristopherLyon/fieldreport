"use client";

import { useEffect, useState } from "react";

export default function RealtimeClock() {
	const [time, setTime] = useState(new Date());

	if (typeof window === "undefined") return null;

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

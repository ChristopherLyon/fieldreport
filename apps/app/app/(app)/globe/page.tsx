import type * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { GlobePage } from "@/components/globe-page";
import { api } from "@fr/trpc/clients/server";

export default async function Page() {
	const streams = await api.streams.getStreams({});

	if (streams.error) {
		return <div>Error: {streams.error}</div>;
	}

	// this only happens if we specify a particular stream
	if (!streams.streams) {
		return null;
	}

	return <GlobePage streams={streams.streams} />;
}

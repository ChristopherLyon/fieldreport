import type * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { GlobePage } from "@/components/globe-page";
import { api } from "@fr/trpc/clients/server";

export default async function Page() {
	const streams = await api.streams.getStreams();
	return <GlobePage streams={streams.streams} />;
}

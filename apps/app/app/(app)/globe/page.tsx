"use client";
import type { IStream } from "@/types/types";
import type * as React from "react";
import Map, { type MapRef, Marker } from "react-map-gl";
import useSWR from "swr";
import "mapbox-gl/dist/mapbox-gl.css";
import { PersonStanding } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SWRError {
	message: string;
}

export default function Page() {
	const {
		data: streams,
		error,
		isLoading,
	} = useSWR<IStream[], SWRError>("/api/streams", fetcher, {
		refreshInterval: 5000,
	});
	const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
	const [localStreams, setLocalStreams] = useState<IStream[]>([]);

	const mapRef = useRef<MapRef | null>(null);
	const theme = useTheme();

	useEffect(() => {
		if (streams) {
			setLocalStreams(streams);
		}
	}, [streams]);

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

	if (error) return <div>Error loading streams.</div>;
	if (isLoading && localStreams.length === 0)
		return <div>Loading streams...</div>;

	return (
		<main className="h-full border border-dashed rounded-lg overflow-hidden">
			<Map
				ref={mapRef as React.RefObject<MapRef>}
				mapLib={import("mapbox-gl")}
				attributionControl={false}
				logoPosition="bottom-right"
				initialViewState={{ longitude: 5.74, latitude: 58.84, zoom: 2 }}
				mapStyle={
					theme.theme === "light"
						? "mapbox://styles/mapbox/standard"
						: "mapbox://styles/christopherlyon/clws0irjp015y01ny6vaacinw"
				}
				mapboxAccessToken={
					"pk.eyJ1IjoiY2hyaXN0b3BoZXJseW9uIiwiYSI6ImNrZXh0Z3dvazA0dWcydG84eGZudDNiZ3EifQ.o4v1FsSerU9M9tbF_lVaiw"
				}
			>
				{location && (
					<Marker longitude={location.longitude} latitude={location.latitude}>
						<PersonStanding />
					</Marker>
				)}

				{localStreams.map(
					(stream) =>
						stream.location?.coordinates && (
							<Marker
								key={stream._id.toString()}
								longitude={stream.location.coordinates[0]}
								latitude={stream.location.coordinates[1]}
							>
								<div className="relative flex items-center justify-center w-5 h-5 border border-foreground rounded-full bg-background">
									<div className="w-1.5 h-1.5 bg-foreground"></div>
								</div>
							</Marker>
						),
				)}
			</Map>
		</main>
	);
}

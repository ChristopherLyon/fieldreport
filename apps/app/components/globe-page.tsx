"use client";

import type { IStream } from "@fr/trpc/types";
import { PersonStanding } from "lucide-react";
import { useTheme } from "next-themes";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import Map, { type MapRef, Marker } from "react-map-gl";

export const GlobePage = ({ streams }: { streams: IStream[] }) => {
	const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
	const [localStreams, setLocalStreams] = useState<IStream[]>(streams);

	useEffect(() => {
		if (streams) {
			setLocalStreams(streams);
		}
	}, [streams]);

	const mapRef = useRef<MapRef | null>(null);
	const theme = useTheme();

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

	return (
		<main className="h-full border border-dashed rounded-lg overflow-hidden">
			<Map
				ref={mapRef as React.RefObject<MapRef>}
				// @ts-ignore
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
									<div className="w-1.5 h-1.5 bg-foreground" />
								</div>
							</Marker>
						),
				)}
			</Map>
		</main>
	);
};

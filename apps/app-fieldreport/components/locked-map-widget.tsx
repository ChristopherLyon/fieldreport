"use client";

// Libraries
import type * as React from "react";
import Map, { type MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function LockedMapWidget() {
	// State
	const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

	const mapRef = useRef<MapRef | null>(null);
	const theme = useTheme();

	useEffect(() => {
		// Request high accuracy location
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
		<main className="h-full border rounded-lg overflow-hidden bg-muted">
			{location ? (
				<Map
					ref={mapRef as React.RefObject<MapRef>}
					mapLib={import("mapbox-gl")}
					attributionControl={false}
					logoPosition="bottom-right"
					initialViewState={{
						longitude: location.longitude,
						latitude: location.latitude,
						zoom: 10,
					}}
					mapStyle={
						theme.theme == "light"
							? "mapbox://styles/mapbox/light-v10"
							: "mapbox://styles/mapbox/dark-v10"
					}
					mapboxAccessToken={
						"pk.eyJ1IjoiY2hyaXN0b3BoZXJseW9uIiwiYSI6ImNrZXh0Z3dvazA0dWcydG84eGZudDNiZ3EifQ.o4v1FsSerU9M9tbF_lVaiw"
					}
				>
					{location ? (
						<Marker longitude={location.longitude} latitude={location.latitude}>
							<div className="relative flex items-center justify-center">
								<div className="absolute w-2 h-2 bg-blue-500 rounded-full"></div>
								<div className="w-6 h-6 border border-foreground rounded-full"></div>
							</div>
						</Marker>
					) : null}
				</Map>
			) : (
				<div className="flex items-center justify-center h-full">
					<div className="flex flex-row items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
						<div className="text-xs font-medium animate-pulse">
							Fetching location...
						</div>
					</div>
				</div>
			)}
		</main>
	);
}

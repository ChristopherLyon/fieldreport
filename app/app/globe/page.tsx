"use client"

// Types
import { IStream } from "@/types/types";

// Libraries
import * as React from 'react';
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from 'react';
import { useTheme } from "next-themes";

export default function Page() {

    // State
    const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
    const [streams, setStreams] = useState<IStream[]>([]);

    const mapRef = useRef<MapRef | null>(null);
    const theme = useTheme();

    useEffect(() => {
        // Request high accuracy location
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position.coords);
        }, (error) => {
            console.error(error);
        }, {
            enableHighAccuracy: true
        });
    }, []);

    useEffect(() => {
        const fetchStreams = () => {
            fetch("/api/backend/streams")
                .then((res) => res.json())
                .then((data) => {
                    setStreams(data);
                });
        };

        fetchStreams();
        const interval = setInterval(() => {
            fetchStreams();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="h-full border border-dashed rounded-lg overflow-hidden">
            <Map
                ref={mapRef as React.RefObject<MapRef>}
                mapLib={import('mapbox-gl')}
                attributionControl={false}
                logoPosition='bottom-right'
                projection={"globe" as any}
                initialViewState={{ longitude: 5.74, latitude: 58.84, zoom: 2 }}
                mapStyle={theme.theme === "light" ? "mapbox://styles/mapbox/standard" : "mapbox://styles/christopherlyon/clws0irjp015y01ny6vaacinw"}
                mapboxAccessToken={"pk.eyJ1IjoiY2hyaXN0b3BoZXJseW9uIiwiYSI6ImNrZXh0Z3dvazA0dWcydG84eGZudDNiZ3EifQ.o4v1FsSerU9M9tbF_lVaiw"}>

                {location &&
                    <Marker longitude={location.longitude} latitude={location.latitude}>
                        <div className='border p-2 rounded-full dark:bg-black bg-black dark:bg-opacity-10 dark:border-white border-black bg-opacity-10 backdrop-blur-sm'>
                        </div>
                    </Marker>
                }

                {streams.map((stream) => (
                    stream.location?.coordinates && (
                        <Marker key={stream._id.toString()} longitude={stream.location.coordinates[0]} latitude={stream.location.coordinates[1]}>
                            <div className="w-2 h-2 bg-blue-500 rounded-full">
                            </div>
                        </Marker>
                    )
                ))}
            </Map>
        </main>
    )
}

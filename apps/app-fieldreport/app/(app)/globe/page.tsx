"use client";
import useSWR from 'swr';
import { IStream } from "@/types/types";
import * as React from 'react';
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { PersonStanding } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Page() {
    const { data: streams, error, isLoading, mutate } = useSWR<IStream[]>('/api/streams', fetcher, {
        refreshInterval: 5000
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
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position.coords);
        }, (error) => {
            console.error(error);
        }, {
            enableHighAccuracy: true
        });
    }, []);

    if (error) return <div>Error loading streams.</div>;
    if (isLoading && localStreams.length === 0) return <div>Loading streams...</div>;

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
                        <PersonStanding />
                    </Marker>
                }

                {localStreams.map((stream) => (
                    stream.location?.coordinates && (
                        <Marker key={stream._id.toString()} longitude={stream.location.coordinates[0]} latitude={stream.location.coordinates[1]}>
                            <div className='relative flex items-center justify-center w-5 h-5 border border-foreground rounded-full bg-background'>
                                <div className='w-1.5 h-1.5 bg-foreground'></div>
                            </div>
                        </Marker>
                    )
                ))}
            </Map>
        </main>
    );
}

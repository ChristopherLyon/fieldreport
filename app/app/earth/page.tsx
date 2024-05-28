"use client"
import * as React from 'react';
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from 'react';
import { useTheme } from "next-themes"


export default function Page() {
    // Get users location
    const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
    const mapRef = useRef<MapRef | null>(null);
    const theme = useTheme();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position.coords);
        });
    }, []);

    return (
        <Map
            ref={mapRef as React.RefObject<MapRef>}
            mapLib={import('mapbox-gl')}
            attributionControl={false}
            
            logoPosition='bottom-right'
            //@ts-ignore
            projection="globe"
            {...(theme.theme == "light" ? {
                fog: {
                    range: [0.8, 8],
                }
            } : {})
            }
            initialViewState={{
                longitude: 5.74,
                latitude: 58.84,
                zoom: 2
            }}
            logoEnabled={false}
            mapStyle={
                // If theme is light, use the light map style, else use the dark map style
                theme.theme == "light" ? "mapbox://styles/mapbox/light-v10" : "mapbox://styles/mapbox/dark-v10"
            }
            mapboxAccessToken={
                "pk.eyJ1IjoiY2hyaXN0b3BoZXJseW9uIiwiYSI6ImNrZXh0Z3dvazA0dWcydG84eGZudDNiZ3EifQ.o4v1FsSerU9M9tbF_lVaiw"
            }

        >
            {/* Place a marker at the users location */}
            {location ? <Marker
                longitude={location.longitude}
                latitude={location.latitude}
            >
                <div className='border p-2 rounded-full dark:bg-black bg-black dark:bg-opacity-10 dark:border-white border-black bg-opacity-10 backdrop-blur-sm'>
                </div>
            </Marker> : null}
        </Map>
    )
}
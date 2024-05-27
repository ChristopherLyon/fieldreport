

// Take in a video URL to a local /videos/ directory and a title, render the title over the video

import { AudioLines } from "lucide-react";

export default function VideoAndTitleBlock({ videoUrl, title } : { videoUrl: string, title: string }) {
    return (
        <div className="relative h-screen overflow-hidden font-raleway">
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disableRemotePlayback
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative flex items-center justify-center h-full z-10 px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <h1 className="text-6xl tracking-tight text-gray-100 sm:text-6xl font-raleway">
                        {title}
                    </h1>
                </div>
            </div>
            <AudioLines className="h-10 w-auto absolute bottom-10 right-10" />
        </div>
    );
}

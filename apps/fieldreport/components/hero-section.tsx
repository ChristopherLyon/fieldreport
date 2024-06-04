"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderImage from '@/public/images/hero-section-placeholder.png';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="relative h-screen overflow-hidden font-raleway">
            {/* Placeholder Image */}
            <Image
                src={placeholderImage}
                alt="Placeholder Image"
                layout="fill"
                objectFit="cover"
                priority={true}
                placeholder="blur"
                blurDataURL="/images/hero-section-placeholder.png"
                className="absolute top-0 left-0 w-full h-full z-0"
                quality={100}
            />

            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disableRemotePlayback
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="videos/glass.mov" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative flex items-center justify-center h-full z-10 px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    
                    <h1 className="text-6xl tracking-tight text-gray-100 sm:text-6xl font-raleway">
                        Turbocharge Your Field Reporting with AI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200 font-raleway">
                        FieldReport is <strong>the</strong> platform to help you streamline your on-the-go critical reporting - using AI to extract insights from your operations and field technicians.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                        <Link href="https://app.fieldreport.ai/auth/signin">
                            <Button className="w-auto bg-white text-black hover:bg-gray-300 hover:text-black">
                                Start for Free!
                            </Button>
                        </Link>
        
                    </div>
                </div>
            </div>
        </div>
    );
}

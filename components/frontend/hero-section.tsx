"use client";
import Image from 'next/image';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import placeholderImage from '@/public/images/hero-section-placeholder.png';

export default function HeroSection() {
    return (
        <div className="relative h-screen overflow-hidden">
            {/* Placeholder Image */}
            <Image
                src={placeholderImage}
                alt="Placeholder Image"
                layout="fill"
                objectFit="cover"
                priority
                className="absolute top-0 left-0 w-full h-full z-0"
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
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-100/10 hover:ring-gray-200/20">
                            We are just kicking off FieldReport.{' '}
                            <a href="#" className="font-semibold">
                                <span className="absolute inset-0" aria-hidden="true" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
                        Turbocharge Your Field Reporting with AI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        Seamless integration of smartwatch technology and AI-driven insights to enhance productivity and decision-making in real time.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                        <Button
                            className="w-auto bg-white text-black hover:bg-gray-300 hover:text-black"
                            onClick={() => signIn("google", { callbackUrl: "/app" })}
                        >
                            Get started
                        </Button>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-100">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

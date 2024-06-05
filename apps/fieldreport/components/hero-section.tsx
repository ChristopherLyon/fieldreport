'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderImage from '@/public/images/hero-section-placeholder.png';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden font-raleway">
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
        <source src="videos/glass.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative flex items-center justify-center h-full z-10 px-6 pt-14 lg:px-8">
        <div className="ml-auto sm:mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-left sm:text-center">
          <h1 className="text-6xl tracking-tight text-gray-100 sm:text-6xl font-raleway">
            Turbocharge Your Reporting with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 font-raleway">
            FieldReport is <strong>the</strong> platform to help you streamline
            your on-the-go critical reporting - using AI to extract insights
            from your operations and field technicians.
          </p>
         
        </div>
      </div>
    </div>
  );
}

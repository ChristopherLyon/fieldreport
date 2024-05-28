"use client";
import { Earth, FileStack, Mic, Network, Podcast } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

const industries = [
/*     {
        name: 'Offshore',
        description: 'Streamline maintenance reporting and facilitate proactive actions, even in remote locations.',
        userStory: 'An offshore technician uses the FieldReport app to quickly log a maintenance request with a few spoken words. The AI processes the report, creating a structured report and sending it to the maintenance system, which analyzes the data to forecast potential failures. This streamlined reporting process enhances efficiency and reliability in remote locations.',
        src: '/images/offshore.jpg',
    },
    {
        name: 'Energy',
        description: 'Optimize field operations and ensure regulatory compliance.',
        userStory: 'An energy field technician uses voice-to-text to document an equipment inspection. The AI processes the data, generating a compliance report that the management team reviews to ensure all regulations are met.',
        src: '/images/offshore.jpg',

    }, */
    {
        name: 'Agriculture',
        description: 'Monitor environmental conditions and manage field activities.',
        userStory: 'A farmer uses the FieldReport app to record soil moisture levels by speaking into their smartwatch. The AI converts the input into a detailed report, providing actionable insights into irrigation needs. The system categorizes the data, summarizes key points, and suggests optimal irrigation schedules, helping farmers make informed decisions quickly and efficiently.',
        src: '/images/agriculture.jpg',
    },
    {
        name: 'Telecommunications',
        description: 'Improve network performance and reduce maintenance costs.',
        userStory: 'A telecom climber, equipped with heavy gear, uses their smartwatch to report rust and missing bolts on a cell tower with a single button press. The AI instantly processes the report, generates a maintenance schedule, and informs the safety compliance team. The system compiles weekly reports of multiple towers needing attention, streamlining maintenance and enhancing network reliability and safety.',
        src: '/images/telecom.jpeg',
    }
];


export default function IndustryGallery() {
    return (
        <section className="p-4" id="industries" aria-label="Industries">
            <span className="text-4xl">
                Key Industries
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 my-24">
                {industries.map(industry => (
                    <div key={industry.name} className="flex flex-col">
                        <Image
                            src={industry.src}
                            alt="Agriculture"
                            width={1920}
                            height={1080}
                            className="h-80 w-full object-cover"
                        />
                        <h1 className="text-2xl mt-4 mb-4">
                            {industry.name}
                        </h1>
                        <p className="text-sm mb-1">
                            {industry.description}
                        </p>
                        <p className="text-sm opacity-60">
                            {industry.userStory}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

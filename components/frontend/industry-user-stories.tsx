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
    {
        name: 'Offshore',
        description: 'Predict equipment failures and prevent downtime, even in remote locations.',
        userStory: 'An offshore technician uses the FieldReport app to log a maintenance request. The data is analyzed to predict equipment failures, allowing the team to take proactive action and prevent downtime.',
        icon: Network,
        src: '/images/offshore.jpg',
    },
    {
        name: 'Agriculture',
        description: 'Monitor environmental conditions and manage field activities.',
        userStory: 'A farmer logs soil moisture levels using the FieldReport app. The data is analyzed to provide insights into irrigation needs, helping to optimize water usage and improve crop yields.',
        icon: Mic,
        src: '/images/agriculture.jpg',
    },
    /*   {
        name: 'Logistics',
        description: 'Improve asset tracking and operational efficiency.',
        userStory: 'A logistics coordinator tags shipments with geolocation data using the FieldReport app. The onshore team tracks the shipments in real-time, optimizing routes and reducing delivery times.',
        icon: FileStack,
    },
    {
        name: 'Construction',
        description: 'Enhance site management and safety compliance.',
        userStory: 'A construction site manager uses their smartwatch to log a safety violation. The report is instantly available to the safety compliance team, who can take action and ensure the site meets regulatory standards.',
        icon: Earth,
    },
      {
          name: 'Energy',
          description: 'Optimize field operations and ensure regulatory compliance.',
          userStory: 'An energy field technician uses voice-to-text to document an equipment inspection. The AI processes the data, generating a compliance report that the management team reviews to ensure all regulations are met.',
          icon: Podcast,
      },
      */
];

export default function IndustryGallery() {
    return (
        <div className="p-4">
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
        </div>
    );
}

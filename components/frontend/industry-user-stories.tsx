"use client";
import { Earth, FileStack, Mic, Network, Podcast } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const industries = [
    {
        name: 'Manufacturing',
        description: 'Streamline maintenance and reporting processes.',
        userStory: 'A maintenance worker uses the FieldReport app to report a malfunction in a machine. The onshore team receives the report in real-time and schedules an immediate repair, preventing downtime.',
        icon: Network,
    },
    {
        name: 'Construction',
        description: 'Enhance site management and safety compliance.',
        userStory: 'A construction site manager uses their smartwatch to log a safety violation. The report is instantly available to the safety compliance team, who can take action and ensure the site meets regulatory standards.',
        icon: Earth,
    },
    {
        name: 'Logistics',
        description: 'Improve asset tracking and operational efficiency.',
        userStory: 'A logistics coordinator tags shipments with geolocation data using the FieldReport app. The onshore team tracks the shipments in real-time, optimizing routes and reducing delivery times.',
        icon: FileStack,
    },
    {
        name: 'Energy',
        description: 'Optimize field operations and ensure regulatory compliance.',
        userStory: 'An energy field technician uses voice-to-text to document an equipment inspection. The AI processes the data, generating a compliance report that the management team reviews to ensure all regulations are met.',
        icon: Podcast,
    },
    {
        name: 'Agriculture',
        description: 'Monitor environmental conditions and manage field activities.',
        userStory: 'A farmer logs soil moisture levels using the FieldReport app. The data is analyzed to provide insights into irrigation needs, helping to optimize water usage and improve crop yields.',
        icon: Mic,
    },
];

export default function IndustryGallery() {
    return (
        <section className="py-28 font-raleway">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl text-center mb-24">Industry User Stories</h2>
                <div className="flex overflow-x-auto space-x-8 py-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-100">
                    {industries.map(industry => (
                        <Card className="flex-shrink-0 w-80 text-white rounded-lg shadow-md" key={industry.name}>
                            <CardHeader className="flex flex-row items-start bg-muted/50 p-4">
                                <industry.icon className="w-8 h-8" />
                                <div className="ml-4">
                                    <CardTitle className="text-lg font-semibold">
                                        {industry.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {industry.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 text-sm">
                                <div>{industry.userStory}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

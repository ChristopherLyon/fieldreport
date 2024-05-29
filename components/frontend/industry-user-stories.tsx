"use client";
import Image from 'next/image';
import Agriculture from '@/public//images/agriculture.jpg';
import Telecom from '@/public//images/telecom.jpeg';


const industries = [
    {
        name: 'Agriculture',
        description: 'Monitor environmental conditions and manage field activities.',
        userStory: 'A farmer uses the FieldReport app to record soil moisture levels by speaking into their smartwatch. The AI converts the input into a detailed report, providing actionable insights into irrigation needs. The system categorizes the data, summarizes key points, and suggests optimal irrigation schedules, helping farmers make informed decisions quickly and efficiently.',
        src: Agriculture,
    },
    {
        name: 'Telecommunications',
        description: 'Improve network performance and reduce maintenance costs.',
        userStory: 'A telecom climber, equipped with heavy gear, uses their smartwatch to report rust and missing bolts on a cell tower with a single button press. The AI instantly processes the report, generates a maintenance schedule, and informs the safety compliance team. The system compiles weekly reports of multiple towers needing attention, streamlining maintenance and enhancing network reliability and safety.',
        src: Telecom,
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
                        <Image src={industry.src} alt="Agriculture" width={1920} height={1080}
                            placeholder="blur"
                            className="h-80 w-full object-cover" />
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

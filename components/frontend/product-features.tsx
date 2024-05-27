import { Earth, FileStack, Mic, Network, Podcast } from "lucide-react"


const features = [
    {
        name: 'Voice-to-Text Report Taking',
        description:
            'Allows field workers to record thoughts or events hands-free through smartwatch integration, ensuring seamless and efficient data capture without interrupting their work - in any environment',
        icon: Podcast,
    },
    {
        name: 'Real-Time AI Processing',
        description:
            'Automatically processes and summarizes extensive field data into actionable reports, saving time and enhancing decision-making with precise insights.',
        icon: FileStack,
    },
    {
        name: 'Hierarchical Reporting',
        description:
            'Generates reports that respect organizational structure, ensuring information reaches relevant managerial levels efficiently and accurately.',
        icon: Network,
    },
    {
        name: 'Geolocation Features',
        description:
            'Enables tagging of notes with location data for enhanced tracking and analytics, providing valuable context for field activities.',
        icon: Earth,
    },
]

export default function ProductFeatures() {
    return (
        <div className="py-24 sm:py-48">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-24 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <h2 className="text-3xl sm:text-4xl">
                        Enhance Your Field Operations with Advanced AI Features.
                    </h2>
                    <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.name}>
                                <dt className="text-2xl leading-7 pb-2">
                                    <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-sm outline outline-foreground outline-1 bg-muted">
                                        <feature.icon className="h-4 w-4" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 text-base leading-7">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

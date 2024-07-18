import { Check } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type Tier = {
	name: string;
	id: string;
	href: string;
	priceMonthly: string;
	description: string;
	features: string[];
	mostPopular: boolean;
	active?: boolean;
	buttonText?: string;
	buttonHref: string;
};

const tiers: Tier[] = [
	{
		name: "Personal",
		id: "tier-personal",
		href: "#",
		priceMonthly: "$19.99",
		description:
			"Ideal for individuals looking to enhance productivity with AI-driven tools.",
		mostPopular: true,
		features: [
			"AI Voice-to-Text for Meeting Notes",
			"Automatic Task Provisioning",
			"Curated Learning Articles",
			"Progress Summarization",
		],
		active: true,
		buttonText: "Get started",
		buttonHref: "https://app.fieldreport.ai/auth/signin",
	},
	{
		name: "Enterprise",
		id: "tier-enterprise",
		href: "#",
		priceMonthly: "$49.99",
		description:
			"Comprehensive solution for teams with advanced features like geotagging and hierarchical reporting.",
		mostPopular: false,
		features: [
			"AI Voice-to-Text for Meeting Notes",
			"Automatic Task Provisioning",
			"Curated Learning Articles",
			"Progress Summarization",
			"Geolocation Tagging",
			"Hierarchical Reporting",
			"Team Members: Up to 20 users",
		],
		active: false,
		buttonText: "Comming soon",
		buttonHref: "https://app.fieldreport.ai/auth/signin",
	},
];

export default function Pricing() {
	return (
		<div className="isolate overflow-hidden font-raleway relative">
			<video
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				disableRemotePlayback
				className="absolute top-0 left-0 w-full h-1/2 object-cover z-10"
			>
				<source src="videos/gradient.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-bg-background z-20"></div>
			<div className="relative mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8 z-30">
				<div className="mx-auto max-w-4xl">
					<h2 className="text-base leading-7 text-white">Pricing</h2>
					<p className="mt-2 text-4xl tracking-tight text-white sm:text-5xl">
						The right price for you,{" "}
						<br className="hidden sm:inline lg:hidden" />
						whoever you are
					</p>
				</div>
				<div className="relative mt-6">
					<p className="mx-auto max-w-2xl text-lg leading-8 text-white">
						Enhance productivity and streamline operations with our AI-driven
						solutions. Choose the plan that fits your needs.
					</p>
				</div>
			</div>
			<div className="flow-root bg-background pb-24 sm:pb-16 relative z-30">
				<div className="-mt-80">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
							{tiers.map((tier) => (
								<div
									key={tier.id}
									className="flex flex-col justify-between rounded-3xl bg-background p-8 shadow-xl ring-1 ring-muted sm:p-10"
								>
									<div>
										<h3
											id={tier.id}
											className="text-base leading-7 text-white-600"
										>
											{tier.name}
										</h3>
										<div className="mt-4 flex items-baseline gap-x-2">
											<span className="text-5xl tracking-tight text-foreground">
												{tier.priceMonthly}
											</span>
											<span className="text-base leading-7 text-foreground/90">
												/month
											</span>
										</div>
										<p className="mt-6 text-base leading-7 text-foreground/80">
											{tier.description}
										</p>
										<ul
											role="list"
											className="mt-10 space-y-4 text-sm leading-6 text-foreground/80"
										>
											{tier.features.map((feature) => (
												<li key={feature} className="flex gap-x-3">
													<Check
														className="h-6 w-5 flex-none text-foreground"
														aria-hidden="true"
													/>
													{feature}
												</li>
											))}
										</ul>
									</div>
									<Link href={tier.buttonHref}>
										<Button
											className="mt-10"
											aria-describedby={tier.id}
											disabled={!tier.active}
										>
											{tier.buttonText}
										</Button>
									</Link>
								</div>
							))}
							<div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-muted sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
								<div className="lg:min-w-0 lg:flex-1">
									<h3 className="text-lg leading-8 tracking-tight text-foregroud">
										Discounted
									</h3>
									<p className="mt-1 text-sm leading-7 text-foreground/80">
										Get a discounted license for your team. Ideal for teams of
										20 or more.
									</p>
								</div>
								<Button>
									Buy discounted license <span aria-hidden="true">&rarr;</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

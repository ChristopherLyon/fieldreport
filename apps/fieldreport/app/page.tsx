"use client";
import AIChatbot from "@/components/ai-chatbot";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import { LoginFloater } from "@/components/login-floater";
import OurMission from "@/components/our-mission";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppleWatchMockup from "@/public/images/apple-watch.png";
import IpadMockup from "@/public/images/ipad-mockup.jpeg";
import MacbookMockup from "@/public/images/macbook-mockup-cropped.png";
import { CornerRightDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Pricing from "@/components/pricing";
import VideoAndTitleBlock from "@/components/video-and-title-block"; // Ensure this is the correct import path

export default function Home() {
	const [customerType, setCustomerType] = useState("personal");

	return (
		<main className="h-full font-raleway bg-background transition-all">
			<Header />
			<LoginFloater />
			<AIChatbot mode={customerType} setMode={setCustomerType} />
			<HeroSection />
			<div className="max-w-5xl mx-auto px-4">
				<div className="border-x border-dashed border-muted flex flex-col gap-24 py-24 overflow-hidden">
					<div className="px-6">
						<OurMission />
					</div>
					<div className="flex flex-col gap-3 pl-6 items-start">
						<span className="text-xs font-mono text-foreground/80">
							Tailor your experience{" "}
							<CornerRightDown
								className={`inline ${
									customerType === "personal"
										? "text-cyan-500"
										: "text-yellow-500"
								} h-3 w-3`}
							/>
						</span>
						<Tabs
							defaultValue="personal"
							className="w-[400px]"
							onValueChange={setCustomerType}
							value={customerType}
						>
							<TabsList>
								<TabsTrigger value="personal">Personal</TabsTrigger>
								<TabsTrigger value="enterprise">Enterprise</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-24 mx-auto">
						<div className="flex flex-col gap-3">
							<span
								className={`px-6 font-semibold
                ${
									customerType === "personal"
										? "text-cyan-500"
										: "text-yellow-500"
								}`}
							>
								What we solve
							</span>
							<h1
								className={`text-5xl max-w-xl border-l  px-6
              ${
								customerType === "personal"
									? "border-cyan-500"
									: "border-yellow-500"
							}`}
							>
								Nothing slips through the cracks.
							</h1>
							<h2 className="max-w-xl text-foreground/90 px-6">
								{customerType === "personal"
									? "We remove any excuses for not gathering critical information about your life. As long as you can think it, FieldReport can handle it. We make sure to boil up all the critical information effortlessly with AI."
									: "We remove any excuses for not gathering critical information about your operations. As long as you can think it, FieldReport can handle it. We make sure to boil up all the critical information effortlessly with AI."}
							</h2>
						</div>
					</div>

					{/* Right alinged Macbook mockup photo */}
					<div className="ml-auto px-6 flex flex-col">
						<Image
							src={MacbookMockup}
							alt="Macbook Mockup"
							width={600}
							height={400}
							className="rounded-lg"
						/>
						<h3 className="ml-auto font-mono text-xs p-3 opacity-80">
							FieldReport Application on MacOS
						</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-24 mx-auto">
						<div className="flex flex-col gap-3">
							<span
								className={`px-6 font-semibold
              ${
								customerType === "personal"
									? "text-cyan-500"
									: "text-yellow-500"
							}`}
							>
								How we solve it
							</span>
							<h1
								className={`text-5xl max-w-xl border-l  px-6
              ${
								customerType === "personal"
									? "border-cyan-500"
									: "border-yellow-500"
							}`}
							>
								We make it ridiculously easy to collect data.
							</h1>
							<h2 className="max-w-xl text-foreground/90 px-6">
								{customerType === "personal"
									? "You can download or access FieldReport from any device, even your smartwatch... When the ability to log your thoughts is always at your fingertips, you can focus on what matters most."
									: "You can download or access FieldReport from any device, even your smartwatch... When the ability to log your thoughts is always at your fingertips, even when you are in the field or on the go, you can focus on what matters most, the job at hand."}
							</h2>
						</div>
					</div>
					{/* Right alinged Macbook mockup photo */}
					<div className="ml-auto px-6 flex flex-col">
						<Image
							src={AppleWatchMockup}
							alt="Apple Watch Mockup"
							width={600}
							height={400}
							className="rounded-lg"
						/>
						<h3 className="ml-auto font-mono text-xs p-3 opacity-80">
							FieldReport Smart Watch Application (Coming Soon)
						</h3>
					</div>
				</div>
				<div className="py-12 border-x border-dashed">
					<div className="w-full grid grid-cols-1 md:grid-cols-3">
						<div className="border-y md:border-r border-dashed flex flex-col items-center justify-center h-64">
							<h1 className="font-bold text-4xl">5 seconds</h1>
							<h2 className="">
								to log any
								<span
									className={`${
										customerType === "personal"
											? "text-cyan-500"
											: "text-yellow-500"
									}`}
								>
									{" "}
									thought.
								</span>
							</h2>
						</div>
						<div className="border-y md:border-r border-t-0 md:border-t border-dashed flex flex-col items-center justify-center h-64">
							<h1 className="font-bold text-4xl">10 seconds</h1>
							<h2 className="">
								to generate any{" "}
								<span
									className={`${
										customerType === "personal"
											? "text-cyan-500"
											: "text-yellow-500"
									}`}
								>
									report.
								</span>
							</h2>
						</div>
						<div className="border-y border-t-0 md:border-t border-dashed flex flex-col items-center justify-center h-64">
							<h1 className="font-bold text-4xl">10 seconds</h1>
							<h2 className="">
								to share with your{" "}
								<span
									className={`${
										customerType === "personal"
											? "text-cyan-500"
											: "text-yellow-500"
									}`}
								>
									team.
								</span>
							</h2>
						</div>
					</div>
				</div>
				{/* <VideoAndTitleBlock
          key={customerType} // Add key to force re-render on prop change
          videoUrl={
            customerType === "personal"
              ? "/videos/office.mp4"
              : "/videos/solar-farm.mov"
          }
          title={
            customerType === "personal"
              ? "Your life, organized."
              : "Your operations, simplified."
          }
          focus={customerType === "personal" ? "left" : "middle"}
        /> */}
				<Pricing
					customerType={customerType}
					setCustomerType={setCustomerType}
				/>
				<Footer />
			</div>
		</main>
	);
}

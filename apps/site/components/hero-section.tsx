"use client";
import { Button } from "@/components/ui/button";
import placeholderImage from "@/public/images/hero-section-placeholder.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Gradient } from "@/lib/Gradient";
import { ArrowDown, AudioLines } from "lucide-react";
import { Input } from "./ui/input";

const GradientCanvas = () => {
	useEffect(() => {
		const gradient = new Gradient();
		gradient.initGradient("#gradient-canvas");
	}, []);

	return (
		<canvas id="gradient-canvas" className="w-full h-full" data-transition-in />
	);
};

export default function HeroSection() {
	return (
		<div className="relative h-screen overflow-hidden  bg-cyan-900">
			{/*       <AudioLines className="absolute bottom-10 right-10 w-10 h-10 z-20" />
			 */}{" "}
			<div className="absolute top-0 left-0 h-screen w-full z-10">
				<GradientCanvas />
			</div>
			<div className="relative flex items-center justify-center h-full px-6 pt-14 lg:px-8 z-10">
				<div className="ml-auto sm:mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-left sm:text-center flex flex-col gap-5 md:gap-10">
					<h1 className="text-6xl tracking-tight text-white sm:text-7xl ">
						Turbocharge Your Reporting with AI
					</h1>
					<p className="text-xl leading-8 text-white ">
						The easiest path to exceptional reporting, either alone or with your
						team. FieldReport is the only tool you need to get the job done.
					</p>
					<ArrowDown className="hidden mx-auto h-8 w-8 z-50 text-white" />
					<Input
						className="hidden mx-auto w-96"
						autoFocus
						placeholder="Had some issues with..."
					/>
				</div>
			</div>
		</div>
	);
}

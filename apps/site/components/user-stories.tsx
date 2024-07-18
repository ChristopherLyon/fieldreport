"use client";
import { AudioLines } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

interface UserStory {
	name: string;
	description: string;
	src: StaticImageData;
	userStory: string;
}

export default function UserStories({
	sectionTitle,
	userStories,
}: { sectionTitle: string; userStories: UserStory[] }) {
	return (
		<div className="p-4 pt-16">
			<span className="text-4xl mx-auto">{sectionTitle}</span>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-24">
				{userStories.map((story) => (
					<div key={story.name} className="flex flex-col">
						<div className="relative">
							<Image
								src={story.src}
								alt={story.name}
								width={1920}
								height={1080}
								placeholder="blur"
								className="h-80 w-full object-cover"
							/>
							<AudioLines className="h-5 w-auto absolute top-3 right-3 " />
						</div>
						<h1 className="text-2xl mt-4 mb-4">{story.name}</h1>
						<p className="text-sm mb-1">{story.description}</p>
						<p className="text-sm opacity-60">{story.userStory}</p>
					</div>
				))}
			</div>
		</div>
	);
}

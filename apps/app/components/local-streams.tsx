"use client";

import type { IStream } from "@/types/types";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "@fr/trpc/clients/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddStreamColumn from "./add-stream-column";
import NoDataContextCard from "./no-data-context-card";
import StreamCard from "./stream-card";
import { Card } from "./ui/card";

export const LocalStreams = ({ initialData, userId, orgId }) => {
	const [localStreams, setLocalStreams] = useState<IStream[]>(initialData);
	const [streamAiProcessing, setStreamAiProcessing] = useState<boolean>(false);
	const organization = useOrganization();
	const router = useRouter();

	// when the org changes, refresh the page to get new data
	useEffect(() => {
		router.refresh();
	}, [organization.organization, router]);

	// when the initial data changes, set the local streams to the initial data
	useEffect(() => {
		setLocalStreams(initialData);
	}, [initialData]);

	return (
		<div className="flex flex-1 h-full gap-4">
			<div className="flex-1 h-full overflow-hidden flex flex-col relative">
				{localStreams.length === 0 && !streamAiProcessing ? (
					<NoDataContextCard
						title="No Streams"
						description="Create a new stream to get started."
					/>
				) : (
					<div className="flex-1 overflow-y-auto max-h-full relative">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
							{streamAiProcessing && (
								<Card className="h-64 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-background flex items-center justify-center">
									<div className="flex flex-row items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
										<div className="text-sm font-medium animate-pulse">
											Processing Stream
										</div>
									</div>
								</Card>
							)}
							{localStreams.map((stream) => (
								<StreamCard
									key={stream._id.toString()}
									stream={stream}
									setLocalStreams={setLocalStreams}
								/>
							))}
						</div>
					</div>
				)}
			</div>
			<AddStreamColumn
				setLocalStreams={setLocalStreams}
				setStreamAiProcessing={setStreamAiProcessing}
				userId={userId}
				orgId={orgId}
			/>
		</div>
	);
};

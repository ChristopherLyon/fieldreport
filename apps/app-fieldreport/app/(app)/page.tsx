"use client";
import useSWR from 'swr';
import { IStream } from "@/types/types";
import NoDataContextCard from "@/components/no-data-context-card";
import StreamCard from "@/components/stream-card";
import { Card } from "@/components/ui/card";
import AddStreamColumn from "@/components/add-stream-column";
import { useState, useEffect } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function App() {
  const { data: streams, error, isLoading, mutate } = useSWR<IStream[]>('/api/streams', fetcher, {
    refreshInterval: 5000
  });
  const [localStreams, setLocalStreams] = useState<IStream[]>([]);
  const [streamAiProcessing, setStreamAiProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (streams) {
      setLocalStreams(streams);
    }
  }, [streams]);

  if (error) return <NoDataContextCard title="Error" description="Failed to load streams." />;
  if (isLoading && localStreams.length === 0) return <NoDataContextCard title="Loading Streams" description="Please wait while we fetch your streams." />;

  return (
    <div className="flex flex-1 h-full gap-4">
      <div className="flex-1 h-full overflow-hidden flex flex-col relative">
        {localStreams.length === 0 && !streamAiProcessing ? (
          <NoDataContextCard title="No Streams" description="Create a new stream to get started." />
        ) : (
          <div className="flex-1 overflow-y-auto max-h-full relative">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {streamAiProcessing && (
                <Card className="h-64 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-background flex items-center justify-center">
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="text-sm font-medium animate-pulse">Processing Stream</div>
                  </div>
                </Card>
              )}
              {localStreams.map((stream) => (
                <StreamCard key={stream._id.toString()} stream={stream} setLocalStreams={setLocalStreams} mutate={mutate} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AddStreamColumn setLocalStreams={setLocalStreams} setStreamAiProcessing={setStreamAiProcessing} mutate={mutate} />
    </div>
  );
}

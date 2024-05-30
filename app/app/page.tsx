"use client";
import { IStream } from "@/types/types";
import { useState, useEffect } from "react";
import NoDataContextCard from "@/components/no-data-context-card";
import React from "react";
import StreamCard from "@/components/app/stream-card";
import { Card } from "@/components/ui/card";
import AddStreamColumn from "@/components/app/add-stream-column";

export default function App() {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [streamAiProcessing, setStreamAiProcessing] = useState<boolean>(false);
  const [fetchingStreams, setFetchingStreams] = useState<boolean>(true);

  useEffect(() => {
    const fetchStreams = () => {
      fetch("/api/backend/streams")
        .then((res) => res.json())
        .then((data) => {
          setStreams(data);
          setFetchingStreams(false);
        });
    };

    fetchStreams();
    const interval = setInterval(() => {
      fetchStreams();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-1 h-full gap-4">
      <div className="flex-1 h-full overflow-hidden flex flex-col relative">
        {fetchingStreams ? (
          <NoDataContextCard title="Loading Streams" description="Please wait while we fetch your streams." />
        ) : streams.length === 0 && !streamAiProcessing ? (
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
              {streams.map((stream) => (
                <StreamCard key={stream._id.toString()} stream={stream} setStreams={setStreams} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AddStreamColumn setStreams={setStreams} setStreamAiProcessing={setStreamAiProcessing} />
    </div>
  );
}

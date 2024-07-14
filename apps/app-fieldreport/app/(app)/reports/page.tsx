'use client';
import useSWR from 'swr';
import { IReport } from '@/types/types';
import NoDataContextCard from '@/components/no-data-context-card';
import ReportCard from '@/components/report-card';
import { Card } from '@/components/ui/card';
import AddStreamColumn from '@/components/add-stream-column';
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SWRError {
  message: string;
}

export default function App() {
  const {
    data: reports,
    error,
    isLoading,
    mutate,
  } = useSWR<IReport[], SWRError>('/api/reports', fetcher, {
    refreshInterval: 5000,
  });
  const [localReports, setLocalReports] = useState<IReport[]>([]);
  const [streamAiProcessing, setStreamAiProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (reports) {
      setLocalReports(reports);
    }
  }, [reports]);

  if (error)
    return (
      <NoDataContextCard title="Error" description="Failed to load reports." />
    );
  if (isLoading && localReports.length === 0)
    return (
      <NoDataContextCard
        title="Loading Reports"
        description="Please wait while we fetch your reports."
      />
    );

  return (
    <div className="flex flex-1 h-full gap-4">
      <div className="flex-1 h-full overflow-hidden flex flex-col relative">
        {localReports.length === 0 && !streamAiProcessing ? (
          <NoDataContextCard
            title="No Reports"
            description="Create a new stream to get started."
          />
        ) : (
          <div className="flex-1 overflow-y-auto max-h-full relative">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {streamAiProcessing && (
                <Card className="h-64 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-background flex items-center justify-center">
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="text-sm font-medium animate-pulse">
                      Processing Stream
                    </div>
                  </div>
                </Card>
              )}
              {localReports.map((report) => (
                <ReportCard
                  key={report._id.toString()}
                  report={report}
                  setLocalReports={setLocalReports}
                  mutate={mutate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

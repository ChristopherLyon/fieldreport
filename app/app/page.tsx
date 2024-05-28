"use client";
import NoDataContextCard from "@/components/no-data-context-card";

export default function App() {
  return (
    <div className="h-full">
      <NoDataContextCard title="No data available" description="There is no data available to display." />
    </div>
  );
}

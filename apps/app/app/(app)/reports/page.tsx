import NoDataContextCard from "@/components/no-data-context-card";
import ReportCard from "@/components/report-card";
import { api } from "@fr/trpc/clients/server";
import { TRPCReactProvider } from "@fr/trpc/clients/react";

export default async function App() {
	const reports = await api.reports.getReports({});

	if (reports.error) {
		return <div>Error: {reports.error}</div>;
	}

	// the api can return a single report or an array of reports
	if (!reports.reports) {
		throw new Error("Fetched single report");
	}

	return (
		<TRPCReactProvider>
			<div className="flex flex-1 h-full gap-4">
				<div className="flex-1 h-full overflow-hidden flex flex-col relative">
					{reports.reports.length === 0 ? (
						<NoDataContextCard
							title="No Reports"
							description="Create a new stream to get started."
						/>
					) : (
						<div className="flex-1 overflow-y-auto max-h-full relative">
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
								{reports.reports.map((report) => (
									<ReportCard key={report._id.toString()} report={report} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</TRPCReactProvider>
	);
}

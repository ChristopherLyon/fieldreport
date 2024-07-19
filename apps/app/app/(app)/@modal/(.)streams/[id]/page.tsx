import ExpandedReportDialog from "@/components/expanded-card-dialog";
import { api } from "@fr/trpc/clients/server";

export default async function Page({ params }) {
	const report = await api.streams.getStreams({ streamId: params.id });

	if ("error" in report) {
		return <div>Error: {report.error}</div>;
	}

	if (!report.stream) {
		return <div>Report not found</div>;
	}

	return (
		<ExpandedReportDialog
			stream={report.stream}
			expandedDialogOpen={true}
			setExpandedDialogOpen="/"
		/>
	);
}

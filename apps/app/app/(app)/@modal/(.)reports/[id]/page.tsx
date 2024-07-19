import ExpandedReportDialog from "@/components/expanded-report-dialog";
import { api } from "@fr/trpc/clients/server";

export default async function Page({ params }: { params: { id: string } }) {
	const report = await api.reports.getReports({ reportId: params.id });

	if ("error" in report) {
		return <div>Error: {report.error}</div>;
	}

	if (!report.report) {
		return <div>Report not found</div>;
	}

	return (
		<ExpandedReportDialog
			report={report.report}
			expandedDialogOpen={true}
			setExpandedDialogOpen="/reports"
		/>
	);
}

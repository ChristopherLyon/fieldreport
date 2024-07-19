import { LocalStreams } from "@/components/local-streams";
import { OrgRefresh } from "@/components/org-refresh";
import { auth } from "@clerk/nextjs/server";
import { TRPCReactProvider } from "@fr/trpc/clients/react";
import { api } from "@fr/trpc/clients/server";

export default async function App() {
	const session = auth();
	const signedInSession = session.protect();

	const data = await api.streams.getStreams({});

	// this won't happen
	if (!data.streams) {
		return null;
	}

	return (
		<TRPCReactProvider>
			<OrgRefresh />
			<LocalStreams
				initialData={data.streams}
				userId={signedInSession.userId}
				orgId={signedInSession.orgId}
			/>
		</TRPCReactProvider>
	);
}

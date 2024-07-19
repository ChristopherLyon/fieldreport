import { LocalStreams } from "@/components/local-streams";
import { auth } from "@clerk/nextjs/server";
import { TRPCReactProvider } from "@fr/trpc/clients/react";
import { api } from "@fr/trpc/clients/server";

export default async function App() {
	auth().protect();
	const data = await api.streams.getStreams();
	return (
		<TRPCReactProvider>
			<LocalStreams initialData={data.streams} />
		</TRPCReactProvider>
	);
}

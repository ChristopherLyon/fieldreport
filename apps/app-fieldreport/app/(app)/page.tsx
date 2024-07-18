import { api } from "@/lib/trpc/server";
import { LocalStreams } from "@/components/local-streams";

export default async function App() {
	const data = await api.streams.getStreams();
	return (
		<>
			{JSON.stringify(data)}
			<LocalStreams />
		</>
	);
}

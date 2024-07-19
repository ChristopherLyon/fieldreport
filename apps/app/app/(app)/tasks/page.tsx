import { TasksList } from "@/components/tasks-list";
import { TRPCReactProvider } from "@fr/trpc/clients/react";
import { api } from "@fr/trpc/clients/server";

export default async function TaskTable() {
	const tasks = await api.tasks.getTasks({});

	if ("error" in tasks) {
		return <div>{tasks.error}</div>;
	}

	return (
		<TRPCReactProvider>
			<TasksList tasks={tasks.tasks} />
		</TRPCReactProvider>
	);
}

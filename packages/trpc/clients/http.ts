import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { SuperJSON } from "superjson";
import type { AppRouter } from "../root";

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: "http://localhost:3000";

const TRPC_URL = `${BASE_URL}/api/trpc`;

export const api = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: TRPC_URL,
			// You can pass any HTTP headers you wish here
			async headers() {
				return {
					// authorization: getAuthCookie(),
				};
			},
			transformer: SuperJSON,
		}),
	],
});

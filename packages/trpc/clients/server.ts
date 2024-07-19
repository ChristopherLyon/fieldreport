import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { getAuth } from "@clerk/nextjs/server";
import { createCaller } from "../root";
import { createTRPCContext } from "../trpc";
import { NextRequest } from "next/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
	const readOnlyHeaders = headers();
	const headersObj = new Headers(readOnlyHeaders);
	headersObj.set("x-trpc-source", "rsc");

	return createTRPCContext({
		headers: headersObj,
		session: getAuth(
			new NextRequest("https://notused.com", { headers: readOnlyHeaders }),
		),
	});
});

export const api = createCaller(createContext);

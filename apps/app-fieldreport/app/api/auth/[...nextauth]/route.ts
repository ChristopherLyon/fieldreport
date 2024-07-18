import NextAuth from "next-auth/next";
import { CONFIG } from "./config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(CONFIG);

export { handler as GET, handler as POST };

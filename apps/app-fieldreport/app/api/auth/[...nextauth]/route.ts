import NextAuth from "next-auth/next";
import { CONFIG } from "./config";

const handler = NextAuth(CONFIG);

export { handler as GET, handler as POST };

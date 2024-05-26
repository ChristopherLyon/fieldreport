// export const dynamic = "force-dynamic";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Gets the authenticated user

export async function GET() {

    const session = await getServerSession();
    console.log(session);
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { db } = await connectToDatabase();
    const user = await db
        .collection("users")
        .findOne({ email: session.user?.email });
    return Response.json(user);
}

import { connectToDatabase } from "@/lib/mongodb";
import type { ITask } from "@/types/types"; // Import the ITask interface
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Fetch all tasks for the authenticated user
export async function GET(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const { searchParams } = new URL(request.url);
	const taskId = searchParams.get("id");

	const { db } = await connectToDatabase();

	if (taskId) {
		// Fetch specific task by ID
		const task = await db.collection<ITask>("tasks").findOne({
			_id: new ObjectId(taskId),
			user_id: session.user?.email,
		});

		if (!task) {
			return new NextResponse(JSON.stringify({ error: "Task not found" }), {
				status: 404,
			});
		}

		return NextResponse.json(task);
	} else {
		// Fetch all tasks
		const tasks: ITask[] = await db
			.collection<ITask>("tasks")
			.find({ user_id: session.user?.email })
			.sort({ created_at: -1 })
			.toArray();

		return NextResponse.json(tasks);
	}
}

// Create a new task for the authenticated user
export async function POST(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const data = await request.json();
	const task: ITask = {
		_id: new ObjectId(),
		user_id: session.user?.email,
		stream_id: new ObjectId(data.stream_id),
		title: data.title,
		description: data.description,
		priority: data.priority,
		sub_tasks: data.sub_tasks || [],
		created_at: new Date(),
		updated_at: new Date(),
	};

	const { db } = await connectToDatabase();
	await db.collection<ITask>("tasks").insertOne(task);

	return new NextResponse(JSON.stringify({ success: true, task }), {
		status: 200,
	});
}

// Update an existing task for the authenticated user
export async function PUT(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const data = await request.json();
	const taskUpdate: Partial<ITask> = {
		title: data.title,
		description: data.description,
		priority: data.priority,
		sub_tasks: data.sub_tasks,
		updated_at: new Date(),
	};

	const { db } = await connectToDatabase();
	const taskId = new ObjectId(data._id);
	const result = await db
		.collection<ITask>("tasks")
		.updateOne(
			{ _id: taskId, user_id: session.user?.email },
			{ $set: taskUpdate },
		);

	if (result.modifiedCount === 0) {
		return new NextResponse(JSON.stringify({ error: "Task not found" }), {
			status: 404,
		});
	}

	return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

// Delete an existing task for the authenticated user
export async function DELETE(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const data = await request.json();
	const taskId = new ObjectId(data._id);
	const { db } = await connectToDatabase();
	const result = await db.collection<ITask>("tasks").deleteOne({
		_id: taskId,
		user_id: session.user?.email,
	});

	if (result.deletedCount === 0) {
		return new NextResponse(JSON.stringify({ error: "Task not found" }), {
			status: 404,
		});
	}

	return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

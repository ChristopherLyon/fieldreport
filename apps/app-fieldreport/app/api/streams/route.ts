// api/backend/streams/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import type { IStream, ITask } from "@/types/types"; // Import the IStream and ITask interfaces
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Constants
export const maxDuration = 40; // Maximum duration for function due to API limits

// Utility function to get the current date in ISO format
const getCurrentDate = () => new Date().toISOString().split("T")[0];

// Create a new stream for the authenticated user
export async function POST(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const openai = new OpenAI();
	const data = await request.json();
	const today = getCurrentDate();

	// Construct the prompt dynamically with types and guidelines
	const aiPrompt = `
  Today's date is \${today}. You are an advanced note-taking AI assistant for the user \${session.user?.name}. Your task is to process the user's input, enhancing clarity and structure while maintaining their style. Summarize, add context, and suggest tasks only when explicitly indicated by the user. Use rich markdown to improve readability.

  Output Schema:

  {
    "stream": {
      "title": "string",
      "topic_category": "string",
      "summary": "string",
      "markdown_content": "string",
      "user_input_quality_ranking": {
        "score": 0,
        "score_tooltip": "string"
      },
      "tags": ["string"]
    },
    "task": {
      "is_task": true,
      "due_date": "Date" | null,
      "completed": "boolean" | null,
      "priority": "low" | "medium" | "high" | "urgent",
      "title": "string",
      "description": "string",
      "sub_tasks": [
        {
          "title": "string",
          "description": "string",
          "due_date": "Date",
          "completed": "boolean"
        }
      ]
    }
  }

  Guidelines:
  1. **Stream Title:** Concisely capture the essence.
  2. **Stream Summary:** Provide a brief overview (16-20 words).
  3. **Reformatted Markdown Content:** Use headings, bullet points, code blocks, and tables to enhance readability. Offer suggestions where applicable.
  4. **User Input Quality Ranking:** Score from 0-10 with a brief tooltip.
  5. **Tags:** Extract key themes (2-3 tags, max 2 words each).
  6. **Tasks and Sub-Tasks:** Only generate if explicitly mentioned by the user. ALWAYS include a due date, feel free to add tasks already completed.

  Rules:
  - Do not hallucinate or provide false information.
  - Return only valid JSON.
  - Enhance user's language and style with clarity.
  - Prioritize critical information.
  - Use rich markdown features for better readability and structure.

  Additional Instructions:
  - If user mentions data, display it in tables.
  - Enhance notes on specific topics with relevant information. For example, if the user mentions networking, provide abstracts on networking concepts, relevant tips, and next steps.
  - Use user’s language and style while improving clarity.
  - Keep AI suggestions and context additions secondary to the user's input.
  - Ensure coherence and relevance in all enhancements.
  - Provide detailed, thought-through next steps when mentioned. Avoid vagueness and irrelevant information.
`;

	const chatCompletion = await openai.chat.completions.create({
		response_format: {
			type: "json_object",
		},
		messages: [
			{ role: "system", content: aiPrompt },
			{
				role: "user",
				content: `Parse the following raw stream: ${data.raw_stream}`,
			},
		],
		model: "gpt-4o",
	});

	const aiContent = chatCompletion.choices?.[0]?.message?.content;
	if (!aiContent) {
		return new NextResponse(
			JSON.stringify({ error: "Failed to generate AI content" }),
			{ status: 500 },
		);
	}

	let parsedAiContent;
	try {
		parsedAiContent = JSON.parse(aiContent);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ error: "Failed to parse AI content" }),
			{ status: 500 },
		);
	}

	const { db } = await connectToDatabase();

	const stream: IStream = {
		_id: new ObjectId(),
		user_id: session.user?.email,
		raw_stream: data.raw_stream,
		created_at: new Date(),
		updated_at: new Date(),
		location: data.location,
		source: data.source,
		ai_generated: {
			title: parsedAiContent.stream.title,
			topic_category: parsedAiContent.stream.topic_category,
			summary: parsedAiContent.stream.summary,
			markdown_content: parsedAiContent.stream.markdown_content,
			user_input_quality_ranking:
				parsedAiContent.stream.user_input_quality_ranking,
			tags: parsedAiContent.stream.tags,
		},
	};

	// Insert the stream
	const result = await db.collection<IStream>("streams").insertOne(stream);

	if (parsedAiContent.task?.is_task) {
		const task: ITask = {
			_id: new ObjectId(),
			user_id: session.user?.email,
			stream_id: stream._id,
			title: parsedAiContent.task.title,
			description: parsedAiContent.task.description,
			priority: parsedAiContent.task.priority,
			sub_tasks: parsedAiContent.task.sub_tasks || [],
			created_at: new Date(),
			updated_at: new Date(),
		};

		// Insert the task
		const taskResult = await db.collection<ITask>("tasks").insertOne(task);

		// Update the stream with the spawned task ID
		await db
			.collection<IStream>("streams")
			.updateOne(
				{ _id: result.insertedId },
				{ $set: { "ai_generated.spawned_task_id": task._id } },
			);

		if (stream.ai_generated) {
			stream.ai_generated.spawned_task_id = task._id;
		}
	}

	return new NextResponse(JSON.stringify({ success: true, stream }), {
		status: 200,
	});
}

// Update an existing stream for the authenticated user
export async function PUT(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const data = await request.json();
	const streamUpdate: Partial<IStream> = {
		raw_stream: data.raw_stream,
		updated_at: new Date(),
	};

	const { db } = await connectToDatabase();
	const streamId = new ObjectId(data._id);
	const result = await db
		.collection<IStream>("streams")
		.updateOne(
			{ _id: streamId, user_id: session.user?.email },
			{ $set: streamUpdate },
		);

	if (result.modifiedCount === 0) {
		return new NextResponse(JSON.stringify({ error: "Stream not found" }), {
			status: 404,
		});
	}

	return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

// Delete an existing stream for the authenticated user
export async function DELETE(request: Request) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const data = await request.json();
	const streamId = new ObjectId(data._id);
	const { db } = await connectToDatabase();

	// Find the stream to get the task ID
	const stream = await db.collection<IStream>("streams").findOne({
		_id: streamId,
		user_id: session.user?.email,
	});

	if (!stream) {
		return new NextResponse(JSON.stringify({ error: "Stream not found" }), {
			status: 404,
		});
	}

	// Delete the stream
	const result = await db.collection<IStream>("streams").deleteOne({
		_id: streamId,
		user_id: session.user?.email,
	});

	if (result.deletedCount === 0) {
		return new NextResponse(JSON.stringify({ error: "Stream not found" }), {
			status: 404,
		});
	}

	// Delete the associated task if it exists
	if (stream.ai_generated?.spawned_task_id) {
		await db.collection<ITask>("tasks").deleteOne({
			_id: stream.ai_generated.spawned_task_id,
			user_id: session.user?.email,
		});
	}

	return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

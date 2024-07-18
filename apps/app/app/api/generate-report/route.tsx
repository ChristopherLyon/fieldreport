/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { connectToDatabase } from "@/lib/mongodb";
import type { IReport } from "@/types/types";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

// Utility function to get the start of the day
const getStartOfDay = (date: string) =>
	new Date(new Date(date).setUTCHours(0, 0, 0, 0));

// Utility function to get the end of the day
const getEndOfDay = (date: string) =>
	new Date(new Date(date).setUTCHours(23, 59, 59, 999));

// Utility function to get the current date in ISO format
const getCurrentDate = () => new Date().toISOString().split("T")[0];

// Create a new report for the authenticated user
export async function POST(request: Request) {
	const session = await getServerSession();
	if (!session) {
		console.log("Unauthorized access attempt");
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}
	let from: string, to: string, prompt: string;
	try {
		const data = await request.json();
		from = data.from;
		to = data.to;
		prompt = data.prompt;
		console.log("Request body:", data);
	} catch (error) {
		console.log("Error parsing request body:", error);
		return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
			status: 400,
		});
	}

	const { db } = await connectToDatabase();

	let streams;
	try {
		streams = await db
			.collection("streams")
			.find({
				user_id: session.user?.email,
				created_at: {
					$gte: getStartOfDay(from),
					$lte: getEndOfDay(to),
				},
			})
			.toArray();
		console.log("Streams fetched:", streams.length);
	} catch (error) {
		console.log("Error fetching streams:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to fetch streams" }),
			{ status: 500 },
		);
	}
	if (streams.length === 0) {
		console.log("No streams found for the specified date range");
		return new NextResponse(
			JSON.stringify({
				error: "No streams found for the specified date range",
			}),
			{ status: 404 },
		);
	}

	const streamText = streams.map((stream) => stream.raw_stream).join("\n");

	const aiPrompt = `
    Today's date is ${getCurrentDate()}.
    You are an advanced report-generating AI assistant for the user ${session.user?.name}. Your task is to process the user's streams collected from ${from} to ${to}, enhancing clarity and structure while maintaining their style. Summarize, add context, and suggest tasks only when explicitly indicated by the user. Use rich markdown to improve readability.
  
    Output Schema:
    {
      "title": "string",
      "topic_category": "string",
      "summary": "string",
      "markdown_content": "string",
      "tags": ["string"]
    }
  
    Guidelines:
    1. **Title:** Concisely capture the essence.
    2. **Summary:** Provide a brief overview (16-20 words).
    3. **Markdown Content:** Generate a detailed report with markdown, using rich features for better readability and structure. Adhere to the user's language and style. Enhance clarity and structure. Follow their prompt.
    3. **Tags:** Extract key themes (2-3 tags, max 2 words each).
  
    Rules:
    - Do not hallucinate or provide false information.
    - Return only valid JSON.
    - Enhance user's language and style with clarity.
    - Prioritize critical information.
    - Use rich markdown features for better readability and structure.
  
    Additional Instructions:
    - If user mentions data, display it in tables.
    - Enhance notes on specific topics with relevant information. For example, if the user mentions networking, provide abstracts on networking concepts, relevant tips, and next steps.
    - Use user's language and style while improving clarity.
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
				content: `Generate a report for these streams: ${streamText}`,
			},
			{ role: "system", content: "users optional custom instruction below: " },

			{ role: "user", content: prompt },
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
		console.log("Parsed AI Content:", parsedAiContent);
	} catch (error) {
		console.log("Error parsing AI content:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to parse AI content" }),
			{ status: 500 },
		);
	}

	const report: IReport = {
		_id: new ObjectId(),
		user_id: session.user?.email ?? null,
		created_at: new Date(),
		updated_at: new Date(),
		source: "web",
		ai_generated: {
			title: parsedAiContent.title,
			topic_category: parsedAiContent.topic_category,
			summary: parsedAiContent.summary,
			markdown_content: parsedAiContent.markdown_content,
			tags: parsedAiContent.tags,
		},
	};

	try {
		await db.collection<IReport>("reports").insertOne(report);
		console.log("Report inserted successfully");
	} catch (error) {
		console.log("Error inserting report into database:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to insert report" }),
			{ status: 500 },
		);
	}

	return new NextResponse(JSON.stringify({ success: true, report }), {
		status: 200,
	});
}

export const maxDuration = 40; // This function can run for a maximum of 40 seconds due to the OpenAI API's limit of 60
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { IStream } from "@/types/types"; // Import the IStream interface
import OpenAI from 'openai';

// Gets all streams for the authenticated user
export async function GET() {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { db } = await connectToDatabase();
    const streams: IStream[] = await db
        .collection<IStream>("streams")
        .find({ user_id: session.user?.email })
        .sort({ created_at: -1 })
        .toArray();

    return NextResponse.json(streams);
}

// Creates a new stream for the authenticated user
export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const openai = new OpenAI();

    const data = await request.json();

    // Today's date for the AI to use
    const today = new Date().toISOString().split('T')[0];

    const chatCompletion = await openai.chat.completions.create({
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "system",
                content: `
                Today's date is ${today}. You are an advanced stream-taking AI assistant designed to parse a raw note/thought streams provided by the user named ${session.user?.name} and generate a personalized structured, user-centric summary. Your goal is to create a stream that reads as if the user wrote it themselves, but with enhanced clarity and focus. You will provide a JSON output following this schema:

                {
                    "title": "string", // A concise title that accurately reflects the main topic of the stream
                    "topic_category": "string", // A single keyword that categorizes the main topic of the stream
                    "summary": "string", // A brief overview of the content for at-a-glance reading
                    "reformatted_markdown_content": "string", // Proper markdown syntax for the content, enriched with headings, bullet points, code blocks, emojis, and suggestions for the user
                    "task": {
                        "is_task": "boolean", // Whether the stream should be flagged as a task
                        "due_date": "Date" | null, // The due date of the task, if applicable
                        "completed": "boolean" | null, // Whether the task has been completed
                        "priority": "low" | "medium" | "high" | "urgent" // The priority level of the task, if applicable
                    },
                    "user_input_quality_ranking": {
                        "score": 0, // A score from 0-10 indicating the quality of the user's input
                        "score_tooltip": "string" // A tooltip explaining the score
                    },
                    "tags": ["string"]
                }

                Guidelines:
                - **Title**: Ensure it is concise and captures the essence of the stream.
                - **Summary**: Provide a brief yet comprehensive overview. [16 - 20 words]
                - **Reformatted Markdown Content**: Use rich markdown syntax. Incorporate headings, bullet points, code blocks, and emojis to enhance readability and engagement. Include suggestions for the user where applicable.
                - **Task Section**: Clearly indicate if there are actionable items, due dates, and their priority.
                - **User Input Quality Ranking**: Evaluate the quality of the user's raw_input on a scale of 0 - 10. Provide a tooltip with a very, VERY brief explanation (couple of words), or a suggestion for improvement.
                - **Tags**: Extract key themes and topics from the stream. [2-3 tags, max 2 words each]

                Rules:
                - NEVER hallucinate or provide false information or broken links.
                - ONLY RETURN VALID JSON STARTING WITH "{" AND ENDING WITH "}" 
                - You are their assistant, help them extrapolate their thoughts, not add your own.
                - Everything you produce provides the bases for further AI processing, so make sure it's clean and structured and make sure critical information is prioritized.
            `
            },
            {
                role: "user",
                content: "Parse the following raw stream: " + data.raw_stream
            }
        ],
        model: "gpt-4o",
    });

    const aiContent = chatCompletion.choices?.[0]?.message?.content;
    if (!aiContent) {
        return new NextResponse(JSON.stringify({ error: "Failed to generate AI content" }), {
            status: 500,
        });
    }

    let parsedAiContent;
    try {
        parsedAiContent = JSON.parse(aiContent);
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to parse AI content" }), {
            status: 500,
        });
    }

    const stream: IStream = {
        _id: new ObjectId(),
        user_id: session.user?.email,
        raw_stream: data.raw_stream,
        created_at: new Date(),
        updated_at: new Date(),
        location: data.location,
        source: data.source,
        ai_generated: {
            title: parsedAiContent.title,
            topic_category: parsedAiContent.topic_category,
            summary: parsedAiContent.summary,
            reformatted_markdown_content: parsedAiContent.reformatted_markdown_content,
            task: {
                is_task: parsedAiContent.task.is_task,
                due_date: parsedAiContent.task.due_date,
                completed: parsedAiContent.task.completed,
                priority: parsedAiContent.task.priority,
            },
            user_input_quality_ranking: {
                score: parsedAiContent.user_input_quality_ranking.score,
                score_tooltip: parsedAiContent.user_input_quality_ranking.score_tooltip,
            },
            tags: parsedAiContent.tags,
        },
    };

    const { db } = await connectToDatabase();
    const result = await db.collection<IStream>("streams").insertOne(stream);

    return new NextResponse(JSON.stringify({ success: true, stream }), { status: 200 });
}

// Updates an existing stream for the authenticated user
export async function PUT(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const data = await request.json();
    const stream: Partial<IStream> = {
        raw_stream: data.raw_stream,
        updated_at: new Date(),
    };

    const { db } = await connectToDatabase();
    const streamId = new ObjectId(data._id);
    const result = await db
        .collection<IStream>("streams")
        .updateOne({ _id: streamId, user_id: session.user?.email }, { $set: stream });

    if (result.modifiedCount === 0) {
        return new NextResponse(JSON.stringify({ error: "Stream not found" }), {
            status: 404,
        });
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

// Deletes an existing stream for the authenticated user
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
    const result = await db.collection<IStream>("streams").deleteOne({
        _id: streamId,
        user_id: session.user?.email,
    });

    if (result.deletedCount === 0) {
        return new NextResponse(JSON.stringify({ error: "Stream not found" }), {
            status: 404,
        });
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

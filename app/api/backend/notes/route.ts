import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { INote } from "@/types/types"; // Import the INote interface
import OpenAI from 'openai';

// Gets all notes for the authenticated user
export async function GET() {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { db } = await connectToDatabase();
    const notes: INote[] = await db
        .collection<INote>("notes")
        .find({ user_id: session.user?.email })
        .sort({ created_at: -1 })
        .toArray();

    return NextResponse.json(notes);
}
// Creates a new note for the authenticated user
export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const openai = new OpenAI();
    const data = await request.json();


    /* 
    
     ai_generated: {
        title: string;
        topic_category: string;
        summary: string;
        reformatted_markdown_content: string;
        // Let the AI decide if this note should be flagged as a task, and have the metadata for it
        task: {
            is_task: boolean;
            due_date: Date;
            completed: boolean;
            priority: "low" | "medium" | "high" | "urgent";
        };
        tags: string[];
    };
    */

    // Todays date for the AI to use
    const today = new Date().toISOString().split('T')[0];

    const chatCompletion = await openai.chat.completions.create({
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "system",
                content: `
                Today's date is ${today}. You are an advanced note-taking AI assistant designed to parse a raw note provided by the user and generate a structured, user-centric summary. Your goal is to create a note that reads as if the user wrote it themselves, but with enhanced clarity and focus. You will provide a JSON output following this schema:

                {
                    "title": "string", // A concise title that accurately reflects the main topic of the note
                    "topic_category": "string", // A single keyword that categorizes the main topic of the note
                    "summary": "string", // A brief overview of the content for at-a-glance reading
                    "reformatted_markdown_content": "string", // Proper markdown syntax for the content, enriched with headings, bullet points, code blocks, emojis, and suggestions for the user
                    "task": {
                        "is_task": "boolean", // Whether the note should be flagged as a task
                        "due_date": "Date" | null, // The due date of the task, if applicable
                        "completed": "boolean" | null, // Whether the task has been completed
                        "priority": "low" | "medium" | "high" | "urgent" // The priority level of the task, if applicable
                    },
                    "tags": ["string"] // A list of 2-3 relevant keywords
                }

                Guidelines:
                - **Title**: Ensure it is concise and captures the essence of the note.
                - **Summary**: Provide a brief yet comprehensive overview.
                - **Reformatted Markdown Content**: Use rich markdown syntax. Incorporate headings, bullet points, code blocks, and emojis to enhance readability and engagement. Include suggestions for the user where applicable.
                - **Task Section**: Clearly indicate if there are actionable items, due dates, and their priority.
                - **Tags**: Extract key themes and topics from the note.
                - ONLY RETURN VALID JSON STARTING WITH "{" AND ENDING WITH "}" 

                Additionally, if the note content suggests the user is struggling with a concept, provide helpful links or resources in the markdown. Make sure to enrich the content with additional insights or suggested follow-ups where appropriate.
            `
            },
            {
                role: "user",
                content: "Parse the following raw note: " + data.raw_note
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

    const note: INote = {
        _id: new ObjectId(),
        user_id: session.user?.email,
        raw_note: data.raw_note,
        created_at: new Date(),
        updated_at: new Date(),
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
            tags: parsedAiContent.tags,
        },
    };

    const { db } = await connectToDatabase();
    const result = await db.collection<INote>("notes").insertOne(note);

    return new NextResponse(JSON.stringify({ success: true, note }), { status: 200 });
}
// Updates an existing note for the authenticated user
export async function PUT(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const data = await request.json();
    const note: Partial<INote> = {
        raw_note: data.raw_note,
        updated_at: new Date(),
    };


    const { db } = await connectToDatabase();
    const noteId = new ObjectId(data._id);
    const result = await db
        .collection<INote>("notes")
        .updateOne({ _id: noteId, user_id: session.user?.email }, { $set: note });

    if (result.modifiedCount === 0) {
        return new NextResponse(JSON.stringify({ error: "Note not found" }), {
            status: 404,
        });
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

// Deletes an existing note for the authenticated user
export async function DELETE(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const data = await request.json();
    const noteId = new ObjectId(data._id);
    const { db } = await connectToDatabase();
    const result = await db.collection<INote>("notes").deleteOne({
        _id: noteId,
        user_id: session.user?.email,
    });

    if (result.deletedCount === 0) {
        return new NextResponse(JSON.stringify({ error: "Note not found" }), {
            status: 404,
        });
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}

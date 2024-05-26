// types/types.ts

import { ObjectId } from "mongodb";

export interface IUser {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    role: "operator" | "manager" | "admin";
    team_id: ObjectId;
}

export interface ILocation {
    type: "Point";  // Restricted to 'Point' for this use case
    coordinates: [number, number];  // [longitude, latitude]
}

// Add fields for AI generated tags title, summary, reformatted content, tags
export interface INote {
    _id: ObjectId;                          // GENERATED: Note ID
    user_id: string | null | undefined;     // REQUIRED: User ID
    raw_note: string;                       // REQUIRED: Raw note content
    created_at: Date;                       // REQUIRED: Date the note was created
    updated_at: Date;                       // REQUIRED: Date the note was last updated
    location?: ILocation;                   // OPTIONAL: Location of the note pulled from the device
    source: "watch" | "web" | "mobile";     // REQUIRED: Source of the note
    ai_generated: {
        title: string;
        topic_category: string;
        summary: string;
        reformatted_markdown_content: string;
        // Let the AI decide if this note should be flagged as a task, and have the metadata for it
        task: {
            is_task: boolean;
            due_date: Date | null;
            completed: boolean | null;
            priority: "low" | "medium" | "high" | "urgent" | null;
        };
        tags: string[];
    };
}

export interface IReport {
    _id: ObjectId;
    created_by: ObjectId;
    team_id: ObjectId;
    creation_date: Date;
    notes: ObjectId[];
    summary: string;
    status: "draft" | "published";
    visibility: "private" | "team" | "public";
}
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
    accuracy?: number;  // OPTIONAL: Accuracy of the location
}

// Add fields for AI generated tags title, summary, reformatted content, tags
export interface IStream {
    _id: ObjectId;                          // GENERATED: Stream ID
    user_id: string | null | undefined;     // REQUIRED: User ID
    raw_stream: string;                       // REQUIRED: Raw stream content
    created_at: Date;                       // REQUIRED: Date the stream was created
    updated_at: Date;                       // REQUIRED: Date the stream was last updated
    location: ILocation;                   // OPTIONAL: Location of the stream pulled from the device
    source: "watch" | "web" | "mobile";     // REQUIRED: Source of the stream
    ai_generated: {
        title: string;
        topic_category: string;
        summary: string;
        reformatted_markdown_content: string;
        // Let the AI decide if this stream should be flagged as a task, and have the metadata for it
        task: {
            is_task: boolean;
            due_date: Date | null;
            completed: boolean | null;
            priority: "low" | "medium" | "high" | "urgent" | null;
        };
        user_input_quality_ranking: {
            score: number;
            score_tooltip: string;
        };
        tags: string[];
    };
}

export interface IReport {
    _id: ObjectId;
    created_by: ObjectId;
    team_id: ObjectId;
    creation_date: Date;
    streams: ObjectId[];
    summary: string;
    status: "draft" | "published";
    visibility: "private" | "team" | "public";
}
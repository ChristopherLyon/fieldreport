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
  type: "Point";
  coordinates: [number, number]; // REQUIRED: Coordinates in [longitude, latitude] format
  accuracy?: number; // OPTIONAL: Accuracy of the location data
}

export interface ISubTask {
  title: string;
  description?: string; // OPTIONAL: Description of the subtask
  due_date?: Date; // OPTIONAL: Due date for the subtask
  completed?: boolean; // OPTIONAL: Completion status of the subtask
}

export interface ITask {
  _id: ObjectId; // GENERATED: Task ID
  user_id: string | null | undefined; // REQUIRED: User ID
  stream_id: ObjectId; // REQUIRED: Reference to the associated stream
  title: string; // REQUIRED: Title of the task
  description?: string; // OPTIONAL: Description of the task
  due_date?: Date; // OPTIONAL: Due date for the task
  completed?: boolean; // OPTIONAL: Completion status of the task
  priority?: "low" | "medium" | "high" | "urgent"; // OPTIONAL: Priority of the task
  sub_tasks?: ISubTask[]; // OPTIONAL: List of subtasks
  created_at: Date; // REQUIRED: Date the task was created
  updated_at: Date; // REQUIRED: Date the task was last updated
}

export interface IStream {
  _id: ObjectId; // GENERATED: Stream ID
  user_id: string | null | undefined; // REQUIRED: User ID
  raw_stream: string; // REQUIRED: Raw stream content
  created_at: Date; // REQUIRED: Date the stream was created
  updated_at: Date; // REQUIRED: Date the stream was last updated
  location?: ILocation; // OPTIONAL: Location of the stream
  source: "watch" | "web" | "mobile"; // REQUIRED: Source of the stream
  ai_generated?: {
    title?: string; // OPTIONAL: Title generated by AI
    topic_category?: string; // OPTIONAL: Topic category generated by AI
    summary?: string; // OPTIONAL: Summary generated by AI
    spawned_task_id?: ObjectId; // OPTIONAL: ID of the task spawned by the stream
    reformatted_markdown_content?: string; // OPTIONAL: Reformatted content in markdown
    user_input_quality_ranking?: {
      score: number; // REQUIRED: Quality score of user input
      score_tooltip: string; // REQUIRED: Tooltip explaining the score
    };
    tags?: string[]; // OPTIONAL: Tags generated by AI
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

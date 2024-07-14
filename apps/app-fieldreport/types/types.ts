import { ObjectId } from 'mongodb';

export interface IUser {
  _id: ObjectId;
  email: string;
  team_id: ObjectId;
  stripeCustomerId: string;
}

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // REQUIRED: Coordinates in [longitude, latitude] format
  accuracy?: number; // OPTIONAL: Accuracy of the location data
}

export interface ISubTask {
  title: string;
  description: string; // REQUIRED: Description of the subtask
  due_date: Date; // REQUIRED: Due date of the subtask
  completed: boolean; // REQUIRED: Completion status of the subtask
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface ITask {
  _id: ObjectId; // GENERATED: Task ID
  user_id: string | null | undefined; // REQUIRED: User ID
  stream_id: ObjectId; // REQUIRED: Reference to the associated stream
  title: string; // REQUIRED: Title of the task
  description: string; // REQUIRED: Description of the task
  priority: Priority; // REQUIRED: Priority level of the task
  sub_tasks: ISubTask[]; // REQUIRED: List of subtasks (at least one subtask required)
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
  source: 'watch' | 'web' | 'mobile'; // REQUIRED: Source of the stream
  ai_generated?: {
    title?: string; // OPTIONAL: Title generated by AI
    topic_category?: string; // OPTIONAL: Topic category generated by AI
    summary?: string; // OPTIONAL: Summary generated by AI
    spawned_task_id?: ObjectId; // OPTIONAL: ID of the task spawned by the stream
    markdown_content?: string; // OPTIONAL: Reformatted content in markdown
    user_input_quality_ranking?: {
      score: number; // REQUIRED: Quality score of user input
      score_tooltip: string; // REQUIRED: Tooltip explaining the score
    };
    tags?: string[]; // OPTIONAL: Tags generated by AI
  };
}

export interface IReport {
  _id: ObjectId;
  user_id: string | null | undefined; // REQUIRED: User ID
  created_at: Date; // REQUIRED: Date the stream was created
  updated_at: Date; // REQUIRED: Date the stream was last updated
  location?: ILocation; // OPTIONAL: Location of the stream
  source: 'watch' | 'web' | 'mobile'; // REQUIRED: Source of the stream
  ai_generated: {
    title: string; // REQUIRED: Title generated by AI
    topic_category: string; // REQUIRED: Topic category generated by AI
    summary: string; // REQUIRED: Summary generated by AI
    markdown_content: string; // REQUIRED: Content in markdown
    tags: string[]; // REQUIRED: Tags generated by AI
  };
}

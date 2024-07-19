// trpc handler for tasks
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { ITask } from "../types";
import { ObjectId } from "mongodb";

export const tasksRouter = createTRPCRouter({
	getTasks: protectedProcedure
		.input(z.object({ taskId: z.string().optional() }))
		.query(async ({ ctx: { db, session }, input: { taskId } }) => {
			if (taskId) {
				// Fetch specific task by ID
				const task = await db.db.collection<ITask>("tasks").findOne({
					_id: new ObjectId(taskId),
					user_id: session.userId,
					org_id: session.orgId,
				});

				if (!task) {
					return { error: "Task not found" };
				}

				return { task };
			}

			const tasks = await db.db
				.collection<ITask>("tasks")
				.find({ user_id: session.userId, org_id: session.orgId })
				.sort({ created_at: -1 })
				.toArray();

			return { tasks };
		}),
	updateTask: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				description: z.string(),
				priority: z.enum(["low", "medium", "high", "urgent"]),
			}),
		)
		.mutation(
			async ({
				input: { id, title, description, priority },
				ctx: { db, session },
			}) => {
				const taskUpdate: Partial<ITask> = {
					title: title,
					description: description,
					priority: priority,
					sub_tasks: [],
					updated_at: new Date(),
				};

				const taskId = new ObjectId(id);
				const result = await db.db
					.collection<ITask>("tasks")
					.updateOne(
						{ _id: taskId, user_id: session.userId, org_id: session.orgId },
						{ $set: taskUpdate },
					);

				if (result.modifiedCount === 0) {
					return { error: "Task not found" };
				}
				if (result.upsertedId) {
					return { success: true };
				}

				return { error: "Failed to update task" };
			},
		),
	createTask: protectedProcedure
		.input(
			z.object({
				streamId: z.string(),
				title: z.string(),
				description: z.string(),
				priority: z.enum(["low", "medium", "high", "urgent"]),
			}),
		)
		.mutation(
			async ({
				input: { streamId, title, description, priority },
				ctx: { db, session },
			}) => {
				const task: ITask = {
					_id: new ObjectId(),
					user_id: session.userId,
					org_id: session.orgId,
					stream_id: new ObjectId(streamId),
					title: title,
					description: description,
					priority: priority,
					sub_tasks: [], // TODO: sub tasks
					created_at: new Date(),
					updated_at: new Date(),
				};

				// Insert the task
				const result = await db.db.collection<ITask>("tasks").insertOne(task);

				if (result.insertedId) {
					return { success: true, task };
				}

				return { error: "Failed to insert task" };
			},
		),
	deleteTask: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx: { db, session }, input: { id } }) => {
			const taskId = new ObjectId(id);
			// Find the task to get the task ID
			const task = await db.db.collection<ITask>("tasks").findOne({
				_id: taskId,
				user_id: session.userId,
				org_id: session.orgId,
			});

			if (!task) {
				return { error: "Task not found" };
			}

			// Delete the task
			const result = await db.db.collection<ITask>("tasks").deleteOne({
				_id: taskId,
				user_id: session.userId,
				org_id: session.orgId,
			});

			if (result.deletedCount === 0) {
				return { error: "Task not found" };
			}

			return { success: true };
		}),
});

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { IReport } from "../types";
import OpenAI from "openai";
import { ObjectId } from "mongodb";

const openai = new OpenAI();

// Utility function to get the start of the day
const getStartOfDay = (date: Date) => new Date(date.setUTCHours(0, 0, 0, 0));

// Utility function to get the end of the day
const getEndOfDay = (date: Date) => new Date(date.setUTCHours(23, 59, 59, 999));

// Utility function to get the current date in ISO format
const getCurrentDate = () => new Date().toISOString().split("T")[0];

export const reportsRouter = createTRPCRouter({
	getReports: protectedProcedure
		.input(z.object({ reportId: z.string().optional() }))
		.query(async ({ ctx: { db, session }, input: { reportId } }) => {
			if (reportId) {
				// Fetch specific report by ID
				const report = await db.db.collection<IReport>("reports").findOne({
					_id: new ObjectId(reportId),
					user_id: session.userId,
					org_id: session.orgId,
				});

				if (!report) {
					return { error: "Report not found" };
				}

				return { report };
			}

			const reports = await db.db
				.collection<IReport>("reports")
				.find({ user_id: session.userId, org_id: session.orgId })
				.sort({ created_at: -1 })
				.toArray();

			return { reports };
		}),
	createReport: protectedProcedure
		.input(
			z.object({
				from: z.date(),
				to: z.date(),
				prompt: z.string(),
			}),
		)
		.mutation(async ({ input, ctx: { db, session } }) => {
			let streams;
			try {
				streams = await db.db
					.collection("streams")
					.find({
						user_id: session.userId,
						org_id: session.orgId,
						created_at: {
							$gte: getStartOfDay(input.from),
							$lte: getEndOfDay(input.to),
						},
					})
					.toArray();
				console.log("Streams fetched:", streams.length);
			} catch (error) {
				console.log("Error fetching streams:", error);
				return { error: "Failed to fetch streams" };
			}
			if (streams.length === 0) {
				console.log("No streams found for the specified date range");
				return {
					error: "No streams found for the specified date range",
				};
			}

			const streamText = streams.map((stream) => stream.raw_stream).join("\n");

			const aiPrompt = `
    Today's date is ${getCurrentDate()}.
    You are an advanced report-generating AI assistant for the user ${session.user}. Your task is to process the user's streams collected from ${input.from} to ${input.to}, enhancing clarity and structure while maintaining their style. Summarize, add context, and suggest tasks only when explicitly indicated by the user. Use rich markdown to improve readability.

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
					{
						role: "system",
						content: "users optional custom instruction below: ",
					},

					{ role: "user", content: input.prompt },
				],

				model: "gpt-4o",
			});

			const aiContent = chatCompletion.choices?.[0]?.message?.content;
			if (!aiContent) {
				return { error: "Failed to generate AI content" };
			}

			let parsedAiContent;
			try {
				parsedAiContent = JSON.parse(aiContent);
				console.log("Parsed AI Content:", parsedAiContent);
			} catch (error) {
				console.log("Error parsing AI content:", error);
				return { error: "Failed to parse AI content" };
			}

			const report: IReport = {
				_id: new ObjectId(),
				user_id: session.userId ?? null,
				org_id: session.orgId ?? null,
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
				await db.db.collection<IReport>("reports").insertOne(report);
				console.log("Report inserted successfully");
			} catch (error) {
				console.log("Error inserting report into database:", error);
				return { error: "Failed to insert report" };
			}

			return { success: true, report };
		}),
	deleteReport: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx: { db, session }, input: { id } }) => {
			const reportId = new ObjectId(id);
			// Find the report to get the report ID
			const report = await db.db.collection<IReport>("reports").findOne({
				_id: reportId,
				user_id: session.userId,
				org_id: session.orgId,
			});

			if (!report) {
				return { error: "Report not found" };
			}

			// Delete the report
			const result = await db.db.collection<IReport>("reports").deleteOne({
				_id: reportId,
				user_id: session.userId,
				org_id: session.orgId,
			});

			if (result.deletedCount === 0) {
				return { error: "Report not found" };
			}

			return { success: true };
		}),
});

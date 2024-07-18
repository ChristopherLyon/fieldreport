import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.DATABASE_NAME!;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
	client: MongoClient;
	db: Db;
}> {
	if (!MONGODB_URI) {
		throw new Error("Define the MONGODB_URI environmental variable");
	}

	if (!MONGODB_DB) {
		throw new Error("Define the MONGODB_DB environmental variable");
	}

	// Check the cache.
	if (cachedClient && cachedDb) {
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}

	try {
		const client = new MongoClient(MONGODB_URI);
		await client.connect();
		const db = client.db(MONGODB_DB);

		cachedClient = client;
		cachedDb = db;

		return {
			client: cachedClient,
			db: cachedDb,
		};
	} catch (error) {
		console.error("Failed to connect to the database:", error);
		throw new Error("Failed to connect to the database");
	}
}

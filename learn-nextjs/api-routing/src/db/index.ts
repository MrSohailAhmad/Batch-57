import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!process.env.DATABASE_URL) {
  throw new Error("env not found");
}
// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString as string, { prepare: false });
export const db = drizzle(client);

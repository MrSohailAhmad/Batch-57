import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Safeguard to ensure DATABASE_URL is provided
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(databaseUrl, { prepare: false });
export const db = drizzle(client);

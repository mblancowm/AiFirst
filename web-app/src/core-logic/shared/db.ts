import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "../participants/schema";

const databaseUrl = process.env.DATABASE_URL ?? "./data/ai-first.sqlite";

if (databaseUrl !== ":memory:") {
  mkdirSync(dirname(resolve(databaseUrl)), { recursive: true });
}

export const sqlite = new Database(databaseUrl);
export const db = drizzle(sqlite, { schema });

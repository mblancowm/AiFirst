import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { z } from "zod";
import * as schema from "./schema";

const databaseConfig = z
  .object({ DATABASE_URL: z.string().trim().min(1).default("./data/AiFirstTraining.sqlite") })
  .parse(process.env);
const databasePath = resolve(process.cwd(), databaseConfig.DATABASE_URL);
mkdirSync(dirname(databasePath), { recursive: true });

export const sqlite = new Database(databasePath);
sqlite.run("PRAGMA foreign_keys = ON");
sqlite.run("PRAGMA journal_mode = WAL");
export const db = drizzle({ client: sqlite, schema });

export const dbFile = databasePath;

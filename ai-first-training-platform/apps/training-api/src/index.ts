import { z } from "zod";
import { createApp } from "./app";
import { db, dbFile } from "./db/client";
import { applyMigrations } from "./db/migrate";
import { seedCourse } from "./db/seed";

const runtimeConfig = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.preprocess((value) => (value === undefined ? 8787 : value), z.coerce.number().int().min(1).max(65535)),
  })
  .parse(process.env);

if (runtimeConfig.NODE_ENV === "production") {
  throw new Error("Cloud startup is disabled until the shared SSO gateway and PostgreSQL profile are integrated.");
}

await applyMigrations();
seedCourse();

const app = createApp({ database: db });
const port = runtimeConfig.PORT;
console.log(`API AI-first lista en http://127.0.0.1:${port} (SQLite local: ${dbFile}; tutor: mock unless configured)`);
export default { hostname: "127.0.0.1", port, fetch: app.fetch };

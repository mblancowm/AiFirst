import { resolve } from "node:path";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db, sqlite } from "../src/core-logic/shared/db";
import { seedInitialRoster } from "../src/core-logic/participants/seed-initial-roster";

try {
  migrate(db, { migrationsFolder: resolve(import.meta.dir, "../drizzle") });
  const result = seedInitialRoster();
  console.info(`Initial roster: ${result}.`);
} finally {
  sqlite.close();
}

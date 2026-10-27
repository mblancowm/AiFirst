import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { resolve } from "node:path";
import { db } from "./client";
import { learners } from "./schema";

export async function applyMigrations(): Promise<void> {
  await migrate(db, { migrationsFolder: resolve(import.meta.dir, "../../drizzle") });
  db.insert(learners)
    .values({ learnerId: "local-practice", displayName: "Perfil de práctica local (compartido)" })
    .onConflictDoNothing()
    .run();
}

if (import.meta.main) {
  await applyMigrations();
  console.log("Migraciones Drizzle aplicadas. Perfil local listo.");
}

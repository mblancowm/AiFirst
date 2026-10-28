import { resolve } from "node:path";
import { Hono } from "hono";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { createAdminApi } from "./api/admin";
import { createAuthApi } from "./api/auth";
import { createPublicApi } from "./api/public";
import { seedInitialRoster } from "./core-logic/participants/seed-initial-roster";
import { db, sqlite } from "./core-logic/shared/db";

const rawFrontendPath = process.env.APP_FRONTEND_PATH ?? "/";
const frontendPath = rawFrontendPath === "/" ? "" : `/${rawFrontendPath.replace(/^\/+|\/+$/g, "")}`;
const rawBackendPath = process.env.APP_BACKEND_PATH ?? `${frontendPath}/api`;
const backendPath = `/${rawBackendPath.replace(/^\/+|\/+$/g, "")}`;
migrate(db, { migrationsFolder: resolve(import.meta.dir, "../drizzle") });
const initialRosterResult = seedInitialRoster();
console.info(`Initial roster: ${initialRosterResult}.`);

const app = new Hono();
app.get(`${backendPath}/health`, (context) => context.json({ status: "ok" }));
app.route(`${backendPath}/auth`, createAuthApi());
app.route(`${backendPath}/public`, createPublicApi());
app.route(`${backendPath}/admin`, createAdminApi());

const server = Bun.serve({
  port: Number(process.env.API_PORT ?? 3002),
  hostname: process.env.HOST ?? "127.0.0.1",
  fetch: app.fetch,
});

const shutdown = () => {
  server.stop();
  sqlite.close();
};

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);

console.info(`AI-First API listening on ${server.hostname}:${server.port}${backendPath}`);

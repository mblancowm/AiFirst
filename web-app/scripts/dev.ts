import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dir, "..");
const childOptions = {
  cwd: projectRoot,
  env: process.env,
  stdout: "inherit" as const,
  stderr: "inherit" as const,
};

const apiProcess = Bun.spawn(["bun", "--watch", "src/server.ts"], childOptions);
const webProcess = Bun.spawn(["bunx", "vike", "dev", "--host", "127.0.0.1", "--port", "3001"], childOptions);

let isShuttingDown = false;
const shutdown = () => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  apiProcess.kill();
  webProcess.kill();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

const exitCode = await Promise.race([apiProcess.exited, webProcess.exited]);
shutdown();
process.exitCode = exitCode;

import { Hono } from "hono";
import { getCurrentSession } from "../../core-logic/auth/session";
import { runSafe } from "../shared/run-safe";

export const createAuthApi = () => {
  const router = new Hono();
  router.get("/me", (context) => runSafe(context, () => getCurrentSession(context.req.raw)));
  return router;
};

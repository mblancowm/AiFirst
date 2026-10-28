import { Hono } from "hono";
import * as participantsDomain from "../../core-logic/participants";
import { runSafe } from "../shared/run-safe";

export const createPublicApi = () => {
  const router = new Hono();
  router.get("/teams", (context) => runSafe(context, () => participantsDomain.listPublicTeams()));
  return router;
};

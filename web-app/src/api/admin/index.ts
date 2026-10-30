import { Hono } from "hono";
import * as participantsDomain from "../../core-logic/participants";
import { assertAdminRequest } from "../../core-logic/auth/session";
import { idSchema } from "../../core-logic/participants/validation";
import { errorResponse, runSafe } from "../shared/run-safe";

const routeId = (value: string) => idSchema.parse(value);

export const createAdminApi = () => {
  const router = new Hono();
  router.use("*", async (context, next) => {
    try {
      await assertAdminRequest(context.req.raw);
      await next();
    } catch (error) {
      return errorResponse(context, error);
    }
  });

  router.get("/participants", (context) => runSafe(context, () => participantsDomain.listParticipants()));
  router.post("/participants", async (context) => runSafe(context, async () => {
    const body: unknown = await context.req.json();
    return participantsDomain.createParticipant(body);
  }));
  router.patch("/participants/:id", async (context) => runSafe(context, async () => {
    const participantId = routeId(context.req.param("id"));
    const body: unknown = await context.req.json();
    return participantsDomain.updateParticipant(participantId, body);
  }));
  router.delete("/participants/:id", (context) => runSafe(context, () => participantsDomain.deleteParticipant(routeId(context.req.param("id")))));

  router.get("/teams", (context) => runSafe(context, () => participantsDomain.listTeams()));
  router.post("/teams", async (context) => runSafe(context, async () => {
    const body: unknown = await context.req.json();
    return participantsDomain.createTeam(body);
  }));
  router.patch("/teams/:id", async (context) => runSafe(context, async () => {
    const teamId = routeId(context.req.param("id"));
    const body: unknown = await context.req.json();
    return participantsDomain.updateTeam(teamId, body);
  }));
  router.delete("/teams/:id", (context) => runSafe(context, () => participantsDomain.deleteTeam(routeId(context.req.param("id")))));

  return router;
};

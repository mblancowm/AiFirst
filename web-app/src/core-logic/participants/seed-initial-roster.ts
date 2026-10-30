import { count, eq } from "drizzle-orm";
import { db } from "../shared/db";
import { participants, seedMarkers, teamMembers, teams } from "./schema";
import { INITIAL_ROSTER } from "./initial-roster";

const INITIAL_ROSTER_SEED_KEY = "ai-first-initial-roster-v1";

export type InitialRosterSeedResult = "seeded" | "already-seeded" | "skipped-existing-data";

export function seedInitialRoster(): InitialRosterSeedResult {
  return db.transaction((transaction) => {
    const seedClaim = transaction
      .insert(seedMarkers)
      .values({ key: INITIAL_ROSTER_SEED_KEY })
      .onConflictDoNothing()
      .returning({ key: seedMarkers.key })
      .get();

    if (!seedClaim) return "already-seeded";

    const participantCount = transaction.select({ value: count() }).from(participants).get()?.value ?? 0;
    const teamCount = transaction.select({ value: count() }).from(teams).get()?.value ?? 0;
    if (participantCount > 0 || teamCount > 0) {
      transaction.delete(seedMarkers).where(eq(seedMarkers.key, INITIAL_ROSTER_SEED_KEY)).run();
      return "skipped-existing-data";
    }

    const participantRows = transaction
      .insert(participants)
      .values(INITIAL_ROSTER.flatMap((team) => team.participants).map(({ name, email }) => ({ name, email })))
      .returning({ id: participants.id, email: participants.email })
      .all();
    const participantIdByEmail = new Map(participantRows.map(({ id, email }) => [email, id]));

    const teamRows = transaction
      .insert(teams)
      .values(INITIAL_ROSTER.map(({ name }) => ({ name, mentorId: null })))
      .returning({ id: teams.id, name: teams.name })
      .all();
    const teamIdByName = new Map(teamRows.map(({ id, name }) => [name, id]));

    const memberships = INITIAL_ROSTER.flatMap((team) => {
      const teamId = teamIdByName.get(team.name);
      if (teamId === undefined) throw new Error(`No se pudo registrar ${team.name}.`);
      return team.participants.map(({ email }) => {
        const participantId = participantIdByEmail.get(email);
        if (participantId === undefined) throw new Error(`No se pudo registrar el email ${email}.`);
        return { teamId, participantId };
      });
    });
    transaction.insert(teamMembers).values(memberships).run();

    return "seeded";
  });
}

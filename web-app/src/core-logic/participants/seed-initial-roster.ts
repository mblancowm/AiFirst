import { count, eq, inArray } from "drizzle-orm";
import { db } from "../shared/db";
import { participants, seedMarkers, teamMembers, teams } from "./schema";
import { INITIAL_ROSTER } from "./initial-roster";

const PREVIOUS_ROSTER_SEED_KEY = "ai-first-initial-roster-v1";
const CURRENT_ROSTER_SEED_KEY = "ai-first-initial-roster-v2";
const MAX_TEAM_SIZE = 4;

export type InitialRosterSeedResult =
  | { status: "seeded" | "updated" | "already-seeded" | "skipped-existing-data" }
  | { status: "skipped-conflict"; reason: string };

const normalizeEmail = (email: string) => email.trim().toLowerCase();

function validateInitialRoster(): void {
  const teamByEmail = new Map<string, string>();

  for (const team of INITIAL_ROSTER) {
    if (team.participants.length > MAX_TEAM_SIZE) {
      throw new Error(`${team.name} excede el máximo de ${MAX_TEAM_SIZE} participantes.`);
    }

    for (const participant of team.participants) {
      const email = normalizeEmail(participant.email);
      if (!email) throw new Error(`${participant.name} no tiene email en el roster inicial.`);

      const existingTeam = teamByEmail.get(email);
      if (existingTeam) {
        throw new Error(`${participant.email} aparece en ${existingTeam} y ${team.name}.`);
      }

      teamByEmail.set(email, team.name);
    }
  }
}

export function seedInitialRoster(): InitialRosterSeedResult {
  validateInitialRoster();

  return db.transaction((transaction) => {
    const seedClaim = transaction
      .insert(seedMarkers)
      .values({ key: CURRENT_ROSTER_SEED_KEY })
      .onConflictDoNothing()
      .returning({ key: seedMarkers.key })
      .get();

    if (!seedClaim) return { status: "already-seeded" };

    const hasPreviousSeed = transaction
      .select({ key: seedMarkers.key })
      .from(seedMarkers)
      .where(eq(seedMarkers.key, PREVIOUS_ROSTER_SEED_KEY))
      .get() !== undefined;
    const participantCount = transaction.select({ value: count() }).from(participants).get()?.value ?? 0;
    const teamCount = transaction.select({ value: count() }).from(teams).get()?.value ?? 0;

    const skipExistingData = () => {
      transaction.delete(seedMarkers).where(eq(seedMarkers.key, CURRENT_ROSTER_SEED_KEY)).run();
      return { status: "skipped-existing-data" as const };
    };
    const skipConflict = (reason: string) => {
      transaction.delete(seedMarkers).where(eq(seedMarkers.key, CURRENT_ROSTER_SEED_KEY)).run();
      return { status: "skipped-conflict" as const, reason };
    };

    if (!hasPreviousSeed && (participantCount > 0 || teamCount > 0)) return skipExistingData();

    const rosterParticipants = INITIAL_ROSTER.flatMap((team) => team.participants);
    const rosterEmails = new Set(rosterParticipants.map(({ email }) => normalizeEmail(email)));
    const existingParticipants = transaction.select().from(participants).all();
    const participantByEmail = new Map<string, (typeof existingParticipants)[number]>();
    const participantById = new Map(existingParticipants.map((participant) => [participant.id, participant]));

    for (const participant of existingParticipants) {
      if (!participant.email) continue;
      const email = normalizeEmail(participant.email);
      if (!rosterEmails.has(email)) continue;
      if (participantByEmail.has(email)) {
        return skipConflict(`el email ${participant.email} aparece más de una vez en la base`);
      }
      participantByEmail.set(email, participant);
    }

    const rosterTeamNames = INITIAL_ROSTER.map(({ name }) => name);
    const rosterTeamNameSet = new Set(rosterTeamNames);
    const existingTeams = transaction.select().from(teams).where(inArray(teams.name, rosterTeamNames)).all();
    const teamByName = new Map<string, (typeof existingTeams)[number]>();

    for (const team of existingTeams) {
      if (teamByName.has(team.name)) return skipConflict(`hay más de un equipo llamado ${team.name}`);
      teamByName.set(team.name, team);
    }

    const knownParticipantIds = new Set([...participantByEmail.values()].map(({ id }) => id));
    const teamById = new Map(existingTeams.map((team) => [team.id, team.name]));
    const existingTargetTeamIds = existingTeams.map(({ id }) => id);

    if (existingTargetTeamIds.length > 0) {
      const targetMemberships = transaction
        .select({ teamId: teamMembers.teamId, participantId: teamMembers.participantId })
        .from(teamMembers)
        .where(inArray(teamMembers.teamId, existingTargetTeamIds))
        .all();

      for (const membership of targetMemberships) {
        if (knownParticipantIds.has(membership.participantId)) continue;
        const memberName = participantById.get(membership.participantId)?.name ?? `ID ${membership.participantId}`;
        return skipConflict(`${teamById.get(membership.teamId)} contiene a ${memberName}, que no está en el roster`);
      }
    }

    const knownParticipantIdList = [...knownParticipantIds];
    if (knownParticipantIdList.length > 0) {
      const currentSeedMemberships = transaction
        .select({
          teamName: teams.name,
          participantId: teamMembers.participantId,
        })
        .from(teamMembers)
        .innerJoin(teams, eq(teamMembers.teamId, teams.id))
        .where(inArray(teamMembers.participantId, knownParticipantIdList))
        .all();

      for (const membership of currentSeedMemberships) {
        if (rosterTeamNameSet.has(membership.teamName)) continue;
        const memberName = participantById.get(membership.participantId)?.name ?? `ID ${membership.participantId}`;
        return skipConflict(`${memberName} pertenece al equipo no administrado ${membership.teamName}`);
      }
    }

    const participantIdByEmail = new Map<string, number>();
    for (const participant of rosterParticipants) {
      const email = normalizeEmail(participant.email);
      const existing = participantByEmail.get(email);
      if (existing) {
        transaction
          .update(participants)
          .set({ name: participant.name, email: participant.email })
          .where(eq(participants.id, existing.id))
          .run();
        participantIdByEmail.set(email, existing.id);
        continue;
      }

      const created = transaction
        .insert(participants)
        .values({ name: participant.name, email: participant.email })
        .returning({ id: participants.id })
        .get();
      if (!created) throw new Error(`No se pudo registrar el email ${participant.email}.`);
      participantIdByEmail.set(email, created.id);
    }

    const teamIdByName = new Map([...teamByName].map(([name, team]) => [name, team.id] as const));
    for (const team of INITIAL_ROSTER) {
      if (teamIdByName.has(team.name)) continue;
      const created = transaction
        .insert(teams)
        .values({ name: team.name, mentorId: null })
        .returning({ id: teams.id })
        .get();
      if (!created) throw new Error(`No se pudo registrar ${team.name}.`);
      teamIdByName.set(team.name, created.id);
    }

    transaction.delete(teamMembers).where(inArray(teamMembers.participantId, [...participantIdByEmail.values()])).run();

    const memberships = INITIAL_ROSTER.flatMap((team) => {
      const teamId = teamIdByName.get(team.name);
      if (teamId === undefined) throw new Error(`No se pudo registrar ${team.name}.`);
      return team.participants.map(({ email }) => {
        const participantId = participantIdByEmail.get(normalizeEmail(email));
        if (participantId === undefined) throw new Error(`No se pudo registrar el email ${email}.`);
        return { teamId, participantId };
      });
    });
    transaction.insert(teamMembers).values(memberships).run();

    return { status: hasPreviousSeed ? "updated" : "seeded" } as const;
  });
}

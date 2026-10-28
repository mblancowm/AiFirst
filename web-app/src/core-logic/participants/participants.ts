import { and, asc, eq, inArray, ne } from "drizzle-orm";
import { db } from "../shared/db";
import { AppError } from "../shared/errors";
import { participants, teamMembers, teams } from "./schema";
import { participantUpdateSchema, participantWriteSchema, teamWriteSchema } from "./validation";

export const listParticipants = async () => {
  const rows = await db.select().from(participants).orderBy(asc(participants.name));
  const membershipRows = await db
    .select({ participantId: teamMembers.participantId, teamId: teams.id, teamName: teams.name })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id));
  const membershipByParticipant = new Map(membershipRows.map((row) => [row.participantId, { id: row.teamId, name: row.teamName }]));

  return rows.map((participant) => ({
    ...participant,
    team: membershipByParticipant.get(participant.id) ?? null,
  }));
};

export const createParticipant = async (input: unknown) => {
  const values = participantWriteSchema.parse(input);
  const [participant] = await db.insert(participants).values(values).returning();
  return participant;
};

export const updateParticipant = async (participantId: number, input: unknown) => {
  const values = participantUpdateSchema.parse(input);
  const [participant] = await db.update(participants).set(values).where(eq(participants.id, participantId)).returning();
  if (!participant) throw new AppError("No se encontró el participante.", 404);
  return participant;
};

export const deleteParticipant = async (participantId: number) => {
  db.transaction((transaction) => {
    const [participant] = transaction.select({ id: participants.id }).from(participants).where(eq(participants.id, participantId)).all();
    if (!participant) throw new AppError("No se encontró el participante.", 404);
    transaction.delete(teamMembers).where(eq(teamMembers.participantId, participantId)).run();
    transaction.update(teams).set({ mentorId: null }).where(eq(teams.mentorId, participantId)).run();
    transaction.delete(participants).where(eq(participants.id, participantId)).run();
  });
  return { id: participantId };
};

const validateTeamReferences = (
  transaction: Parameters<Parameters<typeof db.transaction>[0]>[0],
  participantIds: number[],
  mentorId: number | null | undefined,
  teamId?: number,
) => {
  const referencedIds = [...new Set([...participantIds, ...(mentorId == null ? [] : [mentorId])])];
  if (referencedIds.length > 0) {
    const found = transaction.select({ id: participants.id }).from(participants).where(inArray(participants.id, referencedIds)).all();
    if (found.length !== referencedIds.length) throw new AppError("Selecciona participantes existentes.", 400);
  }
  if (participantIds.length === 0) return;

  const membershipFilter = teamId === undefined
    ? inArray(teamMembers.participantId, participantIds)
    : and(inArray(teamMembers.participantId, participantIds), ne(teamMembers.teamId, teamId));
  const existingMemberships = transaction
    .select({ participantId: teamMembers.participantId })
    .from(teamMembers)
    .where(membershipFilter)
    .all();
  if (existingMemberships.length > 0) {
    throw new AppError("Cada participante solo puede pertenecer a un equipo. Actualiza su equipo actual primero.", 409);
  }
};

export const listTeams = async () => {
  const teamRows = await db.select().from(teams).orderBy(asc(teams.name));
  const memberRows = await db.select({ teamId: teamMembers.teamId, participantId: teamMembers.participantId }).from(teamMembers);
  const participantRows = await db.select().from(participants);
  const participantById = new Map(participantRows.map((participant) => [participant.id, participant]));
  const memberIdsByTeam = new Map<number, number[]>();
  for (const member of memberRows) {
    const memberIds = memberIdsByTeam.get(member.teamId) ?? [];
    memberIds.push(member.participantId);
    memberIdsByTeam.set(member.teamId, memberIds);
  }

  return teamRows.map((team) => ({
    ...team,
    mentor: team.mentorId == null ? null : participantById.get(team.mentorId) ?? null,
    participants: (memberIdsByTeam.get(team.id) ?? [])
      .map((participantId) => participantById.get(participantId))
      .filter((participant) => participant !== undefined),
  }));
};

export const listPublicTeams = async () => {
  const teamRows = await db
    .select({ id: teams.id, name: teams.name, mentorId: teams.mentorId, mentorName: participants.name })
    .from(teams)
    .leftJoin(participants, eq(teams.mentorId, participants.id))
    .orderBy(asc(teams.name));
  const memberRows = await db
    .select({ teamId: teamMembers.teamId, participantId: participants.id, participantName: participants.name })
    .from(teamMembers)
    .innerJoin(participants, eq(teamMembers.participantId, participants.id));
  const participantsByTeam = new Map<number, { id: number; name: string }[]>();

  for (const member of memberRows) {
    const currentMembers = participantsByTeam.get(member.teamId) ?? [];
    currentMembers.push({ id: member.participantId, name: member.participantName });
    participantsByTeam.set(member.teamId, currentMembers);
  }

  return teamRows
    .map(({ mentorId, mentorName, ...team }) => ({
      ...team,
      mentor: mentorId === null || mentorName === null ? null : { id: mentorId, name: mentorName },
      participants: participantsByTeam.get(team.id) ?? [],
    }))
    .sort((first, second) => first.name.localeCompare(second.name, "es", { numeric: true }));
};

export const createTeam = async (input: unknown) => {
  const values = teamWriteSchema.parse(input);
  try {
    return db.transaction((transaction) => {
      validateTeamReferences(transaction, values.participantIds, values.mentorId);
      const team = transaction.insert(teams).values({ name: values.name, mentorId: values.mentorId ?? null }).returning().get();
      if (values.participantIds.length > 0) {
        transaction.insert(teamMembers).values(values.participantIds.map((participantId) => ({ teamId: team.id, participantId }))).run();
      }
      return team;
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("team_members.participant_id")) {
      throw new AppError("Cada participante solo puede pertenecer a un equipo.", 409);
    }
    throw error;
  }
};

export const updateTeam = async (teamId: number, input: unknown) => {
  const values = teamWriteSchema.parse(input);
  try {
    return db.transaction((transaction) => {
      const [existingTeam] = transaction.select({ id: teams.id }).from(teams).where(eq(teams.id, teamId)).all();
      if (!existingTeam) throw new AppError("No se encontró el equipo.", 404);
      validateTeamReferences(transaction, values.participantIds, values.mentorId, teamId);
      const team = transaction
        .update(teams)
        .set({ name: values.name, mentorId: values.mentorId ?? null })
        .where(eq(teams.id, teamId))
        .returning()
        .get();
      transaction.delete(teamMembers).where(eq(teamMembers.teamId, teamId)).run();
      if (values.participantIds.length > 0) {
        transaction.insert(teamMembers).values(values.participantIds.map((participantId) => ({ teamId, participantId }))).run();
      }
      return team;
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("team_members.participant_id")) {
      throw new AppError("Cada participante solo puede pertenecer a un equipo.", 409);
    }
    throw error;
  }
};

export const deleteTeam = async (teamId: number) => {
  db.transaction((transaction) => {
    const [team] = transaction.select({ id: teams.id }).from(teams).where(eq(teams.id, teamId)).all();
    if (!team) throw new AppError("No se encontró el equipo.", 404);
    transaction.delete(teamMembers).where(eq(teamMembers.teamId, teamId)).run();
    transaction.delete(teams).where(eq(teams.id, teamId)).run();
  });
  return { id: teamId };
};

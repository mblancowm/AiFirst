import { integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const participants = sqliteTable("participants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  mentorId: integer("mentor_id").references(() => participants.id, { onDelete: "set null" }),
});

export const teamMembers = sqliteTable(
  "team_members",
  {
    teamId: integer("team_id").notNull().references(() => teams.id, { onDelete: "cascade" }),
    participantId: integer("participant_id").notNull().references(() => participants.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.teamId, table.participantId] }),
    uniqueIndex("team_members_participant_id_unique").on(table.participantId),
  ],
);

export const seedMarkers = sqliteTable("seed_markers", {
  key: text("key").primaryKey(),
});

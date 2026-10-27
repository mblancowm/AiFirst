import { relations, sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const knowledgeProjects = sqliteTable("KnowledgeProjects", {
  id: text("Id").primaryKey(),
  name: text("Name").notNull(),
  description: text("Description").notNull(),
});

export const projectNotes = sqliteTable(
  "ProjectNotes",
  {
    id: integer("Id").primaryKey({ autoIncrement: true }),
    projectId: text("ProjectId")
      .notNull()
      .references(() => knowledgeProjects.id, { onDelete: "cascade" }),
    title: text("Title").notNull(),
    content: text("Content").notNull(),
    createdAtUtc: text("CreatedAtUtc").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("IX_ProjectNotes_ProjectId").on(table.projectId)],
);

export const courseModules = sqliteTable("CourseModules", {
  id: text("Id").primaryKey(),
  week: integer("Week").notNull(),
  title: text("Title").notNull(),
  tagline: text("Tagline").notNull(),
  summary: text("Summary").notNull(),
  objective: text("Objective").notNull(),
  minutes: integer("Minutes").notNull(),
  sectionsJson: text("SectionsJson").notNull(),
  exampleTitle: text("ExampleTitle").notNull(),
  example: text("Example").notNull(),
  practiceTitle: text("PracticeTitle").notNull(),
  practice: text("Practice").notNull(),
  deliverablesJson: text("DeliverablesJson").notNull(),
  checkpointQuestion: text("CheckpointQuestion").notNull(),
  checkpointOptionsJson: text("CheckpointOptionsJson").notNull(),
  correctAnswerIndex: integer("CorrectAnswerIndex").notNull(),
  promptCode: text("PromptCode").notNull(),
  sortOrder: integer("SortOrder").notNull(),
});

export const learners = sqliteTable("Learners", {
  learnerId: text("LearnerId").primaryKey(),
  displayName: text("DisplayName").notNull(),
  createdAtUtc: text("CreatedAtUtc").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const studentProgress = sqliteTable(
  "StudentProgress",
  {
    learnerId: text("LearnerId")
      .notNull()
      .references(() => learners.learnerId, { onDelete: "cascade" }),
    moduleId: text("ModuleId")
      .notNull()
      .references(() => courseModules.id, { onDelete: "cascade" }),
    reflection: text("Reflection").notNull().default(""),
    selectedAnswer: integer("SelectedAnswer"),
    checkpointPassed: integer("CheckpointPassed", { mode: "boolean" }).notNull().default(false),
    completed: integer("Completed", { mode: "boolean" }).notNull().default(false),
    updatedAtUtc: text("UpdatedAtUtc").notNull().default(sql`CURRENT_TIMESTAMP`),
    completedAtUtc: text("CompletedAtUtc"),
  },
  (table) => [
    primaryKey({ columns: [table.learnerId, table.moduleId] }),
    index("IX_StudentProgress_ModuleId").on(table.moduleId),
  ],
);

export const trainingGroups = sqliteTable(
  "TrainingGroups",
  {
    id: integer("Id").primaryKey({ autoIncrement: true }),
    name: text("Name").notNull(),
    projectCode: text("ProjectCode", { enum: ["agenda-citas", "base-conocimiento", "triage-tickets"] }),
    creatorLearnerId: text("CreatorLearnerId").references(() => learners.learnerId, { onDelete: "set null" }),
    createdAtUtc: text("CreatedAtUtc").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("IX_TrainingGroups_Name").on(table.name)],
);

export const trainingGroupMembers = sqliteTable(
  "TrainingGroupMembers",
  {
    id: integer("Id").primaryKey({ autoIncrement: true }),
    groupId: integer("GroupId")
      .notNull()
      .references(() => trainingGroups.id, { onDelete: "cascade" }),
    name: text("Name").notNull(),
    role: text("Role", { enum: ["api", "datos", "frontend", "qa", "producto"] }).notNull(),
    addedAtUtc: text("AddedAtUtc").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("IX_TrainingGroupMembers_GroupId_Name").on(table.groupId, table.name),
    index("IX_TrainingGroupMembers_GroupId").on(table.groupId),
  ],
);

export const groupsRelations = relations(trainingGroups, ({ many }) => ({ members: many(trainingGroupMembers) }));
export const groupMembersRelations = relations(trainingGroupMembers, ({ one }) => ({
  group: one(trainingGroups, { fields: [trainingGroupMembers.groupId], references: [trainingGroups.id] }),
}));

import { z } from "zod";

export const roleSchema = z.enum(["api", "datos", "frontend", "qa", "producto"]);
export const projectCodeSchema = z.enum(["agenda-citas", "base-conocimiento", "triage-tickets"]);
export const courseLanguageSchema = z.enum(["es", "en"]);

export const lessonSectionSchema = z.object({ heading: z.string(), body: z.string() });
export const courseModuleSchema = z.object({
  id: z.string(),
  week: z.number().int(),
  title: z.string(),
  tagline: z.string(),
  summary: z.string(),
  objective: z.string(),
  minutes: z.number().int(),
  markdown: z.string(),
  sections: z.array(lessonSectionSchema),
  completed: z.boolean(),
  reflection: z.string(),
  completedAtUtc: z.string().nullable(),
});

export const trainingGroupMemberSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  role: roleSchema,
  addedAtUtc: z.string(),
});
export const trainingGroupSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  projectCode: projectCodeSchema.nullable(),
  canDelete: z.boolean(),
  hasCreator: z.boolean(),
  createdAtUtc: z.string(),
  members: z.array(trainingGroupMemberSchema),
});
export const trainingGroupsResponseSchema = z.array(trainingGroupSchema);
export const trainingGroupMemberResponseSchema = trainingGroupMemberSchema;
export const projectNoteSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  createdAtUtc: z.string(),
});
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  database: z.string(),
  tutor: z.enum(["mock", "openai"]),
});
export const createGroupRequestSchema = z.object({ name: z.string().trim().min(1).max(100) });
export const updateGroupProjectRequestSchema = z.object({ projectCode: projectCodeSchema.nullable() });
export const addGroupMemberRequestSchema = z.object({ name: z.string().trim().min(1).max(160), role: roleSchema });
export const saveProgressRequestSchema = z.object({ completed: z.boolean(), reflection: z.string().max(4000) });

export const tutorQuestionRequestSchema = z.object({
  moduleId: z.string().min(1).max(80).optional(),
  role: roleSchema.optional(),
  language: courseLanguageSchema.default("es"),
  question: z.string().trim().min(1).max(1600),
});
export const evidenceStatusSchema = z.enum(["supported", "insufficient"]);
export const tutorReferenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  sourceType: z.enum(["course-module", "project-note"]),
  moduleId: z.string().optional(),
  moduleTitle: z.string().optional(),
  sectionHeading: z.string().optional(),
  projectId: z.string().optional(),
});
export const tutorResponseSchema = z.object({
  answer: z.string().min(1),
  evidenceStatus: evidenceStatusSchema,
  references: z.array(tutorReferenceSchema),
  provider: z.enum(["mock", "openai"]),
});

export const knowledgeProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  notes: z.array(projectNoteSchema),
});
export const createProjectNoteRequestSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1).max(3000),
});
export const askProjectRequestSchema = z.object({
  language: courseLanguageSchema.default("es"),
  question: z.string().trim().min(1).max(1600),
});
export const curriculumPageSchema = z.object({ markdown: z.string().min(1) });

export type RoleKey = z.infer<typeof roleSchema>;
export type ProjectCode = z.infer<typeof projectCodeSchema>;
export type CourseLanguage = z.infer<typeof courseLanguageSchema>;
export type CourseModule = z.infer<typeof courseModuleSchema>;
export type TrainingGroupMember = z.infer<typeof trainingGroupMemberSchema>;
export type TrainingGroup = z.infer<typeof trainingGroupSchema>;
export type CreateGroupRequest = z.infer<typeof createGroupRequestSchema>;
export type SaveProgressRequest = z.infer<typeof saveProgressRequestSchema>;
export type TutorResponse = z.infer<typeof tutorResponseSchema>;
export type TutorReference = z.infer<typeof tutorReferenceSchema>;
export type KnowledgeProject = z.infer<typeof knowledgeProjectSchema>;

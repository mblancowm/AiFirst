export type {
  CourseLanguage,
  CourseModule,
  KnowledgeProject,
  ProjectCode,
  RoleKey,
  TrainingGroup,
  TrainingGroupMember,
  TutorResponse,
} from "@ai-first-training/contracts";

export interface PromptItem {
  code: string;
  title: string;
  audience: string;
  role: string;
  body: string;
}

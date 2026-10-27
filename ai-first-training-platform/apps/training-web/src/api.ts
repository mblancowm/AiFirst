import type {
  CourseLanguage,
  CourseModule,
  KnowledgeProject,
  ProjectCode,
  RoleKey,
  TrainingGroup,
  TutorResponse,
} from "./types";

const apiOrigin = import.meta.env.SSR ? (import.meta.env.VITE_API_ORIGIN ?? "http://127.0.0.1:8787") : "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiOrigin}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? String(body.message)
        : `La API respondió con el estado ${response.status}.`;
    throw new Error(`${message} (HTTP ${response.status})`);
  }
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

export const api = {
  health: () => request<{ status: string; database: string }>("/api/health"),
  course: (language: CourseLanguage, learnerEmail: string) =>
    request<CourseModule[]>(`/api/course?lang=${language}`, {
      headers: { "X-Learner-Email": learnerEmail },
    }),
  overview: (language: CourseLanguage) => request<{ markdown: string }>(`/api/course/overview?lang=${language}`),
  walkthrough: (language: CourseLanguage) => request<{ markdown: string }>(`/api/course/walkthrough?lang=${language}`),
  saveProgress: (
    moduleId: string,
    value: { completed: boolean; reflection: string },
    language: CourseLanguage,
    learnerEmail: string,
  ) =>
    request<CourseModule>(`/api/progress/${encodeURIComponent(moduleId)}?lang=${language}`, {
      method: "PUT",
      headers: { "X-Learner-Email": learnerEmail },
      body: JSON.stringify(value),
    }),
  groups: (learnerEmail: string) =>
    request<TrainingGroup[]>("/api/groups", { headers: { "X-Learner-Email": learnerEmail } }),
  createGroup: (name: string, learnerEmail: string) =>
    request<TrainingGroup>("/api/groups", {
      method: "POST",
      headers: { "X-Learner-Email": learnerEmail },
      body: JSON.stringify({ name }),
    }),
  deleteGroup: (groupId: number, learnerEmail: string) =>
    request<void>(`/api/groups/${groupId}`, { method: "DELETE", headers: { "X-Learner-Email": learnerEmail } }),
  chooseProject: (groupId: number, projectCode: ProjectCode | null) =>
    request<TrainingGroup>(`/api/groups/${groupId}/project`, { method: "PUT", body: JSON.stringify({ projectCode }) }),
  addMember: (groupId: number, name: string, role: RoleKey) =>
    request<TrainingGroup>(`/api/groups/${groupId}/developers`, {
      method: "POST",
      body: JSON.stringify({ name, role }),
    }),
  removeMember: (groupId: number, memberId: number) =>
    request<void>(`/api/groups/${groupId}/developers/${memberId}`, { method: "DELETE" }),
  askTutor: (role: RoleKey, question: string, language: CourseLanguage) =>
    request<TutorResponse>("/api/tutor/ask", { method: "POST", body: JSON.stringify({ role, question, language }) }),
  knowledgeProjects: (language: CourseLanguage) =>
    request<KnowledgeProject[]>(`/api/knowledge/projects?lang=${language}`),
  addProjectNote: (projectId: string, value: { title: string; content: string }) =>
    request<KnowledgeProject["notes"][number]>(`/api/knowledge/projects/${encodeURIComponent(projectId)}/notes`, {
      method: "POST",
      body: JSON.stringify(value),
    }),
  askProject: (projectId: string, question: string, language: CourseLanguage) =>
    request<TutorResponse>(`/api/knowledge/projects/${encodeURIComponent(projectId)}/ask`, {
      method: "POST",
      body: JSON.stringify({ question, language }),
    }),
};

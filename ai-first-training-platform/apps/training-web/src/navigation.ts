import type { CourseModule } from "./types";

const moduleFiles: Record<string, string> = {
  "00-team-harness.md": "semana-1-equipo",
  "03-database.md": "semana-2-datos",
  "02-backend.md": "semana-2-api",
  "01-ui.md": "semana-3-ui",
  "05-ai-assisted-development.md": "semana-3-ia",
  "04-qa.md": "semana-4-qa",
};

export function moduleIdForMarkdownLink(href: string): string | null {
  const file = href.split("/").at(-1)?.split("#")[0] ?? "";
  return moduleFiles[file] ?? null;
}

export function getModuleNeighbors(modules: CourseModule[], moduleId?: string) {
  const index = modules.findIndex((module) => module.id === moduleId);
  return {
    previous: index > 0 ? (modules[index - 1] ?? null) : null,
    next: index >= 0 ? (modules[index + 1] ?? null) : (modules[0] ?? null),
  };
}

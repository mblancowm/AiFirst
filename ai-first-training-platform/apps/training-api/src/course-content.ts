import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { CourseLanguage } from "@ai-first-training/contracts";

export interface LessonSection {
  heading: string;
  body: string;
}

export interface CourseModuleSeed {
  id: string;
  week: number;
  title: string;
  tagline: string;
  summary: string;
  objective: string;
  minutes: number;
  markdown: string;
  sections: LessonSection[];
  sortOrder: number;
}

const moduleFiles = [
  { id: "semana-1-equipo", week: 1, order: 1, file: "00-team-harness.md" },
  { id: "semana-2-datos", week: 2, order: 2, file: "03-database.md" },
  { id: "semana-2-api", week: 2, order: 3, file: "02-backend.md" },
  { id: "semana-3-ui", week: 3, order: 4, file: "01-ui.md" },
  { id: "semana-3-ia", week: 3, order: 5, file: "05-ai-assisted-development.md" },
  { id: "semana-4-qa", week: 4, order: 6, file: "04-qa.md" },
] as const;

const trainingDir = resolve(import.meta.dir, "../../../docs/training");

function parseModule(
  file: string,
  id: string,
  week: number,
  sortOrder: number,
  language: CourseLanguage,
): CourseModuleSeed {
  const modulePath = language === "en" ? resolve(trainingDir, "en", file) : resolve(trainingDir, file);
  const source = readFileSync(modulePath, "utf8").replaceAll("\r\n", "\n");
  const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (!title) throw new Error(`Training module ${file} must have an H1 title.`);
  const metadataPattern =
    language === "en" ? /^>\s*Week\s+(\d+)\s*.*?(\d+)\s*hours?.*$/m : /^>\s*Semana\s+(\d+)\s*.*?(\d+)\s*horas?.*$/m;
  const metadata = source.match(metadataPattern);
  if (!metadata || Number(metadata[1]) !== week) throw new Error(`Training module ${file} has invalid week metadata.`);
  const markdown = source
    .replace(/^#\s+.+\n+/, "")
    .replace(/^>.*\n+/, "")
    .trim();
  const sections = markdownSections(markdown);
  const summary = markdown.split(/\n\s*\n/).find((block) => block && !block.startsWith("#")) ?? "";
  const objectiveHeading = language === "en" ? "Learning objective" : "Objetivo de aprendizaje";
  const objective = sections.find((section) => section.heading === objectiveHeading)?.body ?? summary;
  return {
    id,
    week,
    title,
    tagline: summary.split(/[.!?]\s/u)[0] ?? summary,
    summary,
    objective: objective.replaceAll("\n", " "),
    minutes: Number(metadata[2]) * 60,
    markdown,
    sections,
    sortOrder,
  };
}

export function getCourseModules(language: CourseLanguage): CourseModuleSeed[] {
  return moduleFiles.map((item) => parseModule(item.file, item.id, item.week, item.order, language));
}

export function getCurriculumOverview(language: CourseLanguage): string {
  const overviewPath = language === "en" ? resolve(trainingDir, "en/README.md") : resolve(trainingDir, "README.md");
  return readFileSync(overviewPath, "utf8");
}

export function getIntegrationWalkthrough(language: CourseLanguage): string {
  const walkthroughPath =
    language === "en"
      ? resolve(trainingDir, "en/project-integration-walkthrough.md")
      : resolve(trainingDir, "project-integration-walkthrough.md");
  return readFileSync(walkthroughPath, "utf8");
}

export const courseModules: CourseModuleSeed[] = getCourseModules("es");
export const curriculumOverview = getCurriculumOverview("es");
export const integrationWalkthrough = getIntegrationWalkthrough("es");

export function markdownSections(markdown: string): LessonSection[] {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const headings = lines.flatMap((line, index) => {
    const match = line.match(/^#{1,3}\s+(.+)$/);
    return match ? [{ index, heading: match[1].trim() }] : [];
  });
  return headings
    .map((heading, position) => ({
      heading: heading.heading,
      body: lines
        .slice(heading.index + 1, headings[position + 1]?.index ?? lines.length)
        .join("\n")
        .trim(),
    }))
    .filter((section) => section.body.length > 0);
}

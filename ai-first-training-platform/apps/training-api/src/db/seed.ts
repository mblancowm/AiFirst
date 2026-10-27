import { courseModules as seed } from "../course-content";
import { and, eq } from "drizzle-orm";
import { db } from "./client";
import { courseModules, knowledgeProjects, projectNotes } from "./schema";

export function seedCourse(): void {
  for (const module of seed) {
    db.insert(courseModules)
      .values({
        id: module.id,
        week: module.week,
        title: module.title,
        tagline: module.tagline,
        summary: module.summary,
        objective: module.objective,
        minutes: module.minutes,
        sectionsJson: JSON.stringify(module.sections),
        exampleTitle: "",
        example: "",
        practiceTitle: "",
        practice: "",
        deliverablesJson: "[]",
        checkpointQuestion: "",
        checkpointOptionsJson: "[]",
        correctAnswerIndex: 0,
        promptCode: "",
        sortOrder: module.sortOrder,
      })
      .onConflictDoUpdate({
        target: courseModules.id,
        set: {
          week: module.week,
          title: module.title,
          tagline: module.tagline,
          summary: module.summary,
          objective: module.objective,
          minutes: module.minutes,
          sectionsJson: JSON.stringify(module.sections),
          sortOrder: module.sortOrder,
        },
      })
      .run();
  }

  const projects = [
    { id: "atlas", name: "Atlas", description: "Notas sintéticas sobre decisiones de un proyecto interno." },
    { id: "orion", name: "Orion", description: "Otro espacio de práctica para probar el aislamiento entre proyectos." },
  ];
  for (const project of projects) db.insert(knowledgeProjects).values(project).onConflictDoNothing().run();
  const initialNotes = [
    {
      projectId: "atlas",
      title: "Decisión de alcance",
      content:
        "El MVP de Atlas permite buscar notas de proyecto y responder con referencias. El equipo decidió empezar con SQLite local y datos sintéticos.",
    },
    {
      projectId: "atlas",
      title: "Revisión semanal",
      content:
        "La revisión semanal se realiza los miércoles. API y datos coordinan el contrato antes de dividir tareas.",
    },
    {
      projectId: "orion",
      title: "Plan de Orion",
      content: "Orion usa un ciclo de entrega mensual. Su responsable de revisión es el equipo de operaciones.",
    },
  ];
  for (const note of initialNotes) {
    const existing = db
      .select({ id: projectNotes.id })
      .from(projectNotes)
      .where(and(eq(projectNotes.projectId, note.projectId), eq(projectNotes.title, note.title)))
      .get();
    if (!existing) db.insert(projectNotes).values(note).run();
  }
}

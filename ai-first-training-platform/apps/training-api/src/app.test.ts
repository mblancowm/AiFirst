import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { resolve } from "node:path";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { courseModuleSchema, curriculumPageSchema, tutorResponseSchema } from "@ai-first-training/contracts";
import * as schema from "./db/schema";
import { createApp, mockTutor, validateTutorConfiguration } from "./app";
import { courseModules } from "./course-content";
import { tutorEvaluationSet } from "./tutor-evaluation";

function makeTutor() {
  return async (question: string, sources: Parameters<typeof mockTutor>[1]) => mockTutor(question, sources);
}

async function createFixture() {
  const sqlite = new Database(":memory:");
  sqlite.run("PRAGMA foreign_keys = ON");
  const database = drizzle({ client: sqlite, schema });
  await migrate(database, { migrationsFolder: resolve(import.meta.dir, "../drizzle") });
  await database.insert(schema.learners).values({ learnerId: "local-practice", displayName: "Perfil local de prueba" });
  for (const module of courseModules) {
    await database.insert(schema.courseModules).values({
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
    });
  }
  await database.insert(schema.knowledgeProjects).values([
    { id: "atlas", name: "Atlas", description: "Fixture del proyecto uno." },
    { id: "orion", name: "Orion", description: "Fixture del proyecto dos." },
  ]);
  await database.insert(schema.projectNotes).values([
    { projectId: "atlas", title: "Scope", content: "Atlas uses a synthetic SQLite MVP." },
    { projectId: "orion", title: "Cadence", content: "Orion meets on Thursdays." },
  ]);
  return { app: createApp({ database, tutor: makeTutor() }), database, sqlite };
}

let fixture: Awaited<ReturnType<typeof createFixture>>;
beforeEach(async () => {
  fixture = await createFixture();
});
afterEach(() => fixture.sqlite.close());

describe("course and learner progress routes", () => {
  test("serves six modules from Markdown with previous lesson sections", async () => {
    const response = await fixture.app.request("/api/course");
    expect(response.status).toBe(200);
    const modules = courseModuleSchema.array().parse(await response.json());
    expect(modules).toHaveLength(6);
    expect(modules[0]?.markdown).toContain("Prompt reutilizable de Codex");
    expect(modules[0]?.markdown).toContain("Cómo verificar");
    expect(modules.map((module) => module.id)).toEqual([
      "semana-1-equipo",
      "semana-2-datos",
      "semana-2-api",
      "semana-3-ui",
      "semana-3-ia",
      "semana-4-qa",
    ]);
  });

  test("serves the curriculum overview and layered capstone walkthrough", async () => {
    const overview = curriculumPageSchema.parse(await (await fixture.app.request("/api/course/overview")).json());
    const walkthrough = curriculumPageSchema.parse(await (await fixture.app.request("/api/course/walkthrough")).json());
    expect(overview.markdown).toContain("cuatro semanas");
    expect(walkthrough.markdown).toContain("React/Vike");
    expect(walkthrough.markdown).toContain("Drizzle");
    expect(walkthrough.markdown).toContain("paralelo");
  });

  test("persists completion and reflection for the local learner", async () => {
    const response = await fixture.app.request("/api/progress/semana-1-equipo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true, reflection: "La revisión humana confirma el plan." }),
    });
    expect(response.status).toBe(200);
    expect(courseModuleSchema.parse(await response.json()).completed).toBe(true);
    const listResponse = await fixture.app.request("/api/course");
    const modules = courseModuleSchema.array().parse(await listResponse.json());
    expect(modules[0]?.reflection).toBe("La revisión humana confirma el plan.");
  });

  test("validates progress input and unknown module IDs", async () => {
    const bad = await fixture.app.request("/api/progress/semana-1-equipo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: "yes", reflection: [] }),
    });
    expect(bad.status).toBe(400);
    const missing = await fixture.app.request("/api/progress/missing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true, reflection: "" }),
    });
    expect(missing.status).toBe(404);
  });
});

describe("grounded tutor routes", () => {
  test("validates provider configuration and defaults to mock", () => {
    expect(validateTutorConfiguration({}).AI_TUTOR_PROVIDER).toBe("mock");
    expect(
      validateTutorConfiguration({ AI_TUTOR_PROVIDER: "mock", OPENAI_API_KEY: "", AI_TUTOR_MODEL: "" })
        .AI_TUTOR_PROVIDER,
    ).toBe("mock");
    expect(() => validateTutorConfiguration({ AI_TUTOR_PROVIDER: "openai" })).toThrow();
    expect(() => validateTutorConfiguration({ AI_TUTOR_PROVIDER: "unsupported" })).toThrow();
  });

  test("returns a course citation for matching curriculum evidence", async () => {
    const response = await fixture.app.request("/api/tutor/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: "semana-2-datos", question: "Drizzle SQLite migración", role: "datos" }),
    });
    expect(response.status).toBe(200);
    const result = tutorResponseSchema.parse(await response.json());
    expect(result.evidenceStatus).toBe("supported");
    expect(result.references[0]?.moduleId).toBe("semana-2-datos");
    expect(result.references[0]?.sectionHeading).toBeTruthy();
  });

  test("reports insufficient evidence with no references", async () => {
    const response = await fixture.app.request("/api/tutor/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "¿Qué temperatura hace hoy en Marte?" }),
    });
    const result = tutorResponseSchema.parse(await response.json());
    expect(result.evidenceStatus).toBe("insufficient");
    expect(result.references).toHaveLength(0);
  });

  test("does not invent evidence when a question has no searchable terms", async () => {
    const response = await fixture.app.request("/api/tutor/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "¿Para qué?" }),
    });
    const result = tutorResponseSchema.parse(await response.json());
    expect(result.evidenceStatus).toBe("insufficient");
    expect(result.references).toEqual([]);
  });

  test("rejects a citation ID outside the selected evidence", async () => {
    const app = createApp({
      database: fixture.database,
      tutor: async () => ({
        answer: "Respuesta sin fuente válida.",
        evidenceStatus: "supported",
        sourceIds: ["forged-id"],
        provider: "mock",
      }),
    });
    const response = await app.request("/api/tutor/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: "semana-1-equipo", question: "¿Cómo se aprueba el plan?" }),
    });
    const result = tutorResponseSchema.parse(await response.json());
    expect(result.evidenceStatus).toBe("insufficient");
    expect(result.references).toEqual([]);
  });

  test("evaluates supported and deliberately unanswerable questions", async () => {
    for (const item of tutorEvaluationSet) {
      const response = await fixture.app.request("/api/tutor/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: item.question }),
      });
      const result = tutorResponseSchema.parse(await response.json());
      if (result.evidenceStatus !== item.expected) throw new Error(`Evaluation mismatch: ${item.question}`);
      expect(result.evidenceStatus).toBe(item.expected);
      expect(item.expected === "supported" ? result.references.length > 0 : result.references.length === 0).toBe(true);
    }
  });
});

describe("knowledge base learner flow", () => {
  test("stores a note and keeps both query and citation inside the selected project", async () => {
    const saved = await fixture.app.request("/api/knowledge/projects/atlas/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Launch marker", content: "The Atlas launch marker is cobalt." }),
    });
    expect(saved.status).toBe(201);
    const note = (await saved.json()) as { id: number };
    const supported = await fixture.app.request("/api/knowledge/projects/atlas/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "What is the Atlas launch marker?" }),
    });
    const supportedResult = tutorResponseSchema.parse(await supported.json());
    expect(supportedResult.evidenceStatus).toBe("supported");
    expect(supportedResult.references.map((reference) => reference.id)).toContain(String(note.id));
    expect(supportedResult.references.every((reference) => reference.projectId === "atlas")).toBe(true);

    const isolated = await fixture.app.request("/api/knowledge/projects/orion/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "What is the Atlas launch marker?" }),
    });
    const isolatedResult = tutorResponseSchema.parse(await isolated.json());
    expect(isolatedResult.evidenceStatus).toBe("insufficient");
    expect(isolatedResult.references).toEqual([]);
  });

  test("validates note and question payloads and handles unknown project", async () => {
    const invalidNote = await fixture.app.request("/api/knowledge/projects/atlas/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "", content: "" }),
    });
    expect(invalidNote.status).toBe(400);
    const invalidAsk = await fixture.app.request("/api/knowledge/projects/atlas/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "   " }),
    });
    expect(invalidAsk.status).toBe(400);
    const missingProject = await fixture.app.request("/api/knowledge/projects/missing/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "hello" }),
    });
    expect(missingProject.status).toBe(404);
  });
});

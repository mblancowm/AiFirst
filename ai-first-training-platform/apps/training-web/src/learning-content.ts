import type { CourseLanguage, PromptItem, RoleKey } from "./types";

export const roles: { key: RoleKey; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "api", label: "Backend / API" },
  { key: "datos", label: "Base de datos" },
  { key: "qa", label: "QA / pruebas" },
  { key: "producto", label: "Producto / diseño" },
];

export const teamSkills = [
  [
    "Aclarar una solicitud",
    "Traducir una necesidad en alcance, criterios observables, supuestos y preguntas que bloquean.",
  ],
  [
    "Crear un plan de funcionalidad",
    "Inspeccionar el repositorio, proponer pasos y archivos, y dejar el plan en borrador para aprobación humana.",
  ],
  [
    "Registrar una decisión (ADR)",
    "Comparar alternativas y documentar consecuencias cuando una decisión material lo requiere.",
  ],
  [
    "Revisar un pull request",
    "Buscar defectos accionables con prioridad, escenario y evidencia; no aprueba ni fusiona.",
  ],
  [
    "Atender comentarios de revisión",
    "Clasificar comentarios y preparar respuestas con base en el objetivo, el diff y las pruebas.",
  ],
  [
    "Preparar el handoff",
    "Dejar objetivo, decisiones, verificación observada, límites y siguiente paso para otra persona.",
  ],
];

export const roleSkills = [
  {
    role: "Producto / arquitectura",
    title: "Registrar una decisión técnica",
    stack: "ADR, contratos y decisiones de producto",
  },
  { role: "Backend / API", title: "Crear un endpoint de API", stack: "Bun, Hono y Zod" },
  { role: "Base de datos", title: "Preparar un cambio de esquema", stack: "Drizzle, SQLite y PostgreSQL" },
  { role: "Frontend", title: "Crear un componente web", stack: "React, TypeScript estricto, Vike y Tailwind" },
  {
    role: "QA / revisión cruzada",
    title: "Revisar un cambio entre roles",
    stack: "Criterios, evidencia, CI y revisión humana",
  },
];

export const prompts: PromptItem[] = [
  {
    code: "P0",
    title: "Aclarar una solicitud",
    audience: "Antes de editar",
    role: "General",
    body: "No edites archivos. Convierte esta solicitud en resultado esperado, alcance incluido y excluido, criterios comprobables, supuestos y preguntas que bloquean el trabajo. No inventes requisitos ni propongas una solución técnica antes de entender el problema.\n\nSolicitud: [pegar texto autorizado]\nContexto: [rutas o contratos relacionados]\nRestricciones: [límites y política de datos]",
  },
  {
    code: "P1",
    title: "Inspeccionar y planificar",
    audience: "Planning first",
    role: "General",
    body: "Lee AGENTS.md y README. Inspecciona el flujo relacionado sin editar. Devuelve comportamiento actual con rutas, plan corto, dependencias, riesgos y comprobaciones. Comprueba cómo aplica el stack aprobado: React + TypeScript estricto, Vike, Bun + Hono, Drizzle y SQLite/PostgreSQL. Deja el plan pendiente de aprobación humana.",
  },
  {
    code: "P2",
    title: "Implementar el plan aprobado",
    audience: "Durante la construcción",
    role: "General",
    body: "Implementa solo el plan aprobado: [enlace]. Criterios: [lista]. Valida entradas con Zod y preserva los contratos. Haz el cambio pequeño. Revisa el diff, añade las comprobaciones pertinentes y reporta comandos y resultados que observaste. No amplíes el alcance.",
  },
  {
    code: "P3",
    title: "Diagnosticar un fallo",
    audience: "Al depurar",
    role: "General",
    body: "Compara resultado esperado y observado. Reproduce antes de corregir, sigue los datos entre React, Hono y Drizzle, y contrasta hipótesis con logs sin secretos y estado persistido. No ocultes el fallo ni debilites una prueba.",
  },
  {
    code: "P4",
    title: "Revisar un pull request",
    audience: "Revisión humana",
    role: "QA / revisión cruzada",
    body: "Revisa el diff contra el plan y criterios. Prioriza defectos de comportamiento, privacidad, seguridad, esquema, contrato y regresiones. Para cada hallazgo indica ubicación, escenario, evidencia e impacto. No apruebes el PR por la persona.",
  },
  {
    code: "P5",
    title: "Preparar una entrega",
    audience: "Antes del handoff",
    role: "General",
    body: "Relaciona cada criterio con evidencia observada. Resume objetivo, decisiones, comandos realmente ejecutados, limitaciones, impacto en datos y siguiente paso. No afirmes que lint, pruebas o build pasaron si no los ejecutaste.",
  },
  {
    code: "P6",
    title: "Comprobar que entiendo el cambio",
    audience: "Para aprender",
    role: "General",
    body: "Hazme preguntas sobre el diff y el flujo React → Hono → Drizzle. Empieza por una pista, pide que explique una decisión y señala qué evidencia permite confirmar el comportamiento. No supongas que el código generado es correcto.",
  },
];

const rolesEnglish: { key: RoleKey; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "api", label: "Backend / API" },
  { key: "datos", label: "Data / database" },
  { key: "qa", label: "QA / testing" },
  { key: "producto", label: "Product / design" },
];

const teamSkillsEnglish = [
  ["Clarify a request", "Turn a need into scope, observable criteria, assumptions, and blocking questions."],
  ["Plan a feature", "Inspect the repository, suggest steps and files, and leave the plan for human approval."],
  ["Record a decision (ADR)", "Compare options and document tradeoffs when a material decision is needed."],
  [
    "Review a pull request",
    "Find actionable defects with priority, scenario, and evidence; do not approve or merge it.",
  ],
  ["Respond to review comments", "Classify comments and prepare replies based on the goal, diff, and tests."],
  ["Prepare a handoff", "Leave the goal, decisions, observed checks, limits, and next step for someone else."],
];

const roleSkillsEnglish = [
  {
    role: "Product / architecture",
    title: "Record a technical decision",
    stack: "ADRs, contracts, and product decisions",
  },
  { role: "Backend / API", title: "Create an API endpoint", stack: "Bun, Hono, and Zod" },
  { role: "Data / database", title: "Prepare a schema change", stack: "Drizzle, SQLite, and PostgreSQL" },
  { role: "Frontend", title: "Create a web component", stack: "React, strict TypeScript, Vike, and Tailwind" },
  {
    role: "QA / cross-review",
    title: "Review a change across roles",
    stack: "Criteria, evidence, CI, and human review",
  },
];

const promptsEnglish: PromptItem[] = [
  {
    code: "P0",
    title: "Clarify a request",
    audience: "Before editing",
    role: "General",
    body: "Do not edit files. Turn this request into an expected result, included and excluded scope, checkable criteria, assumptions, and questions that block the work. Do not invent requirements or suggest a technical solution before understanding the problem.\n\nRequest: [paste authorized text]\nContext: [related paths or contracts]\nConstraints: [limits and data policy]",
  },
  {
    code: "P1",
    title: "Inspect and plan",
    audience: "Planning first",
    role: "General",
    body: "Read AGENTS.md and README. Inspect the related workflow without editing. Report current behavior with file paths, a short plan, dependencies, risks, and checks. Confirm how the approved stack applies: React + strict TypeScript, Vike, Bun + Hono, Drizzle, and SQLite/PostgreSQL. Leave the plan for human approval.",
  },
  {
    code: "P2",
    title: "Implement the approved plan",
    audience: "While building",
    role: "General",
    body: "Implement only the approved plan: [link]. Criteria: [list]. Validate input with Zod and preserve contracts. Keep the change small. Review the diff, run relevant checks, and report commands and observed results. Do not expand the scope.",
  },
  {
    code: "P3",
    title: "Diagnose a failure",
    audience: "While debugging",
    role: "General",
    body: "Compare the expected and observed results. Reproduce the issue before fixing it, follow data through React, Hono, and Drizzle, and compare hypotheses with logs that contain no secrets and with saved state. Do not hide the failure or weaken a test.",
  },
  {
    code: "P4",
    title: "Review a pull request",
    audience: "Human review",
    role: "QA / cross-review",
    body: "Review the diff against the plan and criteria. Prioritize behavior, privacy, security, schema, contract, and regression defects. For each finding, include location, scenario, evidence, and impact. Do not approve the PR on someone else's behalf.",
  },
  {
    code: "P5",
    title: "Prepare a delivery",
    audience: "Before handoff",
    role: "General",
    body: "Connect each criterion to observed evidence. Summarize the goal, decisions, commands actually run, limits, data impact, and next step. Do not say lint, tests, or build passed unless you ran them.",
  },
  {
    code: "P6",
    title: "Check my understanding of a change",
    audience: "For learning",
    role: "General",
    body: "Ask me questions about the diff and the React → Hono → Drizzle flow. Start with a hint, ask me to explain a decision, and point out what evidence could confirm the behavior. Do not assume generated code is correct.",
  },
];

export const localizedRoles = (language: CourseLanguage) => (language === "en" ? rolesEnglish : roles);
export const localizedTeamSkills = (language: CourseLanguage) => (language === "en" ? teamSkillsEnglish : teamSkills);
export const localizedRoleSkills = (language: CourseLanguage) => (language === "en" ? roleSkillsEnglish : roleSkills);
export const localizedPrompts = (language: CourseLanguage) => (language === "en" ? promptsEnglish : prompts);
export const roleLabel = (key: RoleKey, language: CourseLanguage = "es") =>
  localizedRoles(language).find((role) => role.key === key)?.label ?? key;

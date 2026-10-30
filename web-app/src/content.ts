export const programFacts = [
  { value: "05", label: "semanas" },
  { value: "2–8", label: "horas por semana" },
  { value: "3–4", label: "personas por equipo" },
  { value: "01", label: "demo verificable" },
];

export const phases = [
  {
    week: "01",
    title: "Definir la base",
    summary: "Discovery & Research · Requirements & Planning · Architecture & Design.",
    outcome: "Alcance, plan, arquitectura, monorepo y skills acordados.",
  },
  {
    week: "02",
    title: "Desarrollar",
    summary: "Construir el flujo con los acuerdos y skills del equipo.",
    outcome: "Cambios pequeños con pruebas y evidencia.",
  },
  {
    week: "03",
    title: "Integrar y construir",
    summary: "Conectar cambios entre capas y mantener un build reproducible.",
    outcome: "Un flujo integrado y una construcción funcional.",
  },
  {
    week: "04",
    title: "Integrar y validar",
    summary: "Comprobar criterios, casos límite y errores con evidencia.",
    outcome: "Resultados de validación y defectos resueltos.",
  },
  {
    week: "05",
    title: "Demostrar",
    summary: "Presentar el flujo, la evidencia y los siguientes pasos.",
    outcome: "Una demo verificable y un repo listo para continuar.",
  },
];

export const skills = [
  {
    id: "monorepo",
    title: "Set Up and Validate the Monorepo",
    category: "Contexto compartido",
    summary: "Organiza el repositorio y deja claro el contexto que necesita el agente.",
  },
  {
    id: "plan",
    title: "Create a Feature Plan",
    category: "Antes de construir",
    summary: "Convierte una solicitud en un plan verificable antes de empezar a programar.",
  },
  {
    id: "adr",
    title: "Record an ADR",
    category: "Decisiones técnicas",
    summary: "Registra opciones, trade-offs y consecuencias de una decisión.",
  },
  {
    id: "review",
    title: "PR Code Review",
    category: "Calidad compartida",
    summary: "Busca defectos con evidencia ligada al objetivo del cambio.",
  },
  {
    id: "triage",
    title: "PR Triage",
    category: "Colaboración",
    summary: "Clasifica comentarios y prepara respuestas basadas en el código.",
  },
  {
    id: "delivery",
    title: "Create a PR",
    category: "Entrega",
    summary: "Resume el propósito, los cambios y las comprobaciones reales.",
  },
] as const;

export const exampleTeam = {
  project: "Base de conocimiento",
  projectSummary: "Buscar y editar artículos de práctica.",
  members: [
    { name: "Ana López", initials: "AL", role: "API / Backend" },
    { name: "Mateo Solís", initials: "MS", role: "Datos" },
    { name: "Camila Rojas", initials: "CR", role: "Frontend" },
    { name: "Diego Vargas", initials: "DV", role: "QA / Pruebas" },
  ],
};

export type ProgramPhase = (typeof phases)[number];
export type ProgramSkill = (typeof skills)[number];

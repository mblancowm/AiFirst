export type CodexDecisionBucket = {
  number: string;
  title: string;
  need: string;
  pattern: string;
  improvement: string;
};

export const codexDecisionBuckets: CodexDecisionBucket[] = [
  {
    number: "01",
    title: "Contexto del repositorio y planificación",
    need: "Hace falta compartir convenciones, comandos, decisiones o el estado del trabajo entre sesiones.",
    pattern: "AGENTS.md · artefacto de planificación",
    improvement: "Repetibilidad, continuidad y expectativas revisables.",
  },
  {
    number: "02",
    title: "Procedimientos reutilizables y distribución",
    need: "Una tarea frecuente necesita pasos y resultados consistentes, o el flujo debe distribuirse como paquete.",
    pattern: "Skill · plugin",
    improvement: "Ejecución repetible o distribución mantenible.",
  },
  {
    number: "03",
    title: "Sistemas y herramientas externas",
    need: "El flujo requiere consultar una fuente autorizada o usar una herramienta conectada.",
    pattern: "MCP",
    improvement: "Acceso a contexto o herramientas externas con permisos definidos.",
  },
  {
    number: "04",
    title: "Comprobaciones y políticas del flujo",
    need: "Se requieren acciones ligadas a eventos, aprobaciones de comandos o límites compartidos del cliente.",
    pattern: "Hook · rule · requirements / managed configuration",
    improvement: "Observabilidad y controles adecuados a cada capa.",
  },
  {
    number: "05",
    title: "Trabajo paralelo o recurrente",
    need: "Un trabajo se puede dividir en tareas acotadas o debe repetirse en un horario o ciclo.",
    pattern: "Subagents · Codex automation",
    improvement: "Escala de trabajo con un responsable de integración y seguimiento.",
  },
  {
    number: "06",
    title: "Integración programática o alojada",
    need: "Se necesita ejecución no interactiva, integrar Codex en una app, una acción de GitHub o un disparador externo.",
    pattern: "codex exec · SDK · App Server · GitHub Action · external orchestration",
    improvement: "Integración repetible según el runtime, el disparador y el modelo de revisión.",
  },
  {
    number: "07",
    title: "Revisión nativa de pull requests",
    need: "El flujo es revisar un pull request directamente en GitHub.",
    pattern: "@codex review · Automatic reviews · guía del repo",
    improvement: "Revisiones coherentes con las instrucciones del repositorio.",
  },
];

export type CodexMechanism = {
  name: string;
  bucket: string;
  useWhen: string;
  owner: string;
  boundary: string;
  limit: string;
};

export const codexMechanisms: CodexMechanism[] = [
  {
    name: "AGENTS.md / guía del repositorio",
    bucket: "Contexto y planificación",
    useWhen: "Hay convenciones, comandos o expectativas de revisión que deben orientar el trabajo en el repo.",
    owner: "Responsable del repositorio o de ingeniería",
    boundary: "Árbol del repositorio y jerarquía de instrucciones.",
    limit: "No es una capa central de enforcement ni concede permisos.",
  },
  {
    name: "Artefacto de planificación",
    bucket: "Contexto y planificación",
    useWhen: "El trabajo necesita decisiones por etapas, supuestos registrados o continuidad para el handoff.",
    owner: "Responsable de la tarea o del proyecto",
    boundary: "Documento versionado del proyecto o repositorio.",
    limit: "No define políticas ni permisos.",
  },
  {
    name: "Skill",
    bucket: "Procedimientos y distribución",
    useWhen: "Un procedimiento recurrente necesita instrucciones, referencias, scripts o un formato de salida reutilizable.",
    owner: "Responsable del skill o del workflow",
    boundary: "Instrucciones y recursos incluidos con el skill.",
    limit: "Si basta una nota o un prompt breve, no hace falta crear un skill.",
  },
  {
    name: "Plugin",
    bucket: "Procedimientos y distribución",
    useWhen: "Se requiere instalar o distribuir un paquete que puede reunir varias capacidades.",
    owner: "Responsable del plugin o administrador",
    boundary: "Paquete y capacidades incluidas: skills, apps, servidores, hooks, datos y acciones.",
    limit: "Revisa cada capacidad por separado; plugin y skill no significan lo mismo.",
  },
  {
    name: "MCP",
    bucket: "Sistemas y herramientas externas",
    useWhen: "El workflow necesita contexto aprobado o herramientas de otro sistema.",
    owner: "Responsable del sistema o de la herramienta",
    boundary: "Alcance del servidor, autorización de la fuente, permisos y aprobaciones.",
    limit: "MCP por sí solo no gobierna el workflow ni concede acceso general.",
  },
  {
    name: "Hook",
    bucket: "Comprobaciones y políticas",
    useWhen: "Una comprobación, notificación o handler debe ejecutarse durante un evento del ciclo de vida.",
    owner: "Responsable del proyecto o de la plataforma",
    boundary: "Evento del hook y contexto de ejecución.",
    limit: "No debe ser el único control para una operación de alto riesgo.",
  },
  {
    name: "Rule",
    bucket: "Comprobaciones y políticas",
    useWhen: "Un comando debe requerir aprobación fuera del sandbox.",
    owner: "Responsable del proyecto o de la plataforma",
    boundary: "Regla del comando y ruta de aprobación.",
    limit: "No es un rol, un permiso del repositorio ni una concesión de acceso.",
  },
  {
    name: "Requirements / managed configuration",
    bucket: "Comprobaciones y políticas",
    useWhen: "Se deben limitar de forma centralizada las capacidades de clientes compatibles.",
    owner: "Administración, seguridad o plataforma",
    boundary: "Política distribuida y ajustes del runtime compatible.",
    limit: "No concede acceso al repo, modelos, APIs ni sistemas conectados.",
  },
  {
    name: "Subagents",
    bucket: "Trabajo paralelo o recurrente",
    useWhen: "Una tarea acotada puede dividirse entre especialistas que trabajen en paralelo.",
    owner: "Responsable de la tarea y persona revisora",
    boundary: "Encargo delegado, contrato de resumen y punto de integración.",
    limit: "No conviene para trabajo indivisible ni cambios paralelos que se pisan.",
  },
  {
    name: "Codex automation",
    bucket: "Trabajo paralelo o recurrente",
    useWhen: "El seguimiento debe ejecutarse de forma programada o repetirse en un proyecto o hilo.",
    owner: "Responsable de la automatización o workflow",
    boundary: "Disparador, runtime, monitoreo, frecuencia de revisión y mecanismo para desactivarla.",
    limit: "Primero demuestra que el workflow es estable y que puede supervisarse.",
  },
  {
    name: "Native GitHub code review",
    bucket: "Revisión nativa en GitHub",
    useWhen: "La tarea consiste en revisar un pull request dentro de GitHub.",
    owner: "Responsable del repositorio o de code review",
    boundary: "Codex Cloud, repositorio de GitHub y guía de revisión del repo.",
    limit: "No es igual a preparar una revisión personalizada ni a una GitHub Action.",
  },
  {
    name: "codex exec",
    bucket: "Integración programática o alojada",
    useWhen: "Se necesita ejecutar Codex mediante un proceso automatizado no interactivo.",
    owner: "Responsable de CI o de implementación",
    boundary: "CLI, runtime, workspace, credenciales y manejo de resultados.",
    limit: "Por sí solo no define la programación, permisos ni gobernanza.",
  },
  {
    name: "Codex SDK",
    bucket: "Integración programática o alojada",
    useWhen: "Una aplicación o servicio requiere integrar Codex mediante código.",
    owner: "Responsable de la aplicación",
    boundary: "Autenticación, runtime y modelo de revisión de la aplicación.",
    limit: "No hace falta para el uso interactivo habitual.",
  },
  {
    name: "App Server",
    bucket: "Integración programática o alojada",
    useWhen: "Un cliente propio requiere eventos en streaming, historial, autenticación y gestión de aprobaciones.",
    owner: "Responsable de la aplicación o de la plataforma",
    boundary: "Servidor, sesiones, autenticación y runtime.",
    limit: "El material adjunto lo marca experimental para producción; confirma la documentación oficial vigente antes de adoptarlo.",
  },
  {
    name: "GitHub Action",
    bucket: "Integración programática o alojada",
    useWhen: "Codex debe formar parte de un workflow de GitHub Actions.",
    owner: "Responsable del repositorio o de la plataforma",
    boundary: "Permisos del workflow, secretos, alcance del repo y protecciones de ramas.",
    limit: "No equivale a la revisión nativa de Codex para pull requests.",
  },
  {
    name: "External orchestration",
    bucket: "Integración programática o alojada",
    useWhen: "Un sistema externo aprobado debe iniciar o coordinar el trabajo de Codex.",
    owner: "Responsable de la integración o del workflow",
    boundary: "Evento externo, credenciales, runtime, monitoreo y reversión.",
    limit: "Si basta una acción manual o una función integrada, la orquestación añade complejidad sin necesidad.",
  },
];

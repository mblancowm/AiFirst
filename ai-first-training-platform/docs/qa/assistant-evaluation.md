# Evaluación del tutor de aprendizaje

El conjunto está sincronizado con `apps/training-api/src/tutor-evaluation.ts` y se ejecuta como parte de `bun run test`. `supported` requiere al menos una referencia válida; `insufficient` requiere respuesta de abstención y cero referencias.

| # | Pregunta | Resultado esperado |
| --- | --- | --- |
| 1 | Drizzle SQLite migración | Evidencia |
| 2 | Hono API Zod | Evidencia |
| 3 | React Vike TypeScript | Evidencia |
| 4 | AI SDK citas | Evidencia |
| 5 | proyecto notas projectId | Evidencia |
| 6 | gateway SSO | Evidencia |
| 7 | pull request revisión humana | Evidencia |
| 8 | roles API datos UI | Evidencia |
| 9 | ¿Qué temperatura hace hoy en Marte? | Insuficiente |
| 10 | ¿Cuántos puntos Shoutout entrega el curso? | Insuficiente |
| 11 | ¿Cuántas lunas tiene Júpiter? | Insuficiente |
| 12 | ¿Qué credenciales de SharePoint debo usar? | Insuficiente |

El mock evalúa coincidencia de términos para que el resultado sea reproducible; no es una medida de calidad semántica de un modelo. Cuando se configure un proveedor aprobado, revisa manualmente sus respuestas además de mantener estas pruebas de contrato y citas.

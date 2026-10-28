export type SkillDetail = {
  purpose: string;
  when: string;
  inputs: string[];
  result: string;
  workflow: string[];
  prompt: string;
  templateTitle: string;
  templateIntro: string;
  template: string;
};

export const skillDetails: Record<string, SkillDetail> = {
  monorepo: {
    purpose: "Establecer la estructura del repositorio y el contexto persistente del agente, y comprobar que estén los elementos acordados.",
    when: "Al iniciar el repositorio del equipo o revisar que el harness siga completo.",
    inputs: [
      "Estructura actual y convenciones del repositorio.",
      "Inventario de archivos que el equipo ya aprobó.",
      "Comandos, planes y decisiones vigentes.",
    ],
    result: "Un reporte que clasifica cada elemento como presente, ausente, incompleto o no aplica. Si se solicita inicializar, propone solo los cambios aprobados.",
    workflow: [
      "Lee las instrucciones y decisiones actuales del repositorio.",
      "Compara la estructura real con el inventario acordado por el equipo.",
      "Señala brechas con evidencia y separa lo pendiente de lo que no aplica.",
      "Si se solicita inicializar, modifica únicamente los elementos aprobados que falten.",
    ],
    prompt: "Crea un skill llamado “Set Up and Validate the Monorepo”. Usa el inventario aprobado y las instrucciones vigentes del repositorio. El archivo de contexto del agente es esencial: `AGENTS.md` cuando el equipo use Codex, `CLAUDE.md` cuando use Claude Code, y ambos si acuerda usar las dos herramientas. El skill debe ayudar a crear y validar ese archivo, comprobando que describa el propósito del proyecto, el mapa del repositorio, comandos de desarrollo y validación, convenciones, dónde leer el plan aprobado y qué decisiones requieren revisión humana. Después valida las demás carpetas y archivos aprobados; clasifica cada uno como presente, ausente, incompleto o no aplica. No debe exigir documentos que solo aparezcan en ejemplos ni crear un archivo Markdown para cada tema. Si se solicita inicializar, debe crear solo los elementos aprobados que falten y no sobrescribir archivos sin autorización. Al crear este skill, crea únicamente su archivo; no inicialices ni modifiques el monorepo.",
    templateTitle: "Formato de revisión del inventario",
    templateIntro: "Usa la lista que el equipo aprobó. No conviertas ejemplos de documentos en requisitos automáticos.",
    template: `# Validación del monorepo

| Elemento acordado | Estado | Evidencia o brecha |
|---|---|---|
| Instrucciones del agente | Presente / Ausente / Incompleto / No aplica | ... |
| Comandos de desarrollo y validación | Presente / Ausente / Incompleto / No aplica | ... |
| Planes y decisiones aprobados | Presente / Ausente / Incompleto / No aplica | ... |
| Estructura y paquetes acordados | Presente / Ausente / Incompleto / No aplica | ... |

## Próximos pasos
- Cambios aprobados que faltan:
- Decisiones pendientes:
- Evidencia revisada:`,
  },
  plan: {
    purpose: "Convertir una solicitud en un plan revisable, consistente con el formato del equipo y listo para aprobación antes de codificar.",
    when: "Ante una funcionalidad nueva, un cambio de alcance o trabajo que necesite revisión antes de codificar.",
    inputs: [
      "Solicitud, objetivo y personas usuarias afectadas.",
      "Convenciones, contratos y arquitectura existentes.",
      "Planes, criterios y decisiones aprobados relacionados.",
    ],
    result: "Un plan en borrador con alcance, criterios verificables, tareas, riesgos y validación; queda listo para revisión humana antes de implementar.",
    workflow: [
      "Analiza la solicitud y el repositorio antes de proponer la solución.",
      "Separa hechos, supuestos, alternativas y preguntas abiertas.",
      "Define alcance, criterios, dependencias, riesgos y validación.",
      "Deja el plan en borrador; no escribas código ni inventes decisiones aprobadas.",
    ],
    prompt: "Crea un skill llamado “Create a Feature Plan”. Inspecciona los planes y plantillas aprobados y sigue la convención del equipo. Analiza el requerimiento y el repositorio: objetivo, alcance, criterios verificables, patrones existentes, componentes afectados, contratos, dependencias, riesgos, alternativas, validación y reversión cuando aplique. Separa hechos, supuestos y preguntas abiertas; no inventes decisiones ni escribas código. Deja el resultado en borrador para revisión humana. Al crear este skill, crea únicamente su archivo y no un plan de funcionalidad real.",
    templateTitle: "Plan por funcionalidad",
    templateIntro: "Adapta secciones y ubicación al flujo del equipo. Marca como “No aplica” lo que no corresponda y explica por qué.",
    template: `# Plan: <nombre de la funcionalidad>

**Estado:** Borrador | En revisión | Aprobado | Bloqueado | Completado
**Issue:** <enlace o identificador>
**Responsable:** <persona o rol>

## 1. Objetivo y contexto
- Problema o necesidad:
- Personas beneficiadas y resultado esperado:

## 2. Alcance
### Incluye
- ...
### No incluye
- ...

## 3. Criterios de aceptación
- [ ] <resultado observable y verificable>

## 4. Análisis realizado
- Estado actual y patrones del repositorio:
- Impacto, contratos y dependencias:
- Riesgos, casos límite y mitigaciones:
- Alternativas y decisiones pendientes:

## 5. Solución propuesta
- Descripción de alto nivel:
- Componentes afectados:

## 6. Secuencia de trabajo
1. ...

## 7. Validación
- Pruebas y checks:
- Validación manual o demo:
- Criterios cubiertos:

## 8. Despliegue y reversión
- Pasos y plan de reversión, si aplica:

## 9. Supuestos y preguntas abiertas
- ...

## 10. Aprobación
- Revisor, estado y comentarios:`,
  },
  adr: {
    purpose: "Documentar una decisión relevante, sus opciones y sus consecuencias para que el equipo pueda entenderla después.",
    when: "Cuando una decisión afecte arquitectura, contratos, datos, seguridad, operación o una dependencia importante.",
    inputs: [
      "Contexto, restricciones y evidencia de la decisión.",
      "Criterios y opciones que se evaluaron.",
      "Formato, ubicación, numeración y estados acordados por el repositorio.",
    ],
    result: "Un ADR que conserva el contexto, opciones y consecuencias. Una propuesta no se presenta como decisión aceptada sin aprobación explícita.",
    workflow: [
      "Localiza la convención y los ADRs existentes antes de crear uno.",
      "Documenta criterios y alternativas con sus trade-offs.",
      "Registra la decisión como propuesta si aún no hay aprobación.",
      "Incluye consecuencias, validación o seguimiento y referencias.",
    ],
    prompt: "Crea un skill llamado “Record an ADR”. Localiza la ubicación y la plantilla de ADR acordadas por el repositorio; si no existen, propone una plantilla con contexto, criterios, opciones, decisión, consecuencias, validación y referencias, y pide que el equipo apruebe una ubicación antes de crear un ADR. Inspecciona los ADRs existentes para seguir su numeración, formato y vocabulario de estados. El skill debe preservar la diferencia entre propuesta y decisión aceptada; no debe inventar consenso ni cambiar un ADR a Aceptado sin aprobación explícita. Si la decisión pertenece a otra sección del plan o todavía falta evidencia, debe señalarlo. Al crear este skill, crea únicamente su archivo en la ubicación acordada de skills; no registres un ADR real.",
    templateTitle: "Estructura de un ADR",
    templateIntro: "Confirma la ubicación y los estados permitidos en el repositorio antes de usar esta referencia.",
    template: `# ADR <número>: <título de la decisión>

**Estado:** Propuesto | Aceptado | Rechazado | Reemplazado
**Fecha:** <AAAA-MM-DD>
**Responsables:** <personas o roles>

## Contexto
¿Qué situación requiere una decisión? Incluye restricciones y evidencia.

## Criterios de decisión
- ...

## Opciones consideradas
### Opción A
- Ventajas:
- Costos o riesgos:
### Opción B
- Ventajas:
- Costos o riesgos:

## Decisión
¿Qué opción se propone o se acepta, y por qué?

## Consecuencias
- Beneficios:
- Costos, riesgos o trabajo posterior:

## Plan de validación o seguimiento
- ...

## Referencias
- Issue, plan, contrato u otros ADRs:`,
  },
  review: {
    purpose: "Analizar el código de un PR frente a su objetivo y comportamiento esperado para identificar defectos, regresiones o riesgos con evidencia.",
    when: "Cuando se necesita una revisión técnica del diff de un PR antes de integrar los cambios.",
    inputs: [
      "PR, diff y alcance exacto de la revisión.",
      "Objetivo, plan aprobado y criterios de aceptación.",
      "Contexto de archivos, contratos y validaciones observadas.",
    ],
    result: "Hallazgos accionables con prioridad, ubicación, evidencia, impacto y corrección sugerida; o una declaración explícita de que no se encontraron defectos en el alcance revisado.",
    workflow: [
      "Confirma el PR, el diff y el alcance revisado.",
      "Compara el cambio con el objetivo, el plan y sus criterios.",
      "Revisa comportamiento, casos límite, seguridad y contratos afectados.",
      "Reporta problemas con evidencia y resume la cobertura revisada.",
    ],
    prompt: "Crea un skill llamado “PR Code Review”. Sigue las convenciones del repositorio. Compara el diff con el objetivo, el plan aprobado y los criterios de aceptación. Revisa en pasadas separadas el comportamiento, los casos límite y las regresiones; la seguridad y privacidad; y el cumplimiento del plan, contratos y políticas del proyecto. Lee suficiente contexto de los archivos afectados. Reporta hallazgos accionables con área, prioridad, ubicación, evidencia, impacto y corrección o validación sugerida. No repitas hallazgos que CI ya cubre y limita las observaciones de estilo a las que tengan impacto real. Si no encuentra defectos, indícalo y resume el alcance revisado. Registra los checks observados sin afirmar resultados que no tengan evidencia. El skill produce hallazgos y recomendaciones: no modifica archivos, no publica comentarios ni aprueba o fusiona el PR. Al crear este skill, crea únicamente su archivo; no revises un PR real.",
    templateTitle: "Reporte de code review",
    templateIntro: "Adapta las prioridades y el alcance a las reglas del repositorio. No afirmes checks que no se observaron.",
    template: `# Code review del PR <número o enlace>

## Contexto
- Objetivo del PR:
- Plan / issue y criterios relacionados:
- Base y alcance revisado:

## Hallazgos
| Área | Prioridad | Archivo y línea | Evidencia | Impacto | Corrección sugerida |
|---|---|---|---|---|---|
| Comportamiento / Seguridad / Plan y políticas | P1/P2/P3/P4 | ... | ... | ... | ... |

## Cobertura revisada
- Flujos, contratos y casos límite:
- Pruebas y checks observados:
- Evidencia faltante:

## Resumen
- Hallazgos bloqueantes:
- Preguntas abiertas:
- Recomendación a la persona revisora:`,
  },
  triage: {
    purpose: "Atender comentarios e issues de un PR, distinguiendo solicitudes válidas, preguntas, preferencias y temas ya resueltos.",
    when: "Cuando se solicita revisar comentarios, atender feedback o evaluar hallazgos asociados a un PR.",
    inputs: [
      "PR, objetivo y diff relevante.",
      "Comentarios e issues abiertos.",
      "Contexto del plan, contratos y checks disponibles.",
    ],
    result: "Un análisis que clasifica cada comentario y propone una corrección o respuesta. Los cambios de código y las respuestas externas siguen requiriendo autorización.",
    workflow: [
      "Consulta el PR, su objetivo, el diff y los issues o comentarios abiertos.",
      "Clasifica cada punto como corrección, pregunta, preferencia, duplicado o resuelto.",
      "Explica la evidencia y plantea corrección o respuesta.",
      "Espera autorización antes de cambiar código; publica respuestas solo cuando se solicite.",
    ],
    prompt: "Crea un skill llamado “PR Triage”. Revisa las convenciones del repositorio y usa un reporte que registre contexto, comentarios e issues, validaciones observadas y siguientes pasos. Consulta el contexto y evidencia relevante para cada comentario o issue; clasifica cada punto y propone una corrección o respuesta precisa. Antes de modificar código, presenta la corrección y espera autorización del usuario. Después de un cambio autorizado, prepara una respuesta por comentario que explique qué se hizo o por qué no se aplica; publícala solo cuando el usuario lo solicite. No apruebes ni fusiones el PR. Al crear este skill, crea únicamente el archivo del skill; no atiendas un PR real.",
    templateTitle: "Reporte de triage",
    templateIntro: "Clasifica comentarios con su contexto y deja claro qué acciones siguen pendientes de autorización.",
    template: `# Comentarios e issues del PR <número o enlace>

## Contexto
- Objetivo del PR:
- Plan / issue relacionado:
- Alcance revisado:

## Comentarios e issues
| Referencia | Estado | Análisis y evidencia | Corrección o respuesta propuesta |
|---|---|---|---|
| Comentario o issue | Abierto / Resuelto / Pregunta | ... | ... |

## Validaciones observadas
- Checks aprobados:
- Checks fallidos o pendientes:
- Validaciones no ejecutadas:

## Siguiente paso
- Corrección que requiere autorización:
- Respuestas listas para publicar:
- Preguntas abiertas:`,
  },
  delivery: {
    purpose: "Preparar una descripción de PR que conecte el cambio con su plan, issue y evidencia de validación.",
    when: "Cuando el usuario solicita abrir un PR para cambios que ya están preparados.",
    inputs: [
      "Estado de Git, rama y diff.",
      "Plan, issue y ADR relacionados, si existen.",
      "Plantilla del repositorio y resultados reales de validación.",
    ],
    result: "Un PR que conecta objetivo y cambios con referencias, validaciones reales y riesgos. Crear el PR requiere una solicitud explícita; nunca se fusiona.",
    workflow: [
      "Inspecciona plantilla, convenciones de rama, checks y estado de Git.",
      "Compara el diff con el plan y señala desviaciones de alcance.",
      "Resume cambios, referencias, validación real y riesgos.",
      "Crea o publica el PR solo cuando el usuario lo solicite; no lo fusiones.",
    ],
    prompt: "Crea un skill llamado “Create a PR”. Inspecciona la plantilla de PR, las convenciones de ramas, los checks requeridos y las instrucciones del repositorio. Si no existe una plantilla acordada, propone una con propósito, cambios, referencias, validación, riesgos y checklist. Revisa el diff frente al plan aprobado y señala cualquier cambio de alcance o desviación que deba documentarse. El skill debe revisar el estado de Git, vincular el PR con el plan, el issue y el ADR cuando correspondan, y resumir propósito, cambios, validaciones reales y riesgos. Debe distinguir validaciones aprobadas, fallidas, pendientes y no ejecutadas; nunca afirmar que una prueba pasó si no hay evidencia. Debe crear o publicar el PR solo ante una solicitud explícita del usuario y nunca fusionarlo. Al crear este skill, crea únicamente su archivo en la ubicación acordada de skills; no abras un PR real.",
    templateTitle: "Descripción del pull request",
    templateIntro: "Usa la plantilla aprobada por el repositorio si existe; esta es la propuesta de referencia.",
    template: `## Propósito
¿Qué problema resuelve este cambio?

## Cambios incluidos
- ...

## Referencias
- Issue:
- Plan aprobado:
- ADR relacionado:

## Validación
- [ ] <comando o check ejecutado> — resultado:
- [ ] <prueba manual o evidencia>
- No ejecutado / pendiente:

## Riesgos e impacto
- ...

## Checklist del autor
- [ ] El alcance corresponde al plan aprobado.
- [ ] La documentación y los contratos afectados están actualizados.
- [ ] Los checks reportados corresponden a ejecuciones reales.
- [ ] No se incluyeron secretos ni datos sensibles.`,
  },
};

# Skills base para equipos AI-first

**Estado:** propuesta de referencia para los equipos  
**Propósito:** describir los skills que cada equipo creará para trabajar con un flujo común. Este documento define sus ideas, formatos y prompts de creación; no entrega los archivos `SKILL.md` terminados.

## Cómo usar esta referencia

El equipo debe acordar y adaptar estas convenciones durante la preparación del repositorio. Los seis skills iniciales se enfocan en el flujo de trabajo del equipo y son independientes del stack. Los skills para backend, frontend e integración de IA se definirán después de elegir la arquitectura y las tecnologías.

Los prompts de este documento se usan para pedirle a un agente que **cree el skill correspondiente**. Al ejecutarlos, el agente debe inspeccionar los documentos del repositorio, crear únicamente el archivo del skill y no ejecutar el flujo de trabajo que ese skill describirá.

## Convenciones compartidas para crear skills

Cada skill que cree el equipo debe dejar claro:

1. **Nombre y propósito:** qué trabajo ayuda a completar.
2. **Cuándo usarlo:** situación o solicitud que lo activa.
3. **Información de entrada:** archivos, issue, PR, decisión o contexto que necesita.
4. **Flujo de trabajo:** análisis y pasos que debe seguir el agente.
5. **Resultado esperado:** documento, reporte, PR u otra salida y su formato.
6. **Verificaciones:** qué evidencia debe revisar antes de dar el trabajo por terminado.
7. **Límites y decisiones humanas:** qué no debe asumir, cambiar o publicar sin autorización.
8. **Ejemplo breve:** una situación típica de uso.

Los skills deben usar la documentación del repositorio como fuente de verdad. Si falta una convención necesaria, deben señalarla como decisión pendiente en vez de inventarla. El formato de metadatos y la ubicación del skill dependen del agente seleccionado por el equipo; la propuesta de management muestra `.claude/skills/` como ejemplo.

### Ideas útiles para el flujo del equipo

- El plan aprobado sirve como referencia para revisar el cambio. Si la implementación se aparta del alcance o la solución acordada, documentar y justificar el ajuste en el artefacto que el equipo ya usa.
- Organizar el code review en pasadas: comportamiento y regresiones; seguridad y privacidad; cumplimiento del plan, criterios y políticas del proyecto. Priorizar hallazgos accionables y evitar duplicar checks que CI ya cubre o llenar el reporte con preferencias de estilo.
- Un skill guía el trabajo, pero por sí solo no garantiza una regla. Para controles obligatorios, el equipo define verificaciones automáticas y protecciones del flujo; la aprobación del PR permanece en las personas responsables.
- Más adelante, si los skills se vuelven parte crítica del delivery, probar sus cambios con tareas representativas y resultados esperados. No es un requisito para empezar.

## Buenas prácticas para Markdown y docs as code

Como práctica del programa, conviene versionar documentos que formen parte de un flujo real y tengan lectores, uso y ciclo de actualización claros. Las fuentes consultadas no indican una lista universal de archivos `.md` que cada monorepo deba crear. El skill de preparación valida el inventario aprobado para ese repositorio; no exige que aparezcan documentos solo porque existen en un ejemplo.

Prácticas aplicadas en este documento:

- Mantener una sola fuente de verdad para cada artefacto y enlazar documentos relacionados en vez de duplicar contenido.
- Usar encabezados descriptivos para que los documentos largos se puedan recorrer. GitHub genera una tabla de contenido a partir de ellos.
- Usar enlaces relativos para navegar entre archivos del repositorio; GitHub ajusta esos enlaces a la rama que se está leyendo.
- Crear una plantilla cuando un artefacto repetible necesita el mismo formato y las mismas verificaciones; mantenerla junto al flujo que la consume.
- Crear archivos según el ciclo del artefacto. Por ejemplo, un ADR se crea cuando existe una decisión que registrar; no se necesita un archivo ADR vacío en el scaffold inicial.
- Acordar convenciones de nombres y ubicación y validarlas explícitamente. No usar la extensión `.md` por sí sola como criterio para exigir que un archivo exista.

GitHub documenta las reglas de renderizado, encabezados y enlaces relativos para archivos Markdown en repositorios en su [guía de README y Markdown](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes). Un README en la raíz, `.github/` o `docs/` puede ser reconocido como README del repositorio; cuando hay varios, GitHub da prioridad a `.github/`, luego a la raíz y después a `docs/`.

### Qué aporta GitHub Spec Kit

Spec Kit es un ejemplo de docs as code guiado por un flujo, no una regla de que todos los repositorios deban tener sus archivos. Su flujo propone una constitución una vez por proyecto y repite los artefactos de definición, planificación y tareas por funcionalidad. La especificación registra qué y por qué; el plan define la implementación técnica; las tareas dividen el plan en trabajo ordenado. El equipo revisa cada resultado antes de continuar. [README de Spec Kit](https://github.com/github/spec-kit/blob/main/README.md) · [referencia de Agentic SDD](https://github.com/github/spec-kit/blob/main/docs/reference/agentic-sdd.md)

En ese flujo, la carpeta de cada funcionalidad puede incluir `spec.md`, `plan.md` y `tasks.md`. Artefactos como `research.md`, `data-model.md`, `quickstart.md` y `contracts/` se generan cuando corresponden a la funcionalidad. Spec Kit usa plantillas para fijar secciones y permite adaptarlas con presets u overrides; no requiere que el equipo copie ese esquema si no adopta el flujo. [Plantilla de plan](https://github.com/github/spec-kit/blob/main/templates/plan-template.md) · [comando para crear una especificación](https://github.com/github/spec-kit/blob/main/templates/commands/specify.md) · [presets de Spec Kit](https://github.com/github/spec-kit/blob/main/presets/README.md)

Para este programa hay dos convenciones posibles para los planes por funcionalidad. El documento de management propone un plan por funcionalidad bajo `docs/planning/`. Si el equipo elige el flujo SDD de Spec Kit, puede usar sus artefactos por funcionalidad y adaptar sus plantillas a las convenciones del equipo. Elegir una convención evita llevar dos planes que repitan la misma información.

## 1. Estructura del monorepo e inventario de documentos

La estructura concreta depende del repositorio, del agente y de la arquitectura aprobada. Esta tabla distingue documentos recomendados, documentos condicionales y artefactos que nacen durante el trabajo.

### Esqueleto neutral de referencia

```text
/
├── README.md
├── AGENTS.md       # si el equipo usa Codex
├── CLAUDE.md       # si el equipo usa Claude Code
├── apps/
│   └── [aplicación o servicio elegido]
├── packages/
│   └── [paquetes compartidos, si se necesitan]
├── docs/
│   └── [artefactos definidos por el flujo del proyecto]
├── [directorio de skills del agente elegido]
└── .github/
    ├── workflows/                  # si se usa GitHub Actions
    ├── CODEOWNERS                   # si se definen propietarios
    └── pull_request_template.md     # si el equipo adopta una plantilla
```

Este esqueleto no decide capas, frameworks o integraciones. Cada equipo concreta `apps/`, `packages/` y `docs/` según el diseño aprobado. El skill de monorepo compara el repositorio con esa decisión concreta.

| Artefacto | Cuándo incluirlo | Convención de referencia |
|---|---|---|
| `README.md` | Como punto de entrada del repositorio, con propósito e instrucciones de uso. | Preferir la raíz, salvo que el repositorio ya tenga otra convención. |
| Instrucciones del agente | Debe existir el archivo de contexto que corresponda a cada agente del equipo: `AGENTS.md` para Codex y `CLAUDE.md` para Claude Code. | Incluir propósito, mapa del repositorio, comandos de validación, convenciones, flujo de planificación y límites del agente. Si se usan ambos, mantener instrucciones compatibles. |
| Skills | Cuando el equipo haya acordado la herramienta y el formato de skills. | Usar el directorio que soporte el agente elegido; `.claude/skills/` es un ejemplo de la propuesta de management. |
| Plan de funcionalidad | Antes de implementar cada funcionalidad. | Convención de management: un plan bajo `docs/planning/`. Alternativa si se adopta Spec Kit: `specs/<id>-<nombre>/spec.md`, `specs/<id>-<nombre>/plan.md` y `specs/<id>-<nombre>/tasks.md`. Elegir una. |
| ADR | Cuando haya una decisión de arquitectura que convenga conservar. | `docs/adr/` es la ubicación propuesta en la propuesta de management; respetar los nombres y estados existentes. No crear archivos vacíos al inicio. |
| Plantilla de PR | Si el equipo decide estandarizar el contenido de los PRs. | `.github/pull_request_template.md` es una ubicación válida; GitHub también reconoce ubicaciones en la raíz y `docs/`. [Documentación de GitHub](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) |

El equipo debe registrar el inventario acordado en las instrucciones o artefactos que ya mantiene. El skill de monorepo debe recibir o localizar esa fuente de verdad y reportar **presente**, **ausente**, **incompleto** o **no aplica**. No debe exigir `idea.md`, `proposal.md`, `architecture.md`, `roles.md`, `dependencies.md` u otros documentos por defecto. Solo los valida si el equipo los adopta expresamente con un propósito y un ciclo de actualización definidos.

### Contenido mínimo de las instrucciones del agente

El archivo aplicable (`AGENTS.md`, `CLAUDE.md` o ambos según las herramientas elegidas) es parte esencial del repositorio: ofrece el contexto persistente que el agente necesita para trabajar de forma consistente. Como mínimo, debe explicar:

- qué proyecto es y qué objetivo persigue;
- cómo está organizado el repositorio y qué responsabilidad tiene cada área;
- cómo iniciar la aplicación y ejecutar sus validaciones;
- qué convenciones debe seguir el agente;
- dónde consultar el plan aprobado antes de codificar y cómo actualizarlo;
- qué acciones requieren revisión o autorización humana.

### Plantilla inicial de instrucciones del agente

Usar como contenido inicial de `AGENTS.md` para Codex o `CLAUDE.md` para Claude Code. Adaptar comandos, nombres de carpetas y reglas al repositorio.

```markdown
# Instrucciones del agente

## Proyecto
- Propósito:
- Alcance actual:

## Mapa del repositorio
- `<carpeta>`: responsabilidad y owner, si está definido.

## Desarrollo y validación
- Cómo iniciar el proyecto:
- Cómo ejecutar lint, tipos y pruebas:
- Validaciones que requiere un PR:

## Convenciones
- Patrones y estilos aprobados:
- Contratos, dependencias y decisiones que se deben consultar:

## Flujo de trabajo
- Antes de codificar, consultar el plan aprobado en `<ubicación elegida>`.
- Proponer un plan cuando no exista; esperar aprobación si así lo exige el equipo.
- Mantener el plan y la documentación afectados por el cambio.

## Límites y revisión humana
- No inventar decisiones o resultados de validación.
- Señalar dudas y pedir revisión para las decisiones que el equipo reservó a personas.
```

## 2. Skill: Set Up and Validate the Monorepo

**Para qué sirve:** establecer la estructura del repositorio y el contexto persistente del agente; comprobar que esté el archivo de instrucciones aplicable (`AGENTS.md` para Codex, `CLAUDE.md` para Claude Code, o ambos si el equipo usa ambas herramientas) junto con los demás elementos acordados.

**Cuándo usarlo:** al iniciar el repositorio del equipo o al verificar que el harness se mantenga completo.

**Resultado esperado:** un reporte con los elementos completos, faltantes, incompletos o pendientes de decisión; si se solicita inicializar, los cambios propuestos y su ubicación.

**Prompt para crear el skill:**

> Crea un skill llamado “Set Up and Validate the Monorepo”. Usa la sección 1 de este documento y las instrucciones vigentes del repositorio. El archivo de contexto del agente es esencial: `AGENTS.md` cuando el equipo use Codex, `CLAUDE.md` cuando use Claude Code, y ambos si acuerda usar las dos herramientas. El skill debe ayudar a crear y validar ese archivo, comprobando que describa el propósito del proyecto, el mapa del repositorio, comandos de desarrollo y validación, convenciones, dónde leer el plan aprobado y qué decisiones requieren revisión humana. Después valida las demás carpetas y archivos aprobados; clasifica cada uno como presente, ausente, incompleto o no aplica. No debe exigir documentos que solo aparezcan en ejemplos ni crear un archivo Markdown para cada tema. Si se solicita inicializar, debe crear solo los elementos aprobados que falten y no sobrescribir archivos sin autorización. Al crear este skill, crea únicamente su archivo; no inicialices ni modifiques el monorepo.

## 3. Skill: Create a Feature Plan

**Para qué sirve:** convertir una solicitud en un plan revisable, consistente con el formato del equipo y listo para aprobación antes de codificar.

**Cuándo usarlo:** ante una nueva funcionalidad, cambio de alcance o trabajo no trivial. El plan se guarda en la ubicación y formato elegidos por el repositorio.

**Resultado esperado:** un plan que explique qué se hará, qué análisis se realizó, qué queda fuera, cómo se validará y qué decisiones siguen abiertas.

### Plantilla de plan combinado del programa

La propuesta de management contempla un plan por funcionalidad. Si el equipo confirma esa convención, guardar el documento como `docs/planning/<nombre-corto-de-la-funcionalidad>.md`. Esta plantilla puede adaptarse al repositorio. Si el equipo adopta Spec Kit, usar sus artefactos separados `spec.md`, `plan.md` y `tasks.md` en lugar de mantener otro plan combinado duplicado.

```markdown
# Plan: <nombre de la funcionalidad>

**Estado:** Borrador | En revisión | Aprobado | Bloqueado | Completado
**Issue:** <enlace o identificador, si existe>
**Responsable:** <persona o rol>
**Última actualización:** <AAAA-MM-DD>

## 1. Objetivo y contexto
- ¿Qué problema o necesidad se atiende?
- ¿Quién se beneficia y cuál es el resultado esperado?

## 2. Alcance
### Incluye
- ...

### No incluye
- ...

## 3. Criterios de aceptación
- [ ] <resultado observable y verificable>

## 4. Análisis realizado
### Estado actual y patrones del repositorio
- Archivos, módulos o flujos relevantes:
- Convenciones o implementaciones existentes que se deben seguir:

### Impacto y dependencias
- Componentes, capas o datos afectados:
- Contratos e integraciones afectados:
- Dependencias entre tareas o roles:

### Riesgos y casos límite
- Seguridad, privacidad y permisos:
- Errores, estados límite y compatibilidad:
- Riesgos y mitigaciones:

### Alternativas y decisiones pendientes
- Alternativas consideradas y trade-offs:
- Decisiones que requieren aprobación:

## 5. Solución propuesta
- Descripción de alto nivel:
- Cambios esperados por componente o archivo, si se conocen:

## 6. Secuencia de trabajo
1. ...

## 7. Validación
- Pruebas automáticas:
- Validación manual o evidencia de demo:
- Relación entre criterios de aceptación y validaciones:

## 8. Despliegue y reversión
- ¿Hay pasos de despliegue, migración o configuración?
- ¿Cómo se detecta un problema y cómo se revierte, si aplica?

## 9. Supuestos y preguntas abiertas
- Supuestos por confirmar:
- Preguntas, responsable y fecha objetivo:

## 10. Aprobación
- Revisor:
- Estado y fecha:
- Comentarios o condiciones:
```

El análisis puede marcar secciones como **No aplica** con una razón breve. No debe omitir una sección solo porque el agente no encontró información; en ese caso debe registrar la brecha como pregunta abierta. No se inicia el código hasta que el plan esté aprobado.

**Prompt para crear el skill:**

> Crea un skill llamado “Create a Feature Plan”. Inspecciona los planes y plantillas ya aprobados. Si el equipo usa la convención combinada de este documento, sigue su plantilla y guarda el plan en `docs/planning/<nombre-corto>.md`. Si adopta Spec Kit, usa sus plantillas y estructura `spec.md`, `plan.md` y `tasks.md`, sin crear un segundo plan que repita su contenido. Analiza el requerimiento y el repositorio antes de proponer trabajo: objetivo, alcance, criterios verificables, patrones existentes, componentes afectados, contratos, dependencias, riesgos, alternativas, validación y reversión cuando aplique. Separa hechos, supuestos y preguntas abiertas; no inventes decisiones ni escribas código. Deja el resultado en borrador para revisión humana. Al crear este skill, crea únicamente su archivo y no un plan de funcionalidad real.

## 4. Skill: Record an ADR

**Para qué sirve:** documentar una decisión relevante, sus opciones y sus consecuencias de forma que el equipo pueda entenderla después.

**Cuándo usarlo:** cuando una decisión afecta arquitectura, contratos, datos, seguridad, operación o una dependencia importante. La ubicación se toma del repositorio; la propuesta de management sugiere `docs/adr/`.

**Ubicación de referencia:** `docs/adr/` aparece en la propuesta de management. Confirmar ubicación, numeración y estados con el repositorio antes de crear un ADR. Crear un archivo por decisión que se documenta, no como parte obligatoria del scaffold.

### Plantilla ADR

```markdown
# ADR <número>: <título de la decisión>

**Estado:** Propuesto | Aceptado | Rechazado | Reemplazado
**Fecha:** <AAAA-MM-DD>
**Responsables:** <personas o roles>
**Reemplaza / reemplazado por:** <ADR, si aplica>

## Contexto
¿Qué situación requiere una decisión? Incluir restricciones y evidencia relevante.

## Criterios de decisión
- ...

## Opciones consideradas
### Opción A: <nombre>
- Ventajas:
- Costos o riesgos:

### Opción B: <nombre>
- Ventajas:
- Costos o riesgos:

## Decisión
¿Qué opción se propone o se acepta, y por qué?

## Consecuencias
### Beneficios
- ...

### Costos, riesgos o trabajo posterior
- ...

## Plan de validación o seguimiento
- ...

## Referencias
- Issue, plan, contrato u otros ADRs relacionados:
```

Un ADR en estado **Propuesto** no representa una decisión aprobada. El skill no debe cambiarlo a **Aceptado** sin evidencia de aprobación.

**Prompt para crear el skill:**

> Crea un skill llamado “Record an ADR”. Localiza la ubicación y la plantilla de ADR acordadas por el repositorio; si no existen, propone la plantilla de la sección 4 y pide que el equipo apruebe una ubicación antes de crear un ADR. Inspecciona los ADRs existentes para seguir su numeración, formato y vocabulario de estados. El skill debe ayudar a describir contexto, criterios, opciones, trade-offs, decisión, consecuencias, validación y referencias. Debe preservar la diferencia entre propuesta y decisión aceptada; no debe inventar consenso ni cambiar un ADR a Aceptado sin aprobación explícita. Si la decisión pertenece a otra sección del plan o todavía falta evidencia, debe señalarlo. Al crear este skill, crea únicamente su archivo en la ubicación acordada de skills; no registres un ADR real.

## 5. Skill: PR Code Review

**Para qué sirve:** analizar el código de un PR frente a su objetivo y al comportamiento esperado, e identificar defectos, regresiones o riesgos con evidencia concreta.

**Cuándo usarlo:** cuando el equipo necesita una revisión técnica del diff antes de integrar los cambios.

**Flujo esperado:**

1. Confirmar el PR, el diff y el alcance revisado.
2. Consultar el objetivo, el plan aprobado y los criterios de aceptación relacionados.
3. Leer el contexto de los archivos modificados y seguir los flujos o contratos afectados.
4. Evaluar corrección funcional, regresiones, casos límite, seguridad, manejo de errores y consistencia con los patrones del repositorio.
5. Reportar solo hallazgos accionables, con prioridad, ubicación, evidencia, impacto y corrección sugerida. Si no hay hallazgos, decirlo explícitamente.
6. Indicar qué cobertura y evidencia de validación se revisaron, y qué preguntas o riesgos siguen abiertos.

### Formato de reporte de code review

```markdown
# Code review del PR <número o enlace>

## Contexto
- Objetivo del PR:
- Plan / issue y criterios relacionados:
- Base y alcance revisado:

## Hallazgos
| Área | Prioridad | Archivo y línea | Hallazgo y evidencia | Impacto | Corrección o validación sugerida |
|---|---|---|---|---|---|
| Comportamiento / Seguridad / Plan y políticas | P1/P2/P3/P4 | `ruta:línea` | ... | ... | ... |

## Cobertura revisada
- Flujos, contratos y casos límite:
- Pruebas y checks observados:
- Cobertura o evidencia faltante:

## Resumen
- Hallazgos bloqueantes:
- Preguntas abiertas:
- Recomendación para la persona revisora:
```

**Prompt para crear el skill:**

> Crea un skill llamado “PR Code Review”. Sigue las convenciones del repositorio y usa el formato de reporte de esta sección. Compara el diff con el objetivo, el plan aprobado y los criterios de aceptación. Revisa en pasadas separadas el comportamiento, los casos límite y las regresiones; la seguridad y privacidad; y el cumplimiento del plan, contratos y políticas del proyecto. Lee suficiente contexto de los archivos afectados. Reporta hallazgos accionables con área, prioridad, ubicación, evidencia, impacto y corrección o validación sugerida. No repitas hallazgos que CI ya cubre y limita las observaciones de estilo a las que tengan impacto real. Si no encuentra defectos, indícalo y resume el alcance revisado. Registra los checks observados sin afirmar resultados que no tengan evidencia. El skill produce hallazgos y recomendaciones: no modifica archivos, no publica comentarios ni aprueba o fusiona el PR. Al crear este skill, crea únicamente su archivo; no revises un PR real.

**Nota:** adapta prioridades, alcance y reporte al riesgo y a las reglas de revisión del proyecto. El code review identifica problemas y propone cómo resolverlos; la aplicación de cambios y la respuesta a comentarios siguen el flujo autorizado por el equipo.

## 6. Skill: PR Triage

**Para qué sirve:** atender comentarios de revisión e issues asociados al PR, distinguiendo solicitudes válidas, preguntas, preferencias y temas ya resueltos.

**Cuándo usarlo:** cuando se solicita revisar un PR, atender comentarios de revisión o evaluar hallazgos asociados.

**Flujo esperado:**

1. Consultar el PR, su objetivo, el diff relevante y los issues y comentarios abiertos.
2. Entender cada comentario en contexto y clasificarlo como corrección, pregunta, preferencia, duplicado o resuelto.
3. Explicar la evidencia y proponer la corrección o respuesta para cada punto.
4. Presentar las correcciones sugeridas antes de modificar código y esperar autorización.
5. Después de una corrección autorizada, verificarla y preparar una respuesta por comentario con evidencia.

### Formato de reporte de revisión

```markdown
# Comentarios e issues del PR <número o enlace>

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
- Preguntas abiertas:
```

**Prompt para crear el skill:**

> Crea un skill llamado “PR Triage”. Revisa las convenciones del repositorio y usa el formato de reporte de la sección 6 de este documento. Consulta el contexto y evidencia relevante para cada comentario o issue; clasifica cada punto y propone una corrección o respuesta precisa. Antes de modificar código, presenta la corrección y espera autorización del usuario. Después de un cambio autorizado, prepara una respuesta por comentario que explique qué se hizo o por qué no se aplica; publícala solo cuando el usuario lo solicite. No apruebes ni fusiones el PR. Al crear este skill, crea únicamente el archivo del skill; no atiendas un PR real.

## 7. Skill: Create a PR

**Para qué sirve:** preparar una descripción completa y crear un PR que conecte el cambio con su plan, issue y evidencia de validación.

**Cuándo usarlo:** cuando el usuario solicita abrir un PR para cambios ya preparados.

### Plantilla de descripción del PR

Usar la plantilla de PR acordada por el repositorio. GitHub admite ubicaciones en la raíz, `docs/` o `.github/`; este documento usa `.github/pull_request_template.md` como ejemplo. Si el equipo no tiene plantilla, proponer este formato para aprobación:

```markdown
## Propósito
¿Qué problema resuelve este cambio?

## Cambios incluidos
- ...

## Referencias
- Issue:
- Plan aprobado:
- ADR relacionado:

## Validación
- [ ] <comando o check ejecutado> — resultado:
- [ ] <prueba manual o evidencia, si aplica>
- No ejecutado / pendiente:

## Riesgos e impacto
- ...

## Checklist del autor
- [ ] El alcance corresponde al plan aprobado.
- [ ] La documentación y los contratos afectados están actualizados.
- [ ] Los checks reportados corresponden a ejecuciones reales.
- [ ] No se incluyeron secretos ni datos sensibles.
```

El título debe seguir la convención del repositorio, si existe. El skill debe verificar el estado de Git, la rama, el diff, los archivos incluidos y la plantilla de PR; confirmar que el plan y las referencias estén disponibles; y reportar con honestidad validaciones ejecutadas, fallidas o no realizadas. Solo debe subir cambios y crear el PR cuando el usuario lo solicite. **Nunca debe fusionar el PR.**

**Prompt para crear el skill:**

> Crea un skill llamado “Create a PR”. Inspecciona la plantilla de PR, las convenciones de ramas, los checks requeridos y las instrucciones del repositorio. Usa la plantilla de la sección 7 de este documento solo si el repositorio no tiene una plantilla acordada. Revisa el diff frente al plan aprobado y señala cualquier cambio de alcance o desviación que deba documentarse. El skill debe revisar el estado de Git, vincular el PR con el plan, el issue y el ADR cuando correspondan, y resumir propósito, cambios, validaciones reales y riesgos. Debe distinguir validaciones aprobadas, fallidas, pendientes y no ejecutadas; nunca afirmar que una prueba pasó si no hay evidencia. Debe crear o publicar el PR solo ante una solicitud explícita del usuario y nunca fusionarlo. Al crear este skill, crea únicamente su archivo en la ubicación acordada de skills; no abras un PR real.

## 8. Skills por tecnología y arquitectura

Los skills de backend, frontend, datos e integración de IA se diseñan después de seleccionar arquitectura, stack, convenciones y plataforma. Antes de ese punto, solo se registran como necesidades potenciales; no se fijan pasos, comandos ni herramientas que puedan quedar obsoletos o ser incompatibles con el proyecto.

Para definir uno de esos skills, el equipo primero documenta:

- tecnología y versión elegidas;
- estructura de carpetas y responsabilidades;
- patrones y ejemplos ya aprobados en el repositorio;
- contratos entre capas;
- comandos de desarrollo, validación y despliegue;
- requisitos de seguridad, datos y operación.

Después se crea un prompt de skill con la misma estructura compartida de este documento y se limita a una tarea concreta del proyecto.

## 9. Criterio de terminado para el paquete base

- [ ] El equipo acordó estructura del monorepo y archivos Markdown obligatorios.
- [ ] Existe el archivo de instrucciones que corresponde a las herramientas seleccionadas: `AGENTS.md` para Codex, `CLAUDE.md` para Claude Code, o ambos si se usan ambas herramientas.
- [ ] Las instrucciones del agente explican propósito del proyecto, mapa del repositorio, comandos de validación, convenciones, acceso al plan y límites de autonomía.
- [ ] El equipo acordó una convención para planes de funcionalidad, por ejemplo, `docs/planning/`.
- [ ] La ubicación y formato de ADR están acordados si el proyecto usará ADRs.
- [ ] Existe una plantilla de PR aprobada en la ubicación elegida, si el equipo decidió usar una.
- [ ] Se crearon y revisaron los seis skills base para la herramienta seleccionada.
- [ ] Cada skill incluye propósito, momento de uso, entradas, flujo, resultado, verificaciones y límites.
- [ ] Los skills proponen correcciones antes de aplicarlas cuando así lo requiere el flujo.
- [ ] Ningún skill autoriza por sí mismo la aprobación o fusión de un PR.
- [ ] Los skills específicos de backend, frontend, datos o IA se dejan para después de acordar arquitectura y stack.

## Lecturas de referencia

- [The AI-native SDLC playbook — Claude by Anthropic](https://claude.com/resources/articles/the-ai-native-sdlc-playbook) — referencia para conectar artefactos entre etapas, revisar cambios frente al plan, priorizar hallazgos y separar recomendaciones de controles obligatorios.
- [WM interno](https://westmonroe-cloud.com/secure/static/ai-awesome/docs/build/lifecycle/readme)

## Fuentes consultadas

Consultadas el 22 de octubre de 2026. Las referencias describen GitHub Markdown, plantillas de PR y una implementación pública de documentación versionada por flujo.

- [GitHub Docs: README y archivos Markdown en repositorios](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) — ubicación del README, navegación por encabezados y enlaces relativos.
- [GitHub Docs: plantillas de pull request](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) — ubicaciones admitidas y contenido útil de una plantilla.
- [GitHub Spec Kit: README y flujo SDD](https://github.com/github/spec-kit/blob/main/README.md) — constitución por proyecto y flujo repetible por funcionalidad, revisando cada artefacto antes de continuar.
- [GitHub Spec Kit: referencia Agentic SDD](https://github.com/github/spec-kit/blob/main/docs/reference/agentic-sdd.md) — separación de especificación, plan, tareas y análisis de consistencia.
- [GitHub Spec Kit: plantilla del plan](https://github.com/github/spec-kit/blob/main/templates/plan-template.md) — secciones de referencia para planes técnicos.
- [GitHub Spec Kit: comando de especificación](https://github.com/github/spec-kit/blob/main/templates/commands/specify.md) — creación de artefactos por funcionalidad y checklist de calidad.
- [GitHub Spec Kit: presets](https://github.com/github/spec-kit/blob/main/presets/README.md) — personalización y resolución de plantillas y comandos.

# Programa de entrenamiento AI-first para equipos de desarrollo

## Guía práctica para aprender, construir y aplicar en el trabajo

**Formato:** curso autoguiado en un sitio web, sin instructor ni sesiones en vivo.
**Ritmo estimado:** 4 semanas y 2–8 horas por semana, flexibles y a ritmo propio.
**Participantes:** developers de distintas especialidades que colaboran en un mismo producto o flujo.
**Apoyo:** el panel Tutor IA usa el contexto del módulo. Si el sitio no tiene un proveedor aprobado configurado, prepara un prompt para copiar a Codex o al asistente de la organización.
**Resultado:** cada participante completa y explica un cambio asistido por IA; el equipo entrega un proyecto demostrable y una guía reutilizable.

### Al terminar, cada participante podrá
- Convertir una solicitud en alcance y criterios de aceptación comprobables.
- Dar al asistente contexto suficiente sin compartir información no autorizada.
- Planificar una tarea, dirigir su implementación y mantener el cambio dentro del alcance.
- Comprobar el resultado con pruebas, revisión y evidencia; no aceptar código solo porque parece correcto.
- Explicar las decisiones y entregar el cambio con un resumen claro.

### El equipo entrega
- Un flujo funcional pequeño que se pueda completar y demostrar en cuatro semanas.
- Código y pruebas en un repositorio que otra persona pueda ejecutar siguiendo el README.
- Reglas y documentación del repositorio que permiten a otra persona continuar el trabajo; el equipo puede conservar prompts o skills útiles como material opcional.
- Una demo con criterios cumplidos, pruebas ejecutadas y limitaciones conocidas.

## 1. El flujo que se practica

Todos los roles usan el mismo ciclo. Las especialidades agregan controles distintos donde corresponde.

1. **Definir:** entender quién necesita qué y cómo reconocer que está terminado.
2. **Planificar:** inspeccionar el repositorio y decidir el cambio más pequeño que cumple el objetivo.
3. **Construir:** hacer el cambio acordado en partes comprensibles.
4. **Verificar:** ejecutar las comprobaciones adecuadas y revisar el diff.
5. **Revisar:** buscar errores, riesgos y efectos en otras partes del sistema.
6. **Entregar:** resumir qué cambió, qué se comprobó y qué falta.

Trata cada sugerencia de la IA como una hipótesis. La persona que entrega el cambio sigue siendo responsable de entenderlo y verificarlo.

## 2. Cómo funciona el curso en el sitio

Es una experiencia **autoguiada**: no hay instructor ni sesiones en vivo obligatorias. El programa dura cuatro semanas como referencia y requiere **2–8 horas por semana**, que cada persona distribuye a su ritmo. Los participantes pueden colaborar en el proyecto y revisar PRs entre ellos como parte del trabajo normal del equipo.

Cada módulo de la web sigue la misma secuencia:

1. **Aprende:** objetivo y explicación breve, con un ejemplo resuelto.
2. **Observa:** identifica qué pidió la persona a la IA, qué respuesta aceptó o corrigió y cómo la verificó.
3. **Practica:** completa una tarea pequeña siguiendo el ticket, las reglas y el plan; usa un prompt de rol si ayuda.
4. **Comprueba:** responde un checkpoint y compara su trabajo con criterios visibles.
5. **Registra:** guarda el artefacto, la evidencia y una reflexión antes de avanzar.

| Paso | Tiempo orientativo | Qué hace el estudiante |
|---|---:|---|
| Aprender y observar | 30–45 min | Leer la lección corta y estudiar el ejemplo guiado. |
| Practicar | 90–120 min | Trabajar en una tarea pequeña del proyecto final o en su equivalente sintético. |
| Comprobar y reflexionar | 20–30 min | Completar el checkpoint, comparar con la rúbrica y registrar lo aprendido. |

El resto del tiempo semanal se dedica a integrar el proyecto, revisar cambios entre pares y resolver dudas. En la versión local, la API Bun/Hono guarda el avance y las reflexiones en SQLite con Drizzle para un perfil de práctica. El panel **Tutor IA** ofrece dos opciones: consultar desde el sitio si hay un proveedor aprobado configurado, o copiar un prompt contextualizado por módulo y rol al asistente aprobado. La consulta del sitio envía la pregunta, el rol y el material de esa lección al proveedor; no envía el repositorio ni la reflexión. El tutor explica y da pistas, pero no reemplaza las pruebas ni la revisión de código.

### Stack común del sitio y los proyectos

El sitio de entrenamiento y cada proyecto de práctica usan el stack solicitado por West Monroe:

- **Frontend:** React + TypeScript estricto, con Vike (`vike-react`). Vite forma parte de esta configuración.
- **Backend:** Bun + Hono.
- **Datos:** Drizzle ORM; SQLite para desarrollo local y PostgreSQL para despliegues compartidos en nube.
- **Validación:** Zod para requests, respuestas y esquemas de herramientas.
- **IA para desarrollar:** los equipos usan Codex o Claude para planear, crear y revisar el código y los Markdown desde cada rol. El proyecto de práctica no necesita una función de IA dentro de la aplicación; Vercel AI SDK (`ai`) se usa en el tutor del sitio si hay un proveedor aprobado.
- **Complementos:** Tailwind CSS, TanStack Query y `fetch` nativo. Zustand se agrega solo si React Context no alcanza.
- **Identidad:** en nube se usa el gateway SSO compartido; la demo local no crea cuentas ni simula un proveedor de identidad.

El training site ya está implementado con este stack. Los equipos deben documentar en el README el comando de inicio, el modelo de datos y qué integraciones de nube están configuradas o pendientes.

El diseño usa ejemplos resueltos y reduce las ayudas a medida que el estudiante gana práctica. La investigación que informa esta secuencia estudió a estudiantes universitarios de programación, así que orienta el diseño pero no garantiza resultados en equipos de producto ([estudio](https://journals.sagepub.com/doi/10.1177/07356331231174454)). Los checkpoints breves sirven como práctica de recuperación; una revisión encontró resultados generalmente favorables frente a releer o no practicar, con resultados menos concluyentes frente a otras formas activas ([revisión](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00005/full)).
### Estructura recomendada del repositorio de práctica

Todo el equipo trabaja sobre el mismo repositorio y los mismos contratos. Las carpetas separan decisiones de producto, límites técnicos, código y evidencia para que cada rol contribuya sin perder el contexto compartido. El proyecto de triage usa esta estructura:

```text
proyecto-final-triage/
├── AGENTS.md                         # reglas de trabajo para Codex
├── README.md                         # requisitos e instrucciones para ejecutar
├── docs/
│   ├── product/                      # brief y criterios de aceptación
│   ├── architecture/                 # componentes y flujo entre capas
│   ├── api/                          # rutas, contratos y errores
│   ├── data/                         # modelo, restricciones y datos sintéticos
│   ├── backlog/                      # tareas pequeñas asignadas por rol
│   ├── qa/                            # casos y evidencia de comprobación
│   ├── delivery/                     # demo y definición de terminado
│   └── prompts/                       # prompts Codex aprobados para este repo
├── apps/
│   ├── api/
│   │   ├── src/routes/                # Bun + Hono; endpoints
│   │   ├── src/services/              # reglas de negocio
│   │   ├── src/db/schema.ts           # modelo Drizzle
│   │   └── drizzle/                   # migraciones versionadas
│   └── web/
│       ├── pages/                     # rutas de Vike
│       ├── public/                    # briefs y recursos estáticos
│       └── src/tickets/               # React + TypeScript estricto
├── packages/contracts/                # tipos y esquemas Zod compartidos
└── .github/workflows/                 # lint, pruebas y build por PR
```

| Semana | Carpetas principales | Resultado que se guarda |
|---|---|---|
| 1 — Definir y planificar | `docs/product/`, `docs/architecture/`, `docs/api/`, `docs/data/`, `docs/backlog/` | Criterios, mapa del monorepo, contratos compartidos y tareas pequeñas. |
| 2 — Construir por rol | `apps/api/`, `apps/web/` o `packages/contracts/`; consulta el contrato y el plan antes de cambiar código | Un cambio acotado con evidencia vinculada a los criterios y al stack común. |
| 3 — Integrar y revisar | Las áreas de código afectadas y `docs/qa/` | Reproducción del fallo, corrección, revisión cruzada y comprobaciones registradas. |
| 4 — Demostrar y transferir | `README.md`, `docs/delivery/` y `docs/retro.md` | Demo reproducible, handoff y mejoras a reglas y controles. Se pueden conservar prompts útiles, pero no son requisito de cierre. |

Las rutas son la estructura base recomendada para los proyectos del programa. En un repositorio existente, P1 debe descubrir las convenciones y adaptar el plan; no crees carpetas vacías. El triage es una aplicación de práctica construida **con ayuda de IA**: no incorpora un modelo ni toma decisiones de triage mediante IA.

## 3. Plan de cuatro semanas

### Semana 1 — Entender el trabajo antes de pedir código
**Objetivo:** pasar de una solicitud amplia a una tarea que se pueda planificar y comprobar.

- Acordar herramientas autorizadas, política de datos y reglas del repositorio.
- Hacer una tarea inicial breve para observar cómo cada persona entiende, pide y verifica ayuda de IA.
- Seguir la lección del sitio: inspeccionar las instrucciones del proyecto, localizar el código relevante y pedir un plan sin editar.
- Elegir un proyecto pequeño, por ejemplo un flujo de triage de tickets con datos sintéticos.
- Redactar propósito, alcance, criterios de aceptación y lo que queda fuera.

**Entregables:** objetivo y criterios en `docs/product/`; mapa en `docs/architecture/`; contratos y modelo acordados en `docs/api/` y `docs/data/`; tareas pequeñas en `docs/backlog/`; instrucciones de inicio en `README.md`.
**Prompts:** P0 y P1.

### Semana 2 — Construir cambios pequeños según cada rol
**Objetivo:** practicar una tarea completa, desde el ticket hasta la entrega.

- Cada participante toma una tarea pequeña de su especialidad y comparte el plan antes de editar. Frontend usa React/Vike; backend usa Bun/Hono y Zod; datos usa Drizzle con SQLite/PostgreSQL.
- Trabajar en cambios separados para que el diff y la revisión sean comprensibles.
- Añadir o actualizar pruebas junto al cambio.
- Completar el auto-chequeo del módulo: explicar el cambio y buscar un caso no cubierto. Si el equipo trabaja junto, hacer además una revisión entre pares.

**Entregables:** cambios pequeños revisables en `apps/api/src/`, `apps/web/src/` o `packages/contracts/`; pruebas o comprobaciones vinculadas a criterios; explicación de qué se aceptó, cambió o rechazó de la respuesta de IA.
**Prompts:** P1, P2 y el complemento del rol.

### Semana 3 — Integrar, depurar y revisar
**Objetivo:** encontrar problemas con evidencia e integrar cambios de varios roles.

- Conectar las partes del proyecto y ejecutar el flujo completo.
- Resolver el fallo preparado que presenta el módulo usando logs y pasos para reproducir; si no hay repositorio de práctica, usar el caso guiado del sitio.
- Revisar el cambio de otro rol, centrándose en comportamiento, seguridad, datos y regresiones.
- Corregir defectos y registrar qué evidencia confirmó la causa.

**Entregables:** flujo integrado; evidencia y casos actualizados en `docs/qa/`; comprobaciones pertinentes registradas; revisión cruzada y problemas resueltos.
**Prompts:** P3 y P4.

### Semana 4 — Demostrar que se puede aplicar sin seguir una receta
**Objetivo:** resolver una tarea nueva, integrar el producto y explicar el razonamiento.

- Cada participante resuelve un ticket nuevo y acotado siguiendo las reglas del repositorio; puede adaptar un prompt si le resulta útil.
- Revisar el diff, ejecutar comprobaciones y preparar una entrega como si fuera un cambio de trabajo.
- Grabar una demo breve o presentar el flujo al equipo; no requiere evaluación de un instructor.
- Comparar el ejercicio final con el inicial usando la misma rúbrica y registrar la autoevaluación.

**Entregables:** proyecto ejecutable desde `README.md`; demo y definición de terminado en `docs/delivery/`; resumen de cambios, criterios, verificaciones y limitaciones; rúbrica individual.
**Prompts:** los que requiera la tarea; P5 para handoff y P6 para teach-back.

### Después del programa — Transferirlo al trabajo real

Durante las dos semanas siguientes, cada participante aplica el flujo a **una tarea real, pequeña y autorizada** y la entrega mediante el proceso normal de PR y revisión del equipo. Si la tarea no es adecuada para IA, se usa un ticket sintético de alcance similar y se registra el motivo.

El estudiante se autoevalúa: ¿qué prompt ayudó?, ¿qué tuvo que corregir?, ¿qué prueba dio confianza?, ¿qué conviene mejorar en la guía? Las revisiones de código siguen el proceso normal del equipo; el curso no depende de un instructor o mentor.

## 4. Plantillas opcionales de prompts

Estas plantillas son ejemplos de apoyo, no un entregable obligatorio ni la fuente de verdad del trabajo. Prioriza el ticket, las reglas del repositorio, el contrato y el plan aprobado. Si usas una plantilla, reemplaza los campos entre corchetes y comparte solo contexto permitido por la organización. Para una tarea nueva o ambigua, pide primero un plan; luego solicita la implementación. Las guías oficiales de OpenAI para flujos de desarrollo recomiendan delimitar las fases y especificar contexto, límites y evidencia, manteniendo las instrucciones enfocadas ([flujo con Codex](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex), [guía de prompting](https://developers.openai.com/api/docs/guides/prompt-engineering)).

### P0 — Aclarar una solicitud
```text
Quiero lograr [resultado para usuario o sistema].
Solicitud o ticket: [texto o enlace autorizado].
Contexto conocido: [ruta, componente, contrato o comportamiento relacionado].
Restricciones: [qué no debe cambiar, políticas o límites].

No edites archivos. Convierte la solicitud en:
1. Resultado esperado.
2. Alcance incluido y excluido.
3. Criterios de aceptación que se puedan comprobar.
4. Supuestos y preguntas que realmente bloquean el trabajo.

No inventes requisitos. Señala qué información falta y qué puedes asumir de forma segura.
```

### P1 — Inspeccionar el repositorio y proponer un plan
```text
Trabaja en [repositorio/rama]. La tarea es [tarea y criterios de aceptación].

Primero revisa las instrucciones del repositorio (por ejemplo, AGENTS.md y README, si existen) y luego inspecciona solo el código relacionado. No edites archivos todavía.

Devuelve:
- Cómo funciona hoy la parte relevante, con rutas de archivo.
- Un plan breve y ordenado, con los archivos que probablemente cambiarían.
- Pruebas o comprobaciones apropiadas.
- Riesgos, dependencias y supuestos.

Si el repositorio contradice el ticket, explica la diferencia. No amplíes el alcance.
```

### P2 — Implementar un plan acordado
```text
Implementa [tarea] usando el plan acordado: [pegar o enlazar el plan].
Criterios de aceptación: [lista].
Límites: [archivos, comportamiento y contratos que no deben cambiar].

Antes de editar, confirma que el repositorio y el contexto siguen coincidiendo con el plan. Si hay una diferencia que cambia el alcance o el riesgo, detente y descríbela.
Realiza el cambio más pequeño que cumpla los criterios. Añade o actualiza pruebas pertinentes y mantén fuera los cambios no relacionados.

Ejecuta las comprobaciones relevantes y reporta los comandos exactos y sus resultados observados. Indica qué no pudiste verificar.
No hagas commit, push, deploy ni cambios en sistemas externos.
```

### P3 — Diagnosticar y corregir un fallo
```text
Resultado esperado: [esperado]. Resultado observado: [observado].
Pasos para reproducir: [pasos].
Logs o salida de prueba: [salida sin secretos ni datos prohibidos].

Inspecciona el código y trata de reproducir el fallo antes de proponer una causa.
Identifica la causa más probable y la evidencia que la respalda. No ocultes el fallo ni debilites una prueba para que pase.
Si la causa está clara y la corrección cabe en el alcance, implementa el cambio mínimo y añade una prueba que cubra el defecto.
Ejecuta la prueba focalizada y las comprobaciones relacionadas; informa comandos y resultados exactos.
Si no puedes reproducirlo, explica qué dato o acceso falta y no inventes una causa.
```

### P4 — Revisar un cambio
```text
Revisa el diff de [rama o PR] contra [base]. Es una revisión de solo lectura: no edites archivos.

Busca defectos que puedan causar comportamiento incorrecto, problemas de seguridad o privacidad, pérdida de datos, ruptura de contratos o regresiones.
Devuelve hallazgos accionables, ordenados por gravedad. Para cada uno indica:
- Archivo y línea aproximada.
- Escenario que produce el problema.
- Impacto y evidencia.
- Corrección sugerida.

No listes preferencias de estilo sin efecto práctico. Si no encuentras defectos, dilo y señala qué no pudiste verificar.
```

### P5 — Verificar y preparar la entrega
```text
Prepara la entrega de [tarea/PR]. Comprueba el diff frente a estos criterios: [criterios de aceptación].

Ejecuta las pruebas y comprobaciones relevantes disponibles. No digas que algo pasó si no lo ejecutaste.

Devuelve:
- Resumen del cambio y su propósito.
- Criterios cumplidos y evidencia.
- Comandos ejecutados y resultados exactos.
- Pruebas no ejecutadas y motivo.
- Riesgos, limitaciones o seguimiento pendiente.
- Borrador breve de descripción para el PR.
```

### P6 — Comprobar que entiendo el cambio
```text
Usa el diff y las pruebas de [tarea] para ayudarme a aprender. No edites archivos.

Hazme una pregunta a la vez sobre:
1. El comportamiento que cambió y por qué.
2. Una decisión técnica importante.
3. Cómo una prueba o evidencia confirma que el cambio funciona.

Espera mi respuesta antes de hacer la siguiente pregunta. Corrige errores citando rutas o pruebas pertinentes. Al final, resume qué entiendo bien y qué debería repasar.
```

## 5. Tutor IA y complementos por rol

### P7 — Tutor IA para el curso autoguiado

Usa este prompt en el panel del sitio o al abrir una conversación nueva con el asistente aprobado. El tutor debe ayudar a aprender, no evaluar ni fingir que conoce el repositorio.

```text
Eres el tutor de un curso autoguiado para developers que aprenden a construir software con IA. Responde en español claro y con pasos concretos.

Primero responde la duda directamente. Luego explica la idea, da un ejemplo breve y propone un siguiente paso o una pregunta de comprobación. Para ejercicios del curso, empieza con una pista y ofrece una solución más completa solo si el estudiante la pide.

Usa el material del curso que te proporcione. Si no tienes suficiente información, dilo; no inventes reglas del proyecto, comandos ni resultados de pruebas. Distingue entre hechos, supuestos y sugerencias. Cuando sea útil, indica el módulo o prompt relacionado.

No pidas ni repitas secretos, credenciales o datos personales/de clientes. Si el estudiante comparte código o logs, pide que quite datos sensibles y use solo información autorizada. No afirmes que verificaste código que no puedes ver o ejecutar.

Módulo: [1, 2, 3 o 4].
Rol: [producto/coordinación, API/backend, base de datos, web/frontend o QA/pruebas].
Pregunta del estudiante: [escribir pregunta].
```

Añade solo el complemento pertinente al prompt de implementación o revisión. El rol cambia qué se verifica; no elimina la responsabilidad de entender y probar el cambio.

**Backend / API**
```text
Comprueba el contrato de entrada y salida, validación, errores, autorización, compatibilidad y pruebas de integración. No cambies el contrato sin señalarlo.
```

**Base de datos**
```text
Comprueba esquema y migraciones, restricciones, índices y compatibilidad con datos existentes. Explica cómo revertir la migración si aplica. Usa datos sintéticos; no consultes ni incluyas datos reales.
```

**Frontend**
```text
Comprueba estados de carga, error, vacío y éxito; accesibilidad básica; manejo de datos y pruebas relevantes. Mantén el contrato de API salvo que el ticket pida cambiarlo.
```

**QA / pruebas**
```text
Convierte los criterios en casos reproducibles. Incluye el camino normal, un caso límite y un error pertinente. Distingue las pruebas ejecutadas de las propuestas.
```

**Producto o diseño**
```text
Compara el comportamiento propuesto con el objetivo y los criterios de aceptación. Señala ambigüedades, estados no definidos y decisiones que requieren acuerdo antes de ampliar el alcance.
```

### Prompts completos para Codex

Pégalos en Codex con `proyecto-final-triage` abierto y reemplaza los campos entre corchetes. Cada prompt pide primero un plan de solo lectura. Revisa el plan y los contratos con el equipo; después usa **P2 — Implementar un plan acordado** e incluye el plan aprobado. Las rutas de abajo corresponden al repositorio de práctica; si trabajas en otro repo, primero usa P1 para descubrir sus convenciones y ajusta las rutas. `AGENTS.md` es una convención opcional para dar instrucciones al agente. Las guías de OpenAI recomiendan indicar alcance, no-objetivos y evidencia sin repetir instrucciones innecesarias ([flujo de trabajo con Codex](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex), [guía actual sobre prompts e instrucciones](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)).

#### API / Backend
```text
Ticket: [ID y resumen]. Área: `apps/api/src/routes/` o `apps/api/src/services/`. Criterios: [lista]. Contrato aprobado: `docs/api/ticket-api.md`.
Inspecciona en modo solo lectura `AGENTS.md`, `README.md`, `docs/product/acceptance-criteria.md`, `docs/architecture/system-overview.md`, `docs/api/ticket-api.md` y el código relacionado. No edites archivos ni cambies el contrato.
Devuelve el comportamiento actual y un plan acotado: archivos a cambiar, validación, autorización, respuestas de error, compatibilidad y pruebas pertinentes. Señala discrepancias entre ticket, contrato y código. Espera mi aprobación antes de implementar.
```

#### Base de datos
```text
Ticket: [ID y resumen]. Área: `apps/api/src/db/` y `apps/api/drizzle/`. Criterios: [lista]. Modelo aprobado: `docs/data/data-model.md`.
Inspecciona en modo solo lectura `AGENTS.md`, `docs/product/acceptance-criteria.md`, `docs/data/data-model.md`, el esquema Drizzle, las migraciones y los usos del modelo. No edites, no te conectes a una base compartida y no ejecutes migraciones.
Propón un plan que cubra esquema, compatibilidad con datos existentes, nulos/defaults, backfill e índices si aplican, reversa y pruebas con datos sintéticos. Identifica riesgos de bloqueo o pérdida de datos. No cambies API ni web. Espera mi aprobación antes de implementar.
```

#### Web / Frontend
```text
Ticket: [ID y resumen]. Área: `apps/web/src/tickets/`. Criterios: [lista]. Contrato de API aprobado: `docs/api/ticket-api.md`.
Inspecciona en modo solo lectura `AGENTS.md`, `docs/product/acceptance-criteria.md`, `docs/architecture/system-overview.md`, el componente y cliente de API relacionados. No edites archivos ni cambies el contrato.
Propón un plan con componentes o rutas afectadas, estados de carga/éxito/vacío/error según aplique, accesibilidad, adaptación a móvil y pruebas. Señala decisiones de UX que no estén definidas. Espera mi aprobación antes de implementar.
```

#### Uso de Codex o Claude desde cualquier rol
```text
Mi rol es [producto/coordinación, API/backend, base de datos, web/frontend o QA/pruebas]. El equipo usa Codex o Claude para crear la app y sus documentos; la app no necesita una función de IA. Tarea: [ID y resumen]. Criterios: [lista o rutas].
Inspecciona en modo solo lectura las instrucciones del repositorio y los archivos relevantes para mi rol. Usa solo datos inventados. No edites archivos todavía.
Propón un plan pequeño con los archivos que existen, los que habría que crear o actualizar, el motivo de cada cambio y cómo comprobarlo. Espera la revisión del equipo. Después de recibir aprobación, implementa solo la tarea acordada, revisa el diff y explica el cambio en palabras sencillas.
```

#### QA / Pruebas
```text
Ticket: [ID]. Criterios de aceptación: [lista]. Inspecciona en modo solo lectura `AGENTS.md`, `docs/product/acceptance-criteria.md`, `docs/qa/manual-test-plan.md`, la implementación y las comprobaciones existentes. No cambies código de producción.
Propón una matriz pequeña que conecte cada criterio con un caso reproducible. Incluye camino principal, límites y errores relevantes; indica qué automatizar, qué datos sintéticos hacen falta y qué comandos de prueba existen. No afirmes que una prueba pasó sin ejecutarla. Espera mi aprobación antes de cambiar pruebas.
```

#### Producto / UX
```text
Función o flujo: [descripción]. Usuario: [tipo]. Solicitud: [ticket]. Restricciones: [lista]. No edites archivos ni inventes requisitos.
Usa `docs/product/brief-proyecto-final.md` y `docs/product/acceptance-criteria.md`; confirma decisiones técnicas con `docs/architecture/system-overview.md` y asigna tareas pequeñas en `docs/backlog/role-backlog.md`. Devuelve el resultado para el usuario, flujo, estados/casos límite, criterios comprobables, supuestos y decisiones pendientes. Separa preguntas bloqueantes de detalles que el equipo puede decidir durante la implementación.
```

**Después de aprobar el plan:** usa P2 e incluye el ticket y el plan acordado. Pide a Codex que haga solo ese cambio, ejecute pruebas pertinentes y reporte comandos y resultados observados. Commits, pushes, despliegues, migraciones en entornos compartidos y llamadas reales a proveedores siguen el proceso de autorización del equipo.

## 6. Reglas para el trabajo real

- Usa solo asistentes, repositorios y tipos de datos permitidos por la organización.
- No pegues secretos, credenciales ni datos personales o de clientes en un asistente sin autorización de la política aplicable.
- Revisa cada cambio antes de integrarlo; debes poder explicar qué hace y por qué.
- Ejecuta pruebas pertinentes y reporta lo que realmente se ejecutó.
- Mantén commits, publicaciones, despliegues y cambios externos separados de la generación de código y sujetos al proceso normal de aprobación.
- Si una petición cambia materialmente el alcance, los permisos o el riesgo, para y consulta antes de avanzar.

Adapta estas reglas al asistente y al proceso aprobados por la organización. Los prompts son plantillas iniciales: practica con ellas y mejora las que produzcan resultados verificables.

## 7. Cómo medir el avance

Califica cada capacidad al inicio y al cierre, usando tareas comparables.

| Puntuación | Significado |
|---:|---|
| 0 | Aún no lo logra o no puede explicar su decisión. |
| 1 | Lo completa con ayuda o indicaciones. |
| 2 | Lo completa de forma independiente y explica la evidencia. |

Evalúa cinco capacidades:
1. Define alcance y criterios de aceptación.
2. Inspecciona el contexto y dirige la IA con límites claros.
3. Comprueba el resultado con pruebas, revisión y evidencia.
4. Aplica las comprobaciones relevantes para su especialidad.
5. Explica el cambio y lo entrega con un handoff útil.

**Preparación para tareas rutinarias acotadas:** puntuación 2 en verificación y uso responsable; al menos 1 en las otras capacidades. Si aparece un 0, vuelve al módulo de esa capacidad, completa otra práctica breve y autoevalúate de nuevo antes de una tarea similar de mayor impacto.

No midas el éxito por el porcentaje de código generado por IA. Mide calidad del cambio, pruebas pertinentes, defectos encontrados antes de integrar, capacidad de explicar el resultado y uso real del flujo después del curso.

## 8. Preparación y mantenimiento del curso autoguiado

**Antes de empezar**
- Elegir el asistente y las herramientas autorizadas; compartir la política de datos y las reglas del repositorio.
- Preparar un repositorio funcional con instrucciones claras, pruebas ejecutables y un flujo pequeño.
- Crear datos sintéticos y un defecto preparado para el ejercicio de depuración.
- Acordar qué demo satisface el objetivo y asignar una persona responsable por componente.
- Publicar cada módulo con objetivo, lección, ejemplo, práctica, checkpoint, entrega y criterios de finalización.
- Configurar el Tutor IA para que responda con base en el material del curso y diga cuándo no sabe.
- Explicar que el panel consulta al proveedor aprobado cuando está configurado y, si no lo está, prepara un prompt para copiar. Indicar que la consulta envía la pregunta, el rol y el material de la lección, pero no el repositorio ni la reflexión.
- Dar tiempo de trabajo para completar el curso; no programar sesiones ni depender de un instructor.

**Durante el programa**
- El material del sitio muestra cómo inspeccionar, planificar, implementar y verificar mediante ejemplos resueltos.
- El Tutor IA explica conceptos, da pistas y dirige al módulo o prompt pertinente; no sustituye la revisión humana.
- Cada estudiante mantiene una nota breve: objetivo, prompt adaptado, cambio, evidencia, corrección humana y aprendizaje.
- El responsable del curso actualiza el contenido y resuelve bloqueos de acceso; no necesita impartir sesiones.

**Al cerrar**
- Pedir al estudiante que demuestre el proyecto final desde un README limpio y marque su autoevaluación.
- Guardar en el repositorio solo prompts probados y útiles, con ejemplos y límites conocidos.
- Revisar periódicamente las preguntas frecuentes y actualizar el material sin conservar datos personales ni código confidencial.

## Referencias para el diseño del curso

- OpenAI, [Iterating Development Workflows with Codex](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex).
- OpenAI, [Prompt Engineering](https://developers.openai.com/api/docs/guides/prompt-engineering).
- Zheng et al. (2023), [The Effects of Worked-Out Example and Metacognitive Scaffolding on Problem-Solving Programming](https://journals.sagepub.com/doi/10.1177/07356331231174454).
- Moreira et al. (2019), [Retrieval Practice in Classroom Settings: A Review of Applied Research](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00005/full).

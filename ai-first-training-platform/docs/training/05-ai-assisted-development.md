# 05 · Desarrollar con Codex o Claude

> Semana 3 · 2 horas · Enfoque principal: usar un asistente de programación en tareas reales del proyecto

En este curso, Codex o Claude ayuda al equipo a crear la aplicación y sus documentos. La app no necesita incluir una función de IA. Cada persona usa el asistente desde su rol y sigue siendo responsable de entender, revisar y comprobar lo que acepta.

## Objetivo de aprendizaje

Completar una tarea pequeña con un asistente de programación: dar contexto, pedir un plan, revisar el plan, hacer un cambio, comprobarlo y explicar el resultado.

## Antes de empezar

- Abre el repositorio del equipo, no el repositorio del sitio del curso.
- Ten a mano la tarea acordada, sus criterios, `README.md`, `AGENTS.md` y los archivos relacionados.
- Usa solo datos inventados; no compartas claves, información personal ni datos reales.
- Trabaja en una sola tarea pequeña por vez. No pidas que el asistente construya toda la app en una sola instrucción.

## El ciclo de trabajo con Codex o Claude

1. **Describe la tarea.** Explica el resultado que necesita la persona usuaria, tu rol, los criterios de aceptación y lo que queda fuera del alcance.
2. **Pide que inspeccione y planifique.** Indica archivos relevantes o pide que encuentre los relacionados. Primero solicita un plan y una lista de archivos; todavía no pidas cambios.
3. **Revisa el plan.** Confirma que se ajusta a los archivos, el stack y los criterios del equipo. Pregunta por términos que no entiendas y acuerda el cambio con otra persona.
4. **Implementa una parte pequeña.** Pide que cambie solo los archivos acordados y actualice el Markdown relacionado si el cambio lo requiere.
5. **Comprueba el resultado.** Revisa el diff. Ejecuta las comprobaciones del README que correspondan, confirma el comportamiento visible y registra solo resultados observados.
6. **Pide una explicación.** Solicita que explique qué cambió, cómo viajan los datos y qué limitaciones tiene. Cada integrante debe poder explicar su propio cambio.
7. **Guarda y entrega.** Sigue el flujo Git del equipo, solicita revisión humana y deja los documentos listos para quien continúe el proyecto.

## Qué archivos puede ayudar a crear o mantener

Depende de la tarea. Puede ayudar con código y documentación Markdown, por ejemplo:

- Producto: `docs/product/brief.md`, criterios de aceptación y backlog.
- Web: componentes, formularios, listas y documentación de la pantalla.
- API: rutas, validación y `docs/api/contracts.md`.
- Datos: esquema, migración y `docs/data/model.md`.
- QA y entrega: casos repetibles, resultados observados y `docs/delivery/handoff.md`.

No crees archivos solo porque aparecen en un ejemplo. Pídele que inspeccione el repositorio y explique por qué hace falta cada archivo.

## Ejercicio paso a paso

Elige una tarea real de tu rol que ayude a completar insertar y listar un registro:

1. Escribe el resultado esperado y cómo sabrás que funciona.
2. Pega la tarea en el asistente y pide inspección y plan sin editar.
3. Comparte el plan con el equipo. Aclara los cambios antes de dar luz verde.
4. Pide que implemente solo esa tarea y revise el diff.
5. Ejecuta las comprobaciones pertinentes y anota qué ocurrió.
6. Actualiza los documentos relacionados y presenta el cambio a otra persona para revisión.

## Prompt inicial para Codex o Claude

> Soy [producto / web / API / datos / QA] en un equipo principiante. Estamos creando desde cero una app que inserta un tipo de registro y lista lo guardado. Tarea: [describir una parte pequeña]. Criterios: [pegar los criterios acordados]. Límites: datos inventados; no agregues editar, eliminar ni funciones de IA a la app. Inspecciona `README.md`, `AGENTS.md` y los archivos relacionados. No edites nada todavía. Propón un plan breve, los archivos que ya existen y los que habría que crear o actualizar, con el motivo de cada cambio. Espera a que el equipo revise el plan.

## Resultado y revisión del equipo

Cada participante completa y explica al menos un cambio de código o Markdown hecho con Codex o Claude. Otra persona revisa el diff y la evidencia. La aplicación sigue teniendo el alcance acordado: insertar y listar; editar o eliminar son mejoras opcionales, y no se requiere IA dentro del producto.

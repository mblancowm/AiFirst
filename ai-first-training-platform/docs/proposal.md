# Propuesta del producto

**Estado:** borrador para revisión de foundation. La aplicación recibida es un baseline; esta propuesta describe el objetivo antes de extenderlo.

## Audiencia y formato

Curso autoguiado en español para equipos de 3–4 developers durante cuatro semanas, con una dedicación flexible de 2–8 horas semanales. El sitio guía sin instructor ni sesiones obligatorias.

## Alcance MVP

- Inicio con propósito, roadmap de cuatro semanas, tres gates sugeridos y enlaces a cada módulo.
- Seis páginas de aprendizaje basadas en el Markdown: preparación del equipo, base de datos, API/backend, UI, desarrollo asistido por Codex o Claude y QA/entrega. Cada página incluye objetivo, dependencias, ejercicio, prompt copiable, artefacto esperado y verificación.
- Walkthrough didáctico de una pregunta respondida con fuentes, explicando React, Hono, Drizzle, AI SDK y QA.
- Progreso local por módulo, con porcentaje general. En una futura nube, el progreso debe asociarse al subject del SSO.
- Tutor contextual en el servidor que usa el contenido Markdown, identifica módulo/sección y reconoce evidencia insuficiente. Sin proveedor aprobado, usa un modo mock determinista.
- Roster local de práctica: crear grupos, asignar developers y roles, ver integrantes, quitar integrantes y elegir un proyecto de práctica. No crea cuentas ni permisos.

## Fuera de alcance

- El curso no construye ni administra el producto capstone como parte del sitio.
- Sin SharePoint, Smartsheet, Teams, calendario, repositorios ni sistemas reales.
- Sin autenticación propia, publicación o despliegue.
- Sin proveedor de IA real hasta contar con uno aprobado y sus credenciales configuradas solo en backend.
- Sin progreso compartido en nube hasta definir SSO, PostgreSQL, privacidad y operación.

## Criterios de aceptación del producto

1. Una persona nueva entiende el objetivo y puede recorrer el roadmap y los seis módulos.
2. Las lecciones se renderizan desde Markdown, con headings, listas, tablas, enlaces y bloques de código accesibles y sanitizados.
3. La navegación muestra progreso guardado y permite completarlo localmente.
4. El tutor contesta desde el material, señala la evidencia, muestra estados de carga/error y usa mock si no hay proveedor aprobado.
5. El walkthrough explica el flujo de punta a punta y qué dependencias bloquean el trabajo en paralelo.
6. Un grupo local permite gestionar roster, rol por pertenencia y proyecto elegido, sin presentarse como control de acceso.
7. Build, typecheck, pruebas pertinentes, revisión de seguridad y accesibilidad tienen evidencia documentada antes de la demo.

## Decisiones para revisión

- La propuesta de management ofrece tres briefs de práctica (agenda, base de conocimiento y triage); el prompt del sitio llama a la Base de Conocimiento Interna el capstone. Borrador: mantener los tres briefs elegibles por grupo y usar la base de conocimiento como walkthrough de referencia. Confirmar esta reconciliación antes del gate de contratos.
- La propuesta de management requiere roster local, roles y proyecto por grupo; el prompt del sitio resume su MVP como curso, progreso y tutor. Borrador: mantener el roster local como alcance porque es un requisito explícito de management; confirmar si debe entrar en la primera demo.
- La fuente curricular `AI-First-Application-Training/README.md` falta. Se copiaron los seis módulos disponibles, pero no se recreó el README.
- Los módulos actuales contienen instrucciones de Angular, .NET/EF Core y SQL Server. Deben revisarse contra el stack aprobado antes de presentarlos como pasos ejecutables; cualquier adaptación debe conservar el Markdown como fuente, sin duplicarlo en React.

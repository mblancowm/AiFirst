# Plan: alinear el training site con el stack aprobado

- **Estado:** Aprobado por solicitud del owner del programa, 2026-10-22.
- **Alcance:** aplicación React/Vike, API Bun/Hono, Drizzle/SQLite, contratos Zod compartidos, documentos del curso y briefs.
- **No incluye:** publicar el sitio, activar branch protection en GitHub, conectar el gateway SSO, migrar los datos del SQL Server LocalDB anterior ni habilitar un proveedor de IA real.

## Criterios de aceptación

- El sitio activo usa React con TypeScript estricto y Vike.
- El backend activo usa Bun + Hono; las tablas y migraciones usan Drizzle con SQLite local.
- Web y API comparten contratos Zod desde `packages/contracts`.
- El curso presenta el stack a participantes, y cada uno de los tres briefs lo especifica.
- El repositorio incluye una acción de CI para typecheck estricto de web/API y build de web; no declara pruebas automáticas que todavía no existen.
- Los documentos señalan que el login de nube depende del gateway SSO compartido y que la demo local no tiene login.
- La versión anterior y sus datos permanecen intactos; no hay importación silenciosa.

## Pasos

1. Crear el workspace `apps/`, `packages/` y `docs/` con instrucciones canónicas.
2. Implementar el frontend Vike y conservar la navegación, lecciones, progreso, tutor, skills, prompts, proyectos y grupos.
3. Implementar Hono, esquemas Zod, Drizzle SQLite, seed y migraciones para curso, progreso y grupos.
4. Actualizar README, guía del programa, propuesta para management y tres briefs.
5. Configurar CI para typecheck y build; ejecutar las comprobaciones y registrar exactamente los resultados y los pendientes de infraestructura externa.

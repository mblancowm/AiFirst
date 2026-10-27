# ADR-001: stack aprobado para el training site

- **Estado:** Aceptado para la implementación local del sitio.
- **Fecha:** 2026-10-22.
- **Contexto:** West Monroe requiere que el training site y los proyectos de práctica usen el stack JavaScript/TypeScript aprobado.

## Decisión

- Web: React + TypeScript estricto con Vike (`vike-react`); Vite es el motor integrado.
- API: Bun + Hono.
- Contratos compartidos: Zod en `packages/contracts`.
- Persistencia local: Drizzle ORM con SQLite.
- Persistencia en nube: Drizzle con PostgreSQL para estado compartido.
- UI: Tailwind CSS; TanStack Query y `fetch`; no se agrega Zustand hasta que Context sea insuficiente.
- Tutor: Vercel AI SDK con proveedor/modelo configurados fuera del repo. Una función de IA en los proyectos solo se añade si sus criterios la requieren.
- Identidad en nube: gateway SSO compartido de West Monroe. La demo local no tiene login.

## Consecuencias

- `apps/training-web`, `apps/training-api` y `packages/contracts` forman la aplicación activa del training site.
- `web/` (Angular), `server/` (.NET) y el bootstrap SQL Server se conservan como versión anterior; no se usan en el inicio actual.
- SQLite crea una base nueva. Los datos existentes en `AiFirstTraining` LocalDB permanecen intactos, pero grupos y progreso no se copian automáticamente.
- El gateway SSO y PostgreSQL requieren parámetros y acceso del entorno de nube; no se simulan en la demo local.

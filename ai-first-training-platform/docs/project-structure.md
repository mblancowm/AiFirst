# Propuesta de estructura

## Baseline extraído

```text
AGENTS.md
README.md
apps/
  training-web/       # React + Vike
  training-api/       # Hono + Drizzle/SQLite
packages/
  contracts/          # Zod compartido
docs/
  architecture/
  planning/
.github/workflows/
```

## Estructura objetivo para revisión

```text
AGENTS.md
README.md
apps/
  training-web/       # Vike, React y TypeScript estricto
  training-api/       # Hono, rutas y coordinación
packages/
  db/                 # esquema Drizzle, migraciones y seed
  ai/                 # adapter, retrieval y evaluaciones del tutor
  contracts/          # esquemas Zod compartidos
docs/
  training/           # Markdown fuente del curso
  product/            # idea, propuesta y criterios
  architecture/       # diseño y ADRs
  api/                # contratos y mapa de rutas
  data/               # modelo y migraciones
  planning/           # plan por feature y gates
  qa/                 # casos y evidencia
  delivery/            # demo y handoff
.github/
  workflows/           # CI
  CODEOWNERS
  pull_request_template.md
```

La propuesta de management permite conservar Drizzle dentro de `apps/training-api/src/db/` cuando solo el API lo use. El prompt del sitio sugiere `packages/db/` y `packages/ai/`. La decisión inicial para revisión es extraer esos paquetes solo si separan ownership, pruebas o reutilización de forma concreta; no crear carpetas vacías. Registrar la decisión en un ADR antes de mover código. Las carpetas `api/`, `data/`, `qa/` y `delivery/` de `docs/` pueden añadirse con el gate de contratos.

# AI First Initiative

This repository contains the initiative materials and the **AI-First Learning Lab** app in `ai-first-training-platform/`.

## Run the app locally

Requirements: [Bun 1.4.4](https://bun.sh/).

From the repository root:

```sh
cd ai-first-training-platform
bun install --frozen-lockfile
bun run db:migrate
bun run dev:api
```

In a second terminal:

```sh
cd ai-first-training-platform
bun run dev:web
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The tutor uses a deterministic mock by default and needs no API key. See [the app README](ai-first-training-platform/README.md) for more details.

## Update the training content

There is no content editor in the website. Contributors update the Markdown source in a branch and submit a GitHub pull request:

- Spanish lessons: `ai-first-training-platform/docs/training/`
- English lessons: `ai-first-training-platform/docs/training/en/`
- To add a lesson, add the Spanish and English Markdown files and register the module in `ai-first-training-platform/apps/training-api/src/course-content.ts`.

The API reads these files when it starts, so restart `dev:api` after changing them. The app README describes the content layout and local commands.

## Pilot limits

This is a local pilot. The email field is not authentication. Use synthetic data only; do not enter private or sensitive information, and do not deploy this MVP.

The root-level files contain program and planning materials. The runnable app source, lockfile, training content, and setup examples are under `ai-first-training-platform/`.

The 301 MB `ai-first-training-platform.zip` archive is omitted because it bundles generated `node_modules` files. Install dependencies reproducibly with `bun install --frozen-lockfile`; generated dependencies, build output, local databases, and real `.env` files are excluded.

---

# AI First Initiative (Español)

Este repositorio contiene los materiales de la iniciativa y la aplicación **AI-First Learning Lab** en `ai-first-training-platform/`.

## Ejecutar la aplicación localmente

Requisito: [Bun 1.4.4](https://bun.sh/).

Desde la raíz del repositorio:

```sh
cd ai-first-training-platform
bun install --frozen-lockfile
bun run db:migrate
bun run dev:api
```

En otra terminal:

```sh
cd ai-first-training-platform
bun run dev:web
```

Abre [http://127.0.0.1:3000](http://127.0.0.1:3000). El tutor usa un modo mock determinista por defecto y no necesita una clave de API. Consulta el [README de la aplicación](ai-first-training-platform/README.md) para más detalles.

## Actualizar el contenido de capacitación

El sitio no tiene un editor de contenido. Las personas colaboradoras editan el Markdown en una rama y envían un pull request en GitHub:

- Lecciones en español: `ai-first-training-platform/docs/training/`
- Lecciones en inglés: `ai-first-training-platform/docs/training/en/`
- Para agregar una lección, agrega los archivos Markdown en español e inglés y registra el módulo en `ai-first-training-platform/apps/training-api/src/course-content.ts`.

La API lee estos archivos al iniciar; reinicia `dev:api` después de modificarlos. El README de la aplicación describe la estructura del contenido y los comandos locales.

## Límites del piloto

Este es un piloto local. El campo de email no es autenticación. Usa solo datos sintéticos; no ingreses información privada o sensible y no despliegues este MVP.

Los archivos de la raíz contienen materiales del programa y la planificación. El código ejecutable, el lockfile, el contenido de capacitación y los ejemplos de configuración están en `ai-first-training-platform/`.

Se omite el archivo `ai-first-training-platform.zip` de 301 MB porque incluye dependencias generadas en `node_modules`. Instala las dependencias reproduciblemente con `bun install --frozen-lockfile`; se excluyen dependencias generadas, artefactos de compilación, bases de datos locales y archivos `.env` reales.

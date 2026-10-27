# AI First Initiative

This repository contains the initiative materials and the **AI-First Learning Lab** app in `ai-first-training-platform/`.

## Run the app locally

Requirements: [Bun 1.4.4](https://bun.sh/).

From the repository root, open a terminal and run:

```sh
cd ai-first-training-platform
bun install --frozen-lockfile
bun run db:migrate
bun run dev:api
```

In a second terminal, from the same app directory:

```sh
cd ai-first-training-platform
bun run dev:web
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The tutor uses a deterministic mock by default and does not need an API key. See [the app README](ai-first-training-platform/README.md) for details.

This is a local pilot. The email field is not authentication. Use synthetic data only; do not enter private or sensitive information, and do not deploy this MVP.

## Repository contents

The root-level files contain program and planning materials. The runnable app source, lockfile, training content, and setup examples are under `ai-first-training-platform/`.

The 301 MB `ai-first-training-platform.zip` archive is omitted because it bundles generated `node_modules` files. Install dependencies reproducibly with `bun install --frozen-lockfile`; generated dependencies, build output, local databases, and real `.env` files are excluded by the app's `.gitignore`.

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

En otra terminal, desde el mismo directorio:

```sh
cd ai-first-training-platform
bun run dev:web
```

Abre [http://127.0.0.1:3000](http://127.0.0.1:3000). El tutor usa un modo mock determinista por defecto y no necesita una clave de API. Consulta el [README de la aplicación](ai-first-training-platform/README.md) para más detalles.

Este es un piloto local. El campo de email no es autenticación. Usa solo datos sintéticos; no ingreses información privada o sensible y no despliegues este MVP.

El archivo `ai-first-training-platform.zip` de 301 MB se omite porque incluye dependencias generadas en `node_modules`. Instala las dependencias reproduciblemente con `bun install --frozen-lockfile`. El `.gitignore` de la aplicación excluye dependencias generadas, artefactos de compilación, bases de datos locales y archivos `.env` reales.

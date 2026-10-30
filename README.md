# AI-First Learning Lab

Este repositorio mantiene una sola aplicación: `web-app/`, el sitio para orientar a los participantes del programa AI-First. Incluye la ruta de cinco semanas, skills, arquitectura recomendada, ideas de proyecto, participantes y administración de equipos.

## Ejecutar localmente

Requisito: [Bun 1.4.4](https://bun.sh/).

```sh
cd web-app
bun install
cp .env.example .env.local
bun run dev
```

Abre [http://127.0.0.1:3001](http://127.0.0.1:3001). La configuración local habilita el acceso a Admin para cualquier visitante local. La API crea la base SQLite, aplica las migraciones y carga el roster inicial cuando corresponde.

Consulta [web-app/README.md](web-app/README.md) para configuración de gateway, base de datos y operación. Los documentos de `Programa Contexto/` son referencias editoriales del contenido.

## AI-First Learning Lab (English)

This repository maintains one application: `web-app/`, the participant guide for the AI-First program. It includes the five-week route, skills, recommended architecture, project ideas, participants, and team administration.

Use the same local setup commands above. For gateway, database, and operating details, see [web-app/README.md](web-app/README.md). Materials in `Programa Contexto/` are editorial references for the site content.

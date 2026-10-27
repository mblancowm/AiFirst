# AI-First Learning Lab

Sitio de aprendizaje autoguiado en español e inglés para equipos de 3–4 developers. En este piloto local, cada persona ingresa un email sin verificar para separar su avance; el curso no guarda reflexiones. En cuatro semanas (2–8 horas por semana) practican planificación, implementación por rol, revisión humana y entrega verificable mediante una Base interna de conocimiento con notas sintéticas por proyecto.

## Qué incluye

- Guía del programa y seis módulos Markdown en español e inglés en [`docs/training/`](docs/training/); los Markdown son la fuente editable del contenido.
- Navegación anterior/siguiente, ejercicios, prompts reutilizables y progreso guardado en SQLite.
- Recorrido de integración React/Vike → Hono/Zod → Drizzle/SQLite → tutor AI SDK/mock.
- Demo local: agrega notas sintéticas a dos proyectos, pregunta sobre ellas y recibe citas o una respuesta de evidencia insuficiente.
- Grupos de práctica y materiales de apoyo heredados del baseline.

## Stack

- React, TypeScript estricto, Vike/vike-react sobre Vite y Tailwind CSS.
- Bun + Hono; Drizzle ORM con SQLite local.
- Zod para contratos/configuración/validación; Vercel AI SDK del lado servidor.
- TanStack Query y `fetch` nativo para datos; Context basta para el estado pequeño del cliente.
- `react-markdown` y `remark-gfm` renderizan el contenido curricular compartido (incluidas tablas y código); `rehype-sanitize` aplica una lista segura. Biome da formato y lint.

## Ejecutar localmente

Requiere Bun 1.4.4. Desde la raíz del repositorio:

```sh
bun install --frozen-lockfile
bun run db:migrate
bun run dev:api
```

En otra terminal:

```sh
bun run dev:web
```

Abre `http://127.0.0.1:3000`. Vike reenvía `/api` a Hono en `http://127.0.0.1:8787`. Al iniciar la API, se cargan los módulos Markdown y datos de práctica si no existen. La base local se guarda en `apps/training-api/data/AiFirstTraining.sqlite` por defecto.

El tutor corre en modo mock determinista y no necesita conexión ni clave. `.env.example` sirve como plantilla; si quieres usar archivo, copia los valores a `apps/training-api/.env` (ignorado por Git). Para habilitar un proveedor real aprobado, configura solo en el entorno del servidor `AI_TUTOR_PROVIDER=openai`, `OPENAI_API_KEY` y `AI_TUTOR_MODEL`. La clave nunca se envía al navegador. No hay credenciales en el repositorio; los campos de clave/modelo de ejemplo están vacíos.

## Comprobaciones

```sh
bun run format:check
bun run lint
bun run check:web
bun run check:api
bun run test
bun run build:web
```

Las pruebas cubren rutas, progreso, representación/sanitización Markdown, navegación, citas, abstención por falta de evidencia, evaluación de doce preguntas, aislamiento entre proyectos y flujo de notas/pregunta. CI ejecuta formato, lint, typechecks, tests y build.

## Uso y límites

El email del piloto local sirve solo para separar el avance; no se verifica ni es una cuenta segura. Cualquier persona puede ingresar el email de otra y consultar o cambiar su avance. La interfaz no guarda reflexiones. No ingreses datos privados, sensibles, secretos ni repositorios corporativos. El servidor sigue rechazando `NODE_ENV=production` hasta integrar el gateway SSO compartido y el perfil PostgreSQL aprobados. No despliegues ni publiques este MVP.

## Material del programa

- [`docs/training/README.md`](docs/training/README.md): duración, roles, secuencia, objetivos y gates humanos.
- [`docs/training/project-integration-walkthrough.md`](docs/training/project-integration-walkthrough.md): orden por capas, contratos y trabajo paralelo.
- [`docs/qa/assistant-evaluation.md`](docs/qa/assistant-evaluation.md): preguntas respondibles y no respondibles.
- [`AGENTS.md`](AGENTS.md): prácticas canónicas del repositorio.

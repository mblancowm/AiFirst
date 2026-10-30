# AI-First Learning Lab — Web

Sitio para orientar a los participantes, hecho con React, TypeScript, Vike, Vite, Tailwind CSS y Bun. La API usa Hono, Drizzle y SQLite.

La portada presenta el programa, las cinco semanas, seis skills, arquitectura recomendada, ideas de proyecto y enlaces importantes. `/participantes/` es pública y muestra los grupos con los nombres de sus integrantes. `/skills/<id>/` contiene el detalle de cada skill. Admin separa la gestión en `/admin/participants/` y `/admin/teams/`, con un resumen en `/admin/`.

Un equipo admite hasta cuatro integrantes, y cada participante puede integrar como máximo un equipo. La mentoría es independiente: puede asignarse a alguien del mismo equipo o de fuera, y una persona puede mentorear varios equipos.

## Local development

```sh
bun install
cp .env.example .env.local
bun run dev
```

Abre `http://127.0.0.1:3001`. En local, `ADMIN_ACCESS_MODE=local` permite a cualquier persona abrir y usar Admin. La API crea `data/ai-first.sqlite`, aplica las migraciones y carga el roster inicial una sola vez si la base está vacía.

## Gateway access

En los demás entornos, deja `ADMIN_ACCESS_MODE` sin valor `local`. La API valida la sesión consultando `https://westmonroe-cloud.com/users/me` y solo autoriza `ohurtado@westmonroe.com`, `mblanco@westmonroe.com` y `kmartinez@westmonroe.com`. El email enviado por el navegador nunca se usa para conceder acceso.

Configura `APP_FRONTEND_PATH`, `APP_BACKEND_PATH`, `API_PORT`, `HOST` y `DATABASE_URL` en el entorno del servidor. `APP_BACKEND_PATH` debe ser el prefijo bajo el que el gateway enruta las solicitudes a la API. Usa `HOST=0.0.0.0` cuando el runtime deba recibir tráfico de un proxy o contenedor. No configures `ADMIN_ACCESS_MODE=local` en un entorno compartido.

En producción, configura `DATABASE_URL` con una ruta persistente para SQLite y arranca el servidor con `bun run start:api`; aplica las migraciones y ejecuta el seed inicial de forma transaccional. El seed solo escribe en una base sin participantes ni equipos, y su marcador evita repetirlo después del primer arranque. Para ejecutarlo manualmente antes del servidor, usa `bun run db:seed`. Para generar una migración al cambiar el esquema, ejecuta `bun run db:generate` desde `web-app/`.

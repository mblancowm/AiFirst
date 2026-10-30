# Guía de trabajo del repositorio

## Proyecto principal

El único proyecto de aplicación de este repositorio es `web-app/`, el sitio AI-First Learning Lab para orientar a participantes. La experiencia presenta el programa, su ruta de cinco semanas, conceptos básicos de AI-first, skills, recomendaciones de arquitectura y propuestas de proyecto.

Usa `web-app/` como fuente de verdad para la interfaz y el comportamiento de la aplicación.

Los documentos de `Programa Contexto/` sirven como referencia del contenido del programa. Para el comportamiento actual del sitio, revisa las páginas en `web-app/pages/` y los componentes y datos en `web-app/src/`.

### Rutas principales del sitio

- `/` contiene el home y sus secciones ancladas.
- `/semanas/01/` a `/semanas/05/` contienen el detalle de cada semana.
- El enlace de navegación **Skills** apunta a `/#skills-title`.
- Las tarjetas de Skills abren páginas internas en `/skills/<id>/`. Basa esos detalles en `Programa Contexto/skills-base-y-prompts (1).md`; no las sustituyas por enlaces a la página HTML estática.

## Stack y comandos

El sitio principal usa Bun, React, TypeScript, Vike (`vike-react`), Vite y Tailwind CSS.

Desde `web-app/`:

- `bun install` — instalar dependencias.
- `bun run dev` — iniciar el sitio local en `http://127.0.0.1:3001`.
- `bun run typecheck` — revisar tipos.
- `bun run build` — compilar el sitio.

## Acuerdos de trabajo

- Conserva el alcance de guía para participantes y la estructura existente antes de introducir nuevos flujos.
- La interfaz debe seguir la identidad West Monroe, usar bordes finos y limpios, ser adaptable y evitar párrafos largos.
- El contenido público del sitio no requiere autenticación ni persistencia. El módulo `/admin/` usa el gateway `/users/me` y SQLite para gestionar participantes y equipos; conserva su autorización de backend y el modo local definido por `ADMIN_ACCESS_MODE=local`.
- Usa datos sintéticos en ejemplos.
- No agregues ni ejecutes pruebas salvo que la solicitud pida probar o verificar el cambio.
- Nunca hagas merge en el repositorio; el alcance máximo es crear un pull request.

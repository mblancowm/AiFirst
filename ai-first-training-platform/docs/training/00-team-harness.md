# 00 · Elegir, organizar las carpetas y preparar el proyecto

> Semana 1 · 2 horas · Participa todo el equipo

En este módulo el equipo elige una idea pequeña, ubica la carpeta principal del proyecto y aprende dónde va cada tipo de trabajo. Primero se ponen de acuerdo y conocen el mapa; después empiezan a programar.

## Primero: distingue los dos repositorios

- **Repositorio del curso:** este sitio. Aquí lees las lecciones, sigues tu progreso y consultas la demo. Sus comandos de inicio solo arrancan el sitio del curso.
- **Repositorio del equipo:** una carpeta Git nueva y aprobada donde vive la app que construirán. Codex o Claude debe abrir este repositorio para proponer o cambiar sus archivos.

La demo de Base de conocimiento enseña una integración terminada. No es el capstone de tu equipo ni una plantilla de código para copiar. El capstone empieza pequeño: una pantalla, un tipo de registro, una API y una tabla con datos inventados.

## Antes de empezar: palabras sencillas

- Un **proyecto** es el trabajo que el equipo construye.
- Un **repositorio** es la carpeta principal del proyecto y el historial de sus cambios.
- Una **ruta** es la dirección de un archivo. `apps/api/src/app.ts` significa: entra a `apps`, luego a `api`, luego a `src` y abre `app.ts` en el repositorio nuevo del equipo.
- Una **carpeta** agrupa archivos relacionados. Un **archivo** guarda una cosa concreta, como instrucciones, una pantalla o una prueba.

Si trabajas en el sitio de este curso, empieza en la carpeta que contiene el `README.md` principal y el `package.json`. Esa es la **raíz** del repositorio. Ejecuta los comandos indicados por ese README desde allí. No hace falta conocer React, APIs o bases de datos para seguir el plan; pide una explicación antes de cambiar algo que no entiendas.

### Cómo iniciar el sitio del curso

1. Abre PowerShell o la terminal en la carpeta del repositorio. La raíz es la carpeta donde aparecen `README.md` y `package.json`. Si usas `cd` y la ruta tiene espacios, escríbela entre comillas:

   ```powershell
   cd "C:\ruta\al\ai-first-training-platform"
   ```

2. Comprueba que Bun esté disponible:

   ```powershell
   bun --version
   ```

   Si el comando no se reconoce, sigue el proceso de instalación aprobado por tu equipo y vuelve a abrir la terminal.

3. Desde la raíz, instala los paquetes y prepara la base de datos:

   ```powershell
   bun install --frozen-lockfile
   bun run db:migrate
   ```

4. En una terminal, todavía desde la raíz, inicia la API:

   ```powershell
   bun run dev:api
   ```

5. Abre una segunda terminal en la misma raíz e inicia la web:

   ```powershell
   bun run dev:web
   ```

6. Abre `http://127.0.0.1:3000` en el navegador. Si aparece un error, guarda el mensaje y pide ayuda; no ejecutes la instalación dentro de `apps/` o `docs/` ni inventes comandos.

Estos comandos son para arrancar el sitio del curso. Para el proyecto del equipo, sigue los comandos de su propio README.

## Qué construirán

El equipo crea su app desde cero en un repositorio nuevo. El mínimo es poder **insertar** registros y **listarlos** desde una página web, con datos inventados guardados en la base de datos. Elijan una sola propuesta y un solo tipo de registro.

- **Agenda:** insertar citas de práctica y listar las citas guardadas.
- **Base de conocimiento:** insertar artículos inventados y listarlos.
- **Bandeja de soporte:** insertar tickets inventados y listarlos.

Empiecen con pocos campos, una pantalla y una sola tabla principal. **Editar y eliminar son opcionales**; considérenlos solo después de que insertar y listar funcionen. No conecten calendarios, documentos, tickets ni sistemas reales.

## Repartir el trabajo del grupo

Los roles son áreas de responsabilidad. No significan que una sola persona haga todo ese trabajo: su tarea es coordinarlo y revisar los cambios con alguien más.

| Área | Qué coordina | Equipo de 4 | Equipo de 3 |
| --- | --- | --- | --- |
| **Producto y coordinación** | Problema, primer flujo, criterios y prioridades. | Una persona. | Una persona. |
| **Web / interfaz** | Pantallas, formularios, mensajes y accesibilidad. | Una persona. | Una persona. |
| **API / backend** | Solicitudes, respuestas, validación y errores. | Una persona. | La misma persona que coordina datos. |
| **Datos / base de datos** | Tablas, campos, relaciones y datos inventados. | Una persona. | La misma persona que coordina API. |
| **QA / pruebas** | Casos, revisión y evidencia. | Rota cada semana entre las cuatro personas. | Rota cada semana entre las tres personas. |

No hay un rol separado de IA ni una función de IA requerida dentro de la aplicación. Cada integrante usa Codex o Claude desde su área para crear código y documentos; el equipo entiende y revisa cada cambio antes de aceptarlo.

Anoten quién coordina cada área y la rotación de QA en `docs/team/assignments.md`. Para cada tarea, la persona responsable y la revisora deben ser distintas. Consulten la [guía de roles](../roles.md) para ver las tareas y el orden de cada semana.

## Guardar y compartir el trabajo con Git

El proyecto del equipo debe vivir en un repositorio de Git aprobado por la organización. Git guarda el historial de cambios; GitHub, Azure DevOps u otra plataforma puede alojar el repositorio y mostrar las revisiones. Usen la plataforma que indique su equipo. No trabajen directamente en la carpeta de este curso.

Cada integrante obtiene una copia del repositorio con la opción **Clone** de la plataforma o con el comando que esta indique. **Clonar** significa traer una copia del proyecto compartido a tu computadora para trabajar en ella. No hace falta memorizar los comandos: practíquenlos de uno en uno y pidan que les expliquen cualquier palabra o resultado que no entiendan. Antes de comenzar una tarea, desde la carpeta principal del proyecto:

```bash
git switch main
git pull
git switch -c feature/nombre-corto
```

`main` es el nombre más común de la rama principal; si el repositorio usa otro nombre, sigan su README. Una **rama** es un espacio para trabajar en una tarea sin cambiar el trabajo principal. En esa rama, hagan un cambio pequeño y revisen qué cambió:

```bash
git status
git diff
```

Si los archivos y cambios tienen sentido, guarden el avance con un **commit** (un punto guardado con una descripción):

```bash
git add ruta/al/archivo
git commit -m "Describe el cambio"
git push -u origin feature/nombre-corto
```

Después, abran una **pull request** en la plataforma del equipo. Expliquen qué criterio cumple, qué archivos cambiaron y qué comprobaciones hicieron. Pidan revisión a otra persona; quien hizo el cambio no lo aprueba por sí solo. Incorporen comentarios y sigan las reglas del repositorio para combinarlo con `main`.

Antes de empezar otra tarea, actualicen su rama principal con `git switch main` y `git pull`. No guarden claves, tokens ni datos reales en Git. No cambien directamente `main`, no usen comandos para forzar la subida y pidan ayuda si aparece un conflicto que no entienden. Si su organización usa otra forma de revisión, sigan su proceso y pidan que alguien se los explique.

## Configuren calidad y revisión desde la primera semana

El estándar del programa es que cada pull request ejecute automáticamente formato, lint, tipos, pruebas y build. Una persona revisa el diff y los criterios; la CI no reemplaza la revisión humana. La persona responsable del repositorio debe habilitar que la rama principal requiera pull request, CI exitosa y al menos una aprobación, además del escaneo de secretos que use la organización. Nunca guarden claves o tokens en Git. Si el equipo no tiene esos permisos, anote el bloqueo y pida al responsable del programa que lo configure.

Cuando la estructura del proyecto y sus comandos reales estén listos, pidan al asistente un flujo de CI que ejecute esos mismos comandos. Comprueben el flujo con una pull request de práctica o un cambio pequeño y miren que se vea tanto un resultado exitoso como un fallo fácil de entender. No escriban una política de protección en documentos como si ya estuviera activa: confirmen la configuración en la plataforma.

## Dejen el proyecto listo para otra persona

Otro equipo podría recibirlo sin conocer las conversaciones actuales. Para facilitarle el trabajo:

1. Registren una persona de respaldo para cada área en `docs/team/assignments.md`; esa persona debe saber dónde están los archivos y cómo comprobar el flujo.
2. Actualicen README y AGENTS junto con el código cuando cambien comandos, carpetas o reglas.
3. Registren en `docs/architecture/` las decisiones que cambien el diseño y expliquen por qué se eligieron.
4. Dejen tareas pequeñas, con criterios y archivos probables, en `docs/backlog/`.
5. No dependan de una ruta de la computadora de alguien, una clave privada o una explicación que solo esté en un chat.

## Mapa de carpetas de referencia para crear la app

Este mapa es una guía para un proyecto nuevo, no código que deban copiar del sitio del curso. Creen solo las carpetas que necesiten. La carpeta `docs/training/` pertenece al sitio del curso; no guarden allí el proyecto del equipo.

```text
mi-app-equipo/                     <- raíz: aquí empieza el proyecto nuevo
├── README.md                      <- qué hace la app y cómo iniciarla
├── AGENTS.md                      <- mapa, reglas y guía para la IA
├── package.json                   <- comandos y paquetes, creado al preparar la app
├── bun.lock                       <- versiones, generado al instalar paquetes
├── apps/
│   ├── web/                       <- página, formulario y lista
│   └── api/                       <- operaciones para insertar y listar
│       └── src/db/                <- tabla y datos inventados
├── packages/
│   └── contracts/                 <- formato de datos compartido, si hace falta
└── docs/
    ├── product/
    │   ├── brief.md               <- para quién es la app y qué hará
    │   └── acceptance-criteria.md <- insertar/listar; opcional: editar/eliminar
    ├── api/contracts.md           <- ejemplos de solicitud y respuesta
    ├── data/model.md              <- campos del registro
    ├── team/assignments.md        <- roles y rotación de QA
    ├── qa/test-cases.md           <- comprobaciones y resultados
    └── delivery/handoff.md        <- cómo iniciar, probar y continuar
```

La IA puede sugerir la estructura y crear los primeros archivos con el stack aprobado; el equipo revisa el plan antes de generarlos. **No creen carpetas vacías.** Los nombres pueden variar, pero mantengan clara la responsabilidad de cada archivo.

## Dónde encontrar y cómo crear los archivos

El sitio del curso muestra instrucciones y plantillas; **no contiene el código inicial de la app del equipo**. Cada grupo elige una propuesta, crea un repositorio Git nuevo y empieza sin código de aplicación. La persona coordinadora comparte el enlace; cada integrante lo clona y lo abre en VS Code. Usen Codex o Claude como asistente de programación desde el repositorio nuevo. Antes de escribir código, pídanle un plan para crear la estructura y los archivos Markdown del proyecto. Revisen el plan y creen la base de la app con el stack aprobado. No clonen ni modifiquen el repositorio del curso como si fuera el proyecto del grupo.

Para crear o actualizar un archivo:

1. Clonen el repositorio del equipo y ábranlo en VS Code. No copien los archivos fuente del curso.
2. Abran el repositorio en Codex o Claude. Pídanle que lea lo que ya existe y explique el proyecto; si faltan README.md o AGENTS.md, pídanle que proponga su contenido inicial.
3. Indiquen su rol y pidan un plan para preparar la app mínima y los documentos de ese rol: una página para insertar y listar un tipo de registro. Los roles de producto, web, API, datos y QA también crean o actualizan sus Markdown correspondientes.
4. Revisen cada ruta propuesta. El asistente debe explicar para qué sirve, si se crea desde cero y qué contenido tendrá. Quiten archivos o carpetas que no hagan falta para el alcance mínimo.
5. Después de aprobar el plan, pidan ayuda con una tarea pequeña y la creación o actualización de los Markdown relacionados. Revisen el diff y la explicación antes de aceptar cambios. No creen un `package.json` vacío ni inventen comandos; comprueben los comandos reales y anótenlos en README.
6. Asegúrense de que `README.md` y `AGENTS.md` queden en la raíz. Pidan ayuda para redactarlos y manténganlos actualizados con el código y los acuerdos del equipo.

Los archivos creados en el repositorio del equipo se comparten con Git siguiendo el [flujo de la semana 1](#guardar-y-compartir-el-trabajo-con-git). No guarden los documentos de su proyecto dentro de `docs/training/`: esa carpeta contiene las lecciones del sitio.

### Pidan a la IA que prepare la base, no toda la app

Antes de pedir código, confirmen que tienen el brief, los criterios mínimos y acceso al asistente y al repositorio. El stack aprobado es React con TypeScript estricto y Vike; Bun con Hono; Drizzle con SQLite local; Zod para validar datos. No agreguen servicios, autenticación ni funciones de IA al producto de práctica.

Primero pidan un plan sin cambios:

> Estamos en el repositorio nuevo de nuestro equipo y construiremos el MVP del brief adjunto. Sigue el stack aprobado: React con TypeScript estricto y Vike para web; Bun con Hono para API; Drizzle con SQLite local; Zod para validar. Lee las instrucciones existentes. No edites todavía. Propón la estructura mínima, los archivos que crearías, qué hará cada uno y los comandos raíz para instalar, migrar, iniciar web y API, comprobar, probar y construir. Confirma que cada comando tendrá un script real en el manifiesto del proyecto. Indica qué requisitos o decisiones faltan. No implementes funciones del producto, no agregues dependencias innecesarias, autenticación, servicios externos ni IA dentro de la app. Espera la revisión del equipo.

Después de revisar el plan, pidan que prepare solo la estructura:

> Implementa solo la estructura aprobada. No agregues todavía la función del producto. Asegúrate de que README y AGENTS coincidan con la estructura y los comandos existentes. Ejecuta las comprobaciones de inicio que aprobamos y reporta cada comando con su resultado real. Si algo falla, detente y explica el error; no cambies el stack ni inventes otra solución sin aprobación.

**Punto de control:** no empiecen las funciones del producto hasta que una segunda persona pueda seguir README desde un clon limpio, instalar las dependencias y arrancar la estructura. La lista de comandos de README debe coincidir con los scripts del proyecto; AGENTS debe apuntar a las mismas reglas y tecnologías. Si falla, anoten el error y resuelvan el arranque con el equipo.

## Archivos: qué va en cada uno

| Archivo | Crear o actualizar | Qué escribir, en palabras simples |
| --- | --- | --- |
| `README.md` | Crear en semana 1 y actualizar al cambiar la app | Qué hace la aplicación, requisitos, cómo instalarla, iniciarla y comprobarla. Los comandos deben ser los reales del repositorio. |
| `AGENTS.md` | Crear en semana 1 y actualizar al cambiar estructura/reglas | Propósito, mapa de carpetas, tecnologías permitidas, comandos, límites y cómo revisar cambios de IA. |
| `package.json` | Generar con el método aprobado | Comandos para iniciar y comprobar el proyecto, además de sus dependencias. No creen uno vacío ni lo escriban a mano. |
| `bun.lock` | Generar al instalar paquetes | Versiones exactas de los paquetes. Bun la actualiza; no la editen a mano. |
| `docs/product/brief.md` | Crear si no hay uno | Quién tiene el problema, qué necesita, qué hará la primera versión y qué queda fuera. |
| `docs/product/acceptance-criteria.md` | Crear si no hay uno | De 3 a 5 resultados que se puedan observar y comprobar. |
| `docs/backlog/01-primer-flujo.md` | Crear cuando acuerden la primera tarea | Una tarea, archivos probables, persona responsable, persona revisora y cómo comprobarla. |
| `docs/team/assignments.md` | Crear en semana 1 | Quién coordina cada rol, quién le respalda y quién coordina QA por semana. |
| `docs/architecture/capstone-overview.md` | Crear si necesitan un mapa para este proyecto | Dibujo simple: pantalla → API → datos. Expliquen cada flecha con una frase. |
| `docs/api/contracts.md` | Crear o actualizar en semana 2 | Qué pide la pantalla, qué responde la API y qué ocurre si hay un error. Incluyan ejemplos inventados. |
| `docs/data/model.md` | Crear o actualizar en semana 2 | Qué información se guarda, sus campos y cómo se relaciona. No guarden datos que el flujo no necesita. |
| `docs/qa/test-cases.md` | Crear en semana 4 | Qué preparar, qué acción probar, qué debería pasar y qué pasó en realidad. |
| `docs/delivery/handoff.md` | Crear al entregar | Estado, cómo iniciar y probar, límites conocidos, resultados reales y siguientes tareas para quien continúe. |

Estos documentos describen el proyecto. El código que hace funcionar la aplicación vive bajo `apps/` y, si hace falta, `packages/`. Por ejemplo, la página puede vivir en `apps/web/`, la API en `apps/api/` y el formato de datos compartido en `packages/contracts/`.

### Cómo reconocer los tipos de archivo

- `.md` guarda notas e instrucciones que una persona puede leer.
- `.tsx` suele contener una pantalla o componente visual de React.
- `.ts` suele contener lógica, contratos, configuración o pruebas de TypeScript.
- `.sql` describe un cambio que se aplicará a la base de datos.
- `package.json` lista comandos y dependencias; `bun.lock` deja anotadas sus versiones exactas.

## Paso a paso: de la idea a la primera versión

1. **Acuerden la propuesta.** Elijan agenda, base de conocimiento o bandeja de soporte y definan un solo tipo de registro con pocos campos.
2. **Creen el repositorio nuevo.** No partan del código de otra app. Usen Codex o Claude para preparar solo la estructura mínima con el stack aprobado; revisen y expliquen cada archivo.
3. **Escriban el brief y los criterios.** El mínimo es insertar un registro y verlo en la lista. Editar y eliminar quedan como mejoras opcionales.
4. **Dibujen el recorrido.** La persona completa un formulario; la web envía los datos a la API; la API los guarda en la base de datos; la web muestra la lista actualizada.
5. **Acuerden los datos.** Escriban ejemplos sencillos para insertar un registro y pedir la lista. Mantengan los campos mínimos y datos inventados.
6. **Asignen roles y dividan el trabajo.** Una persona puede preparar la base de datos/API, otra la pantalla, y producto/QA coordinan y revisan. Cada integrante usa Codex o Claude para crear los archivos de su rol, incluidos los Markdown, y entiende y revisa los cambios.
7. **Construyan y prueben paso a paso.** Primero hagan que insertar y listar funcione de principio a fin. Si queda tiempo, acuerden criterios antes de agregar editar o eliminar.
8. **Comprueben y entreguen.** Otra persona sigue README, inicia la app, inserta un registro, confirma que aparece en la lista y revisa la pull request. Actualicen README y preparen la demo y la nota de entrega.

## Plantillas cortas para los primeros documentos

Pueden copiar estos títulos dentro de los archivos y completarlos juntos. No necesitan escribir mucho.

**`docs/product/brief.md`**

```text
# Nombre del proyecto
## Persona usuaria
## Problema que tiene
## Primer flujo que construiremos
## Qué incluye esta versión
## Qué queda fuera
```

**`docs/product/acceptance-criteria.md`**

```text
# Criterios de aceptación
- Cuando inserto un [registro] con los campos requeridos, aparece en la lista.
- Después de actualizar la página, el registro sigue en la lista.
- Si falta un campo requerido, veo un mensaje y el registro no se guarda.
- Opcional: puedo editar o eliminar un registro.
```

**`docs/team/assignments.md`**

```text
# Responsabilidades del equipo
Producto y coordinación: Persona A
Web / interfaz: Persona B
API / backend: Persona C
Datos / base de datos: Persona D (en un grupo de 3, combinar con API)
QA: la persona coordinadora cambia cada semana
En cada tarea, anotar responsable y revisor; deben ser personas distintas.
```

**`docs/backlog/01-primer-flujo.md`**

```text
# Tarea
Problema y resultado esperado:
Archivos que probablemente cambien:
Responsable:
Revisor:
Cómo comprobarlo (comando del README o pasos manuales):
```

### Plantilla de `README.md`

```text
# Nombre de la aplicación
Qué problema resuelve:
Qué necesito instalar:
Cómo instalar las dependencias (comando del repositorio):
Cómo iniciar la aplicación (comando del repositorio):
Cómo comprobar que funciona:
```

### Plantilla de `AGENTS.md`

```text
# Instrucciones del proyecto
Propósito y límites:
Mapa de carpetas:
Tecnologías aprobadas:
Comandos reales (los mismos que explica el README):
Reglas para datos de práctica:
Cómo revisar y entregar un cambio:
```

## Instrucción para Codex o Claude

> Somos un equipo principiante. Elegimos [agenda / base de conocimiento / bandeja de soporte] y mi rol es [producto / web / API / datos / QA]. Creamos la aplicación desde cero en este repositorio nuevo. Lee los archivos que ya existen; si falta README.md, AGENTS.md o un documento del proyecto, indícalo. No edites nada todavía. Explícame la raíz y el mapa de carpetas con palabras sencillas. Basado en mi rol, propón qué archivos de código y Markdown crear o actualizar para lograr el mínimo: insertar un tipo de registro y listar lo guardado con datos inventados. Para cada ruta, explica su propósito y contenido mínimo. Propón una tarea pequeña y un orden de trabajo; señala qué necesita coordinarse con otros roles. No agregues editar ni eliminar. No inventes comandos, no cambies el stack y espera a que el equipo revise el plan.

## Resultado y revisión del equipo

Al terminar, cada persona puede señalar dónde vive la pantalla, la API, los datos, las instrucciones y los criterios del proyecto. El equipo tiene un primer flujo pequeño, una lista revisada de archivos y una tarea con responsable, revisor y forma de comprobarla.

# Ejemplo paso a paso: preparar y construir una base de conocimiento

Este recorrido acompaña el módulo 00. Muestra cómo crear desde cero una app web sencilla de base de conocimiento durante cuatro semanas. El mínimo es insertar artículos inventados con un formulario y listar los artículos guardados. Editar y eliminar son las únicas mejoras opcionales del proyecto. La búsqueda, las respuestas con IA y otras funciones quedan fuera del alcance de este entrenamiento. No conecten documentos reales.

## La idea pequeña

Una persona del equipo necesita guardar y consultar instrucciones. La app permite insertar un artículo de práctica con título y contenido, y listar los artículos guardados. Empiecen con esos dos campos y una pantalla. No conecten documentos reales.

## Paso 1: preparar el repositorio del equipo

Cada grupo crea un repositorio Git nuevo para su aplicación; este recorrido y el código del sitio del curso son material de aprendizaje, no una base de código para copiar. En el repositorio nuevo, creen `README.md` y `AGENTS.md` en la raíz. Cuando preparen el proyecto con el stack aprobado, anoten en README los comandos reales para instalarlo, iniciarlo y comprobarlo. Si una herramienta falta o un comando falla, guarden el mensaje y pidan ayuda; no prueben comandos al azar.

Elijan quién coordina producto, web, API, datos y QA. Cada responsable puede usar Codex o Claude para crear los archivos de su área, incluidos los documentos Markdown, y otra persona revisa lo propuesto antes de incorporarlo.

## Paso 2: guardar los acuerdos del proyecto

Actualicen o creen estos archivos, según lo que ya exista:

| Ruta | Ejemplo de contenido para este proyecto |
| --- | --- |
| `docs/product/brief.md` | Persona: integrante nuevo del equipo. Necesidad: guardar y consultar una instrucción. Primera versión: insertar artículos inventados y listarlos. Fuera: documentos reales, login, conexiones externas y funciones de IA en el producto. |
| `docs/product/acceptance-criteria.md` | Puedo insertar un artículo con título y contenido; aparece en la lista; al actualizar la página sigue guardado. Si falta un campo requerido, veo un mensaje y no se guarda. Editar/eliminar son opcionales. |
| `docs/backlog/01-primer-flujo.md` | Una tarea pequeña para preparar desde cero el formulario de inserción o la lista; archivos probables, responsable, revisor y cómo comprobarla. |
| `docs/team/assignments.md` | Quién coordina producto, web, API y datos; quién coordina QA cada semana. |
| `docs/delivery/handoff.md` | Estado, inicio, demo, resultados, límites y siguiente tarea para otro equipo. |
| `docs/architecture/capstone-overview.md` | Dibujo `persona → web → API → base de datos` con una frase sobre cada parte. |
| `docs/api/contracts.md` | Ejemplo de artículo enviado por el formulario, respuesta al guardar y lista que devuelve la API. |
| `docs/data/model.md` | Una tabla de artículos con identificador, título y contenido. Todos los registros son inventados. |

No hay que crear cada carpeta al mismo tiempo. Creen la carpeta cuando vayan a guardar su primer archivo dentro. Mantengan actualizados el README y AGENTS de este repositorio nuevo; no hagan copias con nombres como `README-final.md`.

## Paso 3: entender la estructura del código

El equipo empieza con un repositorio nuevo. Con su rol asignado, pidan a Codex o Claude que proponga primero una estructura mínima de código y documentos Markdown; revisen el plan antes de pedirle que cree los archivos. Comprueben que la app responda a insertar y listar; no copien los archivos del sitio del curso. Por ejemplo:

```text
mi-app/
├── README.md                   # cómo instalar, iniciar y probar la app
├── AGENTS.md                   # propósito, mapa y reglas para la IA
├── package.json                # comandos y dependencias
├── apps/web/src/
│   ├── pages/index.tsx         # página con el formulario y la lista
│   └── api.ts                  # solicitudes desde la página a la API
├── apps/api/src/
│   ├── app.ts                  # rutas para insertar y listar
│   └── db/
│       ├── schema.ts           # tabla de artículos
│       └── seed.ts             # unos pocos artículos inventados
└── docs/
    ├── brief.md
    └── acceptance-criteria.md

```

Una **pantalla** muestra información y controles. La **API** recibe una solicitud y devuelve una respuesta. El **esquema** describe cómo se organizan los datos. Los **datos seed** son ejemplos inventados. Una **migración** aplica un cambio a la base de datos de forma ordenada.

## Paso 4: acordar un ejemplo antes de programar

Escriban juntos dos ejemplos sencillos en `docs/api/contracts.md`:

```text
Insertar: la pantalla envía el título y contenido; la API guarda el artículo y confirma que se guardó.
Listar: la pantalla pide los artículos guardados; la API devuelve una lista. Si todavía no hay artículos, devuelve una lista vacía y la pantalla muestra un mensaje claro.
Si falta un campo requerido, la pantalla muestra un mensaje claro y la API no guarda el artículo.
```

El ejemplo es un acuerdo, no una instrucción para crear una ruta nueva sin revisar las existentes. La IA debe localizar la ruta actual y explicar cómo se conectaría con este acuerdo.

### Contrato de ejemplo que pueden adoptar

Antes de dividir el trabajo, acuerden una sola forma de enviar y recibir un artículo. Este ejemplo es ficticio y sirve como punto de partida; el equipo puede cambiarlo antes de implementarlo.

    GET /api/articles
    Respuesta 200: []

    POST /api/articles
    Solicitud:
    {
      "title": "Guía de viajes",
      "content": "Guía ficticia para preparar un viaje."
    }

    Respuesta 201:
    {
      "id": 1,
      "title": "Guía de viajes",
      "content": "Guía ficticia para preparar un viaje."
    }

    POST con title vacío o content faltante
    Respuesta 400; el artículo no se guarda.

El nombre de la ruta y la estructura de la respuesta son acuerdos del ejemplo, no una exigencia de Hono. Si el equipo los cambia, actualicen el contrato, la pantalla, la API y las pruebas en el mismo trabajo.

**Punto de control API:** la lista empieza vacía; una solicitud válida devuelve el artículo guardado y la siguiente consulta lo incluye; una solicitud inválida devuelve un error claro y no agrega un artículo.

### Del contrato a la pantalla

| Acción de la persona | Resultado esperado |
| --- | --- |
| Abre la app cuando no hay artículos | La lista vacía explica que aún no hay artículos y permite agregar uno. |
| Envía título y contenido válidos | Ve un mensaje de éxito y el artículo aparece una sola vez en la lista. |
| Actualiza la página | El artículo sigue visible porque se guardó en SQLite. |
| Envía el formulario con un campo vacío | Ve un mensaje que explica qué falta; la lista y la base de datos no reciben un artículo nuevo. |
| La API no está disponible o responde con error | La página muestra un mensaje recuperable; no muestra una traza interna. |

Conviertan estas acciones en casos de prueba antes de dividir la implementación. Para cada caso escriban primero el resultado esperado y, después de ejecutarlo, anoten el resultado observado. Una captura o un comentario de IA no reemplaza la salida real de la app o de las pruebas.

## Paso 5: asignar roles y dividir el trabajo

Registren las personas responsables en `docs/team/assignments.md`. En un grupo de cuatro, asignen producto/coordinación, web, API y datos a una persona cada uno. En un grupo de tres, una persona coordina producto, otra web y la tercera API junto con datos. QA se comparte: una persona distinta coordina las pruebas cada semana. Quien implementa un cambio no lo revisa a solas.

Para este ejemplo:

1. **Producto/coordinación** usa Codex o Claude para redactar el brief, los criterios y las primeras tareas Markdown; confirma con el equipo que el alcance de cuatro semanas sea insertar y listar artículos.
2. **API y datos** acuerdan los campos mínimos del artículo y, con ayuda del asistente, preparan el contrato y `docs/data/model.md`. En un equipo de tres, la misma persona puede coordinar ambas áreas.
3. **Web** usa el asistente para proponer y crear la página con formulario y lista, y actualiza cualquier documento de pantalla afectado.
4. **Datos** prepara una tabla y unos pocos artículos inventados; **API** implementa insertar y listar usando el contrato. Ambas personas revisan que código y Markdown coincidan.
5. La persona que coordina **QA** esa semana usa el asistente para proponer casos, ejecuta pruebas de un cambio de otra persona, registra lo que observó y ayuda a preparar la demo.

Después de aprobar el contrato, web puede avanzar con el ejemplo mientras API y datos completan la respuesta real. La persona de producto mantiene el alcance pequeño y todos revisan que las partes usen el mismo formato.

## Paso 6: construir y revisar en orden

- Empiecen con el repositorio nuevo y usen Codex o Claude para crear la estructura mínima; el equipo revisa y explica cada archivo de código y Markdown.
- Preparen la tabla y unos pocos artículos inventados para la demo.
- Implementen la API para insertar un artículo y devolver la lista.
- Creen la página con formulario y lista; conéctenla a la API.
- Comprueben inserción, lista vacía, mensaje de éxito/error y que el registro sigue después de actualizar la página.
- Si queda tiempo después de verificar insertar y listar, agreguen editar o eliminar con criterios propios. No agreguen búsqueda ni funciones de IA a la app durante este entrenamiento.
- Ejecuten únicamente los comandos que existen en el README y escriban el resultado que observaron.
- Registren qué cambió, qué falta y cómo repetir la demo en `docs/delivery/handoff.md`.

## Puntos de control: comprueben una capa antes de sumar la siguiente

| Etapa | Resultado que deben observar | Si no ocurre |
| --- | --- | --- |
| Repo y reglas | Otra persona sigue README desde un clon limpio e inicia la estructura. El brief, AGENTS y README coinciden con el alcance y los comandos reales. | Pausen el desarrollo de funciones y corrijan el arranque o las instrucciones. |
| Datos y API | La tabla y migración existen; insertar y listar cumplen el contrato; una entrada inválida no se guarda. | Comparen el esquema, la validación, la ruta y el contrato con una misma entrada de ejemplo. |
| Pantalla | El formulario guarda el registro y la lista lo muestra; actualizar conserva el dato; los estados vacío, error y éxito se entienden. | Revisen la respuesta real de la API y el estado que muestra la página. |
| Pull request | Otra persona puede explicar el cambio; CI pasa; la entrega incluye criterio, archivos, comandos/resultados, límites y siguiente paso. | No integren el cambio hasta tener revisión y resultados observados. |
| Transferencia | Una persona ajena sigue README, prueba insertar/listar, encuentra el código y elige una tarea pendiente. | Anoten la pregunta que tuvo y mejoren el archivo donde faltó información. |

Para cada cambio, usen este ciclo AI-first:

    1. Contexto: indica el brief, las reglas, el contrato, tu rol y el criterio.
    2. Plan: pide archivos, pasos, riesgos y verificaciones; no permitas cambios todavía.
    3. Revisión: el equipo corrige o aprueba el plan.
    4. Cambio: pide una sola tarea acotada y actualizaciones de documentación relacionadas.
    5. Comprobación: ejecuta los comandos reales y anota su resultado; no aceptes resultados inventados.
    6. Revisión humana y handoff: otra persona lee el diff; la PR registra propósito, decisión, resultados, límites y siguiente paso.

## Prueba de transferencia: ¿puede continuar otro equipo?

Antes de cerrar, una persona que no participó en el desarrollo recibe una copia limpia del repositorio. El equipo original observa y toma nota, pero no le dicta instrucciones.

La persona nueva debe poder:

1. Encontrar la raíz y seguir README para instalar e iniciar la aplicación.
2. Leer el brief y los criterios, insertar un artículo y demostrar que aparece en la lista.
3. Encontrar la pantalla, la API, el contrato y los datos en el mapa de carpetas.
4. Ejecutar las comprobaciones indicadas y entender los resultados y límites registrados.
5. Encontrar en el handoff una tarea pendiente y explicar qué archivos podría tocar.

Si se atasca, el equipo original mejora README, AGENTS, el mapa, el backlog o el handoff donde corresponda. Cuando un equipo nuevo cambie el contrato, el modelo de datos o la estructura, debe revisar las áreas afectadas, actualizar las pruebas y dejar escrita la razón de la decisión. Así el proyecto se puede modificar sin depender de los autores originales.

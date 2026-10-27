# Roles del equipo

Los roles reparten la responsabilidad de preparar, construir y revisar el proyecto. Son áreas de trabajo, no permisos ni silos: el equipo conversa sobre los cambios y otra persona revisa cada entrega. En un grupo pequeño, una persona puede llevar más de un rol.

Cada integrante usa **Codex o Claude** para apoyar las tareas de su rol, tanto al construir la app como al crear o actualizar los documentos Markdown del proyecto. La persona responsable revisa el plan y los cambios; el asistente no toma decisiones ni entrega trabajo por sí solo.

## Roles y responsabilidades

| Rol | En palabras sencillas | Responsabilidades y archivos habituales |
| --- | --- | --- |
| **Producto y coordinación** | Mantiene claro qué problema resuelve el proyecto y qué sigue. | Con Codex o Claude, prepara borradores de `docs/product/brief.md`, criterios y tareas. Facilita acuerdos, prioriza y prepara la demo; el equipo confirma alcance y prioridades. |
| **Web / interfaz** | Construye lo que la persona ve y usa. | Con el asistente, prepara páginas, formularios, resultados y mensajes de espera, éxito, vacío y error; revisa teclado y pantallas pequeñas. Trabaja principalmente en `apps/web/` y actualiza la documentación afectada. |
| **API / backend** | Conecta la pantalla con las reglas y los datos. | Con el asistente, acuerda solicitudes y respuestas con web y datos; crea rutas, valida entradas, devuelve errores claros y documenta el contrato en `docs/api/contracts.md`. Trabaja principalmente en `apps/api/` y coordina `packages/contracts/`. |
| **Datos / base de datos** | Decide cómo guardar la información que necesita el flujo. | Con el asistente, define tablas y campos, prepara migraciones y datos inventados, y mantiene `docs/data/model.md`. Trabaja principalmente en `apps/api/src/db/` y `apps/api/drizzle/`. |
| **QA / pruebas** | Comprueba que el proyecto haga lo acordado y deja evidencia. | Con el asistente, convierte criterios en pasos repetibles y prepara listas de revisión; una persona ejecuta las pruebas y anota lo que observó en `docs/qa/test-cases.md`. También apoya el handoff y la demo. QA es responsabilidad de todo el equipo; una persona coordina cada semana. |

**Codex o Claude ayudan al equipo; no son integrantes ni responsables del cambio.** La persona asignada usa el asistente para entender, planear, crear o actualizar código y Markdown, y explica lo que acepta. El responsable del programa o management fija límites y decisiones que el equipo no puede tomar por su cuenta; no es uno de estos roles de desarrollo.

## Cómo formar un grupo de 3 o 4

### Grupo de 4 personas

1. Producto y coordinación.
2. Web / interfaz.
3. API / backend.
4. Datos / base de datos.

QA se comparte: una persona distinta coordina las pruebas de cada semana, y quien escribe un cambio no lo aprueba a solas. No hace falta una función de IA dentro del producto. Todas las personas usan Codex o Claude para tareas de su rol y revisan los cambios con otra persona.

### Grupo de 3 personas

1. Producto y coordinación.
2. Web / interfaz.
3. API / backend **y** datos / base de datos.

QA sigue siendo compartido y la coordinación de pruebas rota entre las tres personas. Pidan una revisión de alguien que no haya hecho el cambio. Si una persona concentra demasiado trabajo de API y datos, reduzcan el alcance y ayúdense en pareja.

En ambos tamaños, los roles principales pueden mantenerse durante el proyecto para que cada área tenga una persona de referencia. Para aprender el flujo completo, cada integrante también participa en la revisión de otra área y explica al menos un cambio fuera de su especialidad.

## Cómo coordinarse durante las cuatro semanas

| Semana | Quién coordina | Qué hacen las demás personas |
| --- | --- | --- |
| **1 · Definir** | Producto facilita la elección y redacta el primer borrador. | Todas las personas eligen el flujo, revisan criterios, conocen las carpetas y acuerdan responsabilidades. |
| **2 · Acordar datos y API** | API y datos redactan juntos el contrato y el modelo. | Producto confirma los criterios; web prepara la pantalla usando el mismo ejemplo de datos. Nadie cambia el formato compartido sin avisar a sus consumidores. |
| **3 · Construir y conectar** | Web coordina el flujo visible; API y datos apoyan la integración. | Cada persona usa Codex o Claude para completar tareas de su rol, incluidas las actualizaciones Markdown necesarias. El equipo revisa el código y la documentación. La app no necesita una función de IA integrada. |
| **4 · Comprobar y entregar** | Una persona que no hizo la última tarea coordina QA y la demo. | Todas las personas siguen criterios, registran resultados, revisan cambios y actualizan README y la nota de entrega. |

Registren los nombres o iniciales, el rol principal, el respaldo y la rotación de QA en `docs/team/assignments.md`. Para cada tarea del backlog anoten una persona responsable, otra revisora, archivos probables y cómo comprobar el resultado. No asignen una tarea solo a “la IA”.

## Cómo cambiar de equipo sin perder continuidad

Para cada rol, anoten una persona principal y una de respaldo en `docs/team/assignments.md`. La persona de respaldo debe poder encontrar los archivos de esa área, iniciar el flujo y explicar una comprobación básica. Cuando cambie una persona o un equipo:

1. La persona saliente actualiza el estado, los límites y el siguiente trabajo en `docs/delivery/handoff.md`.
2. La persona entrante sigue README y AGENTS desde una copia limpia y revisa los criterios, el mapa y el backlog.
3. Si modifica contratos, datos o arquitectura, avisa a las áreas afectadas y actualiza pruebas y documentación en el mismo cambio.
4. El equipo entrante registra decisiones nuevas y deja el siguiente handoff preparado para quien llegue después.

La conversación de transferencia ayuda, pero no reemplaza los archivos del proyecto. Si la persona nueva necesita una explicación que no encuentra en el repositorio, anoten esa brecha y documéntenla.

## Responsabilidades compartidas

- Todas las personas entienden la necesidad, los criterios y el contrato del primer flujo.
- La persona responsable propone el cambio; otra persona lo revisa antes de integrarlo.
- Web, API y datos acuerdan el formato antes de trabajar en paralelo.
- Cada integrante entrega el código y los documentos Markdown que corresponden a su rol; actualiza los documentos relacionados cuando cambia el proyecto.
- Antes de editar, el asistente propone un plan; el equipo lo revisa y acuerda una tarea pequeña.
- QA verifica lo que realmente ocurrió; no reporta una prueba que no ejecutó.
- Se usan datos inventados. No se agregan credenciales, clientes, sistemas reales o servicios externos.
- Un rol puede sugerir, pero los cambios compartidos, de alcance o seguridad se acuerdan con las personas afectadas.

# Empieza aquí: prepara y desarrolla un proyecto AI-First

El objetivo del curso es que cada equipo elija una propuesta y aprenda, paso a paso, a desarrollar desde cero una app web y sus documentos de proyecto usando Codex o Claude. La persona que lleva cada rol usa el asistente para entender su trabajo, proponer y crear archivos de código y Markdown, y explicar errores. El equipo acuerda qué construir, revisa los cambios y prueba cada parte; la IA ayuda, pero las personas deciden y se hacen responsables del resultado.

Es un curso autoguiado de nivel principiante a intermedio, sin instructor ni sesiones en vivo obligatorias. No presupone experiencia con programación, Git ni creación de aplicaciones. Empieza con pasos guiados y conceptos básicos, y avanza hasta que el equipo pueda planear, construir, revisar y entregar una primera versión pequeña. Cada módulo explica los términos que usa y propone un cambio pequeño para practicar.

Son cuatro semanas para equipos de 3–4 personas, con 2–8 horas de trabajo por persona cada semana. Cada equipo elige una propuesta y desarrolla la misma durante el curso. Usen datos inventados.

## Cómo usar este sitio

Este sitio es el **material de entrenamiento**: contiene lecciones, briefs y una demo de referencia. La aplicación del equipo vive en **otro repositorio Git**, creado y compartido en la plataforma aprobada por la organización. Abran ese repositorio en Codex o Claude cuando pidan ayuda para cambiar archivos. No construyan el capstone dentro del repositorio del sitio.

Sigan este orden:

1. Lean esta guía y el módulo 00.
2. Formen el grupo, elijan un brief y asignen responsables y revisores.
3. Creen o clonen el repositorio del equipo. Configuren allí README.md y AGENTS.md antes de implementar funciones.
4. Trabajen los módulos en orden. Usen la demo y el recorrido de integración como material de consulta; la demo no es el código inicial del equipo.
5. Cierren con una revisión de transferencia: alguien que no construyó el cambio sigue README y completa una tarea pequeña.

Antes de empezar, el equipo necesita acceso al asistente aprobado, a la plataforma de Git y al repositorio privado; cada participante necesita Bun, Git y un editor compatible. Usen la versión de Bun indicada en el [README principal del sitio](../../README.md) (actualmente 1.4.4). El responsable del programa debe indicar las políticas y cómo instalar las herramientas. Para iniciar **este sitio**, sigan sus comandos locales en ese README.

## Qué construirán

El entregable mínimo es una app web que el grupo crea desde cero en un repositorio nuevo. Debe permitir **insertar** registros (crear/guardar) y **listarlos** (consultarlos) desde la pantalla, usando datos de práctica guardados en la base de datos. Para que quepa en cuatro semanas, elijan un solo tipo de registro, pocos campos y una pantalla. **Editar y eliminar son mejoras opcionales.** Cada participante completa y explica al menos un cambio asistido por IA; el equipo entrega una app demostrable y documentación que permita a otra persona ejecutarla y continuarla.

| Proyecto | App mínima sugerida |
| --- | --- |
| **Agenda** | Insertar citas de práctica y listar las citas guardadas. |
| **Base de conocimiento** | Insertar artículos inventados y listarlos. |
| **Bandeja de soporte** | Insertar tickets inventados y listarlos. |

El [recorrido de Base de conocimiento](project-integration-walkthrough.md) es un ejemplo. Cada equipo crea su aplicación desde cero y puede elegir otra de las propuestas. Primero terminen insertar y listar; agreguen editar o eliminar solo si queda tiempo. No conecten sistemas reales ni usen documentos, tickets o datos de clientes.

Los briefs también describen posibles funciones posteriores, como búsqueda, filtros o reglas de citas. Este curso enseña y evalúa primero el flujo mínimo de insertar y listar. Registren las funciones mayores como trabajo posterior, salvo que el responsable del programa acuerde más tiempo y un alcance distinto para el grupo.

## Si es tu primera aplicación

No necesitas conocer React, APIs o bases de datos antes de empezar. Sigue los módulos en orden, trabaja en pareja y pídele a Codex o Claude que explique cada archivo y cambio con palabras sencillas. Acepta solo cambios que tú y otra persona del equipo puedan explicar.

Empiecen con una sola tarea pequeña. No hace falta construir una aplicación completa de una vez: primero acuerden qué hará, luego creen una parte, y comprueben juntos que funciona.

## Roles para un grupo de 3 o 4 personas

Cada persona tiene un área principal, pero el equipo trabaja en conjunto y revisa los cambios entre pares. Para cuatro integrantes, asignen producto/coordinación, web, API y datos, una persona por área. Para tres, combinen API y datos en una persona. QA no es de una sola persona: roten quién coordina las pruebas cada semana y pidan siempre una revisión distinta de quien hizo el cambio. No hay un rol separado de IA: cada integrante usa Codex o Claude para tareas de su área, incluidos el código y los documentos Markdown.


| Rol | Responsabilidad principal | Archivos habituales |
| --- | --- | --- |
| **Producto y coordinación** | Con Codex o Claude, redacta y actualiza el brief, los criterios y tareas; el equipo acuerda prioridades y alcance. | `docs/product/brief.md`, `docs/product/acceptance-criteria.md`, `docs/backlog/` |
| **Web / interfaz** | Con el asistente, crea la página, el formulario para insertar y la lista; explica y actualiza la documentación afectada. | `apps/web/`, documentación de la pantalla si hace falta |
| **API / backend** | Con el asistente, crea las operaciones para insertar y listar, valida solicitudes y mantiene el contrato documentado. | `apps/api/src/`, `packages/contracts/`, `docs/api/contracts.md` |
| **Datos / base de datos** | Con el asistente, define la tabla y los campos, prepara datos inventados y documenta el modelo. | `apps/api/src/db/`, `apps/api/drizzle/`, `docs/data/model.md` |
| **QA / pruebas** | Con el asistente, prepara casos y listas de revisión; ejecuta las comprobaciones y registra solo resultados observados. La coordinación rota cada semana. | `docs/qa/`, pruebas de web y API, `docs/delivery/handoff.md` |

Registren las asignaciones en `docs/team/assignments.md`. La [guía de roles](../roles.md) explica qué hace cada área y cómo coordinarse semana a semana.

## Preparen el proyecto para el siguiente equipo

Piensen en la persona que recibirá el repositorio sin haber estado en estas reuniones. Debe poder instalarlo, iniciarlo, entender qué hace y escoger el siguiente trabajo leyendo el proyecto.

- Mantengan en `README.md` los requisitos y comandos que sí funcionan, desde la raíz correcta.
- Mantengan en `AGENTS.md` el mapa, las reglas y el stack actual.
- Guarden acuerdos, contratos y decisiones en `docs/`; no dejen la única explicación en chats o en la memoria de alguien.
- Dejen tareas pendientes pequeñas con criterios y archivos probables en el backlog.
- Anoten en el handoff el estado actual, límites conocidos, comprobaciones con resultados reales y próximos pasos. Cuando modifiquen una función, revisen antes sus criterios, contratos y pruebas; actualicen la documentación en el mismo cambio.
- Asignen a cada área una persona de respaldo y actualicen el mapa cuando cambie el equipo.

En la semana 4, en el módulo 04, otra persona o equipo seguirá las instrucciones sin que el grupo autor le dicte los pasos. Registren dónde se atascó y mejoren la documentación.

## Palabras básicas

| Palabra | Significado sencillo |
| --- | --- |
| **Repositorio** | La carpeta del proyecto y su historial de cambios. |
| **Git** | La herramienta que guarda el historial de cambios del proyecto. |
| **Rama** | Un espacio de trabajo separado para desarrollar una tarea. |
| **Commit** | Un punto guardado del trabajo, con una breve descripción. |
| **Pull request** | Una propuesta para que otra persona revise cambios antes de incorporarlos al trabajo principal. |
| **Ruta de archivo** | La dirección de un archivo. Por ejemplo, docs/product/brief.md está dentro de docs, luego product. |
| **Pantalla** | Lo que ve y usa la persona en la aplicación. |
| **API** | La puerta por la que la pantalla pide o guarda información. |
| **Base de datos** | El lugar donde la aplicación guarda información. |
| **Contrato** | El acuerdo sobre qué información envía una parte y qué recibe de la otra. |
| **Criterio** | Un resultado visible que nos permite decidir si la función está lista. |
| **CRUD** | Cuatro acciones: crear, consultar, editar y eliminar. En este curso, el requisito es insertar y listar; editar y eliminar son opcionales. |
| **Prueba** | Una comprobación que se puede repetir para ver si algo funciona. |
| **Asistente de programación** | Codex o Claude pueden explicar el repositorio, proponer y editar código y archivos Markdown. El equipo revisa y decide qué aceptar. |

Si aparece una palabra nueva, pídanle al asistente que la explique en una frase y señale un archivo de ejemplo. No hace falta memorizar el glosario.

## Ruta de cuatro semanas

Los seis módulos estiman unas **12 horas guiadas**: 2 horas en la semana 1, 4 horas en la semana 2, 4 horas en la semana 3 y 2 horas en la semana 4. Ese tiempo incluye ejercicios de equipo; reserven además tiempo suficiente para integrar y revisar el código. Si el grupo solo dispone de 2 horas cada semana, acuerden extender el calendario con el responsable del programa en lugar de saltarse verificaciones.

| Semana | Módulo | Trabajo del equipo | Archivos y evidencia |
| --- | --- | --- | --- |
| 1 · Elegir y preparar | [00 · Carpetas y preparación del proyecto](00-team-harness.md) | Elegir una propuesta, asignar roles, crear un repositorio nuevo y preparar la estructura desde cero con Codex o Claude. | README.md, AGENTS.md, resumen, criterios para insertar/listar, mapa, primera tarea y primera rama. |
| 2 · Guardar y consultar datos | [03 · Datos](03-database.md) y [02 · API](02-backend.md) | Crear una tabla sencilla y acordar cómo insertar un registro y listar los guardados. | Esquema, cambio de base, datos inventados, dos operaciones de API y pruebas. |
| 3 · Construir la pantalla | [01 · Pantalla](01-ui.md) | Crear el formulario para insertar y mostrar la lista conectada a la API. | Página sencilla, formulario, lista, mensajes y pruebas de pantalla. |
| 3 · Desarrollar con IA | [05 · Trabajar con Codex o Claude](05-ai-assisted-development.md) | Practicar un ciclo completo con el asistente: contexto, plan, cambio pequeño, verificación, revisión y explicación. | Un cambio de código o Markdown por persona, con diff revisado y evidencia observada. |
| 4 · Revisar y entregar | [04 · QA y entrega](04-qa.md) | Comprobar que insertar y listar funciona de principio a fin, revisar pull requests y preparar una demo que otro equipo pueda repetir. Editar/eliminar son opcionales. | Funciones mínimas probadas, README actualizado, pull request revisada, handoff y prueba de transferencia. |

## Cuándo está listo el equipo

Al finalizar, el grupo debe poder mostrar evidencia de que:

- La app inicia desde un clon limpio y cumple sus criterios principales con datos inventados.
- README y AGENTS explican cómo empezar, cómo está organizado el proyecto y qué límites debe respetar el asistente.
- Los contratos, decisiones, tareas y verificaciones están escritos en el repositorio y actualizados con los cambios.
- Cada pull request deja un handoff breve: propósito, decisión, comprobaciones ejecutadas y resultados reales, límites pendientes y siguiente paso.
- CI y el escaneo de secretos aprobados pasan, y otra persona revisó el cambio. La persona responsable del repositorio confirma que la rama principal requiere pull request, CI y revisión.
- Una persona ajena al equipo clona el repositorio, lo ejecuta, completa una tarea pequeña y explica qué comprobó sin recibir instrucciones orales.
- El equipo deja reglas y una plantilla reutilizable para el siguiente grupo. Quiten datos de práctica, secretos y decisiones específicas antes de compartirla.
- Los integrantes pueden explicar cómo su área se conecta con la pantalla, la API y los datos.
- El grupo, el proyecto y los integrantes con sus roles aparecen en la sección Grupos y roles. En este piloto la lista vive en una instancia local; no es un roster compartido entre equipos remotos.

La configuración de ramas protegidas y el acceso a una plantilla organizacional pueden depender de management. Si el equipo no tiene permisos, registre el bloqueo y a la persona que debe resolverlo; no reporte el criterio como completado.

## Cómo desarrollar la app y sus documentos con Codex o Claude

Codex puede trabajar con el repositorio abierto en el editor y permite revisar los cambios junto al código; consulta la [guía oficial de Codex para IDE](https://learn.chatgpt.com/docs/ide). Claude también se puede usar para el mismo flujo. Cada integrante debe trabajar desde su rol y en el repositorio nuevo del equipo, no desde el código del sitio del curso.

El **Tutor IA del sitio** ayuda con las lecciones y ofrece explicaciones o pistas a partir del módulo. Para crear o cambiar archivos del proyecto, usen Codex o Claude con el repositorio del equipo abierto. Si el tutor no tiene un proveedor aprobado disponible, copien el prompt contextualizado del módulo al asistente aprobado. La app del equipo no necesita tener IA integrada: Codex o Claude se usa para desarrollar el proyecto.

1. **Elijan la propuesta y repartan roles.** Cada tarea debe tener responsable, revisor y archivos que podrían cambiar.
2. **Abran el repositorio del equipo.** Antes de pedir cambios, pídanle a Codex o Claude que explique la estructura y lea `README.md`, `AGENTS.md` y los Markdown del proyecto.
3. **Pidan un plan desde su rol.** Indiquen si son producto, web, API, datos o QA. Pidan que identifique tanto los archivos de código como los `.md` que hacen falta crear o actualizar. Al principio, pidan el plan sin editar archivos.
4. **Aprueben y construyan una tarea pequeña.** Después de revisar el plan, pidan ayuda para implementar solo esa tarea desde cero. Actualicen los documentos relacionados en el mismo trabajo.
5. **Revisen con otra persona.** Lean el diff, pidan que explique cada archivo y acepten solo cambios que puedan explicar. Una persona distinta al autor revisa el cambio.
6. **Comprueben y guarden el trabajo.** Sigan los comandos del README, prueben la función y anoten resultados reales. Usen una rama y Git para guardar los avances.

Primer prompt de ejemplo:

> Somos un equipo principiante y elegimos [agenda / base de conocimiento / bandeja de soporte]. Mi rol es [rol]. Creamos este repositorio desde cero. Lee los archivos actuales; si falta README.md, AGENTS.md o la documentación del proyecto, propón cuáles crear. Nuestra app mínima inserta un registro y lo lista usando datos inventados. Basado en mi rol, propón los archivos de código y Markdown que debo crear o actualizar, qué debe contener cada uno y una tarea pequeña para empezar. No edites nada todavía. No agregues editar ni eliminar. Explícalo en palabras sencillas y espera a que el equipo revise el plan.

Cada integrante usa Codex o Claude desde su rol para planear y desarrollar el proyecto, incluso para redactar los Markdown. La meta es que el equipo entienda cada cambio, lo revise y decida qué acepta; no agregar IA como función dentro de la app.

## Ritmo de aprendizaje y trabajo

Al recorrer cada módulo, sigan cinco pasos: **aprendan** una idea breve, **observen** un ejemplo resuelto, **practiquen** con una tarea del proyecto según su rol, **comprueben** el resultado con un checkpoint y **registren** el artefacto y lo aprendido. El ritmo es flexible; cada persona distribuye sus 2–8 horas semanales.

Para cada tarea del proyecto, todos los roles practican el mismo ciclo: **definir** el resultado, **planificar** e identificar archivos, **construir** un cambio pequeño, **verificarlo** con evidencia, **revisarlo** con otra persona y **entregarlo** con un resumen. Los documentos Markdown de producto, API, datos, QA y handoff forman parte de lo que el equipo crea y mantiene. Guardar prompts o skills reutilizables es opcional.

## Herramientas del proyecto

No es necesario memorizarlas; cada módulo las introduce cuando hacen falta:

- **React y Vike** ayudan a mostrar las páginas y pantallas.
- **TypeScript** ayuda a encontrar errores en el código.
- **Bun** inicia la aplicación y administra sus paquetes.
- **Hono** organiza las rutas de la API.
- **Drizzle y SQLite** ayudan a describir y guardar los datos durante la práctica local; para un despliegue compartido aprobado se usa PostgreSQL.
- **Zod** comprueba que los datos tengan el formato acordado.

## Límites

Usen solo datos inventados. No creen autenticación propia, no publiquen esta versión de práctica ni agreguen conexiones externas o servicios de IA sin aprobación. Las personas del equipo son responsables de revisar los cambios que sugiera la IA.

Para ejemplos de responsabilidades, revisen la [guía de roles](../roles.md). Cada módulo incluye un objetivo, archivos para preparar, ejercicio guiado, prompt que pueden pegar en Codex o Claude y revisión del equipo.

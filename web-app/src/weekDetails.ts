export const weekDetails = [
  {
    "week": "01",
    "eyebrow": "SEMANA 1 · DESCUBRIR, PLANEAR Y DISEÑAR",
    "title": "Definir el proyecto y preparar la base",
    "summary": "El equipo entiende el problema, acuerda el alcance y deja listo el plan, la arquitectura, el monorepo y sus skills antes de desarrollar.",
    "tasks": [
      "Discovery & Research: entiendan quién usará la solución, qué problema resuelve, cómo funciona hoy y qué límites deben respetar.",
      "Requirements & Planning: acuerden objetivos observables, alcance, exclusiones, criterios de aceptación, tareas y dependencias del proyecto.",
      "Architecture & Design: dibujen los componentes y el flujo de punta a punta; acuerden contratos, datos, decisiones técnicas y estados de pantalla.",
      "Creen el monorepo con una estructura y comandos iniciales; definan skills base que incorporen el contexto, las reglas y las verificaciones del equipo."
    ],
    "deliverables": [
      "Contexto de la aplicación y problema",
      "Alcance, objetivos y criterios",
      "Plan del proyecto y dependencias",
      "Documento de arquitectura y diseño",
      "Monorepo inicial con instrucciones para comenzar",
      "Skills base acordados para el proyecto"
    ],
    "roles": [
      {
        "name": "Backend / API",
        "summary": "Hacer explícita la conversación entre la interfaz y la API antes de implementarla.",
        "files": [
          "docs/api/contract.md",
          "packages/contracts/src/index.ts"
        ],
        "result": "Resultado: docs/api/contract.md y tipos compartidos acordados antes de dividir tickets dependientes.",
        "steps": [
          "Identifiquen las operaciones necesarias para completar el flujo elegido.",
          "Especifiquen entradas, respuestas, validaciones y errores con un ejemplo concreto.",
          "Revisen el contrato con frontend, datos y QA; aclaren qué capa es responsable de cada regla."
        ],
        "why": "Frontend necesita conocer los campos y errores antes de conectar pantallas. Datos valida que el contrato se pueda persistir y QA puede escribir casos sin adivinar el comportamiento.",
        "verification": "Revisen un ejemplo de éxito y uno de error con Frontend, Datos y QA. Los nombres del request, respuesta y errores deben coincidir con el flujo de pantalla, los criterios y el modelo.",
        "exampleTitle": "Ejemplo · Contrato que el equipo revisa",
        "example": "GET /api/availability?serviceId=S-1&date=2026-11-04\r\n200 { data: [{ startsAt: \"2026-11-04T09:00:00\", available: true }] }\r\n\nPOST /api/appointments\r\n{ serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\" }\r\n201 { data: { id: \"APT-101\", serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\", status: \"booked\" } }"
      },
      {
        "name": "Base de datos",
        "summary": "Definir los datos mínimos y las reglas que deben seguir siendo ciertas.",
        "files": [
          "docs/data/model.md"
        ],
        "result": "Resultado: docs/data/model.md y un primer fixture sintético versionado.",
        "steps": [
          "Dibujen las entidades a partir del flujo y de los criterios, no de supuestos futuros.",
          "Aclaren identificadores, relaciones, campos obligatorios, estados y restricciones.",
          "Preparen pocos datos sintéticos, repetibles y reconocibles para probar el caso normal y un límite."
        ],
        "why": "Un modelo mínimo evita guardar datos de más y permite que Backend implemente reglas sobre relaciones y restricciones acordadas, no sobre supuestos locales.",
        "verification": "Cada dato que aparece en un criterio o contrato tiene un lugar definido. Revisen relaciones, campos obligatorios y restricciones; el ejemplo usa datos sintéticos y se puede repetir.",
        "exampleTitle": "Ejemplo · Modelo y datos de partida",
        "example": "Service(id, name, durationMinutes) · AvailabilityRule(id, weekday, startTime, endTime) · Appointment(id, serviceId, startsAt, status). A unique constraint or transaction must prevent two active appointments in the same slot.\r\n\nFixture sintético:\r\n[{\"id\":\"S-1\",\"service\":\"Consulta inicial\",\"durationMinutes\":30},{\"id\":\"S-2\",\"service\":\"Seguimiento\",\"durationMinutes\":45}]\r\n[{\"date\":\"2026-11-04\",\"start\":\"09:00\",\"available\":true},{\"date\":\"2026-11-04\",\"start\":\"09:30\",\"available\":false}]"
      },
      {
        "name": "Frontend",
        "summary": "Convertir el flujo acordado en pantallas y estados que la persona pueda entender.",
        "files": [
          "docs/product/screen-flow.md"
        ],
        "result": "Resultado: docs/product/screen-flow.md con pantallas, acciones, estados y campos del contrato.",
        "steps": [
          "Dibujen el recorrido de pantalla en pantalla y qué acción inicia cada paso.",
          "Para cada pantalla, describan carga, resultado, vacío y error; no asuman que siempre hay datos.",
          "Confirmen con backend los nombres y formas del contrato antes de crear respuestas ficticias en la UI."
        ],
        "why": "El mapa permite que QA derive casos y que Backend y Datos entiendan qué debe ocurrir antes de construir. También evita diseñar pantallas con respuestas que el contrato no ofrece.",
        "verification": "Cada paso del flujo tiene una acción, campos del contrato y estados de carga, éxito, vacío y error. QA confirma que cada criterio se puede ver en una pantalla.",
        "exampleTitle": "Ejemplo · Recorrido y estados de pantalla",
        "example": "Una persona que atiende un negocio pequeño y necesita organizar sus citas.\r\n\nFlujo: Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.\r\n\nEn cada paso, acuerden: cargando · resultado · vacío · error."
      },
      {
        "name": "QA / pruebas",
        "summary": "Facilitar acuerdos del equipo y convertirlos en comprobaciones que otra persona pueda repetir.",
        "files": [
          "docs/product/brief.md",
          "docs/qa/acceptance.md"
        ],
        "result": "Resultado: docs/product/brief.md y docs/qa/acceptance.md con alcance del equipo y criterios Given / When / Then.",
        "steps": [
          "Faciliten que todo el equipo defina usuario, necesidad, alcance y exclusiones antes de escribir los tickets.",
          "Transformen los criterios acordados en una condición inicial, una acción y un resultado observable.",
          "Agreguen al menos un caso límite, uno inválido y uno de estado vacío o error.",
          "Confirmen con frontend que los estados y mensajes ayudan a recuperarse; acuerden evidencia y comando de verificación."
        ],
        "why": "El brief pone límites al trabajo; los criterios observables permiten que las cuatro áreas construyan y revisen el mismo resultado.",
        "verification": "Cada criterio indica contexto inicial, acción y resultado observable. Incluyan el flujo normal, un límite, una entrada inválida y un caso vacío o de error; confirmen que todo cabe en el alcance del brief.",
        "exampleTitle": "Ejemplo · Acuerdo del equipo convertido en prueba",
        "example": "Usuario: Una persona que atiende un negocio pequeño y necesita organizar sus citas.\r\nProblema y flujo: Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.\r\nEn alcance: Consultar espacios disponibles; Crear una cita\r\nFuera de alcance: Calendarios externos\r\n\nDado que el equipo usa datos sintéticos de Agenda de citas\r\nCuando la persona completa el flujo\r\nEntonces: Un horario ocupado no se puede reservar de nuevo.\r\n\nAgreguen un ejemplo inválido y uno sin resultados."
      }
    ],
    "teamwork": "Todo el equipo participa en Discovery, Requirements y Architecture. Los focos por rol impulsan piezas del trabajo, mientras el grupo revisa y acuerda en conjunto el contexto, el alcance, el plan, la arquitectura, el monorepo y los skills.",
    "exitGate": "Cualquier integrante puede explicar el problema, el alcance y la arquitectura; encontrar el plan y las instrucciones del monorepo; y usar los skills base para comenzar la semana de desarrollo.",
    "teamPhases": [
      {
        "name": "Discovery & Research",
        "description": "Investigar a la persona usuaria, la necesidad, el flujo actual, las restricciones y los supuestos por validar."
      },
      {
        "name": "Requirements & Planning",
        "description": "Definir objetivos, alcance dentro y fuera, criterios de aceptación, plan, dependencias y coordinación del equipo."
      },
      {
        "name": "Architecture & Design",
        "description": "Diseñar componentes y flujo de datos, documentar decisiones y preparar la estructura de trabajo del repositorio."
      }
    ],
    "sharedOutputs": [
      {
        "title": "Contexto de la aplicación",
        "description": "Quién la usa, qué necesidad atiende, cuál es el flujo actual y qué restricciones aplican."
      },
      {
        "title": "Alcance y objetivos",
        "description": "Qué resultado busca el equipo, qué incluye, qué queda fuera y cómo se reconocerá el éxito."
      },
      {
        "title": "Plan del proyecto",
        "description": "Hitos, tareas, dependencias, coordinación entre focos y verificaciones previstas."
      },
      {
        "title": "Arquitectura y diseño",
        "description": "Componentes, recorrido web → API → datos, contratos, modelo inicial y decisiones técnicas."
      },
      {
        "title": "Monorepo preparado",
        "description": "Estructura inicial, convenciones, comandos de inicio y contexto útil para personas y agentes."
      },
      {
        "title": "Skills base",
        "description": "Flujos reutilizables con objetivo, contexto, pasos, resultado esperado y controles humanos."
      }
    ]
  },
  {
    "week": "02",
    "eyebrow": "SEMANA 2 · DESARROLLO Y CONSTRUCCIÓN",
    "title": "Construir el flujo acordado",
    "summary": "Desarrollar el alcance priorizado en incrementos pequeños; cada cambio debe cumplir un criterio y quedar revisado.",
    "tasks": [
      "Elijan el primer flujo priorizado y divídanlo en tickets pequeños con criterio, dependencias y forma de verificarlo.",
      "Antes de implementar, compartan con la IA el contexto del repo, el ticket y los contratos; revisen el plan y las pruebas propuestas.",
      "Construyan incrementos alineados con la arquitectura. Incluyan la prueba o evidencia que demuestra cada criterio.",
      "Revisen el diff con otra persona, ejecuten las comprobaciones pertinentes y registren en el PR los comandos, resultados y pendientes."
    ],
    "deliverables": [
      "Primer flujo desarrollado en incrementos",
      "Tickets enlazados a criterios y dependencias",
      "PRs pequeños con revisión humana",
      "Build, lint y pruebas pertinentes con resultados",
      "Cambios y pendientes listos para integrar en la semana 3"
    ],
    "roles": [
      {
        "name": "Backend / API",
        "summary": "Construir una operación a la vez y conservar el contrato acordado.",
        "files": [
          "apps/api/src/routes/<recurso>.ts",
          "apps/api/src/services/<recurso>.ts",
          "apps/api/test/<operacion>.test.ts"
        ],
        "result": "Resultado: Una operación implementada y probada, con un PR que enlaza el criterio y reporta los comandos y resultados reales.",
        "steps": [
          "Partan de una operación y un criterio priorizados; revisen el ejemplo de request, respuesta y errores del contrato.",
          "Pidan a la IA un plan de cambio y de pruebas dentro de la estructura aprobada; revisen ese plan antes de editar.",
          "Implementen la regla más pequeña que cumple el criterio y cubran el caso normal y al menos un error o entrada inválida.",
          "En el PR, enlacen el criterio, expliquen el diff y registren las verificaciones realmente ejecutadas."
        ],
        "why": "Separar la ruta HTTP de la regla de negocio hace el cambio más fácil de probar. La ruta conserva el contrato acordado y el test detecta si una modificación lo rompe.",
        "verification": "Comparen el caso normal y uno inválido con el contrato acordado. Confirmen status, respuesta y error; anoten los comandos y resultados reales en el PR.",
        "exampleTitle": "Ejemplo · Implementación guiada por contrato",
        "example": "GET /api/availability?serviceId=S-1&date=2026-11-04\r\n200 { data: [{ startsAt: \"2026-11-04T09:00:00\", available: true }] }\r\n\nPOST /api/appointments\r\n{ serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\" }\r\n201 { data: { id: \"APT-101\", serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\", status: \"booked\" } }\r\n\nAntes del PR: valida la entrada, cubre respuesta normal y error, y enlaza el criterio “Un horario ocupado no se puede reservar de nuevo.”."
      },
      {
        "name": "Base de datos",
        "summary": "Hacer que los datos del flujo se puedan crear y reconstruir en cualquier clon.",
        "files": [
          "apps/api/src/db/schema.ts",
          "apps/api/drizzle/<version>_<cambio>.sql",
          "apps/api/src/db/seed.ts"
        ],
        "result": "Resultado: Migración versionada y seed sintético que otra persona puede aplicar desde una base vacía.",
        "steps": [
          "Confirmen que cada campo y regla provienen del modelo y los criterios acordados; no agreguen datos por anticipar necesidades futuras.",
          "Implementen una migración versionada y reglas que protejan la integridad del flujo, sin depender de cambios manuales locales.",
          "Preparen un seed pequeño, sintético y repetible; usen identificadores estables para que el equipo pueda comparar resultados.",
          "Prueben la migración desde cero y documenten los comandos para preparar o reiniciar los datos."
        ],
        "why": "El esquema, la migración y el seed hacen que cualquier integrante pueda reconstruir el mismo estado inicial sin editar su base a mano.",
        "verification": "Desde una base vacía, apliquen las migraciones y carguen el seed. Repitan el proceso y confirmen IDs estables, integridad de los datos y resultados reproducibles; registren los comandos usados.",
        "exampleTitle": "Ejemplo · Cambio de esquema reproducible",
        "example": "Modelo: Service(id, name, durationMinutes) · AvailabilityRule(id, weekday, startTime, endTime) · Appointment(id, serviceId, startsAt, status). Una restricción única o una transacción debe impedir dos citas activas en el mismo horario.\n\nLa migración crea la estructura; el seed carga únicamente datos sintéticos:\n[{\"id\":\"S-1\",\"service\":\"Consulta inicial\",\"durationMinutes\":30},{\"id\":\"S-2\",\"service\":\"Seguimiento\",\"durationMinutes\":45}]\n[{\"date\":\"2026-11-04\",\"start\":\"09:00\",\"available\":true},{\"date\":\"2026-11-04\",\"start\":\"09:30\",\"available\":false}]\n\nIncluyan un comando documentado para reiniciar el entorno."
      },
      {
        "name": "Frontend",
        "summary": "Construir el camino principal con el contrato y estados claros para la persona usuaria.",
        "files": [
          "apps/web/pages/<flujo>/",
          "apps/web/src/<componentes-del-flujo>/",
          "apps/web/test/<flujo>.test.ts"
        ],
        "result": "Resultado: Una interacción navegable, alineada con el contrato y con estados principales comprobados.",
        "steps": [
          "Construyan una pantalla o interacción pequeña y conéctenla al contrato acordado.",
          "Si la API aún no está lista, usen solo el fixture del equipo y dejen visible qué integración sigue pendiente.",
          "Muestren carga, éxito, vacío y error con mensajes que expliquen qué pasó y cuál es el siguiente paso.",
          "Revisen etiquetas y navegación por teclado; incluyan la verificación correspondiente en el PR."
        ],
        "why": "Una pantalla construida contra el contrato evita respuestas inventadas. Los estados visibles ayudan a la persona a entender qué pasó y qué acción puede tomar.",
        "verification": "Comprueben la interacción con el contrato o fixture acordado. Si usaron un fixture, registren ese límite y el punto pendiente de integración. Revisen carga, éxito, vacío, error y acceso por teclado.",
        "exampleTitle": "Ejemplo · Estados de la interfaz",
        "example": "Flujo: Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.\r\n\n1. Cargando: informar que se consulta.\r\n2. Resultado: mostrar datos y acción siguiente.\r\n3. Vacío: explicar qué se puede cambiar.\r\n4. Error: indicar cómo recuperarse."
      },
      {
        "name": "QA / pruebas",
        "summary": "Convertir criterios en comprobaciones y revisar cada incremento mientras se construye.",
        "files": [
          "docs/backlog/T-###-<tema>.md",
          "apps/api/test/ o apps/web/test/",
          "docs/qa/test-plan.md"
        ],
        "result": "Resultado: Pruebas relacionadas con criterios y resultados observados registrados en los PRs.",
        "steps": [
          "Deriven casos de prueba de los criterios acordados antes de revisar el cambio: normal, inválido y límite.",
          "Coloquen cada prueba en la capa adecuada y eviten duplicarla sin una razón clara.",
          "Por cada PR, confirmen qué criterio cubre, revisen el diff y ejecuten la verificación documentada.",
          "Registren resultado observado, defectos y verificaciones que todavía estén pendientes para la integración."
        ],
        "why": "Probar durante la construcción detecta defectos cuando el cambio todavía es pequeño. La trazabilidad permite que el equipo entienda qué se cubrió y qué falta integrar.",
        "verification": "Cada prueba enlaza un criterio y tiene un comando documentado. Registren el resultado real, los defectos y los casos que quedan pendientes; distingan lo ejecutado de lo que aún no se comprobó.",
        "exampleTitle": "Ejemplo · Ticket y prueba asociados",
        "example": "Problema: la persona necesita completar consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.\r\nAlcance: Consultar espacios disponibles\r\nFuera de alcance: Calendarios externos\r\nCriterio: Un horario ocupado no se puede reservar de nuevo.\r\n\nPrueba normal: completar el flujo.\r\nCaso límite: Una cita creada aparece al consultar disponibilidad.\r\nEvidencia: comando, resultado real y enlace al PR."
      }
    ],
    "teamwork": "Quien revisa desde otro foco confirma el criterio, las pruebas y los pendientes. Ajusten contratos en equipo antes de seguir. Las rutas son ejemplos: adaptenlas al repo.",
    "exitGate": "El flujo avanza en incrementos pequeños; cada PR liga un criterio, registra verificaciones reales y tiene revisión humana. El trabajo pendiente para integrarlo en la semana 3 está claro."
  },
  {
    "week": "03",
    "eyebrow": "SEMANA 3 · INTEGRAR Y CONSTRUIR",
    "title": "Conectar las piezas en un flujo funcional",
    "summary": "Combinen los incrementos de la semana 2, conecten interfaz, API y datos, y mantengan un build reproducible para todo el equipo.",
    "tasks": [
      "Elijan un flujo vertical prioritario y acuerden el orden de integración, los contratos que toca y cómo comprobarlo.",
      "Conecten la interfaz con la API y la persistencia reales; completen el recorrido sin depender de fixtures locales.",
      "Después de cada integración, ejecuten el build y las comprobaciones pertinentes; registren el resultado y el cambio integrado.",
      "Resuelvan incompatibilidades en conjunto. Si deben cambiar un contrato, modelo o decisión, acuerden y comuniquen el ajuste a todos los focos."
    ],
    "deliverables": [
      "Flujo prioritario conectado de interfaz a datos",
      "Build integrado que el equipo puede repetir",
      "Comprobaciones de integración con resultados registrados",
      "Contratos, decisiones y bloqueos compartidos actualizados"
    ],
    "roles": [
      {
        "name": "Backend / API",
        "summary": "Conectar la operación con la regla y los datos reales, conservando el contrato acordado.",
        "files": ["apps/api/src/routes/<recurso>.ts", "apps/api/src/services/<recurso>.ts", "apps/api/test/<flujo-integrado>.test.ts"],
        "result": "Resultado: Operación conectada a persistencia, respuesta compatible con el contrato y comprobación integrada.",
        "steps": [
          "Coordinen con Frontend el request, la respuesta y los errores que necesita mostrar el flujo.",
          "Conecten la ruta con la regla de negocio y la capa de datos; eviten respuestas temporales que oculten fallos de integración.",
          "Ejecuten el caso integrado con datos sintéticos y corrijan discrepancias de formato, validación o estado."
        ],
        "why": "Una API conectada al comportamiento real evita que la interfaz parezca lista mientras la regla o los datos siguen aislados.",
        "verification": "Desde la interfaz o una comprobación de integración, envíen una operación válida y otra inválida. Confirmen respuesta, estado persistido y errores según el contrato.",
        "exampleTitle": "Ejemplo · Verificar una operación conectada",
        "example": "POST /api/appointments → 201 { id: \"APT-101\", status: \"booked\" }\n\nLa pantalla muestra la cita creada y una consulta posterior devuelve el mismo registro. Usen las rutas y formatos definidos por el proyecto."
      },
      {
        "name": "Base de datos",
        "summary": "Hacer que la operación integrada lea y guarde datos de forma consistente.",
        "files": ["apps/api/src/db/schema.ts", "apps/api/drizzle/<version>_<cambio>.sql", "apps/api/src/db/seed.ts"],
        "result": "Resultado: Migraciones y seed reproducibles; el flujo deja el estado esperado en la base.",
        "steps": [
          "Apliquen migraciones y datos sintéticos con los mismos comandos documentados para el equipo.",
          "Recorran el flujo completo y revisen relaciones, restricciones y estados que se guardan en cada operación.",
          "Prueben el recorrido repetido y confirmen que no crea duplicados ni depende de datos cargados a mano."
        ],
        "why": "La integración revela si las capas interpretan de la misma manera las relaciones y estados definidos en el modelo.",
        "verification": "Reconstruyan la base según las instrucciones del repo, ejecuten el flujo y consulten el resultado persistido. Confirmen relaciones y restricciones con el mismo fixture sintético.",
        "exampleTitle": "Ejemplo · Seguir el dato durante el flujo",
        "example": "Al crear una cita, comprueben que Appointment conserva el serviceId y el horario acordado. Consulten disponibilidad otra vez y verifiquen que el mismo horario ya no aparece libre."
      },
      {
        "name": "Frontend",
        "summary": "Cambiar los datos de prueba por la respuesta real y conectar todos los pasos del recorrido.",
        "files": ["apps/web/src/<componentes-del-flujo>/", "apps/web/test/<flujo>.test.ts", "docs/product/screen-flow.md si cambia el comportamiento"],
        "result": "Resultado: Recorrido completo conectado a la API y estados visibles basados en sus respuestas reales.",
        "steps": [
          "Conecten cada acción al endpoint y a los campos acordados; retiren el fixture temporal de ese flujo.",
          "Comprueben carga, resultado, vacío y errores que devuelve la API, con una acción clara para continuar cuando sea posible.",
          "Recorran el flujo con Backend y Datos; registren cualquier diferencia del contrato en vez de compensarla solo en la UI."
        ],
        "why": "La integración real muestra cómo se comporta el producto entre capas y permite resolver las diferencias donde se originan.",
        "verification": "Completen el flujo desde la interfaz con datos sintéticos. Confirmen que cada respuesta se representa correctamente y que errores y estados vacíos no dejan a la persona sin orientación.",
        "exampleTitle": "Ejemplo · Retirar un fixture del flujo",
        "example": "La lista de espacios consulta la API integrada. Si no hay resultados, la pantalla muestra el estado vacío; si la consulta falla, conserva el contexto útil y explica cómo volver a intentar."
      },
      {
        "name": "QA / pruebas",
        "summary": "Comprobar el recorrido conectado y hacer visibles los puntos donde las capas no coinciden.",
        "files": ["docs/qa/test-plan.md", "apps/api/test/ o apps/web/test/", "docs/backlog/T-###-<bloqueo>.md"],
        "result": "Resultado: Comprobación de punta a punta repetible y bloqueos de integración con pasos claros.",
        "steps": [
          "Preparen datos sintéticos y un punto de partida conocido para repetir el flujo desde la interfaz.",
          "Observen el recorrido completo y confirmen qué ocurrió en pantalla, API y persistencia.",
          "Cuando falle, registren pasos, resultado esperado y observado, capa afectada y evidencia útil para reproducirlo.",
          "Tras la corrección, repitan el mismo caso y confirmen que el build integrado sigue funcionando."
        ],
        "why": "Una prueba de punta a punta detecta desconexiones que no aparecen al probar cada componente por separado.",
        "verification": "Otra persona del equipo debe poder repetir el caso con las instrucciones y datos registrados. El resultado incluye el estado del build y cualquier limitación que se deja para la semana 4.",
        "exampleTitle": "Ejemplo · Registrar un fallo entre capas",
        "example": "Criterio: Una cita confirmada deja de aparecer como disponible.\n\nAnoten el estado inicial y los pasos desde la UI; comparen la respuesta de la API y la consulta posterior de disponibilidad. Registren dónde diverge el resultado y repitan el mismo caso después del arreglo."
      }
    ],
    "teamwork": "Integren como un solo equipo: cada cambio combinado necesita una comprobación y una persona responsable de comunicar su resultado. Si el contrato debe cambiar, acuerden el impacto antes de que los demás focos continúen. Las rutas y nombres son ejemplos; adáptenlos al repo.",
    "exitGate": "El equipo completa el flujo prioritario con interfaz, API y datos conectados; puede reconstruir y ejecutar el build con instrucciones compartidas, y deja claros los puntos que validará en la semana 4."
  },
  {
    "week": "04",
    "eyebrow": "SEMANA 4 · INTEGRAR Y VALIDAR",
    "title": "Validar que el flujo cumple lo acordado",
    "summary": "Contrastar el producto integrado con sus criterios de aceptación, revisar límites y regresiones, y dejar evidencia clara de lo que funciona y lo que falta.",
    "tasks": [
      "Recorran el flujo completo y relacionen cada criterio prioritario con evidencia observable y un resultado: cumple, falla o queda pendiente.",
      "Cubran el caso normal, los límites, las entradas inválidas, los estados vacíos y la recuperación ante errores; revisen también teclado y pantalla pequeña.",
      "Registren las discrepancias con pasos reproducibles, resultado esperado y observado; acuerden si son defecto o cambio de alcance.",
      "Corrijan los defectos priorizados, ejecuten regresiones relacionadas y repitan build, pruebas y CI pertinentes."
    ],
    "deliverables": [
      "Matriz de criterios y evidencia de validación",
      "Cobertura acordada de casos normales, límites, errores y recuperación",
      "Defectos priorizados, reproducibles y corregidos con regresión",
      "Build y verificaciones automatizadas con resultado registrado"
    ],
    "roles": [
      {
        "name": "Backend / API",
        "summary": "Comprobar que las respuestas y los errores cumplen los criterios y el contrato acordados.",
        "files": [
          "apps/api/test/<operacion>.test.ts",
          "apps/api/src/routes/<recurso>.ts",
          "apps/api/src/services/<recurso>.ts",
          "docs/api/contract.md si cambia el acuerdo"
        ],
        "result": "Resultado: Evidencia de respuestas y errores frente a los criterios; los defectos hallados tienen regresión comprobada.",
        "steps": [
          "Relacionen cada criterio de API con un request, la respuesta esperada y el caso de prueba correspondiente.",
          "Comprueben límites de transacción, validaciones, códigos de error y compatibilidad de la respuesta.",
          "Si encuentran una discrepancia, registren su causa y acuerden con el equipo si se corrige o se actualiza el contrato."
        ],
        "why": "Reproducir primero el defecto protege contra corregir el síntoma equivocado. Mantener el contrato evita que Frontend tenga que adivinar o crear una segunda interpretación.",
        "verification": "Confirmen que el caso falla antes de la corrección y pasa después. Comparen la respuesta real con el contrato y anoten request, fixture, resultado esperado y observado.",
        "exampleTitle": "Ejemplo · Reproducción antes de corregir",
        "example": "GET /api/availability?serviceId=S-1&date=2026-11-04\r\n200 { data: [{ startsAt: \"2026-11-04T09:00:00\", available: true }] }\r\n\nPOST /api/appointments\r\n{ serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\" }\r\n201 { data: { id: \"APT-101\", serviceId: \"S-1\", startsAt: \"2026-11-04T09:00:00\", status: \"booked\" } }\r\n\n1. Repetir la solicitud con el fixture del repo.\r\n2. Registrar respuesta actual y esperada.\r\n3. Agregar una prueba que falla antes de corregir.\r\n4. Confirmar que el contrato sigue siendo compatible."
      },
      {
        "name": "Base de datos",
        "summary": "Verificar que los datos mantienen su integridad en los casos normales y de límite.",
        "files": [
          "apps/api/src/db/schema.ts si cambia el modelo",
          "apps/api/src/db/seed.ts",
          "apps/api/test/<persistencia>.test.ts",
          "docs/data/model.md si cambian reglas"
        ],
        "result": "Resultado: Evidencia de integridad y persistencia para los casos principales y sus límites.",
        "steps": [
          "Reinicien la base y carguen el seed desde cero para detectar dependencias locales ocultas.",
          "Comprueben relaciones, duplicados, estados e historial después de las operaciones del flujo.",
          "Verifiquen que las migraciones anteriores y nuevas se aplican en orden y están documentadas."
        ],
        "why": "La revisión de integridad revela pérdidas, relaciones rotas o duplicados que una demostración superficial podría pasar por alto.",
        "verification": "Reconstruyan la base desde cero, ejecuten el flujo integrado y reinicien la aplicación. Comprueben relaciones, restricciones y persistencia con el mismo fixture sintético.",
        "exampleTitle": "Ejemplo · Comprobación de integridad",
        "example": "Después de completar “Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.”:\r\n- Confirmen que Service(id, name, durationMinutes) conserva sus relaciones.\r\n- Reinicien la aplicación y vuelvan a consultar el resultado.\r\n- Comparen el estado persistido con el fixture sintético."
      },
      {
        "name": "Frontend",
        "summary": "Validar que cada pantalla comunica el resultado y ayuda a recuperarse de errores.",
        "files": [
          "apps/web/src/<componentes-del-flujo>/",
          "apps/web/test/<flujo>.test.ts",
          "docs/product/screen-flow.md si cambia un estado"
        ],
        "result": "Resultado: Estados del flujo comprobados con respuestas reales, recuperación clara y revisión básica de accesibilidad.",
        "steps": [
          "Usen la respuesta real del contrato y confirmen nombres, estados y formatos con backend.",
          "Comprueben carga, éxito, vacío, error de validación y conflicto; preserven la entrada cuando ayude a recuperarse.",
          "Comprueben etiquetas, navegación por teclado y adaptación a pantalla pequeña con los casos acordados."
        ],
        "why": "Los criterios se cumplen cuando el comportamiento es correcto y la persona puede entender el resultado y continuar, incluso ante un error recuperable.",
        "verification": "Prueben el flujo integrado con respuesta real: carga, éxito, vacío, error de validación y conflicto. Confirmen que el mensaje explica el problema y ofrece un siguiente paso seguro.",
        "exampleTitle": "Ejemplo · Respuesta de error conectada",
        "example": "Si una operación de “Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.” falla, la pantalla debe conservar el contexto útil, explicar el problema en lenguaje claro y ofrecer una acción segura para continuar. Verifiquen también carga, éxito y vacío con la API integrada."
      },
      {
        "name": "QA / pruebas",
        "summary": "Probar el sistema como una persona usuaria y ayudar al equipo a resolver discrepancias con evidencia.",
        "files": [
          "docs/qa/test-plan.md",
          "docs/backlog/T-###-<defecto>.md",
          "docs/qa/validation-matrix.md o artefacto equivalente del repo"
        ],
        "result": "Resultado: Criterios trazables a pruebas, hallazgos reproducibles y evidencia de regresión.",
        "steps": [
          "Ejecuten de inicio a fin los casos acordados: normal, límite, inválido, vacío y error, cuando apliquen al flujo.",
          "Si hay una discrepancia, faciliten una decisión: defecto, regla faltante o cambio de alcance; registren el acuerdo.",
          "Registren el defecto con estado inicial, pasos, resultado esperado, resultado observado y evidencia.",
          "Después de la corrección, repitan el caso y ejecuten las regresiones relacionadas; actualicen el resultado y la evidencia del criterio."
        ],
        "why": "La evidencia ayuda al equipo a distinguir un defecto de una regla faltante o un cambio de alcance, y permite que otra persona repita la comprobación.",
        "verification": "Registren el estado inicial, los pasos, el resultado esperado y el observado. Tras corregir, repitan el mismo caso y actualicen la matriz con evidencia y resultado.",
        "exampleTitle": "Ejemplo · Decisión y reporte de defecto",
        "example": "Criterio relacionado: Una cita creada aparece al consultar disponibilidad.\r\n\nPrimero, el equipo decide si es defecto, regla faltante o cambio de alcance.\r\nPasos: iniciar con el fixture → completar el flujo → observar el resultado.\r\nEsperado: cumplir el criterio.\r\nObservado: anotar el resultado exacto.\r\nAl corregir: repetir el mismo caso y guardar evidencia."
      }
    ],
    "teamwork": "Revisen juntos la evidencia y decidan si cada discrepancia es un defecto, una regla pendiente o un cambio de alcance. Asignen responsable y vuelvan a comprobar lo corregido. Las rutas y nombres son ejemplos; adáptenlos al repo.",
    "exitGate": "Los criterios prioritarios tienen un resultado respaldado por evidencia; las regresiones acordadas pasan y los riesgos, defectos o límites pendientes tienen responsable y siguiente paso."
  },
  {
    "week": "05",
    "eyebrow": "SEMANA 5 · DEMOSTRACIÓN",
    "title": "Contar la historia y demostrar el resultado",
    "summary": "Expliquen la necesidad, demuestren el flujo con evidencia de validación y dejen claros los límites y cómo continuar el proyecto.",
    "tasks": [
      "Ordenen la demo alrededor de la persona usuaria, la necesidad, el objetivo y el flujo que construyeron.",
      "Demuestren el flujo en la versión validada y expliquen qué criterios cumple, con evidencia de la semana 4 y un límite conocido.",
      "Antes de presentar, comprueben desde un clon limpio que otra persona puede iniciar la aplicación siguiendo el README.",
      "Cierren con límites conocidos, aprendizajes y los siguientes pasos del proyecto."
    ],
    "deliverables": [
      "Guion de demo con problema, objetivo, recorrido y criterios demostrados",
      "Repo clonable con instrucciones actualizadas",
      "Evidencia y estado final de los criterios prioritarios",
      "Handoff y siguientes pasos"
    ],
    "roles": [
      {
        "name": "Backend / API",
        "summary": "Dejar una API que otra persona pueda ejecutar, comprender y modificar con seguridad.",
        "files": [
          "README.md",
          "docs/api/contract.md",
          "apps/api/test/",
          "handoff del PR"
        ],
        "result": "Resultado: README y contrato actualizados, verificaciones registradas y handoff backend claro.",
        "steps": [
          "Comprueben que rutas, errores y contratos publicados coinciden con el comportamiento final.",
          "Escriban los comandos reales para instalar, iniciar, verificar y reconstruir desde un clon limpio.",
          "Cierren cada PR con la decisión, las verificaciones ejecutadas, los límites conocidos y una forma clara de continuar."
        ],
        "why": "Una persona nueva necesita saber cómo iniciar y comprobar la API, cuál es su contrato y qué límites siguen abiertos antes de modificarla.",
        "verification": "Sigan las instrucciones desde un clon limpio y ejecuten los comandos documentados. Comparen contrato y comportamiento; el handoff indica evidencia, pendientes y siguiente paso.",
        "exampleTitle": "Ejemplo · Instrucciones verificables",
        "example": "README: instalar dependencias → iniciar API → ejecutar verificaciones → revisar /api/healthz.\r\n\nPara este proyecto, documenten los comandos reales, variables requeridas, contrato final y cómo identificar errores conocidos. Nunca incluyan secretos."
      },
      {
        "name": "Base de datos",
        "summary": "Probar que el modelo y los datos se pueden reconstruir sin archivos locales del equipo.",
        "files": [
          "docs/data/model.md",
          "apps/api/drizzle/",
          "apps/api/src/db/seed.ts",
          "docs/qa/test-plan.md"
        ],
        "result": "Resultado: Evidencia de migración y seed desde cero, más instrucciones y límites en docs/data/.",
        "steps": [
          "Desde una base vacía, apliquen todas las migraciones y carguen el seed sintético.",
          "Repitan las operaciones principales y confirmen persistencia después de reiniciar la aplicación.",
          "Documenten supuestos del modelo, límites del fixture y cómo preparar un entorno nuevo."
        ],
        "why": "Migraciones y seed repetibles eliminan la dependencia de una base local y permiten que el siguiente integrante compruebe el comportamiento desde cero.",
        "verification": "Desde una base vacía, apliquen todas las migraciones, carguen los datos sintéticos, completen el flujo y reinicien. Registren comandos y resultados observados, no solo que funcionó.",
        "exampleTitle": "Ejemplo · Prueba desde una base vacía",
        "example": "1. Crear una base nueva.\r\n2. Aplicar migraciones en orden.\r\n3. Cargar el fixture sintético:\r\n[{\"id\":\"S-1\",\"service\":\"Consulta inicial\",\"durationMinutes\":30},{\"id\":\"S-2\",\"service\":\"Seguimiento\",\"durationMinutes\":45}]\r\n[{\"date\":\"2026-11-04\",\"start\":\"09:00\",\"available\":true},{\"date\":\"2026-11-04\",\"start\":\"09:30\",\"available\":false}]\r\n4. Completar “Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.”.\r\n5. Reiniciar y confirmar que los cambios siguen disponibles."
      },
      {
        "name": "Frontend",
        "summary": "Dejar un flujo completo demostrable, accesible y entendible para quien recibe el repo.",
        "files": [
          "apps/web/pages/",
          "apps/web/src/",
          "docs/product/screen-flow.md",
          "docs/delivery/demo.md"
        ],
        "result": "Resultado: Flujo listo para demo y un handoff que indique pantallas, estados y límites conocidos.",
        "steps": [
          "Recorran la aplicación desde el punto de entrada documentado y corrijan bloqueos del flujo principal.",
          "Verifiquen errores y estados vacíos, etiquetas, navegación por teclado y lectura en pantalla pequeña.",
          "Anoten cualquier limitación visual o funcional conocida junto al handoff, no solo en la demo oral."
        ],
        "why": "Una interfaz accesible y documentada deja que otra persona ejecute el recorrido y entienda sus estados sin que quien la construyó tenga que explicarla.",
        "verification": "Recorran el flujo desde el README con teclado y pantalla pequeña. Comprueben estados vacíos y de error, y documenten en la demo cualquier límite visual o funcional conocido.",
        "exampleTitle": "Ejemplo · Recorrido para la demo",
        "example": "Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.\r\n\nAntes de presentar, comprueben que cada paso tiene etiquetas claras, respuesta visible, estados de carga/error y funciona con teclado y pantalla pequeña."
      },
      {
        "name": "QA / pruebas",
        "summary": "Coordinar la comprobación final, la transferencia y la demostración de los criterios acordados por el equipo.",
        "files": [
          "docs/delivery/demo.md",
          "docs/qa/test-plan.md",
          "docs/delivery/handoff.md"
        ],
        "result": "Resultado: docs/delivery/demo.md, checklist de clon limpio y evidencia por criterio con hallazgos de transferencia.",
        "steps": [
          "Con el equipo, ordenen la demo alrededor de usuario, necesidad, flujo, criterio cumplido y límite conocido.",
          "Si está disponible, inviten a alguien que no haya implementado el flujo a clonarlo y seguir el README.",
          "Observen si puede iniciar la aplicación, completar una tarea pequeña y explicar cómo verificarla.",
          "Seleccionen datos sintéticos para la demo y registren tiempos, pasos confusos, evidencia, defectos y resultado de CI."
        ],
        "why": "Una transferencia independiente comprueba si el repositorio enseña lo suficiente para ejecutar, verificar y continuar el proyecto, más allá de una demo preparada por sus autores.",
        "verification": "Pidan a alguien que no implementó el flujo que clone el repo y siga el README sin ayuda oral. Registren si pudo iniciarlo, completar una tarea y explicar cómo verificarla; ajusten la duración al tiempo acordado para la demo.",
        "exampleTitle": "Ejemplo · Demo y checklist de una persona nueva",
        "example": "Guion: 1 min usuario “Una persona que atiende un negocio pequeño y necesita organizar sus citas.”; 4 min flujo “Consultar espacios, elegir un servicio y horario, confirmar la cita y cancelarla para liberar el espacio.”; 2 min criterio “Un horario ocupado no se puede reservar de nuevo.”; 2 min verificaciones y límite “Calendarios externos”; 1 min siguiente paso.\r\n\n□ Clona el repo y sigue el README sin ayuda oral.\r\n□ Inicia la app con datos sintéticos.\r\n□ Completa una tarea pequeña y registra sus verificaciones.\r\n□ Puede explicar qué falta y dónde continuar."
      }
    ],
    "teamwork": "Distribuyan la demo para que se vean las decisiones y aportes del equipo. Si es posible, inviten a una persona que no implementó el flujo a probar el inicio siguiendo el README. Adapten las rutas y artefactos de ejemplo a su repo.",
    "exitGate": "La demo comunica la necesidad, muestra el flujo en una versión validada y respalda los criterios prioritarios con evidencia. El repo deja instrucciones suficientes para que otra persona pueda empezar."
  }
] as const;

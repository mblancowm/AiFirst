# Brief de proyecto: Agenda de citas

## Propósito

Crear desde cero una app pequeña para registrar citas ficticias y consultar las citas guardadas. El equipo construye la aplicación usando Codex o Claude como asistente; la app no necesita funciones de IA.

## Alcance obligatorio

La primera versión incluye solo lo necesario para insertar y listar:

- Un tipo de registro: cita.
- Un formulario corto con nombre ficticio, servicio y fecha.
- Guardar cada cita en la base de datos local SQLite.
- Mostrar las citas guardadas en una lista sencilla.
- Validar los campos obligatorios y mostrar mensajes claros.

No hace falta comprobar disponibilidad ni impedir que dos citas tengan la misma fecha.

## Criterios de aceptación

1. La persona puede registrar una cita con nombre, servicio y fecha.
2. La cita aparece en la lista cuando se guarda.
3. La cita permanece en la lista después de actualizar la página.
4. Si falta un campo obligatorio, se muestra un mensaje y no se guarda el registro.
5. Otra persona del equipo puede clonar el repositorio, iniciar la app y demostrar insertar y listar siguiendo el README.

## Mejoras opcionales

Solo después de completar y revisar todos los criterios obligatorios, el equipo puede agregar editar y/o eliminar citas. Cada mejora debe tener criterios propios y pruebas; no debe poner en riesgo el flujo mínimo.

## Fuera de alcance

- Calendario de disponibilidad, reglas de horario o prevención de reservas duplicadas.
- Cancelaciones, recordatorios, notificaciones o calendarios externos.
- Datos reales de clientes, pagos, cuentas e integraciones externas.
- Una función de IA dentro de la app.

## Stack y uso de IA

Usen el stack enseñado en el curso: React + TypeScript + Vike para la interfaz; Bun + Hono para la API; Drizzle + SQLite para los datos; y Zod para validar entradas. Codex o Claude ayuda al equipo a planear, crear y revisar el código y los archivos Markdown. El equipo entiende y aprueba los cambios.

## Trabajo por rol

- **Producto / diseño:** definir los campos, el brief y los criterios de aceptación.
- **Frontend:** crear desde cero el formulario, la lista y los mensajes visibles.
- **Backend / API:** crear las operaciones para guardar una cita y devolver la lista; validar los datos.
- **Datos:** crear una tabla de citas con pocos campos y la migración necesaria.
- **QA / revisión:** comprobar inserción, lista, persistencia, validación y la guía del README.

En grupos pequeños, una persona puede cubrir más de un rol.

## Plan de cuatro semanas

1. **Elegir y preparar:** crear el repositorio con Git, asignar roles, decidir campos y criterios, y preparar los archivos iniciales del proyecto.
2. **Guardar datos:** crear la tabla, la migración y las operaciones de API para insertar y listar.
3. **Crear la pantalla:** conectar el formulario y la lista con la API; cada integrante entrega y explica un cambio asistido por IA.
4. **Revisar y entregar:** verificar el flujo completo, revisar los cambios con Git, actualizar el README y dejar un handoff para otro equipo.

## Demo de cinco minutos

Registrar una cita ficticia, verla en la lista, actualizar la página y comprobar que sigue ahí. Intentar guardar el formulario sin un campo obligatorio y mostrar el mensaje. Explicar qué creó el equipo con ayuda de IA y cómo otra persona puede continuar el proyecto.

# 02 · Conectar la aplicación con la API

> Semana 2 · 2 horas · Foco principal: API

La API conecta la pantalla con la base de datos. Para el alcance mínimo, permite **insertar un registro** y **devolver la lista de registros guardados**. Editar y eliminar son operaciones adicionales, solo si queda tiempo.

## Antes de empezar: cómo viaja la información

Piensa en la API como una ventanilla entre la pantalla y los datos. La pantalla envía una **solicitud**; la API devuelve una **respuesta**. La app necesita dos acciones: recibir los campos del formulario y guardar un registro, y devolver una lista para mostrar en la página. El **contrato** muestra un ejemplo sencillo de lo que se envía y se recibe.

En este proyecto, Hono ayuda a definir rutas y Zod comprueba que los datos tengan el formato esperado. Practica con datos inventados y pide a la IA que te explique la solicitud y la respuesta en palabras sencillas.

## Qué aprenderás

- Describir una operación con un ejemplo de entrada y salida.
- Encontrar los archivos del contrato, la ruta y las pruebas.
- Comprobar los datos antes de guardarlos o responder.
- Usar IA para preparar un cambio pequeño y revisar cada archivo.

## Archivos que crearás o actualizarás

| Archivo de ejemplo | Qué debe incluir |
| --- | --- |
| **docs/api/contracts.md** | Ejemplo de insertar un registro, pedir la lista y qué errores pueden aparecer. |
| **packages/contracts/src/index.ts** | Formato compartido para el registro y la lista, si el proyecto usa este paquete. |
| **apps/api/src/app.ts** | Rutas que reciben el registro y devuelven la lista. |
| **apps/api/src/app.test.ts** | Comprobaciones para insertar, listar y rechazar datos inválidos. |

Si el repositorio ya tiene estos archivos, actualícenlos. La propuesta de la IA debe decir qué se modifica y por qué.

## Ejercicio paso a paso

1. Escriban un ejemplo de lo que la pantalla envía para insertar un registro y otro de la lista que la API devuelve.
2. Acuerden los campos requeridos entre web, API y datos para que todas las partes usen el mismo formato.
3. Validen los datos recibidos. Si falta un campo requerido, devuelvan un mensaje claro y no guarden el registro.
4. Implementen con Hono una operación para insertar y otra para listar. Si algo falla, la API devuelve un error sencillo; no muestra detalles internos.
5. Añadan pruebas para insertar un registro válido, recibir la lista y rechazar datos inválidos.
6. Si el mínimo funciona y queda tiempo, acuerden y agreguen editar o eliminar como operaciones opcionales.

## Instrucción para Codex o Claude

> Soy responsable de API/backend en un equipo principiante. Lee README.md, AGENTS.md, el brief y el modelo de datos. Esta API se está creando desde cero. Propón los archivos mínimos para insertar un registro y devolver la lista; incluye `docs/api/contracts.md` entre los archivos si hace falta y explica el propósito de cada uno. Espera a que el equipo revise el plan. Luego implementa esas dos operaciones con el formato acordado, valida los datos recibidos y añade pruebas para la inserción y la lista. No agregues editar o eliminar todavía. Reporta los comandos ejecutados y sus resultados reales; explica los cambios.

## Resultado y revisión del equipo

La pantalla y la API comparten el mismo formato. El revisor puede insertar un registro válido, verlo en la lista y comprobar que los datos inválidos no se guardan. Editar y eliminar son opcionales.

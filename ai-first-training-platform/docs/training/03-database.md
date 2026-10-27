# 03 · Guardar y consultar los datos

> Semana 2 · 2 horas · Foco principal: datos

La base de datos conserva la información de la aplicación. Para el alcance mínimo, empiecen con una tabla para un solo tipo de registro. La API guarda esos registros y devuelve la lista; editar y eliminar son opcionales.

## Antes de empezar: datos como una hoja de cálculo

Una **tabla** se parece a una hoja de cálculo: cada fila representa un registro y cada columna guarda un dato. Por ejemplo, una tabla de artículos podría tener título y contenido. Para la app mínima basta una tabla; no necesitan relaciones entre tablas.

Drizzle describe las tablas en el código y SQLite guarda los datos. Una **migración** es una receta para cambiar la estructura de la base de datos de forma ordenada. Pide al asistente que explique la receta antes de aplicarla y usa solo datos inventados.

## Qué aprenderás

- Pasar de una idea a tablas y campos concretos.
- Encontrar los archivos del esquema, los datos de ejemplo y los cambios de base.
- Pedir a la IA que explique el impacto antes de cambiar datos.
- Comprobar que insertar y listar funciona y que los datos persisten.

## Archivos que crearás o actualizarás

| Archivo de ejemplo | Qué debe incluir |
| --- | --- |
| **docs/data/model.md** | Datos, campos, relaciones y reglas importantes, con un ejemplo inventado. |
| **apps/api/src/db/schema.ts** | Una tabla sencilla con los campos acordados. |
| **apps/api/drizzle/0001_records.sql** | Cambio de base de datos generado por la herramienta del proyecto. |
| **apps/api/src/db/seed.ts** | Pocos registros inventados para probar y mostrar la lista. |
| **apps/api/src/app.test.ts** | Pruebas que confirman que se inserta un registro y aparece en la lista. |

Una migración es un archivo que permite aplicar un cambio a la base de forma repetible. Genérenla con Drizzle Kit, la herramienta que prepara esos cambios, y revísenla antes de aplicarla. No borren ni recreen datos para hacer que una prueba pase.

## Ejercicio paso a paso

1. Elijan un solo tipo de registro: una cita, un artículo o un ticket. Empiecen con una tabla y pocos campos.
2. Dibujen la tabla en una hoja. Para cada campo, expliquen para qué sirve, si puede faltar y cómo se valida al insertar.
3. Actualicen el esquema y generen una migración. Pidan a la IA que explique qué cambia y qué datos podrían verse afectados.
4. Añadan ejemplos inventados al archivo de datos de ejemplo, llamado seed.
5. Comprueben que la app inserta un registro, devuelve la lista y conserva los datos al actualizar la página. Verifiquen que una entrada inválida no se guarde.
6. Revisen el esquema y la migración con alguien de API o QA.
7. Si queda tiempo, elijan si agregan editar o eliminar. Revisen esos cambios con QA antes de la demo.

## Instrucción para Codex o Claude

> Soy responsable de Datos/base de datos en un equipo principiante. Lee README.md, AGENTS.md, el brief y el modelo de datos. Esta app se crea desde cero. Propón una tabla con los pocos campos acordados y los archivos mínimos para insertar registros y devolver la lista. Incluye o actualiza `docs/data/model.md` y explica cada archivo. Espera a que el equipo revise el plan. Luego crea el esquema, la migración y algunos datos inventados. Añade una comprobación de inserción y lista, y verifica que los datos sigan después de actualizar la página. No agregues relaciones ni tablas adicionales sin una necesidad clara.

## Resultado y revisión del equipo

Otra persona puede explicar qué guarda la tabla, insertar un registro, verlo en la lista y confirmar que los datos siguen guardados después de actualizar la página.

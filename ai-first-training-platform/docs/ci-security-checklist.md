# CI, seguridad y revisión

## Automatización activa

- [x] CI de pull request/push: Biome format check, lint, typecheck web/API, pruebas API/web y build web.
- [x] Pruebas para contratos/respuestas, rutas/progreso, Markdown seguro, navegación, tutor, citas, insuficiencia y aislamiento de proyectos.
- [x] Evaluación determinista de doce preguntas, incluyendo preguntas fuera de alcance.
- [x] Zod valida cuerpo de API, respuestas importantes, configuración de IA y formato de respuesta del modelo.
- [x] Tutor mock predeterminado, sin red. OpenAI opt-in y claves solo server-side; `.env.example` contiene campos vacíos.
- [x] Datos de capstone sintéticos. API consulta las notas con filtro Drizzle por proyecto y filtra las referencias devueltas por IDs permitidos.
- [x] Sanitización de contenido Markdown con `rehype-sanitize`; no se habilita HTML crudo.
- [x] `NODE_ENV=production` se rechaza mientras falten gateway SSO y perfil de almacenamiento compartido.

## Fuera de este workspace o pendiente de operación

- [ ] Escaneo de secretos dedicado en CI. El repositorio extraído no tiene configuración organizacional; `permissions: contents: read` y `.env.example` no reemplazan el escaneo.
- [ ] Protección de `main`, PR obligatorio, al menos una revisión y sin push directo. No hay metadatos Git ni acceso al remoto en este workspace.
- [ ] CODEOWNERS y plantilla PR con revisión cruzada.
- [ ] Integración del gateway SSO y subject de identidad verificado; no usar `local-practice` en un entorno compartido.
- [ ] PostgreSQL de entorno compartido, restauración/backup y retención de datos.
- [ ] Aprobación de proveedor/modelo AI y límites operativos (timeout, cuota, privacidad y logging) antes de habilitarlo.
- [ ] Revisión manual de contraste, teclado y demo en navegadores objetivo antes de cualquier publicación.

## Revisión humana en cada cambio

Confirma alcance y criterios, riesgos sobre datos, migraciones, aislamiento, referencias, comportamiento ante errores, foco/labels, comandos realmente ejecutados y límites sin verificar. No afirmes que CI o una política remota pasó sin evidencia observada.

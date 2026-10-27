# Dependencias de trabajo

## Orden recomendado

1. Aprobar objetivo, límites, estructura y controles del repositorio (Foundation gate).
2. Auditar los seis módulos fuente, resolver el README faltante y acordar el modelo de contenido, rutas, datos, Zod y planes de cada feature (Contract gate).
3. Preparar parser/render seguro de Markdown y contratos; definir tablas de progreso/grupos y la interfaz del tutor.
4. Completar API, persistencia local y modo mock del tutor. Mantener las llamadas de modelo fuera del navegador.
5. Construir páginas y estados web sobre contratos aprobados. Web y API pueden avanzar en paralelo tras acordar contratos y fixtures.
6. Integrar, verificar accesibilidad, aislamiento de progreso, citas y evidencia insuficiente; hacer demo local y retro (Demo gate).

## Paralelismo

Después de aprobar contratos, web puede trabajar con fixtures mientras API implementa rutas; datos puede crear migraciones y seed usando el modelo acordado; QA puede preparar casos con criterios ya fijados. Integración final depende de los tres contratos: respuesta de API, esquema persistido y formato de referencia de Markdown.

## Bloqueos o decisiones externas

- Falta `AI-First-Application-Training/README.md`; no inventar su contenido.
- Confirmar si los equipos eligen entre los tres briefs de management o si hay un único capstone obligatorio.
- Revisar contenido fuente con menciones de Angular, .NET/EF Core y SQL Server.
- Un proveedor/modelo aprobado y sus credenciales son necesarios para probar llamadas reales; el modo mock permite una demo local.
- Gateway SSO, PostgreSQL compartido, privacidad y despliegue quedan fuera de la demo y requieren información organizacional previa.

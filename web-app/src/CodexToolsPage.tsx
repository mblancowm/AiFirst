import { AppShell } from "./AppShell";
import { codexDecisionBuckets, codexMechanisms } from "./codexToolsContent";

export function CodexToolsPage() {
  return (
    <AppShell activePage="codex">
      <main className="mx-auto max-w-7xl page-content codex-page">
        <a className="back-link codex-back-link" href="/">← Volver al programa</a>

        <header className="codex-hero">
          <p className="eyebrow">AI TOOLS · CODEX</p>
          <h1>Codex: qué componentes usar, cuándo y quién los mantiene.</h1>
          <p className="codex-product-description">
            Codex es el agente de programación de OpenAI. Ayuda a comprender proyectos, planificar tareas,
            escribir y depurar código, y revisar cambios desde distintos entornos de desarrollo.
          </p>
          <p className="codex-page-description">
            Esta guía organiza sus componentes por necesidad y resume cuándo usarlos, quién los mantiene y sus límites.
          </p>
        </header>

        <section className="codex-choice-rule" aria-label="Secuencia para elegir un patrón de integración">
          <p className="codex-rule-kicker">PREGUNTA ANTES DE ELEGIR UNA HERRAMIENTA</p>
          <div className="codex-choice-steps">
            <div><span>01</span><strong>¿Qué debe hacer el workflow?</strong></div>
            <div><span>02</span><strong>¿Qué patrón mínimo lo resuelve?</strong></div>
            <div><span>03</span><strong>¿Quién lo mantiene y qué puede tocar?</strong></div>
          </div>
          <p className="codex-choice-note">La primera opción es una hipótesis: revisa owner, límites, controles y capacidad de mantenerla.</p>
        </section>

        <section className="codex-bucket-section" aria-labelledby="codex-buckets-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PRIMERO, CLASIFICA LA NECESIDAD</p>
              <h2 id="codex-buckets-title">Siete grupos de decisión.</h2>
            </div>
            <p className="section-note">Cada grupo apunta a un patrón inicial. Los mecanismos de una misma categoría pueden tener límites distintos.</p>
          </div>

          <div className="codex-bucket-grid">
            {codexDecisionBuckets.map((bucket) => (
              <article className="codex-bucket-card" key={bucket.number}>
                <div className="codex-bucket-index"><span>{bucket.number}</span><span>AI TOOLS</span></div>
                <h3>{bucket.title}</h3>
                <p className="codex-bucket-need">{bucket.need}</p>
                <div className="codex-bucket-pattern">
                  <span>Patrón inicial</span>
                  <strong>{bucket.pattern}</strong>
                </div>
                <p className="codex-bucket-improvement"><b>Busca mejorar:</b> {bucket.improvement}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="codex-matrix-section" aria-labelledby="codex-matrix-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPARA ANTES DE ADOPTAR</p>
              <h2 id="codex-matrix-title">Matriz de componentes.</h2>
            </div>
            <p className="section-note">Aterriza el patrón: cuándo ayuda, quién lo cuida, cuál es su frontera y cuándo no usarlo.</p>
          </div>

          <div className="codex-matrix-scroll" role="region" aria-label="Matriz de decisión de componentes Codex" tabIndex={0}>
            <table className="codex-decision-table">
              <thead>
                <tr>
                  <th scope="col">Componente</th>
                  <th scope="col">Úsalo cuando…</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Frontera de confianza</th>
                  <th scope="col">Límite / cuándo evitarlo</th>
                </tr>
              </thead>
              <tbody>
                {codexMechanisms.map((mechanism) => (
                  <tr key={mechanism.name}>
                    <th scope="row">
                      <strong>{mechanism.name}</strong>
                      <span>{mechanism.bucket}</span>
                    </th>
                    <td>{mechanism.useWhen}</td>
                    <td>{mechanism.owner}</td>
                    <td>{mechanism.boundary}</td>
                    <td>{mechanism.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="codex-table-hint">En pantalla pequeña, desplázate horizontalmente dentro de la matriz para revisar todas las columnas.</p>
        </section>

        <aside className="codex-selection-note">
          <p className="eyebrow">REGLA DE SELECCIÓN</p>
          <h2>El componente debe justificar su lugar.</h2>
          <p>Si no mejora claramente el workflow, empieza con una opción más sencilla. El owner mantiene la configuración; los permisos y aprobaciones siguen dependiendo de sus controles propios.</p>
        </aside>
      </main>
    </AppShell>
  );
}

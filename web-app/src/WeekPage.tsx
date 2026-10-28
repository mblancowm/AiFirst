import { AppShell } from "./AppShell";
import { weekDetails } from "./weekDetails";

type WeekNumber = "01" | "02" | "03" | "04" | "05";

export function WeekPage({ week }: { week: WeekNumber }) {
  const detail = weekDetails.find((item) => item.week === week);
  const weekIndex = weekDetails.findIndex((item) => item.week === week);
  const previous = weekDetails[weekIndex - 1];
  const next = weekDetails[weekIndex + 1];

  if (!detail) return null;

  return (
    <AppShell activePage="route">
      <main className="mx-auto max-w-7xl page-content week-page">
        <nav className="week-breadcrumb" aria-label="Ruta de navegación">
          <a href="/#fases">Ruta de cinco semanas</a>
          <span aria-hidden="true">/</span>
          <span>Semana {detail.week}</span>
        </nav>

        <header className="week-hero">
          <p className="eyebrow">{detail.eyebrow}</p>
          <h1>{detail.title}</h1>
          <p className="week-summary">{detail.summary}</p>
        </header>

        <div className="week-overview-grid">
          <section className="week-overview-card" aria-labelledby="week-tasks-title">
            <p className="card-kicker"><span className="square-marker square-blue" /> QUÉ HACER ESTA SEMANA</p>
            <h2 className="sr-only" id="week-tasks-title">Qué hacer esta semana</h2>
            <ol className="week-task-list">
              {detail.tasks.map((task, index) => (
                <li key={task}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{task}</p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="week-deliverables" aria-labelledby="week-deliverables-title">
            <p className="card-kicker"><span className="square-marker" /> DEJA EN EL REPO</p>
            <h2 className="sr-only" id="week-deliverables-title">Entregables de la semana</h2>
            <ul>
              {detail.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
            </ul>
          </aside>
        </div>

        {"teamPhases" in detail && "sharedOutputs" in detail && (
          <section className="week-team-plan" aria-labelledby="week-team-plan-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">ACUERDOS DE TODO EL EQUIPO</p>
                <h2 id="week-team-plan-title">Primero, definan la base juntos.</h2>
              </div>
              <p className="section-note">Los focos por rol ayudan a coordinar el trabajo; no sustituyen las decisiones y entregables compartidos.</p>
            </div>
            <div className="week-phase-grid">
              {detail.teamPhases.map((phase, index) => (
                <article className="week-phase-card" key={phase.name} style={{ animationDelay: `${index * 70}ms` }}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{phase.name}</h3>
                  <p>{phase.description}</p>
                </article>
              ))}
            </div>
            <h3 className="week-shared-title">Lo que el equipo deja preparado</h3>
            <div className="week-shared-grid">
              {detail.sharedOutputs.map((output, index) => (
                <article className="week-shared-card" key={output.title} style={{ animationDelay: `${index * 45}ms` }}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h4>{output.title}</h4><p>{output.description}</p></div>
                </article>
              ))}
            </div>
            <p className="week-plan-note">El equipo acuerda los nombres y ubicaciones de estos materiales según la estructura del repositorio.</p>
          </section>
        )}

        {detail.roles.length > 0 && <section className="week-role-section" aria-labelledby="week-roles-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CUATRO FOCOS · UNA ENTREGA DE EQUIPO</p>
              <h2 id="week-roles-title">Tu guía por foco.</h2>
            </div>
            <p className="section-note">Usa tu foco para coordinar. Comparte contratos, criterios y decisiones con tu equipo.</p>
          </div>

          <div className="week-role-grid">
            {detail.roles.map((role) => (
              <details className="week-role-card" key={role.name}>
                <summary>
                  <span className="week-role-label">{role.name}</span>
                  <strong>{role.summary}</strong>
                  <span className="week-role-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="week-role-content">
                  <section className="week-role-artifact">
                    <h3>Qué crear</h3>
                    <ul>{role.files.map((file) => <li key={file}><code>{file}</code></li>)}</ul>
                    <p><strong>Resultado:</strong> {role.result.replace(/^Resultado:\s*/, "")}</p>
                  </section>
                  <div className="week-role-guidance">
                    <section>
                      <h3>Cómo hacerlo esta semana</h3>
                      <ol>{role.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                    </section>
                    <section>
                      <h3>Por qué importa</h3>
                      <p>{role.why}</p>
                    </section>
                    <section>
                      <h3>Cómo verificarlo</h3>
                      <p>{role.verification}</p>
                    </section>
                  </div>
                  <details className="week-example">
                    <summary>{role.exampleTitle}</summary>
                    <pre>{role.example}</pre>
                  </details>
                </div>
              </details>
            ))}
          </div>
        </section>}

        <div className="week-closing-grid">
          <aside className="week-team-practice">
            <p className="eyebrow">TRABAJO EN EQUIPO</p>
            <p>{detail.teamwork}</p>
          </aside>
          <aside className="week-exit-gate">
            <p className="eyebrow">PUERTA DE SALIDA</p>
            <p>{detail.exitGate}</p>
          </aside>
        </div>

        <nav className="week-pagination" aria-label="Navegar entre semanas">
          {previous ? (
            <a href={`/semanas/${previous.week}/`}><span>← Semana {previous.week}</span><strong>{previous.title}</strong></a>
          ) : <a href="/#fases"><span>← Programa</span><strong>Ruta de cinco semanas</strong></a>}
          <a className="week-pagination-index" href="/#fases">{detail.week} / 05</a>
          {next ? (
            <a className="week-pagination-next" href={`/semanas/${next.week}/`}><span>Semana {next.week} →</span><strong>{next.title}</strong></a>
          ) : <a className="week-pagination-next" href="/#fases"><span>Finalizar</span><strong>Volver al programa ↑</strong></a>}
        </nav>
      </main>
    </AppShell>
  );
}

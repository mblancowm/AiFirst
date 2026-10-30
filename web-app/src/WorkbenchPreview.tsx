import type { CSSProperties } from "react";

const codeLineWidths = ["88%", "61%", "76%", "52%", "91%", "67%"];

export function WorkbenchPreview() {
  return (
    <div
      className="workbench-visual reveal"
      role="img"
      aria-label="Vista ilustrativa: el equipo define un plan, construye una aplicación con apoyo de IA y valida el resultado con revisión humana."
    >
      <div className="workbench-wrap">
        <div className="workbench">
          <div className="workbench-topbar">
            <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="workspace-label">TEAM WORKSPACE / PROYECTO DE EJEMPLO</span>
            <span className="live-status"><i aria-hidden="true" /> EN MARCHA</span>
          </div>

          <div className="workbench-body">
            <div className="workbench-stack">
              <article className="request-card">
                <div className="panel-kicker"><span>01 / INTENCIÓN</span><strong>PLAN APROBADO</strong></div>
                <h2>Agenda de citas</h2>
                <p>Reservar una hora disponible en pocos pasos, con reglas claras para el equipo y sus clientes.</p>
                <div className="context-pills"><span>execution-plan.md</span><span>Contrato API</span></div>
              </article>

              <article className="build-card">
                <div className="panel-kicker"><span>02 / CONSTRUCCIÓN</span><strong>IA EN ACCIÓN</strong></div>
                <div className="build-label"><i aria-hidden="true" /> Codex trabaja con el plan y el contrato</div>
                <div className="code-snippet" aria-hidden="true">
                  {codeLineWidths.map((width, index) => (
                    <div className="code-row" key={width}>
                      <small>0{index + 1}</small>
                      <i style={{ "--bar": width } as CSSProperties} />
                    </div>
                  ))}
                </div>
                <div className="build-progress" aria-hidden="true"><i /></div>
              </article>
            </div>

            <div className="workbench-stack">
              <article className="app-preview">
                <div className="preview-bar" aria-hidden="true"><i /><i /><i /><span>localhost / citas</span></div>
                <div className="preview-app">
                  <small>RESERVAS · HOY</small>
                  <h3>Hola, Alex</h3>
                  <div className="preview-date"><span>Martes, 20 de octubre</span><b>•••</b></div>
                  <div className="booking-row"><time>10:30</time><span><strong>Diseño de producto</strong><small>Con Morgan Lee · 30 min</small></span></div>
                  <div className="booking-row"><time>13:00</time><span><strong>Revisión de proyecto</strong><small>Con Taylor Kim · 45 min</small></span></div>
                  <span className="book-button">+ Nueva cita</span>
                </div>
              </article>

              <div className="review-card">
                <span className="review-check" aria-hidden="true">✓</span>
                <span className="review-copy"><strong>Revisión humana completa</strong><small>La persona explica y valida el cambio</small></span>
                <span className="review-stamp">LISTO</span>
              </div>
            </div>
          </div>

          <div className="workbench-flow" aria-hidden="true">
            <span className="flow-step"><b>1</b> Plan</span><span className="flow-track"><i /></span>
            <span className="flow-step"><b>2</b> Build</span><span className="flow-track"><i /></span>
            <span className="flow-step"><b>3</b> Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

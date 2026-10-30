const casualVibeItems = [
  { text: "Sin objetivo claro del producto" },
  { text: "Sin pruebas de calidad" },
  { text: "Errores ocultos en la app", dashed: true },
  { text: "Secretos pegados en prompts" },
  { text: "No sé qué cambió el agente" },
  { text: "Mucho código, poca trazabilidad", dashed: true },
];

const agenticEngineeringItems = [
  { text: "Objetivo y criterios acordados", accent: "blue" },
  { text: "Plan visible antes de construir", accent: "green" },
  { text: "Tests y evaluación continua", accent: "magenta" },
  { text: "Contexto y límites para el agente", accent: "blue" },
  { text: "Cambios revisables por PR", accent: "green" },
  { text: "Personas que entienden y validan", accent: "magenta" },
];

export function ObjectiveShift() {
  return (
    <div className="objective-shift" aria-labelledby="objective-shift-title">
      <div className="section-heading">
        <h3 id="objective-shift-title">Para pasar de esto a esto</h3>
        <p className="section-note">Practiquemos buenas prácticas para transformar ideas en apps útiles, seguras y confiables.</p>
      </div>
      <div className="paradigm-layout">
        <article className="paradigm-card paradigm-card-casual">
          <p className="paradigm-kicker">RÁPIDO, PERO OPACO</p>
          <h4>Casual Vibe Coding</h4>
          <div className="paradigm-pills">
            {casualVibeItems.map((item) => (
              <span className={item.dashed ? "paradigm-pill paradigm-pill-dashed" : "paradigm-pill"} key={item.text}>
                {item.text}
              </span>
            ))}
          </div>
        </article>

        <div className="paradigm-shift" aria-label="El cambio: de sintaxis a intención">
          <small>EL CAMBIO</small>
          <span className="paradigm-arrow" aria-hidden="true">→</span>
          <strong>de sintaxis<br />a intención</strong>
        </div>

        <article className="paradigm-card paradigm-card-agentic">
          <p className="paradigm-kicker">CON INTENCIÓN Y CONTROL</p>
          <h4>Agentic Engineering</h4>
          <div className="paradigm-pills">
            {agenticEngineeringItems.map((item) => (
              <span className={`paradigm-pill paradigm-pill-${item.accent}`} key={item.text}>
                {item.text}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

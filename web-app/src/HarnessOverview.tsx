const harnessGroups = [
  {
    title: "CONTEXTO Y DIRECCIÓN",
    accent: "blue",
    items: [
      { title: "Monorepo", description: "AGENTS.md / CLAUDE.md, estructura y reglas para agentes." },
      { title: "Docs as code", description: "Idea, propuesta, arquitectura, roles y dependencias en Markdown." },
      { title: "Planning first", description: "Un plan de funcionalidad aprobado antes de cada cambio de código." },
      { title: "Skills base", description: "Flujos reutilizables para que cada rol trabaje con su contexto." },
    ],
  },
  {
    title: "ENTREGA Y CONFIANZA",
    accent: "magenta",
    items: [
      { title: "CI en GitHub", description: "Lint, tests y build en cada PR." },
      { title: "Seguridad de Git", description: "Rama principal protegida, PR obligatorio y secretos fuera del repo." },
      { title: "Calidad", description: "Revisión humana y cruzada; quien revisa puede explicar el cambio." },
    ],
  },
];

export function HarnessOverview() {
  return (
    <div className="harness-overview" aria-labelledby="harness-title">
      <div className="section-heading">
        <h3 id="harness-title">Con el uso de un SDLC sano y un Harness de IA</h3>
        <p className="section-note">Un proceso claro, contexto útil y controles humanos guían a la IA durante cada entrega.</p>
      </div>

      <div className="harness-panel">
        {harnessGroups.map((group, groupIndex) => (
          <article
            className={`harness-group harness-group-${group.accent}`}
            key={group.title}
            style={{ animationDelay: `${groupIndex * 100}ms` }}
          >
            <h3>{group.title}</h3>
            <div className="harness-items">
              {group.items.map((item, itemIndex) => (
                <div
                  className="harness-item"
                  key={item.title}
                  style={{ animationDelay: `${groupIndex * 100 + itemIndex * 55}ms` }}
                >
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const projectIdeas = [
  {
    title: "Agenda de citas para un negocio pequeño",
    flow: "Consulta horarios, reserva una cita y cancélala para liberar el espacio; evita dobles reservas.",
    scope: "Sin calendarios externos, pagos ni notificaciones.",
  },
  {
    title: "Base de conocimiento interna",
    flow: "Busca artículos por texto o categoría, consulta su fuente y crea o edita contenido.",
    scope: "Artículos y fuentes sintéticas; sin respuestas generadas ni embeddings.",
  },
  {
    title: "Triage de tickets de soporte",
    flow: "Revisa seis tickets de ejemplo, filtra por estado y guarda actualizaciones.",
    scope: "Sin tickets reales, integraciones ni decisiones automáticas de IA.",
  },
  {
    title: "Inventario de dispositivos",
    flow: "Consulta equipos disponibles, registra un préstamo y procesa la devolución actualizando su estado.",
    scope: "Activos y personas sintéticos; sin directorios ni integraciones de dispositivos.",
  },
  {
    title: "Seguimiento de referidos",
    flow: "Registra un referido de ejemplo, revisa su etapa y actualiza el siguiente paso.",
    scope: "Datos ficticios; sin información real de candidatos ni evaluación automatizada.",
  },
  {
    title: "Catálogo de capacitaciones",
    flow: "Explora sesiones de ejemplo, reserva un cupo y cancela para liberar espacio.",
    scope: "Sesiones sintéticas; sin integraciones con calendarios o plataformas de aprendizaje.",
  },
] as const;

export const ProjectIdeasSection = () => (
  <section className="project-ideas-section section-block" aria-labelledby="project-ideas-title">
    <div className="section-heading">
      <div>
        <p className="eyebrow">PROYECTOS PARA ELEGIR</p>
        <h2 id="project-ideas-title">Algunas ideas de proyecto</h2>
      </div>
      <p className="section-note">Elige un flujo pequeño que el equipo pueda construir, integrar y demostrar.</p>
    </div>

    <div className="project-ideas-grid">
      {projectIdeas.map((project, index) => (
        <article className="project-idea-card reveal" key={project.title} style={{ animationDelay: `${index * 70}ms` }}>
          <div className="project-idea-top">
            <span className="project-idea-index">0{index + 1}</span>
            <span className="project-idea-label">IDEA DE PRÁCTICA</span>
          </div>
          <h3>{project.title}</h3>
          <div className="project-idea-flow">
            <strong>Flujo inicial</strong>
            <p>{project.flow}</p>
          </div>
          <p className="project-idea-scope"><strong>Alcance sugerido:</strong> {project.scope}</p>
        </article>
      ))}
    </div>

  </section>
);

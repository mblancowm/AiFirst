const technologyGroups = [
  {
    category: "FRONTEND",
    title: "React + TypeScript estricto",
    description: "Vike (`vike-react`) se recomienda para rutas basadas en archivos y modos SSR, SPA o SSG. Vite es su motor y no se suele configurar por separado.",
    technologies: ["Vike · vike-react", "Vite integrado"],
  },
  {
    category: "BACKEND",
    title: "Bun + Hono",
    description: "Runtime y framework aprobados para construir los servicios de la aplicación.",
    technologies: ["Bun", "Hono"],
  },
  {
    category: "DATOS",
    title: "Drizzle + SQL",
    description: "Elige SQLite (`better-sqlite3` o Bun integrado) o PostgreSQL. MongoDB requiere aprobación condicional.",
    technologies: ["Drizzle", "SQLite", "PostgreSQL", "MongoDB · condicional"],
  },
  {
    category: "IA Y VALIDACIÓN",
    title: "Vercel AI SDK + Zod",
    description: "Usa `ai` para integrar IA y Zod para validar datos y esquemas de herramientas.",
    technologies: ["Vercel AI SDK · ai", "Zod"],
  },
  {
    category: "COMPLEMENTOS",
    title: "Herramientas para la UI",
    description: "Tailwind CSS; TanStack Query con `fetch` nativo; Zustand solo si React Context no alcanza.",
    technologies: ["Tailwind CSS", "TanStack Query + fetch", "Zustand · si hace falta"],
  },
  {
    category: "APPS EN LA NUBE",
    title: "Gateway SSO compartido",
    description: "Para apps en la nube, usa la autenticación del gateway compartido.",
    technologies: ["Autenticación compartida"],
  },
] as const;

const APPROVED_TECHNOLOGIES_URL =
  "https://westmonroepartners1.sharepoint.com.mcas.ms/sites/AILab/AI%20Lab%20Assets/Forms/AllItems.aspx?id=%2Fsites%2FAILab%2FAI%20Lab%20Assets%2FAI%20Builders%2FBuilder%20Skills%2FOfficial%20Skills%2Fwm%2Dproactive%2Ddeveloper%2Dagent%2Fstandards%2Fapproved%2Dtechnologies%2Emd&parent=%2Fsites%2FAILab%2FAI%20Lab%20Assets%2FAI%20Builders%2FBuilder%20Skills%2FOfficial%20Skills%2Fwm%2Dproactive%2Ddeveloper%2Dagent%2Fstandards";

export const ArchitectureSection = () => (
  <section className="architecture-section section-block" aria-labelledby="architecture-title">
    <div className="section-heading">
      <div>
        <p className="eyebrow">ARQUITECTURA · WM AI BUILDERS</p>
        <h2 id="architecture-title">Tecnologías recomendadas.</h2>
      </div>
      <p className="section-note">Stack aprobado para apps nuevas que sigan el estándar de WM AI Builders.</p>
    </div>

    <div className="architecture-grid">
      {technologyGroups.map((group, index) => (
        <article className="architecture-card" key={group.category} style={{ animationDelay: `${index * 65}ms` }}>
          <div className="architecture-card-top">
            <span className="architecture-index">0{index + 1}</span>
            <span className="architecture-category">{group.category}</span>
          </div>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
          <ul className="architecture-tags" aria-label={`Tecnologías de ${group.category.toLowerCase()}`}>
            {group.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    <aside className="architecture-standard">
      <div>
        <p className="architecture-standard-kicker">FUENTE OFICIAL</p>
        <p className="architecture-standard-copy">Consulta detalles, condiciones y tecnologías aprobadas.</p>
      </div>
      <a href={APPROVED_TECHNOLOGIES_URL} target="_blank" rel="noopener noreferrer">
        Approved Technologies <span aria-hidden="true">↗</span>
      </a>
    </aside>
  </section>
);

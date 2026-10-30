import { AppShell } from "./AppShell";
import { phases, programFacts, skills } from "./content";
import { SkillCards } from "./SkillCards";
import { WorkbenchPreview } from "./WorkbenchPreview";
import { ObjectiveShift } from "./ObjectiveShift";
import { HarnessOverview } from "./HarnessOverview";
import { ArchitectureSection } from "./ArchitectureSection";
import { ProjectIdeasSection } from "./ProjectIdeasSection";
import { ImportantLinksSection } from "./ImportantLinksSection";

export function HomePage() {
  return (
    <AppShell activePage="home">
      <main className="mx-auto max-w-7xl page-content">
        <section className="hero-grid" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow">PROGRAMA PRÁCTICO · 5 SEMANAS</p>
            <h1 id="hero-title">
              Trabajar con IA.
              <br />
              <span>Entregar con criterio.</span>
            </h1>
            <p className="hero-summary">
              Aprende a dirigir la IA durante el ciclo de desarrollo y verifica cada cambio en equipo.
            </p>
            <aside className="sdlc-callout" aria-label="SDLC propuesto de West Monroe">
              <p>Conoce más del SDLC propuesto de West Monroe en:</p>
              <a
                href="https://westmonroe-cloud.com/secure/static/ai-awesome/docs/build/lifecycle/readme"
                target="_blank"
                rel="noreferrer"
              >
                AI-Augmented Software Development Lifecycle
                <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>

          <WorkbenchPreview />
        </section>

        <section className="program-summary section-block" aria-labelledby="summary-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EL PROGRAMA</p>
              <h2 id="summary-title">Aprender haciendo.</h2>
            </div>
            <p className="section-note">
              Cinco semanas para practicar con IA, colaborar en equipo y construir una demo verificable.
            </p>
          </div>
          <div className="fact-grid">
            {programFacts.map((fact, index) => (
              <article className="fact-card" key={fact.label} style={{ animationDelay: `${index * 75}ms` }}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </article>
            ))}
          </div>
          <div className="principles-line" aria-label="Principios AI-first">
            <span><b>01</b> La IA acelera</span>
            <i aria-hidden="true" />
            <span><b>02</b> Las personas deciden</span>
            <i aria-hidden="true" />
            <span><b>03</b> La evidencia da confianza</span>
          </div>
          <ObjectiveShift />
          <HarnessOverview />
        </section>

        <section className="phases-section section-block" id="fases" aria-labelledby="phases-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">RUTA DE CINCO SEMANAS</p>
              <h2 id="phases-title">De la idea a una demo.</h2>
            </div>
            <div className="section-heading-aside">
              <p className="section-note">Un recorrido de cinco semanas para definir, construir, integrar, validar y demostrar.</p>
              <span className="section-index">01 — 05</span>
            </div>
          </div>
          <div className="phase-layout">
            <nav className="phase-list" aria-label="Semanas del programa">
              {phases.map((item) => (
                <a className="phase-tab" href={`/semanas/${item.week}/`} key={item.week}>
                  <span className="phase-week">SEMANA {item.week}</span>
                  <strong>{item.title}</strong>
                  <span className="phase-summary">{item.summary}</span>
                  <span className="phase-outcome-preview"><b>Al cierre</b> {item.outcome}</span>
                  <span className="phase-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="skills-section section-block" aria-labelledby="skills-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SKILLS BASE · PROMPTS PARA CREARLOS</p>
              <h2 id="skills-title">Seis skills base.</h2>
            </div>
            <p className="section-note">Explora flujos reutilizables y adáptalos al repo, los roles y las herramientas del equipo.</p>
          </div>
          <SkillCards items={skills} />
          <aside className="skill-store-callout" aria-label="Explorar skills adicionales">
            <div>
              <p className="skill-store-kicker">AMPLÍA TUS HERRAMIENTAS</p>
              <p className="skill-store-copy">¿Buscas más skills? Explora skills y workflows en el AI Store de West Monroe.</p>
            </div>
            <a
              href="https://westmonroe-cloud.com/secure/static/ai-store/?type=Skill&type=Workflow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buscar skills en AI Store <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </section>

        <ArchitectureSection />
        <ProjectIdeasSection />
        <ImportantLinksSection />
      </main>
    </AppShell>
  );
}

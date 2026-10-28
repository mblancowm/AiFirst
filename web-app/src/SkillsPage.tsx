import { AppShell } from "./AppShell";
import { skills } from "./content";
import { SkillCards } from "./SkillCards";

export function SkillsPage() {
  return (
    <AppShell activePage="skills">
      <main className="mx-auto max-w-7xl page-content skills-page">
        <section className="skills-page-heading">
          <p className="eyebrow">MATERIAL DE APOYO · 6 IDEAS</p>
          <h1>Skills base para el equipo.</h1>
          <p>Cada prompt ayuda a crear una guía para el repositorio.</p>
          <a className="back-link" href="/">← Volver al programa</a>
        </section>
        <SkillCards items={skills} />
      </main>
    </AppShell>
  );
}

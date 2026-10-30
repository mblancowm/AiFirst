import type { ProgramSkill } from "./content";

export function SkillCards({ items }: { items: readonly ProgramSkill[] }) {
  return (
    <div className="skill-grid">
      {items.map((skill, index) => (
        <SkillCard key={skill.id} skill={skill} index={index} />
      ))}
    </div>
  );
}

function SkillCard({ skill, index }: { skill: ProgramSkill; index: number }) {
  return (
    <article className="skill-card" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="skill-card-top">
        <span className="skill-index">0{index + 1}</span>
        <span className="skill-category">{skill.category}</span>
      </div>
      <h3>{skill.title}</h3>
      <p className="skill-summary">{skill.summary}</p>
      <div className="skill-card-footer">
        <a className="skill-details-link" href={`/skills/${skill.id}/`}>
          Ver detalles <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

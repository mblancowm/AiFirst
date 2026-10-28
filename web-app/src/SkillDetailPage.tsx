import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { AppShell } from "./AppShell";
import { skills } from "./content";
import { skillDetails } from "./skillDetails";

export function SkillDetailPage() {
  const { routeParams } = usePageContext();
  const [copied, setCopied] = useState<"prompt" | "template" | null>(null);
  const skillId = routeParams.skillId ?? "";
  const skillIndex = skills.findIndex((item) => item.id === skillId);
  const skill = skills[skillIndex];
  const detail = skillDetails[skillId];

  async function copyText(kind: "prompt" | "template", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  if (!skill || !detail) {
    return (
      <AppShell activePage="skills">
        <main className="mx-auto max-w-7xl page-content skill-detail-page">
          <p className="eyebrow">SKILLS BASE</p>
          <h1>No encontramos este skill.</h1>
          <a className="back-link" href="/#skills-title">← Volver a la sección de Skills</a>
        </main>
      </AppShell>
    );
  }

  const previousSkill = skills[skillIndex - 1];
  const nextSkill = skills[skillIndex + 1];

  return (
    <AppShell activePage="skills">
      <main className="mx-auto max-w-7xl page-content skill-detail-page">
        <a className="back-link skill-detail-back" href="/#skills-title">← Skills en el programa</a>

        <header className="skill-detail-hero">
          <p className="eyebrow">SKILL {String(skillIndex + 1).padStart(2, "0")} · {skill.category}</p>
          <h1>{skill.title}</h1>
          <p className="skill-detail-lead">{skill.summary}</p>
        </header>

        <section className="skill-detail-overview" aria-label="Resumen del skill">
          <article className="skill-detail-card skill-detail-purpose">
            <p className="skill-detail-label">OBJETIVO</p>
            <p>{detail.purpose}</p>
          </article>
          <article className="skill-detail-card">
            <p className="skill-detail-label">RESULTADO ESPERADO</p>
            <p>{detail.result}</p>
          </article>
          <article className="skill-detail-card">
            <p className="skill-detail-label">CUÁNDO USARLO</p>
            <p>{detail.when}</p>
          </article>
          <article className="skill-detail-card">
            <p className="skill-detail-label">QUÉ NECESITA</p>
            <ul>
              {detail.inputs.map((input) => <li key={input}>{input}</li>)}
            </ul>
          </article>
        </section>

        <section className="skill-detail-workflow" aria-labelledby="skill-workflow-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FLUJO DE TRABAJO</p>
              <h2 id="skill-workflow-title">Cómo funciona.</h2>
            </div>
            <p className="section-note">El skill guía el proceso; el equipo conserva las decisiones y aprobaciones.</p>
          </div>
          <ol className="skill-step-list">
            {detail.workflow.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {detail.example && (
          <section className="skill-detail-example" aria-labelledby="skill-example-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">REFERENCIA VISUAL</p>
                <h2 id="skill-example-title">{detail.exampleTitle ?? "Ejemplo de estructura"}.</h2>
              </div>
              <p className="section-note">{detail.exampleIntro}</p>
            </div>
            <pre className="skill-example-tree"><code>{detail.example}</code></pre>
          </section>
        )}

        <section className="skill-detail-prompt" aria-labelledby="skill-prompt-title">
          <div className="skill-detail-prompt-heading">
            <div>
              <p className="eyebrow">IDEA PARA CREARLO</p>
              <h2 id="skill-prompt-title">Prompt de creación.</h2>
              <p>Este prompt crea el archivo del skill; no ejecuta el flujo que describe.</p>
            </div>
            <button className="skill-copy-button" type="button" onClick={() => void copyText("prompt", detail.prompt)}>
              {copied === "prompt" ? "Copiado" : "Copiar prompt"}
            </button>
          </div>
          <pre className="skill-prompt-text"><code>{detail.prompt}</code></pre>
        </section>

        <details className="skill-template-details">
          <summary>
            <span>
              <span className="eyebrow">FORMATO DE REFERENCIA</span>
              <strong>{detail.templateTitle}</strong>
            </span>
            <span className="skill-template-toggle" aria-hidden="true">+</span>
          </summary>
          <div className="skill-template-content">
            <div className="skill-template-toolbar">
              <p>{detail.templateIntro}</p>
              <button className="skill-copy-button skill-copy-button-light" type="button" onClick={() => void copyText("template", detail.template)}>
                {copied === "template" ? "Copiado" : "Copiar formato"}
              </button>
            </div>
            <pre className="skill-template-text"><code>{detail.template}</code></pre>
          </div>
        </details>

        <aside className="skill-shared-convention">
          <strong>Todo skill del equipo debe aclarar:</strong>
          <span>propósito · cuándo usarlo · entradas · flujo · resultado · verificaciones · límites humanos · ejemplo</span>
          <p>Un skill orienta el trabajo; los controles obligatorios requieren verificaciones automáticas y aprobación humana.</p>
        </aside>

        <nav className="skill-detail-pagination" aria-label="Navegar entre skills">
          {previousSkill ? (
            <a href={`/skills/${previousSkill.id}/`}>
              <span>SKILL ANTERIOR</span>
              <strong>← {previousSkill.title}</strong>
            </a>
          ) : <span />}
          {nextSkill ? (
            <a href={`/skills/${nextSkill.id}/`}>
              <span>SKILL SIGUIENTE</span>
              <strong>{nextSkill.title} →</strong>
            </a>
          ) : <a href="/#skills-title"><span>VOLVER AL HOME</span><strong>Explorar Skills →</strong></a>}
        </nav>
      </main>
    </AppShell>
  );
}

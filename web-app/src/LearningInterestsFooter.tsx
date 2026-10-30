import type { PointerEvent as ReactPointerEvent } from "react";

type IdeaSize = "large" | "medium" | "small";
type IdeaTone = "navy" | "blue" | "magenta";

interface Idea {
  text: string;
  size: IdeaSize;
  tone: IdeaTone;
}

const programIdeas: Idea[] = [
  { text: "Apps con IA", size: "large", tone: "navy" },
  { text: "De idea a plan", size: "medium", tone: "blue" },
  { text: "Spec-driven development", size: "medium", tone: "navy" },
  { text: "Desarrollo asistido por IA", size: "medium", tone: "blue" },
  { text: "Prompts con contexto", size: "medium", tone: "magenta" },
  { text: "Skills reutilizables", size: "small", tone: "blue" },
  { text: "Un harness para el LLM", size: "medium", tone: "navy" },
  { text: "Agentes como apoyo", size: "small", tone: "magenta" },
  { text: "Integración de APIs", size: "medium", tone: "blue" },
  { text: "QA desde el inicio", size: "large", tone: "navy" },
  { text: "Pruebas verificables", size: "small", tone: "blue" },
  { text: "Revisión humana", size: "medium", tone: "magenta" },
  { text: "Buenas prácticas profesionales", size: "small", tone: "navy" },
  { text: "Automatización cotidiana", size: "medium", tone: "navy" },
  { text: "Entrega de principio a fin", size: "small", tone: "blue" },
  { text: "IA para diseño y capacitación", size: "medium", tone: "magenta" },
  { text: "Prototipos para nuevas ideas", size: "small", tone: "blue" },
];

const futureIdeas: Idea[] = [
  { text: "Orquestación multiagente", size: "large", tone: "navy" },
  { text: "Agentes que se supervisan", size: "medium", tone: "magenta" },
  { text: "Integraciones con T&E", size: "medium", tone: "blue" },
  { text: "Flujos entre sistemas internos", size: "small", tone: "navy" },
  { text: "Snow · DocuSign · inventario", size: "medium", tone: "blue" },
  { text: "Microservicios y multitenencia", size: "medium", tone: "navy" },
  { text: "Aplicaciones móviles", size: "large", tone: "magenta" },
  { text: "Reuniones resumidas por rol", size: "medium", tone: "blue" },
  { text: "Asistentes para guiar decisiones", size: "medium", tone: "navy" },
  { text: "Enfoques más allá de Spec-driven", size: "small", tone: "blue" },
  { text: "Requisitos conectados con pruebas", size: "medium", tone: "magenta" },
];

const handleIdeaPointerMove = (event: ReactPointerEvent<HTMLUListElement>) => {
  if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
  const pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

  event.currentTarget.querySelectorAll<HTMLElement>("[data-idea]").forEach((idea, index) => {
    const depth = 0.25 + (index % 5) * 0.14;
    idea.style.setProperty("--idea-drift-x", `${(pointerX * depth * 12).toFixed(1)}px`);
    idea.style.setProperty("--idea-drift-y", `${(pointerY * depth * 9).toFixed(1)}px`);
  });
};

const handleIdeaPointerLeave = (event: ReactPointerEvent<HTMLUListElement>) => {
  event.currentTarget.querySelectorAll<HTMLElement>("[data-idea]").forEach((idea) => {
    idea.style.setProperty("--idea-drift-x", "0px");
    idea.style.setProperty("--idea-drift-y", "0px");
  });
};

const IdeaCloud = ({ ideas, label }: { ideas: Idea[]; label: string }) => (
  <ul
    className="interest-cloud"
    aria-label={label}
    onPointerMove={handleIdeaPointerMove}
    onPointerLeave={handleIdeaPointerLeave}
  >
    {ideas.map((idea) => (
      <li
        className={`interest-term interest-term--${idea.size} interest-term--${idea.tone}`}
        data-idea
        key={idea.text}
      >
        {idea.text}
      </li>
    ))}
  </ul>
);

export const LearningInterestsFooter = () => (
  <footer className="learning-interests-footer">
    <div className="learning-interests-inner">
      <div className="interest-boards">
        <section className="interest-board interest-board--program" aria-labelledby="program-ideas-title">
          <div className="interest-board-heading">
            <p className="interest-board-kicker">AHORA · 5 SEMANAS</p>
            <h3 id="program-ideas-title">Lo que practicaremos aquí.</h3>
          </div>
          <IdeaCloud ideas={programIdeas} label="Ideas que abarca el programa" />
        </section>

        <section className="interest-board interest-board--future" aria-labelledby="future-ideas-title">
          <div className="interest-board-heading">
            <p className="interest-board-kicker">PARA SEGUIR EXPLORANDO</p>
            <h3 id="future-ideas-title">Temas para una próxima edición.</h3>
          </div>
          <IdeaCloud ideas={futureIdeas} label="Ideas fuera del alcance de este programa" />
        </section>
      </div>
    </div>

    <div className="learning-interests-bottom">
      <div className="learning-interests-bottom-inner">
        <span>AI-FIRST LEARNING LAB</span>
        <span>Aprender · Construir · Verificar · Compartir</span>
      </div>
    </div>
  </footer>
);

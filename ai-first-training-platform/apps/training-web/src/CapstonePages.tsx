import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import type { CourseLanguage, CourseModule } from "./types";
import { api } from "./api";
import { MarkdownDocument } from "./MarkdownDocument";
import { tx } from "./ui-copy";

export function KnowledgeBasePage({
  language,
  openWalkthrough,
}: {
  language: CourseLanguage;
  openWalkthrough: () => void;
}) {
  const queryClient = useQueryClient();
  const projectsQuery = useQuery({
    queryKey: ["knowledge-projects", language],
    queryFn: () => api.knowledgeProjects(language),
  });
  const [projectId, setProjectId] = useState("atlas");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const selectedProject = projectsQuery.data?.find((project) => project.id === projectId) ?? projectsQuery.data?.[0];
  const addNote = useMutation({
    mutationFn: () => api.addProjectNote(projectId, { title, content }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["knowledge-projects"] });
      setTitle("");
      setContent("");
      setError("");
      setMessage(tx(language, "Nota guardada en SQLite local."));
    },
    onError: (reason) => {
      setError(reason instanceof Error ? tx(language, reason.message) : tx(language, "No se pudo guardar la nota."));
      setMessage("");
    },
  });
  const ask = useMutation({
    mutationFn: () => api.askProject(projectId, question, language),
    onSuccess: (result) => {
      setError("");
      setMessage("");
      setAnswer(result);
    },
    onError: (reason) => {
      setError(
        reason instanceof Error ? tx(language, reason.message) : tx(language, "No se pudo consultar el proyecto."),
      );
      setAnswer(null);
    },
  });
  const [answer, setAnswer] = useState<Awaited<ReturnType<typeof api.askProject>> | null>(null);
  const onAddNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    addNote.mutate();
  };
  const onAsk = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    ask.mutate();
  };
  const changeProject = (nextProjectId: string) => {
    setProjectId(nextProjectId);
    setAnswer(null);
    setMessage("");
    setError("");
  };

  if (projectsQuery.isLoading)
    return (
      <div className="panel" role="status">
        {tx(language, "Cargando proyectos de práctica…")}
      </div>
    );
  if (projectsQuery.isError || !selectedProject)
    return (
      <div className="notice error" role="alert">
        {tx(language, "No se pudieron cargar los proyectos. Verifica que la API local esté activa.")}
      </div>
    );
  return (
    <>
      <p className="eyebrow">{tx(language, "PROYECTO DE EJEMPLO · DATOS FICTICIOS")}</p>
      <h1>
        {tx(language, "Base interna ")}
        <span>{tx(language, "de conocimiento.")}</span>
      </h1>
      <p className="muted">
        {tx(
          language,
          "Agrega notas a un proyecto y pregunta. La respuesta se basa solo en sus notas y muestra referencias o indica que falta evidencia.",
        )}
      </p>
      <section className="capstone-context" aria-label={tx(language, "Relación entre la demo y la guía")}>
        <div>
          <p className="eyebrow">{tx(language, "DEMO FUNCIONAL")}</p>
          <p>
            {tx(
              language,
              "Esta es la demo que describe la guía de integración. Usa notas ficticias; el proyecto de tu equipo puede ser distinto y no requiere IA.",
            )}
          </p>
        </div>
        <button className="button light" type="button" onClick={openWalkthrough}>
          {tx(language, "Ver cómo se integra →")}
        </button>
      </section>
      <label className="role-select" htmlFor="knowledge-project">
        <span>{tx(language, "Proyecto")}</span>
        <select
          id="knowledge-project"
          value={selectedProject.id}
          onChange={(event) => changeProject(event.target.value)}
        >
          {projectsQuery.data?.map((project) => (
            <option value={project.id} key={project.id}>
              {project.name} · {project.description}
            </option>
          ))}
        </select>
      </label>
      <div className="knowledge-grid">
        <section className="panel">
          <p className="eyebrow">
            {tx(language, "NOTAS DE")} {selectedProject.name.toLocaleUpperCase(language)}
          </p>
          <h2>{tx(language, "Fuentes disponibles")}</h2>
          {selectedProject.notes.length ? (
            <ul className="note-list">
              {selectedProject.notes.map((note) => (
                <li key={note.id}>
                  <strong>{note.title}</strong>
                  <p>{note.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">{tx(language, "Este proyecto aún no tiene notas.")}</p>
          )}
          <form onSubmit={onAddNote} className="note-form">
            <h3>{tx(language, "Agregar una nota")}</h3>
            <label htmlFor="note-title">{tx(language, "Título")}</label>
            <input
              id="note-title"
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <label htmlFor="note-content">{tx(language, "Contenido")}</label>
            <textarea
              id="note-content"
              maxLength={3000}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
            <button className="button" type="submit" disabled={addNote.isPending}>
              {addNote.isPending ? tx(language, "Guardando…") : tx(language, "Guardar nota")}
            </button>
          </form>
        </section>
        <section className="panel">
          <p className="eyebrow">{tx(language, "PREGUNTA CON FUENTES")}</p>
          <h2>{tx(language, "Consulta las notas")}</h2>
          <form onSubmit={onAsk}>
            <label htmlFor="project-question">{tx(language, "Pregunta")}</label>
            <textarea
              id="project-question"
              maxLength={1600}
              placeholder={tx(language, "¿Qué decidió el equipo sobre el MVP?")}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              required
            />
            <button className="button brand" type="submit" disabled={ask.isPending}>
              {ask.isPending ? tx(language, "Buscando evidencia…") : tx(language, "Preguntar")}
            </button>
          </form>
          {error && (
            <p className="notice error" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="notice" role="status">
              {message}
            </p>
          )}
          {answer && (
            <div className="lesson-section" aria-live="polite">
              <strong>
                {tx(language, "Respuesta · ")}
                {answer.evidenceStatus === "supported"
                  ? tx(language, "con evidencia")
                  : tx(language, "evidencia insuficiente")}
              </strong>
              <p>{answer.answer}</p>
              <small>
                {tx(language, "Modo:")}{" "}
                {answer.provider === "mock"
                  ? tx(language, "mock determinista local")
                  : tx(language, "proveedor configurado")}
              </small>
              {answer.references.length > 0 && (
                <>
                  <h3>{tx(language, "Referencias")}</h3>
                  <ul>
                    {answer.references.map((reference) => (
                      <li key={reference.id}>
                        {reference.title} ({tx(language, "nota")} {reference.id})
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          <p className="muted">
            {tx(
              language,
              "Cada consulta recupera notas solo del proyecto seleccionado. Usa contenido sintético; este entorno no implementa autenticación compartida.",
            )}
          </p>
        </section>
      </div>
    </>
  );
}

export function WalkthroughPage({
  openKnowledge,
  modules,
  openLesson,
  language,
}: {
  openKnowledge: () => void;
  modules: CourseModule[];
  openLesson: (module: CourseModule) => void;
  language: CourseLanguage;
}) {
  const walkthrough = useQuery({
    queryKey: ["course-walkthrough", language],
    queryFn: () => api.walkthrough(language),
  });
  return (
    <>
      <p className="eyebrow">{tx(language, "GUÍA DE INTEGRACIÓN · PROYECTO DE EJEMPLO")}</p>
      <h1>
        {tx(language, "Cómo se integra ")}
        <span>{tx(language, "la demo de base de conocimiento")}</span>
      </h1>
      <p className="muted">
        {tx(
          language,
          "Esta guía recorre la consulta de notas de la demo de base de conocimiento y muestra cómo se conectan la interfaz, el contrato, la API, SQLite y el tutor.",
        )}
      </p>
      <section className="capstone-context" aria-label={tx(language, "Relación entre la guía y la demo")}>
        <div>
          <p className="eyebrow">{tx(language, "GUÍA DEL EJEMPLO")}</p>
          <p>
            {tx(
              language,
              "Este recorrido describe la demo de base de conocimiento. Ábrela para agregar notas ficticias y probar la misma consulta.",
            )}
          </p>
        </div>
        <button className="button light" type="button" onClick={openKnowledge}>
          {tx(language, "Abrir demo de base de conocimiento →")}
        </button>
      </section>
      {walkthrough.isLoading && (
        <div className="panel" role="status">
          {tx(language, "Cargando recorrido…")}
        </div>
      )}
      {walkthrough.isError && (
        <div className="notice error" role="alert">
          {tx(language, "No se pudo cargar el walkthrough desde el API.")}
        </div>
      )}
      {walkthrough.data && (
        <section className="panel">
          <MarkdownDocument markdown={walkthrough.data.markdown} />
        </section>
      )}
      <div className="section-head">
        <div>
          <p className="eyebrow">{tx(language, "MÓDULOS RELACIONADOS")}</p>
          <h2>{tx(language, "Abre cada paso del equipo")}</h2>
        </div>
      </div>
      <section className="module-grid">
        {modules.map((module, index) => (
          <button className="module-card" type="button" key={module.id} onClick={() => openLesson(module)}>
            <span className="module-meta">
              {tx(language, "ETAPA")} {index + 1} · {tx(language, "SEMANA")} 0{module.week}
            </span>
            <h3>{module.title}</h3>
            <p>{module.summary}</p>
            <span className="card-footer">{tx(language, "Abrir módulo →")}</span>
          </button>
        ))}
      </section>
    </>
  );
}

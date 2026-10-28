import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { api } from "./api";
import { KnowledgeBasePage, WalkthroughPage } from "./CapstonePages";
import { MarkdownDocument } from "./MarkdownDocument";
import {
  localizedPrompts,
  localizedRoleSkills,
  localizedRoles,
  localizedTeamSkills,
  roleLabel,
} from "./learning-content";
import { getModuleNeighbors, moduleIdForMarkdownLink } from "./navigation";
import { projectEnglish, projects } from "./projects";
import type {
  CourseLanguage,
  CourseModule,
  ProjectCode,
  PromptItem,
  RoleKey,
  TrainingGroup,
  TutorResponse,
} from "./types";
import { tx } from "./ui-copy";

type Page = "home" | "lesson" | "projects" | "groups" | "skills" | "prompts" | "knowledge" | "walkthrough";

const navItems: { key: Page; label: string; icon: string }[] = [
  { key: "home", label: "Mi ruta", icon: "⌂" },
  { key: "groups", label: "Grupos y roles", icon: "♧" },
  { key: "projects", label: "Proyectos (3)", icon: "▣" },
];

const capstoneNavItems: { key: Page; label: string; icon: string }[] = [
  { key: "knowledge", label: "Demo: base de conocimiento", icon: "⌕" },
  { key: "walkthrough", label: "Guía de integración", icon: "↗" },
];

const resourceNavItems: { key: Page; label: string; icon: string }[] = [
  { key: "skills", label: "Guías por rol", icon: "◇" },
  { key: "prompts", label: "Prompts opcionales", icon: "✳" },
];

export function TrainingApp() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 10_000, refetchOnWindowFocus: false } },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TrainingWorkspace />
    </QueryClientProvider>
  );
}

function TrainingWorkspace() {
  const queryClient = useQueryClient();
  const [language, setLanguage] = useState<CourseLanguage>("es");
  const [learnerEmail, setLearnerEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const courseQuery = useQuery({
    queryKey: ["course", language, learnerEmail],
    queryFn: () => api.course(language, learnerEmail),
    enabled: Boolean(learnerEmail),
  });
  const overviewQuery = useQuery({
    queryKey: ["course-overview", language],
    queryFn: () => api.overview(language),
    enabled: Boolean(learnerEmail),
  });
  const groupsQuery = useQuery({
    queryKey: ["groups", learnerEmail],
    queryFn: () => api.groups(learnerEmail),
    enabled: Boolean(learnerEmail),
  });
  const [page, setPage] = useState<Page>("home");
  const [moduleId, setModuleId] = useState("semana-1-equipo");
  const [role, setRole] = useState<RoleKey>("frontend");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [tutorResult, setTutorResult] = useState<TutorResponse | null>(null);
  const [tutorLoading, setTutorLoading] = useState(false);
  const [promptSearch, setPromptSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [newMember, setNewMember] = useState("");
  const [memberRole, setMemberRole] = useState<RoleKey>("frontend");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("ai-first-course-language");
    if (savedLanguage === "en" || savedLanguage === "es") setLanguage(savedLanguage);
    const savedEmail = window.sessionStorage.getItem("ai-first-course-pilot-email");
    if (savedEmail) {
      setEmailInput(savedEmail);
      setLearnerEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ai-first-course-language", language);
    document.documentElement.lang = language;
    document.title = language === "en" ? "AI-First Learning Lab · Course" : "AI-First Learning Lab · Programa";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content =
        language === "en"
          ? "A four-week bilingual course for learning AI-first practices by building a project as a team."
          : "Programa de cuatro semanas para aprender prácticas AI-first construyendo un proyecto en equipo.";
    }
  }, [language]);

  const modules = courseQuery.data ?? [];
  const activeModule = modules.find((item) => item.id === moduleId) ?? modules[0] ?? null;
  const groups = groupsQuery.data ?? [];
  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0] ?? null;
  const doneCount = modules.filter((item) => item.completed).length;
  const progress = modules.length ? Math.round((doneCount / modules.length) * 100) : 0;
  const nextModule = modules.find((item) => !item.completed) ?? null;
  const activeModuleIndex = modules.findIndex((item) => item.id === activeModule?.id);
  const { previous: previousModule, next: followingModule } = getModuleNeighbors(modules, activeModule?.id);
  const filteredPrompts = useMemo(
    () =>
      localizedPrompts(language).filter((item) =>
        `${item.code} ${item.title} ${item.audience} ${item.role} ${item.body}`
          .toLocaleLowerCase(language)
          .includes(promptSearch.trim().toLocaleLowerCase(language)),
      ),
    [promptSearch, language],
  );

  useEffect(() => {
    if (groups.length && !groups.some((group) => group.id === selectedGroupId)) setSelectedGroupId(groups[0].id);
  }, [groups, selectedGroupId]);

  const refresh = async () => {
    setError("");
    await Promise.all([courseQuery.refetch(), groupsQuery.refetch()]);
  };
  const reportError = (reason: unknown) => {
    setError(
      reason instanceof Error
        ? tx(language, reason.message)
        : tx(language, "No se pudo guardar el cambio. Revisa que la API local esté activa."),
    );
    setNotice("");
  };

  const saveProgressMutation = useMutation({
    mutationFn: ({ target, completed }: { target: CourseModule; completed: boolean }) =>
      api.saveProgress(target.id, { completed, reflection: "" }, language, learnerEmail),
    onSuccess: (saved) => {
      for (const savedLanguage of ["es", "en"] as const) {
        queryClient.setQueryData<CourseModule[]>(["course", savedLanguage, learnerEmail], (current) =>
          current?.map((item) =>
            item.id === saved.id
              ? {
                  ...item,
                  completed: saved.completed,
                  reflection: saved.reflection,
                  completedAtUtc: saved.completedAtUtc,
                }
              : item,
          ),
        );
      }
      setError("");
    },
    onError: reportError,
  });

  const groupMutation = useMutation({
    mutationFn: async (action: () => Promise<unknown>) => action(),
    onSuccess: async () => {
      setError("");
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: reportError,
  });

  const choosePage = (destination: Page) => {
    setPage(destination);
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLesson = (item: CourseModule) => {
    setModuleId(item.id);
    setTutorResult(null);
    setPage("lesson");
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeModule = async () => {
    if (!activeModule) return;
    try {
      const saved = await saveProgressMutation.mutateAsync({
        target: activeModule,
        completed: true,
      });
      setNotice(
        saved.completed
          ? tx(language, "Módulo completado. Tu avance quedó guardado.")
          : tx(language, "No se pudo completar el módulo."),
      );
    } catch {
      /* The mutation places the API error in the page alert. */
    }
  };

  const askTutor = async () => {
    if (!activeModule || !question.trim()) {
      setNotice(tx(language, "Escribe una pregunta para consultar al tutor."));
      return;
    }
    setTutorResult(null);
    setTutorLoading(true);
    try {
      const result = await api.askTutor(role, question.trim(), language);
      setTutorResult(result);
    } catch (reason) {
      reportError(reason);
    } finally {
      setTutorLoading(false);
    }
  };

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(language === "en" ? `${label} copied.` : `${label} copiado.`);
    } catch {
      setNotice(tx(language, "El navegador bloqueó el portapapeles. Selecciona y copia el texto."));
    }
  };

  const enterWithEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = emailInput.trim().toLowerCase();
    if (!normalizedEmail) return;
    window.sessionStorage.setItem("ai-first-course-pilot-email", normalizedEmail);
    queryClient.clear();
    setLearnerEmail(normalizedEmail);
    setEmailInput(normalizedEmail);
    setPage("home");
    setError("");
    setNotice("");
  };

  const changeEmail = () => {
    window.sessionStorage.removeItem("ai-first-course-pilot-email");
    queryClient.clear();
    setLearnerEmail("");
    setEmailInput("");
    setError("");
    setNotice("");
  };

  const createGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newGroup.trim()) return;
    try {
      const created = await api.createGroup(newGroup.trim(), learnerEmail);
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      setSelectedGroupId(created.id);
      setNewGroup("");
      setNotice(language === "en" ? `Team “${created.name}” created.` : `Grupo “${created.name}” creado.`);
    } catch (reason) {
      reportError(reason);
    }
  };

  const deleteGroup = async (groupId: number) => {
    const group = groups.find((item) => item.id === groupId);
    if (!group?.canDelete) return;
    const message =
      language === "en"
        ? `Delete “${group.name}” and its ${group.members.length} members? This cannot be undone.`
        : `¿Eliminar “${group.name}” y sus ${group.members.length} integrantes? Esta acción no se puede deshacer.`;
    if (!window.confirm(message)) return;
    try {
      await groupMutation.mutateAsync(() => api.deleteGroup(groupId, learnerEmail));
      if (selectedGroupId === groupId) setSelectedGroupId(null);
      setNotice(tx(language, "Grupo e integrantes eliminados."));
    } catch {
      /* The mutation places the API error in the page alert. */
    }
  };

  const addMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGroup || !newMember.trim()) return;
    try {
      await groupMutation.mutateAsync(() => api.addMember(selectedGroup.id, newMember.trim(), memberRole));
      setNewMember("");
      setNotice(
        language === "en"
          ? `${newMember.trim()} was added to ${selectedGroup.name}.`
          : `${newMember.trim()} se agregó a ${selectedGroup.name}.`,
      );
    } catch {
      /* The mutation places the API error in the page alert. */
    }
  };

  const chooseProject = async (projectCode: ProjectCode | null) => {
    if (!selectedGroup) return;
    try {
      await groupMutation.mutateAsync(() => api.chooseProject(selectedGroup.id, projectCode));
      setNotice(
        projectCode
          ? tx(language, "Proyecto guardado para el grupo.")
          : tx(language, "Se quitó el proyecto del grupo."),
      );
    } catch {
      /* The mutation places the API error in the page alert. */
    }
  };

  if (!learnerEmail) {
    return (
      <EmailAccessGate
        language={language}
        setLanguage={setLanguage}
        email={emailInput}
        setEmail={setEmailInput}
        onSubmit={enterWithEmail}
      />
    );
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <button
          className="brand"
          type="button"
          onClick={() => choosePage("home")}
          aria-label={language === "en" ? "AI-First Learning Lab, home" : "AI-First Learning Lab, inicio"}
        >
          <img src="/brand/west-monroe-horizontal-white.svg" alt="West Monroe" />
          <span className="brand-divider" />
          <span className="brand-copy">
            <strong>AI-FIRST</strong>
            <small>LEARNING LAB</small>
          </span>
          <img className="compass" src="/brand/west-monroe-compass.svg" alt="" />
        </button>
        <div className="nav-label">{tx(language, "PROGRAMA")}</div>
        <nav className="side-nav" aria-label={tx(language, "Navegación principal")}>
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={page === item.key ? "active" : ""}
              aria-current={page === item.key ? "page" : undefined}
              onClick={() => choosePage(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              {tx(language, item.label)}
            </button>
          ))}
        </nav>
        <div className="nav-label capstone-nav-label">{tx(language, "EJEMPLO DE PROYECTO")}</div>
        <nav className="side-nav" aria-label={tx(language, "Ejemplo de proyecto")}>
          {capstoneNavItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={page === item.key ? "active" : ""}
              aria-current={page === item.key ? "page" : undefined}
              onClick={() => choosePage(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              {tx(language, item.label)}
            </button>
          ))}
        </nav>
        <div className="nav-label optional-label">{tx(language, "RECURSOS OPCIONALES")}</div>
        <nav className="side-nav" aria-label={tx(language, "Recursos opcionales")}>
          {resourceNavItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={page === item.key ? "active" : ""}
              aria-current={page === item.key ? "page" : undefined}
              onClick={() => choosePage(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              {tx(language, item.label)}
            </button>
          ))}
        </nav>
        <div className="nav-label course-nav-label">{tx(language, "CONTENIDO DEL CURSO")}</div>
        <nav className="side-nav week-nav" aria-label={tx(language, "Módulos del programa")}>
          {modules.map((item) => (
            <button
              className={`week-button ${page === "lesson" && item.id === activeModule?.id ? "active" : ""}`}
              aria-current={page === "lesson" && item.id === activeModule?.id ? "page" : undefined}
              key={item.id}
              type="button"
              onClick={() => openLesson(item)}
            >
              <span className="week-num">{moduleCode(item)}</span>
              <span className="week-title">{moduleTitle(item)}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="local-badge">
            <i /> {tx(language, "Perfil piloto por email")}
          </span>
          <p>{tx(language, "Email sin verificar. No guardes información privada.")}</p>
          <strong>{tx(language, "Email de práctica")}</strong>
          <br />
          <small>{learnerEmail}</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            {tx(language, "Programa")}&nbsp; / &nbsp;<strong>{pageTitle(page, activeModule, language)}</strong>
          </div>
          <div className="topbar-actions">
            <label className="language-select">
              <svg aria-hidden="true" className="language-icon" fill="none" focusable="false" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
              <select
                aria-label={tx(language, "Idioma del curso")}
                value={language}
                onChange={(event) => {
                  setLanguage(event.target.value as CourseLanguage);
                  setTutorResult(null);
                  setNotice("");
                  setError("");
                }}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
            <div className="top-status">
              {tx(language, "Perfil")}: {learnerEmail}
            </div>
            <button className="button light profile-switch" type="button" onClick={changeEmail}>
              {tx(language, "Cambiar email")}
            </button>
          </div>
        </header>
        <div className="content">
          {error && (
            <div className="notice error" role="alert">
              <span>{error}</span>
              <button className="button light" type="button" onClick={() => void refresh()}>
                {tx(language, "Reintentar")}
              </button>
            </div>
          )}
          {notice && (
            <div className="notice" role="status">
              ✓&nbsp; {notice}
            </div>
          )}
          <div className="notice pilot-notice" role="note">
            {tx(
              language,
              "Piloto: el email solo identifica el avance y no se verifica. Cualquiera puede escribir el de otra persona y ver o cambiar su avance. No ingreses información privada ni sensible.",
            )}
          </div>
          {courseQuery.isLoading && (
            <div className="panel">{tx(language, "Preparando tu espacio de aprendizaje…")}</div>
          )}
          {courseQuery.isError && (
            <div className="empty">
              {tx(language, "No pudimos cargar el curso. Inicia la API Bun y vuelve a intentar.")}
            </div>
          )}
          {!courseQuery.isLoading && page === "home" && (
            <HomePage
              modules={modules}
              progress={progress}
              doneCount={doneCount}
              nextModule={nextModule}
              openLesson={openLesson}
              choosePage={choosePage}
              overviewMarkdown={overviewQuery.data?.markdown ?? ""}
              language={language}
            />
          )}
          {!courseQuery.isLoading && page === "lesson" && activeModule && (
            <LessonPage
              module={activeModule}
              onComplete={() => void completeModule()}
              saving={saveProgressMutation.isPending}
              question={question}
              setQuestion={setQuestion}
              onAsk={() => void askTutor()}
              tutorResult={tutorResult}
              tutorLoading={tutorLoading}
              onOpenReference={(referenceId) => {
                const target = modules.find((item) => item.id === referenceId);
                if (target) openLesson(target);
              }}
              onPrevious={previousModule ? () => openLesson(previousModule) : undefined}
              onNext={followingModule ? () => openLesson(followingModule) : () => choosePage("home")}
              previousLabel={previousModule ? moduleTitle(previousModule) : tx(language, "Módulo anterior")}
              nextLabel={followingModule ? moduleTitle(followingModule) : tx(language, "Volver a Mi ruta")}
              modulePosition={
                language === "en"
                  ? `Step ${activeModuleIndex + 1} of ${modules.length} · Module ${moduleCode(activeModule)}`
                  : `Paso ${activeModuleIndex + 1} de ${modules.length} · Módulo ${moduleCode(activeModule)}`
              }
              language={language}
            />
          )}
          {page === "projects" && <ProjectsPage choosePage={choosePage} language={language} />}
          {page === "knowledge" && (
            <KnowledgeBasePage language={language} openWalkthrough={() => choosePage("walkthrough")} />
          )}
          {page === "walkthrough" && (
            <WalkthroughPage
              openKnowledge={() => choosePage("knowledge")}
              openLesson={openLesson}
              modules={modules}
              language={language}
            />
          )}
          {page === "groups" && (
            <GroupsPage
              groups={groups}
              groupsLoading={groupsQuery.isLoading}
              selectedGroup={selectedGroup}
              selectedGroupId={selectedGroup?.id ?? null}
              selectGroup={(id) => setSelectedGroupId(id)}
              newGroup={newGroup}
              setNewGroup={setNewGroup}
              onCreateGroup={createGroup}
              onDeleteGroup={(id) => void deleteGroup(id)}
              newMember={newMember}
              setNewMember={setNewMember}
              memberRole={memberRole}
              setMemberRole={setMemberRole}
              onAddMember={addMember}
              onRemoveMember={(id) => {
                if (selectedGroup)
                  void groupMutation
                    .mutateAsync(() => api.removeMember(selectedGroup.id, id))
                    .then(() => setNotice(tx(language, "Developer removido.")))
                    .catch(() => undefined);
              }}
              onChooseProject={(code) => void chooseProject(code)}
              language={language}
            />
          )}
          {page === "skills" && <SkillsPage language={language} />}
          {page === "prompts" && (
            <PromptsPage
              role={role}
              setRole={setRole}
              search={promptSearch}
              setSearch={setPromptSearch}
              items={filteredPrompts}
              copyText={copyText}
              language={language}
            />
          )}
          <footer className="footer">
            <span>AI-FIRST LEARNING LAB</span>
            <span>{tx(language, "Aprende · Construye · Verifica · Entrega")}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function EmailAccessGate({
  language,
  setLanguage,
  email,
  setEmail,
  onSubmit,
}: {
  language: CourseLanguage;
  setLanguage: (language: CourseLanguage) => void;
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="pilot-gate">
      <section className="panel pilot-gate-card">
        <div className="pilot-gate-heading">
          <div>
            <p className="eyebrow">AI-FIRST LEARNING LAB</p>
            <h1>{tx(language, "Entra al programa")}</h1>
          </div>
          <label className="language-select">
            <span className="sr-only">{tx(language, "Idioma del curso")}</span>
            <select
              aria-label={tx(language, "Idioma del curso")}
              value={language}
              onChange={(event) => setLanguage(event.target.value as CourseLanguage)}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
        <p>{tx(language, "Ingresa tu email para separar y guardar tu avance del curso.")}</p>
        <p className="returning-hint">
          {tx(language, "¿Ya empezaste? Escribe el mismo email para retomar desde donde quedaste.")}
        </p>
        <div className="notice pilot-notice" role="note">
          {tx(
            language,
            "El email solo identifica el avance y no se verifica. Cualquier persona puede escribir el de otra y ver o cambiar su avance. No ingreses información privada ni sensible.",
          )}
        </div>
        <form className="pilot-email-form" onSubmit={onSubmit}>
          <label htmlFor="pilot-email">{tx(language, "Email")}</label>
          <input
            id="pilot-email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="button brand" type="submit">
            {tx(language, "Entrar al curso")}
          </button>
        </form>
      </section>
    </main>
  );
}

function moduleCode(module: CourseModule): string {
  return module.title.match(/^(\d{2})\s*·/u)?.[1] ?? "??";
}

function moduleTitle(module: CourseModule): string {
  return module.title.replace(/^\d{2}\s*·\s*/u, "");
}

function pageTitle(page: Page, activeModule: CourseModule | null, language: CourseLanguage) {
  if (page === "lesson") return activeModule ? moduleTitle(activeModule) : tx(language, "Módulo");
  return tx(
    language,
    [...navItems, ...capstoneNavItems, ...resourceNavItems].find((item) => item.key === page)?.label ?? "Programa",
  );
}

function HomePage({
  modules,
  progress,
  doneCount,
  nextModule,
  openLesson,
  choosePage,
  overviewMarkdown,
  language,
}: {
  modules: CourseModule[];
  progress: number;
  doneCount: number;
  nextModule: CourseModule | null;
  openLesson: (module: CourseModule) => void;
  choosePage: (page: Page) => void;
  overviewMarkdown: string;
  language: CourseLanguage;
}) {
  const navigateMarkdownModule = (href: string) => {
    const targetId = moduleIdForMarkdownLink(href);
    const target = modules.find((module) => module.id === targetId);
    if (target) openLesson(target);
  };
  return (
    <>
      <section className="welcome">
        <div>
          <p className="eyebrow">{tx(language, "TU PROGRAMA DE ENTRENAMIENTO")}</p>
          <h1>
            {tx(language, "Aprende construyendo")}
            <br />
            <span>{tx(language, "con inteligencia artificial.")}</span>
          </h1>
        </div>
        <div className="role-select">
          <span>{tx(language, "Programa autoguiado")}</span>
          <strong>{tx(language, "4 semanas · 2–8 h / semana")}</strong>
        </div>
      </section>
      <section className="hero">
        <div>
          <div className="hero-kicker">{tx(language, "AUTOGUIADO · A TU RITMO")}</div>
          <h2>{tx(language, "De reglas claras a un cambio que puedes defender.")}</h2>
          <p>
            {tx(
              language,
              "Un equipo de 3–4 developers transforma una necesidad en un flujo funcional, lo prueba con evidencia y deja un handoff que otra persona puede continuar.",
            )}
          </p>
          <button
            className="button brand"
            type="button"
            disabled={!modules.length}
            onClick={() => {
              const target = nextModule ?? modules[modules.length - 1];
              if (target) openLesson(target);
            }}
          >
            {doneCount === modules.length && modules.length
              ? tx(language, "Revisar entrega final →")
              : nextModule
                ? language === "en"
                  ? `Continue: ${nextModule.title} →`
                  : `Continuar: ${nextModule.title} →`
                : tx(language, "Empezar el programa →")}
          </button>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <span className="orbit" />
          <span className="orbit two" />
          <span className="orbit-core">AI ✳</span>
        </div>
        <div className="hero-foot">
          <span>
            01 <b>{tx(language, "Definir")}</b>
          </span>
          <i />
          <span>
            02 <b>{tx(language, "Construir")}</b>
          </span>
          <i />
          <span>
            03 <b>{tx(language, "Verificar")}</b>
          </span>
          <i />
          <span>
            04 <b>{tx(language, "Entregar")}</b>
          </span>
        </div>
      </section>
      <section className="panel start-panel">
        <p className="eyebrow">{tx(language, "PRIMEROS PASOS")}</p>
        <h2>{tx(language, "Empieza por aquí")}</h2>
        <p className="muted">
          <strong>{tx(language, "Este sitio es tu guía de aprendizaje.")}</strong>{" "}
          {tx(
            language,
            "La app del equipo va en un repositorio Git separado. Abre ese repositorio en Codex o Claude; usa la demo de este sitio solo como referencia.",
          )}
        </p>
        <ol>
          <li>
            <span>
              <strong>{tx(language, "Organiza el equipo.")}</strong>{" "}
              {tx(
                language,
                "Elijan un proyecto y asignen Producto, Web, API y Datos; QA se rota. Otra persona revisa cada cambio.",
              )}
            </span>
            <button className="button light" type="button" onClick={() => choosePage("groups")}>
              {tx(language, "Crear grupo")}
            </button>
          </li>
          <li>
            <span>
              <strong>{tx(language, "Conoce el proyecto de ejemplo.")}</strong>{" "}
              {tx(
                language,
                "La base de conocimiento es una demo funcional; la guía explica cómo se integra. Tu equipo puede elegir otro proyecto.",
              )}
            </span>
            <div className="start-actions">
              <button className="button light" type="button" onClick={() => choosePage("knowledge")}>
                {tx(language, "Abrir demo")}
              </button>
              <button className="button light" type="button" onClick={() => choosePage("walkthrough")}>
                {tx(language, "Ver guía de integración")}
              </button>
            </div>
          </li>
          <li>
            <span>
              <strong>{tx(language, "Sigue la secuencia.")}</strong>{" "}
              {tx(language, "Brief y contrato → base de datos y API → pantalla → QA, transferencia y demo.")}
            </span>
            <button
              className="button"
              type="button"
              disabled={!modules.length}
              onClick={() => modules[0] && openLesson(modules[0])}
            >
              {tx(language, "Abrir primer módulo")}
            </button>
          </li>
        </ol>
        <p className="muted">
          {tx(
            language,
            "Los seis módulos suman unas 12 horas guiadas: 2 h en la semana 1, 4 h en las semanas 2 y 3, y 2 h en la semana 4. Si solo tienen 2 h por semana, acuerden extender el calendario; no salten las verificaciones.",
          )}
        </p>
        <p className="muted">
          {tx(
            language,
            "El avance se separa por el email de práctica que escribiste. El email no se verifica; no guardes información privada. Este piloto local no es una cuenta segura.",
          )}
        </p>
      </section>
      <section className="cohort" aria-label={tx(language, "Detalles del programa")}>
        <div>
          <span>{tx(language, "DURACIÓN")}</span>
          <strong>{tx(language, "4 semanas")}</strong>
        </div>
        <div>
          <span>{tx(language, "DEDICACIÓN")}</span>
          <strong>{tx(language, "2–8 h / semana")}</strong>
        </div>
        <div>
          <span>{tx(language, "EQUIPO")}</span>
          <strong>{tx(language, "3–4 developers")}</strong>
        </div>
        <div>
          <span>{tx(language, "RESULTADO")}</span>
          <strong>{tx(language, "Demo verificable")}</strong>
        </div>
      </section>
      <details className="panel stack-details">
        <summary>{tx(language, "Ver stack común del programa")}</summary>
        <p>
          {language === "en"
            ? "React + strict TypeScript · Vike/vike-react · Bun + Hono · Drizzle · local SQLite / approved shared PostgreSQL · Zod · server-side Vercel AI SDK · Tailwind · TanStack Query + native fetch. Cloud access depends on the shared SSO gateway."
            : "React + TypeScript estricto · Vike/vike-react · Bun + Hono · Drizzle · SQLite local / PostgreSQL compartido aprobado · Zod · Vercel AI SDK en servidor · Tailwind · TanStack Query + fetch nativo. En nube, el acceso depende del gateway SSO compartido."}
        </p>
      </details>
      <section className="progress-card">
        <span className="progress-ring">◔</span>
        <div className="progress-copy">
          <strong>{tx(language, "Tu progreso")}</strong>
          <span>
            {doneCount} {tx(language, "de")} {modules.length} {tx(language, "módulos completados")}
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label={tx(language, "Progreso del curso")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <strong>{progress}%</strong>
      </section>
      <div className="section-head">
        <div>
          <p className="eyebrow">{tx(language, "TU RECORRIDO")}</p>
          <h2>{tx(language, "Cuatro semanas. Un proyecto en equipo.")}</h2>
        </div>
        <button className="button light" type="button" onClick={() => choosePage("knowledge")}>
          {tx(language, "Abrir demo de base de conocimiento →")}
        </button>
      </div>
      <section className="module-grid">
        {modules.map((module) => (
          <button className="module-card" key={module.id} type="button" onClick={() => openLesson(module)}>
            <div className="module-meta">
              <span>
                {language === "en"
                  ? `WEEK 0${module.week} · MODULE ${moduleCode(module)}`
                  : `SEMANA 0${module.week} · MÓDULO ${moduleCode(module)}`}
              </span>
              <span>{module.completed ? tx(language, "COMPLETADO ✓") : tx(language, "PENDIENTE")}</span>
            </div>
            <h3>{moduleTitle(module)}</h3>
            <p>{module.summary}</p>
            <div className="card-footer">
              <span>≈ {module.minutes / 60} h</span>
              <span>{tx(language, "Abrir módulo →")}</span>
            </div>
          </button>
        ))}
      </section>
      <section className="panel">
        <p className="eyebrow">{tx(language, "GUÍA DEL PROGRAMA · MARKDOWN")}</p>
        <MarkdownDocument markdown={overviewMarkdown} onInternalLink={navigateMarkdownModule} />
      </section>
      <div className="section-head">
        <div>
          <p className="eyebrow">{tx(language, "ENTREGA DE EQUIPO")}</p>
          <h2>{tx(language, "Elijan un proyecto para su grupo.")}</h2>
        </div>
        <button className="button light" type="button" onClick={() => choosePage("projects")}>
          {tx(language, "Ver opciones →")}
        </button>
      </div>
      <section className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.code}>
            <div className="project-meta">
              <span>
                {tx(language, "OPCIÓN")} 0{index + 1}
              </span>
              <span>{tx(language, "4 SEMANAS")}</span>
            </div>
            <h3>{language === "en" ? projectEnglish[project.code].title : project.title}</h3>
            <p>{language === "en" ? projectEnglish[project.code].summary : project.summary}</p>
            <div className="project-actions">
              <a
                className="button light"
                href={language === "en" ? project.briefEn : project.brief}
                download={language === "en" ? project.downloadNameEn : project.downloadName}
              >
                {tx(language, "Descargar brief ↘")}
              </a>
              <button className="button" type="button" onClick={() => choosePage("projects")}>
                {tx(language, "Ver alcance →")}
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function LessonPage({
  module,
  onComplete,
  saving,
  question,
  setQuestion,
  onAsk,
  tutorResult,
  tutorLoading,
  onOpenReference,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  modulePosition,
  language,
}: {
  module: CourseModule;
  onComplete: () => void;
  saving: boolean;
  question: string;
  setQuestion: (value: string) => void;
  onAsk: () => void;
  tutorResult: TutorResponse | null;
  tutorLoading: boolean;
  onOpenReference: (moduleId: string) => void;
  onPrevious?: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  modulePosition: string;
  language: CourseLanguage;
}) {
  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">
            {language === "en"
              ? `WEEK 0${module.week} · MODULE ${moduleCode(module)} · ${module.minutes / 60} HOURS`
              : `SEMANA 0${module.week} · MÓDULO ${moduleCode(module)} · ${module.minutes / 60} HORAS`}
          </p>
          <h1>{moduleTitle(module)}</h1>
          <p className="muted">{module.tagline}</p>
        </div>
        <span className="week-num">{moduleCode(module)}</span>
      </div>
      <div className="lesson-grid">
        <section className="panel markdown-panel">
          <MarkdownDocument
            markdown={module.markdown}
            onInternalLink={(href) => {
              const id = moduleIdForMarkdownLink(href);
              if (id) onOpenReference(id);
            }}
          />
          <section className="lesson-section">
            <p className="eyebrow">{tx(language, "TU AVANCE")}</p>
            <p>{tx(language, "Este piloto solo guarda si completaste el módulo; no guarda reflexiones.")}</p>
            <div className="button-row">
              <button className="button brand" type="button" onClick={onComplete} disabled={saving || module.completed}>
                {module.completed ? tx(language, "Módulo completado ✓") : tx(language, "Marcar como completado")}
              </button>
            </div>
          </section>
          <nav className="lesson-nav" aria-label={tx(language, "Navegación de módulos")}>
            <button className="button light" type="button" onClick={onPrevious} disabled={!onPrevious}>
              ← {previousLabel}
            </button>
            <span>{modulePosition}</span>
            <button className="button" type="button" onClick={onNext}>
              {nextLabel} →
            </button>
          </nav>
        </section>
        <aside>
          <article className="panel">
            <p className="eyebrow">{tx(language, "TUTOR DE CURRÍCULO")}</p>
            <h2>{tx(language, "Pregunta sobre el curso")}</h2>
            <p className="muted">
              {tx(
                language,
                "Usa el material Markdown como evidencia. El tutor cita la sección utilizada o indica que el curso no basta. En local funciona sin credenciales.",
              )}
            </p>
            <label htmlFor="module-question">{tx(language, "Tu pregunta")}</label>
            <textarea
              id="module-question"
              maxLength={1600}
              rows={3}
              placeholder={tx(language, "¿Qué valida el contrato antes de integrar UI?")}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <div className="button-row">
              <button className="button" type="button" onClick={onAsk} disabled={tutorLoading || !question.trim()}>
                {tutorLoading ? tx(language, "Buscando evidencia…") : tx(language, "Preguntar al tutor")}
              </button>
            </div>
            {tutorResult && (
              <div className="lesson-section" aria-live="polite">
                <strong>
                  {tx(language, "Respuesta · ")}
                  {tutorResult.evidenceStatus === "supported"
                    ? tx(language, "con evidencia")
                    : tx(language, "evidencia insuficiente")}
                </strong>
                <p>{tutorResult.answer}</p>
                <small>
                  {tx(language, "Modo:")}{" "}
                  {tutorResult.provider === "mock"
                    ? tx(language, "mock determinista local")
                    : tx(language, "proveedor configurado")}
                </small>
                {tutorResult.references.length > 0 && (
                  <>
                    <h3>{tx(language, "Referencias")}</h3>
                    <ul>
                      {tutorResult.references.map((reference) => (
                        <li key={`${reference.sourceType}-${reference.id}`}>
                          {reference.moduleId ? (
                            <button
                              className="text-link"
                              type="button"
                              onClick={() => onOpenReference(reference.moduleId ?? "")}
                            >
                              {reference.moduleTitle}
                              {reference.sectionHeading ? ` · ${reference.sectionHeading}` : ""}
                            </button>
                          ) : (
                            `${reference.title} · ${reference.projectId}`
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </article>
          <article className="panel">
            <p className="eyebrow">{tx(language, "MATERIAL DE APOYO")}</p>
            <h3>{tx(language, "Aprendizaje por rol")}</h3>
            <p className="muted">
              {tx(
                language,
                "Producto, web, API y datos tienen tareas propias. QA se comparte; cada integrante usa Codex o Claude desde su rol y revisa los cambios con otra persona.",
              )}
            </p>
            <a href="#roles">{tx(language, "Explorar las guías por rol ↓")}</a>
          </article>
        </aside>
      </div>
    </>
  );
}
function ProjectsPage({ choosePage, language }: { choosePage: (page: Page) => void; language: CourseLanguage }) {
  return (
    <>
      <p className="eyebrow">{tx(language, "PROYECTO FINAL · 3–4 DEVELOPERS")}</p>
      <h1>
        {tx(language, "Tres opciones.")} <span>{tx(language, "Un proyecto por equipo.")}</span>
      </h1>
      <p className="muted">
        {tx(
          language,
          "Cada equipo escoge un proyecto y lo desarrolla durante las cuatro semanas. Todos usan el stack aprobado, datos sintéticos y límites de MVP claros.",
        )}
      </p>
      <p className="muted">
        {tx(
          language,
          "Primero completen el MVP de entrenamiento y su prueba de transferencia. Las funciones siguientes son una ruta posterior; no amplíen el alcance antes de pasar esos controles.",
        )}
      </p>
      <div className="panel">
        <strong>{tx(language, "Stack común requerido")}</strong>
        <p>
          {language === "en"
            ? "React + strict TypeScript; Vike (vike-react) on Vite; Bun + Hono; Drizzle with local SQLite or PostgreSQL; Zod for contracts and schemas; Tailwind; TanStack Query and native fetch. Use Zustand only when Context is not enough. Use the Vercel AI SDK only when an approved feature needs AI. Cloud deployments use the shared SSO gateway."
            : "React + TypeScript estricto; Vike (vike-react) sobre Vite; Bun + Hono; Drizzle con SQLite local o PostgreSQL; Zod para contratos y esquemas; Tailwind; TanStack Query y fetch nativo. Zustand solo si Context no alcanza. Vercel AI SDK se usa cuando el requisito funcional incluye IA, no para añadir IA sin propósito. En nube se integra el gateway SSO compartido."}
        </p>
      </div>
      <section className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.code}>
            <div className="project-meta">
              <span>
                {tx(language, "OPCIÓN")} 0{index + 1}
              </span>
              <span>{language === "en" ? projectEnglish[project.code].shortTitle : project.shortTitle}</span>
            </div>
            <h2>{language === "en" ? projectEnglish[project.code].title : project.title}</h2>
            <p>{language === "en" ? projectEnglish[project.code].summary : project.summary}</p>
            <p>
              <strong>{tx(language, "Persona:")}</strong>{" "}
              {language === "en" ? projectEnglish[project.code].user : project.user}
            </p>
            <p>
              <strong>{tx(language, "Propósito:")}</strong>{" "}
              {language === "en" ? projectEnglish[project.code].purpose : project.purpose}
            </p>
            <h3>{tx(language, "Alcance del MVP de entrenamiento")}</h3>
            <ul>
              {(language === "en" ? projectEnglish[project.code].scope : project.scope).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3>{tx(language, "Criterios para la demo")}</h3>
            <ul>
              {(language === "en" ? projectEnglish[project.code].acceptance : project.acceptance).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3>{tx(language, "Siguiente después del MVP")}</h3>
            <ul>
              {(language === "en"
                ? projectEnglish[project.code].optionalExtensions
                : project.optionalExtensions
              ).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3>{tx(language, "Fuera del MVP de cuatro semanas")}</h3>
            <ul>
              {(language === "en" ? projectEnglish[project.code].exclusions : project.exclusions).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="project-actions">
              <a
                className="button light"
                href={language === "en" ? project.briefEn : project.brief}
                download={language === "en" ? project.downloadNameEn : project.downloadName}
              >
                {tx(language, "Descargar brief completo ↘")}
              </a>
              <button className="button" type="button" onClick={() => choosePage("groups")}>
                {tx(language, "Asignar a grupo →")}
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function GroupsPage({
  groups,
  groupsLoading,
  selectedGroup,
  selectedGroupId,
  selectGroup,
  newGroup,
  setNewGroup,
  onCreateGroup,
  onDeleteGroup,
  newMember,
  setNewMember,
  memberRole,
  setMemberRole,
  onAddMember,
  onRemoveMember,
  onChooseProject,
  language,
}: {
  groups: TrainingGroup[];
  groupsLoading: boolean;
  selectedGroup: TrainingGroup | null;
  selectedGroupId: number | null;
  selectGroup: (id: number) => void;
  newGroup: string;
  setNewGroup: (value: string) => void;
  onCreateGroup: (event: FormEvent<HTMLFormElement>) => void;
  onDeleteGroup: (id: number) => void;
  newMember: string;
  setNewMember: (value: string) => void;
  memberRole: RoleKey;
  setMemberRole: (role: RoleKey) => void;
  onAddMember: (event: FormEvent<HTMLFormElement>) => void;
  onRemoveMember: (id: number) => void;
  onChooseProject: (code: ProjectCode | null) => void;
  language: CourseLanguage;
}) {
  return (
    <>
      <p className="eyebrow">{tx(language, "ORGANIZACIÓN DE LA PRÁCTICA")}</p>
      <h1>{tx(language, "Grupos y roles.")}</h1>
      <p className="muted">
        {tx(
          language,
          "Forma un equipo de 3–4 personas y elige un proyecto. Quien crea el grupo puede eliminarlo. El email del piloto no se verifica.",
        )}
      </p>
      <div className="group-layout">
        <section>
          <div className="panel">
            <h3>{tx(language, "Crear grupo")}</h3>
            <form className="form-row" onSubmit={onCreateGroup}>
              <input
                aria-label={tx(language, "Nombre del grupo")}
                maxLength={100}
                placeholder={tx(language, "Nombre del grupo")}
                value={newGroup}
                onChange={(event) => setNewGroup(event.target.value)}
              />
              <button className="button" type="submit">
                {tx(language, "Crear")}
              </button>
            </form>
          </div>
          <div className="panel">
            <h3>{tx(language, "Equipos")}</h3>
            {groupsLoading && <p>{tx(language, "Cargando grupos…")}</p>}
            {groups.map((group) => (
              <button
                type="button"
                className={`group-list-button ${group.id === selectedGroupId ? "active" : ""}`}
                key={group.id}
                onClick={() => selectGroup(group.id)}
              >
                {group.name}
                <small>
                  {group.members.length} {tx(language, "de")} 4 {tx(language, "developers")}
                </small>
              </button>
            ))}
            {!groupsLoading && groups.length === 0 && (
              <div className="empty">{tx(language, "Todavía no hay grupos.")}</div>
            )}
          </div>
        </section>
        {selectedGroup ? (
          <section className="panel">
            <p className="eyebrow">{tx(language, "GRUPO SELECCIONADO")}</p>
            <h2>{selectedGroup.name}</h2>
            {selectedGroup.canDelete ? (
              <button className="button danger" type="button" onClick={() => onDeleteGroup(selectedGroup.id)}>
                {tx(language, "Eliminar grupo e integrantes")}
              </button>
            ) : selectedGroup.hasCreator ? (
              <p className="muted">{tx(language, "Solo quien creó este grupo puede eliminarlo.")}</p>
            ) : (
              <p className="muted">
                {tx(language, "Este grupo no tiene un creador registrado y no se puede eliminar aquí.")}
              </p>
            )}
            <h3>{tx(language, "Proyecto elegido")}</h3>
            <select
              aria-label={tx(language, "Proyecto del grupo")}
              value={selectedGroup.projectCode ?? ""}
              onChange={(event) => onChooseProject((event.target.value || null) as ProjectCode | null)}
            >
              <option value="">{tx(language, "Sin proyecto elegido")}</option>
              {projects.map((project) => (
                <option key={project.code} value={project.code}>
                  {language === "en" ? projectEnglish[project.code].title : project.title}
                </option>
              ))}
            </select>
            <p className="muted">{tx(language, "La selección se guarda en la base local del training site.")}</p>
            <h3>{tx(language, "Integrantes")}</h3>
            {selectedGroup.members.map((member) => (
              <div className="member-row" key={member.id}>
                <span>
                  {member.name}
                  <small>{roleLabel(member.role, language)}</small>
                </span>
                <button
                  className="button danger"
                  type="button"
                  aria-label={language === "en" ? `Remove ${member.name}` : `Quitar a ${member.name}`}
                  onClick={() => onRemoveMember(member.id)}
                >
                  {tx(language, "Quitar")}
                </button>
              </div>
            ))}
            {selectedGroup.members.length < 4 ? (
              <form className="form-row" onSubmit={onAddMember}>
                <input
                  aria-label={tx(language, "Nombre del developer")}
                  maxLength={160}
                  placeholder={tx(language, "Nombre del developer")}
                  value={newMember}
                  onChange={(event) => setNewMember(event.target.value)}
                />
                <select
                  aria-label={tx(language, "Rol del developer")}
                  value={memberRole}
                  onChange={(event) => setMemberRole(event.target.value as RoleKey)}
                >
                  {localizedRoles(language).map((item) => (
                    <option key={item.key} value={item.key}>
                      {tx(language, item.label)}
                    </option>
                  ))}
                </select>
                <button className="button" type="submit">
                  {tx(language, "Agregar")}
                </button>
              </form>
            ) : (
              <p className="muted">
                {tx(
                  language,
                  "El grupo llegó al máximo de cuatro developers. Combinen roles si el equipo tiene tres personas.",
                )}
              </p>
            )}
          </section>
        ) : (
          <section className="panel empty">
            {tx(language, "Crea un grupo para asignar integrantes y proyecto.")}
          </section>
        )}
      </div>
    </>
  );
}

function SkillsPage({ language }: { language: CourseLanguage }) {
  const teamSkills = localizedTeamSkills(language);
  const roleSkills = localizedRoleSkills(language);
  return (
    <>
      <p className="eyebrow">{tx(language, "MATERIAL DE APOYO · OPCIONAL")}</p>
      <h1>
        {tx(language, "Guías de trabajo ")}
        <span>{tx(language, "por rol.")}</span>
      </h1>
      <p className="muted">
        {tx(
          language,
          "Úsalas cuando ayuden a una tarea. No son requisitos del curso: el ticket, las reglas del repositorio, los contratos y la revisión humana definen el trabajo.",
        )}
      </p>
      <a
        className="button light"
        href={language === "en" ? "/skills-base-y-prompts.en.md" : "/skills-base-y-prompts.md"}
        download={language === "en" ? "skills-and-prompts.md" : "skills-base-y-prompts.md"}
      >
        {tx(language, "Descargar guía de referencia ↘")}
      </a>
      <section className="panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">{tx(language, "CONTROLES QUE EL SITIO ENSEÑA")}</p>
            <h2>{tx(language, "Preparar el repositorio en la semana 1")}</h2>
          </div>
        </div>
        <ul>
          <li>
            <strong>{tx(language, "Monorepo:")}</strong>{" "}
            {tx(
              language,
              "instrucciones canónicas, mapa claro para el agente y estructura que refleje las aplicaciones reales.",
            )}
          </li>
          <li>
            <strong>{tx(language, "Documentación y planificación primero:")}</strong>{" "}
            {tx(
              language,
              "documentos Markdown revisados por PR; cada funcionalidad tiene un plan aprobado antes del código.",
            )}
          </li>
          <li>
            <strong>{tx(language, "Integración automática (CI) por PR:")}</strong>{" "}
            {tx(
              language,
              "cada equipo acuerda análisis de estilo (lint), pruebas pertinentes y compilación, y exige CI verde mediante protección de rama. Este sitio hoy comprueba los tipos de web y API y compila la web; todavía no ejecuta lint ni pruebas automáticas.",
            )}
          </li>
          <li>
            <strong>{tx(language, "Seguridad en Git:")}</strong>{" "}
            {tx(
              language,
              "verifica en GitHub que main esté protegida, que los PR y una revisión sean requeridos, y que no se suban secretos.",
            )}
          </li>
          <li>
            <strong>{tx(language, "Calidad:")}</strong>{" "}
            {tx(language, "revisión entre roles; quien integra debe poder explicar el cambio y la evidencia.")}
          </li>
        </ul>
      </section>
      <div className="section-head">
        <div>
          <p className="eyebrow">{tx(language, "PAQUETE DE REFERENCIA")}</p>
          <h2>{tx(language, "Rutinas para cualquier rol")}</h2>
        </div>
      </div>
      <section className="skill-grid">
        {teamSkills.map(([title, purpose], index) => (
          <article className="skill-card" key={title}>
            <div className="project-meta">
              <span>
                {tx(language, "RUTINA")} 0{index + 1}
              </span>
              <span>{tx(language, "GENERAL")}</span>
            </div>
            <h3>{title}</h3>
            <p>{purpose}</p>
            <details>
              <summary>{tx(language, "Ver cómo aplicarla")}</summary>
              <p>
                {tx(
                  language,
                  "Lee AGENTS.md, el ticket y el plan aprobado; confirma criterios, entradas y límites. Produce un resultado revisable y declara qué comprobaste.",
                )}
              </p>
            </details>
          </article>
        ))}
      </section>
      <div className="section-head" id="roles">
        <div>
          <p className="eyebrow">{tx(language, "CONTROLES ÚTILES POR ROL")}</p>
          <h2>{tx(language, "Adáptalos al stack del proyecto")}</h2>
        </div>
      </div>
      <section className="skill-grid">
        {roleSkills.map((item) => (
          <article className="skill-card" key={item.title}>
            <div className="tag">{item.role}</div>
            <h3>{item.title}</h3>
            <p>{item.stack}</p>
            <details>
              <summary>{tx(language, "Lista de revisión")}</summary>
              <ul>
                <li>{tx(language, "Empieza leyendo instrucciones, contrato y plan aprobado.")}</li>
                <li>{tx(language, "Valida supuestos, escenarios de error y efecto sobre otras capas.")}</li>
                <li>{tx(language, "Comprueba el diff y registra evidencia real.")}</li>
                <li>{tx(language, "Deja decisiones de alcance a una persona.")}</li>
              </ul>
            </details>
          </article>
        ))}
      </section>
      <div className="panel">
        <strong>{tx(language, "Stack aprobado del programa")}</strong>
        <p>
          {language === "en"
            ? "React + strict TypeScript with Vike; Bun + Hono; Drizzle on local SQLite or cloud PostgreSQL; Vercel AI SDK only when the feature uses AI; Zod for validating input and tools; Tailwind; TanStack Query and native fetch. Use Zustand only when Context is not enough. Cloud deployments use the shared SSO gateway."
            : "React + TypeScript estricto con Vike; Bun + Hono; Drizzle sobre SQLite local o PostgreSQL en nube; Vercel AI SDK si la funcionalidad usa IA; Zod para validar entradas y herramientas; Tailwind; TanStack Query y fetch nativo. Zustand solo cuando Context no alcance. SSO por el gateway compartido en despliegues en nube."}
        </p>
      </div>
    </>
  );
}

function PromptsPage({
  role,
  setRole,
  search,
  setSearch,
  items,
  copyText,
  language,
}: {
  role: RoleKey;
  setRole: (role: RoleKey) => void;
  search: string;
  setSearch: (value: string) => void;
  items: PromptItem[];
  copyText: (value: string, label: string) => Promise<void>;
  language: CourseLanguage;
}) {
  const roleItems = items.filter((item) => item.role === "General" || item.role === roleLabel(role, language));
  return (
    <>
      <p className="eyebrow">{tx(language, "AYUDA PARA TAREAS CONCRETAS")}</p>
      <h1>
        Prompts <span>{tx(language, "opcionales.")}</span>
      </h1>
      <p className="muted">
        {tx(
          language,
          "El repositorio, los criterios, el plan aprobado y las políticas del equipo siguen siendo la fuente de verdad.",
        )}
      </p>
      <div className="button-row">
        <label className="role-select">
          <span>{tx(language, "Rol")}</span>
          <select value={role} onChange={(event) => setRole(event.target.value as RoleKey)}>
            {localizedRoles(language).map((item) => (
              <option value={item.key} key={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="role-select">
          <span>{tx(language, "Buscar")}</span>
          <input
            placeholder={tx(language, "Tarea o palabra")}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>
      <section className="prompt-grid">
        {roleItems.map((item) => (
          <article className="prompt-card" key={item.code}>
            <div className="project-meta">
              <span>{item.code}</span>
              <span>{item.audience}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.role}</p>
            <pre>{item.body}</pre>
            <button className="button light" type="button" onClick={() => void copyText(item.body, item.title)}>
              {tx(language, "Copiar prompt ↗")}
            </button>
          </article>
        ))}
        {roleItems.length === 0 && (
          <div className="empty">{tx(language, "No hay prompts que coincidan con la búsqueda.")}</div>
        )}
      </section>
      <div className="panel">
        <strong>{tx(language, "Privacidad")}</strong>
        <p>
          {tx(
            language,
            "No pegues secretos, credenciales, datos personales ni información de clientes. Sigue la política de datos y las reglas del repositorio.",
          )}
        </p>
      </div>
    </>
  );
}

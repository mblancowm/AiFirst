import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentSession } from "./adminApi";
import { LearningInterestsFooter } from "./LearningInterestsFooter";

export function AppShell({ children, activePage }: { children: ReactNode; activePage: "home" | "route" | "skills" | "participants" | "admin" | "codex" }) {
  const [currentHash, setCurrentHash] = useState("");
  const sessionQuery = useQuery({ queryKey: ["auth", "me"], queryFn: fetchCurrentSession });

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isRouteActive = activePage === "route" || (activePage === "home" && currentHash === "#fases");
  const isSkillsActive = activePage === "skills" || (activePage === "home" && currentHash === "#skills-title");
  const isArchitectureActive = activePage === "home" && currentHash === "#architecture-title";
  const frontendBasePath = (import.meta.env.VITE_APP_FRONTEND_PATH ?? "/").replace(/\/$/, "");
  const adminHref = `${frontendBasePath}/admin/`;
  const participantsHref = `${frontendBasePath}/participantes/`;
  const codexHref = `${frontendBasePath}/ai-tools/codex/`;

  return (
    <div className="app-frame">
      <header className="site-header mx-auto flex max-w-7xl items-center justify-between">
        <a className="brand-lockup" href="/" aria-label="AI-First Learning Lab, inicio">
          <img
            className="brand-logo"
            src="/assets/logo/wm_h_pos_clr_rgb_august2024.svg"
            alt="West Monroe"
          />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-name">
            <strong>AI-FIRST</strong>
            <small>LEARNING LAB</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="/" aria-current={activePage === "home" && !isRouteActive && !isSkillsActive && !isArchitectureActive ? "page" : undefined}>
            Programa
          </a>
          <a href="/#fases" aria-current={isRouteActive ? "page" : undefined}>
            Ruta
          </a>
          <a href="/#skills-title" aria-current={isSkillsActive ? "page" : undefined}>
            Skills
          </a>
          <a href="/#architecture-title" aria-current={isArchitectureActive ? "page" : undefined}>Arquitectura</a>
          <a href={participantsHref} aria-current={activePage === "participants" ? "page" : undefined}>
            Participantes
          </a>
          {sessionQuery.data?.isAdmin && (
            <a href={adminHref} aria-current={activePage === "admin" ? "page" : undefined}>Admin</a>
          )}
          <details className={`nav-dropdown${activePage === "codex" ? " is-active" : ""}`} open={activePage === "codex"}>
            <summary className="nav-dropdown-trigger">
              AI Tools
              <span className="nav-caret" aria-hidden="true" />
            </summary>
            <div className="nav-dropdown-menu">
              <a href={codexHref} aria-current={activePage === "codex" ? "page" : undefined}>Codex</a>
            </div>
          </details>
        </nav>
      </header>
      {children}
      {activePage === "home" && <LearningInterestsFooter />}
    </div>
  );
}

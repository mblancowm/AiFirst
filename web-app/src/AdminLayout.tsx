import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "./AppShell";
import { fetchCurrentSession } from "./adminApi";
import { adminPath } from "./adminPaths";

interface AdminLayoutProps {
  eyebrow?: string;
  title: string;
  description: string;
  activeSection: "overview" | "participants" | "teams";
  children: ReactNode;
}

export function AdminLayout({ eyebrow = "ADMINISTRACIÓN DEL PROGRAMA", title, description, activeSection, children }: AdminLayoutProps) {
  const sessionQuery = useQuery({ queryKey: ["auth", "me"], queryFn: fetchCurrentSession });

  if (sessionQuery.isPending) {
    return <AppShell activePage="admin"><main className="admin-page page-content"><p>Validando acceso…</p></main></AppShell>;
  }

  if (sessionQuery.isError || !sessionQuery.data?.isAdmin) {
    return (
      <AppShell activePage="admin">
        <main className="admin-page page-content">
          <p className="eyebrow">ADMINISTRACIÓN</p>
          <h1>{sessionQuery.isError ? "No se pudo validar el acceso." : "Acceso restringido."}</h1>
          <p className="admin-intro">
            {sessionQuery.isError
              ? sessionQuery.error.message
              : "Esta sección está disponible solo para las personas administradoras del programa."}
          </p>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell activePage="admin">
      <main className="admin-page page-content">
        <header className="admin-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="admin-intro">{description}</p>
          </div>
          {sessionQuery.data.email && <span className="admin-user">{sessionQuery.data.email}</span>}
        </header>

        {sessionQuery.data.isLocalMode && (
          <p className="admin-local-notice" role="status">Modo local: cualquier persona puede administrar estos datos.</p>
        )}

        <nav className="admin-subnav" aria-label="Secciones de administración">
          <a href={adminPath()} aria-current={activeSection === "overview" ? "page" : undefined}>Resumen</a>
          <a href={adminPath("participants")} aria-current={activeSection === "participants" ? "page" : undefined}>Participantes</a>
          <a href={adminPath("teams")} aria-current={activeSection === "teams" ? "page" : undefined}>Equipos</a>
        </nav>

        {children}
      </main>
    </AppShell>
  );
}

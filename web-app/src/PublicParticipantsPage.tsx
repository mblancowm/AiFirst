import { useQuery } from "@tanstack/react-query";
import { AppShell } from "./AppShell";
import { fetchPublicTeams } from "./publicApi";

export function PublicParticipantsPage() {
  const teamsQuery = useQuery({ queryKey: ["public", "teams"], queryFn: fetchPublicTeams, staleTime: 60_000 });
  const teams = teamsQuery.data ?? [];

  return (
    <AppShell activePage="participants">
      <main className="public-participants-page page-content">
        <header className="public-participants-heading">
          <p className="eyebrow">COMUNIDAD AI-FIRST</p>
          <h1>Participantes y equipos.</h1>
          <p>Conoce a las personas que recorren el programa en equipo.</p>
        </header>

        {teamsQuery.isPending && <p className="public-participants-status">Cargando equipos…</p>}
        {teamsQuery.isError && <p className="public-participants-status" role="alert">{teamsQuery.error.message}</p>}
        {!teamsQuery.isPending && !teamsQuery.isError && teams.length === 0 && (
          <p className="public-participants-status">Los equipos aparecerán aquí cuando estén registrados.</p>
        )}

        {teams.length > 0 && (
          <section className="public-team-grid" aria-label="Grupos del programa">
            {teams.map((team, index) => (
              <article className="public-team-card" key={team.id}>
                <div className="public-team-card-top">
                  <span className="public-team-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="public-team-size">{team.participants.length} {team.participants.length === 1 ? "persona" : "personas"}</span>
                </div>
                <h2>{team.name}</h2>
                <ul>
                  {team.participants.map((participant) => <li key={participant.id}>{participant.name}</li>)}
                  {team.participants.length === 0 && <li className="public-team-empty">Integrantes por definir</li>}
                </ul>
                {team.mentor && (
                  <p className="public-team-mentor">
                    <span>{team.participants.some((participant) => participant.id === team.mentor?.id) ? "MENTOR · INTEGRANTE" : "MENTOR"}</span>
                    {team.mentor.name}
                  </p>
                )}
              </article>
            ))}
          </section>
        )}
      </main>
    </AppShell>
  );
}

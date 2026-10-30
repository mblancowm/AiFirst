import type { PublicTeam } from "./publicTypes";

const API_BASE_PATH = (import.meta.env.VITE_APP_BACKEND_PATH ?? "/api").replace(/\/$/, "");

export async function fetchPublicTeams(): Promise<PublicTeam[]> {
  const response = await fetch(`${API_BASE_PATH}/public/teams`, { credentials: "include" });
  if (!response.ok) throw new Error(`No se pudieron cargar los equipos (${response.status}).`);
  return (await response.json()) as PublicTeam[];
}

import type { CurrentSession, Participant, ParticipantInput, Team, TeamInput } from "./adminTypes";

const API_BASE_PATH = (import.meta.env.VITE_APP_BACKEND_PATH ?? "/api").replace(/\/$/, "");

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload: unknown = await response.json();
    if (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string") {
      return payload.error;
    }
  } catch {
    // A non-JSON response is reported with its HTTP status below.
  }
  return `La solicitud falló (${response.status}).`;
};

const requireSuccess = async (response: Response): Promise<Response> => {
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response;
};

export const fetchCurrentSession = async (): Promise<CurrentSession> => {
  const response = await fetch(`${API_BASE_PATH}/auth/me`, { credentials: "include" });
  return (await requireSuccess(response).then((result) => result.json())) as CurrentSession;
};

export const fetchParticipants = async (): Promise<Participant[]> => {
  const response = await fetch(`${API_BASE_PATH}/admin/participants`, { credentials: "include" });
  return (await requireSuccess(response).then((result) => result.json())) as Participant[];
};

export const fetchTeams = async (): Promise<Team[]> => {
  const response = await fetch(`${API_BASE_PATH}/admin/teams`, { credentials: "include" });
  return (await requireSuccess(response).then((result) => result.json())) as Team[];
};

export const createParticipant = async (input: ParticipantInput): Promise<Participant> => {
  const response = await fetch(`${API_BASE_PATH}/admin/participants`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return (await requireSuccess(response).then((result) => result.json())) as Participant;
};

export const updateParticipant = async (id: number, input: ParticipantInput): Promise<Participant> => {
  const response = await fetch(`${API_BASE_PATH}/admin/participants/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return (await requireSuccess(response).then((result) => result.json())) as Participant;
};

export const deleteParticipant = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_PATH}/admin/participants/${id}`, { method: "DELETE", credentials: "include" });
  await requireSuccess(response);
};

export const createTeam = async (input: TeamInput): Promise<Team> => {
  const response = await fetch(`${API_BASE_PATH}/admin/teams`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return (await requireSuccess(response).then((result) => result.json())) as Team;
};

export const updateTeam = async (id: number, input: TeamInput): Promise<Team> => {
  const response = await fetch(`${API_BASE_PATH}/admin/teams/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return (await requireSuccess(response).then((result) => result.json())) as Team;
};

export const deleteTeam = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_PATH}/admin/teams/${id}`, { method: "DELETE", credentials: "include" });
  await requireSuccess(response);
};

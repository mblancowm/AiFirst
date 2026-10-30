import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { AdminLayout } from "./AdminLayout";
import { createTeam, deleteTeam, fetchCurrentSession, fetchParticipants, fetchTeams, updateTeam } from "./adminApi";
import type { Participant, Team, TeamInput } from "./adminTypes";

const EMPTY_TEAM: TeamInput = { name: "", participantIds: [], mentorId: null };

export function AdminTeamsPage() {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({ queryKey: ["auth", "me"], queryFn: fetchCurrentSession });
  const participantsQuery = useQuery({ queryKey: ["admin", "participants"], queryFn: fetchParticipants, enabled: sessionQuery.data?.isAdmin === true });
  const teamsQuery = useQuery({ queryKey: ["admin", "teams"], queryFn: fetchTeams, enabled: sessionQuery.data?.isAdmin === true });
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<TeamInput>(EMPTY_TEAM);
  const [searchText, setSearchText] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const refreshData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin", "participants"] }),
      queryClient.invalidateQueries({ queryKey: ["admin", "teams"] }),
    ]);
  };
  const saveMutation = useMutation({
    mutationFn: ({ id, input }: { id: number | null; input: TeamInput }) => id === null ? createTeam(input) : updateTeam(id, input),
    onSuccess: async () => {
      setDraft(EMPTY_TEAM);
      setEditingId(null);
      setFormOpen(false);
      setSearchText("");
      setSuggestionsOpen(false);
      setFeedback("Equipo guardado.");
      await refreshData();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: async () => {
      setFeedback("Equipo eliminado. Sus integrantes están disponibles para otros equipos.");
      await refreshData();
    },
  });

  const participants = participantsQuery.data ?? [];
  const teams = teamsQuery.data ?? [];
  const selectedParticipants = draft.participantIds
    .map((id) => participants.find((participant) => participant.id === id))
    .filter((participant): participant is Participant => participant !== undefined);
  const normalizedSearch = searchText.trim().toLocaleLowerCase();
  const matchingParticipants = normalizedSearch
    ? participants.filter((participant) => `${participant.name} ${participant.email ?? ""}`.toLocaleLowerCase().includes(normalizedSearch))
    : [];
  const errorMessage = saveMutation.error?.message ?? deleteMutation.error?.message ?? participantsQuery.error?.message ?? teamsQuery.error?.message;

  const toggleCreateForm = () => {
    if (formOpen && editingId === null) {
      setFormOpen(false);
      setDraft(EMPTY_TEAM);
    } else {
      setFormOpen(true);
      setEditingId(null);
      setDraft(EMPTY_TEAM);
    }
    setSearchText("");
    setSuggestionsOpen(false);
    setFeedback("");
  };

  const editTeam = (team: Team) => {
    setEditingId(team.id);
    setDraft({ name: team.name, participantIds: team.participants.map((participant) => participant.id), mentorId: team.mentorId });
    setFormOpen(true);
    setSearchText("");
    setSuggestionsOpen(false);
    setFeedback("");
  };

  const cancelForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setDraft(EMPTY_TEAM);
    setSearchText("");
    setSuggestionsOpen(false);
  };

  const addParticipant = (participantId: number) => {
    setDraft((current) => {
      if (current.participantIds.includes(participantId) || current.participantIds.length >= 4) return current;
      return { ...current, participantIds: [...current.participantIds, participantId] };
    });
    setSearchText("");
    setSuggestionsOpen(false);
  };

  const removeParticipant = (participantId: number) => {
    setDraft((current) => ({ ...current, participantIds: current.participantIds.filter((id) => id !== participantId) }));
  };

  const selectMentor = (mentorId: number | null) => {
    setDraft((current) => ({ ...current, mentorId }));
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setSuggestionsOpen(false);
    if (event.key === "Enter") {
      event.preventDefault();
      if (matchingParticipants.length !== 1) return;
      const [participant] = matchingParticipants;
      const alreadyAssignedElsewhere = participant.team !== null && participant.team.id !== editingId;
      const alreadySelected = draft.participantIds.includes(participant.id);
      if (!alreadyAssignedElsewhere && !alreadySelected && draft.participantIds.length < 4) {
        addParticipant(participant.id);
      }
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    saveMutation.mutate({ id: editingId, input: draft });
  };

  return (
    <AdminLayout
      activeSection="teams"
      description="Organiza grupos de hasta cuatro personas. Una persona puede ser integrante y mentora, o acompañar varios grupos."
      title="Equipos."
    >
      <section className="admin-list-section" aria-labelledby="teams-title">
        <div className="admin-list-heading">
          <div>
            <p className="eyebrow">COLABORACIÓN</p>
            <h2 id="teams-title">Todos los equipos</h2>
            <p>{teams.length} {teams.length === 1 ? "equipo registrado" : "equipos registrados"}</p>
          </div>
          <button className="admin-primary-button" onClick={toggleCreateForm} type="button">
            {formOpen && editingId === null ? "Cerrar formulario" : "Crear equipo"}
          </button>
        </div>

        {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
        {errorMessage && <p className="admin-error" role="alert">{errorMessage}</p>}

        {formOpen && (
          <form className="admin-form admin-expanded-form" onSubmit={submit}>
            <div className="admin-form-title">
              <h3>{editingId === null ? "Nuevo equipo" : "Editar equipo"}</h3>
              <button className="admin-text-button" onClick={cancelForm} type="button">Cancelar</button>
            </div>
            <label htmlFor="team-name">Nombre del equipo
              <input id="team-name" maxLength={100} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} required value={draft.name} />
            </label>
            <div className="admin-search-field">
              <label htmlFor="participant-search">Buscar integrantes <span>Agrega hasta cuatro personas</span></label>
              <div className="admin-search-control">
                <input
                  id="participant-search"
                  aria-autocomplete="list"
                  aria-controls="participant-suggestions"
                  aria-expanded={suggestionsOpen && normalizedSearch.length > 0}
                  autoComplete="off"
                  onChange={(event) => { setSearchText(event.target.value); setSuggestionsOpen(true); }}
                  onFocus={() => { if (normalizedSearch) setSuggestionsOpen(true); }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Escribe un nombre o email"
                  role="combobox"
                  value={searchText}
                />
                {suggestionsOpen && normalizedSearch && (
                  <div className="admin-suggestions" id="participant-suggestions" role="listbox" aria-label="Personas encontradas">
                    {matchingParticipants.map((participant) => {
                      const isSelected = draft.participantIds.includes(participant.id);
                      const belongsToAnotherTeam = participant.team !== null && participant.team.id !== editingId;
                      const atLimit = draft.participantIds.length >= 4 && !isSelected;
                      const unavailable = isSelected || belongsToAnotherTeam || atLimit;
                      const reason = isSelected ? "Agregado" : belongsToAnotherTeam ? `En ${participant.team?.name}` : atLimit ? "Máximo 4" : "Agregar";
                      return (
                        <button
                          aria-disabled={unavailable}
                          aria-selected={isSelected}
                          className="admin-suggestion"
                          disabled={unavailable}
                          key={participant.id}
                          onClick={() => addParticipant(participant.id)}
                          role="option"
                          type="button"
                        >
                          <span><strong>{participant.name}</strong>{participant.email && <small>{participant.email}</small>}</span>
                          <small>{reason}</small>
                        </button>
                      );
                    })}
                    {!matchingParticipants.length && <p className="admin-suggestion-empty">No se encontraron personas con ese texto.</p>}
                  </div>
                )}
              </div>
              <p className="admin-search-hint">Las personas que ya están en otro equipo aparecen deshabilitadas.</p>
            </div>

            <fieldset className="admin-selected-members">
              <legend>Integrantes <span>{draft.participantIds.length} / 4</span></legend>
              {selectedParticipants.length ? (
                <ul>
                  {selectedParticipants.map((participant) => (
                    <li key={participant.id}>
                      <span>{participant.name}</span>
                      <button aria-label={`Quitar a ${participant.name} del equipo`} className="admin-remove-member" onClick={() => removeParticipant(participant.id)} type="button">Quitar</button>
                    </li>
                  ))}
                </ul>
              ) : <p>Aún no agregas integrantes.</p>}
            </fieldset>

            <label htmlFor="team-mentor">Mentor <span>Puede integrar este equipo y acompañar varios grupos</span>
              <select id="team-mentor" onChange={(event) => selectMentor(event.target.value ? Number(event.target.value) : null)} value={draft.mentorId ?? ""}>
                <option value="">Sin mentor</option>
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.id}>{participant.name}{participant.email ? ` · ${participant.email}` : ""}</option>
                ))}
              </select>
            </label>
            <div className="admin-form-actions">
              <button className="admin-primary-button" disabled={saveMutation.isPending} type="submit">
                {saveMutation.isPending ? "Guardando…" : editingId === null ? "Crear equipo" : "Guardar cambios"}
              </button>
            </div>
          </form>
        )}

        {teamsQuery.isPending || participantsQuery.isPending ? <p className="admin-loading">Cargando equipos…</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th scope="col">Equipo</th><th scope="col">Integrantes</th><th scope="col">Mentor</th><th scope="col"><span className="sr-only">Acciones</span></th></tr></thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td data-label="Equipo"><strong>{team.name}</strong></td>
                    <td data-label="Integrantes">
                      <span>{team.participants.length ? team.participants.map((participant) => participant.name).join(" · ") : "Sin integrantes"}</span>
                      <small className="admin-table-note">{team.participants.length} / 4 personas</small>
                    </td>
                    <td data-label="Mentor">{team.mentor?.name ?? "Sin mentor"}</td>
                    <td data-label="Acciones">
                      <div className="admin-record-actions">
                        <button className="admin-text-button" onClick={() => editTeam(team)} type="button">Modificar</button>
                        <button className="admin-danger-button" onClick={() => {
                          if (window.confirm(`¿Eliminar el equipo ${team.name}? Sus participantes quedarán disponibles para otros equipos.`)) deleteMutation.mutate(team.id);
                        }} type="button">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!teams.length && !teamsQuery.isPending && <tr><td className="admin-empty-cell" colSpan={4}>Todavía no hay equipos registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

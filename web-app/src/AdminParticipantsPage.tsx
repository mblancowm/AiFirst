import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { AdminLayout } from "./AdminLayout";
import { createParticipant, deleteParticipant, fetchCurrentSession, fetchParticipants, updateParticipant } from "./adminApi";
import type { Participant, ParticipantInput } from "./adminTypes";

const EMPTY_PARTICIPANT: ParticipantInput = { name: "", email: "" };

export function AdminParticipantsPage() {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({ queryKey: ["auth", "me"], queryFn: fetchCurrentSession });
  const participantsQuery = useQuery({ queryKey: ["admin", "participants"], queryFn: fetchParticipants, enabled: sessionQuery.data?.isAdmin === true });
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<ParticipantInput>(EMPTY_PARTICIPANT);
  const [searchText, setSearchText] = useState("");
  const [feedback, setFeedback] = useState("");

  const refreshData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin", "participants"] }),
      queryClient.invalidateQueries({ queryKey: ["admin", "teams"] }),
    ]);
  };
  const saveMutation = useMutation({
    mutationFn: ({ id, input }: { id: number | null; input: ParticipantInput }) => id === null ? createParticipant(input) : updateParticipant(id, input),
    onSuccess: async () => {
      setDraft(EMPTY_PARTICIPANT);
      setEditingId(null);
      setFormOpen(false);
      setFeedback("Participante guardado.");
      await refreshData();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: async () => {
      setFeedback("Participante eliminado.");
      await refreshData();
    },
  });

  const toggleCreateForm = () => {
    if (formOpen && editingId === null) {
      setFormOpen(false);
      setDraft(EMPTY_PARTICIPANT);
    } else {
      setFormOpen(true);
      setEditingId(null);
      setDraft(EMPTY_PARTICIPANT);
    }
    setFeedback("");
  };

  const editParticipant = (participant: Participant) => {
    setEditingId(participant.id);
    setDraft({ name: participant.name, email: participant.email ?? "" });
    setFormOpen(true);
    setFeedback("");
  };

  const cancelForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setDraft(EMPTY_PARTICIPANT);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    if (duplicateEmailParticipant) return;
    saveMutation.mutate({ id: editingId, input: draft });
  };

  const participants = participantsQuery.data ?? [];
  const normalizedSearch = searchText.trim().toLocaleLowerCase();
  const filteredParticipants = normalizedSearch
    ? participants.filter((participant) => `${participant.name} ${participant.email ?? ""} ${participant.team?.name ?? ""}`.toLocaleLowerCase().includes(normalizedSearch))
    : participants;
  const normalizedDraftEmail = draft.email.trim().toLowerCase();
  const duplicateEmailParticipant = normalizedDraftEmail
    ? participants.find((participant) => participant.id !== editingId && participant.email?.trim().toLowerCase() === normalizedDraftEmail)
    : undefined;
  const errorMessage = saveMutation.error?.message ?? deleteMutation.error?.message ?? participantsQuery.error?.message;

  return (
    <AdminLayout
      activeSection="participants"
      description="Consulta y actualiza el registro de todas las personas del programa."
      title="Participantes."
    >
      <section className="admin-list-section" aria-labelledby="participants-title">
        <div className="admin-list-heading">
          <div>
            <p className="eyebrow">PERSONAS</p>
            <h2 id="participants-title">Todos los participantes</h2>
            <p>{participants.length} {participants.length === 1 ? "persona registrada" : "personas registradas"}</p>
          </div>
          <button className="admin-primary-button" onClick={toggleCreateForm} type="button">
            {formOpen && editingId === null ? "Cerrar formulario" : "Crear participante"}
          </button>
        </div>

        {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
        {errorMessage && <p className="admin-error" role="alert">{errorMessage}</p>}

        {formOpen && (
          <form className="admin-form admin-expanded-form" onSubmit={submit}>
            <div className="admin-form-title">
              <h3>{editingId === null ? "Nuevo participante" : "Editar participante"}</h3>
              <button className="admin-text-button" onClick={cancelForm} type="button">Cancelar</button>
            </div>
            <div className="admin-form-fields">
              <label htmlFor="participant-name">Nombre
                <input id="participant-name" autoComplete="name" maxLength={100} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} required value={draft.name} />
              </label>
              <label htmlFor="participant-email">Email <span>(opcional)</span>
                <input
                  id="participant-email"
                  aria-describedby={duplicateEmailParticipant ? "participant-email-error" : undefined}
                  aria-invalid={duplicateEmailParticipant ? true : undefined}
                  autoComplete="email"
                  maxLength={254}
                  onChange={(event) => {
                    saveMutation.reset();
                    setDraft((current) => ({ ...current, email: event.target.value }));
                  }}
                  type="email"
                  value={draft.email}
                />
                {duplicateEmailParticipant && <small className="admin-email-error" id="participant-email-error" role="alert">Ya existe un participante con ese correo.</small>}
              </label>
            </div>
            <div className="admin-form-actions">
              <button className="admin-primary-button" disabled={saveMutation.isPending || Boolean(duplicateEmailParticipant)} type="submit">
                {saveMutation.isPending ? "Guardando…" : editingId === null ? "Agregar participante" : "Guardar cambios"}
              </button>
            </div>
          </form>
        )}

        <div className="admin-list-search">
          <label htmlFor="participants-search">Buscar participantes <span>Filtra por nombre, correo o equipo</span></label>
          <input
            autoComplete="off"
            id="participants-search"
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Escribe para filtrar la lista"
            type="search"
            value={searchText}
          />
          {normalizedSearch && <p className="admin-search-hint" aria-live="polite">{filteredParticipants.length} {filteredParticipants.length === 1 ? "resultado" : "resultados"}</p>}
        </div>

        {participantsQuery.isPending ? <p className="admin-loading">Cargando participantes…</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th scope="col">Nombre</th><th scope="col">Email</th><th scope="col">Equipo</th><th scope="col"><span className="sr-only">Acciones</span></th></tr></thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id}>
                    <td data-label="Nombre"><strong>{participant.name}</strong></td>
                    <td data-label="Email">{participant.email || "—"}</td>
                    <td data-label="Equipo">{participant.team?.name ?? "Sin equipo"}</td>
                    <td data-label="Acciones">
                      <div className="admin-record-actions">
                        <button className="admin-text-button" onClick={() => editParticipant(participant)} type="button">Modificar</button>
                        <button className="admin-danger-button" onClick={() => {
                          const teamText = participant.team ? ` Se quitará de ${participant.team.name}.` : "";
                          if (window.confirm(`¿Eliminar a ${participant.name}?${teamText} También se limpiarán sus referencias como mentor.`)) deleteMutation.mutate(participant.id);
                        }} type="button">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!participants.length && !participantsQuery.isPending && <tr><td className="admin-empty-cell" colSpan={4}>Todavía no hay participantes registrados.</td></tr>}
                {participants.length > 0 && !filteredParticipants.length && <tr><td className="admin-empty-cell" colSpan={4}>No encontramos participantes con ese criterio.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

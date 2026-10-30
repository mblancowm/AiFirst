import { AdminLayout } from "./AdminLayout";
import { adminPath } from "./adminPaths";

export function AdminPage() {
  return (
    <AdminLayout
      activeSection="overview"
      description="Administra el registro de participantes y organiza los equipos del programa."
      title="Administración."
    >
      <section className="admin-destination-grid" aria-label="Administrar participantes o equipos">
        <a className="admin-destination" href={adminPath("participants")}>
          <span className="eyebrow">PERSONAS</span>
          <strong>Participantes</strong>
          <span>Agrega personas, actualiza sus datos y revisa su equipo.</span>
          <span className="admin-destination-action">Administrar participantes <span aria-hidden="true">↗</span></span>
        </a>
        <a className="admin-destination" href={adminPath("teams")}>
          <span className="eyebrow">COLABORACIÓN</span>
          <strong>Equipos</strong>
          <span>Forma grupos de hasta cuatro personas y asigna un mentor.</span>
          <span className="admin-destination-action">Administrar equipos <span aria-hidden="true">↗</span></span>
        </a>
      </section>
    </AdminLayout>
  );
}

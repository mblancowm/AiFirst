import type { ProjectCode } from "./types";

export interface TrainingProject {
  code: ProjectCode;
  title: string;
  shortTitle: string;
  summary: string;
  user: string;
  purpose: string;
  scope: string[];
  acceptance: string[];
  optionalExtensions: string[];
  exclusions: string[];
  brief: string;
  downloadName: string;
  briefEn?: string;
  downloadNameEn?: string;
}

export const projects: TrainingProject[] = [
  {
    code: "agenda-citas",
    title: "Agenda de citas",
    shortTitle: "Registro y lista de citas ficticias",
    summary: "Registra citas de práctica y consulta las que ya guardaste.",
    user: "Una persona de recepción que necesita llevar una lista sencilla de citas.",
    purpose: "Guardar citas ficticias y consultar las citas registradas.",
    scope: [
      "Trabajar con un solo tipo de registro: cita.",
      "Crear un formulario corto con nombre ficticio, servicio y fecha.",
      "Guardar cada cita en la base de datos local.",
      "Mostrar las citas guardadas en una lista sencilla.",
      "Validar los campos obligatorios y mostrar mensajes claros.",
    ],
    acceptance: [
      "Una persona puede guardar una cita con los campos requeridos.",
      "La cita aparece en la lista después de guardarla.",
      "La cita sigue en la lista al actualizar la página.",
      "Si falta un campo obligatorio, se muestra un mensaje y no se guarda la cita.",
      "Otra persona del equipo puede iniciar la app y demostrar el flujo siguiendo el README.",
    ],
    optionalExtensions: [
      "Después de completar y revisar el mínimo, agregar edición o eliminación de una cita si queda tiempo.",
    ],
    exclusions: [
      "Calendario de disponibilidad, reglas de horario y prevención de reservas duplicadas",
      "Cancelar citas, recordatorios o calendarios externos",
      "Datos reales de clientes, pagos, cuentas e integraciones externas",
    ],
    brief: "/project-brief-agenda-citas.md",
    downloadName: "brief-agenda-de-citas.md",
    briefEn: "/project-brief-appointments.en.md",
    downloadNameEn: "appointments-project-brief.md",
  },
  {
    code: "base-conocimiento",
    title: "Base de conocimiento",
    shortTitle: "Registro y lista de artículos ficticios",
    summary: "Guarda artículos de ejemplo y consulta la lista del equipo.",
    user: "Una persona de un equipo que necesita consultar notas de práctica.",
    purpose: "Guardar artículos ficticios y mostrar los artículos registrados.",
    scope: [
      "Trabajar con un solo tipo de registro: artículo.",
      "Crear un formulario corto con título y contenido.",
      "Guardar cada artículo en la base de datos local.",
      "Mostrar los artículos guardados en una lista sencilla.",
      "Validar los campos obligatorios y mostrar mensajes claros.",
    ],
    acceptance: [
      "Una persona puede guardar un artículo con título y contenido.",
      "El artículo aparece en la lista después de guardarlo.",
      "El artículo sigue en la lista al actualizar la página.",
      "Si falta un campo obligatorio, se muestra un mensaje y no se guarda el artículo.",
      "Otra persona del equipo puede iniciar la app y demostrar el flujo siguiendo el README.",
    ],
    optionalExtensions: [
      "Después de completar y revisar el mínimo, agregar edición o eliminación de un artículo si queda tiempo.",
    ],
    exclusions: [
      "Búsqueda, filtros, categorías y carga de archivos",
      "Documentos internos reales, respuestas generadas por IA y búsqueda externa",
      "Cuentas, permisos de producción e integraciones externas",
    ],
    brief: "/project-brief-base-conocimiento.md",
    downloadName: "brief-base-de-conocimiento.md",
    briefEn: "/project-brief-knowledge-base.en.md",
    downloadNameEn: "knowledge-base-project-brief.md",
  },
  {
    code: "triage-tickets",
    title: "Bandeja de soporte",
    shortTitle: "Registro y lista de tickets ficticios",
    summary: "Registra solicitudes ficticias y consulta las que guardó el equipo.",
    user: "Una persona de soporte que necesita llevar una lista sencilla de solicitudes.",
    purpose: "Guardar tickets ficticios y mostrar las solicitudes registradas.",
    scope: [
      "Trabajar con un solo tipo de registro: solicitud de soporte.",
      "Crear un formulario corto con título y descripción.",
      "Guardar cada solicitud en la base de datos local.",
      "Mostrar las solicitudes guardadas en una lista sencilla.",
      "Validar los campos obligatorios y mostrar mensajes claros.",
    ],
    acceptance: [
      "Una persona puede guardar una solicitud con título y descripción.",
      "La solicitud aparece en la lista después de guardarla.",
      "La solicitud sigue en la lista al actualizar la página.",
      "Si falta un campo obligatorio, se muestra un mensaje y no se guarda la solicitud.",
      "Otra persona del equipo puede iniciar la app y demostrar el flujo siguiendo el README.",
    ],
    optionalExtensions: [
      "Después de completar y revisar el mínimo, agregar edición o eliminación de una solicitud si queda tiempo.",
    ],
    exclusions: [
      "Filtros, flujo de estados, asignación y reglas de prioridad",
      "Tickets o información real de clientes, respuestas automáticas de IA",
      "Cuentas, permisos de producción e integraciones externas",
    ],
    brief: "/project-brief.md",
    downloadName: "brief-bandeja-de-soporte.md",
    briefEn: "/project-brief-ticket-triage.en.md",
    downloadNameEn: "support-inbox-project-brief.md",
  },
];

export const projectEnglish: Record<
  ProjectCode,
  Omit<TrainingProject, "code" | "brief" | "downloadName" | "briefEn" | "downloadNameEn">
> = {
  "agenda-citas": {
    title: "Appointment list",
    shortTitle: "Create and list fictional appointments",
    summary: "Save practice appointments and view the ones already recorded.",
    user: "A receptionist who needs a simple list of appointments.",
    purpose: "Save fictional appointments and view the recorded appointments.",
    scope: [
      "Work with one record type: appointment.",
      "Create a short form with a fictional name, service, and date.",
      "Save each appointment in the local database.",
      "Show saved appointments in a simple list.",
      "Validate required fields and show clear messages.",
    ],
    acceptance: [
      "A person can save an appointment with the required fields.",
      "The appointment appears in the list after it is saved.",
      "The appointment remains in the list after refreshing the page.",
      "If a required field is missing, show a message and do not save the appointment.",
      "Another teammate can start the app and demo the flow by following the README.",
    ],
    optionalExtensions: [
      "After completing and reviewing the minimum, add update or delete for an appointment if there is time.",
    ],
    exclusions: [
      "Availability calendars, scheduling rules, and duplicate-booking prevention",
      "Appointment cancellation, reminders, or external calendars",
      "Real customer data, payments, accounts, and external integrations",
    ],
  },
  "base-conocimiento": {
    title: "Knowledge base",
    shortTitle: "Create and list fictional articles",
    summary: "Save sample articles and view the team's list.",
    user: "A team member who needs to keep simple practice notes.",
    purpose: "Save fictional articles and show the recorded articles.",
    scope: [
      "Work with one record type: article.",
      "Create a short form with a title and content.",
      "Save each article in the local database.",
      "Show saved articles in a simple list.",
      "Validate required fields and show clear messages.",
    ],
    acceptance: [
      "A person can save an article with a title and content.",
      "The article appears in the list after it is saved.",
      "The article remains in the list after refreshing the page.",
      "If a required field is missing, show a message and do not save the article.",
      "Another teammate can start the app and demo the flow by following the README.",
    ],
    optionalExtensions: [
      "After completing and reviewing the minimum, add update or delete for an article if there is time.",
    ],
    exclusions: [
      "Search, filters, categories, and file uploads",
      "Real internal documents, AI-generated answers, and external search",
      "Accounts, production permissions, and external integrations",
    ],
  },
  "triage-tickets": {
    title: "Support inbox",
    shortTitle: "Create and list fictional tickets",
    summary: "Save fictional requests and view the team's list.",
    user: "A support team member who needs a simple list of requests.",
    purpose: "Save fictional tickets and show the recorded requests.",
    scope: [
      "Work with one record type: support request.",
      "Create a short form with a title and description.",
      "Save each request in the local database.",
      "Show saved requests in a simple list.",
      "Validate required fields and show clear messages.",
    ],
    acceptance: [
      "A person can save a request with a title and description.",
      "The request appears in the list after it is saved.",
      "The request remains in the list after refreshing the page.",
      "If a required field is missing, show a message and do not save the request.",
      "Another teammate can start the app and demo the flow by following the README.",
    ],
    optionalExtensions: [
      "After completing and reviewing the minimum, add update or delete for a request if there is time.",
    ],
    exclusions: [
      "Filters, status workflows, assignment, and priority rules",
      "Real customer tickets or data, and automatic AI responses",
      "Accounts, production permissions, and external integrations",
    ],
  },
};

export const projectByCode = (code: ProjectCode | null) => projects.find((project) => project.code === code) ?? null;

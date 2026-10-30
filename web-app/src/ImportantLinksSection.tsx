const importantLinks = [
  {
    title: "WM Management Dashboard",
    description: "Solicita acceso a proveedores, consulta tus claves, monitorea su uso y revoca las que administras.",
    href: "https://westmonroe-cloud.com/secure/apps/21/wm-management-portal/",
    label: "Acceso y claves",
  },
  {
    title: "Hosting Request Form",
    description: "Completa el formulario para solicitar hosting para tu proyecto.",
    href: "https://app.smartsheet.com/b/form/019dbb1f806c731ca683506e06ae26e3",
    label: "Solicitud de hosting",
  },
  {
    title: "Onetime Secret",
    description: "Comparte información sensible sin dejarla expuesta en correos o chats.",
    href: "https://us.onetimesecret.com/",
    label: "Compartir información",
  },
  {
    title: "AI-Augmented Software Development Lifecycle",
    description: "Consulta guías y prompts listos para aplicar IA en cada fase del SDLC.",
    href: "https://westmonroe-cloud.com/secure/static/ai-awesome/docs/build/lifecycle/readme",
    label: "Guía del SDLC",
  },
] as const;

export function ImportantLinksSection() {
  return (
    <section className="important-links-section section-block" aria-labelledby="important-links-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RECURSOS PARA EL EQUIPO</p>
          <h2 id="important-links-title">Enlaces importantes</h2>
        </div>
        <p className="section-note">Accesos útiles para preparar, alojar y compartir el trabajo del equipo.</p>
      </div>

      <div className="important-links-grid">
        {importantLinks.map((link, index) => (
          <a
            className="important-link-card reveal"
            href={link.href}
            key={link.title}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${index * 65}ms` }}
          >
            <span className="important-link-label">{link.label}</span>
            <strong>{link.title}</strong>
            <span className="important-link-description">{link.description}</span>
            <span className="important-link-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

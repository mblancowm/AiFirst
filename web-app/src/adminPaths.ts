const configuredPath = (import.meta.env.VITE_APP_FRONTEND_PATH ?? "/").replace(/^\/+|\/+$/g, "");
const frontendBasePath = configuredPath ? `/${configuredPath}` : "";

export const adminPath = (section = "") => `${frontendBasePath}/admin/${section ? `${section}/` : ""}`;

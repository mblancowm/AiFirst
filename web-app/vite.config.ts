import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vike from "vike/plugin";
import { defineConfig, loadEnv } from "vite";

const normalizeFrontendPath = (value: string) => {
  const path = value.trim().replace(/^\/+|\/+$/g, "");
  return path ? `/${path}/` : "/";
};

const normalizeBackendPath = (value: string) => `/${value.trim().replace(/^\/+|\/+$/g, "")}`;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const frontendPath = normalizeFrontendPath(env.APP_FRONTEND_PATH ?? "/");
  const defaultBackendPath = `${frontendPath === "/" ? "" : frontendPath.replace(/\/$/, "")}/api`;
  const backendPath = normalizeBackendPath(env.APP_BACKEND_PATH ?? defaultBackendPath);
  const apiPort = Number(env.API_PORT ?? 3002);

  return {
    base: frontendPath,
    define: {
      "import.meta.env.VITE_APP_BACKEND_PATH": JSON.stringify(backendPath),
      "import.meta.env.VITE_APP_FRONTEND_PATH": JSON.stringify(frontendPath),
    },
    server: {
      proxy: {
        [backendPath]: { target: `http://127.0.0.1:${apiPort}`, changeOrigin: false },
      },
    },
    plugins: [react(), tailwindcss(), vike()],
  };
});

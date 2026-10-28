interface ImportMetaEnv {
  readonly VITE_APP_BACKEND_PATH?: string;
  readonly VITE_APP_FRONTEND_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

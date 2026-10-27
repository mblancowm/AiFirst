import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: resolve(tmpdir(), 'ai-first-training-platform', 'training-web-vite-cache'),
  plugins: [react(), tailwindcss(), vike()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787',
    },
  },
});

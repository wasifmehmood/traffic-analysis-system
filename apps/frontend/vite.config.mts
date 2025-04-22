import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ['tsconfig.json'],
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@/': new URL('src/', import.meta.url).pathname,
    },
  },
});

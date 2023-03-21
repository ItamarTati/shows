import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'client/index',
    rollupOptions: {
      external: ['react-dom/client'],
    },
  },
});
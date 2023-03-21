import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'client/dist',
    rollupOptions: {
      external: ['react-dom/client'],
    },
  },
  server: {
    proxy: {
      '/shows': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
});


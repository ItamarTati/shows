import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'client/dist',
  },
  server: {
    proxy: {
      '/api/shows': {
        target: 'https://anime-picker.vercel.app',
        changeOrigin: true
      }
    }
  }
});


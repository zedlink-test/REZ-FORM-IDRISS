import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // <- Use root path for Netlify
  plugins: [react()],
});

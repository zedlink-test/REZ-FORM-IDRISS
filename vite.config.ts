import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Detect if we're building for GitHub Pages
const isGithubPages = process.env.DEPLOY_ENV === 'github';

export default defineConfig({
  base: isGithubPages ? '/REZ-FORM-IDRISS/' : '/', // '/' for Netlify
  plugins: [react()],
});

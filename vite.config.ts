import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGithubPages = process.env.DEPLOY_ENV === 'github';

export default defineConfig({
  base: isGithubPages ? '/REZ-FORM-IDRISS/' : '/',
  plugins: [react()],
});

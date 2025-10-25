import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // remove '/REZ-FORM-IDRISS/', just use '/'
  plugins: [react()],
})


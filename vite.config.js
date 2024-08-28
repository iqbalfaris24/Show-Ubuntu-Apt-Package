import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ubuntu-package/', // Sesuaikan dengan subdirektori tempat aplikasi Anda di-host
  plugins: [react()],
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  // plugins: [react(), mkcert()],
  plugins: [react()],
  server: {
    port: 5173,
    // https: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    }
  }
})

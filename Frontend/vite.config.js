import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const local=process.argv.includes("dev")
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target: local ? "http://localhost:6001" : "https://twod-service-based-website-backend.onrender.com",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

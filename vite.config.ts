import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        server: './src/entry-server.tsx'
      }
    }
  },
  ssr: {
    noExternal: ['@theoplayer/react-ui', 'theoplayer']
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist', // Ensure it's set to 'dist'
  },
  base: '/',
  /* build: {
  rollupOptions: {
    output: {
      // Ensure proper handling of routes
      entryFileNames: 'index.html'
    }
  }
} */
  /* build: {
    sourcemap: false, // Disable source maps
  }, */
})



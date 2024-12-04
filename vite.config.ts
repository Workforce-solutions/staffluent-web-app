import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "vb-all-projects-me",
    project: "staffluent-platform-web-app"
  })],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true
  }
})
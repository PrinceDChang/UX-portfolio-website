import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'UX-portfolio-website'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPages ? `/${repoName}/` : '/',
  plugins: [react()],
  appType: 'spa',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})

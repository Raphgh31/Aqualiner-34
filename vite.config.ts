import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// La préversion GitHub Pages ne doit pas concurrencer le site en ligne dans Google.
// Pour la mise en production : VITE_NOINDEX=false npm run build
function previewNoIndex(): Plugin {
  return {
    name: 'preview-noindex',
    transformIndexHtml(html) {
      if (process.env.VITE_NOINDEX === 'false') return html
      return html.replace('</title>', '</title>\n    <meta name="robots" content="noindex, nofollow" />')
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), previewNoIndex()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
})

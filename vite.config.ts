import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Link-preview crawlers (WhatsApp, Facebook, iMessage) do not run JavaScript,
 * so og:url has to be in the HTML that ships. It is only known at build time,
 * from VITE_SITE_URL — without it the tag is left out rather than guessed.
 */
function openGraphUrl(siteUrl: string | undefined): Plugin {
  return {
    name: 'invitation-og-url',
    transformIndexHtml(html) {
      const url = siteUrl?.trim().replace(/\/+$/, '')
      if (!url) return html
      return html.replace(
        '<meta property="og:type" content="website" />',
        `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${url}" />\n    <link rel="canonical" href="${url}" />`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), openGraphUrl(env.VITE_SITE_URL)],
  }
})

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { forwardRsvp, tooLarge } from './api/_forward.ts'

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

/**
 * Serves /api/rsvp during `npm run dev`, running the same forwarding code the
 * deployed Vercel function runs. RSVP_ENDPOINT is read here in the Node
 * process, so the address never reaches the browser bundle in development
 * either — dev and production behave identically.
 */
function rsvpDevEndpoint(endpoint: string | undefined): Plugin {
  return {
    name: 'invitation-rsvp-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/rsvp', (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(body))
        }

        if (req.method === 'GET') return send(200, { ok: true, message: 'RSVP endpoint is running' })
        if (req.method !== 'POST') return send(405, { ok: false, message: 'Use POST.' })

        let raw = ''
        req.on('data', (chunk) => (raw += chunk))
        req.on('end', () => {
          if (tooLarge(raw)) return send(413, { ok: false, message: 'Reply too large.' })
          let payload: unknown
          try {
            payload = JSON.parse(raw)
          } catch {
            return send(400, { ok: false, message: 'Malformed request.' })
          }
          forwardRsvp(payload, endpoint).then(({ status, body }) => send(status, body))
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), openGraphUrl(env.VITE_SITE_URL), rsvpDevEndpoint(env.RSVP_ENDPOINT)],
  }
})

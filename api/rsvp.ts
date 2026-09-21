import { forwardRsvp, tooLarge } from './_forward.ts'

export const config = { runtime: 'edge' }

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })

/**
 * Same-origin endpoint the invitation posts replies to.
 * The browser never learns which Google Apps Script sits behind it.
 */
export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'GET') {
    return json({ ok: true, message: 'RSVP endpoint is running' }, 200)
  }
  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Use POST.' }, 405)
  }

  const raw = await request.text()
  if (tooLarge(raw)) return json({ ok: false, message: 'Reply too large.' }, 413)

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return json({ ok: false, message: 'Malformed request.' }, 400)
  }

  const { status, body } = await forwardRsvp(payload, process.env.RSVP_ENDPOINT)
  return json(body, status)
}

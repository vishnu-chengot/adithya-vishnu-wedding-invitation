/**
 * Shared RSVP forwarding logic.
 *
 * The leading underscore keeps Vercel from publishing this file as its own
 * endpoint. It is used by the deployed function (api/rsvp.ts) and by the Vite
 * dev server, so `npm run dev` behaves exactly like production.
 */

export type ForwardResult = {
  status: number
  body: { ok: boolean; message: string; code?: string }
}

const MAX_BODY_BYTES = 8 * 1024

export function tooLarge(raw: string): boolean {
  return new TextEncoder().encode(raw).length > MAX_BODY_BYTES
}

/**
 * Posts one reply on to the Apps Script web app.
 *
 * `endpoint` comes from RSVP_ENDPOINT, which has no VITE_ prefix and so is
 * never bundled into the browser build — the address stays on the server.
 */
export async function forwardRsvp(
  payload: unknown,
  endpoint: string | undefined,
): Promise<ForwardResult> {
  if (!endpoint) {
    return {
      status: 503,
      body: {
        ok: false,
        code: 'not_configured',
        message: 'RSVP_ENDPOINT is not set on the server.',
      },
    }
  }

  const reply = payload as Record<string, unknown> | null
  if (!reply || typeof reply.name !== 'string' || !reply.name.trim()) {
    return { status: 400, body: { ok: false, code: 'invalid', message: 'A name is required.' } }
  }

  let upstream: Response
  try {
    upstream = await fetch(endpoint, {
      method: 'POST',
      // Apps Script cannot answer a preflight, so keep this a simple request.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: String(reply.name).slice(0, 200),
        guests: Number(reply.guests) || 0,
        attendance: reply.attendance === 'accept' ? 'accept' : 'decline',
        message: typeof reply.message === 'string' ? reply.message.slice(0, 2000) : '',
        submittedAt: typeof reply.submittedAt === 'string' ? reply.submittedAt : '',
      }),
      redirect: 'follow',
    })
  } catch (error) {
    console.error('[rsvp] could not reach the sheet', error)
    return { status: 502, body: { ok: false, code: 'upstream', message: 'Could not reach the sheet.' } }
  }

  if (!upstream.ok) {
    console.error('[rsvp] sheet responded', upstream.status)
    return { status: 502, body: { ok: false, code: 'upstream', message: 'The sheet refused the reply.' } }
  }

  const result = (await upstream.json().catch(() => null)) as { ok?: boolean; message?: string } | null
  if (result && result.ok === false) {
    return { status: 502, body: { ok: false, code: 'upstream', message: result.message || 'Rejected.' } }
  }

  return { status: 200, body: { ok: true, message: 'Recorded' } }
}

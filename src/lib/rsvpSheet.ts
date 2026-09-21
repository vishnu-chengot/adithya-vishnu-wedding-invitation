export type RsvpAttendance = 'accept' | 'decline'

export type RsvpSubmission = {
  name: string
  guests: number
  attendance: RsvpAttendance
  message: string
  /** ISO timestamp taken on the guest's device when they pressed send. */
  submittedAt: string
}

/**
 * Apps Script web app URL. Set VITE_RSVP_ENDPOINT in .env.local (and in the
 * host's environment for the deployed site) — see the project README.
 */
const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined

if (import.meta.env.DEV && !ENDPOINT) {
  console.warn(
    '[RSVP] VITE_RSVP_ENDPOINT is not set, so replies will not reach the Google Sheet.\n' +
      'Create a .env.local file with your Apps Script /exec URL and restart the dev server.\n' +
      'Full steps: README → "RSVP → Google Sheet".',
  )
}

export class RsvpNotConfiguredError extends Error {
  constructor() {
    super('VITE_RSVP_ENDPOINT is not set, so the reply was not recorded.')
    this.name = 'RsvpNotConfiguredError'
  }
}

/**
 * Appends one reply to the Google Sheet.
 *
 * The body goes out as text/plain on purpose: that keeps it a "simple" request,
 * so the browser sends no OPTIONS preflight — Apps Script cannot answer one.
 * Apps Script parses the body itself, so the content type costs us nothing.
 */
export async function sendRsvpToSheet(submission: RsvpSubmission): Promise<void> {
  if (!ENDPOINT) throw new RsvpNotConfiguredError()

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(submission),
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`The RSVP sheet returned ${response.status}.`)
  }

  // Apps Script always answers 200; the payload says whether the row was written.
  const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null
  if (result && result.ok === false) {
    throw new Error(result.message || 'The RSVP sheet rejected the reply.')
  }
}

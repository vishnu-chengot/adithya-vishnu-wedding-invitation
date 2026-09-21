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
 * Replies go to our own origin, never straight to Google.
 *
 * The Apps Script address lives in RSVP_ENDPOINT on the server — no VITE_
 * prefix, so it is never compiled into the browser bundle. All the browser
 * knows is this path.
 */
const ENDPOINT = '/api/rsvp'

/** The server has no RSVP_ENDPOINT configured, so nothing was recorded. */
export class RsvpNotConfiguredError extends Error {
  constructor() {
    super('RSVP_ENDPOINT is not set on the server, so the reply was not recorded.')
    this.name = 'RsvpNotConfiguredError'
  }
}

export async function sendRsvpToSheet(submission: RsvpSubmission): Promise<void> {
  // Same-origin, so a JSON content type costs no preflight.
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; message?: string; code?: string }
    | null

  if (result?.code === 'not_configured') throw new RsvpNotConfiguredError()

  if (!response.ok || result?.ok === false) {
    throw new Error(result?.message || `The RSVP endpoint returned ${response.status}.`)
  }
}

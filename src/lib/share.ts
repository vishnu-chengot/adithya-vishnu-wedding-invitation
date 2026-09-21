import { weddingData } from '../data/weddingData'

const shareText = `${weddingData.brideName} weds ${weddingData.groomName} — ${weddingData.weddingDay}, 15 November 2026. Muhurtham ${weddingData.muhurtham} at the ${weddingData.venue.toLowerCase()}. We would love to have you with us.`

export type ShareResult = 'shared' | 'whatsapp' | 'copied' | 'cancelled'

/**
 * The link guests receive.
 *
 * Read from the address bar, so wherever the invitation is hosted it shares
 * that address with no configuration. The query string and hash are dropped:
 * a guest who has tapped "Reply to the invitation" is sitting on `…/#rsvp`,
 * and forwarding that would drop the next person past the envelope.
 *
 * Set VITE_SITE_URL to override — useful when the site is served from a
 * preview deploy but should be shared under its real domain.
 */
export function invitationUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim()
  if (configured) return configured.replace(/\/+$/, '')

  const { origin, pathname } = window.location
  return `${origin}${pathname.replace(/index\.html$/, '')}`.replace(/\/$/, '') || origin
}

/** True while the link would only work on this machine. */
function isLocalHost(): boolean {
  const { hostname } = window.location
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')
}

/** Web Share API where it exists, WhatsApp next, clipboard as the last resort. */
export async function shareInvitation(): Promise<ShareResult> {
  const url = invitationUrl()
  const title = `${weddingData.brideName} & ${weddingData.groomName}`

  if (import.meta.env.DEV && isLocalHost() && !import.meta.env.VITE_SITE_URL) {
    console.warn(
      `[Share] Sharing "${url}", which only resolves on this machine. ` +
        'Once the site is hosted the real address is picked up automatically, ' +
        'or set VITE_SITE_URL to force one.',
    )
  }

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text: shareText, url })
      return 'shared'
    } catch (error) {
      // The sheet was dismissed — that is not a failure, just stop here.
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
    }
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${url}`)}`
  const opened = window.open(whatsapp, '_blank', 'noopener,noreferrer')
  if (opened) return 'whatsapp'

  try {
    await navigator.clipboard.writeText(`${shareText}\n\n${url}`)
    return 'copied'
  } catch {
    return 'cancelled'
  }
}

export function mapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(weddingData.mapsQuery)}`
}

export function directionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(weddingData.mapsQuery)}`
}

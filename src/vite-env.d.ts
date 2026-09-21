/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script web app URL that records RSVPs. */
  readonly VITE_RSVP_ENDPOINT?: string
  /**
   * Overrides the link the Share button sends. Leave unset to use whatever
   * address the invitation is being served from.
   */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Overrides the link the Share button sends. Leave unset to use whatever
   * address the invitation is being served from.
   */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

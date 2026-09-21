import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { shareInvitation, type ShareResult } from '../../lib/share'

const confirmations: Record<Exclude<ShareResult, 'cancelled'>, string> = {
  shared: 'Shared',
  whatsapp: 'Opening WhatsApp',
  copied: 'Link copied',
}

export function ShareButton() {
  const [note, setNote] = useState<string | null>(null)

  async function handleShare() {
    const result = await shareInvitation()
    if (result === 'cancelled') return
    setNote(confirmations[result])
    window.setTimeout(() => setNote(null), 2600)
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 bg-burgundy px-8 font-sans text-[0.68rem] uppercase tracking-[0.3em] text-parchment transition-all duration-500 hover:bg-burgundyDeep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <circle cx="18" cy="5" r="2.6" />
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
          <path d="M8.4 10.8l7.2-4.2M8.4 13.2l7.2 4.2" strokeLinecap="round" />
        </svg>
        Share invitation
      </button>

      <AnimatePresence>
        {note && (
          <motion.span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm italic text-botanical"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
          >
            {note}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

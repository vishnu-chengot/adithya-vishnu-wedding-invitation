import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type EnvelopeFlapProps = {
  open: boolean
  children?: ReactNode
}

/**
 * The top flap. Rotates about its hinge at the top edge of the envelope,
 * so it swings up and over — away from the viewer, as a real flap does.
 * Its stacking is handled by the parent, which drops it behind the card
 * the moment it starts to open.
 */
export function EnvelopeFlap({ open, children }: EnvelopeFlapProps) {
  const still = useReducedMotion()

  return (
    <motion.div
      className="absolute inset-x-0 top-0 origin-top"
      style={{ transformStyle: 'preserve-3d', height: '56%' }}
      initial={false}
      animate={{ rotateX: open ? -172 : 0 }}
      transition={still ? { duration: 0 } : { duration: 1.45, ease: [0.33, 0, 0.16, 1] }}
    >
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* outside face of the flap */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            background: 'linear-gradient(176deg, #FEFAF2 0%, #F7EFDF 40%, #EADDC3 78%, #DFCFAE 100%)',
            filter: 'drop-shadow(0 6px 9px rgba(61,41,35,0.22))',
          }}
        >
          <div className="grain" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          <div className="laid" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          {/* folded edge highlight down both diagonals */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 0 L50 100 L100 0" fill="none" stroke="rgba(112,72,38,0.5)" strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
            <path d="M1.2 0 L50 97.5 L98.8 0" fill="none" stroke="rgba(255,252,244,0.95)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d="M0 0 L50 100 L100 0" fill="none" stroke="rgba(184,148,82,0.42)" strokeWidth="2.6" vectorEffect="non-scaling-stroke" opacity="0.5" />
          </svg>
        </div>

        {/* inside face — darker, patterned liner, visible once it swings over */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(180deg)',
            backfaceVisibility: 'hidden',
            clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
            background: 'linear-gradient(8deg, #5E2129 0%, #6E2B34 55%, #7C333D 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(216,190,134,0.5) 0 1px, transparent 1px 13px), repeating-linear-gradient(-45deg, rgba(216,190,134,0.5) 0 1px, transparent 1px 13px)',
            }}
          />
        </div>

        {children}
      </div>
    </motion.div>
  )
}

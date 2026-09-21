import { motion, useReducedMotion } from 'framer-motion'
import { SealMotif } from '../botanical/Botanicals'

type WaxSealProps = {
  /** Goes true the moment the envelope is tapped, before the flap moves. */
  breaking: boolean
  className?: string
}

/** Matte burgundy wax, poured slightly off-round, stamped with a lotus. */
const blob = '46% 54% 43% 57% / 53% 45% 55% 47%'

export function WaxSeal({ breaking, className = '' }: WaxSealProps) {
  const still = useReducedMotion()

  return (
    <motion.div
      className={`relative ${className}`}
      initial={false}
      animate={
        breaking
          ? still
            ? { opacity: 0 }
            : {
                // press in, crack free of the flap, then fall out of frame
                scale: [1, 0.86, 1.04, 1, 0.94],
                rotate: [0, -6, 8, 26, 54],
                x: [0, 0, 4, 12, 26],
                y: [0, 4, 10, 120, 320],
                opacity: [1, 1, 1, 1, 0],
              }
          : { scale: 1, rotate: 0, x: 0, y: 0, opacity: 1 }
      }
      transition={{
        duration: 1.25,
        times: [0, 0.16, 0.28, 0.66, 1],
        ease: [0.45, 0.02, 0.6, 1],
      }}
    >
      <div
        className="relative h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]"
        style={{
          borderRadius: blob,
          background:
            'radial-gradient(72% 66% at 36% 30%, #8E3B44 0%, #78313B 38%, #642430 70%, #4E1A24 100%)',
          boxShadow:
            'inset 0 2px 3px rgba(255,214,200,0.20), inset 0 -5px 10px rgba(30,7,11,0.55), 0 7px 14px -6px rgba(52,14,20,0.6), 0 2px 3px rgba(52,14,20,0.35)',
        }}
      >
        {/* the squeezed-out rim where the stamp pressed the wax down */}
        <div
          className="absolute -inset-[3px] -z-10 opacity-80"
          style={{
            borderRadius: '52% 48% 55% 45% / 47% 56% 44% 53%',
            background: 'radial-gradient(60% 58% at 46% 42%, #6E2B34, #521D27 78%, rgba(82,29,39,0) 100%)',
          }}
        />

        {/* matte wax speckle */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            borderRadius: blob,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><filter id='w'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3'/><feColorMatrix type='saturate' values='0'/></filter><rect width='90' height='90' filter='url(%23w)'/></svg>\")",
          }}
        />

        {/* embossed stamp: a dark impression with a lit edge above it */}
        <SealMotif className="absolute inset-0 h-full w-full p-[11px] text-[#3A0E16] opacity-70" />
        <SealMotif className="absolute inset-0 h-full w-full -translate-y-[1px] p-[11px] text-[#EBB9A6] opacity-45" />

        {/* pressed inner ring */}
        <div
          className="absolute inset-[7px] opacity-70"
          style={{
            borderRadius: '50% 50% 46% 54% / 49% 52% 48% 51%',
            boxShadow: 'inset 0 1px 1px rgba(255,220,205,0.18), inset 0 -1px 3px rgba(35,8,12,0.42)',
          }}
        />
      </div>
    </motion.div>
  )
}

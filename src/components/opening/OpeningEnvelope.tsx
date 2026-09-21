import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EnvelopeFlap } from './EnvelopeFlap'
import { WaxSeal } from './WaxSeal'
import { InvitationCard } from './InvitationCard'
import { Sprig, Jasmine, LotusBud, Diamond } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'

type Phase = 'idle' | 'seal' | 'flap' | 'slide' | 'rise' | 'depart'

/** The flap crosses vertical here, which is the moment to drop it behind the card. */
const FLAP_CROSSES_MS = 930

/** Each step waits for the one before it to settle. Times are milliseconds from the tap. */
const schedule: Array<[Phase, number]> = [
  ['flap', 430],
  ['slide', 1180],
  ['rise', 2720],
  ['depart', 3820],
]

const HANDOVER_MS = 4700

type OpeningEnvelopeProps = {
  /** Fires when the card has finished its journey and the site should take over. */
  onOpened: () => void
}

/**
 * The card is already centred in the viewport when it is inside the envelope, so
 * the envelope shell drops away while the card lifts only a little. That reads as
 * a card being drawn out, and it keeps the card on screen on a 360px phone.
 */
export function OpeningEnvelope({ onOpened }: OpeningEnvelopeProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [flapBehind, setFlapBehind] = useState(false)
  const timers = useRef<number[]>([])
  const still = useReducedMotion()

  const open = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('seal')

    if (still) {
      setFlapBehind(true)
      timers.current.push(window.setTimeout(onOpened, 280))
      return
    }
    timers.current.push(window.setTimeout(() => setFlapBehind(true), FLAP_CROSSES_MS))
    for (const [next, at] of schedule) {
      timers.current.push(window.setTimeout(() => setPhase(next), at))
    }
    timers.current.push(window.setTimeout(onOpened, HANDOVER_MS))
  }, [phase, still, onOpened])

  useEffect(() => {
    const list = timers.current
    return () => list.forEach(window.clearTimeout)
  }, [])

  const opening = phase !== 'idle'
  const flapOpen = phase === 'flap' || phase === 'slide' || phase === 'rise' || phase === 'depart'
  const out = phase === 'slide' || phase === 'rise' || phase === 'depart'
  const risen = phase === 'rise' || phase === 'depart'
  const departing = phase === 'depart'

  /** Back panel and front panel share this motion so the envelope stays one object. */
  const shell = still
    ? {}
    : { y: out ? '24%' : '0%', filter: risen ? 'blur(2.5px)' : 'blur(0px)', opacity: risen ? 0.88 : 1 }

  const shellTransition = {
    y: { duration: 1.65, ease: [0.3, 0.02, 0.2, 1] as const },
    filter: { duration: 1.1, ease: 'easeOut' as const },
    opacity: { duration: 1.1, ease: 'easeOut' as const },
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-5"
      style={{
        paddingTop: 'var(--safe-top)',
        paddingBottom: 'var(--safe-bottom)',
        background:
          'radial-gradient(112% 78% at 50% 16%, #FBF6EC 0%, #F3E9D7 42%, #E6D6BB 78%, #D8C4A4 100%)',
      }}
    >
      <div className="grain grain-soft" />

      {/* props on the table, as in a stationery photograph */}
      <Sprig className="pointer-events-none absolute -left-8 bottom-[-12px] h-56 w-auto opacity-[0.34] sway sm:left-4 sm:h-80" />
      <Sprig className="pointer-events-none absolute -right-10 top-[-16px] h-52 w-auto -scale-x-100 opacity-[0.28] sway sm:right-6 sm:h-72" />
      <LotusBud className="pointer-events-none absolute bottom-8 right-5 h-28 w-auto opacity-[0.30] drift sm:right-20 sm:h-40" />
      <Jasmine className="pointer-events-none absolute left-7 top-14 h-9 w-9 opacity-40 drift sm:left-24 sm:h-12 sm:w-12" />

      <motion.div
        className="relative flex w-full flex-col items-center"
        animate={
          departing && !still
            ? { scale: 1.85, opacity: 0, filter: 'blur(6px)' }
            : { scale: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: 1.05, ease: [0.4, 0, 0.7, 0.2] }}
      >
        <motion.div
          style={{ perspective: '1600px', perspectiveOrigin: '50% 42%' }}
          animate={still ? {} : { scale: out ? 0.8 : 1 }}
          transition={{ duration: 1.65, ease: [0.3, 0.02, 0.2, 1] }}
        >
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Open the wedding invitation"
            onClick={open}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                open()
              }
            }}
            className="relative cursor-pointer select-none outline-none"
            style={{
              height: 'min(108vw, 55svh, 520px)',
              aspectRatio: '0.78',
              transformStyle: 'preserve-3d',
            }}
            animate={still ? {} : { rotateX: opening ? 2 : 5 }}
            whileHover={opening || still ? undefined : { rotateX: 1.5, scale: 1.015 }}
            whileTap={opening || still ? undefined : { scale: 0.985 }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.24, 1] }}
          >
            {/* shadow cast on the table */}
            <motion.div
              className="absolute left-1/2 top-[95%] h-12 w-[94%] -translate-x-1/2"
              style={{
                background: 'radial-gradient(46% 50% at 50% 50%, rgba(85,45,32,0.30), rgba(85,45,32,0.10) 58%, transparent 78%)',
                filter: 'blur(7px)',
                zIndex: 0,
              }}
              animate={still ? {} : { y: out ? '240%' : '0%', opacity: risen ? 0.45 : 0.85 }}
              transition={shellTransition}
            />

            {/* 1 — back panel, behind the card */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: 1 }}
              animate={shell}
              transition={shellTransition}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(166deg, #EFE3CB 0%, #E7D9BE 60%, #DBC9A8 100%)',
                  boxShadow: '0 22px 44px -26px rgba(61,41,35,0.55)',
                }}
              />
              <div className="grain" />
            </motion.div>

            {/* 2 — the card itself */}
            <motion.div
              className="absolute left-1/2"
              style={{
                width: '88%',
                height: '90%',
                top: '5%',
                marginLeft: '-44%',
                zIndex: 2,
                transformStyle: 'preserve-3d',
              }}
              initial={false}
              animate={
                still
                  ? {}
                  : {
                      y: out ? '-60%' : '0%',
                      z: risen ? 120 : 0,
                      rotateX: risen ? -4 : 0,
                      rotateZ: out && !risen ? -0.9 : 0,
                    }
              }
              transition={{
                y: { duration: 1.65, ease: [0.3, 0.02, 0.2, 1] },
                z: { duration: 1.3, ease: [0.2, 0.7, 0.25, 1] },
                rotateX: { duration: 1.3, ease: [0.2, 0.7, 0.25, 1] },
                rotateZ: { duration: 1.5, ease: [0.3, 0, 0.2, 1] },
              }}
            >
              <motion.div
                className="pointer-events-none absolute left-1/2 top-full h-8 w-[86%] -translate-x-1/2"
                style={{
                  background: 'radial-gradient(48% 50% at 50% 40%, rgba(72,34,26,0.34), transparent 74%)',
                  filter: 'blur(6px)',
                }}
                animate={still ? {} : { opacity: risen ? 0.85 : 0, scaleX: risen ? 1 : 0.7 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <InvitationCard />
            </motion.div>

            {/* 3 — front panel: the card is tucked behind this */}
            <motion.div
              className="absolute inset-0"
              style={{ zIndex: 3 }}
              animate={shell}
              transition={shellTransition}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  background: 'linear-gradient(174deg, #F7EFDF 0%, #F1E5CE 55%, #E7D7B8 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.75), 0 -2px 12px -6px rgba(61,41,35,0.45), 0 26px 48px -28px rgba(61,41,35,0.5)',
                }}
              >
                <div className="grain" />
                <div className="laid" />
                {/* the shadow the closed flap throws onto the front */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-[50%]"
                  style={{ background: 'linear-gradient(180deg, rgba(61,41,35,0.17), transparent)' }}
                  animate={{ opacity: flapOpen ? 0 : 1 }}
                  transition={{ duration: 0.9 }}
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-7">
                  <div className="flex items-center gap-2 opacity-70">
                    <span className="h-px w-8 bg-gold/60" />
                    <Diamond className="h-2 w-2" />
                    <span className="h-px w-8 bg-gold/60" />
                  </div>
                  <p className="font-display text-sm italic tracking-wide text-gold/90">
                    {weddingData.brideName} &amp; {weddingData.groomName}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 4 — the flap sits over the front while sealed, and behind the card
                    once it has swung back, which is where a real flap ends up. */}
            <motion.div
              className="absolute inset-0"
              style={{ zIndex: flapBehind ? 1 : 4, transformStyle: 'preserve-3d' }}
              animate={shell}
              transition={shellTransition}
            >
              <EnvelopeFlap open={flapOpen} />
            </motion.div>

            {/* 5 — the seal, on top of everything until it breaks away */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ zIndex: 5 }}
              animate={shell}
              transition={shellTransition}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: 'calc(56% - 30px)' }}
              >
                <WaxSeal breaking={opening} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {!opening && (
            <motion.div
              className="mt-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.4 } }}
              transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 0.61, 0.24, 1] }}
            >
              <motion.button
                type="button"
                onClick={open}
                className="px-5 py-2 font-display text-lg italic tracking-[0.04em] text-cocoa/75 transition-colors hover:text-burgundy"
                animate={still ? {} : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Tap to open
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../ui/Reveal'
import { Sprig, LotusBud, Divider } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'

/**
 * The evening before. Tied to the ceremony card by the same type, but inverted
 * onto a deep burgundy ground so it reads as a separate, warmer occasion.
 */
export function PreviousDayFunction() {
  const ref = useRef<HTMLElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div
        className="relative px-6 py-24 sm:py-32"
        style={{ background: 'linear-gradient(162deg, #6A2A33 0%, #55202A 58%, #431821 100%)' }}
      >
        <div className="grain opacity-[0.20]" />

        <motion.div className="pointer-events-none absolute inset-0" style={still ? undefined : { y: drift }}>
          <Sprig className="absolute -left-12 top-4 h-64 w-auto opacity-[0.22] sway sm:left-0 sm:h-80" />
          <Sprig className="absolute -right-12 bottom-0 h-64 w-auto -scale-100 opacity-[0.18] sway sm:right-0 sm:h-80" />
          <LotusBud className="absolute left-1/2 top-6 h-24 w-auto -translate-x-1/2 opacity-[0.16] drift sm:h-32" />
        </motion.div>

        <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
          <Reveal variant="expand">
            <Divider className="h-6 w-52 opacity-70 sm:w-64" />
          </Reveal>

          <Reveal delay={0.14} className="mt-8">
            <h2 className="font-display text-[2.4rem] font-light leading-tight text-parchment sm:text-[3.2rem]">
              Previous Day Function
            </h2>
          </Reveal>

          <Reveal delay={0.28} className="mt-5">
            <p className="font-display text-base italic text-goldLight/90 sm:text-lg">
              Saturday, 14 November 2026
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-12 w-full">
            <div className="mx-auto flex max-w-xs flex-col items-center gap-7 border-y border-goldLight/25 py-9">
              <div>
                <p className="font-display text-base italic text-goldLight/75">Time</p>
                <p className="mt-2 font-sans text-lg font-light tracking-[0.08em] text-parchment sm:text-xl">
                  {weddingData.previousFunction.time}
                </p>
              </div>

              <span className="h-px w-16 bg-goldLight/30" />

              <div>
                <p className="font-display text-base italic text-goldLight/75">Where</p>
                <p className="mt-2 font-display text-2xl font-light text-parchment sm:text-[1.7rem]">
                  {weddingData.previousFunction.venue}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.54} className="mt-10">
            <p className="max-w-sm font-display text-base italic leading-relaxed text-blush/85 sm:text-lg">
              An evening of music, colour and family — we would love you there before
              the morning begins.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

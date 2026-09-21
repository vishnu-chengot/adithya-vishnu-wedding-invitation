import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sprig, Lotus, Jasmine, Diamond } from '../botanical/Botanicals'
import { weddingData, dateParts } from '../../data/weddingData'

/**
 * The hero is the first thing seen after the envelope, so it inherits the card's
 * composition and then breathes — the names are the only loud element on the page.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const leafY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const enter = (delay: number) => ({
    initial: still ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.3, delay, ease: [0.22, 0.61, 0.24, 1] as const },
  })

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6"
      style={{ paddingTop: 'calc(var(--safe-top) + 2rem)', paddingBottom: '3rem' }}
    >
      <motion.div style={still ? undefined : { y: leafY }} className="pointer-events-none absolute inset-0">
        <Sprig className="absolute -left-10 top-6 h-60 w-auto opacity-[0.30] sway sm:left-2 sm:h-80 lg:h-[26rem]" />
        <Sprig className="absolute -right-10 bottom-0 h-64 w-auto -scale-100 opacity-[0.26] sway sm:right-2 sm:h-80 lg:h-[26rem]" />
        <Jasmine className="absolute right-10 top-24 h-8 w-8 opacity-45 drift sm:right-28 sm:h-11 sm:w-11" />
        <Jasmine className="absolute left-12 bottom-24 h-7 w-7 opacity-35 drift sm:left-32 sm:h-10 sm:w-10" />
      </motion.div>

      <motion.div
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
        style={still ? undefined : { y: textY, opacity: fade }}
      >
        <motion.div {...enter(0.15)}>
          <Lotus className="h-9 w-auto sm:h-12" />
        </motion.div>

        <motion.p
          className="mt-6 font-display text-base italic text-gold sm:text-lg"
          {...enter(0.35)}
        >
          Together with their families
        </motion.p>

        <motion.h1
          className="mt-6 font-display text-[3.35rem] font-light leading-[0.95] text-burgundy sm:text-[5.5rem] lg:text-[7rem]"
          {...enter(0.5)}
        >
          {weddingData.brideName}
        </motion.h1>

        <motion.div className="my-3 flex items-center gap-4 sm:my-5 sm:gap-6" {...enter(0.72)}>
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70 sm:w-20" />
          <span className="font-display text-2xl italic text-gold sm:text-4xl">&amp;</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70 sm:w-20" />
        </motion.div>

        <motion.h1
          className="font-display text-[3.35rem] font-light leading-[0.95] text-burgundy sm:text-[5.5rem] lg:text-[7rem]"
          {...enter(0.86)}
        >
          {weddingData.groomName}
        </motion.h1>

        <motion.div className="mt-10 flex flex-col items-center gap-3" {...enter(1.12)}>
          <div className="flex items-center gap-3">
            <Diamond className="h-2 w-2" />
            <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.34em] text-cocoa sm:text-sm sm:tracking-[0.4em]">
              {dateParts.day} November {dateParts.year}
            </p>
            <Diamond className="h-2 w-2" />
          </div>
          <p className="font-display text-lg italic text-botanical sm:text-xl">
            {weddingData.weddingDay} · {weddingData.muhurtham}
          </p>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2 sm:mt-20"
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1.2 }}
        >
          <motion.span
            className="block h-14 w-px bg-gradient-to-b from-gold/75 to-transparent"
            style={{ transformOrigin: 'top' }}
            animate={still ? {} : { scaleY: [0.35, 1, 0.35], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

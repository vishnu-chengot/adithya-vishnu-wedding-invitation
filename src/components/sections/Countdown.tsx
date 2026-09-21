import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { Lotus, Diamond } from '../botanical/Botanicals'
import { useCountdown } from '../../lib/useCountdown'
import { weddingData } from '../../data/weddingData'

const pad = (value: number) => String(value).padStart(2, '0')

export function Countdown() {
  const left = useCountdown(weddingData.ceremonyStart)
  const still = useReducedMotion()

  if (left.arrived) {
    return (
      <section className="relative w-full px-6 py-20 sm:py-32">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Reveal variant="expand">
            <Lotus className="h-10 w-auto sm:h-12" />
          </Reveal>
          <Reveal delay={0.16} className="mt-8">
            <h2 className="font-display text-[2.6rem] font-light leading-tight text-burgundy sm:text-[3.6rem]">
              The day is here
            </h2>
          </Reveal>
          <Reveal delay={0.3} className="mt-6">
            <p className="font-display text-lg italic leading-relaxed text-botanical sm:text-xl">
              {weddingData.brideName} and {weddingData.groomName} are married.
              <br />
              Thank you for every blessing.
            </p>
          </Reveal>
        </div>
      </section>
    )
  }

  const units = [
    { value: left.days, label: 'Days' },
    { value: left.hours, label: 'Hours' },
    { value: left.minutes, label: 'Minutes' },
    { value: left.seconds, label: 'Seconds' },
  ]

  return (
    <section className="relative w-full px-6 py-20 sm:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal variant="fade">
          <p className="font-display text-lg italic text-gold sm:text-xl">
            Counting down to the muhurtham
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-12 w-full">
          <div className="grid grid-cols-4 gap-1 sm:gap-4">
            {units.map((unit, index) => (
              <div key={unit.label} className="relative flex flex-col items-center px-1">
                {index > 0 && (
                  <span className="absolute -left-0.5 top-2 h-12 w-px bg-gold/25 sm:-left-2 sm:h-16" />
                )}
                <motion.span
                  key={unit.label === 'Seconds' ? unit.value : unit.label}
                  className="font-sans text-[2.1rem] font-light leading-none text-burgundy tabular-nums sm:text-[3.1rem]"
                  initial={still || unit.label !== 'Seconds' ? false : { opacity: 0.35, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {pad(unit.value)}
                </motion.span>
                <span className="mt-4 font-display text-xs italic tracking-[0.06em] text-cocoa/60 sm:text-sm">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.34} className="mt-12">
          <div className="flex items-center gap-3 opacity-70">
            <span className="h-px w-10 bg-gold/60" />
            <Diamond className="h-2 w-2" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

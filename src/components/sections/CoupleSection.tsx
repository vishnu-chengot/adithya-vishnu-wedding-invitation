import { Reveal } from '../ui/Reveal'
import { Lotus, Jasmine } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'

/** The two names given the most air on the page, with the groom's parentage beneath. */
export function CoupleSection() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-20 sm:py-28">
      <Jasmine className="pointer-events-none absolute left-6 top-10 h-8 w-8 opacity-30 drift sm:left-24 sm:h-12 sm:w-12" />
      <Jasmine className="pointer-events-none absolute right-8 bottom-12 h-7 w-7 opacity-25 drift sm:right-28 sm:h-10 sm:w-10" />

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal variant="settle">
          <h2 className="font-display text-[2.9rem] font-light leading-none text-burgundy sm:text-[4.5rem]">
            {weddingData.brideName}
          </h2>
        </Reveal>

        <Reveal delay={0.18} variant="fade" className="my-5 sm:my-7">
          <div className="flex flex-col items-center gap-3">
            <Lotus className="h-6 w-auto opacity-75 sm:h-8" />
            <span className="font-display text-base italic text-gold sm:text-lg">with</span>
          </div>
        </Reveal>

        <Reveal delay={0.3} variant="settle">
          <h2 className="font-display text-[2.9rem] font-light leading-none text-burgundy sm:text-[4.5rem]">
            {weddingData.groomName}
          </h2>
        </Reveal>

        <Reveal delay={0.46} className="mt-9">
          <p className="max-w-xs font-sans text-[0.78rem] leading-relaxed tracking-[0.04em] text-cocoa/70 [text-wrap:balance] sm:max-w-sm sm:text-sm">
            {weddingData.groomParentage}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

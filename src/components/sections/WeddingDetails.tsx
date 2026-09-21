import { Reveal, DrawnRule } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { CornerFlourish, Diamond } from '../botanical/Botanicals'
import { weddingData, dateParts } from '../../data/weddingData'

/**
 * The ceremony, presented as a pressed paper card rather than a calendar tile:
 * the numeral is the object, and the gold rules do the dividing.
 */
export function WeddingDetails() {
  return (
    <section id="details" className="relative w-full px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-lg">
        <Reveal variant="fade">
          <SectionHeading>The Ceremony</SectionHeading>
        </Reveal>

        <Reveal delay={0.16} variant="rise" className="mt-12">
          <article
            className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14"
            style={{
              background: 'linear-gradient(166deg, #FDF9F0 0%, #F8F1E3 55%, #F1E7D3 100%)',
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 60px -34px rgba(85,32,42,0.45), 0 2px 6px -3px rgba(61,41,35,0.18)',
            }}
          >
            <div className="grain" />
            <div className="pointer-events-none absolute inset-[10px] border border-gold/30" />
            <CornerFlourish className="pointer-events-none absolute left-2 top-2 h-16 w-16 opacity-60" />
            <CornerFlourish className="pointer-events-none absolute right-2 top-2 h-16 w-16 -scale-x-100 opacity-60" />
            <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 h-16 w-16 -scale-y-100 opacity-60" />
            <CornerFlourish className="pointer-events-none absolute bottom-2 right-2 h-16 w-16 -scale-100 opacity-60" />

            <div className="relative">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.42em] text-gold">
                {dateParts.month}
              </p>

              <p className="mt-3 font-display text-[6.5rem] font-light leading-none text-burgundy sm:text-[8.5rem]">
                {dateParts.day}
              </p>

              <div className="mt-7 flex items-center justify-center gap-3 sm:mt-8">
                <span className="h-px w-10 bg-gold/60" />
                <p className="font-display text-lg tracking-[0.1em] text-cocoa/85">
                  {dateParts.year} · {dateParts.weekday}
                </p>
                <span className="h-px w-10 bg-gold/60" />
              </div>

              <p className="mt-4 font-display text-base italic text-botanical">
                {weddingData.malayalamDate}
              </p>

              <div className="mx-auto my-9 w-44">
                <DrawnRule delay={0.5} />
              </div>

              <p className="font-display text-xl italic text-gold sm:text-2xl">Muhurtham</p>
              <p className="mt-3 font-sans text-[0.95rem] font-light tracking-[0.14em] text-cocoa sm:text-base">
                {weddingData.muhurtham}
              </p>

              <div className="mx-auto mt-9 flex items-center justify-center gap-3">
                <Diamond className="h-2 w-2" />
                <Diamond className="h-2 w-2 opacity-50" />
                <Diamond className="h-2 w-2" />
              </div>

              <p className="mt-8 font-display text-2xl font-light text-burgundy sm:text-3xl">
                {weddingData.venue}
              </p>
              <p className="mt-2 font-sans text-[0.72rem] tracking-[0.08em] text-cocoa/60">
                {weddingData.brideAddress}
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

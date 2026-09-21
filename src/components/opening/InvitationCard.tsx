import { CornerFlourish, Lotus, Diamond } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'

/**
 * The printed card that slides out of the envelope.
 * Deliberately sparse — it shows only what a real card's face shows,
 * and the website carries the rest.
 */
export function InvitationCard() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: 'linear-gradient(168deg, #FDF8EE 0%, #F8F1E3 52%, #F0E6D2 100%)',
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(61,41,35,0.10) inset, 0 26px 50px -26px rgba(85,32,42,0.5)',
      }}
    >
      <div className="grain" />
      <div className="laid" />

      {/* double rule border, the way letterpress stock is bordered */}
      <div className="pointer-events-none absolute inset-[9px] border border-gold/45" />
      <div className="pointer-events-none absolute inset-[14px] border border-gold/20" />

      <CornerFlourish className="pointer-events-none absolute left-[8px] top-[8px] h-14 w-14 opacity-70 sm:h-16 sm:w-16" />
      <CornerFlourish className="pointer-events-none absolute right-[8px] top-[8px] h-14 w-14 -scale-x-100 opacity-70 sm:h-16 sm:w-16" />
      <CornerFlourish className="pointer-events-none absolute bottom-[8px] left-[8px] h-14 w-14 -scale-y-100 opacity-70 sm:h-16 sm:w-16" />
      <CornerFlourish className="pointer-events-none absolute bottom-[8px] right-[8px] h-14 w-14 -scale-100 opacity-70 sm:h-16 sm:w-16" />

      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <Lotus className="h-7 w-auto opacity-80 sm:h-9" />

        <p className="mt-4 font-display text-[0.72rem] italic text-gold sm:text-sm">
          Together with their families
        </p>

        <h1 className="mt-3 font-display text-[2.1rem] font-light leading-[1.05] text-burgundy sm:text-5xl">
          {weddingData.brideName}
        </h1>

        <div className="my-1.5 flex items-center gap-2.5 sm:my-2">
          <span className="h-px w-7 bg-gold/55 sm:w-10" />
          <span className="font-display text-lg italic text-gold sm:text-2xl">&amp;</span>
          <span className="h-px w-7 bg-gold/55 sm:w-10" />
        </div>

        <h1 className="font-display text-[2.1rem] font-light leading-[1.05] text-burgundy sm:text-5xl">
          {weddingData.groomName}
        </h1>

        <div className="mt-5 flex items-center gap-2.5 sm:mt-7">
          <Diamond className="h-2 w-2" />
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.3em] text-cocoa/75 sm:text-[0.7rem]">
            15 · 11 · 2026
          </p>
          <Diamond className="h-2 w-2" />
        </div>
      </div>
    </div>
  )
}

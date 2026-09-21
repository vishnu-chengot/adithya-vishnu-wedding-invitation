import { Reveal, DrawnRule } from '../ui/Reveal'
import { Lotus, Sprig, Divider } from '../botanical/Botanicals'
import { CalendarButton } from '../ui/CalendarButton'
import { ShareButton } from '../ui/ShareButton'
import { weddingData } from '../../data/weddingData'

/** Closing composition — the last page of the card, then the three things to do. */
export function Footer() {
  const { compliments } = weddingData

  return (
    <footer className="relative w-full overflow-hidden px-6 pb-16 pt-24 sm:pt-32">
      <Sprig className="pointer-events-none absolute -left-12 bottom-0 h-72 w-auto opacity-[0.22] sway sm:left-0 sm:h-96" />
      <Sprig className="pointer-events-none absolute -right-12 bottom-0 h-72 w-auto -scale-x-100 opacity-[0.18] sway sm:right-0 sm:h-96" />

      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <Reveal variant="expand">
          <Lotus className="h-10 w-auto sm:h-12" />
        </Reveal>

        <Reveal delay={0.14} className="mt-10">
          <p className="font-display text-lg italic text-gold sm:text-xl">{compliments.lead}</p>
        </Reveal>

        <Reveal delay={0.26} className="mt-7">
          <ul className="flex flex-col items-center gap-1">
            {compliments.names.map((person) => (
              <li
                key={person}
                className="font-display text-[1.7rem] font-light leading-tight text-burgundy sm:text-[2.1rem]"
              >
                {person}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.38} className="mt-5">
          <p className="font-display text-lg italic text-cocoa/65 sm:text-xl">
            {compliments.closing}
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-12">
          <Divider className="h-6 w-52 opacity-75 sm:w-64" />
        </Reveal>

        <div className="mt-14 flex w-full flex-col gap-5">
          <Reveal delay={0.12} variant="settle">
            <ShareButton />
          </Reveal>

          <Reveal delay={0.2} variant="settle" className="w-full">
            <p className="mb-3 font-display text-base italic text-gold">Keep the date</p>
            <CalendarButton />
          </Reveal>

          <Reveal delay={0.28} variant="fade" className="mt-4">
            <a
              href="#rsvp"
              className="font-display text-xl italic text-burgundy underline decoration-gold/45 underline-offset-[8px] transition-colors hover:text-burgundyDeep"
            >
              Reply to the invitation
            </a>
          </Reveal>
        </div>

        <div className="mt-16 w-40">
          <DrawnRule delay={0.2} />
        </div>

        <Reveal delay={0.3} className="mt-8">
          <p className="font-display text-base italic text-botanical sm:text-lg">
            {weddingData.brideName} &amp; {weddingData.groomName}
          </p>
          <p className="mt-2 font-sans text-[0.72rem] font-light tracking-[0.1em] text-cocoa/45">
            15 November 2026 · Orkkatteri
          </p>
        </Reveal>
      </div>
    </footer>
  )
}

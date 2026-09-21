import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Lotus } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'
import { directionsUrl, mapsSearchUrl } from '../../lib/share'

export function VenueSection() {
  return (
    <section id="venue" className="relative w-full px-6 py-20 sm:py-32">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <Reveal variant="fade">
          <SectionHeading>Where</SectionHeading>
        </Reveal>

        <Reveal delay={0.14} className="mt-12">
          <Lotus className="h-8 w-auto opacity-80 sm:h-10" />
        </Reveal>

        <Reveal delay={0.24} className="mt-6">
          <h2 className="font-display text-[2.4rem] font-light leading-tight text-burgundy sm:text-[3.1rem]">
            {weddingData.venue}
          </h2>
        </Reveal>

        <Reveal delay={0.36} className="mt-7">
          <address className="not-italic">
            {weddingData.addressLines.map((line) => (
              <p
                key={line}
                className="font-sans text-[0.95rem] font-light leading-[2.1] tracking-[0.05em] text-cocoa/80"
              >
                {line}
              </p>
            ))}
          </address>
        </Reveal>

        <Reveal delay={0.46} className="mt-8">
          <a
            href={`tel:${weddingData.brideParents.phone}`}
            className="font-sans text-lg font-light tracking-[0.08em] text-botanical tabular-nums underline decoration-gold/40 underline-offset-[7px] transition-colors hover:text-burgundy"
          >
            {weddingData.brideParents.phone}
          </a>
        </Reveal>

        <Reveal delay={0.58} className="mt-11 w-full">
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <OutlineLink href={mapsSearchUrl()}>View location</OutlineLink>
            <OutlineLink href={directionsUrl()} solid>
              Get directions
            </OutlineLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function OutlineLink({
  href,
  children,
  solid = false,
}: {
  href: string
  children: string
  solid?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'inline-flex min-h-[52px] items-center justify-center px-9 font-sans text-[0.68rem] uppercase tracking-[0.3em] transition-all duration-500',
        solid
          ? 'bg-burgundy text-parchment hover:bg-burgundyDeep'
          : 'border border-gold/55 text-cocoa hover:border-gold hover:bg-gold/10',
      ].join(' ')}
    >
      {children}
    </a>
  )
}

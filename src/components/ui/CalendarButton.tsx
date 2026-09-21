import { googleCalendarUrl, downloadIcs } from '../../lib/calendar'

type Variant = 'solid' | 'outline'

const base =
  'inline-flex min-h-[52px] flex-1 items-center justify-center px-7 font-sans text-[0.66rem] uppercase tracking-[0.28em] transition-all duration-500'

const styles: Record<Variant, string> = {
  solid: 'bg-burgundy text-parchment hover:bg-burgundyDeep',
  outline: 'border border-gold/55 text-cocoa hover:border-gold hover:bg-gold/10',
}

/** The two routes are a pair, so they share the same weight. */

/** Both calendar routes, built from weddingData at click time. */
export function CalendarButton() {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <a
        href={googleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles.outline}`}
      >
        Google Calendar
      </a>
      <button type="button" onClick={downloadIcs} className={`${base} ${styles.outline}`}>
        Download .ics file
      </button>
    </div>
  )
}

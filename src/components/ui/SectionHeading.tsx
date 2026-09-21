import { DrawnRule } from './Reveal'

/**
 * Section heading: a drawn gold rule with an italic serif label sitting on it.
 * Deliberately not a tracked-out caps eyebrow — this is stationery, not a deck.
 */
export function SectionHeading({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <div className="mx-auto flex w-full max-w-[22rem] items-center gap-4">
      <DrawnRule delay={delay} />
      <span className="label-serif whitespace-nowrap">{children}</span>
      <DrawnRule delay={delay} />
    </div>
  )
}

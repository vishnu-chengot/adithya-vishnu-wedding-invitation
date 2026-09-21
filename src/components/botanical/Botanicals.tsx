/**
 * Hand-authored botanical line art inspired by the printed invitation:
 * lotus, jasmine, leaf sprigs and ornamental corners.
 * Everything is stroke-based so it can be drawn on with `pathLength`.
 */
import type { SVGProps } from 'react'

type Art = SVGProps<SVGSVGElement>

const gold = '#B89452'
const green = '#667052'

/** Full lotus in bloom — the motif used at section heads. */
export function Lotus({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 120 72" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke={gold} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* outer petals, laid down */}
        <path d="M60 66C46 66 28 60 16 48c14-6 28-5 38 2" />
        <path d="M60 66c14 0 32-6 44-18-14-6-28-5-38 2" />
        {/* mid petals */}
        <path d="M60 66c-12-2-25-11-30-24 11 0 21 5 27 13" />
        <path d="M60 66c12-2 25-11 30-24-11 0-21 5-27 13" />
        {/* inner petals */}
        <path d="M60 66c-8-4-15-15-14-27 8 5 13 14 14 23" />
        <path d="M60 66c8-4 15-15 14-27-8 5-13 14-14 23" />
        {/* crown petal */}
        <path d="M60 65c-5-7-6-17-2-25 3-6 3-6 2-9-1 3-1 3 2 9 4 8 3 18-2 25Z" />
        {/* water line */}
        <path d="M18 68h84" stroke={gold} strokeWidth="0.6" opacity="0.5" />
      </g>
    </svg>
  )
}

/** A small closed lotus bud on a stem. */
export function LotusBud({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 40 84" fill="none" className={className} aria-hidden="true" {...rest}>
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
        <path d="M20 46v36" stroke={green} />
        <path d="M20 44c-7-5-10-15-7-24 3-9 7-13 7-20 0 7 4 11 7 20 3 9 0 19-7 24Z" stroke={gold} />
        <path d="M20 44c-4-6-4-14-1-21" stroke={gold} opacity="0.6" />
        <path d="M20 44c4-6 4-14 1-21" stroke={gold} opacity="0.6" />
        <path d="M20 62c-6 0-11-4-13-10 7-1 12 2 13 7" stroke={green} opacity="0.85" />
        <path d="M20 72c6 0 11-4 13-10-7-1-12 2-13 7" stroke={green} opacity="0.85" />
      </g>
    </svg>
  )
}

/** Leafed branch — mirrors with `scale(-1,1)` for the opposite edge. */
export function Sprig({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 108 160" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke={green} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 156C22 118 34 76 58 44 72 25 86 14 100 8" />
        <path d="M30 116c-8-8-9-19-4-27 8 4 12 14 9 24" />
        <path d="M38 98c10-2 17-10 17-19-10-1-18 5-20 15" />
        <path d="M48 76c-9-6-12-16-9-25 8 5 12 15 11 24" />
        <path d="M58 58c11-1 19-8 20-17-10-2-19 3-22 13" />
        <path d="M70 40c-8-7-9-17-4-25 8 5 11 15 8 24" />
        <path d="M82 26c10-3 16-11 15-20-10 0-17 7-18 17" />
      </g>
      <g stroke={gold} strokeWidth="0.8" strokeLinecap="round" opacity="0.75">
        <path d="M24 134c-6 2-10 7-11 13" />
        <path d="M92 16c5-4 10-5 15-4" />
      </g>
    </svg>
  )
}

/** Five-petal jasmine cluster — small accent. */
export function Jasmine({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke={gold} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="32" cy="18" rx="7" ry="11" transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="3.2" />
        <circle cx="32" cy="32" r="1" fill={gold} stroke="none" />
      </g>
    </svg>
  )
}

/** Ornamental corner — traditional border vocabulary, redrawn light. */
export function CornerFlourish({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke={gold} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 134V40C6 21 21 6 40 6h94" opacity="0.55" />
        <path d="M14 134V44c0-17 13-30 30-30h90" opacity="0.3" />
        <path d="M40 14c-4 12-2 22 6 30 8 8 18 10 30 6" />
        <path d="M46 44c-10-4-16-12-17-22 11 1 19 8 21 19" />
        <path d="M76 50c10 2 19-1 26-9-9-6-19-5-27 3" />
        <path d="M58 26c3-9 10-15 20-17-1 10-8 17-18 20" />
        <circle cx="70" cy="46" r="2.4" fill={gold} stroke="none" opacity="0.8" />
      </g>
      <g stroke={green} strokeWidth="0.85" strokeLinecap="round" opacity="0.8">
        <path d="M30 62c-8 4-12 12-11 21 9-2 15-9 16-19" />
        <path d="M22 90c-6 5-8 12-6 20 8-3 12-10 11-19" />
      </g>
    </svg>
  )
}

/** Horizontal rule with a lotus at its centre — the section separator. */
export function Divider({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 320 32" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke={gold} strokeWidth="0.9" strokeLinecap="round">
        <path d="M4 16h108" opacity="0.6" />
        <path d="M208 16h108" opacity="0.6" />
        <path d="M120 16c4-4 9-6 14-6" opacity="0.8" />
        <path d="M200 16c-4-4-9-6-14-6" opacity="0.8" />
        {/* centre lotus */}
        <path d="M160 24c-7 0-14-3-19-8 6-3 13-2 17 1" />
        <path d="M160 24c7 0 14-3 19-8-6-3-13-2-17 1" />
        <path d="M160 24c-5-1-9-5-11-11 5 0 9 3 11 6" />
        <path d="M160 24c5-1 9-5 11-11-5 0-9 3-11 6" />
        <path d="M160 23c-3-4-3-9 0-13 3 4 3 9 0 13Z" />
      </g>
    </svg>
  )
}

/** Tiny diamond used between short pieces of text. */
export function Diamond({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true" {...rest}>
      <path d="M6 1l3.2 5L6 11 2.8 6 6 1Z" stroke={gold} strokeWidth="0.9" strokeLinejoin="round" />
    </svg>
  )
}

/** Ring of petals around the wax seal. */
export function SealMotif({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true" {...rest}>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="33" opacity="0.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M50 50c-4-6-4-13 0-19 4 6 4 13 0 19Z" transform={`rotate(${a} 50 50)`} opacity="0.9" />
        ))}
        <circle cx="50" cy="50" r="4" />
      </g>
    </svg>
  )
}

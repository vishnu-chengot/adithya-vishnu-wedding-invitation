import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Seconds to wait once the element is in view. */
  delay?: number
  /** How the element arrives. Sections vary this so the page never feels uniform. */
  variant?: 'rise' | 'settle' | 'expand' | 'fade'
  className?: string
}

const distances = {
  rise: { y: 26, scale: 1 },
  settle: { y: 12, scale: 1 },
  expand: { y: 0, scale: 0.94 },
  fade: { y: 0, scale: 1 },
}

/** Scroll-in reveal with quiet easing. Respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, variant = 'rise', className }: RevealProps) {
  const still = useReducedMotion()
  const from = distances[variant]

  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y: from.y, scale: from.scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 1.05, delay, ease: [0.22, 0.61, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** A gold hairline that draws itself outward from the centre. */
export function DrawnRule({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const still = useReducedMotion()
  return (
    <motion.div
      className={`hairline w-full origin-center ${className}`}
      initial={still ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

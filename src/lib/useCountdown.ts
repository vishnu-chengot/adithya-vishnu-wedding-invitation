import { useEffect, useState } from 'react'

export type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True once the ceremony start time has passed. */
  arrived: boolean
}

function compute(target: number): TimeLeft {
  const diff = target - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true }
  const seconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    arrived: false,
  }
}

/** Ticks once a second toward the given local datetime string. */
export function useCountdown(isoLocal: string): TimeLeft {
  const target = new Date(isoLocal).getTime()
  const [left, setLeft] = useState(() => compute(target))

  useEffect(() => {
    const id = window.setInterval(() => setLeft(compute(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return left
}

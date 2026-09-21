import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingData } from '../../data/weddingData'

const STORAGE_KEY = 'wedding-music'

/** Session storage throws in some private-browsing modes, so both sides are guarded. */
function readChoice(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

function writeChoice(on: boolean): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    // A guest with site data blocked simply gets no memory of the choice.
  }
}

/**
 * Never autoplays with sound. The choice is remembered for the session only,
 * so a fresh visit is always silent until asked.
 */
export function MusicController() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Restored during the first render, so a scroll or reload inside the same
  // session keeps whatever the guest chose.
  const [playing, setPlaying] = useState(() => readChoice())
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(weddingData.musicSrc)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    let frame = 0

    const fade = (to: number, done?: () => void) => {
      const step = () => {
        const delta = to - audio.volume
        if (Math.abs(delta) < 0.02) {
          audio.volume = to
          done?.()
          return
        }
        audio.volume = Math.min(1, Math.max(0, audio.volume + delta * 0.08))
        frame = requestAnimationFrame(step)
      }
      step()
    }

    if (playing) {
      audio
        .play()
        .then(() => fade(0.32))
        .catch(() => setPlaying(false))
      writeChoice(true)
    } else {
      fade(0, () => audio.pause())
      writeChoice(false)
    }

    return () => cancelAnimationFrame(frame)
  }, [playing])

  if (!available) return null

  return (
    <motion.button
      type="button"
      onClick={() => setPlaying((value) => !value)}
      aria-label={playing ? 'Turn music off' : 'Turn music on'}
      aria-pressed={playing}
      className="fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 text-gold backdrop-blur-sm transition-colors hover:border-gold hover:text-burgundy sm:right-6"
      style={{ bottom: 'calc(var(--safe-bottom) + 1rem)' }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 0.61, 0.24, 1] }}
    >
      <span className="relative flex items-center justify-center">
        <span className="font-display text-lg leading-none">♫</span>
        {!playing && (
          <span className="absolute h-[1.5px] w-7 -rotate-45 bg-current opacity-70" aria-hidden="true" />
        )}
      </span>
      {playing && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-gold/50"
          animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  )
}

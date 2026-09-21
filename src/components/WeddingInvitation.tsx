import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { OpeningEnvelope } from './opening/OpeningEnvelope'
import { HeroSection } from './sections/HeroSection'
import { InvitationMessage } from './sections/InvitationMessage'
import { CoupleSection } from './sections/CoupleSection'
import { WeddingDetails } from './sections/WeddingDetails'
import { PreviousDayFunction } from './sections/PreviousDayFunction'
import { VenueSection } from './sections/VenueSection'
import { Countdown } from './sections/Countdown'
import { RSVPSection } from './sections/RSVPSection'
import { Footer } from './sections/Footer'
import { MusicController } from './ui/MusicController'

export function WeddingInvitation() {
  const [opened, setOpened] = useState(false)
  const still = useReducedMotion()

  // The page must not scroll behind the envelope.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          >
            <OpeningEnvelope onOpened={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className="relative z-10"
        inert={!opened}
        aria-hidden={!opened}
        initial={false}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: still ? 0 : 1.2, ease: [0.22, 0.61, 0.24, 1] }}
      >
        <HeroSection />
        <InvitationMessage />
        <CoupleSection />
        <WeddingDetails />
        <PreviousDayFunction />
        <VenueSection />
        <Countdown />
        <RSVPSection />
        <Footer />
      </motion.main>

      {opened && <MusicController />}
    </>
  )
}

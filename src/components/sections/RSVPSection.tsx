import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Lotus } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'
import {
  RsvpNotConfiguredError,
  sendRsvpToSheet,
  type RsvpAttendance,
  type RsvpSubmission,
} from '../../lib/rsvpSheet'

export type { RsvpAttendance, RsvpSubmission }

/**
 * Replies go to a Google Sheet through an Apps Script web app.
 * To use a different backend, replace this one call — Supabase, Firestore or
 * your own endpoint all fit here without touching the rest of the component.
 */
async function submitRsvp(submission: RsvpSubmission): Promise<void> {
  await sendRsvpToSheet(submission)
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function RSVPSection() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(1)
  const [attendance, setAttendance] = useState<RsvpAttendance | null>(null)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [problem, setProblem] = useState('')

  /** One phone often carries several replies, so start the next one clean. */
  function resetForm() {
    setName('')
    setGuests(1)
    setAttendance(null)
    setMessage('')
    setProblem('')
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (status === 'sending') return

    if (!name.trim()) {
      setProblem('Add your name so the family knows who is coming.')
      return
    }
    if (!attendance) {
      setProblem('Let us know whether you can join us.')
      return
    }

    const submission: RsvpSubmission = {
      name: name.trim(),
      guests: attendance === 'accept' ? guests : 0,
      attendance,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    }

    setProblem('')
    setStatus('sending')
    try {
      await submitRsvp(submission)
      setStatus('sent')
    } catch (error) {
      if (error instanceof RsvpNotConfiguredError) {
        console.error(
          '[RSVP] RSVP_ENDPOINT is not set on the server. This reply was NOT saved:',
          submission,
        )
        if (import.meta.env.DEV) {
          // While building, say so on screen — a silent thank-you here looks
          // exactly like success and hides the fact that nothing was stored.
          setStatus('error')
          setProblem(
            'Setup needed: RSVP_ENDPOINT is not set, so this reply was not saved. See README → RSVP → Google Sheet.',
          )
          return
        }
        // Live, a guest must never see a failure we caused. Thank them.
        setStatus('sent')
        return
      }
      console.error('[RSVP] submission failed', error)
      setStatus('error')
      setProblem(
        `That did not go through. Try again, or call ${weddingData.brideParents.phone}.`,
      )
    }
  }

  return (
    <section id="rsvp" className="relative w-full px-6 py-20 sm:py-32">
      <div className="mx-auto max-w-md">
        <Reveal variant="fade">
          <SectionHeading>Will you join us</SectionHeading>
        </Reveal>

        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="thanks"
              className="mt-14 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.24, 1] }}
            >
              <Lotus className="h-9 w-auto" />
              <h3 className="mt-7 font-display text-[2rem] font-light text-burgundy sm:text-[2.5rem]">
                {attendance === 'accept' ? 'We will be waiting for you' : 'You will be missed'}
              </h3>
              <p className="mt-4 font-display text-base italic text-botanical sm:text-lg">
                {attendance === 'accept'
                  ? `See you on the fifteenth, ${name.trim().split(' ')[0]}.`
                  : 'Thank you for letting us know — your blessings are with us.'}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-9 font-display text-lg italic text-cocoa/60 underline decoration-gold/40 underline-offset-[7px] transition-colors hover:text-burgundy"
              >
                Send another reply
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-14 flex flex-col gap-9"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 0.61, 0.24, 1] }}
              noValidate
            >
              <Field id="rsvp-name" label="Your name">
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  placeholder="Name as we should write it"
                  className="w-full border-0 border-b border-gold/40 bg-transparent pb-3 font-display text-xl text-cocoa placeholder:font-sans placeholder:text-sm placeholder:text-cocoa/35 focus:border-gold focus:outline-none focus:ring-0"
                />
              </Field>

              <FieldGroup id="rsvp-guests" label="Coming with">
                <div className="flex items-center gap-5 pb-2">
                  <Stepper
                    label="one fewer guest"
                    disabled={guests <= 1}
                    onClick={() => setGuests((value) => Math.max(1, value - 1))}
                  >
                    –
                  </Stepper>
                  <span className="min-w-[2.5ch] text-center font-sans text-2xl font-light text-burgundy tabular-nums">
                    {guests}
                  </span>
                  <Stepper
                    label="one more guest"
                    disabled={guests >= 20}
                    onClick={() => setGuests((value) => Math.min(20, value + 1))}
                  >
                    +
                  </Stepper>
                  <span className="font-display text-base italic text-cocoa/50">
                    {guests === 1 ? 'person' : 'people'}
                  </span>
                </div>
              </FieldGroup>

              <FieldGroup id="rsvp-reply" label="Your reply">
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <Choice
                    selected={attendance === 'accept'}
                    onClick={() => setAttendance('accept')}
                  >
                    Joyfully accept
                  </Choice>
                  <Choice
                    selected={attendance === 'decline'}
                    onClick={() => setAttendance('decline')}
                  >
                    Regretfully decline
                  </Choice>
                </div>
              </FieldGroup>

              <Field id="rsvp-message" label="A note for the couple">
                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={3}
                  placeholder="Optional"
                  className="w-full resize-none border-0 border-b border-gold/40 bg-transparent pb-3 font-display text-lg leading-relaxed text-cocoa placeholder:font-sans placeholder:text-sm placeholder:text-cocoa/35 focus:border-gold focus:outline-none focus:ring-0"
                />
              </Field>

              {problem && (
                <p role="alert" className="font-sans text-xs tracking-[0.06em] text-burgundy">
                  {problem}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-2 min-h-[54px] w-full bg-burgundy font-sans text-[0.68rem] uppercase tracking-[0.32em] text-parchment transition-all duration-500 hover:bg-burgundyDeep disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending' : 'Send reply'}
              </button>

              <p className="text-center font-sans text-[0.66rem] leading-relaxed tracking-[0.06em] text-cocoa/45">
                Or call {weddingData.brideParents.father.replace('Mr. ', '')} on{' '}
                <a href={`tel:${weddingData.brideParents.phone}`} className="text-botanical underline decoration-gold/40 underline-offset-4">
                  {weddingData.brideParents.phone}
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

const labelClass = 'mb-3 block font-display text-base italic text-gold'

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  )
}

/** For controls that are a set of buttons rather than a single input. */
function FieldGroup({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-labelledby={id}>
      <span id={id} className={labelClass}>
        {label}
      </span>
      {children}
    </div>
  )
}

function Stepper({
  children,
  onClick,
  disabled,
  label,
}: {
  children: string
  onClick: () => void
  disabled: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center border border-gold/45 font-display text-xl text-cocoa transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-35"
    >
      {children}
    </button>
  )
}

function Choice({
  children,
  selected,
  onClick,
}: {
  children: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'min-h-[52px] flex-1 px-4 font-sans text-[0.64rem] uppercase tracking-[0.22em] transition-all duration-500',
        selected
          ? 'border border-burgundy bg-burgundy text-parchment'
          : 'border border-gold/45 text-cocoa/80 hover:border-gold hover:bg-gold/10',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

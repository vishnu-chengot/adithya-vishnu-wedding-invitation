import { Reveal, DrawnRule } from '../ui/Reveal'
import { Divider } from '../botanical/Botanicals'
import { weddingData } from '../../data/weddingData'

/**
 * The formal invitation wording, set as an opening paragraph rather than a
 * reproduction of the printed block — the hosts are named first, as they invite.
 */
export function InvitationMessage() {
  const { brideParents, invitationMessage } = weddingData

  return (
    <section className="relative w-full px-6 py-20 sm:py-32">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Reveal variant="expand">
          <Divider className="h-6 w-56 opacity-80 sm:w-72" />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <p className="font-display text-base tracking-[0.06em] text-cocoa/70 sm:text-lg">
            {brideParents.father} &amp; {brideParents.mother}
          </p>
        </Reveal>

        <Reveal delay={0.22} className="mt-8">
          <div className="font-display text-[1.32rem] font-light leading-[1.55] text-cocoa sm:text-[1.85rem] sm:leading-[1.5]">
            <p className="[text-wrap:balance]">{invitationMessage[0]}</p>
            <p className="mt-1 [text-wrap:balance]">{invitationMessage[1]}</p>
            <p className="mt-1 italic text-burgundy">{invitationMessage[2]}</p>
          </div>
        </Reveal>

        <div className="mt-12 w-32">
          <DrawnRule delay={0.4} />
        </div>
      </div>
    </section>
  )
}

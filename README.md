# Adithya & Vishnu Raj — Wedding Invitation

A digital wedding invitation for **Sunday, 15 November 2026**. It opens as a
sealed ivory envelope: tap it, the wax seal breaks, the flap swings back and the
card is drawn out before the invitation itself takes over the screen.

Built mobile-first, since this is shared over WhatsApp.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Changing the wedding details

Everything guests read lives in one file: **`src/data/weddingData.ts`**. Names,
dates, times, the venue, the address, the invitation wording and the closing
compliments are all there. No other file needs editing for a content change.

`ceremonyStart` and `ceremonyEnd` drive the live countdown and both calendar
exports, so keep them in step with `muhurtham`.

`mapsQuery` is what the *View location* and *Get directions* buttons search
for. It is deliberately separate from the printed `brideAddress`, because
Google geocodes "Vellavayal Kuni" (spaced) more reliably than the printed
"VellavayalKuni". Check the pin lands correctly and adjust if not.

## Background music

The ♫ control appears **only once an audio file exists** at
`public/audio/wedding-theme.mp3`. Drop a track in with that name and the button
shows up by itself — see `public/audio/README.md`. Nothing autoplays; music
starts on tap, fades in, loops, and the choice is remembered for the session.

## RSVP → Google Sheet

Replies are written straight into a Google Sheet through a Google Apps Script
web app. **Until you finish these five steps, replies are not saved** — the
form still thanks the guest, but logs an error to the browser console.

1. **Make the sheet.** Create a new Google Sheet, e.g. *Adithya & Vishnu Raj —
   RSVPs*. You do not need to add any columns; the script writes its own header
   row the first time a reply arrives.

2. **Add the script.** In that sheet: **Extensions → Apps Script**. Delete the
   placeholder `myFunction`, paste in the whole of
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs), and save.

3. **Deploy it.** **Deploy → New deployment → Web app**, with:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**

   Approve the permission prompt (it asks for access to the spreadsheet). Copy
   the **Web app URL** — it ends in `/exec`.

4. **Point the site at it.** Copy `.env.example` to `.env.local` and paste the
   URL in:

   ```
   RSVP_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
   ```

   Note there is **no `VITE_` prefix** — that is deliberate, see *Why the
   browser never sees this URL* below. Restart `npm run dev`.

   For the deployed site, add the same `RSVP_ENDPOINT` variable in **Vercel →
   Settings → Environment Variables** and redeploy.

5. **Check it.** Open the `/exec` URL in a browser — it should answer
   `{"ok":true,"message":"RSVP endpoint is running"}`. Then send a test reply
   from the site and watch the row appear.

Each reply becomes one row: **Received · Name · Reply · Guests · Message ·
Submitted (ISO)**. *Received* is the server's clock, *Submitted* is the guest's,
so you can tell the two apart.

**Changing the deployment later:** after editing `Code.gs`, use **Deploy →
Manage deployments → edit → Version: New version**. Creating a *new deployment*
instead gives you a different URL, which you would then have to update in
`.env.local`.

### Why the browser never sees this URL

Anything named `VITE_*` is compiled into the JavaScript that ships to guests —
readable by anyone who views source. `RSVP_ENDPOINT` has no prefix, so it is
only ever read on the server:

- **In production** by `api/rsvp.ts`, a Vercel Edge Function.
- **In development** by a matching endpoint in `vite.config.ts`, so
  `npm run dev` behaves exactly like the deployed site.

Both share the forwarding logic in `api/_forward.ts` (the leading underscore
keeps Vercel from publishing it as its own route). The browser only ever posts
to `/api/rsvp` on your own domain.

Verified on the built output — no Google address reaches the bundle:

```
script.google.com matches : 0
macros/s/ tokens          : 0
```

**What this does and does not buy you.** The Apps Script address is genuinely
hidden. But `/api/rsvp` is itself public and unauthenticated — anyone who finds
it can still post rows. What you gain is that the Google endpoint is no longer
discoverable, and you now have a server-side place to add origin checks or rate
limiting if you ever need them.

### Using something else instead

One function is the seam — `submitRsvp` in
`src/components/sections/RSVPSection.tsx`:

```ts
async function submitRsvp(submission: RsvpSubmission): Promise<void> {
  await sendRsvpToSheet(submission)               // swap this line
  // await supabase.from('rsvps').insert(submission)
}
```

`RsvpSubmission` is `{ name, guests, attendance, message, submittedAt }`, where
`attendance` is `'accept' | 'decline'`. Validation, the sending state, the error
message and the thank-you screen all work around it unchanged.

## The share link

**Nothing to configure.** The Share button reads the address the invitation is
open at, so hosting it anywhere — Netlify, Vercel, a custom domain, a
subdirectory — makes it share that address automatically.

Two details it handles:

- The query string and `#hash` are stripped. A guest who has tapped *Reply to
  the invitation* is sitting on `…/#rsvp`; forwarding that link would drop the
  next person past the envelope animation.
- Web Share API first (the native sheet on phones), WhatsApp next, clipboard
  last. All three send the same clean link.

### Forcing a specific address

Set `VITE_SITE_URL` when the served address is not the one you want guests to
receive — a Netlify preview deploy, say, or a `.pages.dev` address when you
have a custom domain:

```
VITE_SITE_URL=https://adithya-vishnuraj.example.com
```

Setting it also adds `og:url` and a canonical link to the built HTML, which is
what WhatsApp and Facebook read when they build the link preview. Those
crawlers do not run JavaScript, so that tag can only be filled in at build time
— it is left out entirely when the variable is unset, rather than guessed.

## Structure

```
api/
  rsvp.ts                      Vercel Edge Function guests post replies to
  _forward.ts                  forwarding logic, shared with the dev server
google-apps-script/Code.gs     the RSVP collector to paste into Apps Script
src/
  data/weddingData.ts          all wedding content
  lib/                         countdown, calendar (.ics + Google), share, maps,
                               rsvpSheet (posts replies to /api/rsvp)
  components/
    WeddingInvitation.tsx      composes the envelope and the page
    opening/                   OpeningEnvelope, EnvelopeFlap, WaxSeal, InvitationCard
    sections/                  Hero, InvitationMessage, Couple, WeddingDetails,
                               PreviousDayFunction, Venue, Countdown, RSVP, Footer
    ui/                        Reveal, SectionHeading, CalendarButton,
                               ShareButton, MusicController
    botanical/Botanicals.tsx   hand-drawn lotus, jasmine, sprigs, corners
```

## Notes

- **Palette and type**: warm ivory `#F8F1E3`, antique gold `#B89452`, deep
  burgundy `#702C35`, dark brown `#3D2923`, botanical green `#667052`, soft
  blush `#D9A19A`. Cormorant Garamond for display, Inter for dates and controls.
- **Countdown numerals are set in Inter on purpose** — Cormorant's `1` is easily
  misread as a capital `I` at small sizes.
- **Reduced motion** is respected throughout: the envelope opens instantly and
  the floral drift and scroll reveals are switched off.
- Verified with no horizontal scroll at 360, 375, 390, 414, 768, 1024 and 1440px.

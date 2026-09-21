/**
 * Every word and date shown on the invitation lives here.
 * Edit this file to change the invitation — nothing else needs to be touched.
 */
export const weddingData = {
  brideName: 'Adithya',
  groomName: 'Vishnu Raj',

  /** ISO date of the wedding day. */
  weddingDate: '2026-11-15',
  weddingDay: 'Sunday',
  muhurtham: '10:00 AM – 10:50 AM',
  malayalamDate: '1202 Thulam 29',

  venue: "Bride's Residence",
  brideAddress: 'VellavayalKuni, Orkkatteri, Chattukulam',
  /**
   * What the "View location" and "Get directions" buttons search for.
   * Kept separate from the printed address because Google geocodes the spaced
   * spelling more reliably — change it if the map lands in the wrong place.
   */
  mapsQuery: 'Vellavayal Kuni, Orkkatteri, Chattukulam, Kerala',
  /** Address split for display on its own lines. */
  addressLines: ['VellavayalKuni', 'Orkkatteri', 'Chattukulam'],

  /** Used by the countdown and the calendar files. Local time, 24h. */
  ceremonyStart: '2026-11-15T10:00:00',
  ceremonyEnd: '2026-11-15T10:50:00',

  brideParents: {
    father: 'Mr. Pavithran V.P',
    mother: 'Mrs. Nisha P.M',
    phone: '7510701619',
  },

  groomParentage: '(S/O. Mr. Rajan E. & Usha P.K., Eppanniyil, Kalpathur)',

  invitationMessage: [
    'Cordially invite your esteemed presence with family',
    'on the auspicious occasion of the Wedding',
    'of our daughter',
  ],

  previousFunction: {
    time: '3:00 PM – 9:00 PM',
    venue: 'At our residence',
    date: '2026-11-14T15:00:00',
  },

  compliments: {
    lead: 'With best compliments from:',
    names: ['Nani', 'Nivedya P.N', 'Adwaitha P.N'],
    closing: 'Friends & Relatives',
  },

  /** Drop an audio file at this path to enable the music button. */
  musicSrc: '/audio/wedding-theme.mp3',
} as const

export type WeddingData = typeof weddingData

/** Formatted pieces the layout reuses. */
export const dateParts = {
  day: '15',
  month: 'November',
  year: '2026',
  weekday: 'Sunday',
}

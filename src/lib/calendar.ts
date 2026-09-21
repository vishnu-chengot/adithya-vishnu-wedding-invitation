import { weddingData } from '../data/weddingData'

const TITLE = `Wedding of ${weddingData.brideName} & ${weddingData.groomName}`
const LOCATION = `${weddingData.venue}, ${weddingData.brideAddress}`
const DETAILS = [
  `Muhurtham ${weddingData.muhurtham}`,
  `${weddingData.weddingDay}, 15 November 2026`,
  `Previous day function: ${weddingData.previousFunction.time} ${weddingData.previousFunction.venue.toLowerCase()}`,
].join('\\n')

/** 2026-11-15T10:00:00 -> 20261115T100000 (floating local time, no timezone shift). */
function stamp(isoLocal: string): string {
  return isoLocal.replace(/[-:]/g, '')
}

function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITLE,
    dates: `${stamp(weddingData.ceremonyStart)}/${stamp(weddingData.ceremonyEnd)}`,
    details: DETAILS.replace(/\\n/g, '\n'),
    location: LOCATION,
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/** Builds an .ics file in memory and hands it to the browser as a download. */
export function downloadIcs(): void {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Adithya and Vishnu Raj//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${stamp(weddingData.ceremonyStart)}-adithya-vishnuraj@wedding`,
    `DTSTAMP:${utcStamp(new Date())}`,
    'DTSTART;TZID=Asia/Kolkata:' + stamp(weddingData.ceremonyStart),
    'DTEND;TZID=Asia/Kolkata:' + stamp(weddingData.ceremonyEnd),
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${DETAILS}`,
    `LOCATION:${LOCATION}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${TITLE} is tomorrow`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'adithya-vishnuraj-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

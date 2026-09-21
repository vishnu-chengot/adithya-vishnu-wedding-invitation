/**
 * RSVP collector for the Adithya & Vishnu Raj wedding invitation.
 *
 * Paste this into Extensions → Apps Script on the Google Sheet that should
 * hold the replies, then Deploy → New deployment → Web app:
 *   Execute as:       Me
 *   Who has access:   Anyone
 * Copy the /exec URL it gives you into VITE_RSVP_ENDPOINT in the site's .env.local.
 *
 * Setup instructions in full live in the project README.
 */

const SHEET_NAME = 'RSVPs'
const HEADERS = ['Received', 'Name', 'Reply', 'Guests', 'Message', 'Submitted (ISO)']
const MAX_FIELD = 2000

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    // Two guests replying at the same moment must not land on the same row.
    lock.waitLock(20000)
  } catch (err) {
    return reply_(false, 'Busy, try again')
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply_(false, 'Empty request')
    }

    let data
    try {
      data = JSON.parse(e.postData.contents)
    } catch (err) {
      return reply_(false, 'Malformed request')
    }

    const name = clean_(data.name)
    if (!name) return reply_(false, 'Name is required')

    const accepted = data.attendance === 'accept'

    sheet_().appendRow([
      new Date(),
      name,
      accepted ? 'Joyfully accept' : 'Regretfully decline',
      accepted ? Math.min(Math.max(Number(data.guests) || 1, 1), 20) : 0,
      clean_(data.message),
      clean_(data.submittedAt),
    ])

    return reply_(true, 'Recorded')
  } catch (err) {
    // Keep the detail in the Apps Script execution log, not in the response.
    console.error(err)
    return reply_(false, 'Could not record the reply')
  } finally {
    lock.releaseLock()
  }
}

/** Lets you open the /exec URL in a browser to check the deployment is live. */
function doGet() {
  return reply_(true, 'RSVP endpoint is running')
}

function sheet_() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME)

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
    sheet.setColumnWidth(1, 160)
    sheet.setColumnWidth(2, 200)
    sheet.setColumnWidth(3, 150)
    sheet.setColumnWidth(5, 340)
  }
  return sheet
}

function clean_(value) {
  if (value === null || value === undefined) return ''
  return String(value).trim().slice(0, MAX_FIELD)
}

function reply_(ok, message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, message: message })).setMimeType(
    ContentService.MimeType.JSON,
  )
}

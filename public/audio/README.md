# Background music

The music button appears **only when an audio file exists at this path**:

    public/audio/wedding-theme.mp3

Drop your chosen track in here with exactly that name and the ♫ control will
show up in the bottom-right corner. Nothing else needs to change.

To use a different filename or format, edit `musicSrc` in
`src/data/weddingData.ts`.

Notes:
- The track never autoplays. It starts only after a tap, fades in over about a
  second, loops, and remembers the choice for the rest of the browsing session.
- Keep the file small — 2–3 MB or less — since most guests will open this on
  mobile data.
- Use music you have the right to share publicly.

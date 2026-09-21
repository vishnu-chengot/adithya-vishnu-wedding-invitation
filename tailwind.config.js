/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F1E3',
        parchment: '#F2E8D5',
        shade: '#E7DAC3',
        gold: '#B89452',
        goldLight: '#D8BE86',
        goldDeep: '#8F6E37',
        burgundy: '#702C35',
        burgundyDeep: '#55202A',
        cocoa: '#3D2923',
        ink: '#241712',
        botanical: '#667052',
        blush: '#D9A19A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.28em',
        vast: '0.42em',
      },
      boxShadow: {
        paper: '0 1px 2px rgba(61,41,35,0.10), 0 12px 28px -14px rgba(61,41,35,0.34)',
        card: '0 2px 4px rgba(61,41,35,0.10), 0 28px 60px -28px rgba(85,32,42,0.42)',
        lift: '0 40px 90px -40px rgba(85,32,42,0.55), 0 8px 20px -12px rgba(61,41,35,0.30)',
        seal: 'inset 0 2px 5px rgba(255,235,220,0.34), inset 0 -4px 9px rgba(38,11,15,0.62), 0 6px 16px -6px rgba(61,20,26,0.66)',
      },
    },
  },
  plugins: [],
}

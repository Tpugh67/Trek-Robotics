/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tr: {
          bg: '#0a0c12',
          surface: '#111420',
          accent: '#63ffb4',
          accent2: '#3b8fff',
          warn: '#ffb84d',
          danger: '#ff5b5b',
          muted: 'rgba(255,255,255,0.38)',
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

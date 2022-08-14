/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '12px',
      '8': '28px',
    },
    extend: {
      colors: {
        'G4red': '#ef2110',
        'G4green': '#63b540',
        'G4blue': '#0073ff',
        'G5red': '#ff383e',
        'G5blue': '#2093ff',
        'G5green': '#29c426',
        'G5yellow': '#f4f425',
        'G5orange': '#fec326',
        'G5pink': '#fa10e3',
        'baseText': '#52525a'
      }
    },
  },
  plugins: [],
}

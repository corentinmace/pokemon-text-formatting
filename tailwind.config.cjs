/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'G4red': '#ff0000',
        'G4green': '#00ff00',
        'G4blue': '#0000ff',
        'G5red': '#ff383e',
        'G5blue': '#2093ff',
        'G5green': '#29c426',
        'G5yellow': '#f4f425',
        'G5orange': '#fec326',
        'G5pink': '#fa10e3'
      }
    },
  },
  plugins: [],
}

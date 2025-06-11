/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        seedGreen: '#3B7A57',
        seedGold: '#D4AF37',
      },
      fontFamily: {
        display: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

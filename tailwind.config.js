/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Files that Tailwind will browse
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary cozy orange tones
        primary: {
          100: '#FFE7CB', // Lightest tone
          200: '#FFD1A1',
          300: '#FFBA76',
          DEFAULT: '#FFA22E', // Primary Color of App
          500: '#E69128',
          600: '#B37421',
          700: '#804E18' // Darkest tone
        },

        // Gray colors
        ash: {
          100: '#ffffff', // White
          200: '#d4d4d4',
          300: '#aaaaaa',
          DEFAULT: '#808080', // Default ash (gray) color
          500: '#555555',
          600: '#2b2b2b',
          700: '#000000' // Black
        }
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        pacifico: ['Pacifico', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};

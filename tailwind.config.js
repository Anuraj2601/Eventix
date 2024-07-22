/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AEC90A',
        secondary: '#DBFF00',
        dark: {
          background: '#171717',
          400: '#1E1E1E',
          500: '#0F0F0F',
        },
      },
       boxShadow: {
        'custom-white': '-4px 0px 4px rgba(0, 0, 0, 0.2), 0px -4px 4px rgba(0, 0, 0, 0.2), 0px 4px 4px rgba(0, 0, 0, 0.2), 4px 0px 4px rgba(0, 0, 0, 0.2)'
      },
      height: {
        '256': '64rem', // Adding custom height class
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

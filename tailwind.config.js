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
        'custom': '0 4px 6px rgba(219, 255, 0, 0.5)', // Custom shadow
        '3d': '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)' // 3D shadow
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'light-gray': '#e5e5e5',
        'light-pink': '#f72585',
        'light-indigo': '#6a00f4',
        'primary-indigo': '#5a189a',
        'dark': '#0b090a',
        'medium-gray': '#495057'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}


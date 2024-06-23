/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '7/10': '70%',
        '3/10': '30%',
        '9/10': '90%',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: { 'soft-blue': '#A3C4F3', 'light-gray': '#F2F2F2', 'soft-gold': '#F4D03F', 'dark-gray': '#333333',},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      aspectRatio: {
        card: '1 / 1.4',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

const { addDynamicIconSelectors } = require('@iconify/tailwind');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...colors,
      primary: colors.green['500'],
      dark: {
        primary: colors.green['400'],
      },
    },
    extend: {
      aspectRatio: {
        card: '1 / 1.4',
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
  darkMode: 'class',
};

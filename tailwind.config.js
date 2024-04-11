const { addDynamicIconSelectors } = require('@iconify/tailwind');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.green['500'],
        secondary: colors.purple['600'],
        background: colors.gray['100'],
        text: colors.gray['800'],
        dark: {
          primary: colors.green['400'],
          background: colors.gray['900'],
          text: colors.gray['100'],
        },
      },
      aspectRatio: {
        card: '1 / 1.4',
      },
    },
  },
  plugins: [addDynamicIconSelectors(), require('@tailwindcss/forms')],
  darkMode: 'class',
};

const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [addDynamicIconSelectors(), require('@tailwindcss/forms')],
  darkMode: 'class',
};

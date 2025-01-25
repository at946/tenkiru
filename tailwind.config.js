const { addDynamicIconSelectors } = require('@iconify/tailwind');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [addDynamicIconSelectors(), require('@tailwindcss/forms')],
  darkMode: 'class',
};

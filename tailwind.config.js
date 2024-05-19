/** @type {import('tailwindcss').Config} */
const { tabSizePlugin, buttonComponentsPlugin } = require('./src/tailwindcss/plugins/components')
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    tabSize: {
      1: '1',
      2: '2',
      4: '4',
      8: '8',
    },
    extend: {
      colors: {
        blue: {
          main: 'rgb(175, 30, 30)',
        },
      },
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    tabSizePlugin,
    buttonComponentsPlugin,
  ],
};



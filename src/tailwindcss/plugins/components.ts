import plugin from 'tailwindcss/plugin';

export const tabSizePlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      tab: (value) => ({
        tabSize: value,
      }),
    },
    { values: theme('tabSize') },
  );
});

export const buttonComponentsPlugin = plugin(function ({
  addComponents,
  theme,
}) {
  addComponents({
    '.btn': {
      padding: '.5rem 1rem',
      borderRadius: '.25rem',
      fontWeight: '600',
    },
    '.btn-blue': {
      backgroundColor: theme('colors.red.500'),
      color: '#fff',
    },
    '.btn-red': {
      backgroundColor: '#e3342f',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#cc1f1a',
      },
    },
  });
});

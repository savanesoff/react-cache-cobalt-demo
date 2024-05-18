module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-custom-properties')({
      preserve: false, // Replace CSS variables with their values
    }),
    require('postcss-preset-env')({
      stage: 3, // Use stage 3 features (CSS variables are stage 3)
      features: {
        'custom-properties': { preserve: false },
      },
    }),
  ],
};
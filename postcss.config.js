
import autoprefixer from 'autoprefixer';
import postcss from 'postcss-import';
import nested from 'postcss-nested';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    postcss(),
    nested(),
    tailwindcss(),
    autoprefixer(),
  ],
};

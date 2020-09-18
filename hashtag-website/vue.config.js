// vue.config.js
module.exports = {
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/variables.scss';
        `,
      },
    },
  },
};

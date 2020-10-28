// vue.config.js
module.exports = {
  // Make variables available in SASS for all components.
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import '@/assets/scss/theme.scss';
          `,
      },
    },
  },
  pluginOptions: {
    apollo: {
      lintGQL: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");
  },
};

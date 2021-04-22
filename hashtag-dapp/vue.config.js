// vue.config.js
module.exports = {
  // Make variables available in SASS for all components.
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/styles/themes/hashtag/variables.scss';
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
  configureWebpack: {
    externals: {
      config: "config",
    },
  },
  devServer: {
    proxy: "http://localhost:8000",
  },
};

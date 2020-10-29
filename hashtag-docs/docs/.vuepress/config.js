const path = require("path");

module.exports = {
  title: "Hashtag Documentation",
  description: "Hashtag Documentation",
  dest: "docs/dist",
  temp: "docs/tmp",
  themeConfig: {
    smoothScroll: true,
    repo: "hashtag-protocol/hashtag-protocol",
    editLinks: true,
    docsDir: "hashtag-docs/docs",
    sidebar: [
      {
        title: "Essentials",
        collapsable: false,
        children: [
          ["/", "Introduction"],
          ["/faqs.html", "FAQs"],
        ],
      },
    ],
    sidebarDepth: 1,
  },
  // https://stackoverflow.com/questions/60009780/import-global-sass-variables-into-vuepress-components
  scss: {
    prependData: `
        @import "@styles/theme.scss";
      `,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@theme": path.resolve(__dirname, "./theme"),
        "@styles": path.resolve(__dirname, "./theme/styles"),
      },
    },
  },
  plugins: [
    ["@vuepress/active-header-links"],
    [
      "vuepress-plugin-merge-pages",
      {
        bundles: [
          {
            // Merge faq.md files in /guide/faqs into a single page.
            path: "/faqs.html",
            filter: (pages) => {
              // optional
              return pages.filter(({ path }) => path.includes("/faqs/"));
            },
            mergePages: (pages) => {
              // optional
              const pageBreak = '<hr class="page-break" />\n\n';
              const initialValue = `# FAQs\n${pageBreak}`;
              return pages.reduce((acc, current) => {
                return `${acc}${current.content}\n\n${pageBreak}`;
              }, initialValue);
            },
          },
        ],
      },
    ],
  ],
};

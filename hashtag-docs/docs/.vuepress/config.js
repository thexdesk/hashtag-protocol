const path = require("path");
const config = require("platformsh-config").config();

// If we are on Platform.sh, build into the /tmp directory.
// Move static files out of there during Platform deploy hook.
//let buildDir = "build";
//let tmpDir = "tmp";
if (!config.isValidPlatform()) {
  // Not on Platform, use our local directory.
  //buildDir = "docs/dist";
  //buildDir = "docs/dist";
}

module.exports = {
  title: "Hashtag Documentation",
  description: "Hashtag Documentation",
  dest: "build",
  temp: "tmp",
  themeConfig: {
    smoothScroll: true,
    repo: "hashtag-protocol/hashtag-protocol",
    docsDir: "hashtag-docs/docs",
    repoLabel: "Edit on Github",
    editLinks: true,
    editLinkText: "Edit on Github",
    sidebar: [
      {
        title: "Essentials",
        collapsable: false,
        children: [
          ["/", "Introduction"],
          ["/protocol-overview.html", "Protocol Overview"],
          ["/participants.html", "Key Participants"],
          ["/roadmap.html", "Project Roadmap"],
          ["/hashtag-council.html", "Hashtag Council"],
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
    ["@vuepress/last-updated"],
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
              const initialValue = `# FAQs\n${pageBreak}[[TOC]]`;
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

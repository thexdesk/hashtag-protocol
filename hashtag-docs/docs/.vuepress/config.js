const path = require("path");

module.exports = {
  extend: "@vuepress/theme-default",
  title: "Hashtag Documentation",
  description: "Hashtag Documentation",
  dest: "build",
  temp: "tmp",
  themeConfig: {
    smoothScroll: true,
    repo: "hashtag-protocol/hashtag-protocol",
    docsDir: "hashtag-docs/docs",
    docsBranch: "stage",
    repoLabel: "Edit on Github",
    editLinks: true,
    editLinkText: "Edit on Github",
    activeHeaderLinks: false, // Default: true
    sidebar: [
      ["/", "Hashtag Docs"],
      {
        title: "Essentials",
        collapsable: false,
        children: [
          ["/essentials/", "Vision"],
          ["/essentials/protocol-overview", "Protocol Overview"],
          ["/essentials/participants", "Key Participants"],
          ["/essentials/roadmap", "Project Roadmap"],
          ["/essentials/hashtag-council", "Hashtag Council"],
          ["/essentials/faqs", "FAQs"],
        ],
      },
      {
        title: "Develop",
        collapsable: false,
        children: [
          ["/develop/", "Getting Started"],
          ["/develop/contracts", "Smart Contracts"],
          ["/develop/demo-app", "Demo Application"],
          ["/develop/docs", "Documentation"],
          ["/develop/graphql", "GraphQL API"],
          ["/develop/website", "Marketing Site"],
        ],
      },
      {
        title: "Implement",
        collapsable: false,
        children: [
          ["/implement/", "Introduction"],
          ["/implement/getting-started", "Getting Started"],
        ],
      },
    ],
    sidebarDepth: 0,
  },
  // https://stackoverflow.com/questions/60009780/import-global-sass-variables-into-vuepress-components
  scss: {
    prependData: `
        @import "@styles/theme.scss";
      `,
  },
  markdown: {
    lineNumbers: true,
    anchor: {
      permalink: true,
      permalinkBefore: false,
      permalinkSymbol: "",
    },
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
    [
      "vuepress-plugin-google-tag-manager",
      {
        gtm: "GTM-MRK383F",
      },
    ],
    [
      "vuepress-plugin-code-copy",
      {
        color: "#188c4a",
        backgroundColor: "#188c4a",
        successText: "Copied",
      },
    ],
    ["vuepress-plugin-table-of-contents"],
    ["@vuepress/last-updated"],
    [
      "vuepress-plugin-merge-pages",
      {
        bundles: [
          {
            // Merge faq.md files in /shared/faqs into a single page.
            path: "/essentials/faqs.html",
            filter: (pages) => {
              // optional
              return pages.filter(({ path }) => path.includes("/faqs/"));
            },
            mergePages: (pages) => {
              // optional
              const pageBreak = '<hr class="page-break" />\n\n';
              const initialValue = `# FAQs\n\n[[TOC]]\n${pageBreak}`;
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

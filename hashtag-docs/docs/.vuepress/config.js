module.exports = {
  title: 'Hashtag Documentation',
  description: 'Just playing around',
  theme: '@vuepress/theme-default',
  dest: 'docs/dist',
  temp: 'docs/tmp',
  themeConfig: {
    logo: '/assets/img/logo.svg',
    smoothScroll: true,
    repo: 'hashtag-protocol/hashtag-protocol',
    editLinks: true,
    docsDir: 'hashtag-docs/docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        '',
        'faqs',
      ]
    },
    sidebarDepth: 2,
  },
  plugins: [
    [
      'vuepress-plugin-merge-pages',
      {
        bundles: [{
          // Merge faq.md files in /guide/faqs into a single page.
          path: '/guide/faqs.html',
          filter: (pages) => { // optional
            return pages.filter(({ path }) => path.includes('/faqs/'))
          },
          mergePages: pages => { // optional
            const pageBreak = '<hr class="page-break" />\n\n'
            const initialValue = `# FAQs\n\n[[toc]]\n${pageBreak}`
            return pages
              .reduce((acc, current) => {
                return `${acc}${current.content}\n\n${pageBreak}`
              }, initialValue)
          }
        }]
      }
    ]
  ]
}

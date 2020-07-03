<template>
  <div v-html="faqBody"></div>
</template>
<script>
/**
 * Load up a raw markdown file from the hashtag-docs directory,
 * and return it as HTML.
 *
 * Pop a targeted modal in parent when
 * help icon in HelpModaltemplate is clicked.
 */
export default {
  name: "Faq",
  props: {
    /**
     * Name of the faq file to load.
     */
    filename: String,
    docPath: String,
  },
  data() {
    return {
      faqBody: null,
    };
  },
  created() {
    this.getFaq();
  },
  methods: {
    /**
     * Fetch the faq markdown file passed in to the component.
     */
    getFaq: function () {
      var md = require("markdown-it")();
      // TODO: Figure out how to use vuepress markdown-loader
      // instead of raw-loader.
      // see https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/markdown-loader
      var result = require(`raw-loader!../../../hashtag-docs/docs/guide/faqs/${this.filename}.md`)
        .default;
      this.faqBody = md.render(result);
    },
  },
};
</script>
